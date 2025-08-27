# Next.js Server Components Feature

## Spring Boot Comparison
In Spring Boot, all logic runs on the server by default:
```java
@RestController
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping("/products")
    public List<Product> getProducts() {
        // This runs on the SERVER
        // Can access database, file system, environment variables
        List<Product> products = productService.getAllProducts();
        return products; // Data sent to client
    }
}
```

In Next.js, **Server Components** work similarly - they run on the server:
```typescript
// This component runs on the SERVER (like Spring Boot controller)
export default async function ProductsPage() {
  // Server-side operations (like Spring Boot service layer)
  const products = await fetch('http://api.example.com/products');
  const data = await products.json();
  
  return <div>{/* Rendered HTML sent to client */}</div>;
}
```

## Key Concepts

### 1. Server vs Client Components
- **Server Components** - Run on server (like Spring Boot controllers)
- **Client Components** - Run in browser (JavaScript interactions)
- **Default**: All components are Server Components

### 2. Server Component Benefits
- **Database Access** - Direct database queries (like @Repository)
- **File System Access** - Read files, environment variables
- **Security** - Sensitive operations stay on server
- **Performance** - Less JavaScript sent to client

## Examples in This Branch

1. **Database Simulation** - `/app/products/page.tsx` (like @Service)
2. **File System Access** - `/app/blog/page.tsx` (reading markdown files)
3. **Environment Variables** - `/app/config/page.tsx` (server secrets)
4. **API Integration** - `/app/weather/page.tsx` (external APIs)

## Getting Started

Run the development server:
```bash
npm run dev
```

Visit these URLs to see Server Components:
- http://localhost:3000/products - Database simulation
- http://localhost:3000/blog - File system reading
- http://localhost:3000/config - Environment variables
- http://localhost:3000/weather - External API calls
