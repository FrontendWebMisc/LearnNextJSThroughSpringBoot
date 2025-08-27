// DASHBOARD ANALYTICS PAGE
// This page also uses the dashboard layout (inherited from parent layout.tsx)

export default function AnalyticsPage() {
  return (
    <div>
      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📈 Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Detailed analytics and performance metrics
        </p>
      </header>

      {/* ANALYTICS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">+34% growth this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
          <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">💹</div>
              <p className="text-gray-600">Revenue chart would go here</p>
              <p className="text-sm text-gray-500">$12.5K this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">Page Views</h3>
          <p className="text-3xl font-bold text-blue-600">125,847</p>
          <p className="text-sm text-green-600">↗ +12.5% from last week</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">Bounce Rate</h3>
          <p className="text-3xl font-bold text-orange-600">32.4%</p>
          <p className="text-sm text-red-600">↘ +2.1% from last week</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">Conversion</h3>
          <p className="text-3xl font-bold text-green-600">4.2%</p>
          <p className="text-sm text-green-600">↗ +0.8% from last week</p>
        </div>
      </div>

      {/* TOP PAGES */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">🏆 Top Performing Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2 font-medium text-gray-700">Page</th>
                <th className="pb-2 font-medium text-gray-700">Views</th>
                <th className="pb-2 font-medium text-gray-700">Unique Visitors</th>
                <th className="pb-2 font-medium text-gray-700">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">🏠</span>
                    <span>/dashboard</span>
                  </div>
                </td>
                <td className="py-3">45,230</td>
                <td className="py-3">38,920</td>
                <td className="py-3">2m 34s</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">📊</span>
                    <span>/dashboard/analytics</span>
                  </div>
                </td>
                <td className="py-3">23,450</td>
                <td className="py-3">19,870</td>
                <td className="py-3">4m 12s</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">👤</span>
                    <span>/users/123</span>
                  </div>
                </td>
                <td className="py-3">18,760</td>
                <td className="py-3">16,230</td>
                <td className="py-3">1m 45s</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">⚙️</span>
                    <span>/dashboard/settings</span>
                  </div>
                </td>
                <td className="py-3">12,340</td>
                <td className="py-3">10,890</td>
                <td className="py-3">3m 22s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* LAYOUT DEMONSTRATION */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          🔍 Layout Inheritance in Action
        </h2>
        <div className="text-blue-800 space-y-2">
          <p>This Analytics page inherits the dashboard layout automatically!</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Header and navigation from <code>dashboard/layout.tsx</code></li>
            <li>Sidebar with dashboard navigation</li>
            <li>Consistent styling and structure</li>
            <li>No duplication of layout code</li>
          </ul>
        </div>
        
        <div className="mt-4 flex gap-4">
          <a 
            href="/dashboard" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Overview
          </a>
          <a 
            href="/dashboard/settings" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Visit Settings
          </a>
        </div>
      </div>
    </div>
  );
}