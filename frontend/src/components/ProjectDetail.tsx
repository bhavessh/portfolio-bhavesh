import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { X, ExternalLink, Lightbulb, Image as ImageIcon, Video, FileText, ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    link: string;
    githubLink?: string;
    whyMade?: string;
    idea?: string;
    images?: string[];
    videoUrl?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetail({ project, isOpen, onClose }: ProjectDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Projects</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="container mx-auto px-6 py-12 max-w-5xl">
            {/* Title Section */}
            <div className="mb-12">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Why I Made This Section */}
            {(project.whyMade || project.idea) && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Why I Made This</h2>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
                  {project.idea && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">The Idea</h3>
                      <p className="text-gray-700 leading-relaxed">{project.idea}</p>
                    </div>
                  )}

                  {project.whyMade && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">The Story Behind</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{project.whyMade}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Images Gallery */}
            {project.images && project.images.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h2 className="text-2xl font-bold">Project Gallery</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                <span class="text-gray-400">Image ${index + 1}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Video Section */}
            {project.videoUrl && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-gray-700" />
                  </div>
                  <h2 className="text-2xl font-bold">Video Walkthrough</h2>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900">
                  {project.videoUrl.includes('youtube') || project.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={project.videoUrl.replace('watch?v=', 'embed/')}
                      title="Project video"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={project.videoUrl}
                      controls
                      className="w-full h-full"
                      poster="/images/video-poster.jpg"
                    />
                  )}
                </div>
              </section>
            )}

            {/* Technical Details */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold">Technical Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="text-sm text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Links</h3>
                  <div className="space-y-2">
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        GitHub Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
