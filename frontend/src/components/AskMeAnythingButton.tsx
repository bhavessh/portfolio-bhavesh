import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AskMeAnythingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Bhavesh's AI assistant. Ask me anything about his projects, experience, or thoughts behind his work!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAskMeAnything', handleOpen);
    return () => window.removeEventListener('openAskMeAnything', handleOpen);
  }, []);

  const getAIResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('project') || lowerQ.includes('work')) {
      return "Bhavesh has built several projects including an E-Commerce Platform, Task Management SaaS, AI Content Generator, and this Portfolio CMS. Click on 'Why I Made This' on any project to learn more!";
    }
    if (lowerQ.includes('skill') || lowerQ.includes('tech') || lowerQ.includes('stack')) {
      return "Bhavesh specializes in the MERN stack (MongoDB, Express, React, Node.js) plus Astro, TypeScript, and modern web technologies.";
    }
    if (lowerQ.includes('experience') || lowerQ.includes('job')) {
      return "Bhavesh has 3+ years of experience building web applications for startups and tech companies.";
    }
    if (lowerQ.includes('contact') || lowerQ.includes('email') || lowerQ.includes('reach')) {
      return "You can reach Bhavesh at jbhavesh.in@gmail.com or use the contact form on this page!";
    }
    if (lowerQ.includes('why') || lowerQ.includes('made') || lowerQ.includes('create')) {
      return "Bhavesh builds projects to solve real problems. Check out any project's 'Why I Made This' section to understand his thought process!";
    }
    if (lowerQ.includes('hire') || lowerQ.includes('job') || lowerQ.includes('work with')) {
      return "Bhavesh is open to new opportunities! Reach out via email at jbhavesh.in@gmail.com";
    }
    if (lowerQ.includes('hello') || lowerQ.includes('hi') || lowerQ.includes('hey')) {
      return "Hello! 👋 Ask me about Bhavesh's projects, skills, experience, or anything else!";
    }
    
    return "Great question! Bhavesh is a full-stack developer passionate about building impactful products. Contact him at jbhavesh.in@gmail.com for more details!";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const aiResponse = getAIResponse(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Ask Bhavesh's AI</h3>
                    <p className="text-white/70 text-xs">Ask anything about Bhavesh!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.role === 'user'
                          ? 'bg-black text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Bhavesh's projects, skills..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
