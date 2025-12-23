import { create } from 'zustand';
import type {
  ChatMessage,
  ScenarioType,
  SessionFeedback,
  Scenario,
  ProspectPersona,
} from '../types';
import { getScenarioById } from '../data/scenarios';

interface ChatState {
  // Current session
  activeScenario: Scenario | null;
  activePersona: ProspectPersona | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;

  // Session feedback
  currentFeedback: SessionFeedback | null;
  liveFeedback: {
    empathyScore: number;
    objectionHandlingScore: number;
    productKnowledgeScore: number;
    closingScore: number;
  };

  // Session state
  sessionStartTime: Date | null;
  messageCount: number;
  isSessionComplete: boolean;

  // Hint system
  showHint: boolean;
  currentHint: string | null;

  // Actions
  startScenario: (scenarioId: ScenarioType) => void;
  endScenario: () => void;
  resetChat: () => void;

  // Messages
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  removeLastMessage: () => void;
  setStreaming: (isStreaming: boolean) => void;

  // Feedback
  updateLiveFeedback: (feedback: Partial<ChatState['liveFeedback']>) => void;
  setSessionFeedback: (feedback: SessionFeedback) => void;

  // Hints
  requestHint: () => void;
  hideHint: () => void;

  // State
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  completeSession: () => void;
}

const initialLiveFeedback = {
  empathyScore: 0,
  objectionHandlingScore: 0,
  productKnowledgeScore: 0,
  closingScore: 0,
};

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial state
  activeScenario: null,
  activePersona: null,
  messages: [],
  isLoading: false,
  isStreaming: false,
  error: null,
  currentFeedback: null,
  liveFeedback: initialLiveFeedback,
  sessionStartTime: null,
  messageCount: 0,
  isSessionComplete: false,
  showHint: false,
  currentHint: null,

  // Start a new scenario
  startScenario: (scenarioId) => {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      set({ error: 'Scenario not found' });
      return;
    }

    // Create initial prospect message based on scenario
    const openingMessages: Record<ScenarioType, string> = {
      cold_call: `Hello? This is ${scenario.persona.name}.`,
      home_visit: `Hi, come on in. So you're from American Income Life? My neighbor mentioned you might be calling. Have a seat.`,
      follow_up: `Oh hey, yeah I remember you. Sorry I haven't gotten back to you - it's been crazy at work.`,
      closing: `Okay so we've talked through everything. I think I understand what you're offering. What happens next?`,
      spouse_objection: `Look, I appreciate all the information, but I really can't make this decision without talking to my wife first.`,
      budget_conscious: `I hear what you're saying about the coverage, but honestly, we're really tight on money right now. I don't see how we can afford another bill.`,
      recruiting_cold: `Oh, you work in insurance? That's interesting. I've always wondered what that's like.`,
      recruiting_warm: `You mentioned something about a career opportunity last time we talked. What's that all about?`,
      recruiting_career_changer: `I'm so burned out at my current job. I've been thinking about making a change but I don't know where to start.`,
      recruiting_income: `Before I commit to anything, I need to understand exactly how the money works. Walk me through the compensation - and be straight with me, not just the best-case scenarios.`,
    };

    set({
      activeScenario: scenario,
      activePersona: scenario.persona,
      messages: [
        {
          id: 'initial-message',
          role: 'prospect',
          content: openingMessages[scenarioId] || 'Hello?',
          timestamp: new Date().toISOString(),
        },
      ],
      isLoading: false,
      isStreaming: false,
      error: null,
      currentFeedback: null,
      liveFeedback: initialLiveFeedback,
      sessionStartTime: new Date(),
      messageCount: 0,
      isSessionComplete: false,
      showHint: false,
      currentHint: null,
    });
  },

  // End current scenario
  endScenario: () => {
    set({
      activeScenario: null,
      activePersona: null,
      messages: [],
      liveFeedback: initialLiveFeedback,
      sessionStartTime: null,
      isSessionComplete: false,
    });
  },

  // Reset chat
  resetChat: () => {
    const { activeScenario } = get();
    if (activeScenario) {
      get().startScenario(activeScenario.id);
    }
  },

  // Add a message
  addMessage: (message) => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id,
          timestamp: new Date().toISOString(),
        },
      ],
      messageCount: state.messageCount + (message.role === 'user' ? 1 : 0),
    }));
  },

  // Update the last message (for streaming)
  updateLastMessage: (content) => {
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
        };
      }
      return { messages };
    });
  },

  // Remove the last message (for error recovery)
  removeLastMessage: () => {
    set((state) => ({
      messages: state.messages.slice(0, -1),
    }));
  },

  // Set streaming state
  setStreaming: (isStreaming) => set({ isStreaming }),

  // Update live feedback scores
  updateLiveFeedback: (feedback) => {
    set((state) => ({
      liveFeedback: { ...state.liveFeedback, ...feedback },
    }));
  },

  // Set final session feedback
  setSessionFeedback: (feedback) => {
    set({
      currentFeedback: feedback,
      isSessionComplete: true,
    });
  },

  // Request a hint
  requestHint: () => {
    const { activeScenario, messages } = get();
    if (!activeScenario) return;

    // Generate contextual hints based on scenario and conversation
    const lastProspectMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'prospect');

    let hint = '';

    if (lastProspectMessage) {
      const content = lastProspectMessage.content.toLowerCase();

      // Check for common objection patterns
      if (content.includes('afford') || content.includes('expensive') || content.includes('cost')) {
        hint = 'The prospect is concerned about cost. Try breaking down the price to a daily amount and compare it to everyday expenses. Focus on value, not price.';
      } else if (content.includes('think about it') || content.includes('let me think')) {
        hint = 'This usually means there\'s an unaddressed concern. Ask what specifically they need to think about to uncover the real objection.';
      } else if (content.includes('spouse') || content.includes('wife') || content.includes('husband')) {
        hint = 'Validate their desire to include their spouse. Offer to schedule a call with both of them, or equip them with answers for common questions.';
      } else if (content.includes('already have') || content.includes('through work')) {
        hint = 'Ask how much coverage their employer provides. Most only offer 1-2x salary - experts recommend 10-12x. Also ask what happens if they change jobs.';
      } else {
        // Generic hints based on scenario type
        const scenarioHints: Record<ScenarioType, string[]> = {
          cold_call: [
            'Mention the union/association connection to build credibility.',
            'Focus on setting an appointment, not selling on this call.',
            'Be respectful of their time while creating curiosity.',
          ],
          home_visit: [
            'Start with questions about their family before presenting solutions.',
            'Listen for pain points and emotional hot buttons.',
            'Summarize their needs back to them before presenting options.',
          ],
          follow_up: [
            'Reference specific points from your last conversation.',
            'Ask what questions came up since you last spoke.',
            'Create urgency around locking in their current rates.',
          ],
          closing: [
            'Summarize the benefits they\'ve agreed to throughout the conversation.',
            'Use assumptive language - "Do you prefer the 1st or 15th for billing?"',
            'Address any remaining concerns before asking for the sale.',
          ],
          spouse_objection: [
            'Never make them feel bad for wanting spouse input.',
            'Offer to schedule a call with both of them.',
            'Give them talking points for the conversation with their spouse.',
          ],
          budget_conscious: [
            'Break down the cost to daily amounts - "less than a coffee."',
            'Ask what they CAN afford rather than arguing about the price.',
            'Some coverage is infinitely better than no coverage.',
          ],
          recruiting_cold: [
            'Lead with lifestyle benefits, not income claims.',
            'Ask about their current situation and what they\'d change.',
            'Qualify them - not everyone is a good fit.',
          ],
          recruiting_warm: [
            'Your relationship is more important than the recruit.',
            'Be honest about both the rewards and the challenges.',
            'Share your personal experience and results.',
          ],
          recruiting_career_changer: [
            'Focus on what they want, not what they\'re leaving.',
            'Highlight the training and support available.',
            'Suggest starting part-time to reduce risk.',
          ],
          recruiting_income: [
            'Be transparent about the commission structure - 50% to start.',
            'Set realistic expectations about year 1 vs years 2-3.',
            'Emphasize the business-building income (overrides), not just sales.',
          ],
        };

        const hints = scenarioHints[activeScenario.id as ScenarioType] || [];
        hint = hints[Math.floor(Math.random() * hints.length)] || 'Listen carefully to the prospect and respond to their specific concerns.';
      }
    } else {
      hint = 'Start by building rapport and asking questions to understand their situation.';
    }

    set({
      showHint: true,
      currentHint: hint,
    });
  },

  // Hide hint
  hideHint: () => set({ showHint: false }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Complete the session
  completeSession: () => set({ isSessionComplete: true }),
}));
