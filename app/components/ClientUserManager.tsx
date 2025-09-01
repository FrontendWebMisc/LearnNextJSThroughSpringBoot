'use client'

import { useState, useCallback, useEffect } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { apiRequest, retryApiRequest, getErrorMessage, isValidationError, isDuplicateEmailError, isNetworkError } from '../lib/client-error-handler'
import { ErrorDisplay, FormFieldError, NetworkErrorBanner } from './ErrorComponents'
import { logger } from '../lib/logger'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const fetcher = async (url: string) => {
  return retryApiRequest(() => apiRequest(url))
}

export default function ClientUserManager() {
  const [isAdding, setIsAdding] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })
  const [formError, setFormError] = useState<any>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [operationLoading, setOperationLoading] = useState<{
    create: boolean
    update: boolean
    delete: Record<number, boolean>
  }>({
    create: false,
    update: false,
    delete: {}
  })
  
  // Use SWR config for advanced cache manipulation
  const { cache, mutate: globalMutate } = useSWRConfig()
  
  const { 
    data: users, 
    error, 
    isLoading, 
    isValidating,
    mutate: mutateCurrent 
  } = useSWR<User[]>('/api/users', fetcher, {
    // SWR-specific error handling options
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
    
    // Advanced error handling with SWR
    shouldRetryOnError: (error) => {
      logger.debug('SWR shouldRetryOnError check', {
        error: getErrorMessage(error),
        statusCode: error?.status,
        operation: 'swr_should_retry'
      })
      return shouldRetry(error)
    },
    
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    
    // SWR callbacks with logging
    onError: (error, key) => {
      logger.error('SWR Component Error', {
        key,
        error: getErrorMessage(error),
        statusCode: error?.status,
        operation: 'user_list_fetch'
      })
      
      if (isNetworkError(error)) {
        setIsOnline(false)
      }
    },
    
    onSuccess: (data, key) => {
      logger.info('SWR Component Success', {
        key,
        userCount: data?.length || 0,
        operation: 'user_list_fetch'
      })
      setIsOnline(true)
    },
    
    onLoadingSlow: (key) => {
      logger.warn('SWR Component Slow Loading', {
        key,
        threshold: '3s',
        operation: 'user_list_fetch'
      })
    },
    
    // Keep previous data during revalidation
    keepPreviousData: true,
    
    // Fallback data
    fallbackData: [],
    
    // Dedupe interval
    dedupingInterval: 2000,
    
    // Focus throttle
    focusThrottleInterval: 5000,
    
    // Loading timeout
    loadingTimeout: 3000
  })

  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const clearForm = useCallback(() => {
    setFormData({ name: '', email: '', age: '' })
    setFormError(null)
    setIsAdding(false)
    setEditingUser(null)
  }, [])

  const handleRetry = useCallback(() => {
    mutateCurrent()
  }, [mutateCurrent])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setOperationLoading(prev => ({ ...prev, create: true }))
    setFormError(null)
    
    const newUserData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: parseInt(formData.age)
    }
    
    // Optimistic update with SWR
    const optimisticUser = {
      id: Date.now(), // Temporary ID
      ...newUserData
    }
    
    logger.userAction('create_user_attempt', undefined, {
      operation: 'user_create',
      userData: newUserData
    })
    
    try {
      // SWR optimistic update
      await mutateCurrent(
        async (currentUsers) => {
          // Add optimistic user to current data
          const optimisticData = [...(currentUsers || []), optimisticUser]
          
          // Perform the actual API call
          const newUser = await retryApiRequest(() => 
            apiRequest('/api/users', {
              method: 'POST',
              body: JSON.stringify(newUserData)
            })
          )
          
          // Return updated data with real user
          return [...(currentUsers || []), newUser]
        },
        {
          optimisticData: [...(users || []), optimisticUser],
          rollbackOnError: true,
          populateCache: true,
          revalidate: false // Don't revalidate immediately since we just got fresh data
        }
      )
      
      logger.userAction('create_user_success', undefined, {
        operation: 'user_create',
        userData: newUserData
      })
      
      // Success - clear form
      clearForm()
      
    } catch (error) {
      logger.userAction('create_user_error', undefined, {
        operation: 'user_create',
        error: getErrorMessage(error),
        userData: newUserData
      })
      
      setFormError(error)
      
      // Show user-friendly error message
      if (isDuplicateEmailError(error)) {
        // Focus on email field for duplicate email errors
        const emailField = document.querySelector('input[type="email"]') as HTMLElement
        emailField?.focus()
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, create: false }))
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    
    setOperationLoading(prev => ({ ...prev, update: true }))
    setFormError(null)

    try {
      // Only send fields that have changed
      const updates: Partial<{ name: string; email: string; age: number }> = {}
      if (formData.name.trim() !== editingUser.name) updates.name = formData.name.trim()
      if (formData.email.trim() !== editingUser.email) updates.email = formData.email.trim()
      if (parseInt(formData.age) !== editingUser.age) updates.age = parseInt(formData.age)
      
      // Only make request if there are actual changes
      if (Object.keys(updates).length === 0) {
        clearForm()
        return
      }

      await retryApiRequest(() =>
        apiRequest(`/api/users/${editingUser.id}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        })
      )
      
      // Success - refresh data and clear form
      await mutateCurrent()
      clearForm()
      
    } catch (error) {
      console.error('Error updating user:', error)
      setFormError(error)
    } finally {
      setOperationLoading(prev => ({ ...prev, update: false }))
    }
  }

  const handleDelete = async (userId: number) => {
    const userToDelete = users?.find(u => u.id === userId)
    if (!userToDelete) return
    
    if (!confirm(`Are you sure you want to delete ${userToDelete.name}?`)) return

    setOperationLoading(prev => ({ 
      ...prev, 
      delete: { ...prev.delete, [userId]: true }
    }))

    logger.userAction('delete_user_attempt', undefined, {
      operation: 'user_delete',
      userId,
      userName: userToDelete.name
    })

    try {
      // SWR optimistic update for delete
      await mutateCurrent(
        async (currentUsers) => {
          // Remove user optimistically
          const filteredUsers = (currentUsers || []).filter(u => u.id !== userId)
          
          // Perform the actual API call
          await retryApiRequest(() =>
            apiRequest(`/api/users/${userId}`, {
              method: 'DELETE'
            })
          )
          
          // Return filtered data
          return filteredUsers
        },
        {
          optimisticData: (users || []).filter(u => u.id !== userId),
          rollbackOnError: true,
          populateCache: true,
          revalidate: false
        }
      )
      
      logger.userAction('delete_user_success', undefined, {
        operation: 'user_delete',
        userId,
        userName: userToDelete.name
      })
      
    } catch (error) {
      logger.userAction('delete_user_error', undefined, {
        operation: 'user_delete',
        error: getErrorMessage(error),
        userId,
        userName: userToDelete.name
      })
      
      // Show a toast or temporary error message for delete operations
      alert(`Failed to delete ${userToDelete.name}: ${getErrorMessage(error)}`)
    } finally {
      setOperationLoading(prev => ({ 
        ...prev, 
        delete: { ...prev.delete, [userId]: false }
      }))
    }
  }

  const startEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age.toString()
    })
    setIsAdding(false)
  }

  const cancelEdit = () => {
    clearForm()
  }

  // Main error display for data loading
  if (error) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Client-Side Component with SWR</h2>
        <ErrorDisplay 
          error={error}
          onRetry={handleRetry}
          showDetails={true}
          className="mb-4"
        />
      </div>
    )
  }

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <NetworkErrorBanner isOnline={isOnline} onRetry={handleRetry} />
      
      <h2 className="text-xl font-bold text-gray-900 mb-6">Client-Side Component with SWR</h2>
      <p className="text-gray-700 mb-4">
        This component uses SWR for client-side data fetching with automatic revalidation,
        caching, and real-time updates. It demonstrates full CRUD operations with comprehensive error handling.
      </p>
      
      {/* Add/Edit Form */}
      {(isAdding || editingUser) && (
        <form onSubmit={editingUser ? handleUpdate : handleCreate} className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          
          {/* Form Error Display */}
          {formError && (
            <div className="mb-4">
              <ErrorDisplay 
                error={formError}
                onDismiss={() => setFormError(null)}
                showDetails={false}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isValidationError(formError) ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={operationLoading.create || operationLoading.update}
              />
              <FormFieldError error={formError} fieldName="name" />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isValidationError(formError) || isDuplicateEmailError(formError) ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={operationLoading.create || operationLoading.update}
              />
              <FormFieldError error={formError} fieldName="email" />
            </div>
            <div>
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isValidationError(formError) ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={operationLoading.create || operationLoading.update}
              />
              <FormFieldError error={formError} fieldName="age" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={operationLoading.create || operationLoading.update || !isOnline}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {(operationLoading.create || operationLoading.update) && (
                <span className="animate-spin">⟳</span>
              )}
              {editingUser ? 'Update' : 'Add'} User
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              disabled={operationLoading.create || operationLoading.update}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Action Buttons */}
      {!isAdding && !editingUser && (
        <button
          onClick={() => setIsAdding(true)}
          disabled={!isOnline}
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add New User
        </button>
      )}

      {/* User List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Users 
            {isLoading && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
            {isValidating && !isLoading && <span className="text-sm text-blue-500 ml-2">(Updating...)</span>}
            {!isOnline && <span className="text-sm text-orange-500 ml-2">(Offline)</span>}
            {users && <span className="text-xs text-gray-400 ml-2">({users.length} total)</span>}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRetry}
              disabled={isLoading || !isOnline}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {(isLoading || isValidating) && <span className="animate-spin">⟳</span>}
              {isValidating ? 'Updating' : 'Refresh'}
            </button>
            
            {/* SWR Cache Info */}
            <button
              onClick={() => {
                logger.info('SWR Cache Status', {
                  cacheSize: cache.size,
                  hasUsersCache: cache.has('/api/users'),
                  operation: 'cache_debug'
                })
                console.log('SWR Cache:', { 
                  size: cache.size, 
                  keys: Array.from(cache.keys()) 
                })
              }}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              title="Debug: Log SWR cache info"
            >
              🔍 Cache
            </button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <div key={user.id} className="p-4 bg-white rounded-lg shadow border">
              <h4 className="font-medium text-gray-900">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mb-3">Age: {user.age}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(user)}
                  disabled={!isOnline || isAdding || editingUser !== null}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={!isOnline || operationLoading.delete[user.id] || isAdding || editingUser !== null}
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {operationLoading.delete[user.id] && (
                    <span className="animate-spin text-xs">⟳</span>
                  )}
                  Delete
                </button>
              </div>
            </div>
          )) || (isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow border animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-3"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-12"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No users found. {!isOnline ? 'Check your connection and try again.' : 'Add some users to get started.'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}