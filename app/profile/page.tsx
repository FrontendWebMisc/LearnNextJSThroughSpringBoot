// PROFILE PAGE - Shows Middleware Redirects
// This page demonstrates conditional redirects based on auth state

'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check authentication status (simulated)
    const checkAuth = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='));
      
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);

  const handleLogin = () => {
    // Simulate login by setting cookie
    document.cookie = 'auth-token=valid-token; path=/';
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* PROFILE HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          👤 User Profile
        </h1>
        <p className="text-lg text-gray-600">
          This page demonstrates middleware redirect logic
        </p>
      </header>

      {/* AUTH STATUS */}
      <div className={`p-6 rounded-lg mb-8 ${
        isAuthenticated ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <h2 className="text-lg font-semibold mb-2">
          {isAuthenticated ? '✅ Authenticated User' : '❌ Not Authenticated'}
        </h2>
        <p className="text-sm mb-4">
          {isAuthenticated 
            ? 'You have a valid auth token. You can access protected routes!'
            : 'No auth token found. Protected routes will redirect you to login.'
          }
        </p>
        
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
              <a 
                href="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
              >
                Visit Admin (Protected)
              </a>
            </>
          ) : (
            <>
              <button 
                onClick={handleLogin}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Login (Set Token)
              </button>
              <a 
                href="/admin"
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed inline-block"
              >
                Admin (Will Redirect)
              </a>
            </>
          )}
        </div>
      </div>

      {/* USER PROFILE CONTENT */}
      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <p className="text-gray-900">John Doe (Spring Boot Developer)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">john.doe@example.com</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-gray-900">Administrator</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Login
              </label>
              <p className="text-gray-900">{new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Permissions</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Admin Access
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                API Access
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                User Management
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">
            Please login to view your profile information
          </p>
          <button 
            onClick={handleLogin}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Login to Continue
          </button>
        </div>
      )}

      {/* MIDDLEWARE DEMONSTRATION */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Middleware Redirect Demo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Interceptor</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Component
public class AuthInterceptor 
    implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler
    ) throws Exception {
        
        String token = request.getHeader("Authorization");
        
        if (requiresAuth(request.getRequestURI()) 
            && !isValidToken(token)) {
            
            // Redirect to login
            response.sendRedirect("/login");
            return false;
        }
        
        return true;
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Middleware</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// middleware.ts
export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token");
    
    // Check if route requires authentication
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            // Redirect to login (like Spring Boot)
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/protected/:path*"]
};`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Same behavior:</strong> Both approaches check authentication and redirect 
            unauthenticated users to the login page before they can access protected routes!
          </p>
        </div>
      </div>

      {/* TEST LINKS */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">🧪 Test Middleware Protection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Protected Routes:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/admin" className="text-blue-600 hover:text-blue-800">
                  /admin - Admin dashboard (redirects if not authenticated)
                </a>
              </li>
              <li>
                <a href="/api/protected" className="text-blue-600 hover:text-blue-800">
                  /api/protected - Protected API endpoint
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Public Routes:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800">
                  / - Home page (always accessible)
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
                  /dashboard - User dashboard (public)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}