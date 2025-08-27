import Image from "next/image";
import Link from "next/link";

// PRODUCT IMAGE GALLERY - Like static resource management in Spring Boot
export default function ProductGallery() {
  
  // Mock product images - in real app, these would come from your Spring Boot API
  const productImages = [
    {
      id: 1,
      src: "/api/placeholder/600/400", // Would be your CDN/static resource URL
      alt: "Wireless Headphones - Hero Shot",
      title: "Premium Noise-Canceling Headphones",
      priority: true, // Above the fold image
    },
    {
      id: 2, 
      src: "/api/placeholder/600/400",
      alt: "Laptop Computer - Product Image",
      title: "Gaming Laptop with RGB Keyboard",
      priority: false,
    },
    {
      id: 3,
      src: "/api/placeholder/600/400", 
      alt: "Smartphone - Product Photography",
      title: "Latest 5G Smartphone",
      priority: false,
    },
    {
      id: 4,
      src: "/api/placeholder/600/400",
      alt: "Smart Watch - Lifestyle Photo", 
      title: "Fitness Tracking Smartwatch",
      priority: false,
    },
    {
      id: 5,
      src: "/api/placeholder/600/400",
      alt: "Wireless Mouse - Detail Shot",
      title: "Ergonomic Wireless Mouse",
      priority: false,
    },
    {
      id: 6,
      src: "/api/placeholder/600/400",
      alt: "Mechanical Keyboard - Close-up",
      title: "RGB Mechanical Gaming Keyboard", 
      priority: false,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      
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
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          Product Gallery
        </h1>
        <p className="text-lg text-gray-600">
          Next.js Image optimization - like Spring Boot static resources but smarter!
        </p>
      </header>

      <main>
        {/* IMAGE OPTIMIZATION EXPLANATION */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🖼️ Image Optimization Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Spring Boot Static Resources:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
  
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/images/**")
            .addResourceLocations("classpath:/static/images/")
            .setCacheControl(CacheControl.maxAge(Duration.ofDays(30)));
  }
}

// Manual image processing
@RestController
public class ImageController {
  @GetMapping("/api/image/{filename}")
  public ResponseEntity<byte[]> getResizedImage(
    @PathVariable String filename,
    @RequestParam int width, 
    @RequestParam int height) {
    
    BufferedImage original = ImageIO.read(...);
    BufferedImage resized = resizeImage(original, width, height);
    return ResponseEntity.ok(imageToBytes(resized));
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Next.js Image Component:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li><strong>Automatic optimization</strong> - WebP format for modern browsers</li>
                <li><strong>Lazy loading</strong> - Images load only when visible</li>
                <li><strong>Responsive sizing</strong> - Different sizes for different screens</li>
                <li><strong>Priority loading</strong> - Above-fold images load immediately</li>
                <li><strong>Blur placeholders</strong> - Smooth loading experience</li>
                <li><strong>CDN optimization</strong> - Automatic edge caching</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HERO IMAGE SECTION */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Featured Product</h2>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={productImages[0].src}
              alt={productImages[0].alt}
              width={1200}
              height={600}
              priority={true} // Load immediately - like eager loading
              className="w-full h-auto"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XGMThqWMZhVmMa/fVCjqfMOdl8ePzKhoPeHMOel8WPzKhoPWDMOdl8ePzJwLT"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {productImages[0].title}
              </h3>
              <p className="text-white/80">
                High-quality product photography with automatic optimization
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Product Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productImages.slice(1).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/2] relative bg-gray-100">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing
                    className="object-cover"
                    loading="lazy" // Lazy loading for below-fold images
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Automatically optimized for your device and connection speed
                  </p>
                  <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESPONSIVE IMAGE DEMO */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Responsive Image Demo</h2>
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="mb-4 text-gray-600">
              This image automatically serves different sizes based on your screen:
            </p>
            <div className="relative aspect-[16/9] bg-gray-100 rounded overflow-hidden">
              <Image
                src="/api/placeholder/1600/900"
                alt="Responsive Demo - Serves different sizes for different screens"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <p>• Mobile (≤640px): Full width</p>
              <p>• Tablet (≤1024px): 80% width</p>
              <p>• Desktop (>1024px): 1200px fixed width</p>
            </div>
          </div>
        </div>

        {/* PERFORMANCE COMPARISON */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🚀 Performance Benefits</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-red-600">Spring Boot Manual Approach</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border">
                  <strong>Image Processing:</strong> Manual BufferedImage operations
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Caching:</strong> Custom cache headers and CDN setup
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Responsive:</strong> Multiple image sizes manually created
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Loading:</strong> All images load immediately
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Format:</strong> Single format (usually JPEG/PNG)
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-green-600">Next.js Image Component</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Image Processing:</strong> Automatic optimization
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Caching:</strong> Built-in CDN with edge optimization
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Responsive:</strong> Automatic sizing with `sizes` prop
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Loading:</strong> Lazy loading + priority for above-fold
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Format:</strong> WebP for modern browsers, fallback for old
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-100 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Migration Tip:</strong> You can keep your existing Spring Boot image API 
              and use Next.js Image component as the frontend. Just configure the `domains` in 
              next.config.js to point to your Spring Boot static resources!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}