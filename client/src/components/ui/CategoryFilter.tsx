import { cn } from '../../utils/cn';

interface CategoryFilterProps<T extends string> {
  categories: T[];
  activeCategory: T;
  onChange: (category: T) => void;
  labels?: Partial<Record<T, string>>;
  allLabel?: string;
  className?: string;
}

export function CategoryFilter<T extends string>({
  categories,
  activeCategory,
  onChange,
  labels,
  allLabel = 'All',
  className,
}: CategoryFilterProps<T>) {
  const getLabel = (cat: T): string => {
    if (cat === 'all') return allLabel;
    return labels?.[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ');
  };

  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto scrollbar-hide', className)}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200',
            activeCategory === cat
              ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
              : 'text-gray-400 hover:text-white hover:bg-apex-700/50'
          )}
        >
          {getLabel(cat)}
        </button>
      ))}
    </div>
  );
}
