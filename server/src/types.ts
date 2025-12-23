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
