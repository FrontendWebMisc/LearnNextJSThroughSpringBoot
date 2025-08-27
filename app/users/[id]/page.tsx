// DYNAMIC ROUTE EXAMPLE - User Profile Page
// This demonstrates dynamic routing like Spring Boot @GetMapping("/users/{id}")

interface UserProfileProps {
  params: {
    id: string;
  };
}

// Simulate user data (like Spring Boot service call)
async function getUserById(id: string) {
  // In real app: database query, API call, etc.
  const users = {
    '123': {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Spring Boot Developer',
      joinDate: '2023-01-15',
      projects: ['E-commerce API', 'Microservices Platform', 'Next.js Migration'],
      skills: ['Spring Boot', 'Java', 'REST APIs', 'Docker', 'Next.js']
    },
    '456': {
      id: '456', 
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Full Stack Developer',
      joinDate: '2023-03-20',
      projects: ['React Dashboard', 'Spring Boot Backend', 'Mobile API'],
      skills: ['React', 'Next.js', 'Spring Boot', 'TypeScript', 'AWS']
    },
    '789': {
      id: '789',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com', 
      role: 'Backend Engineer',
      joinDate: '2022-11-10',
      projects: ['Payment Gateway', 'User Authentication', 'Data Pipeline'],
      skills: ['Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes']
    }
  };

  return users[id as keyof typeof users] || {
    id,
    name: 'User Not Found',
    email: 'N/A',
    role: 'Unknown',
    joinDate: 'N/A',
    projects: [],
    skills: []
  };
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  // Server-side data fetching (like Spring Boot controller)
  const user = await getUserById(params.id);
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* DYNAMIC ROUTE HEADER */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <a href="/users" className="text-blue-600 hover:text-blue-800">
            ← Back to Users
          </a>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          👤 User Profile #{params.id}
        </h1>
        <p className="text-lg text-gray-600">
          Dynamic route example - like Spring Boot @PathVariable
        </p>
      </header>

      {/* DYNAMIC ROUTING EXPLANATION */}
      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-purple-900">
          🔗 Dynamic Route in Action!
        </h2>
        <p className="text-sm text-purple-800">
          The URL <code>/users/{params.id}</code> maps to this file at 
          <code>/app/users/[id]/page.tsx</code> - just like Spring Boot's 
          <code>@GetMapping("/users/{`{id}`}")</code>!
        </p>
      </div>

      {/* USER PROFILE CONTENT */}
      {user.name === 'User Not Found' ? (
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">User Not Found</h2>
          <p className="text-red-600 mb-6">
            No user found with ID: <code>{params.id}</code>
          </p>
          <div className="space-y-2 text-sm text-red-700">
            <p>Try these example user IDs:</p>
            <div className="flex justify-center gap-4">
              <a href="/users/123" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                User 123
              </a>
              <a href="/users/456" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                User 456
              </a>
              <a href="/users/789" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                User 789
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* USER DETAILS */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                <p className="text-xl text-blue-600 mb-2">{user.role}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-semibold">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* SKILLS */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">🔧 Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* PROJECTS */}
            <div>
              <h3 className="text-lg font-semibold mb-3">🚀 Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">{project}</h4>
                    <p className="text-sm text-gray-600">Active project</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROFILE ACTIONS */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">👥 Profile Actions</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Send Message
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                View Projects
              </button>
              <a 
                href={`/users/${params.id}/profile`}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Detailed Profile
              </a>
            </div>
          </div>
        </>
      )}

      {/* SPRING BOOT COMPARISON */}
      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Equivalent</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Controller</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(
        @PathVariable Long id
    ) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfile> getDetailedProfile(
        @PathVariable Long id
    ) {
        // Detailed profile endpoint
        UserProfile profile = userService.getDetailedProfile(id);
        return ResponseEntity.ok(profile);
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js App Router</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// File: app/users/[id]/page.tsx
export default async function UserProfilePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Server-side data fetching
  const user = await getUserById(params.id);
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      {/* User profile UI */}
    </div>
  );
}

// File: app/users/[id]/profile/page.tsx
// Handles /users/{id}/profile route`}
            </pre>
          </div>
        </div>
      </div>

      {/* OTHER USERS */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Try Other User IDs:</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/users/123" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            John (123)
          </a>
          <a href="/users/456" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Jane (456)
          </a>
          <a href="/users/789" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Mike (789)
          </a>
          <a href="/users/999" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Not Found (999)
          </a>
        </div>
      </div>
    </div>
  );
}