# Next.js Learning Guide for Spring Boot Developers

Welcome to your Next.js learning journey! This guide is structured to help you understand Next.js features through practical examples, with each feature implemented in its own git branch.

## Learning Path Overview

Each branch contains:
- ✅ Working example code with detailed comments
- 📋 Feature explanation comparing to Spring Boot concepts
- 🔧 Step-by-step implementation guide

## Branch Structure

| Branch Name | Next.js Feature | Spring Boot Equivalent |
|-------------|----------------|------------------------|
| `feature/app-router` | App Router (Routing) | @RequestMapping, @GetMapping |
| `feature/server-components` | Server Components | @Service, server-side processing |
| `feature/client-components` | Client Components | Frontend JavaScript, AJAX calls |
| `feature/api-routes` | API Routes | @RestController endpoints |
| `feature/static-generation` | Static Site Generation (SSG) | Static resources, build-time generation |
| `feature/server-side-rendering` | Server-Side Rendering (SSR) | Server-side templating (Thymeleaf) |
| `feature/incremental-regeneration` | Incremental Static Regeneration | Cache invalidation strategies |
| `feature/middleware` | Middleware | Filter, Interceptor |
| `feature/image-optimization` | Image Optimization | Static resource handling |

## How to Use This Guide

1. **Start with master branch** - Contains this guide and basic setup
2. **Check out each feature branch** - `git checkout feature/app-router`
3. **Read the README.md** in each branch for detailed explanations
4. **Run the examples** - `npm run dev` to see features in action
5. **Study the code** - All files are heavily commented

## Spring Boot Developer Tips

- **Components** ≈ **Controllers/Services** - Handle requests and business logic
- **Props** ≈ **Request Parameters** - Data passed between components
- **State** ≈ **Model Attributes** - Data that changes over time
- **Hooks** ≈ **Lifecycle Methods** - Execute code at specific times

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Create and switch to first feature branch
git checkout -b feature/app-router
```

Happy learning! 🚀