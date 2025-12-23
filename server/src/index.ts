import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import {
  generateRoleplayResponse,
  streamRoleplayResponse,
  analyzeResponse,
  generateScript,
  ClaudeAPIError,
} from './services/claude.js';
import type {
  ChatRequest,
  FeedbackRequest,
  ScriptRequest,
  ScenarioType,
} from './types.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Scenario types for validation
const SCENARIO_TYPES = [
  'cold_call',
  'home_visit',
  'follow_up',
  'closing',
  'spouse_objection',
  'recruiting_cold',
  'recruiting_warm',
  'recruiting_career_changer',
] as const;

// Input validation schemas
const personaSchema = z.object({
  id: z.string().max(100),
  name: z.string().max(100),
  age: z.number().optional(),
  occupation: z.string().max(200).optional(),
  income: z.string().max(100).optional(),
  familySituation: z.string().max(500).optional(),
  background: z.string().max(1000).optional(),
  personality: z.string().max(500).optional(),
  objectionStyle: z.string().max(500).optional(),
  hiddenConcerns: z.array(z.string().max(200)).optional(),
});

const chatRequestSchema = z.object({
  scenario: z.enum(SCENARIO_TYPES),
  persona: personaSchema,
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(10000),
  })).max(100),
  userResponse: z.string().max(10000),
});

const feedbackRequestSchema = z.object({
  objection: z.string().max(2000),
  userResponse: z.string().max(10000),
  context: z.string().max(5000).optional(),
});

const scriptRequestSchema = z.object({
  situation: z.string().max(5000),
  tone: z.enum(['professional', 'friendly', 'empathetic']).optional(),
  constraints: z.array(z.string().max(500)).max(20).optional(),
});

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat endpoint (non-streaming)
app.post('/api/chat', async (req, res) => {
  try {
    // Validate input
    const parseResult = chatRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: parseResult.error.issues.map((e) => e.message),
      });
    }

    const request = parseResult.data as unknown as ChatRequest;
    const response = await generateRoleplayResponse(request);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    if (error instanceof ClaudeAPIError) {
      res.status(error.statusCode || 500).json({
        error: 'AI service error',
        message: error.message,
        isRetryable: error.isRetryable,
      });
    } else {
      res.status(500).json({
        error: 'Failed to generate response',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  }
});

// Chat endpoint (streaming)
app.post('/api/chat/stream', async (req, res) => {
  let headersSent = false;

  try {
    // Validate input before setting headers
    const parseResult = chatRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: parseResult.error.issues.map((e) => e.message),
      });
    }

    const request = parseResult.data as unknown as ChatRequest;

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    headersSent = true;

    for await (const chunk of streamRoleplayResponse(request)) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Stream error:', error);

    const errorMessage = error instanceof ClaudeAPIError
      ? error.message
      : 'Stream interrupted. Please try again.';
    const isRetryable = error instanceof ClaudeAPIError ? error.isRetryable : true;

    // If headers already sent, send error as SSE event
    if (headersSent) {
      res.write(`data: ${JSON.stringify({
        error: true,
        message: errorMessage,
        isRetryable,
      })}\n\n`);
      res.end();
    } else {
      const statusCode = error instanceof ClaudeAPIError ? (error.statusCode || 500) : 500;
      res.status(statusCode).json({
        error: 'Failed to stream response',
        message: errorMessage,
        isRetryable,
      });
    }
  }
});

// Analyze response endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    // Validate input
    const parseResult = feedbackRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: parseResult.error.issues.map((e) => e.message),
      });
    }

    const request: FeedbackRequest = parseResult.data;
    const response = await analyzeResponse(request);
    res.json(response);
  } catch (error) {
    console.error('Analyze error:', error);
    if (error instanceof ClaudeAPIError) {
      res.status(error.statusCode || 500).json({
        error: 'AI service error',
        message: error.message,
        isRetryable: error.isRetryable,
      });
    } else {
      res.status(500).json({
        error: 'Failed to analyze response',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  }
});

// Generate script endpoint
app.post('/api/script', async (req, res) => {
  try {
    // Validate input
    const parseResult = scriptRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: parseResult.error.issues.map((e) => e.message),
      });
    }

    const request: ScriptRequest = parseResult.data;
    const response = await generateScript(request);
    res.json(response);
  } catch (error) {
    console.error('Script error:', error);
    if (error instanceof ClaudeAPIError) {
      res.status(error.statusCode || 500).json({
        error: 'AI service error',
        message: error.message,
        isRetryable: error.isRetryable,
      });
    } else {
      res.status(500).json({
        error: 'Failed to generate script',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  }
});

// End session and get final feedback
app.post('/api/session/end', async (req, res) => {
  try {
    const { messages, scenario } = req.body;

    if (!messages || !scenario) {
      return res.status(400).json({
        error: 'Missing required fields: messages, scenario',
      });
    }

    // Calculate session feedback based on all messages
    const userMessages = messages.filter((m: { role: string }) => m.role === 'user');

    // Calculate average scores from all user messages
    const scores = {
      empathy: 0,
      objectionHandling: 0,
      productKnowledge: 0,
      closingSkill: 0,
    };

    userMessages.forEach((msg: { content: string }) => {
      const response = msg.content.toLowerCase();

      // Simple scoring based on keyword presence
      if (response.includes('understand') || response.includes('feel')) scores.empathy += 20;
      if (response.includes('let me') || response.includes('what if')) scores.objectionHandling += 20;
      if (response.includes('coverage') || response.includes('benefit')) scores.productKnowledge += 20;
      if (response.includes('next') || response.includes('forward')) scores.closingSkill += 20;
    });

    const messageCount = userMessages.length || 1;
    const feedback = {
      empathyScore: Math.min(100, Math.round(scores.empathy / messageCount + 50)),
      objectionHandlingScore: Math.min(100, Math.round(scores.objectionHandling / messageCount + 50)),
      productKnowledgeScore: Math.min(100, Math.round(scores.productKnowledge / messageCount + 50)),
      closingScore: Math.min(100, Math.round(scores.closingSkill / messageCount + 40)),
      overallScore: 0,
      strengths: [] as string[],
      improvements: [] as string[],
      tips: [] as string[],
    };

    feedback.overallScore = Math.round(
      (feedback.empathyScore +
        feedback.objectionHandlingScore +
        feedback.productKnowledgeScore +
        feedback.closingScore) /
        4
    );

    // Generate strengths and improvements based on scores
    if (feedback.empathyScore >= 70) {
      feedback.strengths.push('Good use of empathetic language');
    } else {
      feedback.improvements.push('Try to acknowledge the prospect\'s feelings more directly');
    }

    if (feedback.objectionHandlingScore >= 70) {
      feedback.strengths.push('Effective objection handling techniques');
    } else {
      feedback.improvements.push('Consider using frameworks like Feel-Felt-Found for objections');
    }

    if (feedback.productKnowledgeScore >= 70) {
      feedback.strengths.push('Strong product knowledge demonstration');
    } else {
      feedback.improvements.push('Include more specific product benefits in your responses');
    }

    if (feedback.closingScore >= 70) {
      feedback.strengths.push('Good closing instincts');
    } else {
      feedback.improvements.push('Work on advancing the conversation toward a decision');
    }

    feedback.tips = [
      'Practice this scenario type regularly to build confidence',
      'Record yourself and listen back for improvement areas',
      'Focus on asking more discovery questions',
    ];

    res.json(feedback);
  } catch (error) {
    console.error('Session end error:', error);
    res.status(500).json({
      error: 'Failed to generate session feedback',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Apex Sales Academy API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
