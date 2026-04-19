import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Save, LogOut, Folder, Briefcase, MessageSquare, CheckCircle, Zap, Map, User, Globe, FileText, Link2, Mail, Phone, MapPin } from 'lucide-react';

interface Project {
  _id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  githubLink: string;
  whyMade?: string;
  idea?: string;
  images?: string[];
  videoUrl?: string;
}

interface Experience {
  _id?: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Skill {
  _id?: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'database' | 'devops' | 'other';
  order: number;
}

interface Journey {
  _id?: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: 'education' | 'creative' | 'milestone' | 'career' | 'other';
  order: number;
}

interface About {
  _id?: string;
  name: string;
  tagline: string;
  description: string;
  journeyTitle: string;
  journeyText: string;
  approachTitle: string;
  approachText: string;
  beyondTitle: string;
  beyondText: string;
  email: string;
  location: string;
  availability: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  order: number;
}

interface SiteConfig {
  _id?: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
  resumeDriveLink: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  siteTitle: string;
  siteDescription: string;
  // Stats
  statsYears?: string;
  statsYearsLabel?: string;
  statsProjects?: string;
  statsProjectsLabel?: string;
  statsSaas?: string;
  statsSaasLabel?: string;
  statsClients?: string;
  statsClientsLabel?: string;
}

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'skills' | 'journey' | 'about' | 'siteconfig' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [editingItem, setEditingItem] = useState<Project | Experience | Skill | Journey | About | SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, activeTab]);

  // Keyboard shortcut: Shift + A to open admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [dbConnected, setDbConnected] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'projects') {
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProjects(data);
        setDbConnected(true);
      } else if (activeTab === 'experience') {
        const res = await fetch(`${API_URL}/experience`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setExperiences(data);
        setDbConnected(true);
      } else if (activeTab === 'skills') {
        const res = await fetch(`${API_URL}/skills`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSkills(data);
        setDbConnected(true);
      } else if (activeTab === 'journey') {
        const res = await fetch(`${API_URL}/journey`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setJourneys(data);
        setDbConnected(true);
      } else if (activeTab === 'about') {
        const res = await fetch(`${API_URL}/about`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setAbout(data);
        setDbConnected(true);
      } else if (activeTab === 'siteconfig') {
        const res = await fetch(`${API_URL}/siteconfig`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSiteConfig(data);
        setDbConnected(true);
      } else if (activeTab === 'messages') {
        const res = await fetch(`${API_URL}/contact`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setMessages(data);
        setUnreadCount(data.filter((m: ContactMessage) => !m.read).length);
        setDbConnected(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setDbConnected(false);
    }
    setIsLoading(false);
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await fetch(`${API_URL}/contact/${id}/read`, { method: 'PUT' });
      fetchData();
    } catch (error) {
      console.error('Mark read error:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`${API_URL}/contact/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Simple client-side auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'JAIN@sabh*1008') {
      setIsLoggedIn(true);
      setPassword('');
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Invalid password');
    }
  };

  // Check if already logged in
  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  const handleSave = async (item: Project | Experience | Skill | Journey | About | SiteConfig) => {
    try {
      let endpoint: string;
      
      // Determine endpoint based on item type
      if ('category' in item && typeof item.category === 'string' && ['frontend', 'backend', 'tools', 'database', 'devops', 'other'].includes(item.category)) {
        endpoint = 'skills';
      } else if ('year' in item) {
        endpoint = 'journey';
      } else if ('tagline' in item) {
        endpoint = 'about';
      } else if ('socialLinks' in item) {
        endpoint = 'siteconfig';
      } else if ('company' in item) {
        endpoint = 'experience';
      } else if ('title' in item && 'category' in item) {
        endpoint = 'projects';
      } else {
        endpoint = 'experience';
      }
      
      const method = item._id ? 'PUT' : 'POST';
      // Site config is a singleton - PUT to /siteconfig without ID
      const url = item._id && endpoint !== 'siteconfig' 
        ? `${API_URL}/${endpoint}/${item._id}` 
        : `${API_URL}/${endpoint}`;

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer JAIN@sabh*1008`
        },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        setEditingItem(null);
        fetchData();
      } else {
        const errData = await res.json().catch(() => ({ message: 'Save failed' }));
        alert(`Error: ${errData.message || 'Save failed'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Network error. Check console for details.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const endpointMap: Record<string, string> = {
        projects: 'projects',
        experience: 'experience',
        skills: 'skills',
        journey: 'journey',
        about: 'about',
        siteconfig: 'siteconfig'
      };
      const endpoint = endpointMap[activeTab] || 'experience';
      await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-black transition-all flex items-center justify-center z-50"
        title="Admin Panel (Shift+A)"
      >
        <Edit2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1a1a2e] text-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">CMS Admin</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isLoggedIn ? (
            <div className="p-8">
              <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
                <h3 className="text-lg font-medium text-center text-white">Admin Login</h3>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#b8e600]"
                >
                  Login
                </button>
                <p className="text-sm text-white/50 text-center">Enter admin password</p>
              </form>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-white/10 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'projects' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <Folder className="w-4 h-4" />
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'experience' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <Briefcase className="w-4 h-4" />
                  Experience
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'skills' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <Zap className="w-4 h-4" />
                  Skills
                </button>
                <button
                  onClick={() => setActiveTab('journey')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'journey' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <Map className="w-4 h-4" />
                  Journey
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'about' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <User className="w-4 h-4" />
                  About
                </button>
                <button
                  onClick={() => setActiveTab('siteconfig')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'siteconfig' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <Globe className="w-4 h-4" />
                  Site Config
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'messages' ? 'border-b-2 border-[#ccff00] font-medium text-[#ccff00]' : 'text-white/60 hover:text-white'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex items-center gap-2 px-6 py-4 text-white/60 hover:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {!dbConnected && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4">
                    <p className="font-medium">Database Not Connected</p>
                    <p className="text-sm">Add your MongoDB password to backend/.env to enable data saving.</p>
                  </div>
                )}
                {isLoading ? (
                  <div className="text-center py-8">
                    {!dbConnected ? (
                      <div className="text-white/60">
                        <p className="font-medium mb-2">Unable to load data</p>
                        <p className="text-sm">Database connection failed. Check your MongoDB password in backend/.env</p>
                        <button 
                          onClick={fetchData}
                          className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white"
                        >
                          Retry Connection
                        </button>
                      </div>
                    ) : (
                      <div className="animate-pulse text-gray-400">Loading...</div>
                    )}
                  </div>
                ) : editingItem ? (
                  <EditForm
                    item={editingItem}
                    onSave={handleSave}
                    onCancel={() => setEditingItem(null)}
                  />
                ) : (
                  <div className="space-y-4">
                    {activeTab !== 'messages' && activeTab !== 'about' && activeTab !== 'siteconfig' && (
                      <button
                        onClick={() => {
                          if (activeTab === 'projects') {
                            setEditingItem({ title: '', description: '', category: 'FULL STACK', tags: [], link: '', githubLink: '', whyMade: '', idea: '', images: [], videoUrl: '' });
                          } else if (activeTab === 'experience') {
                            setEditingItem({ title: '', company: '', period: '', description: '', achievements: [] });
                          } else if (activeTab === 'skills') {
                            setEditingItem({ name: '', category: 'frontend', order: 0 });
                          } else if (activeTab === 'journey') {
                            setEditingItem({ year: '', title: '', subtitle: '', description: '', icon: '💻', category: 'milestone', order: 0 });
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#b8e600]"
                      >
                        <Plus className="w-4 h-4" />
                        Add New
                      </button>
                    )}
                    {activeTab === 'about' && about && (
                      <button
                        onClick={() => setEditingItem(about)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#b8e600]"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit About
                      </button>
                    )}

                    {activeTab === 'siteconfig' && siteConfig && (
                      <button
                        onClick={() => setEditingItem(siteConfig)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#b8e600]"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Site Config
                      </button>
                    )}

                    {activeTab === 'projects' ? (
                      projects.map((project) => (
                        <div key={project._id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 bg-white/5">
                          <div>
                            <h4 className="font-medium text-white">{project.title}</h4>
                            <p className="text-sm text-white/50">{project.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingItem(project)}
                              className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => project._id && handleDelete(project._id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'experience' ? (
                      experiences.map((exp) => (
                        <div key={exp._id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 bg-white/5">
                          <div>
                            <h4 className="font-medium text-white">{exp.title}</h4>
                            <p className="text-sm text-white/50">{exp.company} • {exp.period}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingItem(exp)}
                              className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => exp._id && handleDelete(exp._id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'skills' ? (
                      skills.map((skill) => (
                        <div key={skill._id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 bg-white/5">
                          <div>
                            <h4 className="font-medium text-white">{skill.name}</h4>
                            <p className="text-sm text-white/50">{skill.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingItem(skill)}
                              className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => skill._id && handleDelete(skill._id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'journey' ? (
                      journeys.map((j) => (
                        <div key={j._id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 bg-white/5">
                          <div>
                            <h4 className="font-medium text-white">{j.icon} {j.title}</h4>
                            <p className="text-sm text-white/50">{j.year} • {j.category}</p>
                            <p className="text-sm text-white/40">{j.subtitle}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingItem(j)}
                              className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => j._id && handleDelete(j._id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'about' ? (
                      about ? (
                        <div className="space-y-4">
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">Name & Tagline</h4>
                            <p className="text-white">{about.name} - {about.tagline}</p>
                            <p className="text-white/70 text-sm mt-1">{about.description}</p>
                          </div>
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">About Cards</h4>
                            <div className="space-y-2 text-sm">
                              <p className="text-white"><strong className="text-white/80">{about.journeyTitle}:</strong> {about.journeyText}</p>
                              <p className="text-white"><strong className="text-white/80">{about.approachTitle}:</strong> {about.approachText}</p>
                              <p className="text-white"><strong className="text-white/80">{about.beyondTitle}:</strong> {about.beyondText}</p>
                            </div>
                          </div>
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">Contact Info</h4>
                            <p className="text-white/70 text-sm">{about.email} • {about.location} • {about.availability}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-white/50 py-8">Loading about data...</p>
                      )
                    ) : activeTab === 'siteconfig' ? (
                      siteConfig ? (
                        <div className="space-y-4">
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">Social Links</h4>
                            <div className="space-y-2">
                              {siteConfig.socialLinks?.map((link, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <span className="text-white/60">{link.name}:</span>
                                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#ccff00] hover:underline truncate">{link.url}</a>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">Resume</h4>
                            <p className="text-white/70 text-sm">{siteConfig.resumeDriveLink || 'No resume link set'}</p>
                          </div>
                          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <h4 className="font-medium text-[#ccff00] mb-2">Contact Info</h4>
                            <p className="text-white/70 text-sm">Email: {siteConfig.contactEmail}</p>
                            <p className="text-white/70 text-sm">Phone: {siteConfig.contactPhone || 'N/A'}</p>
                            <p className="text-white/70 text-sm">Location: {siteConfig.contactLocation}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-white/50 py-8">Loading site config...</p>
                      )
                    ) : (
                      <div className="space-y-4">
                        {messages.length === 0 ? (
                          <p className="text-center text-white/50 py-8">No messages yet</p>
                        ) : (
                          messages.map((msg) => (
                            <div 
                              key={msg._id} 
                              className={`p-4 border border-white/10 rounded-lg ${msg.read ? 'bg-white/5' : 'bg-[#ccff00]/10 border-[#ccff00]/30'}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-white">{msg.name}</h4>
                                    {!msg.read && (
                                      <span className="bg-[#ccff00] text-black text-xs font-bold px-2 py-0.5 rounded-full">New</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-white/50 mb-2">{msg.email}</p>
                                  {msg.subject && (
                                    <p className="font-medium text-[#ccff00] mb-2">{msg.subject}</p>
                                  )}
                                  <p className="text-white/80 whitespace-pre-wrap">{msg.message}</p>
                                  <p className="text-xs text-white/40 mt-2">
                                    {new Date(msg.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  {!msg.read && (
                                    <button
                                      onClick={() => markMessageAsRead(msg._id)}
                                      className="p-2 hover:bg-[#ccff00]/20 text-[#ccff00] rounded-lg"
                                      title="Mark as read"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteMessage(msg._id)}
                                    className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EditForm({ item, onSave, onCancel }: { item: any; onSave: (item: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(item);
  
  // Determine item type
  const isProject = 'tags' in item;
  const isSkill = 'name' in item && 'category' in item && ['frontend', 'backend', 'tools', 'database', 'devops', 'other'].includes(item.category);
  const isJourney = 'year' in item && 'icon' in item;
  const isAbout = 'tagline' in item;
  const isExperience = 'company' in item;
  const isSiteConfig = 'socialLinks' in item;
  
  const getTitle = () => {
    if (isProject) return 'Project';
    if (isSkill) return 'Skill';
    if (isJourney) return 'Journey Milestone';
    if (isAbout) return 'About Section';
    if (isSiteConfig) return 'Site Configuration';
    if (isExperience) return 'Experience';
    return 'Item';
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-4"
    >
      <h3 className="text-lg font-medium mb-4 text-white">{item._id ? 'Edit' : 'Add New'} {getTitle()}</h3>

      {isProject ? (
        <ProjectForm formData={formData} setFormData={setFormData} />
      ) : isSkill ? (
        <SkillForm formData={formData} setFormData={setFormData} />
      ) : isJourney ? (
        <JourneyForm formData={formData} setFormData={setFormData} />
      ) : isAbout ? (
        <AboutForm formData={formData} setFormData={setFormData} />
      ) : isSiteConfig ? (
        <SiteConfigForm formData={formData} setFormData={setFormData} />
      ) : isExperience ? (
        <ExperienceForm formData={formData} setFormData={setFormData} />
      ) : null}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#b8e600]"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ProjectForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white focus:border-[#ccff00] focus:outline-none"
          >
            <option className="bg-[#1a1a2e]">FULL STACK</option>
            <option className="bg-[#1a1a2e]">SAAS</option>
            <option className="bg-[#1a1a2e]">AI/ML</option>
            <option className="bg-[#1a1a2e]">CMS</option>
            <option className="bg-[#1a1a2e]">MOBILE</option>
            <option className="bg-[#1a1a2e]">OTHER</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map((t: string) => t.trim()) })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Live Link</label>
          <input
            type="url"
            value={formData.link || ''}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">GitHub Link</label>
          <input
            type="url"
            value={formData.githubLink || ''}
            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            rows={3}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">The Idea (Why this project?)</label>
          <textarea
            value={formData.idea || ''}
            onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            rows={2}
            placeholder="What problem does this solve?"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Story Behind</label>
          <textarea
            value={formData.whyMade || ''}
            onChange={(e) => setFormData({ ...formData, whyMade: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            rows={4}
            placeholder="Detailed story about building this project..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Images (comma separated URLs)</label>
          <input
            type="text"
            value={formData.images?.join(', ') || ''}
            onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map((i: string) => i.trim()).filter(Boolean) })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="/images/project1.jpg, /images/project2.jpg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Video URL</label>
          <input
            type="url"
            value={formData.videoUrl || ''}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>
    </div>
  );
}

function SkillForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Skill Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white focus:border-[#ccff00] focus:outline-none"
        >
          <option className="bg-[#1a1a2e]" value="frontend">Frontend</option>
          <option className="bg-[#1a1a2e]" value="backend">Backend</option>
          <option className="bg-[#1a1a2e]" value="database">Database</option>
          <option className="bg-[#1a1a2e]" value="tools">Tools</option>
          <option className="bg-[#1a1a2e]" value="devops">DevOps</option>
          <option className="bg-[#1a1a2e]" value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Order (for sorting)</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="0"
        />
      </div>
    </div>
  );
}

function JourneyForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Year</label>
        <input
          type="text"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="2024"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="Senior Developer"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="Leadership Role"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Icon (emoji)</label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="💻"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white focus:border-[#ccff00] focus:outline-none"
        >
          <option className="bg-[#1a1a2e]" value="education">Education</option>
          <option className="bg-[#1a1a2e]" value="creative">Creative</option>
          <option className="bg-[#1a1a2e]" value="milestone">Milestone</option>
          <option className="bg-[#1a1a2e]" value="career">Career</option>
          <option className="bg-[#1a1a2e]" value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white/80">Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          placeholder="0"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-white/80">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          rows={3}
          placeholder="Describe this milestone..."
          required
        />
      </div>
    </div>
  );
}

function AboutForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Tagline</label>
          <input
            type="text"
            value={formData.tagline || ''}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Availability</label>
          <input
            type="text"
            value={formData.availability || ''}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          />
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-white/80">Hero Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
          rows={2}
        />
      </div>
      
      <div className="border-t border-white/10 pt-4 mt-4">
        <h4 className="text-sm font-medium text-[#ccff00] mb-3">About Cards</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Journey Card Title</label>
            <input
              type="text"
              value={formData.journeyTitle || ''}
              onChange={(e) => setFormData({ ...formData, journeyTitle: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white/80">Journey Card Text</label>
            <textarea
              value={formData.journeyText || ''}
              onChange={(e) => setFormData({ ...formData, journeyText: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Approach Card Title</label>
            <input
              type="text"
              value={formData.approachTitle || ''}
              onChange={(e) => setFormData({ ...formData, approachTitle: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white/80">Approach Card Text</label>
            <textarea
              value={formData.approachText || ''}
              onChange={(e) => setFormData({ ...formData, approachText: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Beyond Card Title</label>
            <input
              type="text"
              value={formData.beyondTitle || ''}
              onChange={(e) => setFormData({ ...formData, beyondTitle: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white/80">Beyond Card Text</label>
            <textarea
              value={formData.beyondText || ''}
              onChange={(e) => setFormData({ ...formData, beyondText: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Company</label>
          <input
            type="text"
            value={formData.company || ''}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Period</label>
          <input
            type="text"
            value={formData.period || ''}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="2023 - Present"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="City, Country"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            rows={3}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Achievements (comma separated)</label>
          <textarea
            value={formData.achievements?.join(', ') || ''}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split(',').map((a: string) => a.trim()).filter(Boolean) })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            rows={2}
            placeholder="Key achievement 1, Key achievement 2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={formData.tech?.join(', ') || ''}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Color</label>
          <input
            type="text"
            value={formData.color || ''}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="#3b82f6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">Order</label>
          <input
            type="number"
            value={formData.order || 0}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}

function SiteConfigForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...(formData.socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...(formData.socialLinks || []), { name: '', url: '', icon: 'link', order: formData.socialLinks?.length || 0 }]
    });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = formData.socialLinks?.filter((_: any, i: number) => i !== index) || [];
    setFormData({ ...formData, socialLinks: newLinks });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <h4 className="font-medium text-[#ccff00] mb-4 flex items-center gap-2">
          <Link2 className="w-4 h-4" /> Social Links
        </h4>
        <div className="space-y-3">
          {(formData.socialLinks || []).map((link: any, index: number) => (
            <div key={index} className="grid md:grid-cols-3 gap-3 p-3 border border-white/10 rounded-lg bg-white/5">
              <div>
                <label className="block text-xs font-medium mb-1 text-white/60">Name</label>
                <input
                  type="text"
                  value={link.name || ''}
                  onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none text-sm"
                  placeholder="YouTube"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-white/60">URL</label>
                <input
                  type="text"
                  value={link.url || ''}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1 text-white/60">Icon</label>
                  <input
                    type="text"
                    value={link.icon || ''}
                    onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none text-sm"
                    placeholder="youtube, github, linkedin, twitter"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSocialLink}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm"
        >
          <Plus className="w-4 h-4" /> Add Social Link
        </button>
      </div>

      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <h4 className="font-medium text-[#ccff00] mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Resume
        </h4>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-white/80">Google Drive Link</label>
          <input
            type="text"
            value={formData.resumeDriveLink || ''}
            onChange={(e) => setFormData({ ...formData, resumeDriveLink: e.target.value })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
            placeholder="https://drive.google.com/..."
          />
        </div>
      </div>

      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <h4 className="font-medium text-[#ccff00] mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4" /> Contact Info
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Email</label>
            <input
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Phone</label>
            <input
              type="text"
              value={formData.contactPhone || ''}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white/80">Location</label>
            <input
              type="text"
              value={formData.contactLocation || ''}
              onChange={(e) => setFormData({ ...formData, contactLocation: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="Remote / Global"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <h4 className="font-medium text-[#ccff00] mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Stats (Hero Section)
        </h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Years Value</label>
            <input
              type="text"
              value={formData.statsYears || ''}
              onChange={(e) => setFormData({ ...formData, statsYears: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="6+"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Years Label</label>
            <input
              type="text"
              value={formData.statsYearsLabel || ''}
              onChange={(e) => setFormData({ ...formData, statsYearsLabel: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="Years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Projects Value</label>
            <input
              type="text"
              value={formData.statsProjects || ''}
              onChange={(e) => setFormData({ ...formData, statsProjects: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="15+"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Projects Label</label>
            <input
              type="text"
              value={formData.statsProjectsLabel || ''}
              onChange={(e) => setFormData({ ...formData, statsProjectsLabel: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="Projects"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">SaaS Value</label>
            <input
              type="text"
              value={formData.statsSaas || ''}
              onChange={(e) => setFormData({ ...formData, statsSaas: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="5+"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">SaaS Label</label>
            <input
              type="text"
              value={formData.statsSaasLabel || ''}
              onChange={(e) => setFormData({ ...formData, statsSaasLabel: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="SaaS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Clients Value</label>
            <input
              type="text"
              value={formData.statsClients || ''}
              onChange={(e) => setFormData({ ...formData, statsClients: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="10+"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/80">Clients Label</label>
            <input
              type="text"
              value={formData.statsClientsLabel || ''}
              onChange={(e) => setFormData({ ...formData, statsClientsLabel: e.target.value })}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#ccff00] focus:outline-none"
              placeholder="Clients"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
