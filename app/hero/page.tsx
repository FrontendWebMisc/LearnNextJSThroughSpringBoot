import Image from "next/image";
import Link from "next/link";

// HERO SECTION WITH PRIORITY LOADING - Like landing page optimization
export default function HeroSection() {
  
  return (
    <div className="min-h-screen">
      
      {/* NAVIGATION */}
      <nav className="relative z-10 p-8">
        <Link 
          href="/" 
          className="text-white hover:text-gray-300 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <div className="relative min-h-screen flex items-center justify-center">
        
        {/* BACKGROUND HERO IMAGE with priority loading */}
        <Image
          src="/api/placeholder/1920/1080"
          alt="Hero background - Modern tech workspace"
          fill
          priority={true} // Critical for above-the-fold content
          className="object-cover"
          quality={90} // Higher quality for hero images
        />
        
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* HERO CONTENT */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Next.js + Spring Boot
            <span className="block text-blue-400">Perfect Partnership</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Combine the power of Spring Boot backend with Next.js frontend optimization. 
            Build full-stack applications with the best of both worlds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold transition-all text-lg">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* HERO OPTIMIZATION EXPLANATION */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🚀 Hero Image Optimization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Spring Boot Static Resources:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@Controller
public class HomeController {
  
  @GetMapping("/")
  public String home(Model model) {
    // Serve static hero image
    model.addAttribute("heroImage", "/images/hero.jpg");
    return "home";
  }
}

// In your template (Thymeleaf)
<div class="hero" 
     th:style="'background-image: url(' + \${heroImage} + ')'"
     style="background-size: cover;">
  <h1>Welcome to Our Site</h1>
</div>

// Issues:
// - Single image size for all devices  
// - No lazy loading
// - No format optimization
// - Blocks page rendering`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Next.js Hero Optimization:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li><strong>Priority loading</strong> - Above-fold images load immediately</li>
                <li><strong>Responsive sizing</strong> - Different sizes for mobile/desktop</li>
                <li><strong>Format optimization</strong> - WebP for modern browsers</li>
                <li><strong>Quality control</strong> - Higher quality for hero images</li>
                <li><strong>Progressive loading</strong> - Show blur placeholder while loading</li>
                <li><strong>Non-blocking</strong> - Doesn't block page rendering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FEATURE SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Feature 1 - Server Components */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative h-48 mb-4 bg-gray-100 rounded overflow-hidden">
              <Image
                src="/api/placeholder/400/300"
                alt="Server Components feature"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Server Components</h3>
            <p className="text-gray-600 text-sm">
              Run React components on the server, just like your Spring Boot controllers. 
              Perfect for data fetching and SEO optimization.
            </p>
          </div>

          {/* Feature 2 - API Routes */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative h-48 mb-4 bg-gray-100 rounded overflow-hidden">
              <Image
                src="/api/placeholder/400/300"
                alt="API Routes feature"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">API Routes</h3>
            <p className="text-gray-600 text-sm">
              Build REST APIs directly in Next.js, similar to @RestController annotations. 
              Perfect complement to your existing Spring Boot services.
            </p>
          </div>

          {/* Feature 3 - Image Optimization */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative h-48 mb-4 bg-gray-100 rounded overflow-hidden">
              <Image
                src="/api/placeholder/400/300"
                alt="Image optimization feature"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Auto Optimization</h3>
            <p className="text-gray-600 text-sm">
              No more manual image processing with BufferedImage. Next.js handles 
              resizing, format conversion, and CDN distribution automatically.
            </p>
          </div>
        </div>

        {/* PRIORITY LOADING DEMO */}
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-2xl font-semibold mb-4">⚡ Priority Loading Demo</h2>
          <p className="text-gray-600 mb-6">
            Compare how different loading strategies affect your Largest Contentful Paint (LCP):
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">❌ Without Priority Loading</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-red-50 rounded">
                  <span>HTML Load</span>
                  <span className="font-mono">500ms</span>
                </div>
                <div className="flex justify-between p-2 bg-red-50 rounded">
                  <span>JavaScript Load</span>
                  <span className="font-mono">1200ms</span>
                </div>
                <div className="flex justify-between p-2 bg-red-50 rounded">
                  <span>Image Discovery</span>
                  <span className="font-mono">1500ms</span>
                </div>
                <div className="flex justify-between p-2 bg-red-100 rounded font-semibold">
                  <span>Hero Image Load</span>
                  <span className="font-mono text-red-600">2800ms</span>
                </div>
              </div>
              <p className="text-xs text-red-600 mt-2">Poor LCP score - image loads too late</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-green-600">✅ With Priority Loading</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span>HTML + Image Start</span>
                  <span className="font-mono">0ms</span>
                </div>
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span>Image Load Complete</span>
                  <span className="font-mono">800ms</span>
                </div>
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span>JavaScript Load</span>
                  <span className="font-mono">1200ms</span>
                </div>
                <div className="flex justify-between p-2 bg-green-100 rounded font-semibold">
                  <span>Page Interactive</span>
                  <span className="font-mono text-green-600">1200ms</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">Great LCP score - image loads immediately</p>
            </div>
          </div>
        </div>

        {/* IMPLEMENTATION GUIDE */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">💻 Implementation Guide</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Hero Image Best Practices</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/hero-image.jpg"
        alt="Hero background"
        fill
        priority={true}        // Load immediately
        quality={90}           // Higher quality for hero
        className="object-cover"
        sizes="100vw"          // Full viewport width
      />
      
      <div className="relative z-10">
        <h1>Your Hero Content</h1>
      </div>
    </div>
  )
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Spring Boot Integration</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Keep your Spring Boot for data
@RestController
public class HomeController {
  
  @GetMapping("/api/hero-content")
  public HeroContent getHeroContent() {
    return HeroContent.builder()
      .title("Next.js + Spring Boot")
      .subtitle("Perfect Partnership")
      .imageUrl("https://cdn.yoursite.com/hero.jpg")
      .ctaText("Get Started")
      .build();
  }
}

// Use in Next.js
const heroData = await fetch('/api/hero-content')
const hero = await heroData.json()

return (
  <Image src={hero.imageUrl} priority={true} />
)`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-100 p-4 rounded">
            <p className="text-sm text-yellow-800">
              <strong>🎯 Pro Tip:</strong> Use `priority={true}` only for above-the-fold images 
              (hero sections, banners). For below-the-fold images, use lazy loading (default behavior) 
              to improve page load performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}