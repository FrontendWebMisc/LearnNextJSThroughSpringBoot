import Image from "next/image"

// IMAGE OPTIMIZATION DEMO - Like Spring Boot static resource handling
export default function ImageDemo() {
  return (
    <div className="p-8">
      <h1>Next.js Image Optimization Demo</h1>
      
      {/* OPTIMIZED IMAGES - Like @EnableWebMvc resource handling */}
      <div className="space-y-8">
        
        <div>
          <h2>Responsive Image (like Spring resource versioning)</h2>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={200}
            height={50}
            priority // Like @CacheControl for critical resources
          />
        </div>
        
        <div>
          <h2>Auto-sized Image with placeholder</h2>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo" 
            width={100}
            height={25}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        
        {/* EXTERNAL IMAGE with automatic optimization */}
        <div>
          <h2>External Image (auto-optimized)</h2>
          <Image
            src="https://picsum.photos/300/200"
            alt="Random image"
            width={300}
            height={200}
            // Next.js will optimize this external image automatically
          />
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🖼️ Spring Boot vs Next.js Images</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Spring Boot Static Resources</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(
        ResourceHandlerRegistry registry) {
        
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Next.js Image Component</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`import Image from "next/image"

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority // Critical resource
  placeholder="blur" // Loading state
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Automatic optimization:
// - WebP/AVIF conversion
// - Responsive sizing  
// - Lazy loading
// - CDN caching`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm">
            <strong>Next.js advantage:</strong> Automatic image optimization, format conversion, 
            and responsive sizing - like having a dedicated image CDN built into your framework!
          </p>
        </div>
      </div>
    </div>
  );
}
