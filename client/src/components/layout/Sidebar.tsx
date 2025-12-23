import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Shield,
  FileText,
  Users,
  Trophy,
  Settings,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import { useUserStore } from '../../stores';
import { getRankById } from '../../data/ranks';
import { formatXP } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const navigation = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    description: 'Overview & stats',
  },
  {
    name: 'Coach',
    path: '/coach',
    icon: MessageSquare,
    description: 'Practice scenarios',
  },
  {
    name: 'Products',
    path: '/products',
    icon: BookOpen,
    description: 'Product knowledge',
  },
  {
    name: 'Objections',
    path: '/objections',
    icon: Shield,
    description: 'Handle objections',
  },
  {
    name: 'Scripts',
    path: '/scripts',
    icon: FileText,
    description: 'Script library',
  },
  {
    name: 'Recruiting',
    path: '/recruiting',
    icon: Users,
    description: 'Build your team',
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    icon: Trophy,
    description: 'Rankings & achievements',
  },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useUserStore();
  const rankInfo = getRankById(user.rank);

  const xpToNextLevel = (user.level + 1) * 1000;
  const currentLevelXp = user.level * 1000;
  const progressInLevel = user.xp - currentLevelXp;
  const levelProgress = (progressInLevel / (xpToNextLevel - currentLevelXp)) * 100;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-apex-800/80 backdrop-blur-xl border-r border-apex-600/50 flex flex-col z-40">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-apex-600/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Zap className="w-6 h-6 text-apex-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Apex Academy</h1>
            <p className="text-xs text-gray-400">Sales Training Platform</p>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-4 mx-4 mt-4 rounded-xl bg-apex-700/50 border border-apex-500/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-apex-900 font-bold text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{user.name}</h3>
            <div
              className="text-xs font-medium px-2 py-0.5 rounded-full inline-block"
              style={{
                backgroundColor: rankInfo?.bgColor,
                color: rankInfo?.color,
                borderColor: rankInfo?.borderColor,
                borderWidth: '1px',
              }}
            >
              {rankInfo?.shortName}
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Level {user.level}</span>
            <span className="text-gold-400">{formatXP(user.xp)}</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill bg-gradient-to-r from-gold-500 to-gold-400"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Streak */}
        {user.streak > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium">{user.streak} day streak</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-apex-700 text-gold-400 border border-gold-400/20'
                  : 'text-gray-400 hover:bg-apex-700/50 hover:text-gray-100'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-gold-400' : 'text-gray-500 group-hover:text-gray-300'
                )}
              />
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-gold-400" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings Link */}
      <div className="p-4 border-t border-apex-600/50">
        <NavLink
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
            location.pathname === '/settings'
              ? 'bg-apex-700 text-gold-400 border border-gold-400/20'
              : 'text-gray-400 hover:bg-apex-700/50 hover:text-gray-100'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
