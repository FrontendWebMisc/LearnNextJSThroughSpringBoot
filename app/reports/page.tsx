// STATIC REPORTS DASHBOARD - Generated at BUILD TIME
// This is like generating business reports or analytics dashboards with Spring Boot schedulers

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: 'chart' | 'table' | 'metric';
  data: any;
  lastUpdated: string;
  period: string;
}

// STATIC DATA FETCHING - Runs at BUILD TIME
async function getReportsData(): Promise<ReportData[]> {
  // This simulates fetching analytics data at build time
  // In real app: database aggregation queries, analytics APIs, etc.
  
  return [
    {
      id: 'user-growth',
      title: 'User Growth',
      description: 'Monthly user registration trends',
      type: 'chart',
      lastUpdated: '2024-03-01',
      period: 'Last 6 months',
      data: {
        labels: ['October', 'November', 'December', 'January', 'February', 'March'],
        values: [1250, 1890, 2340, 2100, 2850, 3200]
      }
    },
    {
      id: 'sales-metrics',
      title: 'Sales Performance',
      description: 'Key sales metrics and KPIs',
      type: 'metric',
      lastUpdated: '2024-03-01',
      period: 'Current month',
      data: {
        totalSales: 125840.50,
        ordersCount: 1247,
        averageOrderValue: 100.91,
        conversionRate: 3.2
      }
    },
    {
      id: 'top-products',
      title: 'Top Selling Products',
      description: 'Best performing products this quarter',
      type: 'table',
      lastUpdated: '2024-03-01',
      period: 'Q1 2024',
      data: [
        { rank: 1, name: 'MacBook Pro', sales: 1250, revenue: 2998750 },
        { rank: 2, name: 'iPhone 15 Pro', sales: 2100, revenue: 2099790 },
        { rank: 3, name: 'Spring Boot Book', sales: 892, revenue: 41012 },
        { rank: 4, name: 'Dell Monitor 4K', sales: 645, revenue: 290205 },
        { rank: 5, name: 'Developer T-Shirt', sales: 1580, revenue: 39450 }
      ]
    },
    {
      id: 'api-usage',
      title: 'API Endpoint Usage',
      description: 'Most frequently called API endpoints',
      type: 'table',
      lastUpdated: '2024-03-01',
      period: 'Last 30 days',
      data: [
        { endpoint: '/api/users', calls: 45200, avgResponseTime: 120, errorRate: 0.2 },
        { endpoint: '/api/products', calls: 38100, avgResponseTime: 95, errorRate: 0.1 },
        { endpoint: '/api/auth/login', calls: 12500, avgResponseTime: 340, errorRate: 2.1 },
        { endpoint: '/api/orders', calls: 8750, avgResponseTime: 180, errorRate: 0.5 },
        { endpoint: '/api/catalog/electronics', calls: 6200, avgResponseTime: 65, errorRate: 0.0 }
      ]
    }
  ];
}

// REPORTS DASHBOARD COMPONENT - Pre-rendered at BUILD TIME
export default async function ReportsPage() {
  // This data is fetched at BUILD TIME, not request time  
  // Like generating quarterly reports during Maven build
  const reports = await getReportsData();
  
  return (
    <div className="max-w-7xl mx-auto p-8">
      
      {/* DASHBOARD HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Business Reports Dashboard</h1>
        <p className="text-lg text-gray-600">
          Statically generated business intelligence reports - built at compile time!
        </p>
      </header>

      {/* STATIC GENERATION INFO */}
      <div className="bg-orange-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2 text-orange-900">
          📊 These Reports are Statically Generated!
        </h2>
        <p className="text-sm text-orange-800">
          This dashboard was pre-rendered at <strong>build time</strong>, just like generating 
          quarterly business reports or analytics PDFs with Spring Boot scheduled tasks. 
          Perfect for executive dashboards that don't need real-time updates!
        </p>
      </div>

      {/* REPORTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {reports.map((report) => (
          <div 
            key={report.id}
            className="bg-white rounded-lg shadow-lg p-6 border"
          >
            {/* REPORT HEADER */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">{report.title}</h2>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {report.type.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{report.description}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>📅 {report.period}</span>
                <span>🔄 Updated: {report.lastUpdated}</span>
              </div>
            </div>

            {/* REPORT CONTENT */}
            <div className="report-content">
              {report.type === 'chart' && (
                <div className="h-48">
                  <h3 className="font-semibold mb-3">User Registration Trend</h3>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {report.data.labels.map((label: string, index: number) => (
                      <div key={label} className="flex flex-col items-center flex-1">
                        <div 
                          className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                          style={{ 
                            height: `${(report.data.values[index] / Math.max(...report.data.values)) * 100}%`,
                            minHeight: '4px'
                          }}
                          title={`${label}: ${report.data.values[index].toLocaleString()} users`}
                        />
                        <span className="text-xs mt-2 text-gray-600 transform -rotate-45 origin-left">
                          {label.slice(0, 3)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-2xl font-bold text-green-600">
                      +{((report.data.values[report.data.values.length - 1] / report.data.values[0] - 1) * 100).toFixed(1)}%
                    </span>
                    <span className="text-gray-600 ml-2">growth</span>
                  </div>
                </div>
              )}

              {report.type === 'metric' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">
                      ${report.data.totalSales.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Sales</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">
                      {report.data.ordersCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">
                      ${report.data.averageOrderValue}
                    </div>
                    <div className="text-sm text-gray-600">Avg Order</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded">
                    <div className="text-2xl font-bold text-orange-600">
                      {report.data.conversionRate}%
                    </div>
                    <div className="text-sm text-gray-600">Conversion</div>
                  </div>
                </div>
              )}

              {report.type === 'table' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        {report.id === 'top-products' ? (
                          <>
                            <th className="text-left p-2">Rank</th>
                            <th className="text-left p-2">Product</th>
                            <th className="text-right p-2">Sales</th>
                            <th className="text-right p-2">Revenue</th>
                          </>
                        ) : (
                          <>
                            <th className="text-left p-2">Endpoint</th>
                            <th className="text-right p-2">Calls</th>
                            <th className="text-right p-2">Avg Time</th>
                            <th className="text-right p-2">Error %</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {report.data.map((row: any, index: number) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          {report.id === 'top-products' ? (
                            <>
                              <td className="p-2">#{row.rank}</td>
                              <td className="p-2 font-medium">{row.name}</td>
                              <td className="p-2 text-right">{row.sales.toLocaleString()}</td>
                              <td className="p-2 text-right text-green-600">
                                ${row.revenue.toLocaleString()}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-2 font-mono text-xs">{row.endpoint}</td>
                              <td className="p-2 text-right">{row.calls.toLocaleString()}</td>
                              <td className="p-2 text-right">{row.avgResponseTime}ms</td>
                              <td className={`p-2 text-right ${
                                row.errorRate > 1 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {row.errorRate}%
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Spring Boot Reporting Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Spring Boot Scheduled Reports</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Component
public class ReportGenerator {
    
    @Scheduled(cron = "0 0 6 * * MON") // Every Monday 6 AM
    public void generateWeeklyReports() {
        // Query database for metrics
        List<SalesData> sales = salesRepository
            .findSalesDataForWeek();
            
        // Generate report
        ReportData report = ReportData.builder()
            .title("Weekly Sales Report")
            .data(sales)
            .generatedAt(LocalDateTime.now())
            .build();
            
        // Save as PDF/HTML
        reportService.generateAndSave(report);
        
        // Email to stakeholders
        emailService.sendReport(report, recipients);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void generateStaticDashboard() {
        String dashboard = templateEngine.process(
            "dashboard", getDashboardData()
        );
        Files.write(Paths.get("static/dashboard.html"), 
                   dashboard.getBytes());
    }
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Next.js Static Reports</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// Reports generated at BUILD TIME
export default async function ReportsPage() {
    // Fetch data during build (like @Scheduled task)
    const salesData = await db.sales.aggregate({
        _sum: { amount: true },
        _count: { orderId: true },
        groupBy: { month: true }
    });
    
    const userGrowth = await db.users.groupBy({
        by: ['createdAt'],
        _count: true
    });
    
    // Pre-rendered dashboard components
    return (
        <Dashboard>
            <SalesChart data={salesData} />
            <UserGrowthMetrics data={userGrowth} />
            <TopProductsTable />
        </Dashboard>
    );
}

// Build command generates static HTML
// npm run build
// Result: Fast-loading dashboard with no server processing`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Key advantage:</strong> Next.js static reports load instantly and can be cached 
            globally, while Spring Boot scheduled reports provide real-time data updates. 
            Choose based on your freshness vs performance requirements!
          </p>
        </div>
      </div>

      {/* REFRESH INFO */}
      <div className="mt-8 text-center">
        <div className="bg-gray-50 p-4 rounded-lg inline-block">
          <p className="text-sm text-gray-600 mb-2">
            📅 <strong>Report Generation:</strong> These reports are generated during the build process
          </p>
          <p className="text-xs text-gray-500">
            To update data, trigger a new build or implement ISR (Incremental Static Regeneration)
          </p>
        </div>
      </div>
    </div>
  );
}