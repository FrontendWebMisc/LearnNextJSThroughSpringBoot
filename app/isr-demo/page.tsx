import { unstable_cache } from "next/cache"

// INCREMENTAL STATIC REGENERATION (ISR)
// Like Spring Boot caching with TTL expiration
export const revalidate = 60; // Revalidate every 60 seconds

async function getMarketData() {
  // This simulates expensive data fetching
  // In Spring Boot: @Cacheable(value = "marketData", cacheManager = "cacheManager")
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    stockPrice: Math.random() * 100,
    marketCap: Math.random() * 1000000,
    timestamp: new Date().toISOString()
  };
}

// ISR PAGE - Cached with automatic revalidation  
export default async function ISRDemo() {
  // Data is cached and revalidated every 60 seconds
  // Like @CacheEvict(allEntries = true) on a schedule
  const marketData = await getMarketData();
  
  return (
    <div className="p-8">
      <h1>Incremental Static Regeneration Demo</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2>Market Data (Cached for 60s)</h2>
        <p>Stock Price: ${marketData.stockPrice.toFixed(2)}</p>
        <p>Market Cap: ${marketData.marketCap.toLocaleString()}</p>
        <p>Last Updated: {marketData.timestamp}</p>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        This page is statically generated but revalidated every 60 seconds.
        Like Spring Boot @Cacheable with TTL expiration!
      </p>
    </div>
  );
}
