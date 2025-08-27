import Link from "next/link";

// NEWS ARTICLE TYPES - Like DTOs in Spring Boot
interface NewsArticle {
  slug: string;
  title: string;
  publishedDate: string;
  author: string;
  category: string;
  content: string;
  excerpt: string;
  views: number;
  lastUpdated: string;
}

// SIMULATED NEWS SERVICE - Like @Service in Spring Boot
async function getNewsArticle(slug: string): Promise<NewsArticle> {
  // Simulate database/API delay (like service layer call)
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock news articles - in real app, this would be from database
  const articles: Record<string, NewsArticle> = {
    'nextjs-spring-comparison': {
      slug: 'nextjs-spring-comparison',
      title: 'Next.js vs Spring Boot: Full-Stack Development in 2024',
      publishedDate: '2024-02-15',
      author: 'Tech Team',
      category: 'Technology',
      content: `
        <h2>Introduction</h2>
        <p>As a Spring Boot developer, you're already familiar with building robust backend applications. Next.js offers a similar full-stack approach for the React ecosystem.</p>
        
        <h2>Key Similarities</h2>
        <ul>
          <li><strong>File-based routing</strong> - Like @RestController mappings</li>
          <li><strong>API routes</strong> - Built-in REST endpoints</li>
          <li><strong>Server-side rendering</strong> - Like Thymeleaf templates</li>
          <li><strong>Middleware</strong> - Similar to Spring interceptors</li>
        </ul>
        
        <h2>Performance Benefits</h2>
        <p>Next.js ISR (Incremental Static Regeneration) is like having @Cacheable annotations with automatic cache invalidation. Your pages are pre-rendered and cached, but can be updated in the background.</p>
        
        <h2>Development Experience</h2>
        <p>Just as Spring Boot provides auto-configuration and convention over configuration, Next.js offers zero-config setup with sensible defaults for modern web development.</p>
      `,
      excerpt: 'A comprehensive comparison between Next.js and Spring Boot for full-stack developers looking to understand modern web development patterns.',
      views: Math.floor(Math.random() * 1000) + 100,
      lastUpdated: new Date().toISOString()
    },
    'isr-caching-strategies': {
      slug: 'isr-caching-strategies', 
      title: 'ISR Caching Strategies: Spring Boot Developer\'s Guide',
      publishedDate: '2024-02-10',
      author: 'DevOps Team',
      category: 'Performance',
      content: `
        <h2>Understanding ISR</h2>
        <p>Incremental Static Regeneration (ISR) is Next.js's answer to intelligent caching, similar to Spring Boot's @Cacheable annotations but for entire pages.</p>
        
        <h2>Comparison with Spring Boot Caching</h2>
        <table>
          <tr><th>Spring Boot</th><th>Next.js ISR</th></tr>
          <tr><td>@Cacheable(ttl = 3600)</td><td>export const revalidate = 3600</td></tr>
          <tr><td>@CacheEvict</td><td>revalidateTag()</td></tr>
          <tr><td>Cache miss → DB query</td><td>Stale page → Background rebuild</td></tr>
        </table>
        
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Time-based revalidation</strong> - Like TTL in Redis/Hazelcast</li>
          <li><strong>On-demand revalidation</strong> - Similar to cache eviction</li>
          <li><strong>Tag-based invalidation</strong> - Group related content</li>
        </ul>
      `,
      excerpt: 'Learn how Next.js ISR compares to Spring Boot caching strategies and when to use each approach.',
      views: Math.floor(Math.random() * 800) + 50,
      lastUpdated: new Date().toISOString()
    }
  };
  
  const article = articles[slug];
  if (!article) {
    throw new Error(`Article with slug "${slug}" not found`);
  }
  
  return article;
}

// GENERATE STATIC PARAMS - Like pre-loading popular content
export async function generateStaticParams() {
  // Pre-generate popular articles at build time
  return [
    { slug: 'nextjs-spring-comparison' },
    { slug: 'isr-caching-strategies' }
  ];
}

// ISR CONFIGURATION - Like @Cacheable TTL
export const revalidate = 300; // Revalidate every 5 minutes (news updates frequently)

// DYNAMIC NEWS ARTICLE PAGE - With ISR
export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  try {
    // This runs at build time AND when cache expires (ISR)
    const article = await getNewsArticle(params.slug);
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        
        {/* NAVIGATION */}
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              👤 <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              📅 <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              👁️ <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        <main>
          {/* ISR INFORMATION BANNER */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              🔄 ISR-Powered Content
            </h2>
            <div className="text-sm text-green-800 space-y-2">
              <p>
                <strong>Cache Strategy:</strong> This page is statically generated and cached for 5 minutes (like @Cacheable with TTL)
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date(article.lastUpdated).toLocaleString()}
              </p>
              <p>
                <strong>Next Revalidation:</strong> Background update in progress if older than 5 minutes
              </p>
            </div>
          </div>

          {/* ARTICLE CONTENT */}
          <div className="bg-white rounded-lg shadow border p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* ISR COMPARISON */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🚀 ISR vs Spring Boot Caching</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Spring Boot Caching</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class NewsController {
  
  @GetMapping("/api/news/{slug}")
  @Cacheable(value = "news", key = "#slug")
  public NewsArticle getNews(@PathVariable String slug) {
    // Heavy database/API operation
    return newsService.findBySlug(slug);
  }
  
  @PostMapping("/api/news/{slug}/update")
  @CacheEvict(value = "news", key = "#slug")
  public NewsArticle updateNews(@PathVariable String slug) {
    // Clear cache when content updates
    return newsService.update(slug);
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Next.js ISR</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Automatic cache with TTL
export const revalidate = 300; // 5 minutes

export default async function NewsPage({ params }) {
  // Runs at build + when cache expires
  const article = await getNewsArticle(params.slug);
  
  return <ArticleView article={article} />;
}

// Manual cache invalidation
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { slug } = await request.json();
  // Clear specific page cache
  revalidatePath(\`/news/\${slug}\`);
  return Response.json({ revalidated: true });
}`}
                </pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
    
  } catch (error) {
    console.error(`Error loading article ${params.slug}:`, error);
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">
            The article "{params.slug}" could not be found or failed to load.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}