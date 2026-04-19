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
          className="fixed inset-0 z-[100] bg-gray-900 overflow-y-auto"
        >
          {/* Header - Dark Solid Background */}
          <div className="sticky top-0 z-10 bg-gray-800 border-b-2 border-gray-700 shadow-lg">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors group border border-gray-600"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back</span>
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

          {/* Content - Dark Solid Background */}
          <div ref={contentRef} className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-6 py-12 max-w-5xl">
            {/* Title Section */}
            <div className="mb-12">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4 text-white">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium bg-gray-800 text-gray-200 rounded-full border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Why I Made This Section */}
            {(project.whyMade || project.idea) && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Why I Made This</h2>
                    <p className="text-gray-400 text-sm mt-1">The story and inspiration behind this project</p>
                  </div>
                </div>

                <div className="bg-gray-800 border-4 border-orange-500 rounded-2xl p-8 md:p-12 shadow-xl">
                  {project.idea && (
                    <div className="mb-8 pb-8 border-b-4 border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">The Idea</h3>
                      </div>
                      <div className="bg-gray-900 border-l-4 border-blue-500 p-6 rounded-r-xl">
                        <p className="text-gray-300 leading-relaxed text-lg">{project.idea}</p>
                      </div>
                    </div>
                  )}

                  {project.whyMade && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white text-xl">★</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">The Story Behind</h3>
                      </div>
                      <div className="bg-gray-900 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">{project.whyMade}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Images Gallery */}
            {project.images && project.images.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Project Gallery</h2>
                    <p className="text-gray-400 text-sm mt-1">Screenshots and visuals from the project</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 border-2 border-gray-700 group cursor-pointer"
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
                              <div class="w-full h-full flex items-center justify-center bg-gray-800 border-2 border-gray-700">
                                <span class="text-gray-500">Image ${index + 1}</span>
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
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Video Walkthrough</h2>
                    <p className="text-gray-400 text-sm mt-1">Watch the project in action</p>
                  </div>
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
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Technical Details</h2>
                  <p className="text-gray-400 text-sm mt-1">Technologies and resources used</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 border-4 border-blue-500 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-xl mb-4 text-white flex items-center gap-3">
                    <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">Tech</span>
                    </span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 border-4 border-green-500 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-xl mb-4 text-white flex items-center gap-3">
                    <span className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">Link</span>
                    </span>
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-medium">Live Demo</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-medium">GitHub Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
