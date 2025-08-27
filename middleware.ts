import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// MIDDLEWARE - Like Spring Boot Interceptors/Filters
// This runs BEFORE your pages and API routes
export function middleware(request: NextRequest) {
  // Like @Component implementing HandlerInterceptor
  console.log("Middleware executing for:", request.nextUrl.pathname);
  
  // Check authentication (like Spring Security filters)
  const token = request.cookies.get("auth-token");
  
  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Add custom headers (like in Spring interceptors)
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "Next.js Middleware");
  
  return response;
}

// Configure which paths to run middleware on
export const config = {
  matcher: ["/admin/:path*", "/api/protected/:path*"]
}
