'use client'; // This directive makes it a CLIENT COMPONENT

import Link from "next/link";
import { useState, useEffect } from 'react';

// TODO TYPE - Like your DTOs in Spring Boot
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

// MOCK API FUNCTIONS - These would call your actual Spring Boot REST APIs
// In a real app, these would point to your existing @RestController endpoints

const todoApi = {
  // GET /api/todos - like your @GetMapping
  async getAll(): Promise<Todo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In real app: const response = await fetch('/api/todos');
    // return response.json();
    
    // Mock data for demo
    const mockTodos: Todo[] = [
      { id: 1, text: "Learn Next.js Client Components", completed: false, createdAt: "2024-02-15T10:30:00Z" },
      { id: 2, text: "Build REST API integration", completed: false, createdAt: "2024-02-15T11:00:00Z" },
      { id: 3, text: "Compare with Spring Boot patterns", completed: true, createdAt: "2024-02-15T09:15:00Z" },
    ];
    
    return mockTodos;
  },

  // POST /api/todos - like your @PostMapping  
  async create(text: string): Promise<Todo> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In real app:
    // const response = await fetch('/api/todos', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text })
    // });
    // return response.json();
    
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    return newTodo;
  },

  // PUT /api/todos/{id} - like your @PutMapping
  async update(id: number, updates: Partial<Todo>): Promise<Todo> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // In real app: PUT request to your Spring Boot API
    // const response = await fetch(`/api/todos/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates)
    // });
    
    return { id, ...updates } as Todo;
  },

  // DELETE /api/todos/{id} - like your @DeleteMapping
  async delete(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In real app: DELETE request to your Spring Boot API
    // await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  }
};

// TODO MANAGER CLIENT COMPONENT
// This is exactly like frontend JavaScript that calls your REST APIs
export default function TodoManager() {
  
  // CLIENT-SIDE STATE (like frontend state in React/Vue/Angular)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // LOAD TODOS ON COMPONENT MOUNT (like useEffect in React)
  // This is equivalent to calling your GET API when page loads
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await todoApi.getAll();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // ADD TODO - Calls your POST API
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodoText.trim()) return;

    try {
      setSubmitting(true);
      const newTodo = await todoApi.create(newTodoText.trim());
      
      // UPDATE LOCAL STATE (optimistic update)
      setTodos(prev => [...prev, newTodo]);
      setNewTodoText('');
      
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create todo');
    } finally {
      setSubmitting(false);
    }
  };

  // TOGGLE COMPLETION - Calls your PUT API
  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await todoApi.update(id, { completed });
      
      // UPDATE LOCAL STATE
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ));
      
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo');
    }
  };

  // DELETE TODO - Calls your DELETE API
  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      await todoApi.delete(id);
      
      // UPDATE LOCAL STATE  
      setTodos(prev => prev.filter(todo => todo.id !== id));
      
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      
      {/* NAVIGATION */}
      <nav className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* PAGE HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Todo Manager
        </h1>
        <p className="text-lg text-gray-600">
          Interactive CRUD operations - like frontend calling your Spring Boot REST APIs
        </p>
      </header>

      <main>
        {/* CLIENT COMPONENT EXPLANATION */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🖥️ Client Component Concepts</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">This Component (runs in browser):</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>✅ <strong>'use client' directive</strong> - Tells Next.js to run in browser</li>
                <li>✅ <strong>useState hooks</strong> - Manage local state (like React/Vue)</li>
                <li>✅ <strong>useEffect hooks</strong> - Side effects like API calls</li>
                <li>✅ <strong>Event handlers</strong> - onClick, onSubmit interactions</li>
                <li>✅ <strong>API calls</strong> - Fetch data from your REST endpoints</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Your Spring Boot REST API:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/api/todos")
public class TodoController {
  
  @GetMapping
  public List<Todo> getAllTodos() {
    return todoService.findAll();
  }
  
  @PostMapping
  public Todo createTodo(@RequestBody TodoRequest req) {
    return todoService.create(req.getText());
  }
  
  @PutMapping("/{id}")
  public Todo updateTodo(@PathVariable Long id, 
                        @RequestBody TodoRequest req) {
    return todoService.update(id, req);
  }
  
  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id) {
    todoService.delete(id);
  }
}`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Client Component API Calls:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`'use client';
import { useState, useEffect } from 'react';

export default function TodoManager() {
  const [todos, setTodos] = useState([]);
  
  // GET /api/todos
  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);
  
  // POST /api/todos
  const addTodo = async (text) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };
  
  // Similar for PUT and DELETE...
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ADD TODO FORM */}
        <div className="bg-white p-6 rounded-lg shadow border mb-8">
          <h2 className="text-xl font-semibold mb-4">➕ Add New Todo</h2>
          
          <form onSubmit={handleAddTodo} className="flex gap-4">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Enter a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newTodoText.trim()}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                submitting || !newTodoText.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Adding...' : 'Add Todo'}
            </button>
          </form>
        </div>

        {/* TODOS LIST */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">📋 Your Todos</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="text-blue-600 font-medium">Loading todos...</div>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No todos yet!</p>
              <p className="text-sm">Add your first todo above to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                    todo.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* CHECKBOX - Toggle completion */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  
                  {/* TODO TEXT */}
                  <div className="flex-1">
                    <div className={`font-medium ${
                      todo.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}>
                      {todo.text}
                    </div>
                    <div className="text-sm text-gray-400">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STATISTICS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
            <div className="text-sm text-blue-800">Total Todos</div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {todos.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-green-800">Completed</div>
          </div>
          
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {todos.filter(t => !t.completed).length}
            </div>
            <div className="text-sm text-yellow-800">Remaining</div>
          </div>
        </div>

        {/* COMPARISON WITH SPRING BOOT */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔄 Spring Boot API Pattern</h2>
          
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold mb-3">This is exactly what you'd build!</h3>
            <div className="text-sm space-y-2">
              <p><strong>🔴 Your Backend:</strong> Spring Boot with @RestController for todo CRUD operations</p>
              <p><strong>🔵 Frontend:</strong> React/Vue/Angular that calls your APIs with fetch()</p>
              <p><strong>🟢 Next.js:</strong> Client Components are the same frontend, just co-located with backend</p>
            </div>
            
            <div className="mt-4 bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                <strong>💡 Key Insight:</strong> Client Components can call your existing Spring Boot APIs! 
                You don't need to rewrite your backend - just point the fetch() calls to your REST endpoints.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}