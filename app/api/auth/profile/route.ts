// AUTHENTICATION API ROUTE - Like Spring Boot @RestController with security
import { NextRequest, NextResponse } from 'next/server';

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
export async function GET(request: NextRequest) {
  // AUTHENTICATION CHECK - Like Spring Security @PreAuthorize
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token === 'invalid') {
    return NextResponse.json(
      { 
        error: 'Unauthorized',
        message: 'Authentication token required',
        code: 'AUTH_TOKEN_MISSING'
      },
      { status: 401 }
    );
  }
  
  try {
    // TOKEN VALIDATION - Like JwtService.validateToken() in Spring Boot
    if (token !== 'valid-jwt-token') {
      return NextResponse.json(
        { 
          error: 'Invalid token',
          message: 'Authentication token is invalid or expired',
          code: 'AUTH_TOKEN_INVALID'
        },
        { status: 401 }
      );
    }
    
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
    };
    
    return NextResponse.json({
      success: true,
      data: userProfile,
      message: 'User profile retrieved successfully'
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Authentication failed',
        message: 'Unable to authenticate user',
        code: 'AUTH_FAILED'
      },
      { status: 401 }
    );
  }
}

// PUT /api/auth/profile - Update user profile
export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== 'valid-jwt-token') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const updates = await request.json();
    
    // VALIDATE INPUT - Like @Valid annotation in Spring Boot
    const allowedFields = ['firstName', 'lastName', 'preferences'];
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});
    
    // SIMULATE UPDATE - Like userService.updateProfile()
    const updatedProfile: Partial<UserProfile> = {
      id: 'user-123',
      ...filteredUpdates,
      lastLogin: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Update failed',
        message: 'Unable to update user profile'
      },
      { status: 400 }
    );
  }
}