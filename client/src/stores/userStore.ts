import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  UserSettings,
  UserStats,
  Achievement,
  Activity,
  Notification,
  DailyChallenge,
} from '../types';
import { ACHIEVEMENTS, generateDailyChallenges, XP_PER_LEVEL } from '../data/achievements';

interface UserState {
  // User data
  user: User;
  isLoading: boolean;
  error: string | null;

  // Achievements
  earnedAchievements: Achievement[];
  notifications: Notification[];
  unreadNotifications: number;

  // Daily challenges
  dailyChallenges: DailyChallenge[];

  // Activity feed
  activityFeed: Activity[];

  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;

  // XP & Level
  addXP: (amount: number, reason?: string) => void;
  getLevel: () => number;
  getXPProgress: () => number;

  // Streak
  updateStreak: () => void;

  // Achievements
  checkAchievements: () => void;
  earnAchievement: (achievementId: string) => void;

  // Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Activity
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;

  // Settings
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Stats
  updateStats: (stats: Partial<UserStats>) => void;
  incrementStat: (stat: keyof UserStats, amount?: number) => void;

  // Onboarding
  completeOnboarding: () => void;
}

// Default user for demo
const createDemoUser = (): User => ({
  id: 'demo-user',
  name: 'Marcus Thompson',
  email: 'marcus@apexagency.com',
  avatar: undefined,
  rank: 'executive_producer',
  xp: 8450,
  level: 9,
  streak: 14,
  longestStreak: 21,
  lastActiveDate: new Date().toISOString().split('T')[0],
  joinedAt: '2024-06-15',
  agencyId: 'apex-agency',
  agencyName: 'Apex Agency',
  completedOnboarding: true, // Set to false to show onboarding
  settings: {
    notifications: true,
    soundEffects: true,
    dailyReminders: true,
    reminderTime: '09:00',
  },
  stats: {
    totalSessions: 127,
    totalTimeMinutes: 2847,
    averageScore: 84,
    objectionsMastered: 4,
    productsCompleted: 6,
    quizzesPassed: 12,
    scriptsCreated: 3,
    recruitingScenarios: 8,
  },
});

// Initial earned achievements
const getInitialEarnedAchievements = (): Achievement[] => {
  const earnedIds = ['streak-7', 'sessions-50', 'objection-5', 'product-first'];
  return ACHIEVEMENTS.filter(a => earnedIds.includes(a.id)).map(a => ({
    ...a,
    earnedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Initial activity feed
const getInitialActivityFeed = (): Activity[] => [
  {
    id: '1',
    type: 'session_completed',
    title: 'Completed Cold Call Roleplay',
    description: 'Score: 87%',
    xpEarned: 75,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'quiz_passed',
    title: 'Passed Whole Life Quiz',
    description: 'Score: 95%',
    xpEarned: 55,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'objection_mastered',
    title: 'Mastered "I can\'t afford it"',
    description: 'Mastery: 92%',
    xpEarned: 75,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'achievement_earned',
    title: 'Achievement Unlocked: Training Machine',
    xpEarned: 750,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'streak_milestone',
    title: '14-Day Streak!',
    xpEarned: 200,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: createDemoUser(),
      isLoading: false,
      error: null,
      earnedAchievements: getInitialEarnedAchievements(),
      notifications: [],
      unreadNotifications: 0,
      dailyChallenges: generateDailyChallenges(),
      activityFeed: getInitialActivityFeed(),

      // User actions
      setUser: (user) => set({ user, error: null }),

      updateUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),

      // XP & Level
      addXP: (amount, reason) => {
        const { user, addActivity, checkAchievements } = get();

        const newXP = user.xp + amount;
        const oldLevel = Math.floor(user.xp / XP_PER_LEVEL) + 1;
        const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

        set({
          user: {
            ...user,
            xp: newXP,
            level: newLevel,
          },
        });

        // Level up notification
        if (newLevel > oldLevel) {
          get().addNotification({
            type: 'achievement',
            title: 'Level Up!',
            message: `Congratulations! You've reached Level ${newLevel}!`,
          });
        }

        // Add activity if there's a reason
        if (reason) {
          addActivity({
            type: 'session_completed',
            title: reason,
            xpEarned: amount,
          });
        }

        checkAchievements();
      },

      getLevel: () => {
        const { user } = get();
        return Math.floor(user.xp / XP_PER_LEVEL) + 1;
      },

      getXPProgress: () => {
        const { user } = get();
        return ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
      },

      // Streak
      updateStreak: () => {
        const { user, addNotification, checkAchievements } = get();

        const today = new Date().toISOString().split('T')[0];
        const lastActive = user.lastActiveDate;

        if (lastActive === today) return;

        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split('T')[0];

        const newStreak = lastActive === yesterday ? user.streak + 1 : 1;
        const newLongest = Math.max(user.longestStreak, newStreak);

        set({
          user: {
            ...user,
            streak: newStreak,
            longestStreak: newLongest,
            lastActiveDate: today,
          },
        });

        // Streak milestone notifications
        if ([7, 14, 30, 60, 100].includes(newStreak)) {
          addNotification({
            type: 'achievement',
            title: `${newStreak}-Day Streak!`,
            message: `Amazing! You've maintained a ${newStreak}-day training streak!`,
          });
        }

        checkAchievements();
      },

      // Achievements
      checkAchievements: () => {
        const { user, earnedAchievements, earnAchievement } = get();
        const earnedIds = new Set(earnedAchievements.map(a => a.id));

        ACHIEVEMENTS.forEach((achievement) => {
          if (earnedIds.has(achievement.id)) return;

          let earned = false;

          switch (achievement.requirement.type) {
            case 'streak':
              earned = user.streak >= achievement.requirement.target;
              break;
            case 'count':
              earned = user.stats.totalSessions >= achievement.requirement.target;
              break;
            case 'mastery':
              earned = user.stats.objectionsMastered >= achievement.requirement.target;
              break;
          }

          if (earned) {
            earnAchievement(achievement.id);
          }
        });
      },

      earnAchievement: (achievementId) => {
        const { earnedAchievements, addNotification, addActivity } = get();
        const earnedIds = new Set(earnedAchievements.map(a => a.id));

        if (earnedIds.has(achievementId)) return;

        const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
        if (!achievement) return;

        const earnedAchievement: Achievement = {
          ...achievement,
          earnedAt: new Date().toISOString(),
        };

        set({
          earnedAchievements: [...earnedAchievements, earnedAchievement],
        });

        // Add XP directly to avoid infinite loops
        const { user } = get();
        set({
          user: {
            ...user,
            xp: user.xp + achievement.xpReward,
          },
        });

        addNotification({
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `${achievement.icon} ${achievement.name}`,
        });

        addActivity({
          type: 'achievement_earned',
          title: `Achievement: ${achievement.name}`,
          description: achievement.description,
          xpEarned: achievement.xpReward,
        });
      },

      // Notifications
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: `notif-${Date.now()}`,
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ].slice(0, 50),
          unreadNotifications: state.unreadNotifications + 1,
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadNotifications: Math.max(0, state.unreadNotifications - 1),
        })),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadNotifications: 0,
        })),

      // Activity
      addActivity: (activity) =>
        set((state) => ({
          activityFeed: [
            {
              ...activity,
              id: `activity-${Date.now()}`,
              timestamp: new Date().toISOString(),
            },
            ...state.activityFeed,
          ].slice(0, 20),
        })),

      // Settings
      updateSettings: (settings) =>
        set((state) => ({
          user: {
            ...state.user,
            settings: { ...state.user.settings, ...settings },
          },
        })),

      // Stats
      updateStats: (stats) =>
        set((state) => ({
          user: {
            ...state.user,
            stats: { ...state.user.stats, ...stats },
          },
        })),

      incrementStat: (stat, amount = 1) =>
        set((state) => ({
          user: {
            ...state.user,
            stats: {
              ...state.user.stats,
              [stat]: (state.user.stats[stat] as number) + amount,
            },
          },
        })),

      // Onboarding
      completeOnboarding: () =>
        set((state) => ({
          user: {
            ...state.user,
            completedOnboarding: true,
          },
        })),
    }),
    {
      name: 'apex-user-storage',
      partialize: (state) => ({
        user: state.user,
        earnedAchievements: state.earnedAchievements,
        dailyChallenges: state.dailyChallenges,
        activityFeed: state.activityFeed,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to load user data from storage:', error);
          // State will automatically fall back to initial values
        } else if (state) {
          // Validate essential data exists
          if (!state.user?.id) {
            console.warn('Invalid user data in storage, resetting to default');
            state.setUser(createDemoUser());
          }
        }
      },
    }
  )
);
