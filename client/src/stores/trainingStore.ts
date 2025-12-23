import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ProductProgress,
  ObjectionProgress,
  SkillProgress,
  RapidFireSession,
  QuizAttempt,
  ScriptPractice,
  TrainingSession,
  TrainingType,
  ScenarioType,
} from '../types';

interface TrainingState {
  // Product Knowledge Progress
  productProgress: Record<string, ProductProgress>;

  // Objection Mastery
  objectionProgress: Record<string, ObjectionProgress>;

  // Skills
  skillProgress: SkillProgress[];

  // Rapid Fire History
  rapidFireSessions: RapidFireSession[];

  // Quiz History
  quizAttempts: QuizAttempt[];

  // Script Practice History
  scriptPractices: ScriptPractice[];

  // Training Session History
  trainingSessions: TrainingSession[];

  // Current Training State
  currentSession: TrainingSession | null;

  // Actions - Products
  updateProductProgress: (productId: string, progress: Partial<ProductProgress>) => void;
  completeProductModule: (productId: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;

  // Actions - Objections
  updateObjectionProgress: (objectionId: string, score: number, response?: string) => void;
  recordRapidFireSession: (session: RapidFireSession) => void;

  // Actions - Skills
  updateSkillProgress: (skillId: string, progress: number) => void;

  // Actions - Scripts
  recordScriptPractice: (practice: ScriptPractice) => void;

  // Actions - Sessions
  startSession: (type: TrainingType, scenario?: ScenarioType) => string;
  endSession: (score: number, xpEarned: number) => void;

  // Getters
  getProductMastery: (productId: string) => number;
  getObjectionMastery: (objectionId: string) => number;
  getOverallMastery: () => number;
  getRecentSessions: (count: number) => TrainingSession[];
  getSessionsByType: (type: TrainingType) => TrainingSession[];
}

const initialProductProgress: Record<string, ProductProgress> = {
  'whole-life': {
    productId: 'whole-life',
    modulesCompleted: 2,
    totalModules: 5,
    quizPassed: false,
    bestQuizScore: 0,
    mastery: 40,
    lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'term-life': {
    productId: 'term-life',
    modulesCompleted: 4,
    totalModules: 4,
    quizPassed: true,
    bestQuizScore: 95,
    mastery: 95,
    lastStudied: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'final-expense': {
    productId: 'final-expense',
    modulesCompleted: 3,
    totalModules: 4,
    quizPassed: false,
    bestQuizScore: 70,
    mastery: 65,
    lastStudied: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'hospital-indemnity': {
    productId: 'hospital-indemnity',
    modulesCompleted: 1,
    totalModules: 4,
    quizPassed: false,
    bestQuizScore: 0,
    mastery: 25,
  },
  'cancer-protection': {
    productId: 'cancer-protection',
    modulesCompleted: 0,
    totalModules: 4,
    quizPassed: false,
    bestQuizScore: 0,
    mastery: 0,
  },
  'accident-a71000': {
    productId: 'accident-a71000',
    modulesCompleted: 2,
    totalModules: 3,
    quizPassed: false,
    bestQuizScore: 55,
    mastery: 45,
  },
};

const initialObjectionProgress: Record<string, ObjectionProgress> = {
  'cant-afford': {
    objectionId: 'cant-afford',
    mastery: 85,
    practiceCount: 12,
    averageScore: 82,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'think-about-it': {
    objectionId: 'think-about-it',
    mastery: 70,
    practiceCount: 8,
    averageScore: 75,
    lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'spouse-decision': {
    objectionId: 'spouse-decision',
    mastery: 60,
    practiceCount: 5,
    averageScore: 65,
    lastPracticed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'already-have-coverage': {
    objectionId: 'already-have-coverage',
    mastery: 90,
    practiceCount: 15,
    averageScore: 88,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  'not-interested': {
    objectionId: 'not-interested',
    mastery: 45,
    practiceCount: 3,
    averageScore: 50,
  },
  'bad-timing': {
    objectionId: 'bad-timing',
    mastery: 55,
    practiceCount: 4,
    averageScore: 60,
  },
};

const initialSkillProgress: SkillProgress[] = [
  {
    skillId: 'rapport-building',
    skillName: 'Rapport Building',
    progress: 78,
    level: 3,
    practiceCount: 24,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    skillId: 'needs-analysis',
    skillName: 'Needs Analysis',
    progress: 65,
    level: 2,
    practiceCount: 18,
    lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    skillId: 'presentation',
    skillName: 'Presentation',
    progress: 82,
    level: 3,
    practiceCount: 30,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    skillId: 'objection-handling',
    skillName: 'Objection Handling',
    progress: 70,
    level: 2,
    practiceCount: 42,
    lastPracticed: new Date().toISOString(),
  },
  {
    skillId: 'closing',
    skillName: 'Closing',
    progress: 58,
    level: 2,
    practiceCount: 15,
    lastPracticed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    skillId: 'recruiting',
    skillName: 'Recruiting',
    progress: 42,
    level: 1,
    practiceCount: 8,
    lastPracticed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      productProgress: initialProductProgress,
      objectionProgress: initialObjectionProgress,
      skillProgress: initialSkillProgress,
      rapidFireSessions: [],
      quizAttempts: [],
      scriptPractices: [],
      trainingSessions: [],
      currentSession: null,

      updateProductProgress: (productId, progress) => {
        set((state) => ({
          productProgress: {
            ...state.productProgress,
            [productId]: {
              ...state.productProgress[productId],
              ...progress,
              lastStudied: new Date().toISOString(),
            },
          },
        }));
      },

      completeProductModule: (productId) => {
        set((state) => {
          const current = state.productProgress[productId];
          if (!current) return state;

          const newModulesCompleted = Math.min(
            current.modulesCompleted + 1,
            current.totalModules
          );
          const newMastery = Math.round(
            (newModulesCompleted / current.totalModules) * 100
          );

          return {
            productProgress: {
              ...state.productProgress,
              [productId]: {
                ...current,
                modulesCompleted: newModulesCompleted,
                mastery: newMastery,
                lastStudied: new Date().toISOString(),
              },
            },
          };
        });
      },

      recordQuizAttempt: (attempt) => {
        set((state) => {
          const current = state.productProgress[attempt.quizId];
          const newBestScore = current
            ? Math.max(current.bestQuizScore, attempt.score)
            : attempt.score;

          return {
            quizAttempts: [...state.quizAttempts, attempt],
            productProgress: current
              ? {
                  ...state.productProgress,
                  [attempt.quizId]: {
                    ...current,
                    bestQuizScore: newBestScore,
                    quizPassed: attempt.passed || current.quizPassed,
                    mastery: attempt.passed
                      ? Math.max(current.mastery, 90)
                      : current.mastery,
                  },
                }
              : state.productProgress,
          };
        });
      },

      updateObjectionProgress: (objectionId, score, response) => {
        set((state) => {
          const current = state.objectionProgress[objectionId];
          const newPracticeCount = (current?.practiceCount || 0) + 1;
          const currentTotal = (current?.averageScore || 0) * (current?.practiceCount || 0);
          const newAverage = Math.round((currentTotal + score) / newPracticeCount);

          // Mastery increases based on practice and performance
          const newMastery = Math.min(
            100,
            Math.round(
              (current?.mastery || 0) * 0.8 + score * 0.2 + (newPracticeCount > 10 ? 5 : 0)
            )
          );

          return {
            objectionProgress: {
              ...state.objectionProgress,
              [objectionId]: {
                objectionId,
                mastery: newMastery,
                practiceCount: newPracticeCount,
                averageScore: newAverage,
                lastPracticed: new Date().toISOString(),
                bestResponse: score > (current?.averageScore || 0) ? response : current?.bestResponse,
              },
            },
          };
        });
      },

      recordRapidFireSession: (session) => {
        set((state) => ({
          rapidFireSessions: [...state.rapidFireSessions, session],
        }));

        // Update individual objection progress
        session.objectionIds.forEach((objectionId, index) => {
          get().updateObjectionProgress(objectionId, session.scores[index]);
        });
      },

      updateSkillProgress: (skillId, progressDelta) => {
        set((state) => ({
          skillProgress: state.skillProgress.map((skill) =>
            skill.skillId === skillId
              ? {
                  ...skill,
                  progress: Math.min(100, skill.progress + progressDelta),
                  practiceCount: skill.practiceCount + 1,
                  level: Math.floor((skill.progress + progressDelta) / 25) + 1,
                  lastPracticed: new Date().toISOString(),
                }
              : skill
          ),
        }));
      },

      recordScriptPractice: (practice) => {
        set((state) => ({
          scriptPractices: [...state.scriptPractices, practice],
        }));
      },

      startSession: (type, scenario) => {
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const session: TrainingSession = {
          id: sessionId,
          type,
          scenario,
          startedAt: new Date().toISOString(),
          xpEarned: 0,
        };

        set({ currentSession: session });
        return sessionId;
      },

      endSession: (score, xpEarned) => {
        set((state) => {
          if (!state.currentSession) return state;

          const completedSession: TrainingSession = {
            ...state.currentSession,
            completedAt: new Date().toISOString(),
            score,
            xpEarned,
          };

          return {
            currentSession: null,
            trainingSessions: [...state.trainingSessions, completedSession],
          };
        });
      },

      getProductMastery: (productId) => {
        const progress = get().productProgress[productId];
        return progress?.mastery || 0;
      },

      getObjectionMastery: (objectionId) => {
        const progress = get().objectionProgress[objectionId];
        return progress?.mastery || 0;
      },

      getOverallMastery: () => {
        const { productProgress, objectionProgress, skillProgress } = get();

        const productMasteries = Object.values(productProgress).map((p) => p.mastery);
        const objectionMasteries = Object.values(objectionProgress).map((o) => o.mastery);
        const skillMasteries = skillProgress.map((s) => s.progress);

        const allMasteries = [...productMasteries, ...objectionMasteries, ...skillMasteries];

        if (allMasteries.length === 0) return 0;
        return Math.round(allMasteries.reduce((a, b) => a + b, 0) / allMasteries.length);
      },

      getRecentSessions: (count) => {
        return get()
          .trainingSessions.slice(-count)
          .reverse();
      },

      getSessionsByType: (type) => {
        return get().trainingSessions.filter((s) => s.type === type);
      },
    }),
    {
      name: 'apex-training-storage',
      partialize: (state) => ({
        productProgress: state.productProgress,
        objectionProgress: state.objectionProgress,
        skillProgress: state.skillProgress,
        rapidFireSessions: state.rapidFireSessions,
        quizAttempts: state.quizAttempts,
        scriptPractices: state.scriptPractices,
        trainingSessions: state.trainingSessions,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to load training data from storage:', error);
          // State will automatically fall back to initial values
        }
      },
    }
  )
);
