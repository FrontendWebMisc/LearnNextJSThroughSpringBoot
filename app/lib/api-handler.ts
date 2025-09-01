import { NextRequest, NextResponse } from 'next/server'
import { ApiError, ErrorCode, ApiErrorResponse, ApiSuccessResponse, isApiError } from './errors'
import { logger } from './logger'
import { randomUUID } from 'crypto'

export interface RequestContext {
  requestId: string
  startTime: number
  path: string
  method: string
  userAgent?: string
  ip?: string
}

export type ApiHandler<T = any> = (
  request: NextRequest,
  context: RequestContext,
  params?: any
) => Promise<T>

export function withErrorHandling<T = any>(
  handler: ApiHandler<T>
) {
  return async (request: NextRequest, routeParams?: any): Promise<NextResponse> => {
    const requestId = randomUUID()
    const startTime = Date.now()
    const path = new URL(request.url).pathname
    const method = request.method

    const context: RequestContext = {
      requestId,
      startTime,
      path,
      method,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: getClientIP(request)
    }

    try {
      // Log incoming request with structured logging
      logger.apiRequest(method, path, requestId, {
        userAgent: context.userAgent,
        ip: context.ip
      })

      const result = await handler(request, context, routeParams)
      const duration = Date.now() - startTime

      // Log successful response
      logger.apiResponse(method, path, 200, duration, requestId)

      // Record metrics
      logger.recordMetric({
        endpoint: path,
        method,
        statusCode: 200,
        duration,
        requestId,
        userAgent: context.userAgent,
        ip: context.ip
      })

      const successResponse: ApiSuccessResponse<T> = {
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
        requestId
      }

      return NextResponse.json(successResponse, {
        headers: {
          'X-Request-ID': requestId,
          'X-Response-Time': `${duration}ms`
        }
      })

    } catch (error) {
      const duration = Date.now() - startTime
      
      return handleApiError(error, context)
    }
  }
}

export function handleApiError(error: unknown, context: RequestContext): NextResponse {
  let apiError: ApiError

  if (isApiError(error)) {
    apiError = error
  } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
    apiError = ApiError.validation('Invalid JSON in request body')
  } else if (error instanceof Error) {
    apiError = ApiError.internal(error.message, {
      originalError: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  } else {
    apiError = ApiError.internal('An unexpected error occurred')
  }

  const errorResponse: ApiErrorResponse = {
    success: false,
    error: {
      code: apiError.code,
      message: apiError.message,
      details: apiError.details,
      timestamp: new Date().toISOString(),
      path: context.path,
      requestId: context.requestId,
      stack: process.env.NODE_ENV === 'development' ? apiError.stack : undefined
    }
  }

  const duration = Date.now() - context.startTime

  // Log error with structured logging
  if (apiError.isOperational) {
    logger.businessError(apiError.code, apiError.message, {
      requestId: context.requestId,
      path: context.path,
      method: context.method,
      statusCode: apiError.statusCode,
      userAgent: context.userAgent,
      ip: context.ip,
      duration,
      details: apiError.details
    })
  } else {
    logger.systemError(error instanceof Error ? error : new Error(String(error)), {
      requestId: context.requestId,
      path: context.path,
      method: context.method,
      statusCode: apiError.statusCode,
      userAgent: context.userAgent,
      ip: context.ip,
      duration,
      errorCode: apiError.code
    })
  }

  // Log API response for metrics
  logger.apiResponse(context.method, context.path, apiError.statusCode, duration, context.requestId, {
    errorCode: apiError.code,
    errorMessage: apiError.message
  })

  // Record error metrics
  logger.recordMetric({
    endpoint: context.path,
    method: context.method,
    statusCode: apiError.statusCode,
    duration,
    requestId: context.requestId,
    userAgent: context.userAgent,
    ip: context.ip,
    errorCode: apiError.code
  })

  return NextResponse.json(errorResponse, {
    status: apiError.statusCode,
    headers: {
      'X-Request-ID': context.requestId,
      'X-Error-Code': apiError.code
    }
  })
}

function getClientIP(request: NextRequest): string {
  // Try different headers for IP address
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  return realIP || clientIP || 'unknown'
}

export async function parseJSONSafely<T = any>(request: NextRequest): Promise<T> {
  try {
    return await request.json()
  } catch (error) {
    throw ApiError.validation('Invalid JSON in request body')
  }
}

export function validateContentType(request: NextRequest, expectedType: string = 'application/json'): void {
  const contentType = request.headers.get('content-type')
  
  if (request.method !== 'GET' && request.method !== 'DELETE') {
    if (!contentType || !contentType.includes(expectedType)) {
      throw ApiError.validation(`Expected content-type: ${expectedType}`)
    }
  }
}