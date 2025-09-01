// API ERROR HANDLING - Like Spring Boot @ExceptionHandler
export enum ApiErrorCode {
  // Authentication & Authorization (401/403)
  AUTH_TOKEN_MISSING = 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Validation Errors (400)
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_EMAIL_FORMAT = 'INVALID_EMAIL_FORMAT',
  INVALID_INPUT_FORMAT = 'INVALID_INPUT_FORMAT',
  
  // Business Logic Errors (400/409)
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  
  // Not Found (404)
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ENDPOINT_NOT_FOUND = 'ENDPOINT_NOT_FOUND',
  
  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Server Errors (500+)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: ApiErrorCode
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
  message?: string
  timestamp: string
  requestId: string
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

export class ApiError extends Error {
  public readonly code: ApiErrorCode
  public readonly statusCode: number
  public readonly details?: Record<string, any>
  public readonly isOperational: boolean

  constructor(
    code: ApiErrorCode,
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

  // Factory methods for common errors
  static unauthorized(message: string = 'Authentication required'): ApiError {
    return new ApiError(ApiErrorCode.AUTH_TOKEN_MISSING, message, 401)
  }

  static forbidden(message: string = 'Insufficient permissions'): ApiError {
    return new ApiError(ApiErrorCode.INSUFFICIENT_PERMISSIONS, message, 403)
  }

  static notFound(resource: string = 'Resource'): ApiError {
    return new ApiError(
      ApiErrorCode.RESOURCE_NOT_FOUND,
      `${resource} not found`,
      404
    )
  }

  static validation(message: string, details?: Record<string, any>): ApiError {
    return new ApiError(
      ApiErrorCode.VALIDATION_FAILED,
      message,
      400,
      details
    )
  }

  static duplicate(resource: string): ApiError {
    return new ApiError(
      ApiErrorCode.DUPLICATE_RESOURCE,
      `${resource} already exists`,
      409
    )
  }

  static businessRule(message: string): ApiError {
    return new ApiError(
      ApiErrorCode.BUSINESS_RULE_VIOLATION,
      message,
      400
    )
  }

  static internal(message: string = 'Internal server error', details?: Record<string, any>): ApiError {
    return new ApiError(
      ApiErrorCode.INTERNAL_SERVER_ERROR,
      message,
      500,
      details,
      false // Not operational - indicates system issue
    )
  }

  static rateLimit(message: string = 'Too many requests'): ApiError {
    return new ApiError(
      ApiErrorCode.RATE_LIMIT_EXCEEDED,
      message,
      429
    )
  }
}

// Validation helper types
export interface ValidationRule {
  field: string
  message: string
  validator: (value: any) => boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: Array<{field: string, message: string}>
}

// Validation utility
export class Validator {
  static validate(data: any, rules: ValidationRule[]): ValidationResult {
    const errors: Array<{field: string, message: string}> = []

    for (const rule of rules) {
      const value = data[rule.field]
      if (!rule.validator(value)) {
        errors.push({
          field: rule.field,
          message: rule.message
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Common validators
  static required(value: any): boolean {
    return value !== undefined && value !== null && value !== ''
  }

  static email(value: any): boolean {
    if (!value) return true // Optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  static minLength(min: number) {
    return (value: any): boolean => {
      if (!value) return true
      return String(value).length >= min
    }
  }

  static maxLength(max: number) {
    return (value: any): boolean => {
      if (!value) return true
      return String(value).length <= max
    }
  }

  static oneOf(allowedValues: any[]) {
    return (value: any): boolean => {
      if (!value) return true
      return allowedValues.includes(value)
    }
  }
}

// Error logging helper
export function logApiError(error: ApiError, context: any = {}) {
  const logData = {
    code: error.code,
    message: error.message,
    statusCode: error.statusCode,
    isOperational: error.isOperational,
    details: error.details,
    context,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  }

  if (error.isOperational) {
    console.warn('Operational Error:', logData)
  } else {
    console.error('System Error:', logData)
    
    // In production, send to monitoring service
    // sendToSentry(error, logData)
    // sendToDatadog(logData)
    // sendToCloudWatch(logData)
  }
}