import type { ChatMessage, ProspectPersona, ScenarioType, SessionFeedback } from '../types';

// In production (Cloudflare Workers), use relative URLs (same origin)
// In development, use localhost:3001
const API_BASE = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:3001');
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper to create fetch with timeout
function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId));
}

// Parse API error response
async function parseErrorResponse(response: Response): Promise<ApiError> {
  try {
    const errorData = await response.json();
    return new ApiError(
      errorData.message || 'An error occurred',
      response.status,
      errorData.isRetryable ?? false
    );
  } catch {
    return new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      response.status >= 500
    );
  }
}

// API message type (different from UI's ChatMessage)
interface ApiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  scenario: ScenarioType;
  persona: ProspectPersona;
  messages: ApiChatMessage[];
  userResponse: string;
}

interface ChatResponse {
  message: string;
  feedback?: {
    empathy: number;
    objectionHandling: number;
    productKnowledge: number;
    closingSkill: number;
  };
}

interface FeedbackRequest {
  objection: string;
  userResponse: string;
  context?: string;
}

interface FeedbackResponse {
  score: number;
  analysis: string;
  improvements: string[];
  detectedTechniques: string[];
  missedOpportunities: string[];
  keyMoment: string;
  scoreBreakdown: {
    empathy: number;
    objectionHandling: number;
    productKnowledge: number;
    closingSkill: number;
  };
}

interface ScriptRequest {
  situation: string;
  tone?: 'professional' | 'friendly' | 'empathetic';
  constraints?: string[];
}

interface ScriptResponse {
  script: string;
  tips?: string[];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE;
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/health`, {}, 5000);
      if (!response.ok) {
        throw await parseErrorResponse(response);
      }
      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Health check timed out', undefined, true);
      }
      throw new ApiError('Failed to connect to server', undefined, true);
    }
  }

  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timed out. Please try again.', undefined, true);
      }
      throw new ApiError('Failed to send message. Please check your connection.', undefined, true);
    }
  }

  async *streamChatMessage(request: ChatRequest): AsyncGenerator<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s for streaming

    try {
      const response = await fetch(`${this.baseUrl}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new ApiError('No response body', undefined, true);
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              // Check for error in SSE stream
              if (parsed.error) {
                throw new ApiError(
                  parsed.message || 'Stream error occurred',
                  undefined,
                  parsed.isRetryable ?? true
                );
              }
              if (parsed.text) {
                yield parsed.text;
              }
            } catch (parseError) {
              // Only throw if it's an ApiError, otherwise the JSON was malformed
              if (parseError instanceof ApiError) {
                throw parseError;
              }
              // Log malformed JSON but continue (could be partial chunk)
              console.warn('Failed to parse SSE data:', data);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Stream timed out. Please try again.', undefined, true);
      }
      throw new ApiError('Stream connection failed. Please try again.', undefined, true);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async analyzeResponse(request: FeedbackRequest): Promise<FeedbackResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Analysis timed out. Please try again.', undefined, true);
      }
      throw new ApiError('Failed to analyze response. Please try again.', undefined, true);
    }
  }

  async generateScript(request: ScriptRequest): Promise<ScriptResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/api/script`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }, 45000); // Longer timeout for script generation

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Script generation timed out. Please try again.', undefined, true);
      }
      throw new ApiError('Failed to generate script. Please try again.', undefined, true);
    }
  }

  async endSession(
    messages: ChatMessage[],
    scenario: ScenarioType
  ): Promise<SessionFeedback> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/api/session/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, scenario }),
      });

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Session end timed out. Please try again.', undefined, true);
      }
      throw new ApiError('Failed to end session. Please try again.', undefined, true);
    }
  }
}

export const apiService = new ApiService();
export default apiService;
