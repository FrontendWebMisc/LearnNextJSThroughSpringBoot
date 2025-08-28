import Link from "next/link";

// REPORT TYPES - Like DTOs in Spring Boot
interface ReportData {
  id: string;
  title: string;
  description: string;
  category: string;
  period: string;
  lastUpdated: string;
  summary: {
    totalRecords: number;
    keyMetric: string;
    keyValue: number;
    trend: 'up' | 'down' | 'stable';
    trendPercent: number;
  };
  chartData?: {
    labels: string[];
    values: number[];
    type: 'line' | 'bar' | 'pie';
  };
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  metrics?: Array<{
    label: string;
    value: string;
    change: string;
    positive: boolean;
  }>;
}

// SIMULATED REPORTS SERVICE - Like @Service with business logic
async function getReportById(reportId: string): Promise<ReportData> {
  // Simulate data aggregation delay (like complex business queries)
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock reports data - would come from analytics database
  const reports: Record<string, ReportData> = {
    'sales-2024': {
      id: 'sales-2024',
      title: '2024 Sales Performance Report',
      description: 'Comprehensive analysis of sales performance, revenue trends, and customer metrics for 2024',
      category: 'Sales',
      period: 'January - March 2024',
      lastUpdated: '2024-03-01T00:00:00Z',
      summary: {
        totalRecords: 12847,
        keyMetric: 'Total Revenue',
        keyValue: 2847392.50,
        trend: 'up',
        trendPercent: 23.5
      },
      chartData: {
        labels: ['January', 'February', 'March'],
        values: [892450.25, 978230.75, 976711.50],
        type: 'bar'
      },
      metrics: [
        { label: 'Total Revenue', value: '$2,847,392.50', change: '+23.5%', positive: true },
        { label: 'Orders Count', value: '12,847', change: '+18.2%', positive: true },
        { label: 'Average Order Value', value: '$221.58', change: '+4.3%', positive: true },
        { label: 'Customer Retention', value: '78.5%', change: '-2.1%', positive: false }
      ]
    },
    'user-analytics-2024': {
      id: 'user-analytics-2024',
      title: '2024 User Analytics Report',
      description: 'Deep dive into user behavior, engagement patterns, and acquisition channels',
      category: 'Analytics',
      period: 'Q1 2024',
      lastUpdated: '2024-03-01T00:00:00Z',
      summary: {
        totalRecords: 45892,
        keyMetric: 'Active Users',
        keyValue: 15429,
        trend: 'up',
        trendPercent: 12.8
      },
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        values: [12450, 13200, 14100, 13890, 14560, 15200, 14980, 15670, 15429, 16200, 15890, 16450],
        type: 'line'
      },
      tableData: {
        headers: ['Source', 'Users', 'Sessions', 'Bounce Rate', 'Conversion Rate'],
        rows: [
          ['Google Organic', '8,429', '12,847', '42.3%', '3.2%'],
          ['Direct Traffic', '4,892', '6,234', '38.7%', '4.1%'],
          ['Social Media', '1,847', '2,456', '65.2%', '1.8%'],
          ['Email Campaign', '1,231', '1,892', '32.1%', '5.7%'],
          ['Referral Sites', '892', '1,234', '55.8%', '2.4%']
        ]
      }
    },
    'inventory-summary': {
      id: 'inventory-summary',
      title: 'Inventory Management Summary',
      description: 'Current stock levels, low inventory alerts, and procurement recommendations',
      category: 'Operations',
      period: 'Current Status',
      lastUpdated: new Date().toISOString(),
      summary: {
        totalRecords: 2847,
        keyMetric: 'Items in Stock',
        keyValue: 2456,
        trend: 'stable',
        trendPercent: -1.2
      },
      tableData: {
        headers: ['Product', 'Current Stock', 'Reorder Level', 'Status', 'Action'],
        rows: [
          ['Wireless Headphones', '145', '50', 'Good', 'Monitor'],
          ['Gaming Laptop', '12', '25', 'Low', 'Reorder'],
          ['Smart Watch', '78', '30', 'Good', 'Monitor'],
          ['Webcam 4K', '5', '15', 'Critical', 'Urgent Reorder'],
          ['Mechanical Keyboard', '89', '40', 'Good', 'Monitor']
        ]
      },
      metrics: [
        { label: 'Total SKUs', value: '2,847', change: '+12', positive: true },
        { label: 'In Stock Items', value: '2,456', change: '-34', positive: false },
        { label: 'Low Stock Alerts', value: '23', change: '+5', positive: false },
        { label: 'Stockout Items', value: '7', change: '-2', positive: true }
      ]
    }
  };
  
  const report = reports[reportId];
  if (!report) {
    throw new Error(`Report with ID "${reportId}" not found`);
  }
  
  return report;
}

// STATIC PARAMS GENERATION - Pre-generate common reports
export async function generateStaticParams() {
  return [
    { reportId: 'sales-2024' },
    { reportId: 'user-analytics-2024' },
    { reportId: 'inventory-summary' }
  ];
}

// STATIC REPORT PAGE - Generated at BUILD TIME
export default async function ReportPage({ params }: { params: { reportId: string } }) {
  try {
    // This runs at BUILD TIME to generate static HTML
    const report = await getReportById(params.reportId);
    
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
          <span className="mx-2 text-gray-400">•</span>
          <Link 
            href="/reports" 
            className="text-blue-600 hover:text-blue-800"
          >
            Reports Dashboard
          </Link>
        </nav>

        {/* REPORT HEADER */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {report.category}
            </span>
            <span className="text-sm text-gray-500">
              Generated: {new Date(report.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {report.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            {report.description}
          </p>
          
          <p className="text-sm text-gray-500">
            <strong>Period:</strong> {report.period}
          </p>
        </header>

        <main>
          {/* STATIC GENERATION INFO */}
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-indigo-900 mb-2">
              📊 Static Report Generation
            </h2>
            <div className="text-sm text-indigo-800 space-y-2">
              <p>
                <strong>Build Strategy:</strong> This report is pre-generated at build time (like scheduled Spring Boot reports)
              </p>
              <p>
                <strong>Data Source:</strong> Aggregated business data from database queries and analytics APIs
              </p>
              <p>
                <strong>Performance:</strong> Instant loading - no database queries at runtime
              </p>
            </div>
          </div>

          {/* KEY SUMMARY */}
          <div className="bg-white p-6 rounded-lg shadow border mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              📈 Executive Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {report.summary.totalRecords.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {typeof report.summary.keyValue === 'number' && report.summary.keyValue > 1000 
                    ? `$${(report.summary.keyValue / 1000000).toFixed(1)}M`
                    : report.summary.keyValue.toLocaleString()
                  }
                </div>
                <div className="text-sm text-gray-600">{report.summary.keyMetric}</div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${
                  report.summary.trend === 'up' ? 'text-green-600' : 
                  report.summary.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {report.summary.trend === 'up' ? '↗️' : 
                   report.summary.trend === 'down' ? '↘️' : '→'}
                  {Math.abs(report.summary.trendPercent)}%
                </div>
                <div className="text-sm text-gray-600">Trend</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {new Date(report.lastUpdated).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">Last Updated</div>
              </div>
            </div>
          </div>

          {/* CHART DATA */}
          {report.chartData && (
            <div className="bg-white p-6 rounded-lg shadow border mb-8">
              <h2 className="text-xl font-semibold mb-4">📊 Trend Analysis</h2>
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {report.chartData.type.charAt(0).toUpperCase() + report.chartData.type.slice(1)} Chart
                </p>
                <p className="text-sm text-gray-600">
                  Data points: {report.chartData.labels.join(', ')}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Values: {report.chartData.values.map(v => typeof v === 'number' && v > 1000 ? `${(v/1000).toFixed(0)}K` : v).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* METRICS TABLE */}
          {report.metrics && (
            <div className="bg-white p-6 rounded-lg shadow border mb-8">
              <h2 className="text-xl font-semibold mb-4">📋 Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{metric.label}</p>
                      <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                    </div>
                    <div className={`text-right ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      <p className="text-lg font-semibold">
                        {metric.positive ? '↗️' : '↘️'} {metric.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATA TABLE */}
          {report.tableData && (
            <div className="bg-white p-6 rounded-lg shadow border mb-8">
              <h2 className="text-xl font-semibold mb-4">📋 Detailed Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      {report.tableData.headers.map((header, index) => (
                        <th key={index} className="text-left p-3 font-semibold text-gray-900">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.tableData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b hover:bg-gray-50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="p-3 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RELATED REPORTS */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">📊 Related Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['sales-2024', 'user-analytics-2024', 'inventory-summary'].filter(id => id !== params.reportId).slice(0, 2).map((reportId) => (
                <Link
                  key={reportId}
                  href={`/reports/${reportId}`}
                  className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {reportId === 'sales-2024' ? 'Sales Report' : 
                       reportId === 'user-analytics-2024' ? 'User Analytics' : 'Inventory Summary'}
                    </h3>
                    <p className="text-sm text-gray-600">View detailed analysis</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SSG COMPARISON */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">⚡ Static Reports: SSG vs Spring Boot</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Spring Boot Scheduled Reports</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`@Service
public class ReportService {
  
  @Scheduled(cron = "0 0 1 * * ?") // Daily at 1 AM
  public void generateReports() {
    List<ReportData> data = analyticsService
      .aggregateBusinessMetrics();
    
    String html = templateEngine.process(
      "report-template", 
      Map.of("data", data)
    );
    
    fileService.saveReport(html, "daily-report.html");
  }
  
  @GetMapping("/reports/{reportId}")
  public String getReport(@PathVariable String reportId) {
    return fileService.readReport(reportId);
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Next.js Static Generation</h3>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Static generation at build time
export async function generateStaticParams() {
  return [
    { reportId: 'sales-2024' },
    { reportId: 'user-analytics-2024' }
  ];
}

export default async function ReportPage({ params }) {
  // Runs at BUILD TIME
  const report = await getReportData(params.reportId);
  
  return <ReportView report={report} />;
}

// Build command generates all reports as static HTML
// npm run build`}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-100 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>🚀 Static Generation Advantage:</strong> Business reports are pre-generated as static HTML 
                and served instantly from CDN. No runtime database queries or template processing needed - 
                perfect for executive dashboards that need to load fast but don't change frequently.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
    
  } catch (error) {
    console.error(`Error loading report ${params.reportId}:`, error);
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Report Not Found</h1>
          <p className="text-gray-600 mb-6">
            The report "{params.reportId}" could not be found or failed to load.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Try these available reports:</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/reports/sales-2024"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sales Report
              </Link>
              <Link
                href="/reports/user-analytics-2024"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                User Analytics
              </Link>
              <Link
                href="/reports/inventory-summary"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Inventory Summary
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}