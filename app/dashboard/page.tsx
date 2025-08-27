// DASHBOARD OVERVIEW PAGE
// This page will be wrapped by the dashboard layout automatically
// Equivalent to a Spring Boot controller method that returns a dashboard template
export default function DashboardPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your dashboard - this page uses a nested layout!
        </p>
      </div>

      {/* LAYOUT EXPLANATION */}
      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-900">
          📱 Nested Layout Concept
        </h2>
        <div className="space-y-4 text-indigo-800">
          <p>
            <strong>Notice how this page has:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>A dashboard header (from layout.tsx)</li>
            <li>A sidebar navigation (from layout.tsx)</li>
            <li>This content area (from page.tsx)</li>
          </ul>
          
          <div className="bg-white p-4 rounded border border-indigo-200 mt-4">
            <p className="font-semibold mb-2">File structure:</p>
            <pre className="text-sm text-indigo-700">
{`app/
  dashboard/
    layout.tsx    ← Wraps all dashboard pages
    page.tsx      ← This file (dashboard overview)
    analytics/
      page.tsx    ← Also wrapped by dashboard layout
    settings/
      page.tsx    ← Also wrapped by dashboard layout`}
            </pre>
          </div>
        </div>
      </div>

      {/* SAMPLE DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">2,543</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">$45,231</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">Orders</h3>
              <p className="text-2xl font-bold text-gray-900">1,423</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Template Inheritance</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Thymeleaf</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`<!-- dashboard-base.html -->
<div th:fragment="dashboard-layout">
  <header>Dashboard Header</header>
  <nav>Sidebar</nav>
  <main>
    <div th:insert="\${content}"></div>
  </main>
</div>

<!-- dashboard.html -->
<div th:replace="dashboard-base :: dashboard-layout">
  <div th:fragment="content">
    <h1>Dashboard Overview</h1>
    <!-- This content -->
  </div>
</div>`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Nested Layout</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <header>Dashboard Header</header>
      <nav>Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}

// dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      {/* This content automatically wrapped */}
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}