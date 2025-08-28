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
}

interface CategoryData {
  name: string;
  description: string;
  totalProducts: number;
  subcategories: string[];
}

// SIMULATED E-COMMERCE SERVICE - Like @Service in Spring Boot  
async function getProductsByCategory(category: string): Promise<{ products: Product[], categoryInfo: CategoryData }> {
  // Simulate database delay (like service layer call)
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Mock product data - in real app, this would be from database
  const allProducts: Record<string, Product[]> = {
    electronics: [
      {
        id: 1,
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life",
        price: 249.99,
        category: "electronics",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.8,
        reviews: 1247
      },
      {
        id: 2,
        name: "4K Smart TV - 55 inch",
        description: "Ultra HD Smart TV with HDR support and built-in streaming apps",
        price: 599.99,
        category: "electronics", 
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.6,
        reviews: 892
      },
      {
        id: 3,
        name: "Gaming Laptop",
        description: "High-performance gaming laptop with RTX graphics and 16GB RAM",
        price: 1299.99,
        category: "electronics",
        inStock: false,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 456
      },
      {
        id: 4,
        name: "Wireless Smartphone Charger", 
        description: "Fast wireless charging pad compatible with all Qi-enabled devices",
        price: 39.99,
        category: "electronics",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.3,
        reviews: 2341
      }
    ],
    clothing: [
      {
        id: 5,
        name: "Classic Cotton T-Shirt",
        description: "100% organic cotton t-shirt in various colors and sizes",
        price: 24.99,
        category: "clothing",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.5,
        reviews: 567
      },
      {
        id: 6,
        name: "Denim Jeans",
        description: "Premium quality denim jeans with classic fit and comfortable stretch",
        price: 79.99,
        category: "clothing",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.4,
        reviews: 234
      },
      {
        id: 7,
        name: "Winter Jacket",
        description: "Insulated winter jacket with water-resistant exterior and warm lining",
        price: 149.99,
        category: "clothing",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 189
      }
    ],
    home: [
      {
        id: 8,
        name: "Smart Home Security Camera",
        description: "1080p HD security camera with night vision and mobile app control",
        price: 129.99,
        category: "home",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.2,
        reviews: 678
      },
      {
        id: 9,
        name: "Robot Vacuum Cleaner",
        description: "Smart robot vacuum with mapping technology and app control",
        price: 299.99,
        category: "home",
        inStock: true,
        imageUrl: "/api/placeholder/300/300",
        rating: 4.6,
        reviews: 445
      }
    ]
  };
  
  const categoryInfo: Record<string, CategoryData> = {
    electronics: {
      name: "Electronics",
      description: "Latest gadgets, computers, smartphones, and tech accessories",
      totalProducts: 4,
      subcategories: ["Computers", "Audio", "Mobile", "Gaming"]
    },
    clothing: {
      name: "Clothing",
      description: "Fashion apparel for men, women, and children",
      totalProducts: 3,
      subcategories: ["Men's", "Women's", "Kids", "Accessories"]
    },
    home: {
      name: "Home & Garden",
      description: "Home improvement, furniture, and garden supplies",
      totalProducts: 2,
      subcategories: ["Furniture", "Decor", "Garden", "Kitchen"]
    }
  };
  
  const products = allProducts[category] || [];
  const categoryData = categoryInfo[category] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: "Products in this category",
    totalProducts: 0,
    subcategories: []
  };
  
  return { products, categoryInfo: categoryData };
}

// GENERATE STATIC PARAMS - Pre-generate popular categories
export async function generateStaticParams() {
  return [
    { category: 'electronics' },
    { category: 'clothing' }, 
    { category: 'home' }
  ];
}

// ISR CONFIGURATION - E-commerce needs more frequent updates
export const revalidate = 1800; // Revalidate every 30 minutes (product availability changes)

// SHOP CATEGORY PAGE - With ISR
export default async function ShopCategoryPage({ params }: { params: { category: string } }) {
  try {
    // This runs at build time AND when cache expires (ISR)
    const { products, categoryInfo } = await getProductsByCategory(params.category);
    
    const inStockProducts = products.filter(p => p.inStock);
    const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length || 0;
    const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0;
    
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

        {/* CATEGORY HEADER */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {categoryInfo.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {categoryInfo.description}
          </p>
          
          {/* CATEGORY STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-blue-800">Total Products</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{inStockProducts.length}</div>
              <div className="text-sm text-green-800">In Stock</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">${averagePrice.toFixed(0)}</div>
              <div className="text-sm text-purple-800">Avg Price</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}★</div>
              <div className="text-sm text-yellow-800">Avg Rating</div>
            </div>
          </div>
        </header>

        <main>
          {/* ISR INFORMATION */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              🛒 E-commerce ISR Strategy
            </h2>
            <div className="text-sm text-green-800 space-y-1">
              <p>
                <strong>Cache TTL:</strong> 30 minutes (balance between performance and inventory accuracy)
              </p>
              <p>
                <strong>Strategy:</strong> Serve cached catalog while revalidating in background
              </p>
              <p>
                <strong>Last Generated:</strong> {new Date().toLocaleString()} (when this page was built/revalidated)
              </p>
            </div>
          </div>

          {/* SUBCATEGORIES */}
          {categoryInfo.subcategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Shop by Subcategory</h2>
              <div className="flex flex-wrap gap-3">
                {categoryInfo.subcategories.map((sub) => (
                  <span 
                    key={sub}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer transition-colors"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS GRID */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Products Found</h2>
              <p className="text-gray-500">This category doesn't have any products yet.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Products ({products.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-lg shadow border hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <span className="text-6xl">📦</span>
                    </div>
                    
                    <div className="p-4">
                      {/* Product Info */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      
                      {/* Price & Stock */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        disabled={!product.inStock}
                        className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY NAVIGATION */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-semibold mb-4">Browse Other Categories</h2>
            <div className="flex flex-wrap gap-4">
              {['electronics', 'clothing', 'home'].filter(cat => cat !== params.category).map((category) => (
                <Link
                  key={category}
                  href={`/shop/${category}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* ISR VS SPRING BOOT COMPARISON */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🔄 E-commerce Caching: ISR vs Spring Boot</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Spring Boot E-commerce Caching</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class ProductController {
  
  @GetMapping("/api/products/{category}")
  @Cacheable(value = "products", key = "#category")
  public List<Product> getProducts(
    @PathVariable String category
  ) {
    // Expensive database query
    return productService.findByCategory(category);
  }
  
  @PostMapping("/api/products/update")
  @CacheEvict(value = "products", allEntries = true)
  public void updateProducts() {
    // Clear all product caches when inventory changes
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Next.js ISR E-commerce</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// 30-minute cache for product pages
export const revalidate = 1800;

export default async function ShopCategory({ params }) {
  // Runs at build + every 30 minutes
  const products = await getProductsByCategory(params.category);
  
  return <ProductGrid products={products} />;
}

// Inventory update webhook
export async function POST(request) {
  const { category } = await request.json();
  
  // Revalidate specific category
  revalidatePath(\`/shop/\${category}\`);
  
  return Response.json({ revalidated: true });
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 bg-purple-100 p-4 rounded">
              <p className="text-sm text-purple-800">
                <strong>🎯 E-commerce Advantage:</strong> Product catalog pages load instantly from CDN 
                while inventory stays relatively fresh. ISR reduces database load during traffic spikes 
                while ensuring customers see current availability within your configured tolerance.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
    
  } catch (error) {
    console.error(`Error loading category ${params.category}:`, error);
    
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
          <h1 className="text-3xl font-bold text-red-600 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">
            The category "{params.category}" could not be found or failed to load.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Try these popular categories:</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/shop/electronics"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Electronics
              </Link>
              <Link
                href="/shop/clothing"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Clothing
              </Link>
              <Link
                href="/shop/home"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Home & Garden
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}