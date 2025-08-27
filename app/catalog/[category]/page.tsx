// STATIC PRODUCT CATALOG - Generated at BUILD TIME
// This is like generating product documentation or price lists with Maven/Gradle plugins

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

// GENERATE STATIC PARAMS - Pre-generate category pages at BUILD TIME
// Like scanning your database at build time to generate static product catalogs
export async function generateStaticParams() {
  // This runs at BUILD TIME, not request time
  // Like analyzing your inventory data to create static category pages
  
  const categories = [
    'electronics',
    'books', 
    'clothing',
    'home-garden'
  ];
  
  return categories.map(category => ({
    category: category
  }));
}

// STATIC DATA FETCHING - Runs at BUILD TIME
async function getProductsByCategory(category: string): Promise<Product[]> {
  // This simulates fetching category data at build time
  // In real app: database query, API call, file system read, etc.
  
  const allProducts: Record<string, Product[]> = {
    electronics: [
      {
        id: '1',
        name: 'MacBook Pro',
        price: 2399.99,
        description: 'Powerful laptop for developers - runs Spring Boot and Next.js development smoothly',
        image: '/api/placeholder/300/200',
        category: 'electronics',
        inStock: true
      },
      {
        id: '2',
        name: 'iPhone 15 Pro',
        price: 999.99,
        description: 'Latest smartphone with advanced features',
        image: '/api/placeholder/300/200',
        category: 'electronics',
        inStock: true
      },
      {
        id: '3',
        name: 'Dell Monitor 4K',
        price: 449.99,
        description: 'Perfect for coding - great for Spring Boot IDEs and Next.js development',
        image: '/api/placeholder/300/200',
        category: 'electronics',
        inStock: false
      }
    ],
    books: [
      {
        id: '4',
        name: 'Spring Boot in Action',
        price: 45.99,
        description: 'Comprehensive guide to Spring Boot development',
        image: '/api/placeholder/300/200',
        category: 'books',
        inStock: true
      },
      {
        id: '5',
        name: 'React & Next.js Handbook',
        price: 39.99,
        description: 'Learn modern React development with Next.js',
        image: '/api/placeholder/300/200',
        category: 'books',
        inStock: true
      },
      {
        id: '6',
        name: 'Full Stack Development',
        price: 54.99,
        description: 'Bridge the gap between backend and frontend development',
        image: '/api/placeholder/300/200',
        category: 'books',
        inStock: true
      }
    ],
    clothing: [
      {
        id: '7',
        name: 'Developer T-Shirt',
        price: 24.99,
        description: 'Comfortable coding attire - "It works on my machine"',
        image: '/api/placeholder/300/200',
        category: 'clothing',
        inStock: true
      },
      {
        id: '8',
        name: 'Hoodie with Code',
        price: 49.99,
        description: 'Stay warm while coding late nights',
        image: '/api/placeholder/300/200',
        category: 'clothing',
        inStock: true
      }
    ],
    'home-garden': [
      {
        id: '9',
        name: 'Ergonomic Office Chair',
        price: 299.99,
        description: 'Comfortable seating for long coding sessions',
        image: '/api/placeholder/300/200',
        category: 'home-garden',
        inStock: true
      },
      {
        id: '10',
        name: 'Standing Desk',
        price: 399.99,
        description: 'Adjustable desk for healthier coding habits',
        image: '/api/placeholder/300/200',
        category: 'home-garden',
        inStock: true
      }
    ]
  };
  
  return allProducts[category] || [];
}

// CATEGORY PAGE COMPONENT - Pre-rendered at BUILD TIME
export default async function CategoryPage({ 
  params 
}: { 
  params: { category: string } 
}) {
  // This data is fetched at BUILD TIME, not request time
  // Like generating product catalog PDFs during Maven build
  const products = await getProductsByCategory(params.category);
  const categoryName = params.category.replace('-', ' ').toUpperCase();
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      
      {/* CATEGORY HEADER */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 capitalize">
          {categoryName} Catalog
        </h1>
        <p className="text-lg text-gray-600">
          Statically generated product catalog - built at compile time!
        </p>
      </header>

      {/* STATIC GENERATION INFO */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-blue-900">
          🏗️ This Category Page is Statically Generated!
        </h2>
        <p className="text-sm text-blue-800">
          This product catalog was pre-rendered at <strong>build time</strong>, just like 
          generating PDF price lists or product documentation with Maven/Gradle plugins 
          in Spring Boot. Perfect for e-commerce sites with stable product catalogs!
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Product Image</span>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>
                <button 
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Build-Time Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Static Catalog Generation</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Component
public class CatalogGenerator {
    
    @EventListener(ApplicationReadyEvent.class)
    public void generateStaticCatalogs() {
        // Generate category catalogs at startup
        List<String> categories = Arrays.asList(
            "electronics", "books", "clothing"
        );
        
        categories.forEach(category -> {
            List<Product> products = productService
                .findByCategory(category);
                
            String html = templateEngine.process(
                "catalog-template", products
            );
            
            Files.write(
                Paths.get("static/catalogs/" + category + ".html"), 
                html.getBytes()
            );
        });
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Static Generation</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// Generate static category pages
export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map(category => ({ 
        category 
    }));
}

export default async function CategoryPage({ params }) {
    // Fetch data at BUILD TIME
    const products = await getProductsByCategory(
        params.category
    );
    
    return (
        <div>
            {products.map(product => 
                <ProductCard key={product.id} {...product} />
            )}
        </div>
    );
}`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Same result:</strong> Both approaches generate static HTML files for each 
            product category at build time, ensuring fast loading and great SEO for e-commerce sites!
          </p>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Browse Other Categories</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {['electronics', 'books', 'clothing', 'home-garden'].map(cat => (
            <a
              key={cat}
              href={`/catalog/${cat}`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                cat === params.category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {cat.replace('-', ' ')}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}