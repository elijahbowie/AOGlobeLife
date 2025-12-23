import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  BookOpen,
  Shield,
  Trophy,
  Zap,
  Target,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Button, Progress } from './ui';
import { useUserStore } from '../stores';
import { cn } from '../utils/cn';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Apex Sales Academy',
    description: 'Your personal training platform to master insurance sales and build a successful career at American Income Life.',
    icon: Zap,
    color: 'text-gold-400',
    bgColor: 'bg-gold-400/10',
    features: [
      'Practice with realistic roleplay scenarios',
      'Master objection handling techniques',
      'Learn AIL\'s product portfolio',
      'Track your progress and earn achievements',
    ],
  },
  {
    id: 'coach',
    title: 'Smart Coaching System',
    description: 'Practice real-world sales scenarios with our advanced coaching technology. Get instant feedback on your responses.',
    icon: MessageSquare,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    features: [
      'Cold calls, home visits, and closing scenarios',
      'Realistic prospect personas',
      'Real-time performance feedback',
      'Contextual hints when you need them',
    ],
  },
  {
    id: 'products',
    title: 'Product Knowledge Center',
    description: 'Learn everything about AIL\'s product portfolio. Complete modules, pass quizzes, and become a product expert.',
    icon: BookOpen,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    features: [
      'Whole Life, Term Life, and Supplemental products',
      'Interactive learning modules',
      'Practice quizzes with instant feedback',
      'Ready-to-use script snippets',
    ],
  },
  {
    id: 'objections',
    title: 'Objection Handling Arena',
    description: 'Master the art of handling objections. Practice with common objections and learn proven frameworks.',
    icon: Shield,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    features: [
      'Common objections with expert responses',
      'Feel-Felt-Found and other frameworks',
      'Rapid Fire mode for quick practice',
      'Track your mastery level',
    ],
  },
  {
    id: 'gamification',
    title: 'Track Your Progress',
    description: 'Stay motivated with daily challenges, achievements, and leaderboards. Compete with your peers and climb the ranks.',
    icon: Trophy,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    features: [
      'Earn XP for every training session',
      'Unlock achievements and badges',
      'Maintain your daily streak',
      'Compete on the leaderboard',
    ],
  },
  {
    id: 'recruiting',
    title: 'Build Your Team',
    description: 'Ready to grow your agency? Learn recruiting techniques and practice with realistic scenarios.',
    icon: Users,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    features: [
      'Recruiting roleplay scenarios',
      'Key talking points and rebuttals',
      'Track your path to leadership',
      'Mentor training materials',
    ],
  },
  {
    id: 'start',
    title: 'Ready to Begin?',
    description: 'You\'re all set! Start with a quick practice session or explore the dashboard.',
    icon: Target,
    color: 'text-gold-400',
    bgColor: 'bg-gold-400/10',
    features: [],
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useUserStore();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <div className="fixed inset-0 bg-apex-900 z-50 flex items-center justify-center p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-apex-900 via-apex-800 to-apex-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip Tour
            </button>
          </div>
          <Progress value={progress} variant="gold" />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            {/* Icon */}
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-6', step.bgColor)}>
              <step.icon className={cn('w-8 h-8', step.color)} />
            </div>

            {/* Title & Description */}
            <h1 className="text-2xl font-bold text-white mb-3">{step.title}</h1>
            <p className="text-gray-400 mb-6">{step.description}</p>

            {/* Features */}
            {step.features.length > 0 && (
              <div className="space-y-3 mb-8">
                {step.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-apex-600/50">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
                icon={<ChevronLeft className="w-4 h-4" />}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                icon={isLastStep ? <Zap className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {isLastStep ? 'Get Started' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i === currentStep
                  ? 'w-6 bg-gold-400'
                  : i < currentStep
                  ? 'bg-gold-400/50'
                  : 'bg-apex-600'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
