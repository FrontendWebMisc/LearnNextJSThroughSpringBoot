import Image from "next/image";
import Link from "next/link";

// USER PROFILE TYPES - Like DTOs in Spring Boot
interface UserProfile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  location: string;
  joinedDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

// AVATAR OPTIMIZATION DEMO - Like profile image handling in Spring Boot
export default function UserProfiles() {
  
  // Mock user profiles - would come from your Spring Boot user service
  const userProfiles: UserProfile[] = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Full-Stack Developer",
      bio: "Passionate about Spring Boot and Next.js integration. Building scalable web applications with modern tech stacks.",
      avatarUrl: "/api/placeholder/200/200", // Would be your CDN URL
      coverImageUrl: "/api/placeholder/800/300",
      location: "San Francisco, CA",
      joinedDate: "2022-03-15",
      stats: {
        posts: 42,
        followers: 1247,
        following: 384
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "DevOps Engineer", 
      bio: "Kubernetes enthusiast and Spring Boot expert. Love optimizing application performance and deployment strategies.",
      avatarUrl: "/api/placeholder/200/200",
      coverImageUrl: "/api/placeholder/800/300", 
      location: "Austin, TX",
      joinedDate: "2021-11-08",
      stats: {
        posts: 67,
        followers: 892,
        following: 156
      }
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Frontend Architect",
      bio: "React and Next.js specialist working on enterprise applications. Previously built microservices with Spring Boot.",
      avatarUrl: "/api/placeholder/200/200",
      coverImageUrl: "/api/placeholder/800/300",
      location: "New York, NY", 
      joinedDate: "2023-01-20",
      stats: {
        posts: 28,
        followers: 543,
        following: 298
      }
    },
    {
      id: 4,
      name: "David Kim",
      title: "Backend Developer",
      bio: "Spring Boot and microservices architect. Currently exploring JAMstack with Next.js for better user experiences.",
      avatarUrl: "/api/placeholder/200/200",
      coverImageUrl: "/api/placeholder/800/300",
      location: "Seattle, WA",
      joinedDate: "2022-07-12",
      stats: {
        posts: 91,
        followers: 1834,
        following: 421
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      
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
          User Profiles
        </h1>
        <p className="text-lg text-gray-600">
          Avatar optimization and lazy loading - like user profile images in Spring Boot
        </p>
      </header>

      <main>
        {/* AVATAR OPTIMIZATION EXPLANATION */}
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">👤 Avatar & Profile Image Optimization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Spring Boot User Images:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class UserController {
  
  @GetMapping("/api/user/{id}/avatar")
  public ResponseEntity<byte[]> getUserAvatar(
    @PathVariable Long id,
    @RequestParam(defaultValue = "100") int size
  ) {
    User user = userService.findById(id);
    
    // Manual image processing
    BufferedImage avatar = ImageIO.read(
      new File(user.getAvatarPath())
    );
    
    BufferedImage resized = Scalr.resize(
      avatar, size, size
    );
    
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ImageIO.write(resized, "png", baos);
    
    return ResponseEntity.ok()
      .contentType(MediaType.IMAGE_PNG)
      .body(baos.toByteArray());
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Next.js Image Benefits:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li><strong>Automatic sizing</strong> - No manual Scalr.resize() needed</li>
                <li><strong>Format optimization</strong> - WebP for modern browsers</li>
                <li><strong>Lazy loading</strong> - Avatars load when scrolled into view</li>
                <li><strong>Placeholder support</strong> - Show blur while loading</li>
                <li><strong>CDN caching</strong> - Automatic edge optimization</li>
                <li><strong>Retina support</strong> - High DPI displays handled automatically</li>
              </ul>
            </div>
          </div>
        </div>

        {/* USER PROFILES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {userProfiles.map((user, index) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              
              {/* COVER IMAGE with lazy loading */}
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                <Image
                  src={user.coverImageUrl}
                  alt={`${user.name} cover image`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" // Lazy load cover images
                />
              </div>
              
              {/* PROFILE CONTENT */}
              <div className="relative px-6 pb-6">
                
                {/* AVATAR with priority loading for first profile */}
                <div className="relative -mt-16 mb-4">
                  <div className="inline-block">
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.name} avatar`}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-lg"
                      priority={index === 0} // Priority load for first avatar
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XGMThqWMZhVmMa/fVCjqfMOdl8ePzKhoPeHMOel8WPzKhoPWDMOdl8ePzJwLT"
                    />
                  </div>
                </div>
                
                {/* USER INFO */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-purple-600 font-medium">{user.title}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {user.bio}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      📍 {user.location}
                    </span>
                    <span className="flex items-center gap-1">
                      📅 Joined {new Date(user.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* USER STATS */}
                  <div className="flex justify-between pt-4 border-t">
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{user.stats.posts}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{user.stats.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{user.stats.following}</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                  </div>
                  
                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded font-medium hover:bg-green-700 transition-colors">
                      Follow
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-50 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AVATAR SIZES DEMO */}
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔍 Avatar Size Variations</h2>
          <p className="text-gray-600 mb-6">
            Next.js Image component automatically serves the right size for different use cases:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Different avatar sizes */}
            <div className="text-center">
              <Image
                src="/api/placeholder/200/200"
                alt="Large avatar (120px)"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Large (120px)</p>
              <p className="text-xs text-gray-500">Profile pages</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/api/placeholder/200/200"
                alt="Medium avatar (80px)"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Medium (80px)</p>
              <p className="text-xs text-gray-500">Comments</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/api/placeholder/200/200"
                alt="Small avatar (40px)"
                width={40}
                height={40}
                className="rounded-full mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Small (40px)</p>
              <p className="text-xs text-gray-500">Navigation</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/api/placeholder/200/200"
                alt="Tiny avatar (24px)"
                width={24}
                height={24}
                className="rounded-full mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Tiny (24px)</p>
              <p className="text-xs text-gray-500">Status indicators</p>
            </div>
          </div>
        </div>

        {/* SPRING BOOT INTEGRATION */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔗 Spring Boot Integration</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Your Existing Spring Boot API</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Keep your existing user service
@RestController
public class UserController {
  
  @GetMapping("/api/users")
  public List<UserProfile> getUsers() {
    return userService.findAll();
  }
  
  @GetMapping("/api/users/{id}")
  public UserProfile getUser(@PathVariable Long id) {
    return userService.findById(id);
  }
  
  // No need to change image handling!
  @GetMapping("/api/users/{id}/avatar")
  public String getUserAvatarUrl(@PathVariable Long id) {
    User user = userService.findById(id);
    return user.getAvatarUrl(); // Return URL, not bytes
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Next.js Frontend Integration</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Configure Next.js to use your Spring Boot images
// next.config.js
module.exports = {
  images: {
    domains: [
      'api.yourdomain.com',  // Your Spring Boot server
      'cdn.yourdomain.com'   // Your CDN/S3 bucket
    ],
  }
}

// Use in your React components
export default function UserProfile({ user }) {
  return (
    <Image
      src={user.avatarUrl}  // From your Spring Boot API
      alt={\`\${user.name} avatar\`}
      width={120}
      height={120}
      className="rounded-full"
    />
  );
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-100 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>🚀 Best Practice:</strong> Keep your Spring Boot user service as-is. 
              Just return image URLs instead of bytes, and let Next.js Image component handle 
              the optimization, lazy loading, and caching automatically!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}