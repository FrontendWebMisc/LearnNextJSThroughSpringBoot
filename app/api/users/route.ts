import { NextRequest } from 'next/server'
import { withErrorHandling, parseJSONSafely, validateContentType } from '../../lib/api-handler'
import { ApiError, ErrorCode } from '../../lib/errors'
import { Validator, userValidationSchema } from '../../lib/validation'

export interface User {
  id: number
  name: string
  email: string
  age: number
}

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
]

let nextId = 4

export const GET = withErrorHandling(async (request, context) => {
  // Simulate potential database error (5% chance)
  if (Math.random() < 0.05) {
    throw ApiError.internal('Database connection failed', { 
      operation: 'fetch_users',
      attempted_at: new Date().toISOString()
    })
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return users
})

export const POST = withErrorHandling(async (request, context) => {
  validateContentType(request, 'application/json')
  
  const body = await parseJSONSafely(request)
  
  // Validate input data
  const validatedData = Validator.validate(body, userValidationSchema)
  
  // Check for duplicate email
  const existingUser = users.find(user => 
    user.email.toLowerCase() === validatedData.email.toLowerCase()
  )
  
  if (existingUser) {
    throw new ApiError(
      ErrorCode.DUPLICATE_EMAIL,
      'A user with this email already exists',
      409,
      { 
        conflictingEmail: validatedData.email,
        existingUserId: existingUser.id 
      }
    )
  }

  // Simulate potential database error (3% chance)
  if (Math.random() < 0.03) {
    throw ApiError.internal('Failed to save user to database', {
      operation: 'create_user',
      userData: { ...validatedData, id: nextId }
    })
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newUser: User = {
    id: nextId++,
    name: validatedData.name.trim(),
    email: validatedData.email.toLowerCase().trim(),
    age: Number(validatedData.age)
  }
  
  users.push(newUser)
  return newUser
})