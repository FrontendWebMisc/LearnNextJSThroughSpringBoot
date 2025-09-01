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

## 🛡️ Production-Grade Error Handling

This branch includes **enterprise-level error handling** - just like Spring Boot's `@ControllerAdvice` and `@ExceptionHandler`:

### Error Handler Architecture
- **Global Error Middleware** - Like Spring Boot `@ControllerAdvice`
- **Structured Error Responses** - Consistent error format across all endpoints
- **Request Context Tracking** - Unique request IDs for debugging
- **Comprehensive Logging** - Operational vs system error categorization
- **Rate Limiting** - Built-in protection against abuse
- **Input Validation** - Like Spring Boot's `@Valid` annotation

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Please fix the following errors",
    "details": {
      "validationErrors": [
        {"field": "email", "message": "Valid email is required"}
      ]
    },
    "timestamp": "2024-03-01T10:30:00Z",
    "path": "/api/users",
    "requestId": "req-123-456-789"
  }
}
```

## Examples in This Branch

1. **User Management API** - `/api/users` (Full CRUD with validation & auth)
2. **Authentication API** - `/api/auth/profile` (User profile management)  
3. **Error Handling Demo** - All endpoints showcase error handling patterns
4. **Rate Limiting** - Production-ready request throttling

## Getting Started

Run the development server:
```bash
npm run dev
```

Test these API endpoints:

### 👤 User Management (with Auth Header: `Authorization: Bearer valid-jwt-token`)
- **GET** `/api/users` - List users with pagination & filtering
- **POST** `/api/users` - Create new user with validation
- **GET** `/api/users/{id}` - Get specific user
- **PUT** `/api/users/{id}` - Update user with validation  
- **DELETE** `/api/users/{id}` - Delete user with business rules

### 🔐 Authentication
- **GET** `/api/auth/profile` - Get current user profile
- **PUT** `/api/auth/profile` - Update user profile

### 🧪 Test Error Scenarios
- **Missing Auth**: Try without `Authorization` header → `401 Unauthorized`
- **Invalid Data**: POST user with invalid email → `400 Validation Failed`
- **Rate Limiting**: Make 100+ requests quickly → `429 Too Many Requests`
- **Not Found**: GET `/api/users/nonexistent` → `404 User Not Found`

## Spring Boot Developer Benefits

✅ **Familiar Patterns** - Same concepts as `@RestController`, `@Valid`, `@ExceptionHandler`  
✅ **Enterprise Ready** - Production-grade error handling and logging  
✅ **Type Safety** - Full TypeScript support like Spring Boot's type system  
✅ **Easy Migration** - Your Spring Boot knowledge directly applies  
✅ **Modern Stack** - Latest Next.js with Spring Boot-style architecture
