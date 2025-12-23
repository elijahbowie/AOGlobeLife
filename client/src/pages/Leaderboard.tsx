import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  Star,
  TrendingUp,
  Users,
  Target,
  Lock,
  CheckCircle,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Badge, Progress, Avatar, RankBadge, Tabs, TabsList, TabsTrigger, TabsContent, CircularProgress } from '../components/ui';
import { useUserStore } from '../stores';
import { getRankById } from '../data/ranks';
import { getAllAchievements, getAchievementsByCategory } from '../data/achievements';
import { LeaderboardEntry, Achievement } from '../types';
import { formatXP, formatRelativeTime } from '../utils/formatters';
import { cn } from '../utils/cn';

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: '1', name: 'Sarah Mitchell', aoRank: 'senior_partner', xp: 156420, streak: 45 },
  { rank: 2, userId: '2', name: 'Marcus Thompson', aoRank: 'executive_producer', xp: 89500, streak: 14, isCurrentUser: true },
  { rank: 3, userId: '3', name: 'David Chen', aoRank: 'co_executive_producer', xp: 78200, streak: 28 },
  { rank: 4, userId: '4', name: 'Amanda Foster', aoRank: 'regional_producer', xp: 65800, streak: 7 },
  { rank: 5, userId: '5', name: 'James Wilson', aoRank: 'producer_80', xp: 54300, streak: 12 },
  { rank: 6, userId: '6', name: 'Lisa Rodriguez', aoRank: 'producer_75', xp: 48100, streak: 5 },
  { rank: 7, userId: '7', name: 'Kevin Brown', aoRank: 'producer_72.5', xp: 42700, streak: 9 },
  { rank: 8, userId: '8', name: 'Michelle Lee', aoRank: 'producer_67.5', xp: 38400, streak: 3 },
  { rank: 9, userId: '9', name: 'Robert Taylor', aoRank: 'producer_62.5', xp: 31200, streak: 0 },
  { rank: 10, userId: '10', name: 'Jennifer Davis', aoRank: 'producer_60', xp: 25600, streak: 2 },
];

const getRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-gold-400" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="text-gray-400 font-bold w-5 text-center">{rank}</span>;
  }
};

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const { user, earnedAchievements } = useUserStore();
  const allAchievements = getAllAchievements();

  const earnedIds = new Set(earnedAchievements.map((a) => a.id));
  const earnedCount = earnedAchievements.length;
  const totalCount = allAchievements.length;

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Leaderboard & Achievements"
        subtitle="Track your progress and compete"
      />

      <div className="p-6">
        <Tabs defaultValue="leaderboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="leaderboard" icon={<Trophy className="w-4 h-4" />}>
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="achievements" icon={<Star className="w-4 h-4" />}>
              Achievements ({earnedCount}/{totalCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard">
            <div className="grid grid-cols-3 gap-6">
              {/* Main Leaderboard */}
              <div className="col-span-2">
                <Card padding="none">
                  {/* Top 3 Podium */}
                  <div className="p-6 border-b border-apex-600/50">
                    <div className="flex items-end justify-center gap-4 mb-6">
                      {/* 2nd Place */}
                      <div className="flex flex-col items-center">
                        <Avatar name={mockLeaderboard[1].name} size="lg" />
                        <div className="mt-2 text-center">
                          <p className="font-medium text-white text-sm">{mockLeaderboard[1].name}</p>
                          <p className="text-xs text-gray-400">{formatXP(mockLeaderboard[1].xp)}</p>
                        </div>
                        <div className="mt-2 w-20 h-16 bg-gray-300/20 rounded-t-lg flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-300">2</span>
                        </div>
                      </div>

                      {/* 1st Place */}
                      <div className="flex flex-col items-center -mb-4">
                        <div className="relative">
                          <Avatar name={mockLeaderboard[0].name} size="xl" />
                          <Crown className="w-8 h-8 text-gold-400 absolute -top-3 left-1/2 -translate-x-1/2" />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="font-semibold text-white">{mockLeaderboard[0].name}</p>
                          <p className="text-sm text-gold-400">{formatXP(mockLeaderboard[0].xp)}</p>
                        </div>
                        <div className="mt-2 w-24 h-24 bg-gold-400/20 rounded-t-lg flex items-center justify-center">
                          <span className="text-3xl font-bold text-gold-400">1</span>
                        </div>
                      </div>

                      {/* 3rd Place */}
                      <div className="flex flex-col items-center">
                        <Avatar name={mockLeaderboard[2].name} size="lg" />
                        <div className="mt-2 text-center">
                          <p className="font-medium text-white text-sm">{mockLeaderboard[2].name}</p>
                          <p className="text-xs text-gray-400">{formatXP(mockLeaderboard[2].xp)}</p>
                        </div>
                        <div className="mt-2 w-20 h-12 bg-amber-600/20 rounded-t-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-amber-600">3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full List */}
                  <div className="divide-y divide-apex-600/50">
                    {mockLeaderboard.map((entry) => {
                      const rankInfo = getRankById(entry.aoRank);
                      const isCurrentUser = entry.isCurrentUser;

                      return (
                        <div
                          key={entry.userId}
                          className={cn(
                            'flex items-center gap-4 px-6 py-4 transition-colors',
                            isCurrentUser
                              ? 'bg-gold-400/5 border-l-2 border-gold-400'
                              : 'hover:bg-apex-700/30'
                          )}
                        >
                          <div className="w-8 flex items-center justify-center">
                            {getRankMedal(entry.rank)}
                          </div>

                          <Avatar name={entry.name} size="md" />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn(
                                'font-medium truncate',
                                isCurrentUser ? 'text-gold-400' : 'text-white'
                              )}>
                                {entry.name}
                              </p>
                              {isCurrentUser && (
                                <Badge variant="gold" size="sm">You</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <RankBadge rank={rankInfo!} size="sm" />
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-white">{formatXP(entry.xp)}</p>
                            {entry.streak > 0 && (
                              <div className="flex items-center justify-end gap-1 text-orange-400 text-xs mt-0.5">
                                <Flame className="w-3 h-3" />
                                <span>{entry.streak} day streak</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Your Stats */}
                <Card padding="lg" glow>
                  <CardHeader>
                    <CardTitle className="text-base">Your Ranking</CardTitle>
                  </CardHeader>
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <Avatar name={user.name} size="xl" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-apex-900 font-bold text-sm">
                        #2
                      </div>
                    </div>
                    <p className="font-semibold text-white mt-3">{user.name}</p>
                    <p className="text-sm text-gold-400">{formatXP(user.xp)}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-apex-700/30">
                      <span className="text-sm text-gray-400">Global Rank</span>
                      <span className="font-medium text-white">#2 of 847</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-apex-700/30">
                      <span className="text-sm text-gray-400">Agency Rank</span>
                      <span className="font-medium text-white">#1 of 24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-apex-700/30">
                      <span className="text-sm text-gray-400">Current Streak</span>
                      <span className="font-medium text-orange-400 flex items-center gap-1">
                        <Flame className="w-4 h-4" /> {user.streak} days
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Weekly Progress */}
                <Card padding="lg">
                  <CardHeader>
                    <CardTitle className="text-base">This Week</CardTitle>
                  </CardHeader>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">XP Earned</span>
                        <span className="text-sm text-gold-400">+2,450</span>
                      </div>
                      <Progress value={70} variant="gold" size="sm" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Sessions</span>
                        <span className="text-sm text-white">8 / 10</span>
                      </div>
                      <Progress value={80} variant="default" size="sm" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Rank Change</span>
                        <span className="text-sm text-emerald-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> +3 positions
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recent Achievements */}
                <Card padding="lg">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Achievements</CardTitle>
                  </CardHeader>
                  <div className="space-y-3">
                    {earnedAchievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-apex-700/30 border border-gold-400/20"
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white text-sm truncate">{achievement.name}</p>
                          <p className="text-xs text-gray-400">
                            {achievement.earnedAt && formatRelativeTime(achievement.earnedAt)}
                          </p>
                        </div>
                        <Badge variant="purple" size="sm">+{achievement.xpReward} XP</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsView
              allAchievements={allAchievements}
              earnedIds={earnedIds}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AchievementsView({
  allAchievements,
  earnedIds,
}: {
  allAchievements: Achievement[];
  earnedIds: Set<string>;
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'streak', 'skill', 'volume', 'rank', 'special'];
  const categoryLabels: Record<string, string> = {
    all: 'All',
    streak: 'Streaks',
    skill: 'Skills',
    volume: 'Volume',
    rank: 'Rank',
    special: 'Special',
  };

  const filteredAchievements = categoryFilter === 'all'
    ? allAchievements
    : allAchievements.filter(a => a.category === categoryFilter);

  const earnedInCategory = filteredAchievements.filter(a => earnedIds.has(a.id)).length;

  return (
    <div>
      {/* Progress Overview */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {categories.slice(1).map((cat) => {
          const catAchievements = getAchievementsByCategory(cat as any);
          const earned = catAchievements.filter(a => earnedIds.has(a.id)).length;
          const total = catAchievements.length;
          const progress = total > 0 ? (earned / total) * 100 : 0;

          return (
            <Card key={cat} padding="md" className="text-center">
              <CircularProgress
                value={progress}
                size={60}
                strokeWidth={5}
                variant={progress === 100 ? 'success' : 'gold'}
                label={
                  <span className="text-xs font-bold text-white">
                    {earned}/{total}
                  </span>
                }
              />
              <p className="text-sm text-gray-400 mt-2 capitalize">{categoryLabels[cat]}</p>
            </Card>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'px-4 py-2 rounded-xl font-medium transition-all duration-200',
              categoryFilter === cat
                ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
                : 'text-gray-400 hover:text-white hover:bg-apex-700/50'
            )}
          >
            {categoryLabels[cat]}
          </button>
        ))}
        <div className="ml-auto text-sm text-gray-400">
          {earnedInCategory} / {filteredAchievements.length} earned
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredAchievements.map((achievement) => {
          const isEarned = earnedIds.has(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: isEarned ? 1.02 : 1 }}
              className={cn(
                'p-4 rounded-2xl border text-center transition-all duration-200',
                isEarned
                  ? 'bg-apex-700/50 border-gold-400/30 shadow-glow-gold'
                  : 'bg-apex-800/50 border-apex-600/50 opacity-60'
              )}
            >
              <div className={cn(
                'text-4xl mb-3',
                !isEarned && 'grayscale'
              )}>
                {achievement.icon}
              </div>
              <h3 className={cn(
                'font-semibold mb-1',
                isEarned ? 'text-white' : 'text-gray-500'
              )}>
                {achievement.name}
              </h3>
              <p className={cn(
                'text-xs mb-2',
                isEarned ? 'text-gray-400' : 'text-gray-600'
              )}>
                {achievement.description}
              </p>
              <Badge
                variant={isEarned ? 'gold' : 'default'}
                size="sm"
              >
                {isEarned ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> +{achievement.xpReward} XP
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {achievement.xpReward} XP
                  </span>
                )}
              </Badge>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
