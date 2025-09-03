// API service for communicating with the MultiAgentsBeta backend
// Based on OpenAPI specification

import { config } from '../config';

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  sessionId: string;
  message: string;
  role: 'assistant';
  timestamp: string;
  tokenCount: number;
  isNewSession: boolean;
  totalMessageCount: number;
  totalTokenCount: number;
  maxTokens: number;
  remainingTokens: number;
  tokenUsagePercentage: number;
}

export interface ErrorResponse {
  message: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${config.API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...config.CORS_CONFIG,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Server is not responding');
        }
        throw error;
      }
      
      throw new Error('A network error occurred');
    }
  }

  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    return this.makeRequest<ChatResponse>('/api/agent/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async testCors(): Promise<{ message: string; timestamp: string; origin: string }> {
    return this.makeRequest('/api/test/cors');
  }

  async healthCheck(): Promise<{ status: string; timestamp: string; environment: string }> {
    return this.makeRequest('/api/test/health');
  }
}

export const apiService = new ApiService();
