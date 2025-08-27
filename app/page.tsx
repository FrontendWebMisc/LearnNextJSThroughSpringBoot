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
          <h2 className="text-2xl font-semibold mb-4">⚡ Server Components Features</h2>
          <p className="mb-4">
            This branch demonstrates Next.js Server Components - components that run on the server like Spring Boot controllers.
            They can access databases, file systems, and APIs directly without exposing sensitive data to the client.
          </p>
          
          {/* 
            NAVIGATION LINKS
            Similar to how you'd create navigation in Spring Boot templates
            Link component provides client-side navigation (faster than page reloads)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Database Simulation Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">🗄️ Database Access</h3>
              <p className="text-sm text-gray-600 mb-3">
                Server Component with database simulation - like @Service layer
              </p>
              <Link 
                href="/products" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                View Products
              </Link>
            </div>

            {/* File System Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">📁 File System</h3>
              <p className="text-sm text-gray-600 mb-3">
                Reading files on server - like @Value properties loading
              </p>
              <Link 
                href="/blog" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
              >
                Read Blog Posts
              </Link>
            </div>

            {/* Environment Variables Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">🔐 Server Config</h3>
              <p className="text-sm text-gray-600 mb-3">
                Environment variables & secrets - like @Value annotations
              </p>
              <Link 
                href="/config" 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
              >
                View Configuration
              </Link>
            </div>

            {/* External API Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">🌐 External API</h3>
              <p className="text-sm text-gray-600 mb-3">
                Server-side API calls - like @RestTemplate or WebClient
              </p>
              <Link 
                href="/weather" 
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 inline-block"
              >
                Check Weather
              </Link>
            </div>
          </div>
        </div>

        {/* 
          SPRING BOOT COMPARISON SECTION
          Educational content to help understand the concepts
        */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔄 Spring Boot vs Next.js Server Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Spring Boot Controller</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`@RestController
public class ProductController {
  
  @Autowired
  private ProductService productService;
  
  @GetMapping("/products")
  public List<Product> getProducts() {
    // Runs on SERVER
    // Database access, file I/O, etc.
    return productService.findAll();
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js Server Component</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// This component runs on SERVER
export default async function ProductsPage() {
  // Database access, file I/O, etc.
  const products = await db.product.findMany();
  
  return (
    <div>
      {products.map(p => 
        <div key={p.id}>{p.name}</div>
      )}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Key Similarity:</strong> Both run on the server and can access server-only resources like databases, 
              environment variables, and file systems. The rendered result is sent to the client.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
