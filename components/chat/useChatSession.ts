'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ChatMessage } from '@/lib/chatTypes';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Halo! 👋 Saya **Adi**, asisten virtual AdiLabs. Saya siap membantu Anda merencanakan pembuatan aplikasi atau website — mulai dari konsultasi kebutuhan, estimasi harga, sampai solusi teknis terbaik.\n\nAda yang bisa saya bantu hari ini?',
  timestamp: Date.now(),
};

const MAX_MESSAGES = 50;

function extractDealRecap(content: string): string | null {
  const match = content.match(/\[DEAL_RECAP_START\]([\s\S]*?)\[DEAL_RECAP_END\]/);
  return match ? match[1].trim() : null;
}

export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>('');

  // Initialize session ID
  useEffect(() => {
    const stored = sessionStorage.getItem('adilabs-chat-session');
    if (stored) {
      sessionIdRef.current = stored;
    } else {
      const id = crypto.randomUUID();
      sessionIdRef.current = id;
      sessionStorage.setItem('adilabs-chat-session', id);
    }
  }, []);

  const sendDealEmail = useCallback(async (recapText: string) => {
    if (emailSent) return; // Only send once per session
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: 'AI Asisten Adi',
          from_email: 'chatbot@adilabs.id',
          message: `[DEAL RECAP dari AI Asisten]\n\nSession: ${sessionIdRef.current}\nWaktu: ${new Date().toLocaleString('id-ID')}\n\n${recapText}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setEmailSent(true);
      return true;
    } catch (err) {
      console.error('Failed to send deal email:', err);
      return false;
    }
  }, [emailSent]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, userMessage];
        return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
      });
      setIsLoading(true);
      setError(null);

      // Prepare messages for API (exclude welcome, only role+content)
      const apiMessages = [...messages.filter((m) => m.id !== 'welcome'), userMessage].map(
        (m) => ({
          role: m.role,
          content: m.content,
        })
      );

      const assistantId = crypto.randomUUID();
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            messages: apiMessages,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Error ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          const currentContent = fullContent;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: currentContent } : m
            )
          );
        }

        // Check for deal recap
        const recap = extractDealRecap(fullContent);
        if (recap) {
          const sent = await sendDealEmail(recap);
          if (sent) {
            const notifMessage: ChatMessage = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content:
                '✅ **Rekap deal telah dikirim ke tim AdiLabs!** Kami akan segera menghubungi Anda untuk memulai project. Terima kasih atas kepercayaannya! 🙏',
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, notifMessage]);
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const errorMsg = (err as Error).message || 'Gagal mengirim pesan';
        setError(errorMsg);
        // Remove empty assistant message on error
        setMessages((prev) =>
          prev.filter((m) => m.id !== assistantId || m.content.length > 0)
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading, sendDealEmail]
  );

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newId = crypto.randomUUID();
    sessionIdRef.current = newId;
    sessionStorage.setItem('adilabs-chat-session', newId);
    setMessages([WELCOME_MESSAGE]);
    setIsLoading(false);
    setError(null);
    setEmailSent(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
  };
}
