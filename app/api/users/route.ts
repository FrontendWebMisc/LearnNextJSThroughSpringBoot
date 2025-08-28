// USERS API ROUTE - Like Spring Boot @RestController for User management
import { NextRequest, NextResponse } from 'next/server';

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
export async function GET(request: NextRequest) {
  // AUTHENTICATION CHECK - Like Spring Security @PreAuthorize("hasRole('ADMIN')")
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { 
        error: 'Unauthorized',
        message: 'Admin access required'
      },
      { status: 401 }
    );
  }
  
  try {
    // QUERY PARAMETERS - Like @RequestParam in Spring Boot
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';
    
    // FILTERING - Like Spring Data JPA specifications
    let filteredUsers = [...mockUsers];
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    // PAGINATION - Like Pageable in Spring Boot
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
        hasNext: endIndex < filteredUsers.length,
        hasPrev: page > 1
      },
      filters: { search, role, status }
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Query failed',
        message: 'Unable to fetch users'
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  // AUTHENTICATION CHECK
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const userRequest: CreateUserRequest = await request.json();
    
    // VALIDATION - Like @Valid annotation in Spring Boot
    const errors: string[] = [];
    
    if (!userRequest.username || userRequest.username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }
    
    if (!userRequest.email || !userRequest.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (!userRequest.firstName || userRequest.firstName.length < 2) {
      errors.push('First name must be at least 2 characters');
    }
    
    if (!userRequest.lastName || userRequest.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters');
    }
    
    if (!userRequest.password || userRequest.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          message: 'Please fix the following errors',
          errors
        },
        { status: 400 }
      );
    }
    
    // CHECK DUPLICATES - Like userRepository.findByUsername()
    const existingUser = mockUsers.find(u => 
      u.username === userRequest.username || u.email === userRequest.email
    );
    
    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'User already exists',
          message: 'Username or email is already taken'
        },
        { status: 409 }
      );
    }
    
    // CREATE NEW USER - Like userService.createUser()
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: userRequest.username,
      email: userRequest.email,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      role: userRequest.role || 'USER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    
    // SIMULATE SAVE TO DATABASE
    mockUsers.push(newUser);
    
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Creation failed',
        message: 'Unable to create user'
      },
      { status: 500 }
    );
  }
}