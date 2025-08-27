// LOGIN PAGE - Handles authentication and redirects
// This page handles login and redirects back to originally requested page

'use client';

import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    // Get redirect URL from query params (like Spring Boot)
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect') || '/';
    setRedirectUrl(redirect);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    if (email && password) {
      // Set auth token cookie
      document.cookie = 'auth-token=valid-token; path=/';
      
      // Redirect to originally requested page (like Spring Boot)
      window.location.href = redirectUrl;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8">
      
      {/* LOGIN HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🔐 Login</h1>
        <p className="text-gray-600">
          Authentication required - just like Spring Security
        </p>
      </header>

      {/* REDIRECT INFO */}
      {redirectUrl !== '/' && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            You'll be redirected to: <code>{redirectUrl}</code>
          </p>
        </div>
      )}

      {/* LOGIN FORM */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login & Continue
        </button>
      </form>

      {/* DEMO CREDENTIALS */}
      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Demo Credentials:</h3>
        <p className="text-sm text-yellow-700">
          Any email and password will work for this demo. 
          This will set an auth token cookie that middleware recognizes.
        </p>
      </div>

      {/* SPRING BOOT COMPARISON */}
      <div className="mt-8 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-green-800">Spring Boot Equivalent</h3>
        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Controller
public class LoginController {
    
    @GetMapping("/login")
    public String login(
        @RequestParam(required = false) String redirect,
        Model model
    ) {
        model.addAttribute("redirectUrl", redirect);
        return "login";
    }
    
    @PostMapping("/login")
    public String processLogin(
        @RequestParam String username,
        @RequestParam String password,
        @RequestParam String redirectUrl,
        HttpServletResponse response
    ) {
        if (authService.authenticate(username, password)) {
            // Set JWT cookie
            Cookie cookie = new Cookie("auth-token", generateJWT());
            response.addCookie(cookie);
            
            // Redirect to originally requested page
            return "redirect:" + redirectUrl;
        }
        return "login?error";
    }
}`}
        </pre>
      </div>
    </div>
  );
}