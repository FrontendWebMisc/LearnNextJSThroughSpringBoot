# Next.js Client Components Feature

## Spring Boot API Developer Perspective
As a REST API developer, you know this pattern well:

**Your Spring Boot Backend:**
```java
@RestController
public class TodoController {
    
    @PostMapping("/api/todos")
    public Todo createTodo(@RequestBody TodoRequest request) {
        return todoService.createTodo(request);
    }
    
    @DeleteMapping("/api/todos/{id}")  
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
```

**Frontend JavaScript that calls your APIs:**
```javascript
// This runs in the BROWSER
async function addTodo(text) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
    });
    const newTodo = await response.json();
    updateUI(newTodo); // Interactive updates
}
```

**Next.js Client Components** are exactly like that frontend JavaScript - they run in the browser and can call APIs for interactive features!

## Key Concepts for API Developers

### 1. When You Need Client Components
- **Form submissions** (like POST requests to your APIs)
- **Interactive buttons** (like DELETE, PUT operations)  
- **Real-time updates** (like WebSocket connections)
- **User state** (like shopping cart, login status)

### 2. Client Components = Frontend JavaScript
- **Run in browser** - Just like JavaScript that calls your REST APIs
- **Interactive** - Handle clicks, form submissions, real-time updates
- **Stateful** - Manage UI state (like React hooks)
- **API calls** - Fetch data from endpoints (including your existing APIs!)

## Examples in This Branch

1. **Todo Manager** - `/app/todo` (POST/DELETE operations like your APIs)
2. **Shopping Cart** - `/app/cart` (State management + API calls)
3. **Real-time Chat** - `/app/chat` (WebSocket-like interactions)
4. **Form Handling** - `/app/contact` (Form submission to backend)

## Getting Started

Run the development server:
```bash
npm run dev
```

Visit these URLs to see Client Components:
- http://localhost:3000/todo - Interactive todo management
- http://localhost:3000/cart - Shopping cart with state
- http://localhost:3000/chat - Real-time messaging simulation
- http://localhost:3000/contact - Form submissions
