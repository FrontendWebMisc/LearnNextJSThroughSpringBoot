// USERS API ROUTE - Like Spring Boot @RestController for User management
import { NextRequest } from 'next/server'
import { withApiHandler, requireAuth, parseRequestBody, parseQueryParams, checkRateLimit } from '../../lib/api-middleware'
import { ApiError, Validator } from '../../lib/api-errors'

// USER TYPES - Like your User entity and DTOs
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  lastLogin?: string;
}

interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
}

// MOCK DATABASE - In real app: PostgreSQL, MySQL, etc.
const mockUsers: User[] = [
  {
    id: 'user-001',
    username: 'john_doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-03-01T08:45:00Z'
  },
  {
    id: 'user-002',
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2024-01-20T14:20:00Z',
    lastLogin: '2024-03-01T09:15:00Z'
  },
  {
    id: 'user-003',
    username: 'mike_wilson',
    email: 'mike.wilson@example.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'MODERATOR',
    status: 'ACTIVE',
    createdAt: '2024-02-01T09:10:00Z',
    lastLogin: '2024-02-28T16:30:00Z'
  }
];

// GET /api/users - List all users (with pagination)
export const GET = withApiHandler(async (request, context) => {
  // RATE LIMITING - Like Spring Boot rate limiting
  checkRateLimit(context.ip || 'unknown', 100, 60000)
  
  // AUTHENTICATION CHECK - Like Spring Security @PreAuthorize("hasRole('ADMIN')")
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  requireAuth(token)
  
  // QUERY PARAMETERS - Like @RequestParam in Spring Boot
  const params = parseQueryParams(request)
  const page = parseInt(params.page || '1')
  const limit = Math.min(parseInt(params.limit || '10'), 100) // Max 100 per page
  const search = params.search || ''
  const role = params.role || ''
  const status = params.status || ''
  
  // Validate query parameters
  if (page < 1) {
    throw ApiError.validation('Page must be greater than 0')
  }
  
  if (limit < 1) {
    throw ApiError.validation('Limit must be greater than 0')
  }
  
  if (role && !['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
    throw ApiError.validation('Invalid role filter')
  }
  
  if (status && !['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(status)) {
    throw ApiError.validation('Invalid status filter')
  }
  
  // FILTERING - Like Spring Data JPA specifications
  let filteredUsers = [...mockUsers]
  
  if (search) {
    const searchLower = search.toLowerCase()
    filteredUsers = filteredUsers.filter(user => 
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower)
    )
  }
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role)
  }
  
  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status === status)
  }
  
  // PAGINATION - Like Pageable in Spring Boot
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)
  
  return {
    users: paginatedUsers,
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit),
      hasNext: endIndex < filteredUsers.length,
      hasPrev: page > 1
    },
    filters: { search, role, status }
  }
})

// POST /api/users - Create new user
export const POST = withApiHandler(async (request, context) => {
  // AUTHENTICATION CHECK - Like Spring Security
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  requireAuth(token)
  
  // RATE LIMITING for user creation
  checkRateLimit(context.ip || 'unknown', 10, 60000) // Max 10 user creations per minute
  
  // PARSE REQUEST BODY - Like @RequestBody in Spring Boot
  const userRequest: CreateUserRequest = await parseRequestBody(request)
  
  // VALIDATION - Like @Valid annotation in Spring Boot
  const validationRules = [
    {
      field: 'username',
      message: 'Username must be at least 3 characters',
      validator: (value: any) => Validator.required(value) && Validator.minLength(3)(value)
    },
    {
      field: 'email', 
      message: 'Valid email is required',
      validator: (value: any) => Validator.required(value) && Validator.email(value)
    },
    {
      field: 'firstName',
      message: 'First name must be at least 2 characters',
      validator: (value: any) => Validator.required(value) && Validator.minLength(2)(value)
    },
    {
      field: 'lastName',
      message: 'Last name must be at least 2 characters', 
      validator: (value: any) => Validator.required(value) && Validator.minLength(2)(value)
    },
    {
      field: 'password',
      message: 'Password must be at least 8 characters',
      validator: (value: any) => Validator.required(value) && Validator.minLength(8)(value)
    },
    {
      field: 'role',
      message: 'Role must be USER, ADMIN, or MODERATOR',
      validator: (value: any) => !value || Validator.oneOf(['USER', 'ADMIN', 'MODERATOR'])(value)
    }
  ]
  
  const validation = Validator.validate(userRequest, validationRules)
  
  if (!validation.isValid) {
    throw ApiError.validation('Please fix the following errors', {
      validationErrors: validation.errors
    })
  }
  
  // CHECK DUPLICATES - Like userRepository.findByUsername()
  const existingUser = mockUsers.find(u => 
    u.username === userRequest.username || u.email === userRequest.email
  )
  
  if (existingUser) {
    if (existingUser.username === userRequest.username) {
      throw ApiError.duplicate('Username')
    }
    if (existingUser.email === userRequest.email) {
      throw ApiError.duplicate('Email address')
    }
  }
  
  // CREATE NEW USER - Like userService.createUser()
  const newUser: User = {
    id: `user-${Date.now()}`,
    username: userRequest.username.toLowerCase().trim(),
    email: userRequest.email.toLowerCase().trim(),
    firstName: userRequest.firstName.trim(),
    lastName: userRequest.lastName.trim(),
    role: userRequest.role || 'USER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  }
  
  // SIMULATE SAVE TO DATABASE
  mockUsers.push(newUser)
  
  // Remove password from response
  const { password, ...responseUser } = userRequest
  
  return {
    user: newUser,
    message: 'User created successfully'
  }
})