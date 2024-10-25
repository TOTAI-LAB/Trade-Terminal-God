export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatRequest {
  session_id: string;
  user_id: string;
  query: string;
}

export interface ChatResponse {
  response: string;
}

export interface SessionResponse {
  session_id: string;
}