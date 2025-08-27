# File-based Routing: A New Paradigm

*Published: 2024-02-25 | Author: Frontend Architect | Reading Time: 4 min*

One of the most striking differences between Next.js and traditional frameworks like Spring Boot is the approach to routing.

## Traditional Routing (Spring Boot)

In Spring Boot, you define routes using annotations:

```java
@RestController
public class UserController {
    
    @GetMapping("/users")
    public List<User> getAllUsers() { }
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) { }
    
    @GetMapping("/users/{id}/posts")
    public List<Post> getUserPosts(@PathVariable Long id) { }
}
```

Routes are **explicitly defined** in code, separate from file structure.

## File-based Routing (Next.js)

Next.js uses the file system as the router:

```
app/
  users/
    page.tsx                    // /users
    [id]/
      page.tsx                  // /users/123
      posts/
        page.tsx                // /users/123/posts
```

Routes are **implicitly defined** by folder structure.

## Benefits of File-based Routing

### 1. **Intuitive Organization**
Your file structure matches your URL structure exactly.

### 2. **No Configuration**
No need to set up route mappings or controllers.

### 3. **Colocation**
Related pages, components, and styles can be grouped together.

### 4. **Type Safety**
TypeScript can infer route parameters from folder names.

## Learning Curve

For Spring Boot developers, this might feel strange at first. You're used to having explicit control over routing. But once you embrace it, file-based routing becomes incredibly productive.

The key is to think of **folders as URL segments** and **page.tsx as the endpoint**.