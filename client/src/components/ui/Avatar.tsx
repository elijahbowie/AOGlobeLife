import { cn } from '../../utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-apex-900 font-bold',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

interface AvatarGroupProps {
  users: Array<{ name: string; src?: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({
  users,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const displayed = users.slice(0, max);
  const remaining = users.length - max;

  const overlapClasses = {
    xs: '-ml-2',
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={cn('flex items-center', className)}>
      {displayed.map((user, index) => (
        <div
          key={index}
          className={cn(
            'ring-2 ring-apex-800 rounded-full',
            index > 0 && overlapClasses[size]
          )}
        >
          <Avatar name={user.name} src={user.src} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full bg-apex-600 flex items-center justify-center text-gray-300 font-medium ring-2 ring-apex-800',
            sizeClasses[size],
            overlapClasses[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
