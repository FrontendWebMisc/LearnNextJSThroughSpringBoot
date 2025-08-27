import Link from "next/link";

// DYNAMIC USER PROFILE PAGE
// Equivalent to @GetMapping("/users/{id}") with @PathVariable in Spring Boot
// The [id] folder name creates a dynamic route parameter
// The parameter is available in the `params` prop

// Define the props type (similar to defining method parameters in Spring Boot)
interface UserPageProps {
  params: {
    id: string; // This comes from the [id] folder name
  };
}

// This is the page component - like a Spring Boot controller method
export default function UserPage({ params }: UserPageProps) {
  
  // Extract the id parameter (like @PathVariable String id in Spring Boot)
  const { id } = params;
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* NAVIGATION */}
      <nav className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* PAGE HEADER with dynamic content */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          User Profile #{id}
        </h1>
        <p className="text-lg text-gray-600">
          Dynamic route example - like @GetMapping("/users/{id}")
        </p>
      </header>

      <main>
        {/* USER PROFILE SIMULATION */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">👤 User Information</h2>
          
          <div className="bg-white p-6 rounded-lg border">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">User ID:</span>
                <span className="bg-purple-100 px-3 py-1 rounded">{id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Username:</span>
                <span>user_{id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>user{id}@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className="text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC ROUTE EXPLANATION */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔗 Dynamic Route Concept</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">How this works:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>File location:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/app/users/[id]/page.tsx</code></li>
                <li><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/users/{id}</code></li>
                <li><strong>[id] = dynamic parameter</strong> (like @PathVariable)</li>
                <li>Available in component via <code className="bg-gray-100 px-2 py-1 rounded">params.id</code></li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Spring Boot Way:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`@RestController
public class UserController {
  
  @GetMapping("/users/{id}")
  public User getUser(
    @PathVariable String id
  ) {
    // id is available here
    return userService.findById(id);
  }
}`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Next.js App Router:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`app/
  users/
    [id]/
      page.tsx
      
// Component receives params
function UserPage({ params }) {
  const { id } = params;
  // id is available here
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* TRY OTHER IDS */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🚀 Try Different IDs</h2>
          <p className="mb-4">Click these links to see the same component with different parameters:</p>
          
          <div className="flex flex-wrap gap-4">
            {[1, 2, 42, 999, 'abc', 'john-doe'].map((testId) => (
              <Link
                key={testId}
                href={`/users/${testId}`}
                className={`px-4 py-2 rounded transition-colors ${
                  id === testId.toString() 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                }`}
              >
                User {testId}
              </Link>
            ))}
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            Current ID: <strong>{id}</strong> - Notice how the URL changes but uses the same component!
          </p>
        </div>
      </main>
    </div>
  );
}