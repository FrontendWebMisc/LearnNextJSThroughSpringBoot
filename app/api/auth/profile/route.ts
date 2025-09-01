// AUTHENTICATION API ROUTE - Like Spring Boot @RestController with security
import { NextRequest } from 'next/server'
import { withApiHandler, requireAuth, parseRequestBody } from '../../../lib/api-middleware'
import { ApiError, Validator } from '../../../lib/api-errors'

// USER PROFILE TYPE - Like your User entity/DTO
interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

// GET /api/auth/profile - Get current user profile
export const GET = withApiHandler(async (request, context) => {
  // AUTHENTICATION CHECK - Like Spring Security @PreAuthorize
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  requireAuth(token)
  
  // SIMULATE USER LOOKUP - Like userRepository.findByToken() 
  const userProfile: UserProfile = {
    id: 'user-123',
    username: 'springboot_dev',
    email: 'developer@springboot.example.com',
    firstName: 'Spring',
    lastName: 'Developer',
    role: 'ADMIN',
    lastLogin: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'en'
    }
  }
  
  return {
    profile: userProfile,
    message: 'User profile retrieved successfully'
  }
})

// PUT /api/auth/profile - Update user profile
export const PUT = withApiHandler(async (request, context) => {
  // AUTHENTICATION CHECK
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  requireAuth(token)
  
  // PARSE REQUEST BODY
  const updates = await parseRequestBody(request)
  
  // VALIDATE INPUT - Like @Valid annotation in Spring Boot
  const allowedFields = ['firstName', 'lastName', 'preferences']
  const filteredUpdates = Object.keys(updates)
    .filter(key => allowedFields.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = updates[key]
      return obj
    }, {})
  
  if (Object.keys(filteredUpdates).length === 0) {
    throw ApiError.validation('No valid fields to update')
  }
  
  // Validate specific fields if provided
  if (filteredUpdates.firstName) {
    const validation = Validator.validate({ firstName: filteredUpdates.firstName }, [
      {
        field: 'firstName',
        message: 'First name must be at least 2 characters',
        validator: (value) => Validator.required(value) && Validator.minLength(2)(value)
      }
    ])
    
    if (!validation.isValid) {
      throw ApiError.validation('Invalid first name', { validationErrors: validation.errors })
    }
  }
  
  if (filteredUpdates.lastName) {
    const validation = Validator.validate({ lastName: filteredUpdates.lastName }, [
      {
        field: 'lastName',
        message: 'Last name must be at least 2 characters',
        validator: (value) => Validator.required(value) && Validator.minLength(2)(value)
      }
    ])
    
    if (!validation.isValid) {
      throw ApiError.validation('Invalid last name', { validationErrors: validation.errors })
    }
  }
  
  // SIMULATE UPDATE - Like userService.updateProfile()
  const updatedProfile: Partial<UserProfile> = {
    id: 'user-123',
    ...filteredUpdates,
    lastLogin: new Date().toISOString()
  }
  
  return {
    profile: updatedProfile,
    message: 'Profile updated successfully'
  }
})