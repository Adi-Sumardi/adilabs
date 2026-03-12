'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatToggleButton from './ChatToggleButton';
import ChatWindow from './ChatWindow';
import { useChatSession } from './useChatSession';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const { messages, isLoading, error, sendMessage, resetChat } = useChatSession();

  // Track unread when new assistant message arrives while closed
  const lastMessageCount = messages.length;

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasUnread(false); // Clear unread when opening
      return !prev;
    });
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      sendMessage(content);
      if (!isOpen) setHasUnread(true);
    },
    [sendMessage, isOpen]
  );

  const handleReset = useCallback(() => {
    resetChat();
  }, [resetChat]);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSendMessage={handleSendMessage}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <ChatToggleButton
        isOpen={isOpen}
        hasUnread={hasUnread}
        onClick={handleToggle}
      />
    </div>
  );
}
