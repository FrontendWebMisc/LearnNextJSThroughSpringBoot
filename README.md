# Next.js Incremental Static Regeneration (ISR) Feature

## Spring Boot Developers: Think Cached API Responses That Auto-Update!
This is like Spring Boot's `@Cacheable` with TTL expiry, but for entire HTML pages! ISR serves cached static pages but regenerates them in the background when they expire.

**Your Spring Boot Caching Pattern:**
```java
@RestController  
public class ProductController {
    
    @GetMapping("/api/products/{id}")
    @Cacheable(value = "products", key = "#id")
    @CacheEvict(value = "products", key = "#id", condition = "@cacheService.isExpired(#id, 60)")
    public Product getProduct(@PathVariable Long id) {
        // This runs only when cache is empty or expired
        return productService.findById(id);
    }
    
    @PostMapping("/api/products/{id}/update")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = productService.update(id, product);
        
        // Invalidate cache to force fresh data
        cacheManager.evict("products", id);
        return updated;
    }
}

@Component
public class CacheService {
    public boolean isExpired(Long id, int ttlSeconds) {
        // Custom logic to check if cache entry is older than TTL
        return getCacheAge(id) > ttlSeconds;
    }
}
```

**Next.js ISR (Same Pattern, But for Full Pages!):**
```typescript
// Product page that regenerates every 60 seconds
export async function generateStaticParams() {
    // Pre-generate popular products at build time
    const popularProducts = await getPopularProducts();
    return popularProducts.map(product => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    // This runs at build time AND when cache expires
    const product = await getProduct(params.id);
    
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Last updated: {new Date().toISOString()}</p>
        </div>
    );
}

// ISR Configuration - Like @Cacheable TTL
export const revalidate = 60; // Regenerate every 60 seconds (like cache TTL)

// For API routes with ISR
export async function GET(request: Request) {
    const product = await getProduct(id);
    
    return Response.json(product, {
        headers: {
            'Cache-Control': 's-maxage=60, stale-while-revalidate=59'
        }
    });
}
```

## Key Concepts for Spring Boot Developers

### 1. ISR = Smart Caching Strategy
- **Static at build** - Like pre-warming your cache
- **Serve stale** - Like serving cached data while refreshing
- **Regenerate in background** - Like async cache refresh
- **On-demand revalidation** - Like manual cache eviction

### 2. ISR vs Spring Boot Caching
| Spring Boot Cache | Next.js ISR |
|------------------|-------------|
| `@Cacheable` method | `revalidate` export |
| Cache TTL | `revalidate` seconds |
| `@CacheEvict` | On-demand revalidation |
| Background refresh | Background regeneration |
| Database → Cache | API → Static HTML |

### 3. Revalidation Strategies
```typescript
// Time-based (like TTL)
export const revalidate = 3600; // 1 hour

// On-demand (like @CacheEvict)
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: Request) {
    const { productId } = await request.json();
    
    // Update product in database
    await updateProduct(productId);
    
    // Invalidate specific page (like cache eviction)
    revalidatePath(`/products/${productId}`);
    
    // Or invalidate by tag (like clearing multiple cache entries)
    revalidateTag('products');
    
    return Response.json({ revalidated: true });
}
```

## Examples in This Branch

1. **Product Catalog** - `/products/[id]` (ISR with 60s revalidation)
2. **News Articles** - `/news/[slug]` (Background updates for fresh content)
3. **User Profiles** - `/users/[id]` (On-demand revalidation)
4. **E-commerce** - `/shop/[category]` (Hybrid caching strategy)
5. **Dashboard** - `/dashboard/stats` (Real-time data with ISR)

## Getting Started

Build with ISR:
```bash
npm run build
npm run start # Production mode required for ISR
```

Test ISR behavior:
- http://localhost:3000/products/1 - Product details with 60s revalidation
- http://localhost:3000/products/2 - Another product example  
- http://localhost:3000/products/3 - Third product example
- http://localhost:3000/news/latest - Breaking news with 5-minute updates
- http://localhost:3000/news/spring-boot-nextjs-guide - Tutorial article
- http://localhost:3000/users/123 - User profile with on-demand revalidation
- http://localhost:3000/shop/electronics - Electronics category (30-min cache)
- http://localhost:3000/shop/clothing - Clothing category  
- http://localhost:3000/shop/home - Home & Garden category
- http://localhost:3000/dashboard/stats - Analytics dashboard (2-min cache)

## Spring Boot Developer Benefits

1. **No cache management code** - ISR handles TTL and eviction automatically
2. **Better performance** - Serve static HTML instead of processing requests
3. **Automatic scaling** - CDN-friendly static files
4. **Background updates** - Users get fast responses while data refreshes
5. **Simple configuration** - Just set `revalidate` number (like cache TTL)

## ISR Best Practices (From Spring Boot Perspective)

1. **Choose TTL wisely** - Like setting cache expiry in `@Cacheable`
2. **Use tags** - Group related pages for batch invalidation
3. **Monitor cache hits** - ISR analytics like Spring cache statistics
4. **Combine strategies** - Some pages ISR, others real-time (like mixed caching)
5. **Handle failures** - Fallback to stale content (like cache-aside pattern)