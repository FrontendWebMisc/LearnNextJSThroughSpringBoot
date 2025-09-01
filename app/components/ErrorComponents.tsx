'use client'

import { useState } from 'react'
import { ApiErrorResponse, ErrorCode } from '../lib/errors'

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

interface ErrorDisplayProps {
  error: ApiErrorResponse['error'] | Error | any
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
  showDetails?: boolean
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss, 
  className = '', 
  showDetails = false 
}: ErrorDisplayProps) {
  const [showFullDetails, setShowFullDetails] = useState(false)

  // Handle different error formats
  const getErrorInfo = () => {
    // API Error Response format
    if (error?.code && error?.message) {
      return {
        code: error.code,
        message: error.message,
        details: error.details,
        isApiError: true,
        severity: getErrorSeverity(error.code)
      }
    }
    
    // Standard Error object
    if (error?.message) {
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message,
        details: error.stack ? { stack: error.stack } : undefined,
        isApiError: false,
        severity: 'error' as const
      }
    }

    // Fallback for any other format
    return {
      code: 'UNKNOWN_ERROR',
      message: typeof error === 'string' ? error : 'An unexpected error occurred',
      details: typeof error === 'object' ? error : undefined,
      isApiError: false,
      severity: 'error' as const
    }
  }

  const errorInfo = getErrorInfo()
  const { code, message, details, isApiError, severity } = errorInfo

  const getErrorStyles = () => {
    const baseStyles = "rounded-lg border p-4 "
    
    switch (severity) {
      case 'warning':
        return baseStyles + "bg-yellow-50 border-yellow-200 text-yellow-800"
      case 'error':
        return baseStyles + "bg-red-50 border-red-200 text-red-800"
      case 'info':
        return baseStyles + "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return baseStyles + "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getErrorIcon = () => {
    switch (severity) {
      case 'warning':
        return "⚠️"
      case 'error':
        return "❌"
      case 'info':
        return "ℹ️"
      default:
        return "⚠️"
    }
  }

  return (
    <div className={`${getErrorStyles()} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-xl" role="img" aria-label="error-icon">
            {getErrorIcon()}
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">
              {getErrorTitle(code)}
            </h3>
            <p className="text-sm mt-1 opacity-90">
              {message}
            </p>
            
            {/* Error Code */}
            {isApiError && (
              <div className="mt-2 text-xs font-mono bg-black bg-opacity-10 rounded px-2 py-1 inline-block">
                {code}
              </div>
            )}

            {/* Details Toggle */}
            {details && showDetails && (
              <div className="mt-3">
                <button
                  onClick={() => setShowFullDetails(!showFullDetails)}
                  className="text-xs font-medium hover:underline"
                >
                  {showFullDetails ? 'Hide Details' : 'Show Details'}
                </button>
                
                {showFullDetails && (
                  <div className="mt-2 p-3 bg-black bg-opacity-10 rounded text-xs font-mono">
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-3 flex space-x-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors"
                >
                  Try Again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InlineError({ 
  message, 
  className = '' 
}: { 
  message: string
  className?: string 
}) {
  return (
    <div className={`flex items-center space-x-2 text-red-600 text-sm ${className}`}>
      <span role="img" aria-label="error">❌</span>
      <span>{message}</span>
    </div>
  )
}

export function LoadingErrorFallback({ 
  error, 
  retry 
}: { 
  error: any
  retry?: () => void 
}) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <ErrorDisplay 
        error={error}
        onRetry={retry}
        showDetails={true}
        className="max-w-md"
      />
    </div>
  )
}

export function NetworkErrorBanner({ 
  isOnline, 
  onRetry 
}: { 
  isOnline: boolean
  onRetry?: () => void 
}) {
  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-3 text-center text-sm z-50">
      <div className="flex items-center justify-center space-x-3">
        <span>🔌 No internet connection</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="underline hover:no-underline"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export function FormFieldError({ 
  error, 
  fieldName 
}: { 
  error?: any
  fieldName: string 
}) {
  if (!error) return null

  // Handle validation errors with field-specific messages
  const getFieldError = () => {
    if (error?.error?.details?.validationErrors) {
      const fieldError = error.error.details.validationErrors.find(
        (err: any) => err.field === fieldName
      )
      return fieldError?.message
    }
    
    return error?.error?.message || error?.message || 'Invalid input'
  }

  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {getFieldError()}
    </p>
  )
}

function getErrorSeverity(code: string): 'warning' | 'error' | 'info' {
  switch (code) {
    case ErrorCode.VALIDATION_ERROR:
    case ErrorCode.MISSING_REQUIRED_FIELD:
    case ErrorCode.INVALID_EMAIL_FORMAT:
    case ErrorCode.INVALID_AGE_RANGE:
    case ErrorCode.DUPLICATE_EMAIL:
      return 'warning'
    
    case ErrorCode.INTERNAL_SERVER_ERROR:
    case ErrorCode.DATABASE_ERROR:
    case ErrorCode.EXTERNAL_SERVICE_ERROR:
      return 'error'
    
    case ErrorCode.USER_NOT_FOUND:
    case ErrorCode.RESOURCE_NOT_FOUND:
      return 'info'
    
    default:
      return 'error'
  }
}

function getErrorTitle(code: string): string {
  switch (code) {
    case ErrorCode.VALIDATION_ERROR:
    case ErrorCode.MISSING_REQUIRED_FIELD:
    case ErrorCode.INVALID_EMAIL_FORMAT:
    case ErrorCode.INVALID_AGE_RANGE:
      return 'Validation Error'
    
    case ErrorCode.DUPLICATE_EMAIL:
      return 'Duplicate Entry'
    
    case ErrorCode.USER_NOT_FOUND:
    case ErrorCode.RESOURCE_NOT_FOUND:
      return 'Not Found'
    
    case ErrorCode.UNAUTHORIZED:
      return 'Authentication Required'
    
    case ErrorCode.FORBIDDEN:
      return 'Access Denied'
    
    case ErrorCode.RATE_LIMIT_EXCEEDED:
      return 'Rate Limit Exceeded'
    
    case ErrorCode.INTERNAL_SERVER_ERROR:
    case ErrorCode.DATABASE_ERROR:
    case ErrorCode.EXTERNAL_SERVICE_ERROR:
      return 'Server Error'
    
    default:
      return 'Error'
  }
}