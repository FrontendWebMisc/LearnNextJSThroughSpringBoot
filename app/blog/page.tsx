import Link from "next/link";
import fs from 'fs';
import path from 'path';

// BLOG POST TYPE
interface BlogPost {
  slug: string;
  title: string;
  publishedDate: string;
  author: string;
  readingTime: string;
  excerpt: string;
  content: string;
}

// SERVER-SIDE FILE SYSTEM ACCESS
// This function can ONLY run on the server (like reading application.properties in Spring Boot)
// Similar to @Value("classpath:content/") in Spring Boot
async function getBlogPostsFromFileSystem(): Promise<BlogPost[]> {
  
  // ACCESS FILE SYSTEM - This only works on SERVER
  // In Spring Boot: @Value("${blog.content.path}") or ResourceLoader
  const contentDirectory = path.join(process.cwd(), 'content');
  
  try {
    // READ DIRECTORY - like Files.list() in Java
    const filenames = fs.readdirSync(contentDirectory);
    const markdownFiles = filenames.filter(name => name.endsWith('.md'));
    
    // PROCESS EACH FILE - like processing each .properties file
    const posts = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(contentDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // EXTRACT METADATA from markdown (like parsing YAML frontmatter)
        const lines = fileContent.split('\n');
        const titleMatch = lines.find(line => line.startsWith('# '))?.replace('# ', '') || 'Untitled';
        const metaLine = lines.find(line => line.startsWith('*Published:')) || '';
        
        // PARSE METADATA (like parsing configuration properties)
        const publishedMatch = metaLine.match(/Published: ([^|]+)/);
        const authorMatch = metaLine.match(/Author: ([^|]+)/);
        const readingTimeMatch = metaLine.match(/Reading Time: ([^*]+)/);
        
        // GENERATE EXCERPT (first paragraph of content)
        const contentStart = lines.findIndex(line => line.trim() === '') + 1;
        const excerpt = lines.slice(contentStart, contentStart + 3).join(' ').substring(0, 200) + '...';
        
        return {
          slug: filename.replace('.md', ''),
          title: titleMatch,
          publishedDate: publishedMatch?.[1]?.trim() || 'Unknown',
          author: authorMatch?.[1]?.trim() || 'Anonymous',
          readingTime: readingTimeMatch?.[1]?.trim() || '5 min',
          excerpt,
          content: fileContent
        };
      })
    );
    
    // SORT BY DATE (like ORDER BY in SQL)
    return posts.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// BLOG PAGE - SERVER COMPONENT
// Equivalent to Spring Boot controller that reads configuration files
export default async function BlogPage() {
  
  // SERVER-SIDE FILE READING
  // This happens on the server, just like reading application.yml in Spring Boot
  const blogPosts = await getBlogPostsFromFileSystem();
  
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

      {/* PAGE HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Blog Posts
        </h1>
        <p className="text-lg text-gray-600">
          Server Component reading markdown files - like @Value configuration loading
        </p>
      </header>

      <main>
        {/* FILE SYSTEM ACCESS EXPLANATION */}
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">📁 File System Access Concept</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">What this component does:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Reads files from disk</strong> - like ResourceLoader in Spring Boot</li>
                <li><strong>Processes markdown content</strong> - like parsing configuration files</li>
                <li><strong>Extracts metadata</strong> - like reading YAML frontmatter</li>
                <li><strong>Only runs on server</strong> - client never sees file system operations</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Spring Boot Equivalent:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Value("classpath:content/")
private Resource contentDir;

@GetMapping("/blog")  
public String blog(Model model) {
  try {
    Resource[] files = resolver
      .getResources("classpath:content/*.md");
    
    List<BlogPost> posts = Arrays.stream(files)
      .map(this::parseMarkdown)
      .collect(toList());
      
    model.addAttribute("posts", posts);
    return "blog";
  } catch (IOException e) {
    // handle error
  }
}`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Next.js Server Component:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`import fs from 'fs';
import path from 'path';

export default async function BlogPage() {
  // Direct file system access
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter(f => f.endsWith('.md'))
    .map(f => parseMarkdown(f));
    
  return (
    <div>
      {posts.map(post => 
        <PostCard key={post.slug} post={post} />
      )}
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* BLOG POSTS LIST */}
        <div className="space-y-6">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found</p>
              <p className="text-gray-400 text-sm mt-2">
                Blog posts should be in the /content directory as .md files
              </p>
            </div>
          ) : (
            blogPosts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow"
              >
                <header className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      📅 {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      👤 {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {post.readingTime}
                    </span>
                  </div>
                </header>
                
                <div className="mb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                <footer className="pt-4 border-t">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Read Full Article →
                  </button>
                </footer>
              </article>
            ))
          )}
        </div>

        {/* FILE STRUCTURE INFO */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">📂 File Structure</h2>
          
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">Current Project Structure:</h3>
            <pre className="text-sm text-gray-700">
{`LearnNextJSThroughSpringBoot/
├── app/
│   ├── blog/
│   │   └── page.tsx          ← This Server Component
│   └── ...
├── content/                  ← Blog posts directory
│   ├── post1.md             ← Read by Server Component
│   ├── post2.md             ← File system access
│   └── post3.md             ← Only works on server
└── ...`}
            </pre>
          </div>
          
          <div className="mt-4 bg-blue-100 p-3 rounded">
            <p className="text-sm text-blue-800">
              <strong>🔒 Security Note:</strong> File system operations only happen on the server. 
              The client never has direct access to your files, just like in Spring Boot where 
              the browser can't access your application.properties file directly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}