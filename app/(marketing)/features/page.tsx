// ROUTE GROUP EXAMPLE - Marketing Features Page
// This demonstrates route groups: (marketing) doesn't affect the URL structure

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      
      {/* PAGE HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ✨ Next.js Features
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the powerful features that make Next.js perfect for Spring Boot developers
        </p>
      </header>

      {/* ROUTE GROUP EXPLANATION */}
      <div className="bg-amber-50 p-6 rounded-lg mb-12 border border-amber-200">
        <h2 className="text-xl font-semibold mb-4 text-amber-900">
          📁 Route Groups Example
        </h2>
        <div className="text-amber-800 space-y-2">
          <p>This page is located at <code>app/(marketing)/features/page.tsx</code></p>
          <p>But the URL is just <code>/features</code> - the <code>(marketing)</code> folder doesn't affect the route!</p>
          <p className="text-sm">
            Route groups are like organizing your Spring Boot controllers into packages for better structure 
            without affecting the endpoint URLs.
          </p>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        
        {/* SERVER COMPONENTS */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-3">Server Components</h3>
          <p className="text-gray-600 mb-4">
            Run React components on the server - just like your Spring Boot controllers!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Direct database access</li>
            <li>• Server-side rendering</li>
            <li>• Better performance</li>
            <li>• Enhanced security</li>
          </ul>
        </div>

        {/* API ROUTES */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🔗</div>
          <h3 className="text-xl font-bold mb-3">API Routes</h3>
          <p className="text-gray-600 mb-4">
            Build REST APIs exactly like Spring Boot @RestController!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• HTTP method functions</li>
            <li>• Path parameters</li>
            <li>• Request/Response handling</li>
            <li>• Middleware support</li>
          </ul>
        </div>

        {/* STATIC GENERATION */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🏗️</div>
          <h3 className="text-xl font-bold mb-3">Static Generation</h3>
          <p className="text-gray-600 mb-4">
            Pre-render pages at build time - like generating documentation with Maven plugins!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Lightning fast loading</li>
            <li>• SEO optimized</li>
            <li>• CDN friendly</li>
            <li>• Cost effective</li>
          </ul>
        </div>

        {/* IMAGE OPTIMIZATION */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold mb-3">Image Optimization</h3>
          <p className="text-gray-600 mb-4">
            Automatic image optimization - no more manual BufferedImage processing!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Automatic resizing</li>
            <li>• WebP conversion</li>
            <li>• Lazy loading</li>
            <li>• Responsive images</li>
          </ul>
        </div>

        {/* MIDDLEWARE */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-3">Middleware</h3>
          <p className="text-gray-600 mb-4">
            Request interceptors - exactly like Spring Boot HandlerInterceptor!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Authentication checks</li>
            <li>• Request logging</li>
            <li>• Rate limiting</li>
            <li>• Custom headers</li>
          </ul>
        </div>

        {/* ISR */}
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-bold mb-3">Incremental Static Regeneration</h3>
          <p className="text-gray-600 mb-4">
            Smart caching with background updates - like @Cacheable with TTL!
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Background regeneration</li>
            <li>• On-demand revalidation</li>
            <li>• Stale-while-revalidate</li>
            <li>• Cache invalidation</li>
          </ul>
        </div>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="bg-green-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-green-900">
          🔄 Spring Boot vs Next.js Feature Mapping
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-red-600">Spring Boot Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Controllers:</span>
                <span>@RestController, @GetMapping</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Security:</span>
                <span>@PreAuthorize, HandlerInterceptor</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Caching:</span>
                <span>@Cacheable, @CacheEvict</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Static:</span>
                <span>ResourceHandler, Maven plugins</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Templates:</span>
                <span>Thymeleaf, base templates</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-blue-600">Next.js Equivalents</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">API Routes:</span>
                <span>GET/POST functions, file-based routing</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Middleware:</span>
                <span>middleware.ts, request interception</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">ISR:</span>
                <span>revalidate, background regeneration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">SSG:</span>
                <span>generateStaticParams, build-time rendering</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium w-20">Layouts:</span>
                <span>layout.tsx, nested layouts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to explore Next.js features?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Each feature branch demonstrates real examples with Spring Boot comparisons
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <a 
            href="/users/123" 
            className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors"
          >
            🗂️ App Router
          </a>
          <a 
            href="/blog" 
            className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors"
          >
            🏗️ Static Generation
          </a>
          <a 
            href="/admin" 
            className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors"
          >
            🛡️ Middleware
          </a>
          <a 
            href="/todo" 
            className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors"
          >
            ⚡ Client Components
          </a>
        </div>
      </div>

      {/* ROUTE GROUP DEMO */}
      <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-900">
          📁 Route Groups Organization
        </h2>
        <div className="text-indigo-800 space-y-3">
          <p>Route groups help organize your code without affecting URLs:</p>
          <div className="bg-white p-4 rounded border border-indigo-200">
            <pre className="text-sm">
{`app/
├── (marketing)/          # Route group (doesn't affect URL)
│   ├── features/
│   │   └── page.tsx      # URL: /features (this page!)
│   ├── pricing/
│   │   └── page.tsx      # URL: /pricing
│   └── about/
│       └── page.tsx      # URL: /about
└── (dashboard)/          # Another route group
    ├── analytics/
    │   └── page.tsx      # URL: /analytics
    └── settings/
        └── page.tsx      # URL: /settings`}
            </pre>
          </div>
          
          <p className="text-sm">
            Like organizing Spring Boot controllers into packages: 
            <code>com.example.marketing.FeaturesController</code> vs 
            <code>com.example.dashboard.AnalyticsController</code>
          </p>
        </div>
      </div>
    </div>
  );
}