import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Play,
  Trophy,
  Clock,
  Target,
  Star,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsList, TabsTrigger, TabsContent, CircularProgress, CategoryFilter } from '../components/ui';
import { useTrainingStore, useUserStore } from '../stores';
import { getAllProducts, getProductById, getProductModules, getProductQuiz } from '../data/products';
import { ProductCategory, Product, ProductModule as ProductModuleType, QuizQuestion } from '../types';
import { cn } from '../utils/cn';

const categoryLabels: Record<ProductCategory, string> = {
  life: 'Life Insurance',
  supplemental_health: 'Supplemental Health',
  accident: 'Accident Coverage',
};

export function Products() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const products = getAllProducts();
  const selectedProduct = productId ? getProductById(productId) : null;

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => navigate('/products')} />;
  }

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Product Knowledge"
        subtitle="Master AIL's product portfolio"
      />

      <div className="p-3 sm:p-6">
        <ProductList products={products} />
      </div>
    </div>
  );
}

function ProductList({ products }: { products: Product[] }) {
  const { productProgress } = useTrainingStore();
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  const categories: Array<ProductCategory | 'all'> = ['all', 'life', 'supplemental_health', 'accident'];

  return (
    <div>
      {/* Filter Tabs */}
      <CategoryFilter
        categories={categories}
        activeCategory={filter}
        onChange={setFilter}
        labels={categoryLabels}
        allLabel="All Products"
        className="mb-4 sm:mb-6"
      />

      {/* Products Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredProducts.map((product) => {
          const progress = productProgress[product.id];
          const mastery = progress?.mastery || 0;

          return (
            <Link key={product.id} to={`/products/${product.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4 sm:p-6 h-full border-2 border-transparent hover:border-gold-400/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl">{product.icon}</div>
                  <CircularProgress
                    value={mastery}
                    size={40}
                    strokeWidth={4}
                    label={
                      <span className="text-xs font-bold text-white">{mastery}%</span>
                    }
                  />
                </div>

                <h3 className="font-semibold text-white text-sm sm:text-base mb-1">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">{product.description}</p>

                <Badge variant={mastery >= 80 ? 'success' : mastery >= 40 ? 'warning' : 'default'} size="sm">
                  {categoryLabels[product.category]}
                </Badge>

                {progress && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-apex-600/50">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Modules: {progress.modulesCompleted}/{progress.totalModules}</span>
                      {progress.quizPassed && (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle className="w-3 h-3" /> Quiz Passed
                        </span>
                      )}
                    </div>
                    <Progress value={mastery} size="sm" variant="gold" />
                  </div>
                )}

                <div className="flex items-center justify-end mt-3 sm:mt-4 text-gold-400 text-sm">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ProductDetail({ product, onBack }: { product: Product; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('learn');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const modules = getProductModules(product.id);
  const quiz = getProductQuiz(product.id);
  const { productProgress, completeProductModule, recordQuizAttempt } = useTrainingStore();
  const progress = productProgress[product.id];

  const currentModule = modules[currentModuleIndex];

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="h-14 sm:h-16 bg-apex-800/80 backdrop-blur-xl border-b border-apex-600/50 flex items-center px-3 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Products</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>

      <div className="p-3 sm:p-6">
        {/* Product Header - responsive */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:block">
            <div className="text-4xl sm:text-6xl">{product.icon}</div>
            <div className="sm:hidden">
              <CircularProgress
                value={progress?.mastery || 0}
                size={60}
                strokeWidth={6}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{product.name}</h1>
              <Badge variant="gold" size="sm">{categoryLabels[product.category]}</Badge>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{product.description}</p>

            {/* Progress Overview - responsive */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-400">
                  {progress?.modulesCompleted || 0}/{modules.length} Modules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-400">
                  Quiz: {progress?.quizPassed ? 'Passed' : 'Not taken'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-400">
                  {progress?.mastery || 0}% Mastery
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <CircularProgress
              value={progress?.mastery || 0}
              size={100}
              strokeWidth={8}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="learn" icon={<BookOpen className="w-4 h-4" />}>
              Learn
            </TabsTrigger>
            <TabsTrigger value="quiz" icon={<Trophy className="w-4 h-4" />}>
              Quiz
            </TabsTrigger>
            <TabsTrigger value="reference" icon={<Target className="w-4 h-4" />}>
              Quick Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Module Navigation - horizontal scroll on mobile, vertical on lg+ */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-3 px-3 lg:mx-0 lg:px-0 scrollbar-hide lg:space-y-2">
                {modules.map((module, index) => {
                  const isCompleted = progress && progress.modulesCompleted > index;
                  const isCurrent = index === currentModuleIndex;

                  return (
                    <button
                      key={module.id}
                      onClick={() => setCurrentModuleIndex(index)}
                      className={cn(
                        'flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal lg:w-full flex-shrink-0 lg:flex-shrink',
                        isCurrent
                          ? 'bg-gold-400/10 border border-gold-400/30'
                          : 'hover:bg-apex-700/50 border border-transparent'
                      )}
                    >
                      <div className={cn(
                        'w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        isCompleted
                          ? 'bg-emerald-400/20'
                          : isCurrent
                          ? 'bg-gold-400/20'
                          : 'bg-apex-600'
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-400" />
                        ) : (
                          <span className={cn(
                            'text-xs lg:text-sm font-medium',
                            isCurrent ? 'text-gold-400' : 'text-gray-400'
                          )}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <span className={cn(
                        'text-xs lg:text-sm font-medium lg:truncate',
                        isCurrent ? 'text-gold-400' : 'text-gray-300'
                      )}>
                        {module.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Module Content */}
              <div className="lg:col-span-3">
                <Card padding="lg">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{currentModule.title}</h2>
                  <div className="prose prose-invert max-w-none mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentModule.content}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-medium text-gold-400 mb-2 sm:mb-3 uppercase tracking-wider">
                      Key Points
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {currentModule.keyPoints.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-xl bg-apex-700/30 border border-apex-500/30"
                        >
                          <Star className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Script Snippet */}
                  {currentModule.scriptSnippet && (
                    <div className="mb-6 p-4 rounded-xl bg-apex-700/50 border border-apex-500/30">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Sample Script</h3>
                      <p className="text-gray-300 italic">"{currentModule.scriptSnippet}"</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-apex-600/50">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentModuleIndex(Math.max(0, currentModuleIndex - 1))}
                      disabled={currentModuleIndex === 0}
                      icon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Previous
                    </Button>

                    {currentModuleIndex < modules.length - 1 ? (
                      <Button
                        onClick={() => {
                          completeProductModule(product.id);
                          setCurrentModuleIndex(currentModuleIndex + 1);
                        }}
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Mark Complete & Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          completeProductModule(product.id);
                          setActiveTab('quiz');
                        }}
                        icon={<Trophy className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Take Quiz
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            {quiz && (
              <ProductQuiz
                quiz={quiz}
                onComplete={(score, passed) => {
                  recordQuizAttempt({
                    quizId: product.id,
                    score,
                    passed,
                    answers: [],
                    completedAt: new Date().toISOString(),
                    timeSpentSeconds: 0,
                  });
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="reference">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Key Features */}
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <ul className="space-y-3">
                  {product.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Selling Points */}
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Top Selling Points</CardTitle>
                </CardHeader>
                <ul className="space-y-3">
                  {product.sellingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Target Audience */}
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Target Audience</CardTitle>
                </CardHeader>
                <p className="text-gray-300">{product.targetAudience}</p>
              </Card>

              {/* Common Objections */}
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Common Objections</CardTitle>
                </CardHeader>
                <ul className="space-y-3">
                  {product.commonObjections.map((objection, i) => (
                    <li key={i} className="p-3 rounded-xl bg-apex-700/30 border border-apex-500/30">
                      <span className="text-gray-300 text-sm">"{objection}"</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProductQuiz({
  quiz,
  onComplete,
}: {
  quiz: { questions: QuizQuestion[]; passingScore: number };
  onComplete: (score: number, passed: boolean) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate score
      const correctCount = answers.filter(
        (a, i) => a === quiz.questions[i].correctAnswer
      ).length;
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      const passed = score >= quiz.passingScore;
      onComplete(score, passed);
      setQuizComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (quizComplete) {
    const correctCount = answers.filter(
      (a, i) => a === quiz.questions[i].correctAnswer
    ).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <Card padding="lg" className="max-w-2xl mx-auto text-center">
        <div className={cn(
          'w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6',
          passed ? 'bg-emerald-400/20' : 'bg-red-400/20'
        )}>
          {passed ? (
            <Trophy className="w-10 h-10 text-emerald-400" />
          ) : (
            <Target className="w-10 h-10 text-red-400" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {passed ? 'Quiz Passed!' : 'Keep Practicing'}
        </h2>
        <p className="text-gray-400 mb-6">
          You scored {score}% ({correctCount}/{quiz.questions.length} correct)
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Passing score: {quiz.passingScore}%
        </p>
        <Button onClick={() => window.location.reload()}>
          {passed ? 'Review Material' : 'Try Again'}
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </span>
        <Progress
          value={((currentQuestion + 1) / quiz.questions.length) * 100}
          className="w-32"
          size="sm"
        />
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-white mb-6">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrectness = showResult;

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={cn(
                'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                showCorrectness
                  ? isCorrect
                    ? 'bg-emerald-400/10 border-emerald-400/50'
                    : isSelected
                    ? 'bg-red-400/10 border-red-400/50'
                    : 'bg-apex-700/30 border-apex-500/30'
                  : isSelected
                  ? 'bg-gold-400/10 border-gold-400/50'
                  : 'bg-apex-700/30 border-apex-500/30 hover:border-apex-400'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border',
                showCorrectness
                  ? isCorrect
                    ? 'border-emerald-400 text-emerald-400'
                    : isSelected
                    ? 'border-red-400 text-red-400'
                    : 'border-apex-500 text-gray-400'
                  : isSelected
                  ? 'border-gold-400 text-gold-400'
                  : 'border-apex-500 text-gray-400'
              )}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-gray-200">{option}</span>
              {showCorrectness && isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="p-4 rounded-xl bg-apex-700/50 border border-apex-500/30 mb-6">
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </Card>
  );
}
