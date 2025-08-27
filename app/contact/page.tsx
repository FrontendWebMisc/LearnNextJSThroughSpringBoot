'use client'; // CLIENT COMPONENT - handles form interactions

import Link from "next/link";
import { useState } from 'react';

// FORM DATA TYPES - Like @RequestBody DTOs in Spring Boot
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// MOCK FORM API - Would call your Spring Boot REST endpoints
const contactApi = {
  // POST /api/contact - Your @PostMapping for form submissions
  async submitContactForm(formData: ContactFormData): Promise<{ id: string; message: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would call your Spring Boot endpoint:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // return response.json();
    
    // Simulate validation error occasionally
    if (formData.email === 'error@example.com') {
      throw new Error('Email validation failed on server');
    }
    
    return {
      id: `TICKET-${Date.now()}`,
      message: 'Thank you for your message! We will get back to you soon.'
    };
  }
};

// CONTACT FORM CLIENT COMPONENT
// Like a React form that submits to your Spring Boot REST API
export default function ContactForm() {
  
  // FORM STATE MANAGEMENT (client-side state)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ id: string; message: string } | null>(null);

  // CLIENT-SIDE VALIDATION (like frontend validation)
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE INPUT CHANGES (controlled components)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // FORM SUBMISSION - Calls your Spring Boot API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation first
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Submit to your Spring Boot API
      const result = await contactApi.submitContactForm(formData);
      
      setSubmitResult(result);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission failed:', error);
      
      // Handle server-side errors
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // RESET FORM
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
    setSubmitResult(null);
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
        <h1 className="text-4xl font-bold mb-4 text-orange-600">
          Contact Form
        </h1>
        <p className="text-lg text-gray-600">
          Form submissions - like POST requests to your Spring Boot REST APIs
        </p>
      </header>

      <main>
        {/* FORM HANDLING EXPLANATION */}
        <div className="bg-orange-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">📝 Form Handling Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Spring Boot Form Controller:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@RestController
@RequestMapping("/api")
public class ContactController {
  
  @PostMapping("/contact")
  public ResponseEntity<ContactResponse> submitContact(
    @Valid @RequestBody ContactRequest request
  ) {
    try {
      ContactTicket ticket = contactService
        .createTicket(request);
      
      return ResponseEntity.ok(
        new ContactResponse(
          ticket.getId(),
          "Thank you for your message!"
        )
      );
    } catch (ValidationException e) {
      return ResponseEntity.badRequest()
        .body(new ContactResponse(null, e.getMessage()));
    }
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Client Component Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><strong>Controlled inputs</strong> - Real-time form state</li>
                <li><strong>Client validation</strong> - Immediate feedback</li>
                <li><strong>Form submission</strong> - POST to your API</li>
                <li><strong>Error handling</strong> - Server & client errors</li>
                <li><strong>Loading states</strong> - UI feedback during submission</li>
                <li><strong>Success handling</strong> - Confirmation messages</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CONTACT FORM */}
          <div className="bg-white p-8 rounded-lg shadow border">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            {submitted && submitResult ? (
              // SUCCESS MESSAGE
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-2">{submitResult.message}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Ticket ID: <strong>{submitResult.id}</strong>
                </p>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              // CONTACT FORM
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* NAME FIELD */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* EMAIL FIELD */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Try "error@example.com" to simulate server validation error
                  </p>
                </div>

                {/* SUBJECT FIELD */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                {/* MESSAGE FIELD */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-vertical ${
                      errors.message
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.message.length}/10 characters minimum
                  </p>
                </div>

                {/* FORM SUBMISSION ERROR */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* SUBMIT BUTTONS */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                      submitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={submitting}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* FORM INFO */}
          <div className="space-y-6">
            
            {/* FORM STATE DEBUG */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">🔍 Form State (Debug View)</h3>
              <pre className="text-sm text-gray-700 bg-white p-3 rounded overflow-x-auto">
{JSON.stringify(
  {
    formData,
    hasErrors: Object.keys(errors).length > 0,
    submitting,
    submitted
  }, 
  null, 
  2
)}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                This shows the real-time form state - useful for debugging!
              </p>
            </div>

            {/* API INTEGRATION GUIDE */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-blue-900">🔌 API Integration</h3>
              <p className="text-sm text-blue-800 mb-3">
                This form can easily connect to your existing Spring Boot contact API:
              </p>
              <pre className="text-xs bg-white p-3 rounded text-gray-700">
{`// Update the API call
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.message);
}`}
              </pre>
            </div>

            {/* VALIDATION INFO */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-green-900">✅ Validation Strategy</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li><strong>Client-side:</strong> Immediate feedback, better UX</li>
                <li><strong>Server-side:</strong> Security & data integrity</li>
                <li><strong>Combined:</strong> Best of both worlds</li>
              </ul>
              <p className="text-xs text-green-700 mt-2">
                Just like Spring Boot's @Valid + frontend validation!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}