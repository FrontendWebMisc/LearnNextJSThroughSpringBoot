import Link from "next/link";

// MARKETING FEATURES PAGE - Route Groups Example
// This demonstrates Route Groups: (marketing) 
// The parentheses mean the folder name WON'T appear in the URL
// URL is /features (not /marketing/features)
// This is useful for organizing code without affecting the URL structure

export default function FeaturesPage() {
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

      {/* PAGE HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-orange-600">
          Product Features
        </h1>
        <p className="text-lg text-gray-600">
          Route Groups example - organized code without URL impact
        </p>
      </header>

      <main>
        {/* ROUTE GROUPS EXPLANATION */}
        <div className="bg-orange-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">📦 Route Groups Concept</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">How this works:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>File location:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/app/(marketing)/features/page.tsx</code></li>
                <li><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/features</code></li>
                <li><strong>(marketing) = Route Group</strong> - parentheses exclude it from URL</li>
                <li><strong>Purpose:</strong> Code organization without affecting routes</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Spring Boot Equivalent (Package Organization):</h4>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`com.example.app.marketing.FeaturesController  // Package for organization
└── @GetMapping("/features")                   // But URL is still /features

// Package structure doesn't affect URL mapping
// Similar to how (marketing) doesn't affect Next.js URL`}
              </pre>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Next.js Route Groups:</h4>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`app/
  (marketing)/          ← Route Group (not in URL)
    features/
      page.tsx          ← URL: /features
    pricing/
      page.tsx          ← URL: /pricing
  (admin)/             ← Another Route Group
    dashboard/
      page.tsx          ← URL: /dashboard
      
// Organize code by business area without changing URLs`}
              </pre>
            </div>
          </div>
        </div>

        {/* SAMPLE FEATURES CONTENT */}
        <div className="space-y-6">
          
          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized performance with Next.js and React 19
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure by Default</h3>
              <p className="text-gray-600">
                Built-in security features and best practices
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
              <p className="text-gray-600">
                Responsive design that works on all devices
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 rounded-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Join thousands of developers already using our platform
            </p>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>

        {/* USAGE EXAMPLES */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🏗️ Route Groups Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Organization by Business Logic:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`app/
  (marketing)/
    features/page.tsx     → /features
    pricing/page.tsx      → /pricing
    about/page.tsx        → /about
  (shop)/
    products/page.tsx     → /products
    cart/page.tsx         → /cart
  (admin)/
    dashboard/page.tsx    → /dashboard
    users/page.tsx        → /users`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Different Layouts per Group:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
{`app/
  (marketing)/
    layout.tsx           ← Marketing layout
    features/page.tsx    
  (admin)/
    layout.tsx           ← Admin layout
    dashboard/page.tsx
    
// Each route group can have its own layout!`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}