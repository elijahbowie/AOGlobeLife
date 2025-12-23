import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ChevronRight,
  ChevronLeft,
  Zap,
  Play,
  Target,
  BookOpen,
  CheckCircle,
  Trophy,
  Clock,
  Star,
  MessageSquare,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Button, Badge, Progress, CircularProgress, Tabs, TabsList, TabsTrigger, TabsContent, DifficultyBadge, Textarea, CategoryFilter } from '../components/ui';
import { useTrainingStore, useUserStore } from '../stores';
import { getObjections, getObjectionById } from '../data/objections';
import { Objection } from '../types';
import { cn } from '../utils/cn';
import { getMasteryLevel } from '../utils/formatters';

const categoryLabels = {
  price: 'Price',
  timing: 'Timing',
  trust: 'Trust',
  need: 'Need',
  authority: 'Authority',
};

const categoryColors = {
  price: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  timing: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  trust: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  need: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  authority: 'text-red-400 bg-red-400/10 border-red-400/30',
};

export function Objections() {
  const { objectionId } = useParams<{ objectionId: string }>();
  const navigate = useNavigate();
  const [rapidFireMode, setRapidFireMode] = useState(false);

  const objections = getObjections();
  const selectedObjection = objectionId ? getObjectionById(objectionId) : null;

  if (rapidFireMode) {
    return <RapidFireMode objections={objections} onExit={() => setRapidFireMode(false)} />;
  }

  if (selectedObjection) {
    return <ObjectionDetail objection={selectedObjection} onBack={() => navigate('/objections')} />;
  }

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Objection Handling"
        subtitle="Master difficult responses"
      />

      <div className="p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRapidFireMode(true)}
            className="glass-card p-6 text-left border-2 border-transparent hover:border-gold-400/30 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-apex-900" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Rapid Fire</h3>
                <p className="text-sm text-gray-400">Quick practice rounds</p>
              </div>
            </div>
          </motion.button>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {objections.filter(o => {
                  const p = useTrainingStore.getState().objectionProgress[o.id];
                  return p && p.mastery >= 80;
                }).length}
              </p>
              <p className="text-sm text-gray-400">Mastered</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {Object.values(useTrainingStore.getState().objectionProgress).reduce((acc, p) => acc + p.practiceCount, 0)}
              </p>
              <p className="text-sm text-gray-400">Total Practices</p>
            </div>
          </Card>
        </div>

        {/* Objections List */}
        <ObjectionsList objections={objections} />
      </div>
    </div>
  );
}

type ObjectionCategory = 'all' | 'price' | 'timing' | 'trust' | 'need' | 'authority';

function ObjectionsList({ objections }: { objections: Objection[] }) {
  const { objectionProgress } = useTrainingStore();
  const [filter, setFilter] = useState<ObjectionCategory>('all');

  const categories: ObjectionCategory[] = ['all', 'price', 'timing', 'trust', 'need', 'authority'];
  const filteredObjections = filter === 'all'
    ? objections
    : objections.filter(o => o.category === filter);

  return (
    <div>
      {/* Filter Tabs */}
      <CategoryFilter
        categories={categories}
        activeCategory={filter}
        onChange={setFilter}
        labels={categoryLabels}
        allLabel="All Objections"
        className="mb-6"
      />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredObjections.map((objection) => {
          const progress = objectionProgress[objection.id];
          const mastery = progress?.mastery || 0;

          return (
            <Link key={objection.id} to={`/objections/${objection.id}`}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-card p-5 border-2 border-transparent hover:border-gold-400/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{objection.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{objection.shortName}</h3>
                      <DifficultyBadge difficulty={objection.difficulty} size="sm" />
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">"{objection.text}"</p>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant="default"
                        className={categoryColors[objection.category]}
                        size="sm"
                      >
                        {categoryLabels[objection.category]}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {objection.frequency.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <CircularProgress
                    value={mastery}
                    size={50}
                    strokeWidth={4}
                    variant={mastery >= 80 ? 'success' : mastery >= 40 ? 'warning' : 'default'}
                    label={
                      <span className="text-xs font-bold text-white">{mastery}%</span>
                    }
                  />
                </div>

                {progress && (
                  <div className="mt-4 pt-3 border-t border-apex-600/50 flex items-center justify-between text-xs text-gray-500">
                    <span>{progress.practiceCount} practices</span>
                    <span>Avg: {progress.averageScore}%</span>
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ObjectionDetail({ objection, onBack }: { objection: Objection; onBack: () => void }) {
  const [practicing, setPracticing] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState<{ score: number; analysis: string; improvements: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { objectionProgress, updateObjectionProgress } = useTrainingStore();
  const { addXP } = useUserStore();
  const progress = objectionProgress[objection.id];

  const handleSubmitResponse = () => {
    if (!userResponse.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis (would connect to backend)
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      const mockFeedback = {
        score,
        analysis: "Good job acknowledging their concern! You showed empathy by validating their feelings. Consider adding more specific benefits to strengthen your response.",
        improvements: [
          "Try breaking down the cost to a daily amount",
          "Include a comparison to everyday expenses",
          "Ask a question to keep the conversation going"
        ]
      };

      setFeedback(mockFeedback);
      setIsAnalyzing(false);
      updateObjectionProgress(objection.id, score, userResponse);
      addXP(25);
    }, 1500);
  };

  const resetPractice = () => {
    setUserResponse('');
    setFeedback(null);
    setPracticing(true);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="h-16 bg-apex-800/80 backdrop-blur-xl border-b border-apex-600/50 flex items-center px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Objections</span>
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Objection Header */}
            <Card padding="lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{objection.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-xl font-bold text-white">{objection.shortName}</h1>
                    <DifficultyBadge difficulty={objection.difficulty} />
                    <Badge
                      variant="default"
                      className={categoryColors[objection.category]}
                    >
                      {categoryLabels[objection.category]}
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-300 italic">"{objection.text}"</p>
                </div>
              </div>

              {!practicing && !feedback && (
                <Button onClick={() => setPracticing(true)} size="lg" fullWidth>
                  <Play className="w-5 h-5 mr-2" /> Practice This Objection
                </Button>
              )}
            </Card>

            {/* Practice Area */}
            {practicing && !feedback && (
              <Card padding="lg">
                <h2 className="text-lg font-semibold text-white mb-4">Your Response</h2>
                <p className="text-sm text-gray-400 mb-4">
                  How would you respond to this objection? Type your response below.
                </p>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Start typing your response..."
                  rows={6}
                  className="mb-4"
                />
                <div className="flex items-center justify-end gap-3">
                  <Button variant="ghost" onClick={() => setPracticing(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitResponse}
                    loading={isAnalyzing}
                    disabled={!userResponse.trim()}
                  >
                    Get Feedback
                  </Button>
                </div>
              </Card>
            )}

            {/* Feedback */}
            {feedback && (
              <Card padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Feedback</h2>
                  <CircularProgress
                    value={feedback.score}
                    size={60}
                    strokeWidth={5}
                    variant={feedback.score >= 80 ? 'success' : feedback.score >= 60 ? 'warning' : 'danger'}
                  />
                </div>

                <div className="p-4 rounded-xl bg-apex-700/50 border border-apex-500/30 mb-4">
                  <p className="text-sm text-gray-300">Your response:</p>
                  <p className="text-gray-400 mt-2 italic">"{userResponse}"</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gold-400 mb-2">Analysis</h3>
                  <p className="text-gray-300">{feedback.analysis}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gold-400 mb-2">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {feedback.improvements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Target className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button onClick={resetPractice} fullWidth>
                  Practice Again
                </Button>
              </Card>
            )}

            {/* Frameworks */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Response Frameworks</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {objection.frameworks.map((framework, i) => (
                  <div key={i} className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-white">{framework.name}</h3>
                      {framework.acronym && (
                        <Badge variant="gold" size="sm">{framework.acronym}</Badge>
                      )}
                    </div>
                    <ul className="space-y-2 mb-3">
                      {framework.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-400 text-xs flex items-center justify-center flex-shrink-0">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 rounded-lg bg-apex-700/50 border border-apex-500/20">
                      <p className="text-xs text-gray-500 mb-1">Example:</p>
                      <p className="text-sm text-gray-300 italic">"{framework.example}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sample Responses */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Sample Responses</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {objection.sampleResponses.map((response, i) => (
                  <div key={i} className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30">
                    <p className="text-gray-300">"{response}"</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle className="text-base">Your Progress</CardTitle>
              </CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CircularProgress
                  value={progress?.mastery || 0}
                  size={100}
                  strokeWidth={8}
                />
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Practice Count</span>
                  <span className="text-white font-medium">{progress?.practiceCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Score</span>
                  <span className="text-white font-medium">{progress?.averageScore || 0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mastery Level</span>
                  {(() => {
                    const { label, variant } = getMasteryLevel(progress?.mastery || 0);
                    return <Badge variant={variant}>{label}</Badge>;
                  })()}
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle className="text-base">Pro Tips</CardTitle>
              </CardHeader>
              <ul className="space-y-3">
                {objection.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Star className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function RapidFireMode({ objections, onExit }: { objections: Objection[]; onExit: () => void }) {
  const [gameKey, setGameKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [scores, setScores] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roundObjections, setRoundObjections] = useState(() =>
    [...objections].sort(() => Math.random() - 0.5).slice(0, 5)
  );

  const resetGame = () => {
    setGameKey((k) => k + 1);
    setCurrentIndex(0);
    setUserResponse('');
    setScores([]);
    setIsComplete(false);
    setIsAnalyzing(false);
    setRoundObjections([...objections].sort(() => Math.random() - 0.5).slice(0, 5));
  };

  const currentObjection = roundObjections[currentIndex];
  const { recordRapidFireSession, updateObjectionProgress } = useTrainingStore();
  const { addXP, addActivity } = useUserStore();

  const handleSubmit = () => {
    if (!userResponse.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      const newScores = [...scores, score];
      setScores(newScores);

      updateObjectionProgress(currentObjection.id, score, userResponse);

      if (currentIndex < roundObjections.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserResponse('');
        setIsAnalyzing(false);
      } else {
        // Complete
        const avgScore = Math.round(newScores.reduce((a, b) => a + b, 0) / newScores.length);
        const xpEarned = Math.round(avgScore * 0.5 * roundObjections.length);

        recordRapidFireSession({
          id: `rf-${Date.now()}`,
          objectionIds: roundObjections.map(o => o.id),
          scores: newScores,
          timePerResponse: [],
          totalTime: 0,
          averageScore: avgScore,
          completedAt: new Date().toISOString(),
        });

        addXP(xpEarned);
        addActivity({
          type: 'session_completed',
          title: `Completed Rapid Fire round`,
          xpEarned,
        });

        setIsComplete(true);
        setIsAnalyzing(false);
      }
    }, 1000);
  };

  if (isComplete) {
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card padding="lg" className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-gold-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Rapid Fire Complete!</h2>
          <p className="text-gray-400 mb-6">
            You completed {roundObjections.length} objections
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gold-400">{avgScore}%</p>
              <p className="text-sm text-gray-400">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">+{Math.round(avgScore * 0.5 * roundObjections.length)}</p>
              <p className="text-sm text-gray-400">XP Earned</p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {roundObjections.map((obj, i) => (
              <div key={obj.id} className="flex items-center justify-between p-3 rounded-xl bg-apex-700/30">
                <span className="text-sm text-gray-300">{obj.shortName}</span>
                <Badge variant={scores[i] >= 80 ? 'success' : scores[i] >= 60 ? 'warning' : 'danger'}>
                  {scores[i]}%
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onExit} fullWidth>
              Exit
            </Button>
            <Button onClick={resetGame} fullWidth>
              Play Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Zap className="w-6 h-6 text-apex-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Rapid Fire Mode</h1>
            <p className="text-sm text-gray-400">
              Objection {currentIndex + 1} of {roundObjections.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress
            value={((currentIndex + 1) / roundObjections.length) * 100}
            className="w-32"
            size="sm"
          />
          <Button variant="ghost" onClick={onExit}>
            Exit
          </Button>
        </div>
      </div>

      {/* Current Objection */}
      <div className="max-w-2xl mx-auto">
        <Card padding="lg">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">{currentObjection.icon}</div>
            <h2 className="text-xl font-bold text-white mb-2">{currentObjection.shortName}</h2>
            <p className="text-lg text-gray-300 italic">"{currentObjection.text}"</p>
          </div>

          <Textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your response quickly..."
            rows={4}
            className="mb-4"
          />

          <Button
            onClick={handleSubmit}
            loading={isAnalyzing}
            disabled={!userResponse.trim()}
            fullWidth
            size="lg"
          >
            Submit & Next
          </Button>
        </Card>
      </div>
    </div>
  );
}
