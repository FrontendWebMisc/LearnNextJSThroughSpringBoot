// DASHBOARD SETTINGS PAGE  
// Another page that inherits the dashboard layout
export default function SettingsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your dashboard preferences
        </p>
      </div>

      {/* Settings Form */}
      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Email notifications
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  SMS notifications
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>

        <div className="mt-6 bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Notice:</strong> This page, analytics page, and dashboard overview all share the same layout 
            (header + sidebar) but have different content. In Spring Boot, this would be like having multiple 
            controller methods that all use the same base template.
          </p>
        </div>
      </div>
    </>
  );
}