import { ChatRequest, ChatResponse, SessionResponse } from '../types/chat';

export const chatApi = {
  async startSession(): Promise<SessionResponse> {
    try {
      const response = await fetch('http://localhost:8000/api/start-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Log backend response
        console.error(`Backend response: ${response.status} - ${errorText}`);
        throw new Error(`Failed to start session: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error during startSession API call:', error);
      throw error;
    }
  },

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Capture backend error message
        console.error(`Backend error: ${response.status} - ${errorText}`);
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
  
      const data: ChatResponse = await response.json();
      console.log('Received response:', data);
      return data;
    } catch (error) {
      console.error('Error during sendMessage API call:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }
};