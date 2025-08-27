# Next.js Server-Side Rendering (SSR) Feature

## Spring Boot Developers: This is Your Comfort Zone!
Server-Side Rendering in Next.js works exactly like your Spring Boot controllers - processing requests on the server and returning HTML!

**Your Spring Boot Controller Pattern:**
```java
@Controller
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping("/products/{id}")
    public String getProduct(@PathVariable Long id, Model model) {
        // This runs on SERVER for each request
        Product product = productService.findById(id);
        
        if (product == null) {
            throw new ProductNotFoundException("Product not found");
        }
        
        // Add data to model for template rendering
        model.addAttribute("product", product);
        model.addAttribute("relatedProducts", productService.findRelated(id));
        model.addAttribute("currentTime", new Date());
        
        return "product-details"; // Thymeleaf template
    }
}
```

**Next.js SSR (Identical Server Processing!):**
```typescript
// This runs on SERVER for each request - just like your Spring Boot controller!
export default async function ProductPage({ params }: { params: { id: string } }) {
    // Server-side data fetching (like @Service call)
    const product = await productService.findById(params.id);
    
    if (!product) {
        throw new Error('Product not found');
    }
    
    // Fetch additional data (like multiple service calls)
    const relatedProducts = await productService.findRelated(params.id);
    const currentTime = new Date();
    
    // Return JSX (like Thymeleaf template rendering)
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Loaded at: {currentTime.toISOString()}</p>
            <RelatedProducts products={relatedProducts} />
        </div>
    );
}
```

## Key Concepts for Spring Boot Developers

### 1. Request-Time Processing (Exactly Like Spring Boot!)
- **Every request triggers server processing** (like controller methods)
- **Real-time data fetching** (like @Service calls)
- **Dynamic content generation** (like model population)
- **Server-side HTML rendering** (like Thymeleaf processing)

### 2. SSR vs Spring Boot Controllers
| Spring Boot Controller | Next.js SSR |
|------------------------|-------------|
| `@GetMapping("/path")` | `app/path/page.tsx` |
| `Model model` | Component props |
| `@PathVariable` | `params` object |
| `@RequestParam` | `searchParams` |
| Service calls | Direct async calls |
| Thymeleaf template | JSX component |

### 3. When to Use SSR (Like Spring Boot MVC)
- **Dynamic content** - Data changes frequently
- **User-specific content** - Personalized pages
- **Real-time data** - Stock prices, news feeds
- **SEO + freshness** - Search-friendly with current data

## Examples in This Branch

1. **Dynamic Blog** - `/blog` (Real-time content like CMS)
2. **Live Data Demo** - `/ssr-demo` (Server-rendered with current timestamp)
3. **User-Specific Content** - Server-side personalization
4. **Database Integration** - Fresh data on every request

## Getting Started

Run the development server:
```bash
npm run dev
```

Experience server-side rendering:
- http://localhost:3000/ssr-demo - Live timestamp on each refresh
- http://localhost:3000/blog - Dynamic blog content
- http://localhost:3000/blog/server-components-guide - Individual post rendering

## Spring Boot Developer Benefits

1. **Familiar execution model** - Code runs on server per request
2. **Real-time data** - Always fresh content (like controller responses)
3. **SEO optimized** - Pre-rendered HTML for search engines
4. **Error handling** - Server-side exception handling like @ExceptionHandler
5. **Security** - Sensitive operations stay on server

## SSR Performance Considerations

Just like optimizing Spring Boot controllers:

**Spring Boot Optimization:**
```java
@Cacheable("products")
public Product findById(Long id) {
    return productRepository.findById(id);
}
```

**Next.js SSR Optimization:**
```typescript
import { unstable_cache } from 'next/cache';

const getCachedProduct = unstable_cache(
    async (id: string) => productService.findById(id),
    ['product'],
    { revalidate: 300 } // Cache for 5 minutes
);
```

## Migration from Spring Boot MVC

If you're using Spring Boot MVC with Thymeleaf:

**Before (Spring Boot + Thymeleaf):**
- Controller → Service → Repository → Template
- Model attributes → Template variables  
- Server-side form handling

**After (Next.js SSR):**
- Page Component → Service calls → Database → JSX
- Async data → Component props
- Server-side form actions

Same server-side execution, modern React UI!