// NESTED LAYOUT EXAMPLE - Dashboard Layout
// This demonstrates nested layouts like Spring Boot base templates

import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* DASHBOARD HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                📊 Dashboard
              </h1>
              <span className="text-sm text-gray-500">
                Nested Layout Example
              </span>
            </div>
            
            <nav className="flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                About
              </a>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                U
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Navigation
              </h2>
              
              <nav className="space-y-2">
                <a 
                  href="/dashboard" 
                  className="block px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700"
                >
                  📊 Overview
                </a>
                <a 
                  href="/dashboard/analytics" 
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  📈 Analytics
                </a>
                <a 
                  href="/dashboard/settings" 
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  ⚙️ Settings
                </a>
              </nav>

              {/* LAYOUT EXPLANATION */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📁 Layout Structure
                </h3>
                <div className="text-xs text-blue-800">
                  <p className="mb-2">This sidebar and header are shared across all dashboard pages!</p>
                  <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
                    app/dashboard/layout.tsx
                  </code>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow">
              
              {/* NESTED LAYOUT INFO */}
              <div className="p-6 border-b bg-yellow-50">
                <h2 className="text-lg font-semibold mb-2 text-yellow-900">
                  🏗️ Nested Layout in Action
                </h2>
                <p className="text-sm text-yellow-800">
                  This layout wraps all pages under <code>/dashboard/*</code> - 
                  just like Spring Boot base templates that provide common header/sidebar!
                </p>
              </div>

              {/* PAGE CONTENT GOES HERE */}
              <div className="p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Template Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Spring Boot Base Template</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`<!-- base-template.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <!-- Common header -->
    <header th:replace="fragments/header"></header>
    
    <!-- Common sidebar -->
    <aside th:replace="fragments/sidebar"></aside>
    
    <!-- Page content -->
    <main>
        <div th:replace="\${content}"></div>
    </main>
</body>
</html>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js Layout Component</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({ 
  children 
}: {
  children: ReactNode
}) {
  return (
    <div>
      {/* Common header */}
      <Header />
      
      {/* Common sidebar */}
      <Sidebar />
      
      {/* Page content */}
      <main>
        {children}
      </main>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Same concept:</strong> Both provide a common layout that wraps multiple pages, 
              reducing duplication and maintaining consistent UI across related pages!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}