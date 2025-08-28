import Link from "next/link";

// DASHBOARD STATISTICS TYPES - Like DTOs in Spring Boot
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    id: number;
    action: string;
    user: string;
    timestamp: string;
  }>;
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    uptime: string;
  };
  lastUpdated: string;
}

// SIMULATED ANALYTICS SERVICE - Like @Service in Spring Boot
async function getDashboardStats(): Promise<DashboardStats> {
  // Simulate database/analytics API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock analytics data - would come from your Spring Boot analytics service
  const stats: DashboardStats = {
    totalUsers: 12847,
    activeUsers: 2456,
    totalRevenue: 89432.50,
    monthlyGrowth: 12.5,
    topProducts: [
      { name: "Wireless Headphones", sales: 342, revenue: 68400.58 },
      { name: "Gaming Laptop", sales: 89, revenue: 115687.11 },
      { name: "Smart Watch", sales: 156, revenue: 46799.44 },
      { name: "4K Webcam", sales: 78, revenue: 15599.22 }
    ],
    recentActivity: [
      { id: 1, action: "New user registration", user: "john.doe@example.com", timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
      { id: 2, action: "Purchase completed", user: "jane.smith@example.com", timestamp: new Date(Date.now() - 12 * 60000).toISOString() },
      { id: 3, action: "Product review submitted", user: "mike.wilson@example.com", timestamp: new Date(Date.now() - 18 * 60000).toISOString() },
      { id: 4, action: "Support ticket created", user: "sarah.brown@example.com", timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
      { id: 5, action: "Newsletter subscription", user: "alex.taylor@example.com", timestamp: new Date(Date.now() - 32 * 60000).toISOString() }
    ],
    systemMetrics: {
      cpuUsage: Math.floor(Math.random() * 30) + 15, // 15-45%
      memoryUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
      diskUsage: Math.floor(Math.random() * 15) + 45, // 45-60%
      uptime: "7 days, 14 hours, 23 minutes"
    },
    lastUpdated: new Date().toISOString()
  };
  
  return stats;
}

// ISR CONFIGURATION - Dashboard stats can be cached briefly for performance
export const revalidate = 120; // Revalidate every 2 minutes (balance performance vs real-time)

// DASHBOARD STATS PAGE - With ISR
export default async function DashboardStatsPage() {
  // This runs at build time AND when cache expires (ISR)
  const stats = await getDashboardStats();
  
  return (
    <div className="max-w-7xl mx-auto p-8">
      
      {/* NAVIGATION */}
      <nav className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* PAGE HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Dashboard Statistics
        </h1>
        <p className="text-lg text-gray-600">
          Real-time analytics with ISR caching - like Spring Boot dashboard with @Cacheable
        </p>
      </header>

      <main>
        {/* ISR INFORMATION BANNER */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">
            📊 Dashboard ISR Strategy
          </h2>
          <div className="text-sm text-indigo-800 space-y-2">
            <p>
              <strong>Cache Strategy:</strong> Dashboard stats cached for 2 minutes (balance between real-time and performance)
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date(stats.lastUpdated).toLocaleString()}
            </p>
            <p>
              <strong>Benefit:</strong> Instant dashboard loads while keeping data reasonably fresh
            </p>
          </div>
        </div>

        {/* KEY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-semibold text-gray-900">+{stats.monthlyGrowth}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* TOP PRODUCTS & RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* TOP PRODUCTS */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🏆 Top Products
            </h2>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-800">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🕒 Recent Activity
            </h2>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SYSTEM METRICS */}
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🖥️ System Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center">
              <div className="mb-2">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{stats.systemMetrics.cpuUsage}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">CPU Usage</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${stats.systemMetrics.cpuUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">{stats.systemMetrics.memoryUsage}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Memory Usage</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${stats.systemMetrics.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2">
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-600">{stats.systemMetrics.diskUsage}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Disk Usage</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${stats.systemMetrics.diskUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">⏱️</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">System Uptime</p>
              <p className="text-xs text-gray-600 mt-2">{stats.systemMetrics.uptime}</p>
            </div>
          </div>
        </div>

        {/* ISR COMPARISON */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">⚡ Dashboard Caching: ISR vs Spring Boot</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Spring Boot Dashboard Caching</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@RestController
public class DashboardController {
  
  @GetMapping("/api/dashboard/stats")
  @Cacheable(value = "dashboardStats")
  public DashboardStats getStats() {
    // Expensive analytics queries
    return analyticsService.aggregateStats();
  }
  
  @PostMapping("/api/dashboard/refresh")
  @CacheEvict(value = "dashboardStats")
  public void refreshCache() {
    // Manual cache refresh
  }
  
  @Scheduled(fixedRate = 120000) // 2 minutes
  @CacheEvict(value = "dashboardStats")
  public void scheduledRefresh() {
    // Automatic cache refresh
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js ISR Dashboard</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// 2-minute cache for dashboard
export const revalidate = 120;

export default async function DashboardStats() {
  // Runs at build + every 2 minutes
  const stats = await getDashboardStats();
  
  return <StatsView stats={stats} />;
}

// Webhook for immediate updates
export async function POST(request) {
  // Trigger immediate revalidation
  revalidatePath('/dashboard/stats');
  
  return Response.json({ revalidated: true });
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-100 p-4 rounded">
            <p className="text-sm text-indigo-800">
              <strong>🚀 Dashboard Advantage:</strong> ISR provides instant dashboard loads from CDN 
              while keeping metrics reasonably fresh. Users get immediate feedback without waiting 
              for expensive analytics queries, and the system handles traffic spikes gracefully.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}