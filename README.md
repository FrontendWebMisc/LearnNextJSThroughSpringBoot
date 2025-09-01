# Next.js Static Site Generation (SSG) Feature

## Perfect for Spring Boot Developers Who Build Documentation & Reports!
This is like generating static documentation or reports at build time in Spring Boot. SSG pre-renders pages with data, creating super-fast static HTML files.

**Your Spring Boot Build-Time Generation:**
```java
// Maven/Gradle plugin that generates static docs
@Component  
public class DocumentationGenerator {
    
    @EventListener(ContextRefreshedEvent.class)
    public void generateStaticDocs() {
        // Generate API documentation
        List<Endpoint> endpoints = reflectionService.scanEndpoints();
        String html = templateEngine.process("api-docs", endpoints);
        Files.write(Paths.get("target/docs/api.html"), html.getBytes());
        
        // Generate user manuals  
        List<Guide> guides = contentService.getAllGuides();
        guides.forEach(guide -> {
            String content = markdownProcessor.toHtml(guide.getContent());
            Files.write(Paths.get("target/docs/" + guide.getId() + ".html"), 
                       content.getBytes());
        });
    }
}
```

**Next.js Static Generation (same concept!):**
```typescript
// This generates static HTML at BUILD TIME
export async function generateStaticParams() {
    // Like scanning your data at build time
    const posts = await getBlogPosts();
    return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    // This runs at BUILD TIME, not request time
    const post = await getBlogPostBySlug(params.slug);
    
    // Generated as static HTML file
    return <div>{post.content}</div>;
}
```

## Key Concepts for Spring Boot Developers

### 1. Build-Time vs Runtime
- **SSG** - Generate pages at build time (like Maven/Gradle build plugins)
- **SSR** - Generate pages at request time (like your controllers)
- **Static Export** - Pure HTML files (like generated documentation)

### 2. Performance Benefits
- **CDN-friendly** - Static files served from edge locations
- **Lightning fast** - No server processing needed
- **SEO optimized** - Crawlers get pre-rendered HTML
- **Cost effective** - Host on any static file server

## Examples in This Branch

1. **Blog System** - `/blog/[slug]` (Static blog posts like documentation)
2. **Product Catalog** - `/catalog/[category]` (E-commerce pages)
3. **Documentation** - `/docs/[section]` (API documentation generation)
4. **Reports Dashboard** - `/reports` (Business intelligence reports)

## Getting Started

Build static pages:
```bash
npm run build
```

Visit these statically generated pages:
- /blog/nextjs-vs-spring-boot - Blog post (static HTML)
- /catalog/electronics - Product category (pre-rendered)
- /docs/api-reference - Documentation (build-time generated)
- /reports/sales-2024 - Business report (static dashboard)