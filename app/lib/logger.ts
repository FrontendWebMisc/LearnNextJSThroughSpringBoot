export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  requestId?: string
  userId?: string
  operation?: string
  duration?: number
  error?: Error
}

export interface MetricsData {
  endpoint: string
  method: string
  statusCode: number
  duration: number
  timestamp: string
  requestId: string
  userAgent?: string
  ip?: string
  errorCode?: string
}

class Logger {
  private logLevel: LogLevel
  private enableConsoleLogging: boolean
  private enableMetrics: boolean
  private logs: LogEntry[] = []
  private metrics: MetricsData[] = []

  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG
    this.enableConsoleLogging = process.env.NODE_ENV !== 'production'
    this.enableMetrics = true

    // Cleanup old logs periodically (keep last 1000 entries)
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.logs = this.logs.slice(-1000)
        this.metrics = this.metrics.slice(-1000)
      }, 60000) // Every minute
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      requestId: context?.requestId,
      userId: context?.userId,
      operation: context?.operation,
      duration: context?.duration,
      error: context?.error
    }
  }

  private log(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return

    this.logs.push(entry)

    if (this.enableConsoleLogging) {
      const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR']
      const levelName = levelNames[entry.level]
      
      const logMessage = [
        `[${entry.timestamp}]`,
        `[${levelName}]`,
        entry.requestId && `[${entry.requestId}]`,
        entry.operation && `[${entry.operation}]`,
        entry.message
      ].filter(Boolean).join(' ')

      const logMethod = entry.level >= LogLevel.ERROR ? 'error' : 
                      entry.level >= LogLevel.WARN ? 'warn' : 
                      entry.level >= LogLevel.INFO ? 'info' : 'debug'

      console[logMethod](logMessage, entry.context || '')
      
      if (entry.error && entry.error.stack) {
        console.error('Stack trace:', entry.error.stack)
      }
    }

    // In production, you would send logs to external service
    // this.sendToExternalLoggingService(entry)
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log(this.createLogEntry(LogLevel.DEBUG, message, context))
  }

  info(message: string, context?: Record<string, any>): void {
    this.log(this.createLogEntry(LogLevel.INFO, message, context))
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log(this.createLogEntry(LogLevel.WARN, message, context))
  }

  error(message: string, context?: Record<string, any>): void {
    this.log(this.createLogEntry(LogLevel.ERROR, message, context))
  }

  // Structured logging methods for common scenarios
  apiRequest(method: string, path: string, requestId: string, context?: Record<string, any>): void {
    this.info(`API Request: ${method} ${path}`, {
      ...context,
      requestId,
      operation: 'api_request'
    })
  }

  apiResponse(method: string, path: string, statusCode: number, duration: number, requestId: string, context?: Record<string, any>): void {
    const level = statusCode >= 500 ? LogLevel.ERROR : statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO
    const message = `API Response: ${method} ${path} - ${statusCode} (${duration}ms)`
    
    this.log(this.createLogEntry(level, message, {
      ...context,
      requestId,
      operation: 'api_response',
      duration,
      statusCode
    }))
  }

  userAction(action: string, userId?: string, context?: Record<string, any>): void {
    this.info(`User Action: ${action}`, {
      ...context,
      userId,
      operation: 'user_action'
    })
  }

  validationError(field: string, message: string, context?: Record<string, any>): void {
    this.warn(`Validation Error: ${field} - ${message}`, {
      ...context,
      operation: 'validation_error',
      field
    })
  }

  businessError(errorCode: string, message: string, context?: Record<string, any>): void {
    this.warn(`Business Error: ${errorCode} - ${message}`, {
      ...context,
      operation: 'business_error',
      errorCode
    })
  }

  systemError(error: Error, context?: Record<string, any>): void {
    this.error(`System Error: ${error.message}`, {
      ...context,
      error,
      operation: 'system_error'
    })
  }

  // Metrics collection
  recordMetric(data: Omit<MetricsData, 'timestamp'>): void {
    if (!this.enableMetrics) return

    const metric: MetricsData = {
      ...data,
      timestamp: new Date().toISOString()
    }

    this.metrics.push(metric)

    // In production, send to monitoring service
    // this.sendToMonitoringService(metric)
  }

  // Performance monitoring
  startTimer(operation: string, context?: Record<string, any>): () => void {
    const startTime = Date.now()
    const requestId = context?.requestId || 'unknown'
    
    this.debug(`Starting operation: ${operation}`, { ...context, operation })

    return () => {
      const duration = Date.now() - startTime
      this.info(`Completed operation: ${operation} (${duration}ms)`, {
        ...context,
        operation,
        duration,
        requestId
      })
      return duration
    }
  }

  // Health check logging
  healthCheck(service: string, status: 'healthy' | 'unhealthy', details?: Record<string, any>): void {
    const level = status === 'healthy' ? LogLevel.INFO : LogLevel.ERROR
    this.log(this.createLogEntry(level, `Health Check: ${service} - ${status}`, {
      ...details,
      operation: 'health_check',
      service,
      status
    }))
  }

  // Get logs for debugging/monitoring dashboard
  getLogs(limit: number = 100, level?: LogLevel): LogEntry[] {
    let filteredLogs = level !== undefined 
      ? this.logs.filter(log => log.level >= level)
      : this.logs

    return filteredLogs.slice(-limit).reverse() // Most recent first
  }

  // Get metrics for monitoring
  getMetrics(limit: number = 100): MetricsData[] {
    return this.metrics.slice(-limit).reverse()
  }

  // Performance analytics
  getPerformanceStats(timeRange: number = 3600000): { // Default: last hour
    averageResponseTime: number
    errorRate: number
    requestCount: number
    slowestEndpoints: Array<{ endpoint: string, averageTime: number }>
  } {
    const cutoff = new Date(Date.now() - timeRange).toISOString()
    const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoff)
    
    if (recentMetrics.length === 0) {
      return {
        averageResponseTime: 0,
        errorRate: 0,
        requestCount: 0,
        slowestEndpoints: []
      }
    }

    const totalRequests = recentMetrics.length
    const errorRequests = recentMetrics.filter(m => m.statusCode >= 400).length
    const totalTime = recentMetrics.reduce((sum, m) => sum + m.duration, 0)
    
    const endpointStats = recentMetrics.reduce((stats, metric) => {
      const key = `${metric.method} ${metric.endpoint}`
      if (!stats[key]) {
        stats[key] = { totalTime: 0, count: 0 }
      }
      stats[key].totalTime += metric.duration
      stats[key].count += 1
      return stats
    }, {} as Record<string, { totalTime: number, count: number }>)

    const slowestEndpoints = Object.entries(endpointStats)
      .map(([endpoint, stats]) => ({
        endpoint,
        averageTime: stats.totalTime / stats.count
      }))
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, 5)

    return {
      averageResponseTime: Math.round(totalTime / totalRequests),
      errorRate: Math.round((errorRequests / totalRequests) * 100 * 100) / 100, // 2 decimal places
      requestCount: totalRequests,
      slowestEndpoints
    }
  }
}

export const logger = new Logger()

// Client-side error boundary logger
export function logClientError(error: Error, errorInfo?: any, context?: Record<string, any>): void {
  logger.systemError(error, {
    ...context,
    errorInfo,
    environment: 'client',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined
  })
}

// Performance monitoring helper
export function withPerformanceLogging<T extends (...args: any[]) => any>(
  fn: T,
  operation: string,
  context?: Record<string, any>
): T {
  return ((...args: Parameters<T>) => {
    const endTimer = logger.startTimer(operation, context)
    try {
      const result = fn(...args)
      
      // Handle promises
      if (result && typeof result.then === 'function') {
        return result
          .then((res: any) => {
            endTimer()
            return res
          })
          .catch((error: any) => {
            endTimer()
            logger.systemError(error, { ...context, operation })
            throw error
          })
      }
      
      endTimer()
      return result
    } catch (error) {
      endTimer()
      logger.systemError(error as Error, { ...context, operation })
      throw error
    }
  }) as T
}