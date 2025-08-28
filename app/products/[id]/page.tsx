import Link from "next/link";

// PRODUCT TYPES - Like DTOs in Spring Boot
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl: string;
  rating: number;
  reviews: number;
  specifications: Record<string, string>;
  lastUpdated: string;
}

// SIMULATED PRODUCT SERVICE - Like @Service in Spring Boot
async function getProductById(id: string): Promise<Product> {
  // Simulate database delay (like service layer call)
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock product data - in real app, this would be from database
  const products: Record<string, Product> = {
    '1': {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and high-resolution audio support. Perfect for music lovers and professionals.",
      price: 299.99,
      category: "Electronics",
      inStock: true,
      imageUrl: "/api/placeholder/600/400",
      rating: 4.8,
      reviews: 2847,
      specifications: {
        "Battery Life": "30 hours",
        "Charging Time": "3 hours",
        "Weight": "250g",
        "Connectivity": "Bluetooth 5.0, 3.5mm jack",
        "Drivers": "40mm dynamic",
        "Frequency Response": "20Hz - 40kHz"
      },
      lastUpdated: new Date().toISOString()
    },
    '2': {
      id: 2,
      name: "Gaming Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard with Cherry MX switches, programmable keys, and aluminum build quality. Designed for serious gamers and typing enthusiasts.",
      price: 159.99,
      category: "Gaming",
      inStock: true,
      imageUrl: "/api/placeholder/600/400",
      rating: 4.6,
      reviews: 1523,
      specifications: {
        "Switch Type": "Cherry MX Red",
        "Backlighting": "RGB per-key",
        "Layout": "Full-size (104 keys)",
        "Material": "Aluminum frame",
        "Cable": "Braided USB-C",
        "Actuation Force": "45g"
      },
      lastUpdated: new Date().toISOString()
    },
    '3': {
      id: 3,
      name: "4K Webcam Pro",
      description: "Professional 4K webcam with auto-focus, noise reduction, and wide-angle lens. Perfect for streaming, video calls, and content creation.",
      price: 199.99,
      category: "Electronics",
      inStock: false,
      imageUrl: "/api/placeholder/600/400",
      rating: 4.7,
      reviews: 892,
      specifications: {
        "Resolution": "4K @ 30fps",
        "Field of View": "90° diagonal",
        "Focus": "Auto-focus",
        "Microphone": "Dual stereo with noise reduction",
        "Connection": "USB 3.0",
        "Compatibility": "Windows, Mac, Linux"
      },
      lastUpdated: new Date().toISOString()
    }
  };
  
  const product = products[id];
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return product;
}

// GENERATE STATIC PARAMS - Pre-generate popular products
export async function generateStaticParams() {
  // In real app, you'd query your most popular/recent products
  return [
    { id: '1' },
    { id: '2' }, 
    { id: '3' }
  ];
}

// ISR CONFIGURATION - Like @Cacheable TTL
export const revalidate = 60; // Revalidate every 60 seconds

// DYNAMIC PRODUCT PAGE - With ISR
export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    // This runs at build time AND when cache expires (ISR)
    const product = await getProductById(params.id);
    
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

        {/* PRODUCT HEADER */}
        <header className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PRODUCT IMAGE */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>
            
            {/* PRODUCT INFO */}
            <div>
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-semibold ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* ISR INFORMATION BANNER */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              🔄 ISR Product Caching
            </h2>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Cache Strategy:</strong> This product page is statically generated and cached for 60 seconds (like @Cacheable with TTL)
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date(product.lastUpdated).toLocaleString()}
              </p>
              <p>
                <strong>ISR Behavior:</strong> Serves cached page while regenerating in background when expired
              </p>
            </div>
          </div>

          {/* PRODUCT SPECIFICATIONS */}
          <div className="bg-white p-6 rounded-lg shadow border mb-8">
            <h2 className="text-2xl font-semibold mb-4">📋 Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🔗 Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['1', '2', '3'].filter(id => id !== params.id).slice(0, 2).map((id) => (
                <Link
                  key={id}
                  href={`/products/${id}`}
                  className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Product {id}</h3>
                  <p className="text-sm text-gray-600">View details</p>
                </Link>
              ))}
            </div>
          </div>

          {/* ISR COMPARISON */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🚀 ISR vs Spring Boot Product Caching</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Spring Boot Product Caching</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class ProductController {
  
  @GetMapping("/api/products/{id}")
  @Cacheable(value = "products", key = "#id")
  public Product getProduct(@PathVariable Long id) {
    // Expensive database/service call
    return productService.findById(id);
  }
  
  @PostMapping("/api/products/{id}/update")
  @CacheEvict(value = "products", key = "#id")
  public Product updateProduct(
    @PathVariable Long id,
    @RequestBody Product updates
  ) {
    Product updated = productService.update(id, updates);
    // Cache automatically evicted
    return updated;
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Next.js ISR Product Page</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// 60-second cache TTL
export const revalidate = 60;

export default async function ProductPage({ params }) {
  // Runs at build + when cache expires
  const product = await getProductById(params.id);
  
  return <ProductView product={product} />;
}

// On-demand revalidation API
export async function POST(request) {
  const { productId } = await request.json();
  
  // Clear specific product cache
  revalidatePath(\`/products/\${productId}\`);
  
  return Response.json({ revalidated: true });
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 bg-green-100 p-4 rounded">
              <p className="text-sm text-green-800">
                <strong>🎯 ISR Advantage:</strong> Product pages are pre-rendered as static HTML and served 
                instantly from CDN. When product data changes, ISR regenerates the page in the background 
                without affecting user experience - much faster than traditional cache-aside patterns!
              </p>
            </div>
          </div>
        </main>
      </div>
    );
    
  } catch (error) {
    console.error(`Error loading product ${params.id}:`, error);
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product with ID "{params.id}" could not be found.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Try these popular products:</p>
            <div className="flex gap-4 justify-center">
              {['1', '2', '3'].map((id) => (
                <Link
                  key={id}
                  href={`/products/${id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Product {id}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}