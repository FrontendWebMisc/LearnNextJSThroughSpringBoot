# Next.js Middleware Feature

## Spring Boot Developers: You Already Know This Pattern!
This is exactly like **Spring Boot Interceptors** and **Servlet Filters**! Middleware runs before your route handlers to check authentication, log requests, and modify responses.

**Your Familiar Spring Boot Interceptor:**
```java
@Component
public class AuthInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) throws Exception {
        
        // Check authentication before controller
        String token = request.getHeader("Authorization");
        if (!isValidToken(token)) {
            response.setStatus(401);
            return false; // Block request
        }
        
        // Log request
        logger.info("Request: {} {}", request.getMethod(), request.getRequestURI());
        return true; // Continue to controller
    }
}
```

**Next.js Middleware (same exact concept!):**
```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // Same logic as your Spring Boot interceptor!
    
    // Check authentication
    const token = request.headers.get('authorization')
    if (!isValidToken(token)) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    // Log request
    console.log(`Request: ${request.method} ${request.url}`)
    
    // Continue to page/API route (like return true)
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/admin/:path*']
}
```

## Key Concepts for Spring Boot Developers

### 1. Request Lifecycle (Same as Spring Boot!)
- **Middleware** runs first (like `@Component` interceptor)
- **Page/API Route** runs second (like `@RestController` method)
- **Response** can be modified at each step

### 2. Common Use Cases (Just Like Your Interceptors!)
- **Authentication** - Check JWT tokens before protected routes
- **Logging** - Log all requests with timing information
- **Rate Limiting** - Block too many requests from same IP
- **Redirects** - Send users to login page if not authenticated
- **CORS Headers** - Add cross-origin headers to responses

### 3. Middleware vs Spring Boot Filters
| Next.js Middleware | Spring Boot Equivalent |
|-------------------|------------------------|
| `middleware.ts` | `@Component` Interceptor |
| `NextRequest` | `HttpServletRequest` |
| `NextResponse` | `HttpServletResponse` |
| `matcher` config | `@RequestMapping` patterns |

## Examples in This Branch

1. **Authentication Middleware** - `/middleware.ts` (JWT token validation)
2. **Logging Middleware** - Request/response logging with timing
3. **Rate Limiting** - IP-based request throttling
4. **Admin Protection** - Role-based access control
5. **Redirect Middleware** - Conditional redirects based on user state

## Getting Started

Run the development server:
```bash
npm run dev
```

Test these middleware-protected routes:
- http://localhost:3000/dashboard - Requires authentication
- http://localhost:3000/admin - Requires admin role  
- http://localhost:3000/api/protected - API with rate limiting
- http://localhost:3000/profile - Automatic redirects

## Spring Boot Developer Tips

1. **Think interceptors** - Middleware = `HandlerInterceptor.preHandle()`
2. **Pattern matching** - `matcher` = `@RequestMapping` path patterns
3. **Chain execution** - Multiple middleware = interceptor chain
4. **Request modification** - Same as modifying `HttpServletRequest`
5. **Early returns** - `return NextResponse` = `return false` in interceptor