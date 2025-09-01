export enum ErrorCode {
  // Validation Errors (400-409)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_EMAIL_FORMAT = 'INVALID_EMAIL_FORMAT',
  INVALID_AGE_RANGE = 'INVALID_AGE_RANGE',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  
  // Not Found Errors (404)
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  
  // Server Errors (500+)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  
  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Authentication/Authorization (401/403)
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN'
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: ErrorCode
    message: string
    details?: Record<string, any>
    timestamp: string
    path: string
    requestId: string
    stack?: string // Only in development
  }
}

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  timestamp: string
  requestId: string
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

export class ApiError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly details?: Record<string, any>
  public readonly isOperational: boolean

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number = 500,
    details?: Record<string, any>,
    isOperational: boolean = true
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    this.isOperational = isOperational

    Error.captureStackTrace(this, ApiError)
  }

  static validation(message: string, details?: Record<string, any>): ApiError {
    return new ApiError(ErrorCode.VALIDATION_ERROR, message, 400, details)
  }

  static notFound(resource: string, id?: string | number): ApiError {
    const message = id 
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`
    return new ApiError(ErrorCode.RESOURCE_NOT_FOUND, message, 404)
  }

  static userNotFound(id?: string | number): ApiError {
    const message = id 
      ? `User with id '${id}' not found`
      : 'User not found'
    return new ApiError(ErrorCode.USER_NOT_FOUND, message, 404)
  }

  static unauthorized(message: string = 'Unauthorized access'): ApiError {
    return new ApiError(ErrorCode.UNAUTHORIZED, message, 401)
  }

  static forbidden(message: string = 'Access forbidden'): ApiError {
    return new ApiError(ErrorCode.FORBIDDEN, message, 403)
  }

  static rateLimited(message: string = 'Too many requests'): ApiError {
    return new ApiError(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429)
  }

  static internal(message: string = 'Internal server error', details?: Record<string, any>): ApiError {
    return new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, message, 500, details, false)
  }
}

export interface ValidationRule {
  field: string
  message: string
  validator: (value: any) => boolean
}

export class ValidationError extends ApiError {
  public readonly validationErrors: Array<{field: string, message: string}>

  constructor(errors: Array<{field: string, message: string}>) {
    const message = `Validation failed: ${errors.map(e => e.message).join(', ')}`
    super(ErrorCode.VALIDATION_ERROR, message, 400, { validationErrors: errors })
    this.validationErrors = errors
  }
}

export function isApiError(error: any): error is ApiError {
  return error instanceof ApiError
}

export function isValidationError(error: any): error is ValidationError {
  return error instanceof ValidationError
}