// DASHBOARD ANALYTICS PAGE
// This page automatically inherits the dashboard layout from ../layout.tsx
export default function AnalyticsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          View your performance metrics and insights
        </p>
      </div>

      {/* Sample Analytics Content */}
      <div className="space-y-6">
        
        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
          <div className="h-64 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
            <p className="text-blue-600 font-medium">📊 Chart would go here</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold">Page Views</h3>
            <p className="text-2xl font-bold text-green-600">45,231</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold">Unique Users</h3>
            <p className="text-2xl font-bold text-blue-600">12,432</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <h3 className="font-semibold">Avg. Session</h3>
            <p className="text-2xl font-bold text-purple-600">4:23</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold">Mobile Users</h3>
            <p className="text-2xl font-bold text-orange-600">68%</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Layout Inheritance:</strong> Notice how this page automatically has the dashboard header and sidebar, 
            even though this component only defines the content area. This is the power of nested layouts!
          </p>
        </div>
      </div>
    </>
  );
}