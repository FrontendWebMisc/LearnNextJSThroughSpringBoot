// NESTED DYNAMIC ROUTE - Detailed User Profile
// This demonstrates nested routing like Spring Boot @GetMapping("/users/{id}/profile")

interface DetailedProfileProps {
  params: {
    id: string;
  };
}

async function getUserDetailedProfile(id: string) {
  const profiles = {
    '123': {
      basicInfo: {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Spring Boot Developer'
      },
      detailedInfo: {
        bio: 'Experienced Spring Boot developer transitioning to full-stack development with Next.js. Passionate about clean code and API design.',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
        languages: ['English', 'Spanish'],
        experience: '5 years',
        education: 'Computer Science, Stanford University',
        certifications: ['Oracle Java Certified', 'AWS Solutions Architect'],
        socialLinks: {
          linkedin: 'linkedin.com/in/johndoe',
          github: 'github.com/johndoe',
          twitter: '@johndoe_dev'
        }
      },
      statistics: {
        projectsCompleted: 27,
        linesOfCode: 125000,
        commitsThisYear: 847,
        pullRequestsReviewed: 234
      }
    },
    '456': {
      basicInfo: {
        id: '456',
        name: 'Jane Smith', 
        email: 'jane.smith@example.com',
        role: 'Full Stack Developer'
      },
      detailedInfo: {
        bio: 'Full-stack developer with expertise in React, Next.js, and Spring Boot. Love building scalable web applications.',
        location: 'Austin, TX',
        timezone: 'CST (UTC-6)',
        languages: ['English', 'French'],
        experience: '3 years',
        education: 'Software Engineering, UT Austin',
        certifications: ['React Developer', 'Spring Professional'],
        socialLinks: {
          linkedin: 'linkedin.com/in/janesmith',
          github: 'github.com/janesmith',
          twitter: '@jane_codes'
        }
      },
      statistics: {
        projectsCompleted: 18,
        linesOfCode: 89000,
        commitsThisYear: 592,
        pullRequestsReviewed: 156
      }
    }
  };

  return profiles[id as keyof typeof profiles] || null;
}

export default async function DetailedProfilePage({ params }: DetailedProfileProps) {
  const profile = await getUserDetailedProfile(params.id);
  
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Profile Not Found</h1>
          <p className="text-red-600 mb-6">
            No detailed profile available for user ID: <code>{params.id}</code>
          </p>
          <a href={`/users/${params.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Basic Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      
      {/* BREADCRUMB NAVIGATION */}
      <nav className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>→</span>
          <a href={`/users/${params.id}`} className="hover:text-blue-600">User {params.id}</a>
          <span>→</span>
          <span className="text-gray-900 font-medium">Detailed Profile</span>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          📋 Detailed Profile - {profile.basicInfo.name}
        </h1>
        <p className="text-lg text-gray-600">
          Nested route example: <code>/users/{params.id}/profile</code>
        </p>
      </header>

      {/* NESTED ROUTE EXPLANATION */}
      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-indigo-900">
          🗂️ Nested Dynamic Route Structure
        </h2>
        <div className="text-sm text-indigo-800">
          <p className="mb-2">File: <code>app/users/[id]/profile/page.tsx</code></p>
          <p>URL: <code>/users/{params.id}/profile</code></p>
          <p>Spring Boot: <code>@GetMapping("/users/{`{id}`}/profile")</code></p>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN PROFILE INFO */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* BASIC INFO CARD */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">👤 Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Personal Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {profile.basicInfo.name}</p>
                  <p><span className="font-medium">Email:</span> {profile.basicInfo.email}</p>
                  <p><span className="font-medium">Role:</span> {profile.basicInfo.role}</p>
                  <p><span className="font-medium">Location:</span> {profile.detailedInfo.location}</p>
                  <p><span className="font-medium">Timezone:</span> {profile.detailedInfo.timezone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Professional Info</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Experience:</span> {profile.detailedInfo.experience}</p>
                  <p><span className="font-medium">Education:</span> {profile.detailedInfo.education}</p>
                  <p><span className="font-medium">Languages:</span> {profile.detailedInfo.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BIO SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">📝 Biography</h2>
            <p className="text-gray-700 leading-relaxed">{profile.detailedInfo.bio}</p>
          </div>

          {/* CERTIFICATIONS */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.detailedInfo.certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-2xl">🏅</span>
                    <div>
                      <h3 className="font-semibold text-green-800">{cert}</h3>
                      <p className="text-sm text-green-600">Verified Certification</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🔗 Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href={`https://${profile.detailedInfo.socialLinks.linkedin}`} 
                 className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 text-xl">💼</span>
                  <div>
                    <h3 className="font-semibold text-blue-800">LinkedIn</h3>
                    <p className="text-xs text-blue-600">Professional network</p>
                  </div>
                </div>
              </a>
              
              <a href={`https://${profile.detailedInfo.socialLinks.github}`}
                 className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-gray-800 text-xl">💻</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">GitHub</h3>
                    <p className="text-xs text-gray-600">Code repositories</p>
                  </div>
                </div>
              </a>
              
              <a href={`https://twitter.com/${profile.detailedInfo.socialLinks.twitter.replace('@', '')}`}
                 className="p-4 bg-sky-50 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sky-600 text-xl">🐦</span>
                  <div>
                    <h3 className="font-semibold text-sky-800">Twitter</h3>
                    <p className="text-xs text-sky-600">Tech updates</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* SIDEBAR - STATISTICS */}
        <div className="space-y-8">
          
          {/* STATS CARD */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">📊 Statistics</h2>
            <div className="space-y-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {profile.statistics.projectsCompleted}
                </div>
                <div className="text-sm text-blue-800">Projects Completed</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {profile.statistics.linesOfCode.toLocaleString()}
                </div>
                <div className="text-sm text-green-800">Lines of Code</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {profile.statistics.commitsThisYear}
                </div>
                <div className="text-sm text-purple-800">Commits This Year</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">
                  {profile.statistics.pullRequestsReviewed}
                </div>
                <div className="text-sm text-orange-800">PRs Reviewed</div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Send Message
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                View Projects
              </button>
              <a 
                href={`/users/${params.id}`}
                className="block w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors text-center"
              >
                Basic Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Nested Route Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Controller</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/users")
public class UserController {
    
    // Basic profile: /users/{id}
    @GetMapping("/{id}")
    public User getBasicProfile(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // Detailed profile: /users/{id}/profile
    @GetMapping("/{id}/profile")
    public UserProfile getDetailedProfile(
        @PathVariable Long id
    ) {
        return userService.getDetailedProfile(id);
    }
    
    // Settings: /users/{id}/settings
    @GetMapping("/{id}/settings")
    public UserSettings getSettings(@PathVariable Long id) {
        return userService.getSettings(id);
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js File Structure</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`app/
└── users/
    └── [id]/
        ├── page.tsx           // /users/{id}
        ├── profile/
        │   └── page.tsx       // /users/{id}/profile (this file)
        └── settings/
            └── page.tsx       // /users/{id}/settings
            
// Automatic route generation based on folder structure!
// No need to manually configure routes like Spring Boot`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}