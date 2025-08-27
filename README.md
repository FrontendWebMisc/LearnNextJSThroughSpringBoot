# Next.js API Routes Feature

## Perfect for Spring Boot REST API Developers!
This is exactly what you know and love - building REST APIs! Next.js API Routes work just like your Spring Boot @RestController:

**Your Spring Boot Controller:**
```java
@RestController
@RequestMapping("/api")
public class ProductController {
    
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.findAll();
    }
    
    @PostMapping("/products")
    public Product createProduct(@RequestBody ProductRequest request) {
        return productService.create(request);
    }
    
    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }
}
```

**Next.js API Route (same concept!):**
```typescript
// app/api/products/route.ts
export async function GET() {
    const products = await productService.findAll();
    return Response.json(products);
}

export async function POST(request: Request) {
    const body = await request.json();
    const product = await productService.create(body);
    return Response.json(product);
}

// app/api/products/[id]/route.ts  
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const product = await productService.findById(params.id);
    return Response.json(product);
}
```

## Key Concepts for Spring Boot Developers

### 1. File-Based API Routes
- **app/api/users/route.ts** = `/api/users` endpoint
- **app/api/users/[id]/route.ts** = `/api/users/{id}` endpoint  
- **HTTP methods as functions** - `GET()`, `POST()`, `PUT()`, `DELETE()`

### 2. Same Patterns You Know
- **Request/Response** - Handle HTTP requests like Spring Boot
- **Path parameters** - `[id]` = `@PathVariable`
- **Request body** - `request.json()` = `@RequestBody`
- **Database access** - Direct database calls in API routes
- **Middleware** - Request processing like Spring interceptors

## Examples in This Branch

1. **CRUD API** - `/api/products` (Full CRUD like your controllers)
2. **Authentication** - `/api/auth` (Login/logout endpoints)  
3. **File Upload** - `/api/upload` (Multipart file handling)
4. **Database API** - `/api/users` (Database operations)

## Getting Started

Run the development server:
```bash
npm run dev
```

Test these API endpoints:
- GET http://localhost:3000/api/products - List products
- POST http://localhost:3000/api/products - Create product
- GET http://localhost:3000/api/products/1 - Get product by ID
- GET http://localhost:3000/api/auth/profile - User profile
