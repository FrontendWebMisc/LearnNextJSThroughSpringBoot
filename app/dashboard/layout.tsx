import Link from "next/link";

// DASHBOARD LAYOUT COMPONENT
// This is similar to a base template in Spring Boot (like Thymeleaf fragments)
// This layout wraps all pages in the /dashboard route and its subdirectories
// Think of it like a common template that all dashboard pages inherit

interface DashboardLayoutProps {
  children: React.ReactNode; // The actual page content will be injected here
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* DASHBOARD HEADER - Common to all dashboard pages */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        
        {/* SIDEBAR NAVIGATION - Common to all dashboard pages */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="mt-8">
            <div className="px-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Navigation
              </h2>
            </div>
            
            <div className="mt-4 space-y-1">
              <Link
                href="/dashboard"
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                📊 Overview
              </Link>
              
              <Link
                href="/dashboard/analytics"
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                📈 Analytics
              </Link>
              
              <Link
                href="/dashboard/settings"
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                ⚙️ Settings
              </Link>
            </div>
          </nav>
          
          {/* SPRING BOOT COMPARISON IN SIDEBAR */}
          <div className="mt-8 px-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                💡 Spring Boot Equivalent
              </h3>
              <p className="text-xs text-blue-800">
                This layout is like a Thymeleaf fragment that wraps multiple pages:
              </p>
              <pre className="text-xs mt-2 text-blue-700">
{`<!-- layout.html -->
<div th:fragment="layout">
  <header>...</header>
  <div th:insert="\${content}">
    <!-- page content here -->
  </div>
</div>`}
              </pre>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* 
              CHILDREN PROP - This is where the actual page content gets rendered
              In Spring Boot, this would be where your template content gets injected
              Each page.tsx in the dashboard folder will appear here
            */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}