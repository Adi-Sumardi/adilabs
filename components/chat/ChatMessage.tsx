'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaUser } from 'react-icons/fa';
import { ChatMessage as ChatMessageType } from '@/lib/chatTypes';

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatContent(content: string) {
  // Strip deal recap markers for display
  const cleaned = content
    .replace(/\[DEAL_RECAP_START\]/g, '')
    .replace(/\[DEAL_RECAP_END\]/g, '');

  // Simple markdown: **bold**, *italic*, - list items
  const lines = cleaned.split('\n');
  return lines.map((line, i) => {
    // Bold
    let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');

    const isList = formatted.trim().startsWith('- ') || formatted.trim().startsWith('• ');
    const isNumberedList = /^\d+\.\s/.test(formatted.trim());

    if (isList) {
      return (
        <div key={i} className="flex gap-1.5 ml-2">
          <span className="text-amber-500 mt-0.5">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-•]\s*/, '') }} />
        </div>
      );
    }

    if (isNumberedList) {
      return (
        <div key={i} className="ml-2">
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </div>
      );
    }

    if (formatted.startsWith('|') && formatted.endsWith('|')) {
      return (
        <div key={i} className="text-xs font-mono opacity-80">
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </div>
      );
    }

    return formatted.trim() ? (
      <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
    ) : (
      <div key={i} className="h-2" />
    );
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isDealRecap = message.content.includes('[DEAL_RECAP_START]');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-700'
            : 'bg-gradient-to-br from-amber-500 to-amber-700'
        }`}
      >
        {isUser ? (
          <FaUser className="w-3 h-3 text-white" />
        ) : (
          <FaRobot className="w-3 h-3 text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm'
            : isDealRecap
            ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-2 border-amber-400 dark:border-amber-600 text-slate-800 dark:text-slate-200 rounded-tl-sm'
            : 'bg-white dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-tl-sm'
        }`}
      >
        {isDealRecap && (
          <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-amber-300 dark:border-amber-600">
            <span className="text-lg">📋</span>
            <span className="font-bold text-amber-700 dark:text-amber-400 text-xs uppercase tracking-wider">
              Deal Recap
            </span>
          </div>
        )}
        <div className="space-y-1">{formatContent(message.content)}</div>
      </div>
    </motion.div>
  );
}
