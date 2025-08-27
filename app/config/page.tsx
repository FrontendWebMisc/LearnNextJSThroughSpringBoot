import Link from "next/link";

// CONFIGURATION INTERFACE - Like application.properties structure
interface AppConfig {
  environment: string;
  version: string;
  buildTime: string;
  features: {
    analytics: boolean;
    darkMode: boolean;
    chatSupport: boolean;
  };
  database: {
    host: string;
    name: string;
    poolSize: number;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  secrets: {
    jwtSecret: string;
    apiKeys: {
      stripe: string;
      sendgrid: string;
    };
  };
}

// SERVER-SIDE CONFIGURATION LOADING
// This runs ONLY on the server - like @ConfigurationProperties in Spring Boot
function loadServerConfiguration(): AppConfig {
  
  // ACCESS ENVIRONMENT VARIABLES (like @Value annotations)
  // These are ONLY available on the server, never sent to client
  
  // In Spring Boot: @Value("${app.environment:development}")
  const environment = process.env.NODE_ENV || 'development';
  
  // In Spring Boot: @Value("${app.version}")
  const version = process.env.npm_package_version || '1.0.0';
  
  // Server-only secrets (like @Value("${jwt.secret}"))
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
  const stripeApiKey = process.env.STRIPE_API_KEY || 'sk_test_...';
  const sendgridApiKey = process.env.SENDGRID_API_KEY || 'sg_...';
  
  // Build configuration from environment
  return {
    environment,
    version,
    buildTime: new Date().toISOString(),
    features: {
      analytics: process.env.ENABLE_ANALYTICS === 'true',
      darkMode: process.env.ENABLE_DARK_MODE !== 'false',
      chatSupport: process.env.ENABLE_CHAT === 'true',
    },
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      name: process.env.DATABASE_NAME || 'myapp',
      poolSize: parseInt(process.env.DB_POOL_SIZE || '10'),
    },
    api: {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
      timeout: parseInt(process.env.API_TIMEOUT || '5000'),
      retries: parseInt(process.env.API_RETRIES || '3'),
    },
    secrets: {
      jwtSecret,
      apiKeys: {
        stripe: stripeApiKey,
        sendgrid: sendgridApiKey,
      },
    },
  };
}

// CONFIG PAGE - SERVER COMPONENT
// Equivalent to Spring Boot @ConfigurationProperties + controller
export default function ConfigPage() {
  
  // LOAD CONFIGURATION ON SERVER
  // This is like @Autowired ConfigurationProperties in Spring Boot
  const config = loadServerConfiguration();
  
  // MASK SENSITIVE DATA for display (like logging with masked passwords)
  const maskedSecrets = {
    jwtSecret: config.secrets.jwtSecret.substring(0, 8) + '...',
    apiKeys: {
      stripe: config.secrets.apiKeys.stripe.substring(0, 12) + '...',
      sendgrid: config.secrets.apiKeys.sendgrid.substring(0, 8) + '...',
    },
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      
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
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          Application Configuration
        </h1>
        <p className="text-lg text-gray-600">
          Environment variables & server config - like @Value and @ConfigurationProperties
        </p>
      </header>

      <main>
        {/* ENVIRONMENT VARIABLES EXPLANATION */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔐 Environment Variables Concept</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Server-Only Configuration:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>process.env</strong> - Access environment variables (like @Value)</li>
                <li><strong>Server-side only</strong> - Never exposed to client browser</li>
                <li><strong>Secrets safe</strong> - API keys, database passwords protected</li>
                <li><strong>Environment-specific</strong> - Different values per deployment</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Spring Boot application.yml:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`app:
  environment: \${APP_ENV:development}
  version: \${APP_VERSION:1.0.0}
  
database:
  host: \${DB_HOST:localhost}
  name: \${DB_NAME:myapp}
  
jwt:
  secret: \${JWT_SECRET:dev-secret}
  
@Value("\${app.environment}")
private String environment;

@ConfigurationProperties("database")
public class DatabaseConfig { ... }`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Next.js Environment Variables:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`// .env file
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_NAME=myapp
JWT_SECRET=your-secret-key

// Server Component
function loadConfig() {
  return {
    environment: process.env.NODE_ENV,
    database: {
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* CONFIGURATION DISPLAY */}
        <div className="space-y-6">
          
          {/* APPLICATION INFO */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ℹ️ Application Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-blue-900">Environment</h3>
                <p className="text-lg font-bold text-blue-600">{config.environment}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded">
                <h3 className="font-semibold text-green-900">Version</h3>
                <p className="text-lg font-bold text-green-600">{config.version}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded">
                <h3 className="font-semibold text-purple-900">Build Time</h3>
                <p className="text-sm font-bold text-purple-600">
                  {new Date(config.buildTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE FLAGS */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🎛️ Feature Flags
            </h2>
            <div className="space-y-3">
              {Object.entries(config.features).map(([feature, enabled]) => (
                <div key={feature} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="capitalize font-medium">{feature.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DATABASE CONFIG */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🗄️ Database Configuration
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Host</span>
                <span className="font-mono text-sm">{config.database.host}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Database Name</span>
                <span className="font-mono text-sm">{config.database.name}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Pool Size</span>
                <span className="font-mono text-sm">{config.database.poolSize}</span>
              </div>
            </div>
          </div>

          {/* API CONFIG */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🌐 API Configuration
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Base URL</span>
                <span className="font-mono text-sm">{config.api.baseUrl}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Timeout (ms)</span>
                <span className="font-mono text-sm">{config.api.timeout}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Max Retries</span>
                <span className="font-mono text-sm">{config.api.retries}</span>
              </div>
            </div>
          </div>

          {/* SECRETS (MASKED) */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🔐 Secrets (Masked for Security)
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-red-50 rounded">
                <span className="font-medium">JWT Secret</span>
                <span className="font-mono text-sm text-red-600">{maskedSecrets.jwtSecret}</span>
              </div>
              <div className="flex justify-between p-3 bg-red-50 rounded">
                <span className="font-medium">Stripe API Key</span>
                <span className="font-mono text-sm text-red-600">{maskedSecrets.apiKeys.stripe}</span>
              </div>
              <div className="flex justify-between p-3 bg-red-50 rounded">
                <span className="font-medium">SendGrid API Key</span>
                <span className="font-mono text-sm text-red-600">{maskedSecrets.apiKeys.sendgrid}</span>
              </div>
            </div>
            
            <div className="mt-4 bg-yellow-100 p-3 rounded">
              <p className="text-sm text-yellow-800">
                <strong>🔒 Security:</strong> These secrets are only accessible on the server. 
                The client browser never receives the actual values, just like in Spring Boot 
                where @Value properties aren't exposed to frontend clients.
              </p>
            </div>
          </div>
        </div>

        {/* ENVIRONMENT SETUP GUIDE */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🛠️ Environment Setup</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Create a .env.local file in your project root:</h3>
              <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm">
{`# .env.local (not committed to git)
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_NAME=myapp_dev
DB_POOL_SIZE=10

JWT_SECRET=your-super-secret-jwt-key
STRIPE_API_KEY=sk_test_your_stripe_key
SENDGRID_API_KEY=SG.your_sendgrid_key

ENABLE_ANALYTICS=false
ENABLE_DARK_MODE=true
ENABLE_CHAT=false`}
              </pre>
            </div>
            
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Just like Spring Boot's application-dev.properties, 
                Next.js loads environment variables automatically. Use .env.local for 
                development secrets (never commit to git) and .env for public variables.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}