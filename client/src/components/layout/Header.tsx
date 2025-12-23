import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Flame,
  X,
  CheckCircle,
  Award,
  Clock,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { useUserStore } from '../../stores';
import { formatRelativeTime } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, notifications, markNotificationRead, markAllNotificationsRead } = useUserStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="w-4 h-4 text-gold-400" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'tip':
        return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      case 'update':
        return <Zap className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <header className="h-16 bg-apex-800/50 backdrop-blur-xl border-b border-apex-600/50 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Streak Badge */}
        {user.streak > 0 && (
          <motion.div
            className="streak-fire"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Flame className="w-4 h-4" />
            <span className="font-medium">{user.streak}</span>
          </motion.div>
        )}

        {/* Search Button */}
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 rounded-xl bg-apex-700/50 text-gray-400 hover:text-white hover:bg-apex-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-apex-700/50 text-gray-400 hover:text-white hover:bg-apex-700 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-apex-700 border border-apex-500 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-apex-600">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => markAllNotificationsRead()}
                        className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markNotificationRead(notification.id)}
                          className={cn(
                            'p-4 border-b border-apex-600/50 cursor-pointer hover:bg-apex-600/50 transition-colors',
                            !notification.read && 'bg-apex-600/30'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white text-sm">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatRelativeTime(notification.timestamp)}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-gold-400" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-apex-900/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl bg-apex-700 border border-apex-500 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-apex-600">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, scripts, objections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-1 rounded-lg hover:bg-apex-600 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {searchQuery && (
                <div className="p-4">
                  <p className="text-sm text-gray-400 mb-3">Quick Actions</p>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-apex-600/50 transition-colors text-left">
                      <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center">
                        <Search className="w-4 h-4 text-gold-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Search for "{searchQuery}"
                        </p>
                        <p className="text-xs text-gray-400">
                          Find in all content
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {!searchQuery && (
                <div className="p-4">
                  <p className="text-sm text-gray-400 mb-3">Recent Searches</p>
                  <p className="text-sm text-gray-500">No recent searches</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
