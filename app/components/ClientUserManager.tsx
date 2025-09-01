'use client'

import { useState, useCallback, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { apiRequest, retryApiRequest, getErrorMessage, isValidationError, isDuplicateEmailError, isNetworkError } from '../lib/client-error-handler'
import { ErrorDisplay, FormFieldError, NetworkErrorBanner } from './ErrorComponents'

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
  
  const { data: users, error, isLoading, mutate: mutateCurrent } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    onError: (error) => {
      console.error('SWR Error:', error)
      if (isNetworkError(error)) {
        setIsOnline(false)
      }
    },
    onSuccess: () => {
      setIsOnline(true)
    }
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
    
    try {
      await retryApiRequest(() => 
        apiRequest('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            age: parseInt(formData.age)
          })
        })
      )
      
      // Success - refresh data and clear form
      await mutateCurrent()
      clearForm()
      
    } catch (error) {
      console.error('Error creating user:', error)
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
    if (!confirm('Are you sure you want to delete this user?')) return

    setOperationLoading(prev => ({ 
      ...prev, 
      delete: { ...prev.delete, [userId]: true }
    }))

    try {
      await retryApiRequest(() =>
        apiRequest(`/api/users/${userId}`, {
          method: 'DELETE'
        })
      )
      
      // Success - refresh data
      await mutateCurrent()
      
    } catch (error) {
      console.error('Error deleting user:', error)
      // Show a toast or temporary error message for delete operations
      alert(`Failed to delete user: ${getErrorMessage(error)}`)
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
            Users {isLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
            {!isOnline && <span className="text-sm text-orange-500 ml-2">(Offline)</span>}
          </h3>
          <button
            onClick={handleRetry}
            disabled={isLoading || !isOnline}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isLoading && <span className="animate-spin">⟳</span>}
            Refresh
          </button>
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