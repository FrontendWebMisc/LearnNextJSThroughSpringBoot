import { NextRequest } from 'next/server'
import { withErrorHandling, parseJSONSafely, validateContentType } from '../../../lib/api-handler'
import { ApiError, ErrorCode } from '../../../lib/errors'
import { Validator, userUpdateValidationSchema } from '../../../lib/validation'
import type { User } from '../route'

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
]

function validateUserId(id: string): number {
  const userId = parseInt(id, 10)
  
  if (isNaN(userId) || userId <= 0) {
    throw ApiError.validation('User ID must be a positive integer', { 
      providedId: id,
      expectedFormat: 'positive integer'
    })
  }
  
  return userId
}

function findUserById(id: number): User {
  const user = users.find(u => u.id === id)
  
  if (!user) {
    throw ApiError.userNotFound(id)
  }
  
  return user
}

export const GET = withErrorHandling(async (request, context, { params }) => {
  const { id } = await params
  const userId = validateUserId(id)

  // Simulate potential database error (2% chance)
  if (Math.random() < 0.02) {
    throw ApiError.internal('Database query failed', {
      operation: 'fetch_user_by_id',
      userId,
      attempted_at: new Date().toISOString()
    })
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const user = findUserById(userId)
  return user
})

export const PUT = withErrorHandling(async (request, context, { params }) => {
  validateContentType(request, 'application/json')
  
  const { id } = await params
  const userId = validateUserId(id)
  const body = await parseJSONSafely(request)
  
  // Find existing user first
  const existingUser = findUserById(userId)
  
  // Validate update data (allows partial updates)
  const validatedData = Validator.validate(body, userUpdateValidationSchema)
  
  // Check for email conflicts (if email is being updated)
  if (validatedData.email && validatedData.email !== existingUser.email) {
    const conflictingUser = users.find(user => 
      user.id !== userId && 
      user.email.toLowerCase() === validatedData.email.toLowerCase()
    )
    
    if (conflictingUser) {
      throw new ApiError(
        ErrorCode.DUPLICATE_EMAIL,
        'Another user already has this email address',
        409,
        { 
          conflictingEmail: validatedData.email,
          conflictingUserId: conflictingUser.id,
          targetUserId: userId
        }
      )
    }
  }

  // Simulate potential database error (3% chance)
  if (Math.random() < 0.03) {
    throw ApiError.internal('Failed to update user in database', {
      operation: 'update_user',
      userId,
      updateData: validatedData
    })
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = users.findIndex(u => u.id === userId)
  
  // Prepare updated user data
  const updatedUser: User = {
    ...users[userIndex],
    ...(validatedData.name && { name: validatedData.name.trim() }),
    ...(validatedData.email && { email: validatedData.email.toLowerCase().trim() }),
    ...(validatedData.age !== undefined && { age: Number(validatedData.age) })
  }
  
  users[userIndex] = updatedUser
  return updatedUser
})

export const DELETE = withErrorHandling(async (request, context, { params }) => {
  const { id } = await params
  const userId = validateUserId(id)
  
  // Find existing user first (this will throw if not found)
  const existingUser = findUserById(userId)

  // Simulate potential database error (3% chance)
  if (Math.random() < 0.03) {
    throw ApiError.internal('Failed to delete user from database', {
      operation: 'delete_user',
      userId,
      attempted_at: new Date().toISOString()
    })
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = users.findIndex(u => u.id === userId)
  const deletedUser = users.splice(userIndex, 1)[0]
  
  return {
    message: 'User deleted successfully',
    deletedUser
  }
})