// STATIC DOCUMENTATION PAGES - Generated at BUILD TIME  
// This is exactly like generating API docs with Swagger Maven plugin

interface DocSection {
  slug: string;
  title: string;
  description: string;
  content: string;
  lastUpdated: string;
  category: string;
}

// GENERATE STATIC PARAMS - Pre-generate all documentation sections at BUILD TIME
// Like Swagger scanning @RestController classes to generate API documentation
export async function generateStaticParams() {
  // This runs at BUILD TIME, not request time
  // Like Maven/Gradle plugins scanning your codebase to generate docs
  
  const docSections = [
    'api-reference',
    'getting-started',
    'authentication',
    'deployment-guide',
    'troubleshooting'
  ];
  
  return docSections.map(section => ({
    section: section
  }));
}

// STATIC DATA FETCHING - Runs at BUILD TIME
async function getDocumentationSection(section: string): Promise<DocSection> {
  // This simulates fetching documentation at build time
  // In real app: markdown files, CMS API, database query, etc.
  
  const docs: Record<string, DocSection> = {
    'api-reference': {
      slug: 'api-reference',
      title: 'API Reference',
      description: 'Complete API documentation for developers',
      category: 'Reference',
      lastUpdated: '2024-03-01',
      content: `
# API Reference

## Spring Boot to Next.js API Mapping

### Authentication Endpoints

#### POST /api/auth/login
**Spring Boot Equivalent:**
\`\`\`java
@PostMapping("/api/auth/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    // Validate credentials
    // Generate JWT token
    // Return response
}
\`\`\`

**Next.js API Route:**
\`\`\`typescript
// app/api/auth/login/route.ts
export async function POST(request: Request) {
    const { email, password } = await request.json();
    
    // Validate credentials
    const user = await validateUser(email, password);
    if (!user) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    
    return Response.json({ 
        token, 
        user: { id: user.id, email: user.email } 
    });
}
\`\`\`

### Product Endpoints

#### GET /api/products
**Description:** Fetch all products with optional filtering

**Parameters:**
- \`category\` (optional): Filter by product category
- \`limit\` (optional): Number of products to return (default: 50)
- \`offset\` (optional): Pagination offset (default: 0)

**Response:**
\`\`\`json
{
    "products": [
        {
            "id": "1",
            "name": "MacBook Pro",
            "price": 2399.99,
            "category": "electronics",
            "inStock": true
        }
    ],
    "total": 1,
    "hasMore": false
}
\`\`\`

#### POST /api/products  
**Description:** Create a new product

**Request Body:**
\`\`\`json
{
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "category": "electronics"
}
\`\`\`

### Error Handling

All API endpoints follow standard HTTP status codes:
- \`200\` - Success
- \`400\` - Bad Request (invalid data)
- \`401\` - Unauthorized (authentication required)
- \`403\` - Forbidden (insufficient permissions)
- \`404\` - Not Found
- \`500\` - Internal Server Error

**Error Response Format:**
\`\`\`json
{
    "error": "Error message",
    "code": "ERROR_CODE",
    "details": {}
}
\`\`\`
      `
    },
    'getting-started': {
      slug: 'getting-started',
      title: 'Getting Started Guide',
      description: 'Quick start guide for Spring Boot developers',
      category: 'Tutorial',
      lastUpdated: '2024-02-28',
      content: `
# Getting Started with Next.js (For Spring Boot Developers)

## Prerequisites
- Node.js 18+ (like requiring Java 17+ for Spring Boot)
- npm or yarn (like Maven/Gradle for Java)
- Basic React knowledge (optional but helpful)

## Installation

### 1. Create New Project
\`\`\`bash
npx create-next-app@latest my-app
cd my-app
\`\`\`

**Spring Boot Equivalent:**
\`\`\`bash
spring init --dependencies=web,data-jpa,h2 my-app
cd my-app  
\`\`\`

### 2. Project Structure
\`\`\`
my-app/
├── app/                    # Like src/main/java/
│   ├── api/               # API routes (like @RestController)
│   ├── components/        # UI components
│   └── page.tsx          # Pages (like @Controller views)
├── public/               # Static files (like static/)
└── package.json         # Dependencies (like pom.xml)
\`\`\`

### 3. Development Server
\`\`\`bash
npm run dev
\`\`\`

**Spring Boot Equivalent:**
\`\`\`bash
./mvnw spring-boot:run
\`\`\`

## Your First API Route

**Spring Boot Controller:**
\`\`\`java
@RestController  
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }
}
\`\`\`

**Next.js API Route:**
\`\`\`typescript
// app/api/hello/route.ts
export async function GET() {
    return Response.json({ message: "Hello from Next.js!" });
}
\`\`\`

## Your First Page

**Spring Boot (Thymeleaf):**
\`\`\`java
@Controller
public class HomeController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome!");
        return "index";
    }
}
\`\`\`

**Next.js Page:**
\`\`\`typescript  
// app/page.tsx
export default function Home() {
    return (
        <div>
            <h1>Welcome to Next.js!</h1>
        </div>
    );
}
\`\`\`

## Database Integration

**Spring Boot (JPA):**
\`\`\`java
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String email;
    // getters/setters
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {}
\`\`\`

**Next.js (Prisma):**
\`\`\`typescript
// schema.prisma
model User {
    id    Int    @id @default(autoincrement())
    email String @unique
}

// In API route
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany();
    return Response.json(users);
}
\`\`\`

## Next Steps
1. Add database integration
2. Implement authentication  
3. Create your first API endpoints
4. Build your UI components
5. Deploy to production
      `
    },
    'authentication': {
      slug: 'authentication',
      title: 'Authentication & Security',
      description: 'Secure your Next.js application like Spring Boot',
      category: 'Security',
      lastUpdated: '2024-02-25',
      content: `
# Authentication & Security

## JWT Authentication (Like Spring Security)

### Spring Boot Security Setup
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer().jwt();
        return http.build();
    }
}
\`\`\`

### Next.js Authentication with NextAuth.js
\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                // Verify credentials (like UserDetailsService)
                const user = await verifyUser(credentials);
                return user ? { id: user.id, email: user.email } : null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Like creating JWT token in Spring Boot
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Like populating SecurityContext
            session.userId = token.userId;
            return session;
        }
    }
});

export { handler as GET, handler as POST };
\`\`\`

## Protected API Routes

**Spring Boot:**
\`\`\`java
@GetMapping("/api/profile")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<User> getProfile(Authentication auth) {
    String userId = auth.getName();
    User user = userService.findById(userId);
    return ResponseEntity.ok(user);
}
\`\`\`

**Next.js:**
\`\`\`typescript
// app/api/profile/route.ts
import { getServerSession } from 'next-auth';

export async function GET() {
    const session = await getServerSession();
    
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await getUserById(session.userId);
    return Response.json(user);
}
\`\`\`

## Middleware Protection (Like Spring Interceptors)

**Spring Boot Interceptor:**
\`\`\`java
@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) {
        String token = request.getHeader("Authorization");
        return validateToken(token);
    }
}
\`\`\`

**Next.js Middleware:**
\`\`\`typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // Additional logic here
        console.log("Token:", req.nextauth.token);
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Like @PreAuthorize logic
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    return token?.role === 'admin';
                }
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*']
};
\`\`\`

## Environment Variables & Secrets

**Spring Boot (application.properties):**
\`\`\`properties
jwt.secret=\${JWT_SECRET:default-secret}
db.password=\${DB_PASSWORD}
\`\`\`

**Next.js (.env.local):**
\`\`\`
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
\`\`\`

## CORS Configuration

**Spring Boot:**
\`\`\`java
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ApiController { }
\`\`\`

**Next.js (automatic for same-origin, manual for external APIs):**
\`\`\`typescript
export async function GET(request: Request) {
    const response = Response.json({ data: "test" });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
}
\`\`\`
      `
    },
    'deployment-guide': {
      slug: 'deployment-guide',
      title: 'Deployment Guide',
      description: 'Deploy your Next.js app like Spring Boot applications',
      category: 'DevOps',
      lastUpdated: '2024-02-20',
      content: `
# Deployment Guide

## Production Build Process

### Spring Boot Build
\`\`\`bash
# Maven
./mvnw clean package
java -jar target/app.jar

# Gradle  
./gradlew build
java -jar build/libs/app.jar
\`\`\`

### Next.js Build
\`\`\`bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Export static (like building WAR files)
npm run build && npm run export
\`\`\`

## Deployment Options

### 1. Vercel (Recommended - Like Heroku for Spring Boot)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

**Features:**
- Automatic deployments from Git
- Built-in CDN and caching
- Serverless functions for API routes
- Environment variable management

### 2. Docker Deployment (Like Spring Boot Docker)

**Spring Boot Dockerfile:**
\`\`\`dockerfile
FROM openjdk:17-jdk-slim
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

**Next.js Dockerfile:**
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**Docker Compose:**
\`\`\`yaml
version: '3.8'
services:
  nextjs-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - NEXTAUTH_SECRET=your-secret
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
\`\`\`

### 3. AWS Deployment

**AWS Amplify (Managed):**
\`\`\`bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
\`\`\`

**AWS EC2 (Self-managed):**
\`\`\`bash
# On EC2 instance
sudo yum update -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Deploy your app
git clone your-repo
cd your-app
npm install
npm run build
pm2 start npm --name "nextjs-app" -- start
\`\`\`

## Environment Configuration

**Spring Boot Profiles:**
\`\`\`properties
# application-prod.properties
server.port=8080
spring.datasource.url=\${DATABASE_URL}
logging.level.com.yourapp=INFO
\`\`\`

**Next.js Environment:**
\`\`\`bash
# .env.production
DATABASE_URL=postgresql://prod-db/...
NEXTAUTH_SECRET=production-secret
NEXT_PUBLIC_API_URL=https://api.yourapp.com
\`\`\`

## Performance Optimization

### Spring Boot Optimizations
\`\`\`properties
# JVM tuning
-Xms512m -Xmx2g
-XX:+UseG1GC

# Spring Boot properties  
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
server.compression.enabled=true
\`\`\`

### Next.js Optimizations
\`\`\`typescript
// next.config.js
module.exports = {
    // Enable compression
    compress: true,
    
    // Image optimization
    images: {
        domains: ['cdn.example.com'],
        formats: ['image/webp', 'image/avif']
    },
    
    // Bundle analyzer
    webpack: (config, { dev }) => {
        if (!dev) {
            config.optimization.splitChunks.chunks = 'all';
        }
        return config;
    }
};
\`\`\`

## Monitoring & Health Checks

**Spring Boot Actuator:**
\`\`\`properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
\`\`\`

**Next.js Health Check:**
\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
    const health = {
        status: 'UP',
        timestamp: new Date().toISOString(),
        checks: {
            database: await checkDatabase(),
            memory: process.memoryUsage(),
            uptime: process.uptime()
        }
    };
    
    return Response.json(health);
}
\`\`\`

## CI/CD Pipeline

**GitHub Actions (like Jenkins for Spring Boot):**
\`\`\`yaml
name: Deploy Next.js App
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`
      `
    },
    'troubleshooting': {
      slug: 'troubleshooting',
      title: 'Troubleshooting Guide',
      description: 'Common issues and solutions for Spring Boot developers',
      category: 'Support',
      lastUpdated: '2024-02-15',
      content: `
# Troubleshooting Guide

## Common Issues & Solutions

### 1. Build Errors

**Issue:** \`Module not found\` errors
**Spring Boot Equivalent:** \`ClassNotFoundException\`

\`\`\`bash
Error: Module not found: Can't resolve './components/Header'
\`\`\`

**Solutions:**
- Check file path and casing (Next.js is case-sensitive)
- Ensure file extensions (.tsx, .ts, .js, .jsx)
- Verify relative imports: \`./\` for same directory, \`../\` for parent

### 2. API Route Issues

**Issue:** \`404 Not Found\` for API routes
**Spring Boot Equivalent:** \`@RequestMapping\` not found

**Common Causes:**
- Wrong file naming: Use \`route.ts\` not \`index.ts\`
- Incorrect folder structure in \`app/api/\`
- Missing HTTP method exports (\`GET\`, \`POST\`, etc.)

**Correct Structure:**
\`\`\`
app/api/
├── users/
│   └── route.ts          ← exports GET, POST
├── users/[id]/
│   └── route.ts          ← exports GET, PUT, DELETE
\`\`\`

### 3. Environment Variables Not Working

**Issue:** \`process.env.MY_VAR is undefined\`
**Spring Boot Equivalent:** \`@Value\` not injecting properly

**Solutions:**
- Use \`NEXT_PUBLIC_\` prefix for client-side variables
- Restart development server after adding new variables
- Check \`.env.local\` file is in project root

\`\`\`bash
# Server-side only
DATABASE_URL=postgresql://...

# Client-side accessible  
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

### 4. Hydration Mismatches

**Issue:** \`Hydration failed\` errors
**Spring Boot Equivalent:** Template rendering issues

**Common Causes:**
- Server and client rendering different content
- Using \`Date.now()\` or random values
- Conditional rendering based on client-only data

**Solutions:**
\`\`\`typescript
// Bad - different on server/client
const timestamp = Date.now();

// Good - consistent rendering
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return null; // Avoid hydration mismatch
\`\`\`

### 5. Performance Issues

**Issue:** Slow page loads
**Spring Boot Equivalent:** Slow controller responses

**Debugging Steps:**
1. Check Network tab in DevTools
2. Use React Developer Tools Profiler
3. Analyze bundle size with \`@next/bundle-analyzer\`

**Solutions:**
- Implement code splitting with \`dynamic()\`
- Optimize images with Next.js Image component
- Use ISR for static content
- Implement proper caching headers

### 6. Database Connection Issues

**Issue:** Connection timeouts or pool exhaustion
**Spring Boot Equivalent:** \`HikariCP\` connection pool issues

\`\`\`typescript
// Bad - new connection each request
export async function GET() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    // ... query
    await client.end();
}

// Good - connection pooling
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
    const client = await pool.connect();
    try {
        // ... query
    } finally {
        client.release();
    }
}
\`\`\`

## Debugging Tools

### 1. Next.js DevTools
- React Developer Tools (Chrome extension)
- Next.js DevTools (built-in performance metrics)
- Network tab for API calls and timing

### 2. Logging (Like Spring Boot Logback)

**Spring Boot:**
\`\`\`java
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("Processing user: {}", userId);
\`\`\`

**Next.js:**
\`\`\`typescript
// Server-side logging
console.log('Processing user:', userId);

// Production logging with structured logs
import { createLogger } from 'winston';

const logger = createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

export async function GET() {
    logger.info('API request received', { timestamp: new Date() });
}
\`\`\`

### 3. Error Boundaries (Like Spring @ExceptionHandler)

\`\`\`typescript
// error.tsx - Global error handler
'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
            <details>
                <pre>{error.message}</pre>
            </details>
        </div>
    );
}
\`\`\`

## Performance Monitoring

### Metrics Collection (Like Spring Boot Actuator)

\`\`\`typescript
// app/api/metrics/route.ts
export async function GET() {
    const metrics = {
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpu: process.cpuUsage(),
        timestamp: new Date().toISOString()
    };
    
    return Response.json(metrics);
}
\`\`\`

### Integration with APM Tools
- Vercel Analytics (like Spring Boot metrics)
- Sentry for error tracking (like Logback error appenders)
- DataDog or New Relic for performance monitoring

## Getting Help

1. **Official Documentation:** https://nextjs.org/docs
2. **GitHub Discussions:** https://github.com/vercel/next.js/discussions  
3. **Stack Overflow:** Tag questions with \`next.js\`
4. **Discord Community:** Next.js Discord server

**Pro Tip for Spring Boot Developers:**
Think of Next.js issues like Spring Boot issues - check configuration first, 
then dependencies, then code logic. The debugging approach is very similar!
      `
    }
  };
  
  return docs[section] || docs['getting-started'];
}

// DOCUMENTATION PAGE COMPONENT - Pre-rendered at BUILD TIME
export default async function DocumentationPage({ 
  params 
}: { 
  params: { section: string } 
}) {
  // This data is fetched at BUILD TIME, not request time
  // Like generating API docs during Maven build
  const doc = await getDocumentationSection(params.section);
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* DOCUMENTATION HEADER */}
      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>{doc.category}</span>
          <span>•</span>
          <span>Last updated: {doc.lastUpdated}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
        <p className="text-lg text-gray-600">{doc.description}</p>
      </header>

      {/* STATIC GENERATION INFO */}
      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-purple-900">
          📚 This Documentation is Statically Generated!
        </h2>
        <p className="text-sm text-purple-800">
          This documentation page was pre-rendered at <strong>build time</strong>, just like 
          generating API documentation with Swagger Maven plugin in Spring Boot. Perfect for 
          documentation sites that need fast loading and SEO optimization!
        </p>
      </div>

      {/* DOCUMENTATION CONTENT */}
      <article className="prose prose-lg max-w-none">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: doc.content.replace(/\n/g, '<br/>') }}
        />
      </article>

      {/* SPRING BOOT COMPARISON */}
      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Documentation Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Documentation Generation</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`<!-- Swagger Maven Plugin -->
<plugin>
    <groupId>io.swagger.codegen.v3</groupId>
    <artifactId>swagger-codegen-maven-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>openapi.yaml</inputSpec>
                <language>html2</language>
                <output>target/docs</output>
            </configuration>
        </execution>
    </executions>
</plugin>

<!-- Result: Static HTML docs -->`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Static Documentation</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// Generate static doc pages
export async function generateStaticParams() {
    const sections = await getDocumentationSections();
    return sections.map(section => ({ 
        section 
    }));
}

// Build command
npm run build

// Result: Static HTML files for each doc section`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Same approach:</strong> Both generate comprehensive documentation at build time, 
            ensuring fast loading and excellent SEO for documentation websites!
          </p>
        </div>
      </div>

      {/* SECTION NAVIGATION */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Other Documentation Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['getting-started', 'api-reference', 'authentication', 'deployment-guide', 'troubleshooting'].map(sectionSlug => (
            <a
              key={sectionSlug}
              href={`/docs/${sectionSlug}`}
              className={`p-4 rounded-lg border transition-colors ${
                sectionSlug === params.section
                  ? 'bg-purple-100 border-purple-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-sm">
                {sectionSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}