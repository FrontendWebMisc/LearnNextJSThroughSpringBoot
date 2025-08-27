// DASHBOARD SETTINGS PAGE
// Another page that inherits the dashboard layout

export default function SettingsPage() {
  return (
    <div>
      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ⚙️ Dashboard Settings
        </h1>
        <p className="text-gray-600">
          Configure your dashboard preferences and account settings
        </p>
      </header>

      {/* SETTINGS SECTIONS */}
      <div className="space-y-8">
        
        {/* PROFILE SETTINGS */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">👤 Profile Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Spring Boot Developer</option>
                <option>Full Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>PST (UTC-8)</option>
                <option>EST (UTC-5)</option>
                <option>GMT (UTC+0)</option>
                <option>CET (UTC+1)</option>
              </select>
            </div>
          </div>
        </div>

        {/* DASHBOARD PREFERENCES */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📊 Dashboard Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Auto Refresh</h3>
                <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive email updates about your dashboard</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* WIDGET CONFIGURATION */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📱 Widget Configuration</h2>
          <p className="text-gray-600 mb-4">Customize which widgets appear on your dashboard</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">User Stats</h3>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Display user growth metrics</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Revenue Chart</h3>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Show revenue trends</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Recent Activity</h3>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Latest user activities</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Project Status</h3>
                <input type="checkbox" className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Current project statuses</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Analytics</h3>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Detailed analytics data</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Team Activity</h3>
                <input type="checkbox" className="rounded" />
              </div>
              <p className="text-sm text-gray-600">Team member activities</p>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>

      {/* LAYOUT DEMONSTRATION */}
      <div className="mt-12 bg-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">
          🏗️ Shared Layout Benefits
        </h2>
        <div className="text-purple-800 space-y-3">
          <p>This Settings page shares the same layout as other dashboard pages:</p>
          <div className="bg-white p-4 rounded border border-purple-200">
            <h3 className="font-semibold mb-2">Layout Features Shared:</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Common header with dashboard title</li>
              <li>Navigation sidebar with dashboard links</li>
              <li>Consistent spacing and styling</li>
              <li>Responsive layout structure</li>
            </ul>
          </div>
          
          <p className="text-sm">
            Just like Spring Boot templates, this reduces code duplication and ensures 
            consistent UI across all dashboard pages!
          </p>
        </div>
        
        <div className="mt-4 flex gap-4">
          <a 
            href="/dashboard" 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Dashboard Home
          </a>
          <a 
            href="/dashboard/analytics" 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            View Analytics
          </a>
        </div>
      </div>
    </div>
  );
}