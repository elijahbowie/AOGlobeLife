import Anthropic from '@anthropic-ai/sdk';
import { buildFullPrompt } from '../prompts/system.js';
import { buildFeedbackPrompt, buildScriptPrompt } from '../prompts/feedback.js';
import type {
  ChatRequest,
  ChatResponse,
  FeedbackRequest,
  FeedbackResponse,
  ScriptRequest,
  ScriptResponse,
  ChatMessage,
} from '../types.js';

const anthropic = new Anthropic();

const MODEL = 'claude-sonnet-4-20250514';

// Error class for Claude API failures
export class ClaudeAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ClaudeAPIError';
  }
}

// Handle Claude API errors with specific error messages
function handleClaudeError(error: unknown): never {
  console.error('Claude API error:', error);

  if (error instanceof Anthropic.APIError) {
    if (error.status === 429) {
      throw new ClaudeAPIError(
        'The AI service is temporarily busy. Please try again in a few moments.',
        429,
        true
      );
    }
    if (error.status === 401) {
      throw new ClaudeAPIError(
        'AI service configuration error. Please contact support.',
        401,
        false
      );
    }
    if (error.status === 500 || error.status === 502 || error.status === 503) {
      throw new ClaudeAPIError(
        'The AI service is temporarily unavailable. Please try again.',
        error.status,
        true
      );
    }
    throw new ClaudeAPIError(
      'An error occurred with the AI service.',
      error.status,
      false
    );
  }

  throw new ClaudeAPIError('An unexpected error occurred. Please try again.');
}

// Sanitize user input to prevent prompt injection
function sanitizeUserInput(input: string): string {
  // Remove potential prompt injection patterns
  return input
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '')
    .replace(/<\|.*?\|>/g, '')
    .replace(/<<SYS>>|<\/SYS>>/gi, '')
    .replace(/Human:|Assistant:|System:/gi, '')
    .slice(0, 10000); // Enforce max length
}

export async function generateRoleplayResponse(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    const systemPrompt = buildFullPrompt(request.scenario, request.persona);

    // Convert messages to Claude format with sanitization
    const claudeMessages = request.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.role === 'user' ? sanitizeUserInput(m.content) : m.content,
      }));

    // Add the new user message (sanitized)
    claudeMessages.push({
      role: 'user' as const,
      content: sanitizeUserInput(request.userResponse),
    });

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: claudeMessages,
    });

    const messageContent = response.content[0];
    const responseText =
      messageContent.type === 'text' ? messageContent.text : '';

    // Calculate basic feedback scores based on response characteristics
    const feedback = calculateBasicFeedback(request.userResponse);

    return {
      message: responseText,
      feedback,
    };
  } catch (error) {
    handleClaudeError(error);
  }
}

export async function* streamRoleplayResponse(
  request: ChatRequest
): AsyncGenerator<string> {
  try {
    const systemPrompt = buildFullPrompt(request.scenario, request.persona);

    // Convert messages to Claude format with sanitization
    const claudeMessages = request.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.role === 'user' ? sanitizeUserInput(m.content) : m.content,
      }));

    // Add the new user message (sanitized)
    claudeMessages.push({
      role: 'user' as const,
      content: sanitizeUserInput(request.userResponse),
    });

    const stream = await anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: claudeMessages,
    });

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        yield chunk.delta.text;
      }
    }
  } catch (error) {
    handleClaudeError(error);
  }
}

export async function analyzeResponse(
  request: FeedbackRequest
): Promise<FeedbackResponse> {
  try {
    const prompt = buildFeedbackPrompt(
      sanitizeUserInput(request.objection),
      sanitizeUserInput(request.userResponse),
      request.context ? sanitizeUserInput(request.context) : undefined
    );

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const messageContent = response.content[0];
    const responseText =
      messageContent.type === 'text' ? messageContent.text : '';

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as FeedbackResponse;
      return parsed;
    }

    // If we got a response but couldn't parse it, throw an error
    throw new ClaudeAPIError(
      'Failed to parse feedback response from AI service.',
      undefined,
      true
    );
  } catch (error) {
    if (error instanceof ClaudeAPIError) {
      throw error;
    }
    if (error instanceof SyntaxError) {
      throw new ClaudeAPIError(
        'Failed to parse feedback response. Please try again.',
        undefined,
        true
      );
    }
    handleClaudeError(error);
  }
}

export async function generateScript(
  request: ScriptRequest
): Promise<ScriptResponse> {
  try {
    const prompt = buildScriptPrompt(
      sanitizeUserInput(request.situation),
      request.tone || 'professional',
      request.constraints?.map(c => sanitizeUserInput(c))
    );

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const messageContent = response.content[0];
    const script = messageContent.type === 'text' ? messageContent.text : '';

    if (!script) {
      throw new ClaudeAPIError(
        'Failed to generate script. Please try again.',
        undefined,
        true
      );
    }

    return {
      script,
      tips: [
        'Practice this script until it feels natural',
        'Adapt the wording to match your personal style',
        'Focus on the key transitions between sections',
      ],
    };
  } catch (error) {
    if (error instanceof ClaudeAPIError) {
      throw error;
    }
    handleClaudeError(error);
  }
}

// Helper function to calculate basic feedback scores
function calculateBasicFeedback(userResponse: string): {
  empathy: number;
  objectionHandling: number;
  productKnowledge: number;
  closingSkill: number;
} {
  const response = userResponse.toLowerCase();

  // Empathy indicators
  const empathyWords = ['understand', 'hear you', 'appreciate', 'feel', 'concern', 'important'];
  const empathyScore = Math.min(
    100,
    50 + empathyWords.filter((word) => response.includes(word)).length * 10
  );

  // Objection handling indicators
  const handlingPhrases = ['let me', 'what if', 'have you considered', 'many people', 'actually'];
  const objectionScore = Math.min(
    100,
    50 + handlingPhrases.filter((phrase) => response.includes(phrase)).length * 10
  );

  // Product knowledge indicators
  const productTerms = ['coverage', 'benefit', 'protection', 'policy', 'premium'];
  const knowledgeScore = Math.min(
    100,
    50 + productTerms.filter((term) => response.includes(term)).length * 10
  );

  // Closing indicators
  const closingPhrases = ['next step', 'move forward', 'get started', 'sign', 'today'];
  const closingScore = Math.min(
    100,
    40 + closingPhrases.filter((phrase) => response.includes(phrase)).length * 12
  );

  return {
    empathy: empathyScore,
    objectionHandling: objectionScore,
    productKnowledge: knowledgeScore,
    closingSkill: closingScore,
  };
}
