// INDIVIDUAL USER API ROUTE - Like Spring Boot @PathVariable endpoints
import { NextRequest, NextResponse } from 'next/server';

// USER TYPES (same as parent route)
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

// MOCK DATABASE (same as parent route)
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

// GET /api/users/{id} - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // AUTHENTICATION CHECK - Like Spring Security
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const userId = params.id;
    
    // FIND USER - Like userRepository.findById() in Spring Boot
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return NextResponse.json(
        { 
          error: 'User not found',
          message: `User with ID ${userId} does not exist`
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: user,
      message: 'User retrieved successfully'
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Query failed',
        message: 'Unable to fetch user'
      },
      { status: 500 }
    );
  }
}

// PUT /api/users/{id} - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const userId = params.id;
    const updates = await request.json();
    
    // FIND USER
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { 
          error: 'User not found',
          message: `User with ID ${userId} does not exist`
        },
        { status: 404 }
      );
    }
    
    // VALIDATION - Like @Valid in Spring Boot
    const errors: string[] = [];
    
    if (updates.email && !updates.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (updates.firstName && updates.firstName.length < 2) {
      errors.push('First name must be at least 2 characters');
    }
    
    if (updates.lastName && updates.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters');
    }
    
    if (updates.role && !['USER', 'ADMIN', 'MODERATOR'].includes(updates.role)) {
      errors.push('Role must be USER, ADMIN, or MODERATOR');
    }
    
    if (updates.status && !['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(updates.status)) {
      errors.push('Status must be ACTIVE, INACTIVE, or SUSPENDED');
    }
    
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          errors
        },
        { status: 400 }
      );
    }
    
    // CHECK EMAIL UNIQUENESS (if email is being updated)
    if (updates.email) {
      const emailExists = mockUsers.find(u => 
        u.email === updates.email && u.id !== userId
      );
      
      if (emailExists) {
        return NextResponse.json(
          { 
            error: 'Email already exists',
            message: 'Another user already has this email'
          },
          { status: 409 }
        );
      }
    }
    
    // UPDATE USER - Like userService.updateUser()
    const currentUser = mockUsers[userIndex];
    const updatedUser: User = {
      ...currentUser,
      ...updates,
      id: currentUser.id, // Prevent ID changes
      createdAt: currentUser.createdAt, // Prevent creation date changes
    };
    
    mockUsers[userIndex] = updatedUser;
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Update failed',
        message: 'Unable to update user'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users/{id} - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const userId = params.id;
    
    // FIND USER
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { 
          error: 'User not found',
          message: `User with ID ${userId} does not exist`
        },
        { status: 404 }
      );
    }
    
    // BUSINESS LOGIC CHECK - Like in Spring Boot service layer
    const userToDelete = mockUsers[userIndex];
    
    // Prevent deleting the last admin
    const adminCount = mockUsers.filter(u => u.role === 'ADMIN').length;
    if (userToDelete.role === 'ADMIN' && adminCount === 1) {
      return NextResponse.json(
        { 
          error: 'Cannot delete user',
          message: 'Cannot delete the last admin user'
        },
        { status: 400 }
      );
    }
    
    // DELETE USER - Like userRepository.deleteById()
    mockUsers.splice(userIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: `User ${userId} deleted successfully`,
      deletedAt: new Date().toISOString(),
      deletedUser: {
        id: userToDelete.id,
        username: userToDelete.username,
        email: userToDelete.email
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Deletion failed',
        message: 'Unable to delete user'
      },
      { status: 500 }
    );
  }
}