import Link from "next/link";

// ABOUT PAGE - This demonstrates a STATIC ROUTE
// Equivalent to @GetMapping("/about") in Spring Boot
// The folder name "about" becomes the URL path
export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* NAVIGATION - Back to home */}
      <nav className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* PAGE HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          About Page
        </h1>
        <p className="text-lg text-gray-600">
          This is a static route example - like @GetMapping("/about")
        </p>
      </header>

      <main>
        {/* ROUTE EXPLANATION */}
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">📄 Static Route Concept</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">How this works:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>File location:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/app/about/page.tsx</code></li>
                <li><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/about</code></li>
                <li><strong>Folder name = URL path</strong> (just like Spring Boot mapping)</li>
                <li>The <code className="bg-gray-100 px-2 py-1 rounded">page.tsx</code> file is the endpoint</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Spring Boot Equivalent:</h4>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`@RestController
public class AboutController {
  
  @GetMapping("/about")
  public String about() {
    return "about"; // returns about.html template
  }
}`}
              </pre>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Next.js App Router:</h4>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`app/
  about/
    page.tsx    // This file handles GET /about
    
// No controller needed!
// File structure defines the route`}
              </pre>
            </div>
          </div>
        </div>

        {/* COMPONENT DETAILS */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔧 Component Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Key Concepts:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>Default Export:</strong> Required for page components</li>
                <li><strong>Function Component:</strong> Standard React functional component</li>
                <li><strong>Link Component:</strong> Client-side navigation (no page reload)</li>
                <li><strong>JSX:</strong> JavaScript XML syntax for UI</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Spring Boot Similarities:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>Method:</strong> Function = Controller method</li>
                <li><strong>Return:</strong> JSX = Template/View</li>
                <li><strong>Route:</strong> Folder = URL mapping</li>
                <li><strong>Navigation:</strong> Link = Hyperlinks in templates</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}