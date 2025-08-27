'use client'; // CLIENT COMPONENT - interactive chat interface

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

// MESSAGE TYPES - Like DTOs in your Spring Boot WebSocket controllers
interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  type: 'user' | 'system';
}

// SIMULATED CHAT API - Would connect to your WebSocket endpoints
const chatApi = {
  // Simulate WebSocket connection to your Spring Boot WebSocket endpoint
  // In real app: new WebSocket('ws://localhost:8080/chat')
  connect: () => {
    console.log('Connected to chat server (simulated)');
  },

  // POST /api/chat/messages - Your @MessageMapping in Spring Boot
  sendMessage: async (username: string, message: string): Promise<ChatMessage> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      id: Date.now(),
      username,
      message,
      timestamp: new Date().toISOString(),
      type: 'user'
    };
  },

  // Simulate receiving messages from other users
  getSimulatedResponse: (userMessage: string): ChatMessage => {
    const responses = [
      "That's interesting! Tell me more.",
      "I agree with your point about Next.js!",
      "Have you tried implementing this in Spring Boot?",
      "Great question! Let me think about that.",
      "This reminds me of microservices patterns.",
      "Nice! Client Components are really powerful."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now() + 1,
      username: 'ChatBot',
      message: randomResponse,
      timestamp: new Date().toISOString(),
      type: 'user'
    };
  }
};

// CHAT CLIENT COMPONENT - Like a chat frontend that connects to your WebSocket APIs
export default function ChatInterface() {
  
  // CLIENT-SIDE STATE (like frontend state management)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Developer');
  const [isConnected, setIsConnected] = useState(false);
  const [sending, setSending] = useState(false);
  
  // REF FOR AUTO-SCROLL
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // CONNECT TO CHAT ON MOUNT (like WebSocket connection)
  useEffect(() => {
    // Simulate connecting to your Spring Boot WebSocket endpoint
    chatApi.connect();
    setIsConnected(true);
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 1,
      username: 'System',
      message: 'Welcome to the chat! This simulates WebSocket communication with your Spring Boot backend.',
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    
    setMessages([welcomeMessage]);
    
    // Cleanup on unmount
    return () => {
      setIsConnected(false);
    };
  }, []);

  // AUTO-SCROLL TO BOTTOM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // SEND MESSAGE - Calls your WebSocket/REST API
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      
      // Send message via API (would be WebSocket in real app)
      const sentMessage = await chatApi.sendMessage(username, newMessage.trim());
      
      // Add user message to chat
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
      
      // Simulate receiving a response after a delay (like other users responding)
      setTimeout(() => {
        const response = chatApi.getSimulatedResponse(sentMessage.message);
        setMessages(prev => [...prev, response]);
      }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
      
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  // FORMAT TIMESTAMP
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          Real-time Chat Demo
        </h1>
        <p className="text-lg text-gray-600">
          Live interactions - like WebSocket connections to your Spring Boot backend
        </p>
      </header>

      <main>
        {/* WEBSOCKET EXPLANATION */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">💬 Real-time Communication</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Spring Boot WebSocket:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{`@Controller
public class ChatController {
  
  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/messages")
  public ChatMessage sendMessage(
    @Payload ChatMessage message
  ) {
    return message;
  }
  
  @MessageMapping("/chat.addUser")
  @SendTo("/topic/messages")
  public ChatMessage addUser(
    @Payload ChatMessage message
  ) {
    return message;
  }
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Client Component Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><strong>Real-time messaging</strong> - Like WebSocket clients</li>
                <li><strong>Live UI updates</strong> - Messages appear instantly</li>
                <li><strong>State synchronization</strong> - Shared chat state</li>
                <li><strong>Event handling</strong> - Send/receive messages</li>
                <li><strong>Connection management</strong> - Connect/disconnect</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CHAT INTERFACE */}
        <div className="bg-white rounded-lg shadow border h-96 flex flex-col">
          
          {/* CHAT HEADER */}
          <div className="bg-gray-50 p-4 rounded-t-lg border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Chat Room</h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'system' 
                    ? 'bg-yellow-100 text-yellow-800 text-center text-sm'
                    : msg.username === username
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                }`}>
                  {msg.type !== 'system' && (
                    <div className="text-xs opacity-75 mb-1">
                      {msg.username} • {formatTime(msg.timestamp)}
                    </div>
                  )}
                  <div className="break-words">{msg.message}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* MESSAGE INPUT */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!isConnected || sending}
              />
              <button
                type="submit"
                disabled={!isConnected || sending || !newMessage.trim()}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  !isConnected || sending || !newMessage.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>

        {/* WEBSOCKET INTEGRATION GUIDE */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔌 WebSocket Integration</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Real Implementation with your Spring Boot backend:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`'use client';
import { useState, useEffect } from 'react';

export default function ChatInterface() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Connect to your Spring Boot WebSocket endpoint
    const ws = new WebSocket('ws://localhost:8080/ws');
    
    ws.onopen = () => {
      console.log('Connected to Spring Boot WebSocket');
      setSocket(ws);
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setSocket(null);
    };
    
    return () => ws.close();
  }, []);
  
  const sendMessage = (text) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message: text,
        timestamp: new Date().toISOString()
      }));
    }
  };
}`}
              </pre>
            </div>
            
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>🚀 Pro Tip:</strong> Client Components can connect to any WebSocket endpoint, 
                including your existing Spring Boot WebSocket controllers. Just point the WebSocket 
                URL to your backend and handle the real-time communication!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}