'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Honeypot field to catch bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'blocked'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [submitCount, setSubmitCount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security Check 1: Honeypot - if filled, it's a bot
    if (formData.honeypot !== '') {
      console.warn('Bot detected: honeypot field filled');
      setSubmitStatus('blocked');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    // Security Check 2: Rate limiting - max 3 submissions per hour
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const timeSinceLastSubmit = now - lastSubmitTime;

    if (timeSinceLastSubmit < oneHour && submitCount >= 3) {
      setSubmitStatus('blocked');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    // Security Check 3: Submit cooldown - minimum 30 seconds between submissions
    const cooldown = 30 * 1000; // 30 seconds
    if (timeSinceLastSubmit < cooldown && lastSubmitTime !== 0) {
      setSubmitStatus('blocked');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    // Security Check 4: Validate content length (prevent spam)
    if (formData.name.length < 2 || formData.name.length > 100) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    if (formData.message.length < 10 || formData.message.length > 1000) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    // Security Check 5: Basic spam keyword detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'crypto mining'];
    const messageContent = formData.message.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword));

    if (hasSpam) {
      console.warn('Spam detected in message');
      setSubmitStatus('blocked');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });

      // Update rate limiting counters
      setLastSubmitTime(now);
      setSubmitCount(timeSinceLastSubmit > oneHour ? 1 : submitCount + 1);

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:adisumardi888@gmail.com',
      color: 'hover:text-red-500',
      label: 'adisumardi888@gmail.com',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/adi-sumardi-9037b0156/',
      color: 'hover:text-blue-600',
      label: 'linkedin.com/in/adi-sumardi',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/Adi-Sumardi',
      color: 'hover:text-gray-800 dark:hover:text-gray-300',
      label: 'github.com/Adi-Sumardi',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/_adi1508',
      color: 'hover:text-pink-500',
      label: '@_adi1508',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/adi.sumardi888/',
      color: 'hover:text-blue-700',
      label: 'facebook.com/adi.sumardi888',
    },
  ];

  return (
    <section id="contact" className="pt-10 pb-20 relative overflow-hidden" ref={ref}>
      {/* Background Effects - matching Hero */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Let&apos;s Build Something Amazing
            </span>
            <span className="ml-3">🚀</span>
          </h2>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s talk about how I can help bring it to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field - Hidden from users, visible to bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Leave this field empty</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-blue-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-200">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-blue-200">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project... (min 10 characters)"
                  />
                  <p className="text-xs text-blue-300/50 mt-1">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center"
                  >
                    ✅ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center"
                  >
                    ❌ Failed to send message. Please try again or email me directly.
                  </motion.div>
                )}

                {/* Blocked Message */}
                {submitStatus === 'blocked' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-center"
                  >
                    ⚠️ Too many requests. Please wait a moment before trying again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              <p className="text-blue-200/70 leading-relaxed mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of these channels.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group ${social.color}`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <social.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{social.name}</p>
                    <p className="text-sm text-blue-200/60">{social.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="font-bold text-lg text-white">Available for Work</p>
              </div>
              <p className="text-blue-200/70">
                Currently accepting new projects and collaborations. Let&apos;s create something great together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
