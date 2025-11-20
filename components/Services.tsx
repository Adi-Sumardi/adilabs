'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPaintBrush, FaCogs, FaRobot, FaDatabase, FaCloud, FaLightbulb } from 'react-icons/fa';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: FaPaintBrush,
      title: 'Frontend Development',
      description: 'Beautiful, responsive user interfaces built with modern frameworks like React, Next.js, and Vue.js. Focus on performance, accessibility, and delightful user experiences.',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: FaCogs,
      title: 'Backend Development',
      description: 'Robust server-side applications with Node.js, Express, and Python. RESTful APIs, GraphQL, authentication, and scalable architecture designed for growth.',
      color: 'from-amber-500 to-amber-700',
    },
    {
      icon: FaRobot,
      title: 'AI Integration',
      description: 'Cutting-edge AI and machine learning integration for document processing, data extraction, automation, and intelligent decision-making systems.',
      color: 'from-blue-600 to-purple-600',
    },
    {
      icon: FaDatabase,
      title: 'Database Architecture',
      description: 'Efficient database design and optimization with PostgreSQL, MongoDB, and MySQL. Data modeling, migration strategies, and performance tuning.',
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: FaCloud,
      title: 'DevOps & Deployment',
      description: 'Streamlined deployment pipelines, Docker containerization, cloud infrastructure setup on AWS, and continuous integration/deployment strategies.',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      icon: FaLightbulb,
      title: 'Technical Consulting',
      description: 'Strategic guidance on technology choices, architecture decisions, code reviews, and best practices. Help your team level up and build better software.',
      color: 'from-amber-600 to-orange-600',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              How I Can Help
            </span>
            <span className="ml-3">🚀</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Full-stack expertise to bring your vision to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <service.icon className="text-white text-3xl" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-muted mb-6">
            Ready to start your next project?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Let&apos;s Work Together
          </a>
        </motion.div>
      </div>
    </section>
  );
}
