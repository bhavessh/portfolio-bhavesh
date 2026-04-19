import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, X, FileText, ExternalLink } from 'lucide-react';

interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function ExperienceWithResume() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/experience`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.length === 0) {
        setExperiences(getStaticExperiences());
      } else {
        setExperiences(data);
      }
    } catch (err) {
      setExperiences(getStaticExperiences());
    } finally {
      setLoading(false);
    }
  };

  const getStaticExperiences = (): Experience[] => [
    {
      _id: '1',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      description: 'Leading development of enterprise SaaS applications. Architecting scalable systems and mentoring junior developers.',
      achievements: ['Reduced API response time by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline'],
    },
    {
      _id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2021 - 2023',
      description: 'Built core product features from scratch. Worked across the entire stack from database design to frontend implementation.',
      achievements: ['Shipped MVP in 3 months', 'Grew user base to 10K+', 'Implemented real-time features'],
    },
    {
      _id: '3',
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      period: '2020 - 2021',
      description: 'Developed responsive web applications for various clients. Specialized in React and modern CSS frameworks.',
      achievements: ['Delivered 15+ client projects', '99% client satisfaction', 'Introduced component library'],
    },
  ];

  if (loading) {
    return (
      <section id="experience" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="h-4 bg-gray-200 rounded w-32 mb-16"></div>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 shadow-sm animate-pulse border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="experience" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Header with Resume Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-4 block">
                Resume
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Experience
              </h2>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => setShowResume(true)}
              className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl group"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">View My Resume</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                    <p className="text-lg text-gray-600">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.achievements?.map((achievement) => (
                    <span
                      key={achievement}
                      className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full font-medium border border-gray-200"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Want the full picture?</p>
                  <p className="text-sm text-gray-500">Download my complete resume</p>
                </div>
              </div>
              <a
                href="/resume.pdf"
                download="Bhavesh_Resume.pdf"
                className="px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-2xl font-bold">Bhavesh's Resume</h3>
                  <p className="text-gray-500 text-sm">Full Stack Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/resume.pdf"
                    download="Bhavesh_Resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="p-8 overflow-y-auto max-h-[70vh]">
                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Header */}
                  <div className="text-center pb-8 border-b">
                    <h1 className="text-4xl font-bold mb-2">Bhavesh</h1>
                    <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                      <span>jbhavesh.in@gmail.com</span>
                      <span>•</span>
                      <span>github.com/bhavesh</span>
                      <span>•</span>
                      <span>linkedin.com/in/bhavesh</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <section>
                    <h2 className="text-xl font-bold mb-3 text-gray-900">Professional Summary</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Passionate Full Stack Developer with 3+ years of experience building scalable web applications. 
                      Specialized in MERN stack (MongoDB, Express, React, Node.js) and modern frontend technologies. 
                      Proven track record of leading teams and delivering high-impact projects.
                    </p>
                  </section>

                  {/* Experience */}
                  <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Work Experience</h2>
                    <div className="space-y-6">
                      {experiences.map((exp) => (
                        <div key={exp._id}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <span className="text-sm text-gray-500">{exp.period}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{exp.company}</p>
                          <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {exp.achievements.map((achievement) => (
                              <li key={achievement}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Skills */}
                  <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Skills</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700">Frontend</h4>
                        <p className="text-sm text-gray-600">React, Next.js, TypeScript, Astro, Tailwind CSS</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700">Backend</h4>
                        <p className="text-sm text-gray-600">Node.js, Express, MongoDB, PostgreSQL, GraphQL</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700">Tools</h4>
                        <p className="text-sm text-gray-600">Git, Docker, AWS, Vercel, Figma</p>
                      </div>
                    </div>
                  </section>

                  {/* Education */}
                  <section>
                    <h2 className="text-xl font-bold mb-3 text-gray-900">Education</h2>
                    <div>
                      <h3 className="font-semibold">Bachelor's in Computer Science</h3>
                      <p className="text-gray-600">University Name • 2016 - 2020</p>
                    </div>
                  </section>

                  {/* Projects */}
                  <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Featured Projects</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>E-Commerce Platform - Full-stack solution with Stripe integration</li>
                      <li>Task Management SaaS - Real-time collaboration tool</li>
                      <li>AI Content Generator - GPT-powered content creation platform</li>
                      <li>Portfolio CMS - Dynamic portfolio management system</li>
                    </ul>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
