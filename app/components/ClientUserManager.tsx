'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ClientUserManager() {
  const [isAdding, setIsAdding] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })
  
  const { data: users, error, isLoading } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age)
        })
      })
      
      if (response.ok) {
        mutate('/api/users')
        setFormData({ name: '', email: '', age: '' })
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age)
        })
      })
      
      if (response.ok) {
        mutate('/api/users')
        setEditingUser(null)
        setFormData({ name: '', email: '', age: '' })
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        mutate('/api/users')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
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
    setEditingUser(null)
    setIsAdding(false)
    setFormData({ name: '', email: '', age: '' })
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <p className="text-red-600">Error loading users: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Client-Side Component with SWR</h2>
      <p className="text-gray-700 mb-4">
        This component uses SWR for client-side data fetching with automatic revalidation,
        caching, and real-time updates. It demonstrates full CRUD operations.
      </p>
      
      {/* Add/Edit Form */}
      {(isAdding || editingUser) && (
        <form onSubmit={editingUser ? handleUpdate : handleCreate} className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingUser ? 'Update' : 'Add'} User
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add New User
        </button>
      )}

      {/* User List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Users {isLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
          </h3>
          <button
            onClick={() => mutate('/api/users')}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
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
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
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
          ) : null)}
        </div>
      </div>
    </div>
  )
}