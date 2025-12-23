import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Volume2,
  Clock,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight,
  Save,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Button, Input, Toggle, Avatar, RankBadge, Badge } from '../components/ui';
import { useUserStore } from '../stores';
import { getRankById } from '../data/ranks';
import { formatXP, formatDuration } from '../utils/formatters';

export function Settings() {
  const { user, updateSettings } = useUserStore();
  const rankInfo = getRankById(user.rank);

  const [settings, setSettings] = useState({
    notifications: user.settings.notifications,
    soundEffects: user.settings.soundEffects,
    dailyReminders: user.settings.dailyReminders,
    reminderTime: user.settings.reminderTime,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(settings);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                Profile
              </CardTitle>
            </CardHeader>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <Avatar name={user.name} size="xl" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={user.name}
                    disabled
                  />
                  <Input
                    label="Email"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Rank
                    </label>
                    <div className="flex items-center gap-2">
                      <RankBadge rank={rankInfo!} showFull size="lg" />
                      <span className="text-sm text-gray-400">{rankInfo?.commission}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Agency
                    </label>
                    <p className="text-white">{user.agencyName}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Summary */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                Training Statistics
              </CardTitle>
            </CardHeader>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-gold-400">{formatXP(user.xp)}</p>
                <p className="text-sm text-gray-400">Total XP</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">Level {user.level}</p>
                <p className="text-sm text-gray-400">Current Level</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{user.stats.totalSessions}</p>
                <p className="text-sm text-gray-400">Sessions Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{formatDuration(user.stats.totalTimeMinutes)}</p>
                <p className="text-sm text-gray-400">Training Time</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{user.stats.averageScore}%</p>
                <p className="text-sm text-gray-400">Average Score</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{user.stats.objectionsMastered}</p>
                <p className="text-sm text-gray-400">Objections Mastered</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{user.stats.productsCompleted}</p>
                <p className="text-sm text-gray-400">Products Learned</p>
              </div>
              <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                <p className="text-2xl font-bold text-white">{user.stats.quizzesPassed}</p>
                <p className="text-sm text-gray-400">Quizzes Passed</p>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                Notifications
              </CardTitle>
            </CardHeader>

            <div className="space-y-4">
              <Toggle
                label="Push Notifications"
                description="Receive notifications about achievements and reminders"
                checked={settings.notifications}
                onChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />

              <Toggle
                label="Daily Training Reminders"
                description="Get reminded to practice every day"
                checked={settings.dailyReminders}
                onChange={(checked) => setSettings({ ...settings, dailyReminders: checked })}
              />

              {settings.dailyReminders && (
                <div className="ml-6 mt-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    value={settings.reminderTime}
                    onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
                    className="bg-apex-800/80 border border-apex-500 rounded-xl px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-400/50"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Sound & Display */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-gray-400" />
                Sound & Display
              </CardTitle>
            </CardHeader>

            <div className="space-y-4">
              <Toggle
                label="Sound Effects"
                description="Play sounds for achievements and interactions"
                checked={settings.soundEffects}
                onChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
              />
            </div>
          </Card>

          {/* Quick Links */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                Help & Support
              </CardTitle>
            </CardHeader>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 transition-colors">
                <span className="text-white">Training Guide</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 transition-colors">
                <span className="text-white">Contact Support</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 transition-colors">
                <span className="text-white">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 transition-colors">
                <span className="text-white">Terms of Service</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleSave}
              loading={isSaving}
              icon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>

          {/* Logout */}
          <Card padding="lg" className="border-red-400/20">
            <button className="w-full flex items-center justify-center gap-2 p-4 text-red-400 hover:text-red-300 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </Card>

          {/* Version */}
          <div className="text-center text-sm text-gray-500">
            <p>Apex Sales Academy v1.0.0</p>
            <p>Powered by Advanced Coaching Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}
