import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/bhavesh' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/bhavesh' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/bhavesh' },
  { icon: Mail, label: 'Email', href: 'mailto:jbhavesh.in@gmail.com' },
];

export default function ContactEmailJS() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      // You need to sign up at https://www.emailjs.com/ and create a service
      // Replace these with your actual EmailJS credentials:
      const SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g., 'service_abc123'
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'
      const USER_ID = 'YOUR_USER_ID'; // e.g., 'user_123abc456def'

      // For now, we'll simulate success
      // Uncomment the following when you have EmailJS set up:
      
      /*
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'jbhavesh.in@gmail.com',
        },
        USER_ID
      );
      */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again or email me directly at jbhavesh.in@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 block">
              FUN
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Have a project in mind? I'm always open to discussing new opportunities 
              and interesting collaborations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Project collaboration"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Tell me about your project idea..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg mb-6"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg mb-6"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 mt-4 text-center">
                  Powered by EmailJS • Delivered to jbhavesh.in@gmail.com
                </p>
              </form>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Direct Email */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Direct Contact</h3>
                <a
                  href="mailto:jbhavesh.in@gmail.com"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Email me directly</p>
                    <p className="text-sm text-gray-500">jbhavesh.in@gmail.com</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </a>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Connect Online</h3>
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <link.icon className="w-5 h-5 text-gray-600" />
                      <span className="flex-1 font-medium">{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Quick Response</h3>
                <p className="text-sm text-gray-300">
                  I typically respond within 24 hours. For urgent inquiries, 
                  please reach out via LinkedIn or Twitter.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
