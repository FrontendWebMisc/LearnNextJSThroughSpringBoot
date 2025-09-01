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

## Features Demonstrated

### Server-Side Component (`ServerUserManager`)
- Server-side rendering with Next.js Server Components
- Data fetched during SSR (like Thymeleaf with model data)
- Better SEO and initial page load performance
- Suspense boundaries for loading states

### Client-Side Component with SWR (`ClientUserManager`)
- ✨ Full CRUD operations (Create, Read, Update, Delete)
- 🔄 Automatic revalidation every 5 seconds
- 🎯 Focus revalidation when window regains focus
- 📦 Built-in caching and optimistic updates
- 🔥 Real-time UI updates with `mutate()`
- 📱 Loading states and error handling

### API Endpoints (`/api/users`)
- RESTful API similar to Spring Boot controllers
- In-memory data storage (like H2 database for demo)
- Full CRUD operations with proper HTTP status codes
- Simulated network delays for realistic testing

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

1. **Automatic Caching** - No need to manage cache manually
2. **Background Updates** - Data stays fresh automatically
3. **Optimistic Updates** - UI responds immediately
4. **Error Handling** - Built-in retry and error states
5. **Deduplication** - Multiple components share same requests
6. **TypeScript Support** - Fully typed data fetching

This is perfect for Spring Boot developers transitioning to modern React patterns!