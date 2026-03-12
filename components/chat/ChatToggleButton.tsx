'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes } from 'react-icons/fa';

interface ChatToggleButtonProps {
  isOpen: boolean;
  hasUnread: boolean;
  onClick: () => void;
}

export default function ChatToggleButton({ isOpen, hasUnread, onClick }: ChatToggleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-amber-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isOpen ? 'Tutup chat' : 'Buka chat'}
    >
      {/* Pulse ring animation when closed */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-amber-500"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaTimes className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaComments className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unread badge */}
      {hasUnread && !isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        />
      )}
    </motion.button>
  );
}
