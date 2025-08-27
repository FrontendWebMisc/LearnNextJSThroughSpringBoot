import Link from "next/link";

// This is the HOME PAGE component - equivalent to @GetMapping("/") in Spring Boot
// In Next.js, this file at app/page.tsx automatically handles GET requests to "/"
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 
        HEADER SECTION 
        Similar to how you might have a header in a Thymeleaf template
      */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Next.js App Router Demo
        </h1>
        <p className="text-lg text-gray-600">
          Learn Next.js routing concepts coming from Spring Boot background
        </p>
      </header>

      {/* 
        MAIN CONTENT SECTION
        Think of this as the main content you'd return in a Spring Boot controller
      */}
      <main>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🚀 App Router Features</h2>
          <p className="mb-4">
            This branch demonstrates Next.js App Router - the new file-based routing system.
            Each folder in the `app` directory represents a route segment.
          </p>
          
          {/* 
            NAVIGATION LINKS
            Similar to how you'd create navigation in Spring Boot templates
            Link component provides client-side navigation (faster than page reloads)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Basic Route Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">📄 Basic Route</h3>
              <p className="text-sm text-gray-600 mb-3">
                Static route - like @GetMapping("/about")
              </p>
              <Link 
                href="/about" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                Visit About Page
              </Link>
            </div>

            {/* Dynamic Route Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">🔗 Dynamic Route</h3>
              <p className="text-sm text-gray-600 mb-3">
                Dynamic parameter - like @GetMapping("/users/{id}")
              </p>
              <Link 
                href="/users/123" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
              >
                Visit User Profile
              </Link>
            </div>

            {/* Nested Layout Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">📱 Dashboard Layout</h3>
              <p className="text-sm text-gray-600 mb-3">
                Nested layout with sidebar - like template inheritance
              </p>
              <Link 
                href="/dashboard" 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
              >
                View Dashboard
              </Link>
            </div>

            {/* Route Groups Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">📦 Route Groups</h3>
              <p className="text-sm text-gray-600 mb-3">
                Organized routes without affecting URL structure
              </p>
              <Link 
                href="/features" 
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 inline-block"
              >
                Marketing Features
              </Link>
            </div>
          </div>
        </div>

        {/* 
          SPRING BOOT COMPARISON SECTION
          Educational content to help understand the concepts
        */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔄 Spring Boot vs Next.js</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Spring Boot Way</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`@RestController
public class AppController {
  
  @GetMapping("/")
  public String home() {
    return "index";
  }
  
  @GetMapping("/users/{id}")
  public String user(@PathVariable String id) {
    return "user-profile";
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js App Router</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`app/
  page.tsx              // GET /
  users/
    [id]/
      page.tsx          // GET /users/123
      
// File structure = Routes
// No controller needed!`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
