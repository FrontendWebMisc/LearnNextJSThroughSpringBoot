// STATIC BLOG POST PAGE - Generated at BUILD TIME
// This is like generating documentation pages with Maven/Gradle plugins in Spring Boot

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  publishedDate: string;
  author: string;
  tags: string[];
}

// GENERATE STATIC PARAMS - Like scanning data at build time in Spring Boot
// This tells Next.js which pages to pre-generate
export async function generateStaticParams() {
  // This runs at BUILD TIME, not request time
  // Like scanning all your documentation files to generate static HTML
  
  const blogPosts = [
    'nextjs-vs-spring-boot',
    'server-components-guide', 
    'api-routes-tutorial',
    'static-generation-explained'
  ];
  
  return blogPosts.map(slug => ({
    slug: slug
  }));
}

// STATIC DATA FETCHING - Runs at BUILD TIME
async function getBlogPost(slug: string): Promise<BlogPost> {
  // This simulates fetching data at build time
  // In real app: await fs.readFile(), database query, CMS API call, etc.
  
  const posts: Record<string, BlogPost> = {
    'nextjs-vs-spring-boot': {
      slug: 'nextjs-vs-spring-boot',
      title: 'Next.js vs Spring Boot: A Developer\'s Perspective',
      content: `
# Next.js vs Spring Boot: A Developer's Perspective

Coming from Spring Boot, Next.js feels both familiar and refreshingly different. Here's what every Spring Boot developer should know:

## Architecture Similarities

### Spring Boot Layers
- **@Controller** - Handle HTTP requests
- **@Service** - Business logic 
- **@Repository** - Data access
- **Templates** - UI rendering

### Next.js Equivalents
- **API Routes** - Handle HTTP requests (same as @Controller!)
- **Server Components** - Business logic + UI
- **Database calls** - Direct in components
- **JSX** - UI templating

## Key Differences

**Spring Boot**: Separate frontend + backend
**Next.js**: Full-stack in one framework

**Spring Boot**: Template engines (Thymeleaf)
**Next.js**: React components with JSX

**Spring Boot**: @Autowired dependency injection
**Next.js**: ES6 imports and async/await

## When to Choose What?

**Choose Spring Boot for:**
- Enterprise applications
- Microservices architecture
- Team familiar with Java
- Complex business logic

**Choose Next.js for:**
- Modern web applications
- Rapid prototyping  
- JavaScript/TypeScript teams
- SEO-critical sites

Both are excellent choices for modern web development!
      `,
      publishedDate: '2024-02-15',
      author: 'Spring Boot Developer',
      tags: ['next.js', 'spring-boot', 'comparison', 'web-development']
    },
    'server-components-guide': {
      slug: 'server-components-guide',
      title: 'Server Components: The Spring Boot Developer\'s Guide',
      content: `
# Server Components: The Spring Boot Developer's Guide

Server Components are Next.js's answer to server-side rendering, and they work remarkably similar to your Spring Boot controllers.

## The Concept

Just like your @RestController methods run on the server and return data, Server Components run on the server and return pre-rendered HTML.

## Example Comparison

**Your Spring Boot Controller:**
\`\`\`java
@GetMapping("/users")
public String users(Model model) {
    List<User> users = userService.findAll();
    model.addAttribute("users", users);
    return "users"; // Thymeleaf template
}
\`\`\`

**Next.js Server Component:**
\`\`\`typescript
export default async function UsersPage() {
    const users = await userService.findAll();
    return (
        <div>
            {users.map(user => 
                <UserCard key={user.id} user={user} />
            )}
        </div>
    );
}
\`\`\`

## Benefits for Spring Boot Developers

1. **Familiar execution model** - Runs on server like your controllers
2. **Direct database access** - No need for separate API layer
3. **SEO-friendly** - Pre-rendered HTML like server-side templates
4. **Performance** - No client-side JavaScript bundle

This approach combines the best of both worlds: server-side reliability with modern React development.
      `,
      publishedDate: '2024-02-20',
      author: 'Full Stack Developer',
      tags: ['server-components', 'spring-boot', 'tutorial']
    },
    'api-routes-tutorial': {
      slug: 'api-routes-tutorial', 
      title: 'Building REST APIs with Next.js API Routes',
      content: `
# Building REST APIs with Next.js API Routes

If you're a Spring Boot developer, you'll love Next.js API Routes. They work exactly like @RestController classes!

## The Basics

**Spring Boot:**
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<User> getUsers() { }
    
    @PostMapping  
    public User createUser(@RequestBody User user) { }
}
\`\`\`

**Next.js API Routes:**
\`\`\`typescript
// app/api/users/route.ts
export async function GET() {
    const users = await getUsers();
    return Response.json(users);
}

export async function POST(request: Request) {
    const user = await request.json();
    const created = await createUser(user);
    return Response.json(created);
}
\`\`\`

## Path Parameters

**Spring Boot:** \`@PathVariable\`
**Next.js:** Folder structure with \`[id]\`

## Request Body

**Spring Boot:** \`@RequestBody\`  
**Next.js:** \`await request.json()\`

## Validation

**Spring Boot:** \`@Valid\` annotation
**Next.js:** Manual validation or libraries like Zod

The patterns are nearly identical - you'll feel right at home!
      `,
      publishedDate: '2024-02-25',
      author: 'API Developer', 
      tags: ['api-routes', 'rest-api', 'spring-boot']
    },
    'static-generation-explained': {
      slug: 'static-generation-explained',
      title: 'Static Site Generation: Build-Time Magic',
      content: `
# Static Site Generation: Build-Time Magic

Static Site Generation (SSG) is like having a Maven plugin that generates all your documentation at build time - but for entire web pages!

## How It Works

1. **Build Time**: Next.js fetches data and renders pages
2. **Deploy**: Static HTML files are created
3. **Runtime**: Lightning-fast page loads from CDN

## Spring Boot Equivalent

Think of it like generating API documentation with Swagger at build time, or creating PDF reports during the Maven build process.

## Benefits

- **Performance**: Pre-rendered HTML loads instantly
- **SEO**: Search engines get fully rendered content  
- **Scalability**: Static files can be cached globally
- **Cost**: No server needed, just static file hosting

## Use Cases

- Documentation sites
- Marketing pages
- E-commerce product catalogs  
- Blog posts
- Portfolio sites

Perfect for content that doesn't change frequently - just like how you might generate static documentation in your Spring Boot projects!
      `,
      publishedDate: '2024-03-01',
      author: 'DevOps Engineer',
      tags: ['ssg', 'static-generation', 'performance']
    }
  };
  
  return posts[slug] || posts['nextjs-vs-spring-boot'];
}

// BLOG POST PAGE COMPONENT - Pre-rendered at BUILD TIME
export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // This data is fetched at BUILD TIME, not request time
  // Like processing markdown files during Maven build
  const post = await getBlogPost(params.slug);
  
  return (
    <article className="max-w-4xl mx-auto p-8">
      
      {/* ARTICLE HEADER */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex justify-center items-center gap-4 text-gray-600 mb-4">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* STATIC GENERATION INFO */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-green-900">
          🏗️ This Page is Statically Generated!
        </h2>
        <p className="text-sm text-green-800">
          This blog post was pre-rendered at <strong>build time</strong>, just like generating 
          documentation with Maven/Gradle plugins in Spring Boot. The HTML was created during 
          <code>npm run build</code> and served as a static file - super fast!
        </p>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
        />
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Build-Time Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Build Process</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`<!-- Maven plugin -->
<plugin>
    <groupId>io.swagger.codegen.v3</groupId>
    <artifactId>swagger-codegen-maven-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>api-spec.yaml</inputSpec>
                <language>html2</language>
                <output>target/docs</output>
            </configuration>
        </execution>
    </executions>
</plugin>

<!-- Result: Static HTML docs in target/docs -->`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Static Generation</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// Generate static pages
export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map(post => ({ 
        slug: post.slug 
    }));
}

// Build command
npm run build

// Result: Static HTML files in .next/`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Same concept:</strong> Both generate static files at build time for optimal performance. 
            Spring Boot might generate API docs, while Next.js generates entire web pages!
          </p>
        </div>
      </div>
    </article>
  );
}