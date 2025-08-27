# Next.js App Router Feature

## Spring Boot Comparison
In Spring Boot, you use `@RequestMapping` and `@GetMapping` to define routes:
```java
@RestController
public class UserController {
    @GetMapping("/users")           // GET /users
    @GetMapping("/users/{id}")      // GET /users/123
    @GetMapping("/users/{id}/profile") // GET /users/123/profile
}
```

In Next.js App Router, routes are defined by **folder structure**:
```
app/
  users/
    page.tsx          // GET /users
    [id]/
      page.tsx        // GET /users/123
      profile/
        page.tsx      // GET /users/123/profile
```

## Key Concepts

### 1. File-Based Routing
- **Folder = Route segment**
- **`page.tsx` = Route endpoint** (like @GetMapping method)
- **`[param]` = Dynamic route** (like @PathVariable)

### 2. Special Files
- `page.tsx` - The actual page component (like Controller method)
- `layout.tsx` - Wraps pages (like base template)
- `loading.tsx` - Loading UI (like loading spinner)
- `error.tsx` - Error handling (like @ExceptionHandler)

## Examples in This Branch

1. **Basic Routes** - `/app/page.tsx`, `/app/about/page.tsx`
2. **Dynamic Routes** - `/app/users/[id]/page.tsx`
3. **Nested Layouts** - `/app/dashboard/layout.tsx`
4. **Route Groups** - `/app/(marketing)/features/page.tsx`

## Getting Started

Run the development server:
```bash
npm run dev
```

Visit these URLs to see the examples:
- http://localhost:3000 - Home page
- http://localhost:3000/about - About page  
- http://localhost:3000/users/123 - Dynamic user page
- http://localhost:3000/dashboard - Dashboard with nested layout
- http://localhost:3000/features - Marketing section
