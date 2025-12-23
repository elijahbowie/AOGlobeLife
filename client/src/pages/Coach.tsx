import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Lightbulb,
  RotateCcw,
  X,
  Target,
  Clock,
  AlertCircle,
  Phone,
  Home,
  Calendar,
  Handshake,
  Users,
  UserPlus,
  Briefcase,
  ArrowLeft,
  RefreshCw,
  LucideIcon,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button, Badge, Progress, Avatar } from '../components/ui';
import { ScenarioCard } from '../components/ScenarioCard';
import { useChatStore, useUserStore, useTrainingStore } from '../stores';
import { getScenarios, getScenarioById } from '../data/scenarios';
import type { ScenarioType, ChatMessage } from '../types';
import { formatTime } from '../utils/formatters';
import { cn } from '../utils/cn';
import { apiService, ApiError } from '../services/api';

const scenarioIcons: Record<ScenarioType, LucideIcon> = {
  cold_call: Phone,
  home_visit: Home,
  follow_up: Calendar,
  closing: Handshake,
  spouse_objection: Users,
  recruiting_cold: UserPlus,
  recruiting_warm: Users,
  recruiting_career_changer: Briefcase,
};

export function Coach() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [sessionTime, setSessionTime] = useState(0);
  const [error, setError] = useState<{ message: string; isRetryable: boolean } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    activeScenario,
    activePersona,
    messages,
    isLoading,
    isStreaming,
    liveFeedback,
    showHint,
    currentHint,
    startScenario,
    endScenario,
    resetChat,
    addMessage,
    setStreaming,
    requestHint,
    hideHint,
    setLoading,
    isSessionComplete,
    currentFeedback,
  } = useChatStore();

  const { addXP, incrementStat, addActivity } = useUserStore();
  const { startSession, endSession, updateSkillProgress } = useTrainingStore();

  const scenarios = getScenarios();

  const handleStartScenario = useCallback((id: ScenarioType) => {
    startScenario(id);
    setSessionTime(0);
    setError(null);
    startSession('roleplay', id);
    navigate(`/coach/${id}`);
  }, [startScenario, startSession, navigate]);

  // Start timer when scenario is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeScenario && !isSessionComplete) {
      interval = setInterval(() => {
        setSessionTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeScenario, isSessionComplete]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle scenario selection from URL
  useEffect(() => {
    if (scenarioId && !activeScenario) {
      const scenario = getScenarioById(scenarioId as ScenarioType);
      if (scenario) {
        handleStartScenario(scenarioId as ScenarioType);
      }
    }
  }, [scenarioId, activeScenario, handleStartScenario]);

  const handleEndScenario = () => {
    const xpEarned = calculateXP();
    addXP(xpEarned);
    incrementStat('totalSessions');
    incrementStat('totalTimeMinutes', Math.floor(sessionTime / 60));
    addActivity({
      type: 'session_completed',
      title: `Completed ${activeScenario?.name} session`,
      xpEarned,
    });

    endSession(liveFeedback.empathyScore, xpEarned);
    updateSkillProgress('presentation', 5);
    updateSkillProgress('objection-handling', 3);

    endScenario();
    setSessionTime(0);
    navigate('/coach');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || isStreaming || !activeScenario || !activePersona) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setError(null);

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    setLoading(true);

    try {
      // Create placeholder message for streaming response
      addMessage({
        role: 'prospect',
        content: '',
      });

      setLoading(false);
      setStreaming(true);

      // Stream the response from the API
      // Convert messages to API format (prospect -> assistant for Claude)
      const apiMessages = messages.map(m => ({
        role: m.role === 'prospect' ? 'assistant' as const : m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      }));

      const stream = apiService.streamChatMessage({
        scenario: activeScenario.id,
        persona: activePersona,
        messages: apiMessages,
        userResponse: userMessage,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        fullContent += chunk;
        useChatStore.getState().updateLastMessage(fullContent);
      }

      setStreaming(false);
    } catch (err) {
      setLoading(false);
      setStreaming(false);

      // Remove the empty placeholder message
      useChatStore.getState().removeLastMessage();

      if (err instanceof ApiError) {
        setError({ message: err.message, isRetryable: err.isRetryable });
      } else {
        setError({
          message: 'An unexpected error occurred. Please try again.',
          isRetryable: true
        });
      }
    }
  };

  const calculateXP = () => {
    const baseXP = 50;
    const timeBonus = Math.min(sessionTime / 60, 10) * 5;
    const scoreBonus =
      ((liveFeedback.empathyScore +
        liveFeedback.objectionHandlingScore +
        liveFeedback.productKnowledgeScore +
        liveFeedback.closingScore) /
        4) *
      0.5;
    return Math.round(baseXP + timeBonus + scoreBonus);
  };

  // If no active scenario, show scenario selection
  if (!activeScenario) {
    return (
      <div className="min-h-screen pb-8">
        <Header
          title="Coach"
          subtitle="Practice real-world sales scenarios"
        />

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">Choose a Scenario</h2>
            <p className="text-gray-400">
              Select a scenario to practice with a realistic prospect powered by advanced coaching technology.
            </p>
          </div>

          {/* Sales Scenarios */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              Sales Scenarios
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {scenarios
                .filter((s) => s.category === 'sales')
                .map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    icon={scenarioIcons[scenario.id]}
                    onStart={handleStartScenario}
                    accentColor="gold"
                  />
                ))}
            </div>
          </div>

          {/* Recruiting Scenarios */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              Recruiting Scenarios
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {scenarios
                .filter((s) => s.category === 'recruiting')
                .map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    icon={scenarioIcons[scenario.id]}
                    onStart={handleStartScenario}
                    accentColor="purple"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active scenario chat interface
  return (
    <div className="h-screen flex flex-col">
      {/* Chat Header */}
      <div className="h-16 bg-apex-800/80 backdrop-blur-xl border-b border-apex-600/50 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={handleEndScenario}
            className="p-2 rounded-xl bg-apex-700/50 text-gray-400 hover:text-white hover:bg-apex-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Avatar name={activePersona!.name} size="md" />
            <div>
              <h2 className="font-semibold text-white">{activePersona!.name}</h2>
              <p className="text-xs text-gray-400">
                {activePersona!.occupation} • {activeScenario.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-apex-700/50 text-gray-300">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(sessionTime)}</span>
          </div>

          {/* Hint Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={requestHint}
            icon={<Lightbulb className="w-4 h-4" />}
          >
            Hint
          </Button>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetChat}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>

          {/* End Session */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEndScenario}
          >
            End Session
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Scenario Context */}
            <div className="text-center py-4">
              <Badge variant="info" size="lg">
                {activeScenario.name}
              </Badge>
              <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                {activeScenario.description}
              </p>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} persona={activePersona!} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-3">
                <Avatar name={activePersona!.name} size="sm" />
                <div className="bg-apex-700 border border-apex-500 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-400 font-medium mb-1">Something went wrong</p>
                  <p className="text-sm text-gray-300">{error.message}</p>
                  {error.isRetryable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setError(null)}
                      icon={<RefreshCw className="w-4 h-4" />}
                      className="mt-2 text-red-400 hover:text-red-300"
                    >
                      Dismiss
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Hint Display */}
          <AnimatePresence>
            {showHint && currentHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mx-6 mb-4"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gold-400/10 border border-gold-400/30">
                  <Lightbulb className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gold-400 font-medium mb-1">Coaching Tip</p>
                    <p className="text-sm text-gray-300">{currentHint}</p>
                  </div>
                  <button
                    onClick={hideHint}
                    className="p-1 rounded-lg hover:bg-apex-600/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="p-4 border-t border-apex-600/50 bg-apex-800/50 backdrop-blur-xl">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your response..."
                  rows={2}
                  className="w-full bg-apex-700/50 border border-apex-500 rounded-xl px-4 py-3 text-gray-100 placeholder-apex-300 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all duration-200 resize-none"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading || isStreaming}
                icon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Side Panel - Live Feedback */}
        <div className="w-80 border-l border-apex-600/50 bg-apex-800/30 p-4 overflow-y-auto flex-shrink-0">
          <h3 className="font-semibold text-white mb-4">Live Feedback</h3>

          <div className="space-y-4">
            <FeedbackScore label="Empathy" value={liveFeedback.empathyScore} />
            <FeedbackScore label="Objection Handling" value={liveFeedback.objectionHandlingScore} />
            <FeedbackScore label="Product Knowledge" value={liveFeedback.productKnowledgeScore} />
            <FeedbackScore label="Closing Ability" value={liveFeedback.closingScore} />
          </div>

          {/* Objectives */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Objectives</h4>
            <div className="space-y-2">
              {activeScenario.objectives.map((objective, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Target className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{objective}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Tips</h4>
            <div className="space-y-2">
              {activeScenario.tips.slice(0, 3).map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prospect Info */}
          <div className="mt-6 p-4 rounded-xl bg-apex-700/50 border border-apex-500/30">
            <h4 className="text-sm font-medium text-white mb-3">About {activePersona!.name}</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p><span className="text-gray-500">Age:</span> {activePersona!.age}</p>
              <p><span className="text-gray-500">Job:</span> {activePersona!.occupation}</p>
              <p><span className="text-gray-500">Family:</span> {activePersona!.familyStatus}</p>
              <p className="text-gray-300 mt-2">{activePersona!.background}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, persona }: { message: ChatMessage; persona: any }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-end gap-3', isUser && 'flex-row-reverse')}
    >
      {!isUser && <Avatar name={persona.name} size="sm" />}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-gold-400/10 border border-gold-400/20 rounded-br-md'
            : 'bg-apex-700 border border-apex-500 rounded-bl-md'
        )}
      >
        <p className="text-gray-100 whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}

function FeedbackScore({ label, value }: { label: string; value: number }) {
  const getColor = (v: number) => {
    if (v >= 70) return 'success';
    if (v >= 40) return 'warning';
    return 'danger';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-medium text-white">{value}%</span>
      </div>
      <Progress value={value} size="sm" variant={getColor(value) as any} />
    </div>
  );
}
