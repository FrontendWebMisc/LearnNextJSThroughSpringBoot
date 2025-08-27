// BASIC ROUTE EXAMPLE - About Page
// This demonstrates basic file-based routing like Spring Boot @GetMapping("/about")

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          📚 About Next.js App Router
        </h1>
        <p className="text-lg text-gray-600">
          File-based routing that Spring Boot developers will love!
        </p>
      </header>

      {/* ROUTING EXPLANATION */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🗂️ File-Based Routing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Controller</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
public class PageController {
    
    @GetMapping("/")
    public String home() {
        return "index";
    }
    
    @GetMapping("/about")
    public String about() {
        return "about"; // This page!
    }
    
    @GetMapping("/users/{id}")
    public String userPage(@PathVariable Long id) {
        return "user-details";
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js File Structure</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`app/
├── page.tsx          // GET /
├── about/
│   └── page.tsx      // GET /about (this file!)
├── users/
│   └── [id]/
│       └── page.tsx  // GET /users/{id}
└── layout.tsx        // Base layout for all pages`}
            </pre>
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">🚀 Why App Router?</h2>
          <div className="bg-white p-6 rounded-lg shadow border">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong>Intuitive routing:</strong> Folder structure = URL structure (like Spring Boot package organization)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong>Server Components by default:</strong> Runs on server like Spring Boot controllers
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong>Nested layouts:</strong> Shared UI components (like Thymeleaf fragments)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong>Loading & error handling:</strong> Built-in UI states (like @ExceptionHandler)
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">🔗 Route Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/" className="block p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">🏠 Home</h3>
              <p className="text-sm text-gray-600">Basic route: <code>/</code></p>
            </a>
            
            <a href="/users/123" className="block p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">👤 User Profile</h3>
              <p className="text-sm text-gray-600">Dynamic route: <code>/users/[id]</code></p>
            </a>
            
            <a href="/dashboard" className="block p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">📊 Dashboard</h3>
              <p className="text-sm text-gray-600">Nested layout example</p>
            </a>
            
            <a href="/features" className="block p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">✨ Features</h3>
              <p className="text-sm text-gray-600">Route group: <code>(marketing)</code></p>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">📁 Special Files</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Core Files</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="bg-blue-100 px-2 py-1 rounded">page.tsx</code> - Route component</li>
                  <li><code className="bg-green-100 px-2 py-1 rounded">layout.tsx</code> - Shared layout</li>
                  <li><code className="bg-yellow-100 px-2 py-1 rounded">loading.tsx</code> - Loading UI</li>
                  <li><code className="bg-red-100 px-2 py-1 rounded">error.tsx</code> - Error boundary</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Spring Boot Equivalent</h3>
                <ul className="space-y-2 text-sm">
                  <li>Controller method</li>
                  <li>Base template/layout</li>
                  <li>Loading spinner</li>
                  <li>@ExceptionHandler</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* NAVIGATION */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Explore more App Router examples:</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/users/123" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Dynamic Routes
          </a>
          <a href="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Nested Layouts
          </a>
          <a href="/features" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Route Groups
          </a>
        </div>
      </div>
    </div>
  );
}