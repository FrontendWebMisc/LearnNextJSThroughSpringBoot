'use client'

import { SWRConfig } from 'swr'
import { ReactNode } from 'react'
import { apiRequest, retryApiRequest, getErrorMessage, isServerError, shouldRetry, getRetryDelay } from '../lib/client-error-handler'
import { logger } from '../lib/logger'

interface SWRProviderProps {
  children: ReactNode
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global fetcher with error handling
        fetcher: async (url: string) => {
          return retryApiRequest(() => apiRequest(url))
        },

        // Global error handling
        onError: (error, key) => {
          logger.error('SWR Global Error', {
            key,
            error: getErrorMessage(error),
            errorCode: error?.data?.error?.code,
            statusCode: error?.status,
            operation: 'swr_fetch'
          })

          // Show user-friendly notifications for critical errors
          if (isServerError(error)) {
            // In a real app, you'd show a toast notification
            console.error('Server error detected:', getErrorMessage(error))
          }
        },

        // Custom error retry logic
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          logger.warn('SWR Retry Attempt', {
            key,
            retryCount,
            maxRetries: 3,
            error: getErrorMessage(error),
            operation: 'swr_retry'
          })

          // Don't retry on client errors (4xx) except for specific cases
          if (error?.status >= 400 && error?.status < 500) {
            // Only retry on 408 (timeout), 429 (rate limit)
            if (error.status !== 408 && error.status !== 429) {
              return
            }
          }

          // Stop retrying after 3 attempts
          if (retryCount >= 3) {
            logger.error('SWR Max Retries Exceeded', {
              key,
              retryCount,
              finalError: getErrorMessage(error),
              operation: 'swr_max_retries'
            })
            return
          }

          // Custom retry with exponential backoff
          const timeout = getRetryDelay(retryCount)
          setTimeout(() => revalidate({ retryCount }), timeout)
        },

        // Success callback
        onSuccess: (data, key) => {
          logger.debug('SWR Success', {
            key,
            dataSize: JSON.stringify(data).length,
            operation: 'swr_success'
          })
        },

        // Loading start callback  
        onLoadingSlow: (key) => {
          logger.warn('SWR Slow Loading', {
            key,
            threshold: '3 seconds',
            operation: 'swr_slow_loading'
          })
        },

        // Default SWR options with error handling focus
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30000, // 30 seconds
        
        // Error retry configuration
        errorRetryCount: 3,
        errorRetryInterval: 1000,
        shouldRetryOnError: (error) => {
          return shouldRetry(error)
        },

        // Loading slow threshold
        loadingTimeout: 3000,

        // Dedupe requests
        dedupingInterval: 2000,

        // Focus revalidation
        focusThrottleInterval: 5000,

        // Fallback data while loading
        fallback: {},

        // Keep previous data when revalidating
        keepPreviousData: true,

        // Compare function for data
        compare: (a, b) => {
          // Custom comparison to avoid unnecessary re-renders
          return JSON.stringify(a) === JSON.stringify(b)
        },

        // Middleware for additional processing
        use: [
          // Performance monitoring middleware
          (useSWRNext) => (key, fetcher, config) => {
            const startTime = Date.now()
            
            const swr = useSWRNext(key, fetcher, {
              ...config,
              onSuccess: (data, key, config) => {
                const duration = Date.now() - startTime
                logger.info('SWR Request Completed', {
                  key,
                  duration: `${duration}ms`,
                  operation: 'swr_performance'
                })
                config.onSuccess?.(data, key, config)
              },
              onError: (error, key, config) => {
                const duration = Date.now() - startTime
                logger.error('SWR Request Failed', {
                  key,
                  duration: `${duration}ms`,
                  error: getErrorMessage(error),
                  operation: 'swr_performance'
                })
                config.onError?.(error, key, config)
              }
            })

            return swr
          }
        ]
      }}
    >
      {children}
    </SWRConfig>
  )
}