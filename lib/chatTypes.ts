export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isDealRecap?: boolean;
}

export interface ChatRequest {
  sessionId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}
