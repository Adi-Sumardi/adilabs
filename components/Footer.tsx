'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Adi-Sumardi', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/adi-sumardi-9037b0156/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/_adi1508', label: 'Instagram' },
    { icon: FaFacebook, href: 'https://www.facebook.com/adi.sumardi888/', label: 'Facebook' },
    { icon: FaEnvelope, href: 'mailto:adisumardi888@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              AdiLabs
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Fullstack Developer crafting digital experiences with passion and precision.
              Transforming ideas into powerful web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                adisumardi888@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                Available for work
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              Made with <FaHeart className="inline text-red-500 animate-pulse" /> by{' '}
              <span className="font-semibold text-amber-400">Adi Sumardi</span>
              <br className="md:hidden" />
              <span className="mx-2 hidden md:inline">•</span>
              © {currentYear} AdiLabs. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-amber-500 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
