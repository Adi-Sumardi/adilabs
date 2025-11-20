'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiAmazon,
  SiVuedotjs,
  SiFlutter,
  SiLaravel,
  SiPhp,
} from 'react-icons/si';

interface Tech {
  name: string;
  icon: React.ElementType;
  proficiency: number;
  category: string;
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const technologies: Tech[] = [
    // Frontend
    { name: 'React', icon: SiReact, proficiency: 95, category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, proficiency: 92, category: 'Frontend' },
    { name: 'Vue.js', icon: SiVuedotjs, proficiency: 85, category: 'Frontend' },
    { name: 'TypeScript', icon: SiTypescript, proficiency: 90, category: 'Frontend' },
    { name: 'JavaScript', icon: SiJavascript, proficiency: 95, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, proficiency: 93, category: 'Frontend' },

    // Backend
    { name: 'Node.js', icon: SiNodedotjs, proficiency: 90, category: 'Backend' },
    { name: 'Express', icon: SiExpress, proficiency: 88, category: 'Backend' },
    { name: 'Python', icon: SiPython, proficiency: 85, category: 'Backend' },
    { name: 'Laravel', icon: SiLaravel, proficiency: 87, category: 'Backend' },
    { name: 'PHP', icon: SiPhp, proficiency: 86, category: 'Backend' },

    // Mobile
    { name: 'Flutter', icon: SiFlutter, proficiency: 83, category: 'Mobile' },

    // Database
    { name: 'PostgreSQL', icon: SiPostgresql, proficiency: 88, category: 'Database' },
    { name: 'MongoDB', icon: SiMongodb, proficiency: 85, category: 'Database' },
    { name: 'MySQL', icon: SiMysql, proficiency: 82, category: 'Database' },

    // DevOps
    { name: 'Docker', icon: SiDocker, proficiency: 80, category: 'DevOps' },
    { name: 'Git', icon: SiGit, proficiency: 92, category: 'DevOps' },
    { name: 'AWS', icon: SiAmazon, proficiency: 75, category: 'DevOps' },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps'];

  const filteredTech = activeCategory === 'All'
    ? technologies
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Tech Stack & Tools
            </span>
            <span className="ml-3">⚡</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Powerful technologies I leverage to build exceptional solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          layout
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -10 }}
              layout
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <tech.icon className="text-5xl mb-4 text-blue-600 dark:text-blue-400 group-hover:text-amber-500 transition-colors duration-300" />

                {/* Name */}
                <h3 className="text-sm sm:text-base font-bold text-center mb-3">
                  {tech.name}
                </h3>

                {/* Proficiency Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tech.proficiency}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                  />
                </div>

                {/* Proficiency Text */}
                <p className="text-xs text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.proficiency}%
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
