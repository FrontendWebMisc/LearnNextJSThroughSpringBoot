# Next.js CRUD Operations with SWR

## Perfect for Spring Boot Developers Who Use JPA Repositories & REST APIs!
This demonstrates CRUD operations using SWR (Stale-While-Revalidate) library - it's like having Spring Boot's `@Repository` with automatic caching, background sync, and real-time updates!

**Your Spring Boot Data Layer:**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userRepository.save(user);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
```

**Next.js SWR Implementation (same CRUD operations!):**
```typescript
'use client'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function UserManager() {
    // Like Spring Boot's @Cacheable with auto-refresh
    const { data: users, error, isLoading } = useSWR('/api/users', fetcher, {
        refreshInterval: 5000,        // Background sync every 5 seconds
        revalidateOnFocus: true       // Refresh when user returns to tab
    })
    
    // CREATE - Like userRepository.save()
    const createUser = async (userData) => {
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        })
        mutate('/api/users')  // Auto-refresh cache
    }
    
    // UPDATE - Like userRepository.save() with existing ID
    const updateUser = async (id, userData) => {
        await fetch(`/api/users/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(userData)
        })
        mutate('/api/users')  // Auto-refresh cache
    }
    
    // DELETE - Like userRepository.deleteById()
    const deleteUser = async (id) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' })
        mutate('/api/users')  // Auto-refresh cache
    }
}
```

## Key Concepts for Spring Boot Developers

### 1. SWR vs Spring Boot Caching
- **SWR Cache** - Like `@Cacheable` but with automatic background updates
- **Revalidation** - Like Spring's `@CacheEvict` but happens automatically
- **Optimistic Updates** - UI updates immediately, syncs in background
- **Error Handling** - Built-in retry logic like Spring Retry

### 2. Real-time Data Sync
- **Background Refresh** - Keeps data fresh without user interaction
- **Focus Revalidation** - Refreshes when user returns to the page
- **Network Recovery** - Auto-retry when connection is restored
- **Deduplication** - Multiple components share the same cache

### 3. Server vs Client Components
- **Server Components** - Like Spring Boot controllers (run on server)
- **Client Components** - Like JavaScript in JSPs (run in browser)
- **SWR Integration** - Perfect for client-side data management

## ⚠️ **IMPORTANT: SWR Scope & Limitations**

> ### **SWR error handling only applies to client-side `GET` requests made using SWR.**

* SWR is **not meant for server-side rendering (SSR), static generation (SSG), or React Server Components**.
* It's also **not designed for POST/PUT/DELETE** (writes).
* Think of it as:

  > *"If I'm fetching data on the **client** with a `GET` request using SWR, I get built-in caching, retries, and error handling."*

**For everything else** (SSR, RSC, writes), including error handling, handle it differently (server-side or custom logic).

📖 **See [SWR-LIMITATIONS.md](./SWR-LIMITATIONS.md) for detailed scenarios where SWR is not suitable and recommended alternatives.**

---

## Features Demonstrated

### Server-Side Component (`ServerUserManager`)
- Server-side rendering with Next.js Server Components
- Data fetched during SSR (like Thymeleaf with model data)
- Better SEO and initial page load performance
- Suspense boundaries for loading states

### Client-Side Component with SWR (`ClientUserManager`)
- ✨ **Full CRUD operations** (Create, Read, Update, Delete)
- 🔄 **SWR Advanced Features**:
  - Automatic revalidation every 5 seconds
  - Focus revalidation when window regains focus
  - Reconnection revalidation when network recovers
  - Background data fetching with `isValidating` state
- 🚀 **Optimistic Updates**: Immediate UI feedback with automatic rollback on errors
- 📦 **Advanced Caching**: 
  - Cache deduplication and sharing across components
  - Stale-while-revalidate pattern for better UX
  - Cache debugging and inspection tools
- 🔥 **Real-time UI updates** with SWR's `mutate()`
- 🛡️ **Production-Level Error Handling**:
  - Custom error boundaries and fallback UI
  - Retry logic with exponential backoff
  - Network status detection and offline handling
  - Form validation with field-specific error messages

### API Endpoints (`/api/users`) - Production Ready
- RESTful API similar to Spring Boot controllers
- **Comprehensive Error Handling**:
  - Structured error responses with error codes
  - Input validation with detailed field errors
  - Business logic validation (duplicate email detection)
  - Request/response logging with unique request IDs
- **Advanced Features**:
  - Request context tracking and performance monitoring
  - Simulated database errors for testing error scenarios
  - Proper HTTP status codes and error categorization
  - Production-ready logging and metrics collection

## Getting Started

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

Visit the demo page:
- `/crud-swr` - Complete CRUD demonstration with both server and client components

## SWR Benefits Over Traditional Fetch

### 🚀 **Core SWR Features**
1. **Automatic Caching** - Intelligent cache management with stale-while-revalidate
2. **Background Updates** - Data stays fresh without blocking UI
3. **Optimistic Updates** - Immediate UI responses with automatic rollback
4. **Request Deduplication** - Multiple components share same requests efficiently
5. **TypeScript Support** - Fully typed data fetching with excellent intellisense

### 🛡️ **Advanced Error Handling**
6. **Built-in Retry Logic** - Configurable retry with exponential backoff
7. **Error Boundaries** - Graceful error handling and recovery
8. **Network Recovery** - Automatic revalidation when connection is restored
9. **Custom Error States** - User-friendly error messages and actions
10. **Validation Integration** - Field-specific error handling with forms

### 📊 **Production Features**
11. **Performance Monitoring** - Request timing and cache hit analytics
12. **Structured Logging** - Comprehensive logging for debugging and monitoring
13. **Global Configuration** - Centralized SWR setup with custom middleware
14. **Loading States** - Multiple loading states (`isLoading`, `isValidating`)
15. **Offline Support** - Graceful degradation and offline detection

### 🔧 **Developer Experience**
16. **Cache Debugging** - Tools to inspect and debug SWR cache
17. **Hot Reloading** - Preserves cache during development
18. **Middleware System** - Custom middleware for logging and monitoring
19. **Global Error Handling** - Centralized error processing
20. **Focus Management** - Smart revalidation on tab focus

## Perfect for Spring Boot Developers!

This implementation bridges Spring Boot concepts with modern React patterns:
- **SWR's `mutate()`** = Spring Boot's `@CacheEvict`
- **SWR's caching** = Spring Boot's `@Cacheable` with TTL
- **SWR's error handling** = Spring Boot's `@ExceptionHandler`
- **SWR's optimistic updates** = Immediate UI feedback before DB commit
- **SWR's background sync** = Spring Boot's `@Async` background tasks

Ready for production deployment with enterprise-grade error handling and monitoring!