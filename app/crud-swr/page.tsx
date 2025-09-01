import ServerUserManager from '../components/ServerUserManager'
import ClientUserManager from '../components/ClientUserManager'
import SWRProvider from '../components/SWRProvider'

export default function CrudSwrPage() {
  return (
    <SWRProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              CRUD Operations with SWR Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This page demonstrates CRUD operations using SWR (Stale-While-Revalidate) 
              data fetching library with comprehensive error handling, optimistic updates, 
              and advanced caching strategies.
            </p>
          </div>

          <div className="space-y-8">
            <ServerUserManager />
            <ClientUserManager />
          </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features Demonstrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Server-Side Component</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Data fetched during server-side rendering (SSR)</li>
                <li>• Better SEO and initial page load performance</li>
                <li>• Uses Next.js Server Components</li>
                <li>• Suspense boundary for loading states</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Client-Side Component with SWR</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Real-time data fetching and mutations</li>
                <li>• Automatic revalidation and caching</li>
                <li>• Optimistic UI updates</li>
                <li>• Full CRUD operations (Create, Read, Update, Delete)</li>
                <li>• Background refresh every 5 seconds</li>
                <li>• Focus revalidation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">SWR Benefits</h2>
          <p className="text-yellow-700 text-sm">
            SWR provides automatic caching, revalidation, focus tracking, refetch on interval, 
            and many more features out of the box. It's perfect for building fast, responsive 
            user interfaces that stay in sync with your data.
          </p>
        </div>
      </div>
    </div>
  )
}