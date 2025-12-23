import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'md',
  icon,
  children,
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-apex-600 text-gray-300 border-apex-500',
    gold: 'bg-gold-400/20 text-gold-400 border-gold-400/30',
    success: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
    warning: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
    danger: 'bg-red-400/20 text-red-400 border-red-400/30',
    info: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
    purple: 'bg-purple-400/20 text-purple-400 border-purple-400/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

interface RankBadgeProps {
  rank: {
    name: string;
    shortName: string;
    color: string;
    bgColor: string;
    borderColor: string;
  };
  showFull?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RankBadge({
  rank,
  showFull = false,
  size = 'md',
  className,
}: RankBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: rank.bgColor,
        color: rank.color,
        borderColor: rank.borderColor,
      }}
    >
      {showFull ? rank.name : rank.shortName}
    </span>
  );
}

interface DifficultyBadgeProps {
  difficulty: 1 | 2 | 3;
  size?: 'sm' | 'md';
  className?: string;
}

export function DifficultyBadge({
  difficulty,
  size = 'md',
  className,
}: DifficultyBadgeProps) {
  const labels = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
  };

  const variants = {
    1: 'success',
    2: 'warning',
    3: 'danger',
  } as const;

  return (
    <Badge variant={variants[difficulty]} size={size} className={className}>
      {labels[difficulty]}
    </Badge>
  );
}

interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function XPBadge({ xp, size = 'md', className }: XPBadgeProps) {
  return (
    <Badge variant="purple" size={size} className={className}>
      +{xp} XP
    </Badge>
  );
}
