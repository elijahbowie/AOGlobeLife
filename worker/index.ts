import Anthropic from '@anthropic-ai/sdk';

// Types
export type ScenarioType =
  | 'cold_call'
  | 'home_visit'
  | 'follow_up'
  | 'closing'
  | 'spouse_objection'
  | 'recruiting_cold'
  | 'recruiting_warm'
  | 'recruiting_career_changer';

export interface ProspectPersona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  background: string;
  personality: string;
  familyStatus: string;
  painPoints: string[];
  objections: string[];
  buyingSignals: string[];
}

export interface ChatMessage {
  role: 'user' | 'prospect' | 'coach' | 'system';
  content: string;
}

export interface ChatRequest {
  scenario: ScenarioType;
  persona: ProspectPersona;
  messages: ChatMessage[];
  userResponse: string;
}

export interface ChatResponse {
  message: string;
  feedback?: {
    empathy: number;
    objectionHandling: number;
    productKnowledge: number;
    closingSkill: number;
  };
}

export interface FeedbackRequest {
  objection: string;
  userResponse: string;
  context?: string;
}

export interface FeedbackResponse {
  score: number;
  analysis: string;
  improvements: string[];
  detectedTechniques: string[];
  scoreBreakdown: {
    empathy: number;
    objectionHandling: number;
    productKnowledge: number;
    closingSkill: number;
  };
}

export interface ScriptRequest {
  situation: string;
  tone?: 'professional' | 'friendly' | 'empathetic';
  constraints?: string[];
}

export interface ScriptResponse {
  script: string;
  tips?: string[];
}

// Environment interface
interface Env {
  ASSETS: Fetcher;
  ANTHROPIC_API_KEY: string;
}

// Prompts
const BASE_SYSTEM_PROMPT = `You are an advanced roleplay training system for insurance sales professionals at American Income Life (AIL). You simulate realistic prospect conversations to help agents practice their skills.

IMPORTANT GUIDELINES:
1. Stay completely in character as the prospect - never break character or provide meta-commentary
2. Respond naturally as the prospect would, based on their persona and the scenario
3. Show realistic emotions, hesitations, and concerns
4. Don't make it too easy - present realistic objections and challenges
5. Be consistent with the prospect's background and personality
6. Allow the conversation to progress naturally toward the agent's goals
7. If the agent handles an objection well, show genuine consideration
8. Keep responses conversational and natural (2-4 sentences typically)
9. Never reveal that you're an AI or training system

CRITICAL: You are the PROSPECT, not the agent. Respond only as the prospect would respond.`;

const getScenarioContext = (scenarioId: ScenarioType): string => {
  const contexts: Record<ScenarioType, string> = {
    cold_call: `SCENARIO: Cold Call
The agent is calling you out of the blue. You recently filled out a card at a union meeting and vaguely remember it, but you're busy and slightly skeptical. You're open to hearing what they have to say but won't make it too easy.`,

    home_visit: `SCENARIO: Home Visit / Kitchen Table Presentation
The agent is in your home for an appointment you scheduled. You're interested but have questions and concerns. Your spouse may or may not be present. You want to understand what you're getting before making any decisions.`,

    follow_up: `SCENARIO: Follow-Up Call
The agent is following up after a previous meeting or conversation. You've been meaning to make a decision but have been procrastinating. You may have some lingering questions or concerns that prevented you from moving forward.`,

    closing: `SCENARIO: Closing Conversation
You've already learned about the product and understand the benefits. Now it's decision time. You're leaning toward moving forward but need that final push or have a few last concerns.`,

    spouse_objection: `SCENARIO: Spouse Objection
You're interested in the coverage but you keep bringing up that you need to discuss it with your spouse first. You're not using this as a cop-out - you genuinely involve your spouse in major financial decisions. The agent needs to help you either get your spouse involved or feel confident making an informed decision.`,

    recruiting_cold: `SCENARIO: Recruiting - Cold Contact
You're employed but not particularly fulfilled in your current role. You've expressed casual interest in hearing about opportunities. You're skeptical about insurance sales due to common misconceptions but are open to learning more.`,

    recruiting_warm: `SCENARIO: Recruiting - Warm Contact
You've already spoken with this agent once about the opportunity. You're genuinely curious but have questions about income, training, and work-life balance. You want honest answers, not a sales pitch about the opportunity.`,

    recruiting_career_changer: `SCENARIO: Recruiting - Career Changer
You're actively looking to change careers. You're burned out in your current field and want something different. You're intrigued by the flexibility and income potential but worried about the learning curve and sales aspect.`,
  };

  return contexts[scenarioId] || '';
};

const getPersonaPrompt = (persona: ProspectPersona): string => {
  return `YOUR CHARACTER:
Name: ${persona.name}
Age: ${persona.age}
Occupation: ${persona.occupation}
Family Status: ${persona.familyStatus}
Background: ${persona.background}
Personality: ${persona.personality}

Your typical pain points: ${persona.painPoints.join(', ')}
Objections you might raise: ${persona.objections.join(', ')}
Signs you're interested: ${persona.buyingSignals.join(', ')}

Stay true to this character throughout the conversation. React as ${persona.name} would react based on their background, personality, and concerns.`;
};

const buildFullPrompt = (scenarioId: ScenarioType, persona: ProspectPersona): string => {
  return `${BASE_SYSTEM_PROMPT}

${getScenarioContext(scenarioId)}

${getPersonaPrompt(persona)}

Remember: You ARE ${persona.name}. Respond only as they would respond. Keep responses natural and conversational.`;
};

const FEEDBACK_SYSTEM_PROMPT = `You are an expert insurance sales coach evaluating an agent's performance. Analyze their response and provide constructive feedback.

You must respond in valid JSON format with this exact structure:
{
  "score": <number 0-100>,
  "analysis": "<brief analysis of what they did well and what could improve>",
  "improvements": ["<specific suggestion 1>", "<specific suggestion 2>", "<specific suggestion 3>"],
  "detectedTechniques": ["<technique name if any were used>"],
  "scoreBreakdown": {
    "empathy": <0-100>,
    "objectionHandling": <0-100>,
    "productKnowledge": <0-100>,
    "closingSkill": <0-100>
  }
}

EVALUATION CRITERIA:

EMPATHY (25% of score):
- Did they acknowledge the prospect's feelings/concerns?
- Did they show understanding before pushing forward?
- Did they use empathetic language?
- Did they avoid being pushy or dismissive?

OBJECTION HANDLING (25% of score):
- Did they address the objection directly?
- Did they use a proven framework (Feel-Felt-Found, etc.)?
- Did they turn objections into opportunities?
- Did they ask clarifying questions?

PRODUCT KNOWLEDGE (25% of score):
- Did they mention relevant product features?
- Were their facts accurate?
- Did they connect features to benefits?
- Did they tailor the information to the prospect's situation?

CLOSING SKILL (25% of score):
- Did they advance the conversation toward a decision?
- Did they use appropriate closing techniques?
- Did they maintain control of the conversation?
- Did they create urgency without pressure?

Be specific and actionable in your feedback. Focus on what they can do better next time.`;

const SCRIPT_GENERATION_PROMPT = `You are an expert insurance sales script writer for American Income Life agents. Create natural, conversational scripts that are:

1. Authentic - Not salesy or pushy
2. Educational - Help the prospect understand value
3. Flexible - Allow for natural conversation flow
4. Compliant - Avoid making guarantees or misrepresentations

The script should follow AIL's approach:
- Lead with benefits to union/association members
- Focus on supplemental coverage needs
- Emphasize the no-cost benefits they're already entitled to
- Use the "coffee a day" approach for premium discussions
- Handle objections with empathy

Provide the script in a natural format with:
- Clear sections (opening, discovery, presentation, close)
- Suggested phrases for common objections
- Notes on tone and delivery where helpful`;

// Model
const MODEL = 'claude-sonnet-4-20250514';

// Sanitize user input
function sanitizeUserInput(input: string): string {
  return input
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '')
    .replace(/<\|.*?\|>/g, '')
    .replace(/<<SYS>>|<\/SYS>>/gi, '')
    .replace(/Human:|Assistant:|System:/gi, '')
    .slice(0, 10000);
}

// Calculate basic feedback
function calculateBasicFeedback(userResponse: string) {
  const response = userResponse.toLowerCase();

  const empathyWords = ['understand', 'hear you', 'appreciate', 'feel', 'concern', 'important'];
  const empathyScore = Math.min(100, 50 + empathyWords.filter((word) => response.includes(word)).length * 10);

  const handlingPhrases = ['let me', 'what if', 'have you considered', 'many people', 'actually'];
  const objectionScore = Math.min(100, 50 + handlingPhrases.filter((phrase) => response.includes(phrase)).length * 10);

  const productTerms = ['coverage', 'benefit', 'protection', 'policy', 'premium'];
  const knowledgeScore = Math.min(100, 50 + productTerms.filter((term) => response.includes(term)).length * 10);

  const closingPhrases = ['next step', 'move forward', 'get started', 'sign', 'today'];
  const closingScore = Math.min(100, 40 + closingPhrases.filter((phrase) => response.includes(phrase)).length * 12);

  return {
    empathy: empathyScore,
    objectionHandling: objectionScore,
    productKnowledge: knowledgeScore,
    closingSkill: closingScore,
  };
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// JSON response helper
function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Error response helper
function errorResponse(message: string, status = 500, isRetryable = false) {
  return jsonResponse({ error: message, isRetryable }, status);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, url);
    }

    // Health check
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  },
};

async function handleApiRequest(request: Request, env: Env, url: URL): Promise<Response> {
  const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  try {
    // POST /api/chat
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const body = (await request.json()) as ChatRequest;
      const systemPrompt = buildFullPrompt(body.scenario, body.persona);

      const claudeMessages = body.messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.role === 'user' ? sanitizeUserInput(m.content) : m.content,
        }));

      claudeMessages.push({
        role: 'user' as const,
        content: sanitizeUserInput(body.userResponse),
      });

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages: claudeMessages,
      });

      const messageContent = response.content[0];
      const responseText = messageContent.type === 'text' ? messageContent.text : '';
      const feedback = calculateBasicFeedback(body.userResponse);

      return jsonResponse({ message: responseText, feedback });
    }

    // POST /api/chat/stream
    if (url.pathname === '/api/chat/stream' && request.method === 'POST') {
      const body = (await request.json()) as ChatRequest;
      const systemPrompt = buildFullPrompt(body.scenario, body.persona);

      const claudeMessages = body.messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.role === 'user' ? sanitizeUserInput(m.content) : m.content,
        }));

      claudeMessages.push({
        role: 'user' as const,
        content: sanitizeUserInput(body.userResponse),
      });

      const stream = await anthropic.messages.stream({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages: claudeMessages,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: true, message: 'Stream error occurred' })}\n\n`)
            );
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          ...corsHeaders,
        },
      });
    }

    // POST /api/analyze
    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      const body = (await request.json()) as FeedbackRequest;

      const prompt = `${FEEDBACK_SYSTEM_PROMPT}

OBJECTION/SITUATION:
"${sanitizeUserInput(body.objection)}"

AGENT'S RESPONSE:
"${sanitizeUserInput(body.userResponse)}"

${body.context ? `ADDITIONAL CONTEXT: ${sanitizeUserInput(body.context)}` : ''}

Evaluate this response and provide your analysis in the JSON format specified above.`;

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const messageContent = response.content[0];
      const responseText = messageContent.type === 'text' ? messageContent.text : '';

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as FeedbackResponse;
        return jsonResponse(parsed);
      }

      return errorResponse('Failed to parse feedback response', 500, true);
    }

    // POST /api/script
    if (url.pathname === '/api/script' && request.method === 'POST') {
      const body = (await request.json()) as ScriptRequest;

      const prompt = `${SCRIPT_GENERATION_PROMPT}

SITUATION: ${sanitizeUserInput(body.situation)}
DESIRED TONE: ${body.tone || 'professional'}
${body.constraints ? `CONSTRAINTS/REQUIREMENTS: ${body.constraints.map((c) => sanitizeUserInput(c)).join(', ')}` : ''}

Create a complete, ready-to-use script for this situation.`;

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      });

      const messageContent = response.content[0];
      const script = messageContent.type === 'text' ? messageContent.text : '';

      return jsonResponse({
        script,
        tips: [
          'Practice this script until it feels natural',
          'Adapt the wording to match your personal style',
          'Focus on the key transitions between sections',
        ],
      });
    }

    // POST /api/session/end
    if (url.pathname === '/api/session/end' && request.method === 'POST') {
      const { messages, scenario } = (await request.json()) as { messages: ChatMessage[]; scenario: string };

      if (!messages || !scenario) {
        return errorResponse('Missing required fields: messages, scenario', 400);
      }

      const userMessages = messages.filter((m) => m.role === 'user');

      const scores = { empathy: 0, objectionHandling: 0, productKnowledge: 0, closingSkill: 0 };

      userMessages.forEach((msg) => {
        const response = msg.content.toLowerCase();
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
        (feedback.empathyScore + feedback.objectionHandlingScore + feedback.productKnowledgeScore + feedback.closingScore) / 4
      );

      if (feedback.empathyScore >= 70) {
        feedback.strengths.push('Good use of empathetic language');
      } else {
        feedback.improvements.push("Try to acknowledge the prospect's feelings more directly");
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

      return jsonResponse(feedback);
    }

    return errorResponse('Not found', 404);
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return errorResponse('The AI service is temporarily busy. Please try again in a few moments.', 429, true);
      }
      if (error.status === 401) {
        return errorResponse('AI service configuration error. Please contact support.', 401, false);
      }
      return errorResponse('An error occurred with the AI service.', error.status || 500, true);
    }

    return errorResponse('An unexpected error occurred. Please try again.', 500, true);
  }
}
