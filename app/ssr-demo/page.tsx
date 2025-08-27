import { cookies } from "next/headers"

// SERVER-SIDE RENDERING (SSR) - Like Spring Boot Controllers
// This page is rendered on EVERY REQUEST (not at build time)
export default async function SSRDemo() {
  // This runs on EVERY request - like your @GetMapping methods
  const userPrefs = cookies().get("theme")?.value || "light";
  const currentTime = new Date().toISOString();
  
  // Fetch fresh data on every request (like calling @Service methods)
  const liveData = await fetch("https://api.example.com/live-data", { 
    cache: "no-store" // Always fresh
  });
  
  return (
    <div>
      <h1>Server-Side Rendered Page</h1>
      <p>Generated at: {currentTime}</p>
      <p>User theme: {userPrefs}</p>
      <p>This is rendered fresh on EVERY request - just like Spring Boot\!</p>
    </div>
  );
}
