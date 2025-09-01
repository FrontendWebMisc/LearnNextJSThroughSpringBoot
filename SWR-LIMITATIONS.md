# When NOT to Use SWR: Limitations and Alternatives

## Overview
While SWR is excellent for data fetching and caching, there are specific scenarios where it's either not suitable or where alternatives might be better. This guide helps Spring Boot developers understand when to avoid SWR and what alternatives to use.

## 🚫 Scenarios Where SWR is NOT Suitable

### 1. **Server-Side Rendering (SSR) Data Fetching**

**Problem:** SWR is a client-side library and doesn't work during SSR.

```typescript
// ❌ DON'T: This won't work on server
export default function BlogPost({ slug }: { slug: string }) {
  const { data: post } = useSWR(`/api/posts/${slug}`, fetcher)
  return <div>{post?.title}</div> // Will be undefined on server
}
```

**Spring Boot Equivalent:** Like trying to use browser APIs in Spring Boot controllers.

**✅ Alternative:**
```typescript
// Server Component (recommended)
async function BlogPost({ slug }: { slug: string }) {
  const post = await fetch(`/api/posts/${slug}`).then(r => r.json())
  return <div>{post.title}</div>
}

// Or use getServerSideProps/getStaticProps
export async function getServerSideProps({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json())
  return { props: { post } }
}
```

---

### 2. **Non-GET HTTP Operations (Mutations)**

**Problem:** SWR is designed for GET requests. POST/PUT/DELETE should not be cached.

```typescript
// ❌ DON'T: Using SWR for mutations
const { data, mutate } = useSWR('/api/users', () => 
  fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser) })
)
```

**Spring Boot Equivalent:** Like trying to cache `@PostMapping` responses.

**✅ Alternative:**
```typescript
// Use regular fetch or axios for mutations
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
  
  if (response.ok) {
    // Then update SWR cache
    mutate('/api/users')
  }
}

// Or use libraries like TanStack Query for mutations
import { useMutation } from '@tanstack/react-query'

const createUserMutation = useMutation({
  mutationFn: (userData) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  onSuccess: () => {
    queryClient.invalidateQueries(['users'])
  }
})
```

---

### 3. **Real-Time Data (WebSocket/SSE)**

**Problem:** SWR uses polling/HTTP requests, not suitable for real-time updates.

```typescript
// ❌ DON'T: Using SWR for real-time data
const { data: messages } = useSWR('/api/messages', fetcher, {
  refreshInterval: 100 // This is inefficient and not real-time
})
```

**Spring Boot Equivalent:** Like using REST polling instead of WebSocket `@MessageMapping`.

**✅ Alternative:**
```typescript
// Use WebSocket directly
useEffect(() => {
  const socket = new WebSocket('ws://localhost:8080/messages')
  
  socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data)
    setMessages(prev => [...prev, newMessage])
  }
  
  return () => socket.close()
}, [])

// Or use libraries like Socket.IO
import { useSocket } from './hooks/useSocket'

const messages = useSocket('messages')
```

---

### 4. **File Uploads/Downloads**

**Problem:** SWR is for JSON data, not suitable for binary data or file operations.

```typescript
// ❌ DON'T: Using SWR for file uploads
const uploadFile = useSWR('/api/upload', () => {
  const formData = new FormData()
  formData.append('file', file)
  return fetch('/api/upload', { method: 'POST', body: formData })
})
```

**Spring Boot Equivalent:** Like trying to cache file upload responses.

**✅ Alternative:**
```typescript
// Use regular fetch for file operations
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    // Don't set Content-Type, let browser set boundary
  })
  
  return response.json()
}

// For downloads
const downloadFile = async (fileId: string) => {
  const response = await fetch(`/api/files/${fileId}`)
  const blob = await response.blob()
  
  // Create download link
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'file.pdf'
  a.click()
}
```

---

### 5. **Authentication Flows**

**Problem:** Login/logout operations should not be cached and require immediate response.

```typescript
// ❌ DON'T: Using SWR for authentication
const { data: loginResult } = useSWR(['/api/login', credentials], 
  ([url, creds]) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(creds)
  })
)
```

**Spring Boot Equivalent:** Like caching `/login` POST responses.

**✅ Alternative:**
```typescript
// Use regular async functions for auth
const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  
  if (response.ok) {
    const { token } = await response.json()
    localStorage.setItem('token', token)
    
    // Then fetch user data with SWR
    mutate('/api/me')
    router.push('/dashboard')
  }
}

// SWR is good for fetching current user after login
const { data: user } = useSWR('/api/me', fetcher)
```

---

### 6. **Large Dataset Streaming**

**Problem:** SWR loads entire response into memory, not suitable for large datasets.

```typescript
// ❌ DON'T: Using SWR for large datasets
const { data: bigData } = useSWR('/api/export/all-users', fetcher)
// This could load 100MB+ into memory
```

**Spring Boot Equivalent:** Like loading entire ResultSet into memory instead of streaming.

**✅ Alternative:**
```typescript
// Use streaming for large data
const downloadLargeDataset = async () => {
  const response = await fetch('/api/export/all-users')
  const reader = response.body?.getReader()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    // Process chunk
    processChunk(value)
  }
}

// Or use pagination with SWR
const { data: users } = useSWR(
  `/api/users?page=${page}&limit=50`, 
  fetcher
)
```

---

### 7. **Heavy Computational Tasks**

**Problem:** SWR is for data fetching, not for CPU-intensive operations.

```typescript
// ❌ DON'T: Using SWR for computations
const { data: result } = useSWR('complex-calculation', () => {
  // Heavy CPU work that blocks UI
  return heavyComputation(largeDataset)
})
```

**Spring Boot Equivalent:** Like running heavy computation in controller instead of `@Async`.

**✅ Alternative:**
```typescript
// Use Web Workers for heavy computation
const calculateInWorker = async (data) => {
  const worker = new Worker('/worker.js')
  
  return new Promise((resolve) => {
    worker.postMessage(data)
    worker.onmessage = (e) => {
      resolve(e.data)
      worker.terminate()
    }
  })
}

// Or use React's useMemo for lighter computations
const result = useMemo(() => {
  return lightweightCalculation(data)
}, [data])
```

---

### 8. **Sequential/Dependent API Calls**

**Problem:** SWR runs all requests in parallel, not suitable for dependent calls.

```typescript
// ❌ DON'T: Dependent calls with SWR
const { data: user } = useSWR('/api/me', fetcher)
const { data: profile } = useSWR('/api/profile', fetcher) // Needs user.id!
```

**Spring Boot Equivalent:** Like running dependent database queries in parallel.

**✅ Alternative:**
```typescript
// Use conditional fetching
const { data: user } = useSWR('/api/me', fetcher)
const { data: profile } = useSWR(
  user ? `/api/users/${user.id}/profile` : null,
  fetcher
)

// Or use async/await for complex flows
const fetchUserAndProfile = async () => {
  const user = await fetch('/api/me').then(r => r.json())
  const profile = await fetch(`/api/users/${user.id}/profile`).then(r => r.json())
  
  return { user, profile }
}
```

---

## 🔄 **Recommended Alternatives**

### For Different Use Cases:

| Use Case | Instead of SWR | Use This |
|----------|---------------|----------|
| **SSR Data** | SWR | Next.js Server Components, getServerSideProps |
| **Mutations** | SWR | TanStack Query, regular fetch |
| **Real-time** | SWR polling | WebSocket, Server-Sent Events |
| **File Operations** | SWR | FormData + fetch, upload libraries |
| **Authentication** | SWR caching | Regular async functions |
| **Large Data** | SWR | Streaming, pagination, virtual scrolling |
| **Heavy Computation** | SWR | Web Workers, useMemo |
| **Complex Flows** | SWR parallel | async/await sequences |

---

## 🎯 **When SWR is PERFECT**

SWR excels at:
- ✅ **GET requests** for user-facing data
- ✅ **Dashboard data** that needs frequent updates
- ✅ **Lists and tables** with real-time sync
- ✅ **User profiles** and settings
- ✅ **Search results** with debouncing
- ✅ **Master-detail views** with caching
- ✅ **Offline-first applications** with sync

---

## 🚀 **Best Practices for Spring Boot Developers**

1. **Use SWR for data fetching** (like `@GetMapping` responses)
2. **Use regular fetch for mutations** (like `@PostMapping` operations)
3. **Combine approaches** - SWR for reads, fetch for writes
4. **Consider caching strategy** - What would you cache in Spring Boot?
5. **Think about user experience** - When do users need real-time vs cached data?

Remember: SWR is a **data synchronization** tool, not a general-purpose HTTP client. Use it where its strengths shine!