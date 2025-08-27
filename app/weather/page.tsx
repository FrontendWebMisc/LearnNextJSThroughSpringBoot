import Link from "next/link";

// WEATHER DATA TYPES - Like DTOs in Spring Boot
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  icon: string;
  lastUpdated: string;
}

interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

// MOCK WEATHER SERVICE - Like @RestTemplate or WebClient in Spring Boot
async function fetchWeatherData(): Promise<{
  current: WeatherData;
  forecast: WeatherForecast[];
}> {
  
  // Simulate API call delay (like calling external REST API)
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // In real app, this would be:
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  // const data = await response.json();
  
  // For demo purposes, return mock data
  // This simulates what you'd get from a real weather API
  
  const mockCurrentWeather: WeatherData = {
    location: "San Francisco, CA",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    icon: "⛅",
    lastUpdated: new Date().toISOString()
  };

  const mockForecast: WeatherForecast[] = [
    { date: "Today", high: 24, low: 18, condition: "Sunny", icon: "☀️" },
    { date: "Tomorrow", high: 26, low: 19, condition: "Partly Cloudy", icon: "⛅" },
    { date: "Wednesday", high: 21, low: 16, condition: "Rainy", icon: "🌧️" },
    { date: "Thursday", high: 23, low: 17, condition: "Cloudy", icon: "☁️" },
    { date: "Friday", high: 25, low: 20, condition: "Sunny", icon: "☀️" },
  ];

  return {
    current: mockCurrentWeather,
    forecast: mockForecast
  };
}

// WEATHER PAGE - SERVER COMPONENT 
// This is like a Spring Boot controller that calls external services
export default async function WeatherPage() {
  
  // SERVER-SIDE EXTERNAL API CALL
  // This runs on the server, just like @RestTemplate calls in Spring Boot
  // The client never makes the API call directly - server handles it
  const { current, forecast } = await fetchWeatherData();
  
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
        <h1 className="text-4xl font-bold mb-4 text-orange-600">
          Weather Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Server-side external API calls - like @RestTemplate or WebClient
        </p>
      </header>

      <main>
        {/* EXTERNAL API EXPLANATION */}
        <div className="bg-orange-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌐 External API Integration</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Server-Side API Calls:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Fetch on server</strong> - API calls happen during server rendering</li>
                <li><strong>Hide API keys</strong> - Client never sees your API credentials</li>
                <li><strong>Pre-rendered data</strong> - HTML includes the API response</li>
                <li><strong>SEO friendly</strong> - Search engines see the actual data</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Spring Boot RestTemplate:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
public class WeatherController {
  
  @Autowired
  private RestTemplate restTemplate;
  
  @Value("\${weather.api.key}")
  private String apiKey;
  
  @GetMapping("/weather")
  public WeatherData getWeather() {
    String url = "https://api.weather.com/data?" 
      + "key=" + apiKey;
    
    return restTemplate.getForObject(
      url, WeatherData.class
    );
  }
}`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Next.js Server Component:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`export default async function WeatherPage() {
  // Server-side fetch
  const apiKey = process.env.WEATHER_API_KEY;
  
  const response = await fetch(
    \`https://api.weather.com/data?key=\${apiKey}\`
  );
  const weatherData = await response.json();
  
  return (
    <div>
      <h1>Weather: {weatherData.temp}°C</h1>
      {/* Pre-rendered with actual data */}
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* CURRENT WEATHER */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{current.location}</h2>
              <p className="text-blue-100 mb-4">
                Last updated: {new Date(current.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl mb-2">{current.icon}</div>
              <div className="text-4xl font-bold">{current.temperature}°C</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">{current.condition}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 p-3 rounded">
                <div className="text-sm text-blue-100">Humidity</div>
                <div className="text-lg font-semibold">{current.humidity}%</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded">
                <div className="text-sm text-blue-100">Wind Speed</div>
                <div className="text-lg font-semibold">{current.windSpeed} km/h</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded">
                <div className="text-sm text-blue-100">Pressure</div>
                <div className="text-lg font-semibold">{current.pressure} hPa</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded">
                <div className="text-sm text-blue-100">Visibility</div>
                <div className="text-lg font-semibold">{current.visibility} km</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-DAY FORECAST */}
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            📅 5-Day Forecast
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div 
                key={index} 
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {day.date}
                </div>
                
                <div className="text-4xl mb-3">{day.icon}</div>
                
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-900">
                    {day.high}°C
                  </div>
                  <div className="text-sm text-gray-500">
                    {day.low}°C
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mt-2">
                  {day.condition}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API BENEFITS */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🎯 Server-Side API Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600">✅ Advantages</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>API Keys Protected:</strong> Never exposed to client</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>SEO Optimized:</strong> Data pre-rendered in HTML</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Faster Loading:</strong> No client-side API waiting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Rate Limiting:</strong> Server controls API usage</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">🔄 Spring Boot Similarities</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>@RestTemplate:</strong> Similar to fetch() in Server Components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>@Value secrets:</strong> Like process.env variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>Service layer:</strong> Business logic on server</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>Template rendering:</strong> Data pre-populated</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">🔧 Real Implementation Example:</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`// .env.local
WEATHER_API_KEY=your_openweathermap_key

// weather/page.tsx
export default async function WeatherPage() {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = 'San Francisco';
  
  const response = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.main.temp}°C</p>
      <p>{data.weather[0].description}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}