// NEXT.JS API ROUTE - This is exactly like your Spring Boot @RestController!
// File: app/api/products/route.ts = Endpoint: /api/products

// PRODUCT TYPE - Like your DTOs/entities in Spring Boot
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

// SIMULATED DATABASE - In real app, this would be Prisma, TypeORM, etc.
// Like your @Repository layer in Spring Boot
const productsDatabase: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    inStock: 15,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-02-01T14:20:00Z"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor",
    price: 299.99,
    category: "Electronics",
    inStock: 8,
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-25T11:30:00Z"
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic laptop stand with adjustable height",
    price: 79.99,
    category: "Office",
    inStock: 23,
    createdAt: "2024-02-01T16:45:00Z",
    updatedAt: "2024-02-05T10:10:00Z"
  }
];

// GET /api/products - Like @GetMapping("/products") in Spring Boot
export async function GET(request: Request) {
  try {
    // QUERY PARAMETERS - Like @RequestParam in Spring Boot
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    
    // BUSINESS LOGIC - Like your service layer
    let filteredProducts = productsDatabase;
    
    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Limit results if provided
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        filteredProducts = filteredProducts.slice(0, limitNum);
      }
    }
    
    // RESPONSE - Like returning ResponseEntity in Spring Boot
    return Response.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      message: "Products retrieved successfully"
    });
    
  } catch (error) {
    console.error('GET /api/products error:', error);
    
    // ERROR RESPONSE - Like @ExceptionHandler in Spring Boot
    return Response.json(
      {
        success: false,
        error: "Failed to retrieve products",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Like @PostMapping("/products") in Spring Boot
export async function POST(request: Request) {
  try {
    // REQUEST BODY - Like @RequestBody in Spring Boot
    const body = await request.json();
    
    // INPUT VALIDATION - Like @Valid annotation in Spring Boot
    const { name, description, price, category, inStock } = body;
    
    if (!name || !description || !price || !category) {
      return Response.json(
        {
          success: false,
          error: "Validation failed",
          message: "Missing required fields: name, description, price, category"
        },
        { status: 400 }
      );
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return Response.json(
        {
          success: false,
          error: "Validation failed", 
          message: "Price must be a positive number"
        },
        { status: 400 }
      );
    }
    
    // CREATE NEW PRODUCT - Like your service layer creating entities
    const newProduct: Product = {
      id: Math.max(...productsDatabase.map(p => p.id)) + 1,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price.toString()),
      category: category.trim(),
      inStock: inStock || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // SAVE TO DATABASE - Like repository.save() in Spring Boot
    productsDatabase.push(newProduct);
    
    // SUCCESS RESPONSE - Like returning ResponseEntity.ok() in Spring Boot
    return Response.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully"
      },
      { status: 201 } // HTTP 201 Created
    );
    
  } catch (error) {
    console.error('POST /api/products error:', error);
    
    return Response.json(
      {
        success: false,
        error: "Failed to create product",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PUT /api/products - Bulk update (optional, like batch operations)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { action, productIds, updates } = body;
    
    if (action === 'bulk_update' && productIds && updates) {
      const updatedProducts: Product[] = [];
      
      productIds.forEach((id: number) => {
        const productIndex = productsDatabase.findIndex(p => p.id === id);
        if (productIndex !== -1) {
          productsDatabase[productIndex] = {
            ...productsDatabase[productIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          updatedProducts.push(productsDatabase[productIndex]);
        }
      });
      
      return Response.json({
        success: true,
        data: updatedProducts,
        message: `Updated ${updatedProducts.length} products`
      });
    }
    
    return Response.json(
      {
        success: false,
        error: "Invalid bulk update request"
      },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('PUT /api/products error:', error);
    
    return Response.json(
      {
        success: false,
        error: "Bulk update failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE /api/products - Bulk delete (optional)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');
    
    if (!idsParam) {
      return Response.json(
        {
          success: false,
          error: "Missing ids parameter"
        },
        { status: 400 }
      );
    }
    
    // Parse comma-separated IDs
    const idsToDelete = idsParam.split(',').map(id => parseInt(id.trim(), 10));
    const deletedProducts: Product[] = [];
    
    // Remove products from database
    idsToDelete.forEach(id => {
      const productIndex = productsDatabase.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        deletedProducts.push(productsDatabase[productIndex]);
        productsDatabase.splice(productIndex, 1);
      }
    });
    
    return Response.json({
      success: true,
      data: deletedProducts,
      message: `Deleted ${deletedProducts.length} products`
    });
    
  } catch (error) {
    console.error('DELETE /api/products error:', error);
    
    return Response.json(
      {
        success: false,
        error: "Bulk delete failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}