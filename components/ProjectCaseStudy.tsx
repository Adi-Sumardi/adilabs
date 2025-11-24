'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaClock, FaUsers, FaTools } from 'react-icons/fa';
import { Project } from '@/data/projects';

interface ProjectCaseStudyProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectCaseStudy({ project, isOpen, onClose }: ProjectCaseStudyProps) {
  if (!project.caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <FaTimes className="text-xl text-gray-600 dark:text-gray-300" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-amber-500 p-8 text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">{project.title}</h2>
                  <p className="text-blue-100 text-lg">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Overview */}
                  <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-600" />
                      <span className="text-sm text-muted">
                        <strong>Duration:</strong> {project.caseStudy.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-amber-600" />
                      <span className="text-sm text-muted">
                        <strong>Team:</strong> {project.caseStudy.team}
                      </span>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-3xl">🎯</span> The Challenge
                    </h3>
                    <p className="text-muted leading-relaxed">{project.caseStudy.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-3xl">💡</span> The Solution
                    </h3>
                    <p className="text-muted leading-relaxed">{project.caseStudy.solution}</p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <FaTools className="text-blue-600" /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 dark:from-blue-900/30 dark:to-amber-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <span className="text-3xl">📊</span> Results & Impact
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.caseStudy.results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg"
                        >
                          <FaCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                          <span className="text-foreground font-medium">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-3">Project Overview</h3>
                    <p className="text-muted leading-relaxed">{project.longDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
