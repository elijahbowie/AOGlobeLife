/**
 * Format a number with commas for thousands
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Format a percentage value
 */
export const formatPercent = (value: number, decimals = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format minutes into hours and minutes
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Format a date into a readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date into relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
};

/**
 * Format XP with suffix
 */
export const formatXP = (xp: number): string => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`;
  }
  return `${xp} XP`;
};

/**
 * Get greeting based on time of day
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Get motivational message based on streak
 */
export const getStreakMessage = (streak: number): string => {
  if (streak === 0) return "Start your streak today!";
  if (streak < 3) return "Great start! Keep it going!";
  if (streak < 7) return "You're building momentum!";
  if (streak < 14) return "Impressive dedication!";
  if (streak < 30) return "You're on fire!";
  if (streak < 60) return "Unstoppable!";
  return "Legendary commitment!";
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Generate initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Format a score as stars (e.g., 4 out of 5 stars)
 */
export const formatStars = (score: number, maxScore = 100): string => {
  const starCount = Math.round((score / maxScore) * 5);
  return '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);
};

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
export const getOrdinal = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

/**
 * Format seconds as MM:SS
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate and format progress percentage
 */
export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

/**
 * Get mastery level info from a mastery percentage
 * Replaces complex nested ternary chains
 */
export const getMasteryLevel = (mastery: number): { label: string; variant: 'success' | 'warning' | 'default' } => {
  if (mastery >= 80) {
    return { label: 'Mastered', variant: 'success' };
  }
  if (mastery >= 50) {
    return { label: 'Learning', variant: 'warning' };
  }
  return { label: 'Beginner', variant: 'default' };
};

/**
 * Get score variant based on score value
 */
export const getScoreVariant = (score: number): 'success' | 'warning' | 'danger' | 'default' => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
};
