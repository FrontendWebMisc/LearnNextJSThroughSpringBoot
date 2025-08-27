import Link from "next/link";

// This is the HOME PAGE component - equivalent to @GetMapping("/") in Spring Boot
// In Next.js, this file at app/page.tsx automatically handles GET requests to "/"
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 
        HEADER SECTION 
        Similar to how you might have a header in a Thymeleaf template
      */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Next.js App Router Demo
        </h1>
        <p className="text-lg text-gray-600">
          Learn Next.js routing concepts coming from Spring Boot background
        </p>
      </header>

      {/* 
        MAIN CONTENT SECTION
        Think of this as the main content you'd return in a Spring Boot controller
      */}
      <main>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🖥️ Client Components Features</h2>
          <p className="mb-4">
            This branch demonstrates Next.js Client Components - the interactive JavaScript that runs in the browser.
            These are exactly like the frontend code that calls your Spring Boot REST APIs for dynamic functionality!
          </p>
          
          {/* 
            NAVIGATION LINKS
            Similar to how you'd create navigation in Spring Boot templates
            Link component provides client-side navigation (faster than page reloads)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Todo Manager Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">✅ Todo Manager</h3>
              <p className="text-sm text-gray-600 mb-3">
                Interactive CRUD operations - like POST/DELETE to your APIs
              </p>
              <Link 
                href="/todo" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                Manage Todos
              </Link>
            </div>

            {/* Shopping Cart Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">🛒 Shopping Cart</h3>
              <p className="text-sm text-gray-600 mb-3">
                State management & API calls - like frontend calling REST APIs
              </p>
              <Link 
                href="/cart" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
              >
                Shopping Experience
              </Link>
            </div>

            {/* Real-time Chat Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">💬 Real-time Chat</h3>
              <p className="text-sm text-gray-600 mb-3">
                Live interactions - like WebSocket connections
              </p>
              <Link 
                href="/chat" 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
              >
                Chat Interface
              </Link>
            </div>

            {/* Form Handling Example */}
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-lg mb-2">📝 Contact Form</h3>
              <p className="text-sm text-gray-600 mb-3">
                Form submissions - like POST requests to backend APIs
              </p>
              <Link 
                href="/contact" 
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 inline-block"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {/* 
          SPRING BOOT COMPARISON SECTION
          Educational content to help understand the concepts
        */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔄 Your REST API Frontend vs Next.js Client Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Frontend calling your Spring Boot API</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// Frontend JavaScript (React/Vue/Angular)
const [todos, setTodos] = useState([]);

const addTodo = async (text) => {
  // Calls YOUR REST API
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: { 'Content-Type': 'application/json' }
  });
  const newTodo = await response.json();
  setTodos([...todos, newTodo]); // Update UI
};

// Interactive button
<button onClick={() => addTodo("New task")}>
  Add Todo
</button>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Next.js Client Component</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`'use client'; // Runs in BROWSER

import { useState } from 'react';

export default function TodoManager() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = async (text) => {
    // Can call ANY API (including yours!)
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };
  
  return (
    <button onClick={() => addTodo("New task")}>
      Add Todo
    </button>
  );
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>It's the same!</strong> Client Components are just React components that run in the browser - 
              exactly like the frontend JavaScript you're used to writing that calls your REST APIs. 
              The only difference is they're co-located with your backend code in the same Next.js project.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
