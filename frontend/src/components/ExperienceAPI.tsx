import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function ExperienceAPI() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

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
      console.error('API error, using static data:', err);
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
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Experience</h2>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-l-2 border-gray-200 pl-8 relative"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-black rounded-full" />

              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h3 className="text-2xl font-semibold">{exp.title}</h3>
                <span className="text-gray-400">|</span>
                <span className="text-lg text-gray-600">{exp.company}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>

              <p className="text-gray-600 mb-4 max-w-2xl">
                {exp.description}
              </p>

              <ul className="flex flex-wrap gap-3">
                {exp.achievements?.map((achievement) => (
                  <li
                    key={achievement}
                    className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
