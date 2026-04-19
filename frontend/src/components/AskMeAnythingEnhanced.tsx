import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Enhanced knowledge base - can be updated via database
const knowledgeBase = {
  name: "Bhavesh",
  role: "Full Stack Developer",
  email: "jbhavesh.in@gmail.com",
  location: "India",
  experience: "3+ years",
  skills: ["React", "Node.js", "MongoDB", "Express", "Astro", "TypeScript", "Tailwind CSS", "Next.js"],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack solution with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      name: "Task Management SaaS",
      description: "Collaborative project management tool",
      tech: ["Next.js", "TypeScript", "Socket.io"]
    },
    {
      name: "AI Content Generator",
      description: "AI-powered content creation with GPT",
      tech: ["React", "OpenAI", "FastAPI"]
    },
    {
      name: "Portfolio CMS",
      description: "Dynamic portfolio with CMS capabilities",
      tech: ["Astro", "React", "MongoDB", "Express"]
    }
  ],
  certifications: ["AWS Solutions Architect", "Meta Frontend Developer", "MongoDB Certified"],
  education: "Computer Science Graduate",
  interests: ["Web Development", "AI/ML", "Open Source", "UI/UX Design"],
  availability: "Open to freelance and full-time opportunities"
};

export default function AskMeAnythingEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm ${knowledgeBase.name}'s AI assistant. Ask me anything about his projects, skills, or experience!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAskMeAnything', handleOpen);
    return () => window.removeEventListener('openAskMeAnything', handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSmartResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Project-related queries
    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('made')) {
      if (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('shop')) {
        return `Bhavesh built an E-Commerce Platform with React, Node.js, MongoDB, and Stripe integration. It features real-time inventory management and a custom admin dashboard. Check it out in the Projects section!`;
      }
      if (q.includes('saas') || q.includes('task') || q.includes('management')) {
        return `The Task Management SaaS is built with Next.js, TypeScript, and Socket.io for real-time collaboration. It's designed for remote teams who need async collaboration tools.`;
      }
      if (q.includes('ai') || q.includes('content') || q.includes('gpt')) {
        return `Bhavesh created an AI Content Generator using React and OpenAI's GPT API. It helps content creators write faster while maintaining their unique voice.`;
      }
      return `Bhavesh has built several projects including:\n\n${knowledgeBase.projects.map(p => `• ${p.name}: ${p.description}`).join('\n')}\n\nClick "Why I Made This" on any project to learn more!`;
    }
    
    // Skills/Tech queries
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know')) {
      return `Bhavesh specializes in:\n\nFrontend: React, Next.js, Astro, TypeScript, Tailwind CSS\nBackend: Node.js, Express, MongoDB\nOther: Git, Docker, AWS, OpenAI API\n\nHe also has certifications in ${knowledgeBase.certifications.join(', ')}.`;
    }
    
    // Experience queries
    if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('career')) {
      return `Bhavesh has ${knowledgeBase.experience} of experience building web applications. He's worked with startups and tech companies, shipping ${knowledgeBase.projects.length}+ projects used by real users.`;
    }
    
    // Contact/Hire queries
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
      return `You can reach Bhavesh at:\n\nEmail: ${knowledgeBase.email}\n\nHe's ${knowledgeBase.availability.toLowerCase()}.`;
    }
    
    // Certifications
    if (q.includes('certif') || q.includes('degree') || q.includes('study')) {
      return `Bhavesh has earned:\n\n${knowledgeBase.certifications.map(c => `• ${c}`).join('\n')}\n\nEducation: ${knowledgeBase.education}`;
    }
    
    // About/Introduction
    if (q.includes('who') || q.includes('about') || q.includes('introduce') || q.includes('hello') || q.includes('hi')) {
      return `Hello! I'm ${knowledgeBase.name}, a ${knowledgeBase.role} with ${knowledgeBase.experience} of experience. I'm passionate about building scalable web applications and exploring new technologies like AI/ML.\n\nAsk me about my projects or skills!`;
    }
    
    // Location
    if (q.includes('where') || q.includes('location') || q.includes('from') || q.includes('live')) {
      return `Bhavesh is based in ${knowledgeBase.location} and works remotely with teams worldwide.`;
    }
    
    // Interests
    if (q.includes('interest') || q.includes('hobby') || q.includes('like') || q.includes('passion')) {
      return `Bhavesh is passionate about:\n\n${knowledgeBase.interests.map(i => `• ${i}`).join('\n')}\n\nHe's always learning and exploring new technologies!`;
    }
    
    // Default response
    return `I'm Bhavesh's AI assistant. I can tell you about:\n\n• His projects and portfolio\n• Technical skills and stack\n• Work experience\n• How to contact him\n• Certifications and education\n\nWhat would you like to know?`;
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

    // Simulate processing delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    const aiResponse = getSmartResponse(userMessage.content);

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
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                      Ask {knowledgeBase.name}'s AI
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </h3>
                    <p className="text-white/80 text-xs">Smart assistant • Powered by your data</p>
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
              <div className="h-80 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
                      }`}
                    >
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-sm whitespace-pre-line ${
                        message.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                      <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about projects, skills, experience..."
                    className="flex-1 px-5 py-3.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Try: "What projects have you built?" or "What are your skills?"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
}
