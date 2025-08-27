// INDIVIDUAL PRODUCT API ROUTES - Like @PathVariable in Spring Boot
// File: app/api/products/[id]/route.ts = Endpoint: /api/products/{id}

// PRODUCT TYPE - Same as parent route
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

// SIMULATED DATABASE ACCESS - Like @Autowired repository
const getProductsDatabase = (): Product[] => {
  // In real app, this would be actual database access
  return [
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
};

// GET /api/products/{id} - Like @GetMapping("/products/{id}") with @PathVariable
export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // This is like @PathVariable Long id
) {
  try {
    // EXTRACT PATH PARAMETER - Like @PathVariable in Spring Boot
    const productId = parseInt(params.id, 10);
    
    // VALIDATION - Like validating path variables
    if (isNaN(productId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid product ID",
          message: "Product ID must be a valid number"
        },
        { status: 400 }
      );
    }
    
    // FIND PRODUCT - Like repository.findById() in Spring Boot
    const productsDb = getProductsDatabase();
    const product = productsDb.find(p => p.id === productId);
    
    // NOT FOUND HANDLING - Like throwing EntityNotFoundException
    if (!product) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
          message: `Product with ID ${productId} does not exist`
        },
        { status: 404 }
      );
    }
    
    // SUCCESS RESPONSE - Like returning ResponseEntity.ok(product)
    return Response.json({
      success: true,
      data: product,
      message: "Product retrieved successfully"
    });
    
  } catch (error) {
    console.error(`GET /api/products/${params.id} error:`, error);
    
    return Response.json(
      {
        success: false,
        error: "Failed to retrieve product",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PUT /api/products/{id} - Like @PutMapping("/products/{id}") in Spring Boot
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id, 10);
    
    if (isNaN(productId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid product ID"
        },
        { status: 400 }
      );
    }
    
    // REQUEST BODY - Like @RequestBody in Spring Boot
    const updates = await request.json();
    
    // FIND EXISTING PRODUCT - Like repository.findById()
    const productsDb = getProductsDatabase();
    const existingProductIndex = productsDb.findIndex(p => p.id === productId);
    
    if (existingProductIndex === -1) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
          message: `Product with ID ${productId} does not exist`
        },
        { status: 404 }
      );
    }
    
    // VALIDATION - Like @Valid annotation
    const { name, description, price, category, inStock } = updates;
    
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return Response.json(
        {
          success: false,
          error: "Validation failed",
          message: "Price must be a positive number"
        },
        { status: 400 }
      );
    }
    
    // UPDATE PRODUCT - Like repository.save() after updating fields
    const existingProduct = productsDb[existingProductIndex];
    const updatedProduct: Product = {
      ...existingProduct,
      // Only update provided fields (partial update)
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(price !== undefined && { price: parseFloat(price.toString()) }),
      ...(category !== undefined && { category: category.trim() }),
      ...(inStock !== undefined && { inStock: parseInt(inStock.toString(), 10) }),
      updatedAt: new Date().toISOString()
    };
    
    // SIMULATE DATABASE UPDATE
    productsDb[existingProductIndex] = updatedProduct;
    
    return Response.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully"
    });
    
  } catch (error) {
    console.error(`PUT /api/products/${params.id} error:`, error);
    
    return Response.json(
      {
        success: false,
        error: "Failed to update product",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PATCH /api/products/{id} - Like @PatchMapping for partial updates
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // PATCH is for partial updates - same logic as PUT but more explicit
  return PUT(request, { params });
}

// DELETE /api/products/{id} - Like @DeleteMapping("/products/{id}")
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id, 10);
    
    if (isNaN(productId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid product ID"
        },
        { status: 400 }
      );
    }
    
    // FIND AND DELETE - Like repository.deleteById()
    const productsDb = getProductsDatabase();
    const productIndex = productsDb.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
          message: `Product with ID ${productId} does not exist`
        },
        { status: 404 }
      );
    }
    
    // REMOVE PRODUCT - Like repository.delete()
    const deletedProduct = productsDb[productIndex];
    productsDb.splice(productIndex, 1);
    
    // SUCCESS RESPONSE - Like returning ResponseEntity.ok()
    return Response.json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully"
    });
    
  } catch (error) {
    console.error(`DELETE /api/products/${params.id} error:`, error);
    
    return Response.json(
      {
        success: false,
        error: "Failed to delete product",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}