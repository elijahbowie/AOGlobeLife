import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Trophy,
  Target,
  Clock,
  Flame,
  Zap,
  ChevronRight,
  MessageSquare,
  BookOpen,
  Shield,
  FileText,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Progress, CircularProgress, Badge, Button, Avatar } from '../components/ui';
import { useUserStore, useTrainingStore } from '../stores';
import { getRankById, getNextRank } from '../data/ranks';
import { getAllProducts } from '../data/products';
import { getObjections } from '../data/objections';
import { getGreeting, formatDuration, formatRelativeTime, getStreakMessage, formatXP } from '../utils/formatters';
import { cn } from '../utils/cn';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Dashboard() {
  const { user, dailyChallenges, activityFeed } = useUserStore();
  const { productProgress, objectionProgress, skillProgress, getOverallMastery } = useTrainingStore();

  const rankInfo = getRankById(user.rank);
  const nextRank = getNextRank(user.rank);
  const products = getAllProducts();
  const objections = getObjections();
  const overallMastery = getOverallMastery();

  // Calculate progress to next rank (simplified - would need actual logic)
  const rankProgress = 65;

  // Quick actions for the dashboard
  const quickActions = [
    {
      title: 'Practice Roleplay',
      description: 'Start a coaching session',
      icon: MessageSquare,
      path: '/coach',
      color: 'text-gold-400',
      bgColor: 'bg-gold-400/10',
    },
    {
      title: 'Study Products',
      description: 'Learn product details',
      icon: BookOpen,
      path: '/products',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
    {
      title: 'Handle Objections',
      description: 'Master difficult responses',
      icon: Shield,
      path: '/objections',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Review Scripts',
      description: 'Perfect your pitch',
      icon: FileText,
      path: '/scripts',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  // Get products that need attention
  const productsToStudy = products
    .filter(p => {
      const progress = productProgress[p.id];
      return !progress || progress.mastery < 80;
    })
    .slice(0, 3);

  // Get objections that need practice
  const objectionsToMaster = objections
    .filter(o => {
      const progress = objectionProgress[o.id];
      return !progress || progress.mastery < 70;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-8">
      <Header
        title={`${getGreeting()}, ${user.name.split(' ')[0]}`}
        subtitle={getStreakMessage(user.streak)}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-3 sm:p-6 space-y-4 sm:space-y-6"
      >
        {/* Stats Row - responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {/* Overall Mastery */}
          <Card className="flex items-center gap-3 sm:gap-4">
            <CircularProgress
              value={overallMastery}
              size={56}
              strokeWidth={5}
              label={
                <span className="text-base font-bold text-white">{overallMastery}%</span>
              }
            />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-400">Overall Mastery</p>
              <p className="text-base sm:text-lg font-semibold text-white truncate">Training Score</p>
            </div>
          </Card>

          {/* XP & Level */}
          <Card className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-400">Level {user.level}</p>
              <p className="text-base sm:text-lg font-semibold text-gold-gradient truncate">{formatXP(user.xp)}</p>
            </div>
          </Card>

          {/* Total Sessions */}
          <Card className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-400">Total Sessions</p>
              <p className="text-base sm:text-lg font-semibold text-white">{user.stats.totalSessions}</p>
            </div>
          </Card>

          {/* Training Time */}
          <Card className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-400/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-400">Training Time</p>
              <p className="text-base sm:text-lg font-semibold text-white truncate">{formatDuration(user.stats.totalTimeMinutes)}</p>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid - responsive: stack on mobile, 2/3 split on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <Link to="/coach" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.path}
                      to={action.path}
                      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-apex-700/50 border border-apex-500/50 hover:border-gold-400/30 transition-all duration-200"
                    >
                      <div className={cn('w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0', action.bgColor)}>
                        <action.icon className={cn('w-5 h-5 sm:w-6 sm:h-6', action.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white group-hover:text-gold-400 transition-colors truncate">
                          {action.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">{action.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Daily Challenges */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-apex-900" />
                    </div>
                    <div>
                      <CardTitle>Daily Challenges</CardTitle>
                      <p className="text-sm text-gray-400">Complete to earn bonus XP</p>
                    </div>
                  </div>
                </CardHeader>
                <div className="space-y-4">
                  {dailyChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
                        challenge.completed
                          ? 'bg-emerald-400/5 border-emerald-400/20'
                          : 'bg-apex-700/30 border-apex-500/50'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        challenge.completed
                          ? 'bg-emerald-400/20'
                          : 'bg-apex-600'
                      )}>
                        {challenge.completed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          'font-medium',
                          challenge.completed ? 'text-emerald-400' : 'text-white'
                        )}>
                          {challenge.title}
                        </p>
                        <p className="text-sm text-gray-400">{challenge.description}</p>
                        {!challenge.completed && (
                          <div className="mt-2">
                            <Progress
                              value={challenge.current}
                              max={challenge.target}
                              size="sm"
                              variant="gold"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {challenge.current} / {challenge.target}
                            </p>
                          </div>
                        )}
                      </div>
                      <Badge variant={challenge.completed ? 'success' : 'purple'} size="lg">
                        +{challenge.xpReward} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Skills Progress */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Skills Progress</CardTitle>
                  <Link to="/coach" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1">
                    Train Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {skillProgress.slice(0, 6).map((skill) => (
                    <div key={skill.skillId} className="p-3 sm:p-4 rounded-xl bg-apex-700/30 border border-apex-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm sm:text-base truncate">{skill.skillName}</span>
                        <span className="text-xs sm:text-sm text-gold-400 flex-shrink-0 ml-2">Lvl {skill.level}</span>
                      </div>
                      <Progress value={skill.progress} size="sm" variant="gold" />
                      <p className="text-xs text-gray-500 mt-1.5">
                        {skill.practiceCount} practices
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Rank Progress Card */}
            <motion.div variants={item}>
              <Card padding="lg" glow>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400 mb-2">Current Rank</p>
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold"
                    style={{
                      backgroundColor: rankInfo?.bgColor,
                      color: rankInfo?.color,
                      borderColor: rankInfo?.borderColor,
                      borderWidth: '2px',
                    }}
                  >
                    {rankInfo?.name}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{rankInfo?.commission} commission</p>
                </div>

                {nextRank && (
                  <>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress to {nextRank.shortName}</span>
                      <span className="text-gold-400 font-medium">{rankProgress}%</span>
                    </div>
                    <Progress value={rankProgress} variant="gold" />
                    <div className="mt-4 p-3 rounded-xl bg-apex-700/50 border border-apex-500/30">
                      <p className="text-xs text-gray-400 mb-2">Requirements:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {nextRank.requirements.slice(0, 2).map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>

            {/* Streak Card */}
            <motion.div variants={item}>
              <Card padding="lg" className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-400/20 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-400">{user.streak}</p>
                    <p className="text-sm text-gray-400">Day Streak</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{getStreakMessage(user.streak)}</p>
                <p className="text-xs text-gray-500 mt-2">Best: {user.longestStreak} days</p>
              </Card>
            </motion.div>

            {/* Products to Study */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle className="text-base">Products to Study</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {productsToStudy.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">All products mastered!</p>
                    </div>
                  ) : (
                    productsToStudy.map((product) => {
                      const progress = productProgress[product.id];
                      return (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 border border-apex-500/30 transition-colors"
                        >
                          <span className="text-2xl">{product.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">{product.name}</p>
                            <Progress
                              value={progress?.mastery || 0}
                              size="sm"
                              variant={progress?.mastery && progress.mastery >= 50 ? 'gold' : 'default'}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{progress?.mastery || 0}%</span>
                        </Link>
                      );
                    })
                  )}
                </div>
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 mt-4 py-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                >
                  View All Products <ChevronRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>

            {/* Objections to Master */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle className="text-base">Objections to Master</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {objectionsToMaster.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">All objections mastered!</p>
                    </div>
                  ) : (
                    objectionsToMaster.map((objection) => {
                      const progress = objectionProgress[objection.id];
                      return (
                        <Link
                          key={objection.id}
                          to={`/objections/${objection.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 border border-apex-500/30 transition-colors"
                        >
                          <span className="text-2xl">{objection.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">{objection.shortName}</p>
                            <Progress
                              value={progress?.mastery || 0}
                              size="sm"
                              variant={progress?.mastery && progress.mastery >= 50 ? 'gold' : 'default'}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{progress?.mastery || 0}%</span>
                        </Link>
                      );
                    })
                  )}
                </div>
                <Link
                  to="/objections"
                  className="flex items-center justify-center gap-2 mt-4 py-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                >
                  View All Objections <ChevronRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={item}>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {activityFeed.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-apex-600 flex items-center justify-center flex-shrink-0">
                        {activity.type === 'session_completed' && <MessageSquare className="w-4 h-4 text-gold-400" />}
                        {activity.type === 'quiz_passed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {activity.type === 'achievement_earned' && <Trophy className="w-4 h-4 text-gold-400" />}
                        {activity.type === 'objection_mastered' && <Shield className="w-4 h-4 text-blue-400" />}
                        {activity.type === 'streak_milestone' && <Flame className="w-4 h-4 text-orange-400" />}
                        {activity.type === 'rank_up' && <TrendingUp className="w-4 h-4 text-purple-400" />}
                        {activity.type === 'script_created' && <FileText className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
                      </div>
                      {activity.xpEarned && (
                        <span className="text-xs text-purple-400 font-medium">+{activity.xpEarned} XP</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
