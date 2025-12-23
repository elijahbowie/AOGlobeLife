// ============================================
// USER & AUTH TYPES
// ============================================

export type AOGlobeLifeRank =
  | 'producer_50'
  | 'producer_60'
  | 'producer_62.5'
  | 'producer_67.5'
  | 'producer_72.5'
  | 'producer_75'
  | 'producer_77.5'
  | 'producer_80'
  | 'regional_producer'
  | 'co_executive_producer'
  | 'executive_producer'
  | 'chief_executive_producer'
  | 'partner'
  | 'senior_partner';

export interface RankInfo {
  id: AOGlobeLifeRank;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  commission: string;
  requirements: string[];
  nextRank?: AOGlobeLifeRank;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rank: AOGlobeLifeRank;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  joinedAt: string;
  agencyId: string;
  agencyName: string;
  completedOnboarding: boolean;
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  notifications: boolean;
  soundEffects: boolean;
  dailyReminders: boolean;
  reminderTime: string;
}

export interface UserStats {
  totalSessions: number;
  totalTimeMinutes: number;
  averageScore: number;
  objectionsMastered: number;
  productsCompleted: number;
  quizzesPassed: number;
  scriptsCreated: number;
  recruitingScenarios: number;
}

// ============================================
// TRAINING & PROGRESS TYPES
// ============================================

export type TrainingType =
  | 'roleplay'
  | 'quiz'
  | 'objection'
  | 'script_practice'
  | 'rapid_fire'
  | 'recruiting';

export type ScenarioType =
  | 'cold_call'
  | 'home_visit'
  | 'follow_up'
  | 'closing'
  | 'spouse_objection'
  | 'recruiting_cold'
  | 'recruiting_warm'
  | 'recruiting_career_changer';

export interface TrainingSession {
  id: string;
  type: TrainingType;
  scenario?: ScenarioType;
  startedAt: string;
  completedAt?: string;
  score?: number;
  feedback?: SessionFeedback;
  xpEarned: number;
  messages?: ChatMessage[];
}

export interface SessionFeedback {
  empathyScore: number;
  objectionHandlingScore: number;
  productKnowledgeScore: number;
  closingScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  tips: string[];
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  progress: number;
  level: number;
  practiceCount: number;
  lastPracticed?: string;
}

// ============================================
// CHAT & MESSAGING TYPES
// ============================================

export type MessageRole = 'user' | 'prospect' | 'coach' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  feedback?: MessageFeedback;
  isStreaming?: boolean;
}

export interface MessageFeedback {
  score: number;
  analysis: string;
  suggestion?: string;
  detectedObjections?: string[];
  closingAttempt?: boolean;
}

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
  avatar?: string;
}

export interface Scenario {
  id: ScenarioType;
  name: string;
  description: string;
  difficulty: 1 | 2 | 3;
  icon: string;
  category: 'sales' | 'recruiting';
  persona: ProspectPersona;
  objectives: string[];
  tips: string[];
  estimatedMinutes: number;
}

// ============================================
// PRODUCT TYPES
// ============================================

export type ProductCategory = 'life' | 'supplemental_health' | 'accident';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  keyFeatures: string[];
  targetAudience: string;
  commonObjections: string[];
  sellingPoints: string[];
  premiumRange?: string;
  icon: string;
}

export interface ProductModule {
  id: string;
  productId: string;
  title: string;
  content: string;
  keyPoints: string[];
  scriptSnippet?: string;
  order: number;
}

export interface ProductQuiz {
  id: string;
  productId: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  passed: boolean;
  answers: number[];
  completedAt: string;
  timeSpentSeconds: number;
}

export interface ProductProgress {
  productId: string;
  modulesCompleted: number;
  totalModules: number;
  quizPassed: boolean;
  bestQuizScore: number;
  mastery: number;
  lastStudied?: string;
}

// ============================================
// OBJECTION TYPES
// ============================================

export interface Objection {
  id: string;
  text: string;
  shortName: string;
  category: 'price' | 'timing' | 'trust' | 'need' | 'authority';
  difficulty: 1 | 2 | 3;
  frequency: 'very_common' | 'common' | 'occasional';
  frameworks: ObjectionFramework[];
  sampleResponses: string[];
  tips: string[];
  icon: string;
}

export interface ObjectionFramework {
  name: string;
  acronym?: string;
  steps: string[];
  example: string;
}

export interface ObjectionProgress {
  objectionId: string;
  mastery: number;
  practiceCount: number;
  averageScore: number;
  lastPracticed?: string;
  bestResponse?: string;
}

export interface RapidFireSession {
  id: string;
  objectionIds: string[];
  scores: number[];
  timePerResponse: number[];
  totalTime: number;
  averageScore: number;
  completedAt: string;
}

// ============================================
// SCRIPT TYPES
// ============================================

export type ScriptCategory =
  | 'cold_call'
  | 'home_visit'
  | 'follow_up'
  | 'closing'
  | 'objection'
  | 'recruiting';

export interface Script {
  id: string;
  title: string;
  category: ScriptCategory;
  description: string;
  content: string;
  tags: string[];
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
  practiceCount: number;
  rating?: number;
}

export interface ScriptPractice {
  scriptId: string;
  recordingUrl?: string;
  score: number;
  feedback: string;
  improvements: string[];
  completedAt: string;
}

// ============================================
// RECRUITING TYPES
// ============================================

export interface RecruitingProgress {
  codedAgents: number;
  targetAgents: number;
  recruitsThisMonth: number;
  mentorProgress: number;
  scenariosCompleted: number;
}

export interface RecruitingTalkingPoint {
  id: string;
  title: string;
  icon: string;
  mainPoint: string;
  supportingPoints: string[];
  objectionHandlers: string[];
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'streak' | 'skill' | 'volume' | 'rank' | 'special';
  requirement: AchievementRequirement;
  earnedAt?: string;
}

export interface AchievementRequirement {
  type: 'count' | 'streak' | 'score' | 'rank' | 'mastery';
  target: number;
  current?: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: TrainingType;
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
  expiresAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  aoRank: AOGlobeLifeRank;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface AgencyStats {
  totalAgents: number;
  activeAgents: number;
  totalTrainingHours: number;
  averageSessionsPerWeek: number;
  averageScore: number;
  topCategory: string;
  weeklyGrowth: number;
  achievements: number;
}

// ============================================
// ACTIVITY & NOTIFICATIONS
// ============================================

export type ActivityType =
  | 'session_completed'
  | 'quiz_passed'
  | 'objection_mastered'
  | 'achievement_earned'
  | 'streak_milestone'
  | 'rank_up'
  | 'script_created';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  xpEarned?: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'tip' | 'update';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChatRequest {
  scenario: ScenarioType;
  messages: ChatMessage[];
  userResponse: string;
}

export interface ChatResponse {
  message: ChatMessage;
  feedback?: SessionFeedback;
  isComplete?: boolean;
}

export interface AnalyzeRequest {
  objectionId: string;
  userResponse: string;
}

export interface AnalyzeResponse {
  score: number;
  analysis: string;
  improvements: string[];
  sampleBetterResponse?: string;
}

export interface ScriptBuilderRequest {
  situation: string;
  constraints?: string[];
  tone?: 'professional' | 'friendly' | 'empathetic';
}

export interface ScriptBuilderResponse {
  script: string;
  variations?: string[];
  tips?: string[];
}
