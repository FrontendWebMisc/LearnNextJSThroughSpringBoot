'use client'; // CLIENT COMPONENT - runs in browser

import Link from "next/link";
import { useState, useEffect } from 'react';

// PRODUCT & CART TYPES - Like your DTOs in Spring Boot
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: number;
}

interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  addedAt: string;
}

// MOCK E-COMMERCE API - Would call your Spring Boot REST APIs
const ecommerceApi = {
  // GET /api/products - Your @GetMapping
  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        image: "🎧",
        description: "Premium noise-cancelling headphones",
        inStock: 15
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 299.99,
        image: "⌚",
        description: "Fitness tracking smartwatch",
        inStock: 8
      },
      {
        id: 3,
        name: "Laptop Stand",
        price: 79.99,
        image: "💻",
        description: "Ergonomic laptop stand",
        inStock: 23
      },
      {
        id: 4,
        name: "Mechanical Keyboard",
        price: 149.99,
        image: "⌨️",
        description: "RGB mechanical gaming keyboard",
        inStock: 12
      },
      {
        id: 5,
        name: "Wireless Mouse",
        price: 59.99,
        image: "🖱️",
        description: "High-precision wireless mouse",
        inStock: 31
      }
    ];
  },

  // GET /api/cart - Your @GetMapping for user's cart
  async getCartItems(): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    // Simulate user's existing cart items
    return [];
  },

  // POST /api/cart/items - Your @PostMapping to add items
  async addToCart(productId: number, quantity: number): Promise<CartItem> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock response - in real app, your Spring Boot API would return this
    const mockCartItem: CartItem = {
      id: Date.now(),
      productId,
      product: {} as Product, // Would be populated by your backend
      quantity,
      addedAt: new Date().toISOString()
    };
    
    return mockCartItem;
  },

  // PUT /api/cart/items/{id} - Your @PutMapping to update quantity
  async updateCartItem(cartItemId: number, quantity: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
  },

  // DELETE /api/cart/items/{id} - Your @DeleteMapping
  async removeFromCart(cartItemId: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
  },

  // POST /api/orders - Your @PostMapping for checkout
  async checkout(cartItems: CartItem[]): Promise<{ orderId: string; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return {
      orderId: `ORDER-${Date.now()}`,
      total
    };
  }
};

// SHOPPING CART CLIENT COMPONENT
// This is like a React/Vue frontend that calls your e-commerce REST APIs
export default function ShoppingCart() {
  
  // CLIENT-SIDE STATE MANAGEMENT (like frontend state)
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  // LOAD DATA ON MOUNT (calls your APIs)
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedProducts, fetchedCartItems] = await Promise.all([
        ecommerceApi.getProducts(),
        ecommerceApi.getCartItems()
      ]);
      
      setProducts(fetchedProducts);
      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ADD TO CART - Calls POST /api/cart/items
  const handleAddToCart = async (product: Product) => {
    try {
      // Check if item already in cart
      const existingItem = cartItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Update existing item quantity
        await ecommerceApi.updateCartItem(existingItem.id, existingItem.quantity + 1);
        
        setCartItems(prev => prev.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        // Add new item
        const cartItem = await ecommerceApi.addToCart(product.id, 1);
        cartItem.product = product; // In real app, your API would populate this
        
        setCartItems(prev => [...prev, cartItem]);
      }
      
      alert(`Added ${product.name} to cart!`);
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  // UPDATE QUANTITY - Calls PUT /api/cart/items/{id}
  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(cartItemId);
      return;
    }

    try {
      await ecommerceApi.updateCartItem(cartItemId, newQuantity);
      
      setCartItems(prev => prev.map(item => 
        item.id === cartItemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
      
    } catch (error) {
      console.error('Failed to update quantity:', error);
      alert('Failed to update quantity');
    }
  };

  // REMOVE FROM CART - Calls DELETE /api/cart/items/{id}
  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await ecommerceApi.removeFromCart(cartItemId);
      
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      alert('Failed to remove item');
    }
  };

  // CHECKOUT - Calls POST /api/orders
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    try {
      setCheckingOut(true);
      const order = await ecommerceApi.checkout(cartItems);
      
      alert(`Order placed successfully! Order ID: ${order.orderId}`);
      setCartItems([]); // Clear cart
      
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  // CALCULATE TOTALS (client-side calculations)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center py-12">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Shopping Cart Demo
        </h1>
        <p className="text-lg text-gray-600">
          State management & API calls - like frontend calling your e-commerce REST APIs
        </p>
      </header>

      <main>
        {/* CLIENT COMPONENT EXPLANATION */}
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🛒 E-commerce Client Component</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Spring Boot E-commerce APIs:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><code>GET /api/products</code> - List all products</li>
                <li><code>GET /api/cart</code> - Get user's cart items</li>
                <li><code>POST /api/cart/items</code> - Add item to cart</li>
                <li><code>PUT /api/cart/items/{id}</code> - Update quantity</li>
                <li><code>DELETE /api/cart/items/{id}</code> - Remove from cart</li>
                <li><code>POST /api/orders</code> - Checkout and create order</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Client Component Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><strong>State Management</strong> - Cart items, products</li>
                <li><strong>API Integration</strong> - Calls your REST endpoints</li>
                <li><strong>Interactive UI</strong> - Add/remove/update cart</li>
                <li><strong>Real-time Updates</strong> - UI updates immediately</li>
                <li><strong>Form Handling</strong> - Quantity changes, checkout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PRODUCTS SECTION */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">🛍️ Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow border">
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.inStock} in stock
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.inStock === 0}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        product.inStock > 0
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CART SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow border sticky top-8">
              
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🛒 Your Cart ({totalItems} items)
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p className="mb-2">Your cart is empty</p>
                  <p className="text-sm">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* CART ITEMS */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        
                        <div className="text-2xl">{item.product.image}</div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            ${item.product.price}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="ml-2 text-red-600 hover:text-red-800 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CART TOTAL */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      disabled={checkingOut || cartItems.length === 0}
                      className={`w-full py-3 rounded-md font-medium transition-colors ${
                        checkingOut
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {checkingOut ? 'Processing...' : 'Checkout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SPRING BOOT API COMPARISON */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔄 Your E-commerce API Pattern</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Your Spring Boot Controllers</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
@RequestMapping("/api")
public class EcommerceController {
  
  @GetMapping("/products")
  public List<Product> getProducts() {
    return productService.findAll();
  }
  
  @PostMapping("/cart/items")
  public CartItem addToCart(@RequestBody CartRequest req) {
    return cartService.addItem(
      req.getProductId(), 
      req.getQuantity()
    );
  }
  
  @PutMapping("/cart/items/{id}")
  public void updateCartItem(@PathVariable Long id,
                           @RequestBody CartUpdateRequest req) {
    cartService.updateQuantity(id, req.getQuantity());
  }
  
  @PostMapping("/orders")
  public Order checkout(@RequestBody CheckoutRequest req) {
    return orderService.createOrder(req.getCartItems());
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Client Component API Calls</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`'use client';
import { useState, useEffect } from 'react';

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  // Load products from your API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  // Add to cart via your API
  const addToCart = async (productId) => {
    const response = await fetch('/api/cart/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    const cartItem = await response.json();
    setCartItems([...cartItems, cartItem]);
  };
  
  // Checkout via your API
  const checkout = async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems })
    });
    const order = await response.json();
    alert(\`Order \${order.id} created!\`);
  };
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-100 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Perfect Match:</strong> Client Components work exactly like React/Vue/Angular frontends 
              that call your Spring Boot APIs. You could integrate this with your existing e-commerce backend 
              by simply changing the API endpoints to point to your REST controllers!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}