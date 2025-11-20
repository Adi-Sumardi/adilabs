'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects, categories } from '@/data/projects';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Projects That Matter
            </span>
            <span className="ml-3">💎</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Explore my portfolio of applications that solve real-world problems
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ Featured
                </div>
              )}

              {/* Project Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600 to-amber-500 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-90 group-hover:scale-110 transition-transform duration-500">
                  {project.category === 'AI/ML' ? '🤖' : project.category === 'Enterprise' ? '🏢' : '💻'}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:bg-amber-400 transition-colors"
                      >
                        <FaExternalLinkAlt className="text-blue-900" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:bg-amber-400 transition-colors"
                      >
                        <FaGithub className="text-blue-900" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-muted mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Long Description */}
                <p className="text-sm text-muted mb-4 line-clamp-3">
                  {project.longDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-amber-100 dark:from-blue-900/30 dark:to-amber-900/30 text-blue-700 dark:text-amber-300 rounded-full text-xs font-medium">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-600 dark:group-hover:border-amber-500 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Link */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
