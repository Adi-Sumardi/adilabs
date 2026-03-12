'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Adi-Sumardi', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/adi-sumardi-9037b0156/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/_adi1508', label: 'Instagram' },
    { icon: FaFacebook, href: 'https://www.facebook.com/adi.sumardi888/', label: 'Facebook' },
    { icon: FaWhatsapp, href: 'https://wa.me/6285121379697', label: 'WhatsApp' },
    { icon: FaEnvelope, href: 'mailto:adisumardi888@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/5 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
            AdiLabs.id
          </h3>

          {/* Nav Links */}
          <div className="flex gap-6 text-sm">
            <a href="#contact" className="text-white/40 hover:text-amber-400 transition-colors">Contact</a>
            <Link href="/blog" className="text-white/40 hover:text-amber-400 transition-colors">Blog</Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-amber-500 hover:border-transparent transition-all duration-300 hover:scale-110"
              >
                <social.icon className="text-sm" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center">
            Made with <FaHeart className="inline text-red-500/70 text-[10px]" /> by{' '}
            <span className="text-amber-400/70">Adi Sumardi</span>
            <span className="mx-2">•</span>
            © {currentYear} AdiLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
