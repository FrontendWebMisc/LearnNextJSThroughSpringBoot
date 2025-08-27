# Next.js Image Optimization Feature

## Spring Boot Developers: Think Static Resources + CDN!
This is like Spring Boot's static resource handling but with automatic optimization, resizing, and CDN distribution - perfect for modern web applications!

**Your Spring Boot Static Resource Setup:**
```java
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static images
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCacheControl(CacheControl.maxAge(Duration.ofDays(30)));
                
        // Custom image processing endpoint
        registry.addResourceHandler("/optimized-images/**")
                .addResourceLocations("classpath:/static/optimized/");
    }
}

@RestController
public class ImageController {
    
    @GetMapping("/api/image/{filename}")
    public ResponseEntity<byte[]> getOptimizedImage(
            @PathVariable String filename,
            @RequestParam(defaultValue = "800") int width,
            @RequestParam(defaultValue = "600") int height) {
        
        // Manual image processing
        BufferedImage original = ImageIO.read(new File("images/" + filename));
        BufferedImage resized = resizeImage(original, width, height);
        
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageToBytes(resized));
    }
}
```

**Next.js Image Component (Automatic Optimization!):**
```typescript
import Image from 'next/image'

export default function ProductGallery() {
    return (
        <div>
            {/* Automatic optimization, lazy loading, and responsive sizing */}
            <Image
                src="/images/product-hero.jpg"
                alt="Product Hero"
                width={800}
                height={600}
                priority={true} // Load immediately for above-fold images
                placeholder="blur" // Show blur while loading
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XGMThqWMZhVmMa/fVCjqfMOdl8ePzKhoPeHMOel8WPzKhoPWDMOdl8ePzJwLT"
                style={{ objectFit: 'cover' }}
            />
            
            {/* Different sizes for different screen sizes */}
            <Image
                src="/images/product-thumbnail.jpg"
                alt="Product Thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
            />
            
            {/* External images with domains configuration */}
            <Image
                src="https://api.yourspring.boot/images/user-avatar.jpg"
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full"
            />
        </div>
    )
}
```

## Key Concepts for Spring Boot Developers

### 1. Automatic Image Processing (No More Manual Work!)
- **Automatic resizing** - No need for ImageIO and manual processing
- **Format optimization** - WebP for modern browsers, JPEG/PNG fallback
- **Quality optimization** - Automatic compression based on content
- **Lazy loading** - Images load only when they enter viewport

### 2. Performance Benefits vs Manual Spring Boot Setup
| Spring Boot Manual | Next.js Image Component |
|-------------------|-------------------------|
| Manual `BufferedImage` processing | Automatic optimization |
| Custom caching headers | Built-in CDN caching |
| Manual responsive handling | Automatic `sizes` attribute |
| No lazy loading | Built-in lazy loading |
| Single format | Multiple format support |

### 3. Configuration (Like application.properties)
```javascript
// next.config.js - Like your application.properties
module.exports = {
    images: {
        // External domains (like CORS configuration)
        domains: ['api.yourspring.boot', 'cdn.example.com'],
        
        // Image sizes for optimization
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        
        // Formats to generate
        formats: ['image/webp'],
        
        // Quality settings
        minimumCacheTTL: 60,
    }
}
```

## Examples in This Branch

1. **Product Gallery** - `/app/gallery` (Optimized product images)
2. **User Profiles** - `/app/profiles` (Avatar optimization and lazy loading)
3. **Blog Images** - `/app/blog` (Responsive images in content)
4. **Hero Sections** - `/app/hero` (Priority loading for above-fold images)
5. **Image API** - `/app/api/image` (Custom image processing endpoint)

## Getting Started

Run the development server:
```bash
npm run dev
```

See optimized images in action:
- http://localhost:3000/gallery - Product image gallery
- http://localhost:3000/profiles - User avatar optimization
- http://localhost:3000/blog/image-post - Blog with optimized images
- http://localhost:3000/hero - Hero section with priority loading

## Spring Boot Developer Benefits

1. **No manual ImageIO** - Automatic processing replaces your custom code
2. **Built-in CDN** - No need for CloudFront/S3 setup
3. **Responsive by default** - Automatic sizing for different devices  
4. **Performance optimized** - WebP, lazy loading, and caching built-in
5. **Simple API** - Just use `<Image>` component instead of complex controllers