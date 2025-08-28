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
    'latest': {
      slug: 'latest',
      title: 'Breaking: Next.js 15 Released with Amazing ISR Improvements',
      publishedDate: '2024-02-20',
      author: 'Tech News Team',
      category: 'Technology',
      content: `
        <h2>Major Updates in Next.js 15</h2>
        <p>The Next.js team has just released version 15 with significant improvements to Incremental Static Regeneration (ISR), making it even more powerful for Spring Boot developers looking to modernize their frontend.</p>
        
        <h2>What's New for Backend Developers</h2>
        <ul>
          <li><strong>Improved Cache Control</strong> - More granular control over revalidation, similar to Spring Boot's @CacheEvict</li>
          <li><strong>Background Regeneration</strong> - Enhanced performance for cache refreshes</li>
          <li><strong>Better Error Handling</strong> - Graceful fallbacks when regeneration fails</li>
          <li><strong>Analytics Integration</strong> - Built-in cache hit/miss metrics</li>
        </ul>
        
        <h2>Spring Boot Integration Benefits</h2>
        <p>These improvements make Next.js an even better complement to your existing Spring Boot APIs. The new ISR features work seamlessly with your REST endpoints, providing automatic caching and regeneration without changing your backend code.</p>
        
        <blockquote>
          "Next.js ISR feels just like Spring Boot caching, but for entire pages. It's a game-changer for performance." 
          <cite>- Senior Spring Boot Developer</cite>
        </blockquote>
        
        <h2>Migration Guide</h2>
        <p>If you're currently using traditional server-side rendering with Spring Boot and Thymeleaf, Next.js 15's ISR can provide significant performance improvements while maintaining the server-first approach you're used to.</p>
      `,
      excerpt: 'Next.js 15 brings major improvements to Incremental Static Regeneration, offering better caching control and performance for developers familiar with Spring Boot patterns.',
      views: Math.floor(Math.random() * 10000) + 1000,
      lastUpdated: new Date().toISOString()
    },
    'spring-boot-nextjs-guide': {
      slug: 'spring-boot-nextjs-guide', 
      title: 'Complete Guide: Integrating Next.js with Your Spring Boot Backend',
      publishedDate: '2024-02-18',
      author: 'Full Stack Team',
      category: 'Tutorial',
      content: `
        <h2>Why Next.js + Spring Boot?</h2>
        <p>As a Spring Boot developer, you already understand the power of convention over configuration. Next.js brings the same philosophy to the frontend, making it a perfect match for your existing backend architecture.</p>
        
        <h2>Architecture Overview</h2>
        <p>The typical setup involves:</p>
        <ul>
          <li><strong>Spring Boot Backend</strong> - Your existing REST APIs, security, and business logic</li>
          <li><strong>Next.js Frontend</strong> - Server-side rendering, static generation, and client interactions</li>
          <li><strong>Shared Authentication</strong> - JWT tokens or session management</li>
        </ul>
        
        <h2>Key Integration Patterns</h2>
        
        <h3>1. API Route Proxy</h3>
        <p>Use Next.js API routes to proxy requests to your Spring Boot backend, adding frontend-specific logic like caching headers.</p>
        
        <h3>2. Server Components for Data Fetching</h3>
        <p>Next.js Server Components can directly call your Spring Boot APIs during server-side rendering, similar to how your controllers call services.</p>
        
        <h3>3. ISR for Performance</h3>
        <p>Implement ISR for content that doesn't change frequently, reducing load on your Spring Boot APIs while maintaining fresh data.</p>
        
        <h2>Common Challenges and Solutions</h2>
        <ul>
          <li><strong>CORS Configuration</strong> - Properly configure your Spring Boot CORS settings for Next.js development and production</li>
          <li><strong>Authentication Flow</strong> - Implement JWT token handling in both server and client components</li>
          <li><strong>Error Handling</strong> - Create consistent error responses between your APIs and Next.js error boundaries</li>
        </ul>
        
        <h2>Deployment Strategies</h2>
        <p>Learn how to deploy your Spring Boot backend and Next.js frontend together, including containerization with Docker and cloud deployment options.</p>
      `,
      excerpt: 'A comprehensive guide for Spring Boot developers looking to add Next.js as their frontend framework, covering architecture, integration patterns, and deployment.',
      views: Math.floor(Math.random() * 5000) + 500,
      lastUpdated: new Date().toISOString()
    }
  };
  
  const article = articles[slug];
  if (!article) {
    throw new Error(`Article with slug "${slug}" not found`);
  }
  
  return article;
}

// GENERATE STATIC PARAMS - Pre-generate popular articles
export async function generateStaticParams() {
  return [
    { slug: 'latest' },
    { slug: 'spring-boot-nextjs-guide' }
  ];
}

// ISR CONFIGURATION - News articles should be fresh but can be cached briefly
export const revalidate = 300; // Revalidate every 5 minutes for news content

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
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600 mb-6">
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
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <main>
          {/* ISR INFORMATION BANNER */}
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-orange-900 mb-2">
              📰 News ISR Strategy
            </h2>
            <div className="text-sm text-orange-800 space-y-2">
              <p>
                <strong>Cache Strategy:</strong> News articles cached for 5 minutes (balance between freshness and performance)
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date(article.lastUpdated).toLocaleString()}
              </p>
              <p>
                <strong>ISR Benefit:</strong> Readers get instant page loads while content stays reasonably fresh
              </p>
            </div>
          </div>

          {/* ARTICLE CONTENT */}
          <article className="bg-white rounded-lg shadow border p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* RELATED ARTICLES */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">📖 Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['latest', 'spring-boot-nextjs-guide'].filter(slug => slug !== params.slug).map((slug) => (
                <Link
                  key={slug}
                  href={`/news/${slug}`}
                  className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {slug === 'latest' ? 'Breaking: Next.js 15 Released' : 'Complete Integration Guide'}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {slug === 'latest' 
                        ? 'Major improvements to ISR and caching for better Spring Boot integration...'
                        : 'Learn how to integrate Next.js with your existing Spring Boot backend...'
                      }
                    </p>
                    <div className="text-xs text-gray-500">
                      Read more →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ISR COMPARISON */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🔄 News Caching: ISR vs Spring Boot</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Spring Boot News Caching</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class NewsController {
  
  @GetMapping("/api/news/{slug}")
  @Cacheable(value = "news", key = "#slug")
  public NewsArticle getNews(@PathVariable String slug) {
    // Database query for article
    return newsService.findBySlug(slug);
  }
  
  @PostMapping("/api/news/{slug}/update")
  @CacheEvict(value = "news", key = "#slug")
  public NewsArticle updateNews(
    @PathVariable String slug,
    @RequestBody NewsUpdate update
  ) {
    NewsArticle updated = newsService.update(slug, update);
    // Cache automatically cleared
    return updated;
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Next.js ISR News</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// 5-minute cache for news content
export const revalidate = 300;

export default async function NewsPage({ params }) {
  // Runs at build + every 5 minutes
  const article = await getNewsArticle(params.slug);
  
  return <ArticleView article={article} />;
}

// Webhook for immediate updates
export async function POST(request) {
  const { slug } = await request.json();
  
  // Clear specific article cache
  revalidatePath(\`/news/\${slug}\`);
  
  return Response.json({ revalidated: true });
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-100 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>⚡ Performance Advantage:</strong> News articles are served as static HTML from CDN 
                edges worldwide, providing instant loading. ISR ensures content freshness without the 
                latency of server-side rendering on every request.
              </p>
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
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Try these popular articles:</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/news/latest"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Latest News
              </Link>
              <Link
                href="/news/spring-boot-nextjs-guide"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Integration Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}