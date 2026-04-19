import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/bhavesh' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/bhavesh' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/bhavesh' },
  { icon: Mail, label: 'Email', href: 'mailto:jbhavesh.in@gmail.com' },
];

export default function ContactEmailJSWorking() {
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

    let emailSent = false;
    let dbSaved = false;

    try {
      // Try to save to your backend database (optional - won't break if fails)
      try {
        const dbResponse = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });
        if (dbResponse.ok) dbSaved = true;
      } catch (dbError) {
        console.log('DB save failed (email will still send):', dbError);
      }

      // Send email via FormSubmit.co (this is the important part)
      const emailResponse = await fetch('https://formsubmit.co/ajax/jbhavesh.in@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: 'New Portfolio Message from ' + formData.name,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (emailResponse.ok) {
        emailSent = true;
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Email failed');
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please email me directly at jbhavesh.in@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 theme-bg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4 block">
              Let us Connect
            </span>
            <h2 className="text-4xl md:text-6xl font-bold theme-text mb-4">
              Get In Touch
            </h2>
            <p className="theme-text-secondary max-w-xl mx-auto text-lg">
              Have a project in mind? I am always open to discussing new opportunities and interesting collaborations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="theme-bg-card backdrop-blur-sm rounded-3xl p-8 md:p-10 border theme-border"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold theme-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 theme-bg-card border theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all theme-text placeholder-theme-text-muted/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold theme-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 theme-bg-card border theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all theme-text placeholder-theme-text-muted/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-semibold theme-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 theme-bg-card border theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all theme-text placeholder-theme-text-muted/50"
                    placeholder="Project collaboration opportunity"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-semibold theme-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 theme-bg-card border theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all resize-none theme-text placeholder-theme-text-muted/50"
                    placeholder="Tell me about your project idea..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl mb-6 border border-[var(--accent)]/20"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-xl mb-6 border border-red-500/20"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[var(--accent)] text-[var(--bg-primary)] rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs theme-text-muted mt-4 text-center">
                  Powered by FormSubmit - Direct to jbhavesh.in@gmail.com
                </p>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-[var(--accent)] rounded-3xl p-8 text-[var(--bg-primary)] shadow-lg">
                <div className="w-14 h-14 bg-[var(--bg-primary)]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Email Me Directly</h3>
                <p className="text-[var(--bg-primary)]/60 mb-4">Prefer to email directly? Reach me anytime at:</p>
                <a
                  href="mailto:jbhavesh.in@gmail.com"
                  className="text-xl font-semibold text-[var(--bg-primary)] hover:opacity-70 transition-colors break-all"
                >
                  jbhavesh.in@gmail.com
                </a>
              </div>

              <div className="theme-bg-card backdrop-blur-sm rounded-3xl p-8 border theme-border">
                <h3 className="text-xl font-bold theme-text mb-6">Connect Online</h3>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--accent)]/10 transition-colors group"
                    >
                      <div className="w-12 h-12 theme-bg-card rounded-xl flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors border theme-border">
                        <link.icon className="w-5 h-5 theme-text-secondary group-hover:text-[var(--accent)]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold theme-text group-hover:text-[var(--accent)]">{link.label}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 theme-text-muted group-hover:text-[var(--accent)] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="theme-bg-card rounded-3xl p-8 border theme-border">
                <h3 className="text-xl font-bold text-[var(--accent)] mb-3">Quick Response</h3>
                <p className="theme-text-secondary">
                  I typically respond within 24 hours. For urgent matters, email me directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
