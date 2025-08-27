// ADMIN PAGE - Protected by Middleware
// This page is protected by middleware, just like Spring Security @PreAuthorize

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* ADMIN HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          🔐 Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          This page is protected by Next.js middleware - just like Spring Security!
        </p>
      </header>

      {/* MIDDLEWARE PROTECTION INFO */}
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-red-900">
          🛡️ Middleware Protection Active!
        </h2>
        <p className="text-sm text-red-800">
          This page can only be accessed with proper authentication. The middleware 
          (in <code>middleware.ts</code>) checks for an <code>auth-token</code> cookie 
          before allowing access - just like Spring Boot interceptors!
        </p>
      </div>

      {/* ADMIN FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-semibold mb-3">👥 User Management</h3>
          <p className="text-gray-600 text-sm mb-4">
            Manage user accounts, roles, and permissions
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Users
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-semibold mb-3">📊 Analytics</h3>
          <p className="text-gray-600 text-sm mb-4">
            View detailed analytics and reports
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            View Reports
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-semibold mb-3">⚙️ System Settings</h3>
          <p className="text-gray-600 text-sm mb-4">
            Configure application settings and preferences
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Settings
          </button>
        </div>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Security Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot @PreAuthorize</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminData> getDashboard() {
        // Only accessible to ADMIN users
        AdminData data = adminService.getDashboardData();
        return ResponseEntity.ok(data);
    }
    
    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(
        @RequestBody CreateUserRequest request
    ) {
        // Admin-only user creation
        User user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Middleware Protection</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// middleware.ts
export function middleware(request: NextRequest) {
    // Check authentication like Spring Security filter
    const token = request.cookies.get("auth-token");
    
    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!token || !isValidAdminToken(token)) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"]
};`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Same protection:</strong> Both approaches protect admin routes by checking 
            authentication before allowing access. Next.js middleware runs at the edge for 
            faster responses!
          </p>
        </div>
      </div>

      {/* WARNING */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">
          ⚠️ How to Test This Page
        </h3>
        <p className="text-sm text-yellow-700 mb-3">
          This page is protected by middleware. To access it:
        </p>
        <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
          <li>Open browser DevTools → Application → Cookies</li>
          <li>Add cookie: <code>auth-token</code> = <code>valid-token</code></li>
          <li>Refresh this page</li>
          <li>Or visit <code>/login</code> to get redirected back here</li>
        </ol>
      </div>
    </div>
  );
}