import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Trophy,
  ChevronRight,
  Play,
  Star,
  MessageSquare,
  UserPlus,
  Briefcase,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Button, Badge, Progress, CircularProgress, Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui';
import { useUserStore, useTrainingStore } from '../stores';
import { getScenarios } from '../data/scenarios';
import { cn } from '../utils/cn';

const recruitingTalkingPoints = [
  {
    id: 'flexibility',
    title: 'Schedule Flexibility',
    icon: Clock,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    mainPoint: 'Set your own hours and work around your life',
    supportingPoints: [
      'No mandatory office hours - work when you want',
      'Appointments are set around your schedule',
      'Perfect for parents, caregivers, or those with other commitments',
      'Build a part-time income that can become full-time',
    ],
    objectionHandlers: [
      'If they say "I have a full-time job": "Many of our top earners started part-time while keeping their job. You can see if this is for you without any risk."',
      'If they worry about consistency: "You control your income. The more appointments you set, the more you earn. It\'s directly tied to your effort."',
    ],
  },
  {
    id: 'income',
    title: 'Unlimited Income Potential',
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    mainPoint: 'No ceiling on what you can earn',
    supportingPoints: [
      'Commission-based with no maximum earning limit',
      'Average first-year agents earn $50,000-$80,000',
      'Top performers earn $150,000+ annually',
      'Residual income from renewals builds over time',
      'Leadership bonuses for building a team',
    ],
    objectionHandlers: [
      'If they\'re skeptical about earnings: "Let me show you exactly how the commission structure works. It\'s transparent and based on your production."',
      'If they prefer salary stability: "I understand. Many people start part-time to see the income potential before making any changes."',
    ],
  },
  {
    id: 'training',
    title: 'Comprehensive Training',
    icon: Trophy,
    color: 'text-gold-400',
    bgColor: 'bg-gold-400/10',
    mainPoint: 'No experience required - we teach you everything',
    supportingPoints: [
      'Paid training program to get you started',
      'Mentorship from successful agents',
      'Ongoing coaching and development',
      'Weekly training calls and annual conventions',
      'Access to proven scripts and systems',
    ],
    objectionHandlers: [
      'If they have no sales experience: "That\'s actually preferred! We can teach you our proven system without having to undo bad habits."',
      'If they worry about learning: "Our training is step-by-step. You\'ll shadow experienced agents before going out on your own."',
    ],
  },
  {
    id: 'purpose',
    title: 'Meaningful Work',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    mainPoint: 'Help families protect what matters most',
    supportingPoints: [
      'You\'re not selling - you\'re educating and protecting',
      'Clients are grateful because you helped them in their time of need',
      'Build lasting relationships in your community',
      'Be the person families turn to for guidance',
    ],
    objectionHandlers: [
      'If they think insurance is pushy: "We don\'t cold call random people. Our leads come from union members who requested information."',
      'If they worry about sales pressure: "Our approach is consultative. We help people understand their options and make informed decisions."',
    ],
  },
];

const recruitingScenarios = [
  {
    id: 'recruiting_cold',
    title: 'Cold Recruit',
    description: 'Starting a conversation with someone who shows interest',
    difficulty: 2 as const,
    icon: UserPlus,
    tips: [
      'Focus on their current frustrations with work',
      'Paint a picture of the lifestyle, not just the job',
      'Ask questions to understand their motivation',
    ],
  },
  {
    id: 'recruiting_warm',
    title: 'Warm Recruit',
    description: 'Following up with someone you\'ve already spoken to',
    difficulty: 1 as const,
    icon: Users,
    tips: [
      'Reference your previous conversation',
      'Address any questions they had',
      'Create urgency around the opportunity',
    ],
  },
  {
    id: 'recruiting_career_changer',
    title: 'Career Changer',
    description: 'Someone actively looking to change careers',
    difficulty: 3 as const,
    icon: Briefcase,
    tips: [
      'Focus on what they want, not what they\'re leaving',
      'Highlight the training and support available',
      'Suggest starting part-time to reduce risk',
    ],
  },
];

export function Recruiting() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useUserStore();
  const scenarios = getScenarios().filter(s => s.category === 'recruiting');

  // Mock recruiting stats
  const recruitingStats = {
    codedAgents: 3,
    targetAgents: 5,
    recruitsThisMonth: 1,
    mentorProgress: 45,
    scenariosCompleted: 8,
  };

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Recruiting Training"
        subtitle="Build your team and grow your agency"
      />

      <div className="p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{recruitingStats.codedAgents}</p>
              <p className="text-sm text-gray-400">Coded Agents</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{recruitingStats.targetAgents}</p>
              <p className="text-sm text-gray-400">Target This Quarter</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{recruitingStats.recruitsThisMonth}</p>
              <p className="text-sm text-gray-400">This Month</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{recruitingStats.scenariosCompleted}</p>
              <p className="text-sm text-gray-400">Scenarios Practiced</p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" icon={<Target className="w-4 h-4" />}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="practice" icon={<MessageSquare className="w-4 h-4" />}>
              Practice Scenarios
            </TabsTrigger>
            <TabsTrigger value="talking-points" icon={<Lightbulb className="w-4 h-4" />}>
              Talking Points
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-3 gap-6">
              {/* Progress to Next Level */}
              <Card padding="lg" glow className="col-span-2">
                <CardHeader>
                  <CardTitle>Path to Leadership</CardTitle>
                </CardHeader>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Progress to Regional Producer</span>
                    <span className="text-gold-400 font-medium">{recruitingStats.codedAgents}/{recruitingStats.targetAgents} agents</span>
                  </div>
                  <Progress
                    value={(recruitingStats.codedAgents / recruitingStats.targetAgents) * 100}
                    variant="gold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                    <p className="text-2xl font-bold text-gold-400 mb-1">5</p>
                    <p className="text-xs text-gray-400">Agents Needed</p>
                  </div>
                  <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                    <p className="text-2xl font-bold text-emerald-400 mb-1">10%</p>
                    <p className="text-xs text-gray-400">Override Commission</p>
                  </div>
                  <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 text-center">
                    <p className="text-2xl font-bold text-purple-400 mb-1">$2K+</p>
                    <p className="text-xs text-gray-400">Monthly Bonus Potential</p>
                  </div>
                </div>
              </Card>

              {/* Quick Practice */}
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Quick Practice</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {recruitingScenarios.map((scenario) => (
                    <Link
                      key={scenario.id}
                      to={`/coach/${scenario.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-apex-700/30 hover:bg-apex-700/50 border border-apex-500/30 transition-colors"
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center',
                        scenario.id === 'recruiting_cold' ? 'bg-purple-400/10' :
                        scenario.id === 'recruiting_warm' ? 'bg-blue-400/10' : 'bg-gold-400/10'
                      )}>
                        <scenario.icon className={cn('w-5 h-5',
                          scenario.id === 'recruiting_cold' ? 'text-purple-400' :
                          scenario.id === 'recruiting_warm' ? 'text-blue-400' : 'text-gold-400'
                        )} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm">{scenario.title}</p>
                        <p className="text-xs text-gray-400">{scenario.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            {/* Benefits of Building a Team */}
            <Card padding="lg" className="mt-6">
              <CardHeader>
                <CardTitle>Why Build a Team?</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    icon: DollarSign,
                    title: 'Override Income',
                    description: 'Earn a percentage of your team\'s production',
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-400/10',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Residual Growth',
                    description: 'Your income grows as your team grows',
                    color: 'text-blue-400',
                    bg: 'bg-blue-400/10',
                  },
                  {
                    icon: Trophy,
                    title: 'Leadership Bonuses',
                    description: 'Additional bonuses for team achievements',
                    color: 'text-gold-400',
                    bg: 'bg-gold-400/10',
                  },
                  {
                    icon: Users,
                    title: 'Time Leverage',
                    description: 'Multiple producers working toward your goals',
                    color: 'text-purple-400',
                    bg: 'bg-purple-400/10',
                  },
                ].map((benefit, i) => (
                  <div key={i} className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', benefit.bg)}>
                      <benefit.icon className={cn('w-5 h-5', benefit.color)} />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <div className="grid grid-cols-2 gap-6">
              {recruitingScenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center',
                      scenario.id === 'recruiting_cold' ? 'bg-purple-400/10' :
                      scenario.id === 'recruiting_warm' ? 'bg-blue-400/10' : 'bg-gold-400/10'
                    )}>
                      <scenario.icon className={cn('w-7 h-7',
                        scenario.id === 'recruiting_cold' ? 'text-purple-400' :
                        scenario.id === 'recruiting_warm' ? 'text-blue-400' : 'text-gold-400'
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{scenario.title}</h3>
                      <p className="text-gray-400">{scenario.description}</p>
                    </div>
                    <Badge
                      variant={scenario.difficulty === 1 ? 'success' : scenario.difficulty === 2 ? 'warning' : 'danger'}
                    >
                      {scenario.difficulty === 1 ? 'Easy' : scenario.difficulty === 2 ? 'Medium' : 'Hard'}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Key Tips</h4>
                    <ul className="space-y-2">
                      {scenario.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <Star className="w-3 h-3 text-gold-400 mt-1 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/coach/${scenario.id}`}>
                    <Button fullWidth icon={<Play className="w-4 h-4" />}>
                      Start Practice
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="talking-points">
            <div className="space-y-6">
              {recruitingTalkingPoints.map((point) => (
                <Card key={point.id} padding="lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', point.bgColor)}>
                      <point.icon className={cn('w-6 h-6', point.color)} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                      <p className="text-gold-400 font-medium">{point.mainPoint}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Supporting Points</h4>
                      <ul className="space-y-2">
                        {point.supportingPoints.map((sp, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {sp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Objection Handlers</h4>
                      <div className="space-y-3">
                        {point.objectionHandlers.map((handler, i) => (
                          <div key={i} className="p-3 rounded-xl bg-apex-700/30 border border-apex-500/30">
                            <p className="text-sm text-gray-300">{handler}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
