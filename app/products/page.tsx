import Link from "next/link";

// SIMULATED DATABASE TYPES - In real app, these would be from Prisma, TypeORM, etc.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
}

// SIMULATED DATABASE SERVICE - Like @Repository or @Service in Spring Boot
async function getProductsFromDatabase(): Promise<Product[]> {
  // Simulate database delay (like calling ProductService.findAll())
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // This simulates data from database - in Spring Boot this would be:
  // @Autowired ProductRepository productRepository;
  // return productRepository.findAll();
  
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
      price: 199.99,
      category: "Electronics",
      inStock: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Smart Water Bottle",
      description: "IoT-enabled water bottle that tracks hydration and temperature",
      price: 79.99,
      category: "Health",
      inStock: true,
      createdAt: "2024-02-01"
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      description: "Premium ergonomic chair with lumbar support and adjustable height",
      price: 349.99,
      category: "Furniture",
      inStock: false,
      createdAt: "2024-01-20"
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard with Cherry MX switches",
      price: 129.99,
      category: "Electronics",
      inStock: true,
      createdAt: "2024-02-10"
    },
    {
      id: 5,
      name: "Standing Desk",
      description: "Height-adjustable standing desk with electric motor",
      price: 599.99,
      category: "Furniture",
      inStock: true,
      createdAt: "2024-01-25"
    }
  ];
  
  return products;
}

// PRODUCTS PAGE - SERVER COMPONENT (runs on server like Spring Boot controller)
// This is equivalent to a @GetMapping("/products") method in Spring Boot
export default async function ProductsPage() {
  
  // SERVER-SIDE DATA FETCHING
  // This runs on the SERVER, not in the browser
  // Similar to calling @Autowired services in Spring Boot controller
  const products = await getProductsFromDatabase();
  
  // Calculate server-side statistics (like business logic in Spring Boot service)
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      
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
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Product Catalog
        </h1>
        <p className="text-lg text-gray-600">
          Server Component with database simulation - like Spring Boot @Service layer
        </p>
      </header>

      <main>
        {/* SERVER COMPONENT EXPLANATION */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔧 Server Component Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">This Component:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>✅ <strong>Runs on SERVER</strong> - like Spring Boot controller</li>
                <li>✅ <strong>Can access database</strong> - direct queries allowed</li>
                <li>✅ <strong>Async/await</strong> - handle database calls</li>
                <li>✅ <strong>Server-side calculations</strong> - business logic</li>
                <li>✅ <strong>No JavaScript to client</strong> - only HTML</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Spring Boot Equivalent:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@GetMapping("/products")
public String products(Model model) {
  List<Product> products = 
    productService.findAll();
  
  model.addAttribute("products", products);
  model.addAttribute("totalCount", products.size());
  
  return "products"; // template
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* STATISTICS DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-gray-900">In Stock</h3>
            <p className="text-3xl font-bold text-green-600">{inStockCount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-semibold text-gray-900">Avg Price</h3>
            <p className="text-3xl font-bold text-purple-600">${averagePrice.toFixed(2)}</p>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="font-bold text-lg text-blue-600">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="text-sm">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Added:</span>
                    <span className="text-sm">{product.createdAt}</span>
                  </div>
                </div>
                
                <button 
                  disabled={!product.inStock}
                  className={`w-full mt-4 px-4 py-2 rounded font-medium ${
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

        {/* CODE COMPARISON */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">💻 Code Comparison</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Spring Boot Service + Controller</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@Service
public class ProductService {
  
  @Autowired
  private ProductRepository repo;
  
  public List<Product> findAll() {
    return repo.findAll();
  }
}

@RestController  
public class ProductController {
  
  @Autowired
  private ProductService service;
  
  @GetMapping("/products")
  public List<Product> getProducts() {
    return service.findAll();
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js Server Component</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Database access function
async function getProducts() {
  // Direct database access
  const products = await db.product.findMany();
  return products;
}

// Server Component (like controller + view)
export default async function ProductsPage() {
  // Server-side data fetching
  const products = await getProducts();
  
  // Return JSX (like returning template)
  return (
    <div>
      {products.map(p => 
        <ProductCard key={p.id} product={p} />
      )}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}