import type { Achievement, DailyChallenge } from '../types';

// ============================================
// ACHIEVEMENTS
// ============================================

export const ACHIEVEMENTS: Achievement[] = [
  // STREAK ACHIEVEMENTS
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: 'Complete a 3-day training streak',
    icon: '🔥',
    xpReward: 100,
    category: 'streak',
    requirement: { type: 'streak', target: 3 },
  },
  {
    id: 'streak-7',
    name: 'Committed',
    description: 'Complete a 7-day training streak',
    icon: '🔥',
    xpReward: 250,
    category: 'streak',
    requirement: { type: 'streak', target: 7 },
  },
  {
    id: 'streak-14',
    name: 'Dedicated',
    description: 'Complete a 14-day training streak',
    icon: '🔥',
    xpReward: 500,
    category: 'streak',
    requirement: { type: 'streak', target: 14 },
  },
  {
    id: 'streak-30',
    name: 'Unstoppable',
    description: 'Complete a 30-day training streak',
    icon: '💎',
    xpReward: 1000,
    category: 'streak',
    requirement: { type: 'streak', target: 30 },
  },
  {
    id: 'streak-60',
    name: 'Iron Will',
    description: 'Complete a 60-day training streak',
    icon: '💎',
    xpReward: 2000,
    category: 'streak',
    requirement: { type: 'streak', target: 60 },
  },
  {
    id: 'streak-100',
    name: 'Legendary',
    description: 'Complete a 100-day training streak',
    icon: '👑',
    xpReward: 5000,
    category: 'streak',
    requirement: { type: 'streak', target: 100 },
  },

  // SKILL ACHIEVEMENTS
  {
    id: 'objection-first',
    name: 'First Defense',
    description: 'Master your first objection (90%+ mastery)',
    icon: '🛡️',
    xpReward: 150,
    category: 'skill',
    requirement: { type: 'mastery', target: 1 },
  },
  {
    id: 'objection-5',
    name: 'Shield Bearer',
    description: 'Master 5 objections',
    icon: '🛡️',
    xpReward: 400,
    category: 'skill',
    requirement: { type: 'mastery', target: 5 },
  },
  {
    id: 'objection-master',
    name: 'Objection Master',
    description: 'Master all 10 common objections',
    icon: '⚔️',
    xpReward: 1000,
    category: 'skill',
    requirement: { type: 'mastery', target: 10 },
  },
  {
    id: 'product-first',
    name: 'Product Scholar',
    description: 'Pass your first product quiz with 80%+',
    icon: '📚',
    xpReward: 150,
    category: 'skill',
    requirement: { type: 'count', target: 1 },
  },
  {
    id: 'product-all',
    name: 'Product Expert',
    description: 'Pass all product quizzes with 80%+',
    icon: '🎓',
    xpReward: 750,
    category: 'skill',
    requirement: { type: 'count', target: 8 },
  },
  {
    id: 'quiz-perfect',
    name: 'Perfect Score',
    description: 'Get 100% on any product quiz',
    icon: '💯',
    xpReward: 200,
    category: 'skill',
    requirement: { type: 'score', target: 100 },
  },
  {
    id: 'rapid-fire-5',
    name: 'Quick Draw',
    description: 'Complete 5 rapid fire sessions',
    icon: '⚡',
    xpReward: 200,
    category: 'skill',
    requirement: { type: 'count', target: 5 },
  },
  {
    id: 'rapid-fire-streak',
    name: 'Lightning Reflexes',
    description: 'Score 85%+ on 5 consecutive rapid fire objections',
    icon: '⚡',
    xpReward: 350,
    category: 'skill',
    requirement: { type: 'streak', target: 5 },
  },

  // VOLUME ACHIEVEMENTS
  {
    id: 'sessions-10',
    name: 'Getting Warmed Up',
    description: 'Complete 10 coaching sessions',
    icon: '💪',
    xpReward: 200,
    category: 'volume',
    requirement: { type: 'count', target: 10 },
  },
  {
    id: 'sessions-25',
    name: 'Finding Your Rhythm',
    description: 'Complete 25 coaching sessions',
    icon: '💪',
    xpReward: 400,
    category: 'volume',
    requirement: { type: 'count', target: 25 },
  },
  {
    id: 'sessions-50',
    name: 'Training Machine',
    description: 'Complete 50 coaching sessions',
    icon: '🏋️',
    xpReward: 750,
    category: 'volume',
    requirement: { type: 'count', target: 50 },
  },
  {
    id: 'sessions-100',
    name: 'Elite Performer',
    description: 'Complete 100 coaching sessions',
    icon: '🏆',
    xpReward: 1500,
    category: 'volume',
    requirement: { type: 'count', target: 100 },
  },
  {
    id: 'sessions-250',
    name: 'Top 1%',
    description: 'Complete 250 coaching sessions',
    icon: '👑',
    xpReward: 3000,
    category: 'volume',
    requirement: { type: 'count', target: 250 },
  },
  {
    id: 'time-10',
    name: '10 Hours In',
    description: 'Spend 10 hours training',
    icon: '⏱️',
    xpReward: 300,
    category: 'volume',
    requirement: { type: 'count', target: 600 }, // 600 minutes
  },
  {
    id: 'time-50',
    name: 'Committed Learner',
    description: 'Spend 50 hours training',
    icon: '⏱️',
    xpReward: 1000,
    category: 'volume',
    requirement: { type: 'count', target: 3000 },
  },

  // RANK ACHIEVEMENTS
  {
    id: 'first-promotion',
    name: 'Moving Up',
    description: 'Earn your first rank promotion',
    icon: '📈',
    xpReward: 300,
    category: 'rank',
    requirement: { type: 'rank', target: 1 },
  },
  {
    id: 'regional',
    name: 'Regional Status',
    description: 'Reach Regional Producer rank',
    icon: '🔵',
    xpReward: 750,
    category: 'rank',
    requirement: { type: 'rank', target: 9 }, // regional_producer index
  },
  {
    id: 'executive',
    name: 'Executive Status',
    description: 'Reach Executive Producer rank',
    icon: '⭐',
    xpReward: 2000,
    category: 'rank',
    requirement: { type: 'rank', target: 11 }, // executive_producer index
  },
  {
    id: 'partner',
    name: 'Partner Level',
    description: 'Reach Partner rank',
    icon: '🔴',
    xpReward: 5000,
    category: 'rank',
    requirement: { type: 'rank', target: 13 }, // partner index
  },

  // SPECIAL ACHIEVEMENTS
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a training session before 7am',
    icon: '🌅',
    xpReward: 100,
    category: 'special',
    requirement: { type: 'count', target: 1 },
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a training session after 10pm',
    icon: '🦉',
    xpReward: 100,
    category: 'special',
    requirement: { type: 'count', target: 1 },
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Train on both Saturday and Sunday',
    icon: '🗓️',
    xpReward: 150,
    category: 'special',
    requirement: { type: 'count', target: 2 },
  },
  {
    id: 'comeback',
    name: 'The Comeback',
    description: 'Return to training after 7+ days away',
    icon: '💫',
    xpReward: 100,
    category: 'special',
    requirement: { type: 'count', target: 1 },
  },
  {
    id: 'recruiter-starter',
    name: 'Team Builder',
    description: 'Complete 5 recruiting scenarios',
    icon: '👥',
    xpReward: 300,
    category: 'special',
    requirement: { type: 'count', target: 5 },
  },
  {
    id: 'recruiter-pro',
    name: 'Recruiter Pro',
    description: 'Score 85%+ on 10 recruiting scenarios',
    icon: '👥',
    xpReward: 750,
    category: 'special',
    requirement: { type: 'count', target: 10 },
  },
  {
    id: 'script-creator',
    name: 'Script Writer',
    description: 'Create your first custom script',
    icon: '✍️',
    xpReward: 100,
    category: 'special',
    requirement: { type: 'count', target: 1 },
  },
  {
    id: 'all-scenarios',
    name: 'Jack of All Trades',
    description: 'Complete every type of training scenario',
    icon: '🎭',
    xpReward: 500,
    category: 'special',
    requirement: { type: 'count', target: 8 },
  },
  {
    id: 'top-3',
    name: 'Top 3 Finisher',
    description: 'Reach top 3 on the agency leaderboard',
    icon: '🏅',
    xpReward: 500,
    category: 'special',
    requirement: { type: 'rank', target: 3 },
  },
  {
    id: 'number-1',
    name: 'Number One',
    description: 'Reach #1 on the agency leaderboard',
    icon: '🥇',
    xpReward: 1000,
    category: 'special',
    requirement: { type: 'rank', target: 1 },
  },
];

// ============================================
// DAILY CHALLENGES TEMPLATES
// ============================================

export const DAILY_CHALLENGE_TEMPLATES: Omit<DailyChallenge, 'id' | 'current' | 'completed' | 'expiresAt'>[] = [
  {
    title: 'Objection Crusher',
    description: 'Handle 3 objections with 80%+ score',
    type: 'objection',
    target: 3,
    xpReward: 150,
  },
  {
    title: 'Rapid Fire Master',
    description: 'Complete a rapid fire session with 85%+ average',
    type: 'rapid_fire',
    target: 1,
    xpReward: 100,
  },
  {
    title: 'Product Pro',
    description: 'Pass a product quiz with 90%+ score',
    type: 'quiz',
    target: 1,
    xpReward: 125,
  },
  {
    title: 'Roleplay Champion',
    description: 'Complete 2 roleplay sessions',
    type: 'roleplay',
    target: 2,
    xpReward: 175,
  },
  {
    title: 'Script Practice',
    description: 'Practice 3 different scripts',
    type: 'script_practice',
    target: 3,
    xpReward: 100,
  },
  {
    title: 'Team Builder',
    description: 'Complete a recruiting scenario with 80%+ score',
    type: 'recruiting',
    target: 1,
    xpReward: 150,
  },
  {
    title: 'Knowledge Seeker',
    description: 'Study 2 product modules',
    type: 'quiz',
    target: 2,
    xpReward: 75,
  },
  {
    title: 'Closing Expert',
    description: 'Complete a closing scenario with 85%+ score',
    type: 'roleplay',
    target: 1,
    xpReward: 200,
  },
  {
    title: 'Variety Pack',
    description: 'Complete 3 different types of training',
    type: 'roleplay',
    target: 3,
    xpReward: 150,
  },
  {
    title: 'Endurance Test',
    description: 'Train for at least 30 minutes today',
    type: 'roleplay',
    target: 30,
    xpReward: 125,
  },
];

// ============================================
// XP SYSTEM
// ============================================

export const XP_REWARDS = {
  // Session completion
  complete_roleplay: 50,
  complete_quiz: 30,
  complete_objection_practice: 25,
  complete_rapid_fire: 40,
  complete_script_practice: 20,
  complete_recruiting_scenario: 50,

  // Performance bonuses
  score_90_plus: 25,
  score_95_plus: 50,
  perfect_score: 100,

  // Streaks
  streak_bonus_per_day: 10,
  streak_milestone_7: 100,
  streak_milestone_14: 200,
  streak_milestone_30: 500,

  // Daily challenges
  daily_challenge_complete: 0, // XP specified in challenge

  // Mastery
  objection_mastered: 75,
  product_mastered: 100,

  // First-time bonuses
  first_roleplay: 50,
  first_quiz: 30,
  first_objection: 25,
  first_script: 20,
};

export const XP_PER_LEVEL = 1000;

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};

export const calculateXPProgress = (xp: number): number => {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;
};

export const calculateXPToNextLevel = (xp: number): number => {
  return XP_PER_LEVEL - (xp % XP_PER_LEVEL);
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getAchievementById = (id: string): Achievement | undefined =>
  ACHIEVEMENTS.find((a) => a.id === id);

// Get all achievements
export const getAllAchievements = (): Achievement[] => ACHIEVEMENTS;

export const getAchievementsByCategory = (
  category: Achievement['category']
): Achievement[] => ACHIEVEMENTS.filter((a) => a.category === category);

export const generateDailyChallenge = (): DailyChallenge => {
  const template =
    DAILY_CHALLENGE_TEMPLATES[
      Math.floor(Math.random() * DAILY_CHALLENGE_TEMPLATES.length)
    ];

  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    ...template,
    id: `daily-${now.toISOString().split('T')[0]}`,
    current: 0,
    completed: false,
    expiresAt: endOfDay.toISOString(),
  };
};

export const generateDailyChallenges = (count: number = 3): DailyChallenge[] => {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const dateStr = now.toISOString().split('T')[0];

  // Shuffle and pick unique challenges
  const shuffled = [...DAILY_CHALLENGE_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((template, index) => ({
    ...template,
    id: `daily-${dateStr}-${index}`,
    current: 0,
    completed: false,
    expiresAt: endOfDay.toISOString(),
  }));
};

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'streak', name: 'Streaks', icon: '🔥' },
  { id: 'skill', name: 'Skills', icon: '⚔️' },
  { id: 'volume', name: 'Volume', icon: '💪' },
  { id: 'rank', name: 'Rank', icon: '📈' },
  { id: 'special', name: 'Special', icon: '✨' },
];
