'use client'; // Client component to test our API routes

import Link from "next/link";
import { useState, useEffect } from 'react';

// TYPES - Same as our API
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  total?: number;
}

// API CLIENT - This calls our Next.js API routes (like calling your Spring Boot APIs)
const productsApi = {
  // GET /api/products - Test our GET endpoint
  async getAll(category?: string): Promise<ApiResponse<Product[]>> {
    const url = new URL('/api/products', window.location.origin);
    if (category) url.searchParams.set('category', category);
    
    const response = await fetch(url.toString());
    return response.json();
  },

  // GET /api/products/{id} - Test our GET by ID endpoint
  async getById(id: number): Promise<ApiResponse<Product>> {
    const response = await fetch(`/api/products/${id}`);
    return response.json();
  },

  // POST /api/products - Test our POST endpoint
  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
  },

  // PUT /api/products/{id} - Test our PUT endpoint
  async update(id: number, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  // DELETE /api/products/{id} - Test our DELETE endpoint
  async delete(id: number): Promise<ApiResponse<Product>> {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// PRODUCTS API DEMO PAGE
export default function ProductsApiDemo() {
  // STATE FOR API TESTING
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>('');
  
  // FORM STATE FOR CREATING/UPDATING
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: ''
  });

  // LOAD PRODUCTS ON MOUNT
  useEffect(() => {
    loadProducts();
  }, []);

  // TEST GET /api/products
  const loadProducts = async (category?: string) => {
    try {
      setLoading(true);
      const response = await productsApi.getAll(category);
      
      setApiResponse(JSON.stringify(response, null, 2));
      
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      setApiResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // TEST GET /api/products/{id}
  const loadProduct = async (id: number) => {
    try {
      setLoading(true);
      const response = await productsApi.getById(id);
      
      setApiResponse(JSON.stringify(response, null, 2));
      
      if (response.success && response.data) {
        setSelectedProduct(response.data);
      }
    } catch (error) {
      setApiResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // TEST POST /api/products
  const createProduct = async () => {
    try {
      setLoading(true);
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        inStock: parseInt(formData.inStock, 10)
      };
      
      const response = await productsApi.create(productData);
      
      setApiResponse(JSON.stringify(response, null, 2));
      
      if (response.success) {
        // Reload products list
        await loadProducts();
        // Reset form
        setFormData({ name: '', description: '', price: '', category: '', inStock: '' });
      }
    } catch (error) {
      setApiResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // TEST PUT /api/products/{id}
  const updateProduct = async (id: number) => {
    try {
      setLoading(true);
      const updates = {
        name: formData.name || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        inStock: formData.inStock ? parseInt(formData.inStock, 10) : undefined
      };
      
      // Remove undefined values
      Object.keys(updates).forEach(key => {
        if (updates[key as keyof typeof updates] === undefined) {
          delete updates[key as keyof typeof updates];
        }
      });
      
      const response = await productsApi.update(id, updates);
      
      setApiResponse(JSON.stringify(response, null, 2));
      
      if (response.success) {
        await loadProducts();
      }
    } catch (error) {
      setApiResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // TEST DELETE /api/products/{id}
  const deleteProduct = async (id: number) => {
    if (!confirm(`Delete product ${id}?`)) return;
    
    try {
      setLoading(true);
      const response = await productsApi.delete(id);
      
      setApiResponse(JSON.stringify(response, null, 2));
      
      if (response.success) {
        await loadProducts();
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
      }
    } catch (error) {
      setApiResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Products API Demo
        </h1>
        <p className="text-lg text-gray-600">
          Test your Next.js API routes - exactly like testing Spring Boot REST controllers
        </p>
      </header>

      <main>
        {/* API ROUTES EXPLANATION */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔌 API Routes Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Spring Boot Controllers:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/api/products")
public class ProductController {
  
  @GetMapping
  public List<Product> getProducts() { }
  
  @GetMapping("/{id}")
  public Product getProduct(@PathVariable Long id) { }
  
  @PostMapping
  public Product createProduct(@RequestBody Product product) { }
  
  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable Long id,
                              @RequestBody Product product) { }
  
  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable Long id) { }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Next.js API Routes:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// app/api/products/route.ts
export async function GET(request: Request) { }
export async function POST(request: Request) { }

// app/api/products/[id]/route.ts  
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) { }

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) { }

export async function DELETE(
  request: Request,  
  { params }: { params: { id: string } }
) { }`}
              </pre>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded">
            <h3 className="font-semibold mb-2">🎯 Available Endpoints:</h3>
            <ul className="text-sm space-y-1">
              <li><strong>GET</strong> <code>/api/products</code> - List all products (with optional ?category filter)</li>
              <li><strong>POST</strong> <code>/api/products</code> - Create new product</li>
              <li><strong>GET</strong> <code>/api/products/{id}</code> - Get product by ID</li>
              <li><strong>PUT</strong> <code>/api/products/{id}</code> - Update product</li>
              <li><strong>DELETE</strong> <code>/api/products/{id}</code> - Delete product</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT SIDE - API TESTING */}
          <div className="space-y-6">
            
            {/* GET ALL PRODUCTS */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">📋 GET /api/products</h3>
              
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => loadProducts()}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Get All Products
                </button>
                <button
                  onClick={() => loadProducts('Electronics')}
                  disabled={loading}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Filter Electronics
                </button>
              </div>
              
              <div className="space-y-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">
                      <strong>{product.name}</strong> - ${product.price}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => loadProduct(product.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        GET /{product.id}
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CREATE PRODUCT FORM */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">➕ POST /api/products</h3>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Stock quantity"
                  value={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                
                <button
                  onClick={createProduct}
                  disabled={loading || !formData.name}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Create Product
                </button>
              </div>
            </div>

            {/* UPDATE PRODUCT */}
            {selectedProduct && (
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">
                  ✏️ PUT /api/products/{selectedProduct.id}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Updating: <strong>{selectedProduct.name}</strong>
                </p>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="New name (optional)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="New price (optional)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  
                  <button
                    onClick={() => updateProduct(selectedProduct.id)}
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50"
                  >
                    Update Product
                  </button>
                  
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - API RESPONSE */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">📡 API Response</h3>
            
            <div className="bg-black p-4 rounded-lg overflow-auto max-h-96">
              <pre className="text-green-400 text-sm whitespace-pre-wrap">
                {apiResponse || 'Click any API button to see the response...'}
              </pre>
            </div>
            
            {loading && (
              <div className="mt-4 text-center">
                <div className="text-blue-400 font-medium">Making API call...</div>
              </div>
            )}
          </div>
        </div>

        {/* CURL EXAMPLES */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">💻 Test with cURL (like you would in Spring Boot)</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">GET all products:</h3>
              <code className="bg-gray-800 text-green-400 p-2 rounded block text-sm">
                curl http://localhost:3000/api/products
              </code>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">POST create product:</h3>
              <code className="bg-gray-800 text-green-400 p-2 rounded block text-sm">
                curl -X POST http://localhost:3000/api/products \<br/>
                &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
                &nbsp;&nbsp;-d '{"name":"Test Product","description":"A test","price":99.99,"category":"Test","inStock":10}'
              </code>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">GET product by ID:</h3>
              <code className="bg-gray-800 text-green-400 p-2 rounded block text-sm">
                curl http://localhost:3000/api/products/1
              </code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}