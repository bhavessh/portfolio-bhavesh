import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle, Sparkles } from 'lucide-react';

const certificates = [
  {
    id: '1',
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    badge: 'AWS',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: '2',
    title: 'Meta Frontend Developer',
    issuer: 'Meta',
    date: '2023',
    badge: 'Meta',
    color: 'from-blue-600 to-blue-400',
  },
  {
    id: '3',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB',
    date: '2022',
    badge: 'MongoDB',
    color: 'from-green-500 to-green-400',
  },
  {
    id: '4',
    title: 'Google UX Design Pro',
    issuer: 'Google',
    date: '2022',
    badge: 'Google',
    color: 'from-red-500 to-orange-400',
  },
  {
    id: '5',
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    badge: 'React',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: '6',
    title: 'System Design Expert',
    issuer: 'Educative',
    date: '2023',
    badge: 'System',
    color: 'from-purple-600 to-indigo-500',
  },
];

const courses = [
  { title: 'Node.js Microservices', platform: 'Udemy', year: '2022' },
  { title: 'GraphQL Advanced', platform: 'Apollo', year: '2023' },
  { title: 'TypeScript Mastery', platform: 'Total TypeScript', year: '2023' },
  { title: 'Docker & Kubernetes', platform: 'KodeKloud', year: '2023' },
  { title: 'AI/ML Fundamentals', platform: 'Coursera', year: '2023' },
  { title: 'Three.js & WebGL', platform: 'Three.js Journey', year: '2024' },
];

export default function CertificatesMarquee() {
  const duplicatedCerts = [...certificates, ...certificates];
  const duplicatedCourses = [...courses, ...courses];

  return (
    <section id="certificates" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Credentials
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Certifications & Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Continuous learning journey. Always exploring new technologies and improving my skills.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-indigo-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-50 to-transparent z-10" />

        {/* Scrolling Certificates - Left to Right */}
        <div className="flex overflow-hidden mb-8 group">
          <motion.div
            className="flex gap-6 py-4"
            animate={{
              x: [0, -50 * certificates.length * 6],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedCerts.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="flex-shrink-0 w-72 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group/card"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/card:scale-110 transition-transform`}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{cert.title}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{cert.issuer}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.date}</span>
                      <CheckCircle className="w-3 h-3 text-green-500 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling Courses - Right to Left */}
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-4 py-2"
            animate={{
              x: [-50 * courses.length * 4, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedCourses.map((course, index) => (
              <div
                key={`${course.title}-${index}`}
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border border-gray-200 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span className="font-medium text-gray-800">{course.title}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-indigo-600">{course.platform}</span>
                <span className="ml-2 text-xs text-gray-400">({course.year})</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: 'Certifications', value: '4+' },
            { label: 'Courses Completed', value: '15+' },
            { label: 'Learning Hours', value: '200+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
