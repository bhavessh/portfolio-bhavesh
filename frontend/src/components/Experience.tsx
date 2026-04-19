import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    period: '2023 - Present',
    description: 'Leading development of enterprise SaaS applications. Architecting scalable systems and mentoring junior developers.',
    achievements: ['Reduced API response time by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline'],
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2021 - 2023',
    description: 'Built core product features from scratch. Worked across the entire stack from database design to frontend implementation.',
    achievements: ['Shipped MVP in 3 months', 'Grew user base to 10K+', 'Implemented real-time features'],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency Pro',
    period: '2020 - 2021',
    description: 'Developed responsive web applications for various clients. Specialized in React and modern CSS frameworks.',
    achievements: ['Delivered 15+ client projects', '99% client satisfaction', 'Introduced component library'],
  },
];

export default function Experience() {
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
              key={exp.title}
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
                {exp.achievements.map((achievement) => (
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
