// DASHBOARD OVERVIEW PAGE
// This page uses the dashboard layout defined in layout.tsx

export default function DashboardPage() {
  return (
    <div>
      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome to the dashboard - this page uses the nested layout!
        </p>
      </header>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Users</p>
              <p className="text-3xl font-bold text-blue-900">1,247</p>
            </div>
            <div className="text-blue-500 text-3xl">👥</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Projects</p>
              <p className="text-3xl font-bold text-green-900">89</p>
            </div>
            <div className="text-green-500 text-3xl">🚀</div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Revenue</p>
              <p className="text-3xl font-bold text-purple-900">$47K</p>
            </div>
            <div className="text-purple-500 text-3xl">💰</div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Growth</p>
              <p className="text-3xl font-bold text-orange-900">+23%</p>
            </div>
            <div className="text-orange-500 text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">📋 Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                JD
              </div>
              <div className="flex-1">
                <p className="font-medium">John completed Spring Boot API project</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                JS
              </div>
              <div className="flex-1">
                <p className="font-medium">Jane deployed Next.js application</p>
                <p className="text-sm text-gray-600">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                MJ
              </div>
              <div className="flex-1">
                <p className="font-medium">Mike reviewed pull request</p>
                <p className="text-sm text-gray-600">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">🎯 Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">View Analytics</div>
            </button>
            
            <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <div className="text-2xl mb-2">➕</div>
              <div className="font-medium">New Project</div>
            </button>
            
            <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Team</div>
            </button>
            
            <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Settings</div>
            </button>
          </div>
        </div>
      </div>

      {/* LAYOUT INHERITANCE DEMO */}
      <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-900">
          🏗️ Layout Inheritance Demo
        </h2>
        <p className="text-indigo-800 mb-4">
          Notice how this page automatically inherits the header, sidebar, and overall structure 
          from <code>dashboard/layout.tsx</code> - just like Spring Boot templates!
        </p>
        
        <div className="bg-white p-4 rounded border border-indigo-200">
          <h3 className="font-semibold mb-2">Try navigating to:</h3>
          <div className="flex gap-4 flex-wrap">
            <a 
              href="/dashboard/analytics" 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Analytics Page
            </a>
            <a 
              href="/dashboard/settings" 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Settings Page
            </a>
          </div>
          <p className="text-sm text-indigo-700 mt-2">
            All these pages will share the same layout!
          </p>
        </div>
      </div>
    </div>
  );
}