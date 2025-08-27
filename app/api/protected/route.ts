// PROTECTED API ROUTE - Protected by Middleware
// This API route is protected by middleware, just like Spring Boot @PreAuthorize

import { NextRequest, NextResponse } from 'next/server';

// GET /api/protected - Protected endpoint
export async function GET(request: NextRequest) {
  // This endpoint is protected by middleware
  // Similar to Spring Boot @RestController with @PreAuthorize
  
  const authToken = request.cookies.get('auth-token')?.value;
  
  // Additional auth check (middleware already verified, but showing pattern)
  if (!authToken) {
    return NextResponse.json(
      { 
        error: 'Unauthorized', 
        message: 'This endpoint requires authentication',
        hint: 'Add auth-token cookie or visit /login'
      }, 
      { status: 401 }
    );
  }

  // Simulate protected data (like Spring Boot service call)
  const protectedData = {
    message: 'This is protected data from Next.js API route!',
    user: {
      id: '123',
      email: 'admin@example.com',
      role: 'admin'
    },
    serverInfo: {
      timestamp: new Date().toISOString(),
      endpoint: '/api/protected',
      method: 'GET',
      authenticated: true
    },
    businessData: {
      salesTotal: 156789.50,
      activeUsers: 1247,
      pendingOrders: 23
    }
  };

  return NextResponse.json(protectedData, {
    status: 200,
    headers: {
      'X-Protected-Route': 'true',
      'X-Auth-Required': 'yes'
    }
  });
}

// POST /api/protected - Create protected resource
export async function POST(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;
  
  if (!authToken) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    // Simulate creating a protected resource
    const newResource = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
      createdBy: 'admin@example.com'
    };

    return NextResponse.json({
      success: true,
      message: 'Resource created successfully',
      data: newResource
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// PUT /api/protected - Update protected resource  
export async function PUT(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;
  
  if (!authToken) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    // Simulate updating a protected resource
    const updatedResource = {
      id: body.id || '123',
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin@example.com'
    };

    return NextResponse.json({
      success: true,
      message: 'Resource updated successfully',
      data: updatedResource
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE /api/protected - Delete protected resource
export async function DELETE(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;
  
  if (!authToken) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const resourceId = url.searchParams.get('id');

  if (!resourceId) {
    return NextResponse.json(
      { error: 'Resource ID required' },
      { status: 400 }
    );
  }

  // Simulate deleting a protected resource
  return NextResponse.json({
    success: true,
    message: `Resource ${resourceId} deleted successfully`,
    deletedAt: new Date().toISOString(),
    deletedBy: 'admin@example.com'
  });
}