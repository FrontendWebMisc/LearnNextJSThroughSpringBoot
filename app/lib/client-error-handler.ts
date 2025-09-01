'use client'

import { ApiErrorResponse } from './errors'

export interface FetchError extends Error {
  status?: number
  response?: Response
  data?: ApiErrorResponse
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type')
  
  if (!contentType?.includes('application/json')) {
    throw new Error(`Unexpected content type: ${contentType}`)
  }

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error?.message || `HTTP ${response.status}`) as FetchError
    error.status = response.status
    error.response = response
    error.data = data
    throw error
  }

  // Return the data portion of successful responses
  return data.success ? data.data : data
}

export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    return await handleApiResponse<T>(response)
  } catch (error) {
    // Enhanced error handling
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Network error
      const networkError = new Error('Network error - please check your connection') as FetchError
      networkError.name = 'NetworkError'
      throw networkError
    }
    
    throw error
  }
}

export function isValidationError(error: any): boolean {
  return error?.data?.error?.code === 'VALIDATION_ERROR'
}

export function isDuplicateEmailError(error: any): boolean {
  return error?.data?.error?.code === 'DUPLICATE_EMAIL'
}

export function isNotFoundError(error: any): boolean {
  return error?.status === 404 || 
         error?.data?.error?.code === 'USER_NOT_FOUND' ||
         error?.data?.error?.code === 'RESOURCE_NOT_FOUND'
}

export function isServerError(error: any): boolean {
  return error?.status >= 500 ||
         error?.data?.error?.code === 'INTERNAL_SERVER_ERROR' ||
         error?.data?.error?.code === 'DATABASE_ERROR'
}

export function isNetworkError(error: any): boolean {
  return error?.name === 'NetworkError' || 
         (error instanceof TypeError && error.message.includes('fetch'))
}

export function getErrorMessage(error: any): string {
  // API error response
  if (error?.data?.error?.message) {
    return error.data.error.message
  }
  
  // Standard error
  if (error?.message) {
    return error.message
  }
  
  // HTTP status fallback
  if (error?.status) {
    switch (error.status) {
      case 400:
        return 'Bad request - please check your input'
      case 401:
        return 'Authentication required'
      case 403:
        return 'Access forbidden'
      case 404:
        return 'Resource not found'
      case 409:
        return 'Conflict with existing data'
      case 429:
        return 'Too many requests - please try again later'
      case 500:
        return 'Internal server error'
      case 502:
        return 'Bad gateway'
      case 503:
        return 'Service unavailable'
      default:
        return `HTTP ${error.status} error`
    }
  }
  
  return 'An unexpected error occurred'
}

export function shouldRetry(error: any, attempt: number = 0): boolean {
  const maxAttempts = 3
  
  if (attempt >= maxAttempts) {
    return false
  }
  
  // Retry on network errors
  if (isNetworkError(error)) {
    return true
  }
  
  // Retry on server errors (5xx)
  if (isServerError(error)) {
    return true
  }
  
  // Retry on specific HTTP status codes
  if (error?.status === 408 || error?.status === 502 || error?.status === 503) {
    return true
  }
  
  return false
}

export function getRetryDelay(attempt: number): number {
  // Exponential backoff: 1s, 2s, 4s
  return Math.min(1000 * Math.pow(2, attempt), 10000)
}

export async function retryApiRequest<T>(
  requestFn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  let lastError: any
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error
      
      if (!shouldRetry(error, attempt)) {
        throw error
      }
      
      if (attempt < maxAttempts - 1) {
        const delay = getRetryDelay(attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}