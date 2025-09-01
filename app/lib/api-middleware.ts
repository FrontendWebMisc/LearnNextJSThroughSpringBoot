// API MIDDLEWARE - Like Spring Boot @ControllerAdvice and Interceptors
import { NextRequest, NextResponse } from 'next/server'
import { ApiError, ApiErrorResponse, ApiSuccessResponse, logApiError } from './api-errors'
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

// API Route Wrapper - Like Spring Boot @RestController wrapper
export function withApiHandler<T = any>(
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
      // Log incoming request
      console.log(`[${requestId}] ${method} ${path} - Start`)

      const result = await handler(request, context, routeParams)
      const duration = Date.now() - startTime

      // Log successful response
      console.log(`[${requestId}] ${method} ${path} - Success (${duration}ms)`)

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
      return handleApiError(error, context)
    }
  }
}

// Error Handler - Like Spring Boot @ExceptionHandler
export function handleApiError(error: unknown, context: RequestContext): NextResponse {
  const duration = Date.now() - context.startTime
  let apiError: ApiError

  if (error instanceof ApiError) {
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

  // Log error with context
  logApiError(apiError, {
    requestId: context.requestId,
    path: context.path,
    method: context.method,
    duration,
    userAgent: context.userAgent,
    ip: context.ip
  })

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

  return NextResponse.json(errorResponse, {
    status: apiError.statusCode,
    headers: {
      'X-Request-ID': context.requestId,
      'X-Error-Code': apiError.code
    }
  })
}

// Authentication Middleware - Like Spring Security
export function requireAuth(token: string | null): void {
  if (!token) {
    throw ApiError.unauthorized('Authorization token required')
  }
  
  if (token !== 'valid-jwt-token') {
    throw ApiError.unauthorized('Invalid or expired token')
  }
}

// Role-based Authorization - Like @PreAuthorize in Spring Boot
export function requireRole(userRole: string, requiredRoles: string[]): void {
  if (!requiredRoles.includes(userRole)) {
    throw ApiError.forbidden(`Access denied. Required roles: ${requiredRoles.join(', ')}`)
  }
}

// Request Body Parser - Like @RequestBody in Spring Boot
export async function parseRequestBody<T = any>(request: NextRequest): Promise<T> {
  try {
    const contentType = request.headers.get('content-type')
    
    if (!contentType?.includes('application/json')) {
      throw ApiError.validation('Content-Type must be application/json')
    }
    
    return await request.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw ApiError.validation('Invalid JSON in request body')
  }
}

// Query Parameters Parser - Like @RequestParam in Spring Boot
export function parseQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const params: Record<string, string> = {}
  
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  
  return params
}

// Path Parameters Helper - Like @PathVariable in Spring Boot
export function getPathParam(params: any, name: string): string {
  const value = params?.[name]
  if (!value) {
    throw ApiError.validation(`Missing path parameter: ${name}`)
  }
  return value
}

// Rate Limiting Helper
const requestCounts = new Map<string, { count: number, resetTime: number }>()

export function checkRateLimit(ip: string, maxRequests: number = 100, windowMs: number = 60000): void {
  const now = Date.now()
  const key = `rate_limit:${ip}`
  const existing = requestCounts.get(key)
  
  if (!existing || now > existing.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs })
    return
  }
  
  if (existing.count >= maxRequests) {
    throw ApiError.rateLimit('Rate limit exceeded. Please try again later.')
  }
  
  existing.count++
}

// Utility function to get client IP
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  return realIP || clientIP || 'unknown'
}

// Performance Monitoring Helper
export function measurePerformance<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now()
  
  return fn().finally(() => {
    const duration = Date.now() - startTime
    if (duration > 1000) { // Log slow operations
      console.warn(`Slow operation: ${operation} took ${duration}ms`)
    }
  })
}