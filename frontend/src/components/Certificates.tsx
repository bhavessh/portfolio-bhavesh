import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const certificates = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    expiry: '2026',
    credentialId: 'AWS-ASA-12345',
    link: '#',
    badge: '/certificates/aws-sa.png',
    skills: ['Cloud Architecture', 'EC2', 'S3', 'Lambda'],
  },
  {
    id: '2',
    title: 'Meta Frontend Developer',
    issuer: 'Meta (Facebook)',
    date: '2023',
    expiry: null,
    credentialId: 'META-FD-67890',
    link: '#',
    badge: '/certificates/meta-frontend.png',
    skills: ['React', 'JavaScript', 'UI Design'],
  },
  {
    id: '3',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    date: '2022',
    expiry: null,
    credentialId: 'MDB-DEV-54321',
    link: '#',
    badge: '/certificates/mongodb.png',
    skills: ['Database Design', 'Aggregation', 'Atlas'],
  },
  {
    id: '4',
    title: 'Google UX Design Professional',
    issuer: 'Google',
    date: '2022',
    expiry: null,
    credentialId: 'GOOGLE-UX-98765',
    link: '#',
    badge: '/certificates/google-ux.png',
    skills: ['User Research', 'Wireframing', 'Prototyping'],
  },
];

const courses = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    platform: 'Frontend Masters',
    completed: '2023',
    duration: '8 hours',
  },
  {
    id: '2',
    title: 'System Design for Interviews',
    platform: 'Educative',
    completed: '2023',
    duration: '20 hours',
  },
  {
    id: '3',
    title: 'Node.js Microservices',
    platform: 'Udemy',
    completed: '2022',
    duration: '12 hours',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4 block">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certifications & Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Continuous learning is key. Here are my professional certifications and completed courses.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Badge Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.title}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-2">{cert.issuer}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Issued: {cert.date}
                    </span>
                    {cert.expiry && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Valid until: {cert.expiry}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-400 mb-2">ID: {cert.credentialId}</p>

                  {cert.link && cert.link !== '#' && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View Credential
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Courses</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/50 hover:bg-white/80 transition-all duration-300"
            >
              <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
              <p className="text-sm text-indigo-600 mb-1">{course.platform}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Completed: {course.completed}</span>
                <span>{course.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
