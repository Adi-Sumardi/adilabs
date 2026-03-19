'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaPaperPlane, FaRobot, FaUser, FaRedo, FaComments, FaCertificate } from 'react-icons/fa';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/chatTypes';
import { useChatSession } from '@/components/chat/useChatSession';

function formatContent(content: string) {
  const cleaned = content.replace(/\[DEAL_RECAP_START\]/g, '').replace(/\[DEAL_RECAP_END\]/g, '');
  const lines = cleaned.split('\n');
  return lines.map((line, i) => {
    let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    const isList = formatted.trim().startsWith('- ') || formatted.trim().startsWith('• ');
    if (isList) {
      return (<div key={i} className="flex gap-1.5 ml-2"><span className="text-amber-400">•</span><span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-•]\s*/, '') }} /></div>);
    }
    return formatted.trim() ? (<p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />) : (<div key={i} className="h-1.5" />);
  });
}

const quickQuestions = [
  'Mau buat aplikasi',
  'Harga website?',
  'Layanan AdiLabs',
];

function HeroChat() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage, resetChat } = useChatSession();

  useEffect(() => {
    const c = chatContainerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden h-full flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Personal Asisten Adi</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-[10px]">Online - Siap membantu</span>
            </div>
          </div>
        </div>
        <button onClick={resetChat} className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10" title="Reset chat">
          <FaRedo className="w-3 h-3" />
        </button>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => {
          if (msg.content === '') return null;
          const isUser = msg.role === 'user';
          return (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${isUser ? 'bg-blue-500' : 'bg-gradient-to-br from-amber-400 to-amber-600'}`}>
                {isUser ? <FaUser className="w-2.5 h-2.5 text-white" /> : <FaRobot className="w-2.5 h-2.5 text-white" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${isUser ? 'bg-blue-500/80 text-white rounded-tr-sm' : 'bg-white/15 text-white/90 border border-white/10 rounded-tl-sm'}`}>
                <div className="space-y-1">{formatContent(msg.content)}</div>
              </div>
            </motion.div>
          );
        })}
        {isLoading && (
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
              <FaRobot className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="bg-white/15 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2.5">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (<motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />))}
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-300 text-xs text-center">{error}</p>}
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => { if (!isLoading) sendMessage(q); }} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/10 px-3 py-2.5">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'; }}
            onKeyDown={handleKeyDown}
            placeholder="Tanya apa saja tentang jasa kami..."
            rows={1}
            className="flex-1 resize-none bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all"
            disabled={isLoading}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center disabled:opacity-40 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane className="w-3.5 h-3.5" />
          </motion.button>
        </div>
        <p className="text-[9px] text-white/30 mt-1 text-center">Powered by Claude AI</p>
      </div>
    </div>
  );
}

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full py-20">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70 text-xs font-medium">Konsultasi Gratis 24/7 dengan AI</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Wujudkan Ide Digital Anda
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> Bersama AdiLabs</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Dari konsultasi, perencanaan, sampai development — semua dimulai dari percakapan
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-stretch">

          {/* ID Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto lg:mx-0 w-full max-w-[320px] h-full"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden h-full flex flex-col">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 flex items-center justify-between">
                <span className="text-white font-bold text-xs tracking-widest uppercase">AdiLabs.id</span>
                <span className="text-white/80 text-[10px]">ID Card</span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full blur opacity-60 animate-pulse" />
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/30">
                      <Image src="/logo/adilabs.png" alt="AdiLabs Logo" fill className="object-cover" />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h2 className="text-white font-bold text-xl">Adi Sumardi</h2>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-white">
                      {displayedRole}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5"
                      />
                    </span>
                  </div>
                </div>

                {/* Certification */}
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <FaCertificate className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">Certified</span>
                  </div>
                  <p className="text-white font-semibold text-xs mb-1.5">
                    Certificate Of Competence
                  </p>
                  <p className="text-white/80 text-[11px] leading-relaxed">
                    Web Developer — Badan Nasional Sertifikasi Profesi
                  </p>
                  <div className="mt-2 space-y-1 text-[10px] text-white/60">
                    <p>No. <span className="text-white/80 font-mono">62019 3514 0 0007245 2026</span></p>
                    <p>No. Reg. <span className="text-white/80 font-mono">TIK. 2324 00254 2026</span></p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-amber-400 font-bold text-lg">5+</div>
                    <div className="text-white/60 text-[10px]">Tahun</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-amber-400 font-bold text-lg">250+</div>
                    <div className="text-white/60 text-[10px]">Project</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 justify-center">
                  <a href="https://github.com/Adi-Sumardi" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-300 hover:border-amber-400/50 transition-all">
                    <FaGithub size={14} />
                  </a>
                  <a href="https://www.linkedin.com/in/adi-sumardi-9037b0156/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-300 hover:border-amber-400/50 transition-all">
                    <FaLinkedin size={14} />
                  </a>
                  <a href="mailto:adisumardi888@gmail.com" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-300 hover:border-amber-400/50 transition-all">
                    <FaEnvelope size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-full"
          >
            <HeroChat />
          </motion.div>

        </div>

        {/* Trust Indicators */}

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/30 text-[9px] uppercase tracking-widest">Scroll</span>
        <FaChevronDown className="text-white/40 text-sm" />
      </motion.div>
    </section>
  );
}
