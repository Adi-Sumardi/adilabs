'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [displayedRole, setDisplayedRole] = useState('');
  const roles = ['Fullstack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedRole.length > 0) {
          setDisplayedRole(displayedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex, roles]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-800 to-amber-600 opacity-90" />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-amber-400 rounded-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-300 rounded-full"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 text-6xl opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {'</>'}
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-amber-300 rotate-45"
          animate={{
            y: [0, 40, 0],
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-amber-300 text-lg sm:text-xl mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            {'Adi Sumardi'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.05,
                  duration: 0.5,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 min-h-[4rem] sm:min-h-[5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-white">
              {displayedRole}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-amber-400 ml-1"
              />
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Crafting Digital Experiences
            </motion.span>
          </motion.div>

          <motion.p
            className="text-blue-100 text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {'Transforming ideas into powerful web applications with modern technologies.'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.05 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {'Specialized in full-stack development, AI integration, and enterprise solutions.'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 + index * 0.05 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-blue-900 font-bold rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Let&apos;s Talk
                <span>💬</span>
              </span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="https://github.com/Adi-Sumardi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/adi-sumardi-9037b0156/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="mailto:adisumardi888@gmail.com"
              className="text-white hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
            >
              <FaEnvelope size={32} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaChevronDown className="text-white text-3xl opacity-75" />
      </motion.div>
    </section>
  );
}
