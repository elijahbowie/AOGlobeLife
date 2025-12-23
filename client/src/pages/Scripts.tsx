import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  ChevronLeft,
  Plus,
  Search,
  Copy,
  CheckCircle,
  Edit3,
  Trash2,
  Wand2,
  Play,
  BookOpen,
  Mic,
  Star,
  Clock,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, Button, Badge, Input, Textarea, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui';
import { getScripts, getScriptById } from '../data/scripts';
import { Script, ScriptCategory } from '../types';
import { cn } from '../utils/cn';
import { apiService, ApiError } from '../services/api';

const categoryLabels: Record<ScriptCategory, string> = {
  cold_call: 'Cold Call',
  home_visit: 'Home Visit',
  follow_up: 'Follow Up',
  closing: 'Closing',
  objection: 'Objection',
  recruiting: 'Recruiting',
};

const categoryColors: Record<ScriptCategory, string> = {
  cold_call: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  home_visit: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  follow_up: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  closing: 'text-gold-400 bg-gold-400/10 border-gold-400/30',
  objection: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  recruiting: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
};

export function Scripts() {
  const { scriptId } = useParams<{ scriptId: string }>();
  const navigate = useNavigate();
  const [showBuilder, setShowBuilder] = useState(false);

  const scripts = getScripts();
  const selectedScript = scriptId ? getScriptById(scriptId) : null;

  if (selectedScript) {
    return <ScriptDetail script={selectedScript} onBack={() => navigate('/scripts')} />;
  }

  return (
    <div className="min-h-screen pb-8">
      <Header
        title="Script Library"
        subtitle="Master your pitch with proven scripts"
      />

      <div className="p-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowBuilder(true)}
              icon={<Wand2 className="w-4 h-4" />}
            >
              Smart Script Builder
            </Button>
            <Button
              variant="secondary"
              icon={<Plus className="w-4 h-4" />}
            >
              Create Custom Script
            </Button>
          </div>
        </div>

        <ScriptsList scripts={scripts} />
      </div>

      {/* Script Builder Modal */}
      <ScriptBuilderModal
        isOpen={showBuilder}
        onClose={() => setShowBuilder(false)}
      />
    </div>
  );
}

function ScriptsList({ scripts }: { scripts: Script[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ScriptCategory | 'all'>('all');

  const categories: Array<ScriptCategory | 'all'> = [
    'all',
    'cold_call',
    'home_visit',
    'follow_up',
    'closing',
    'objection',
    'recruiting',
  ];

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || script.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200',
              categoryFilter === cat
                ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
                : 'text-gray-400 hover:text-white hover:bg-apex-700/50'
            )}
          >
            {cat === 'all' ? 'All Scripts' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredScripts.map((script) => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>

      {filteredScripts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No scripts found</p>
        </div>
      )}
    </div>
  );
}

function ScriptCard({ script }: { script: Script }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => navigate(`/scripts/${script.id}`)}
      className="glass-card p-5 cursor-pointer border-2 border-transparent hover:border-gold-400/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-apex-700/50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{script.title}</h3>
            <Badge
              variant="default"
              className={categoryColors[script.category]}
              size="sm"
            >
              {categoryLabels[script.category]}
            </Badge>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-apex-600/50 transition-colors"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{script.description}</p>

      <div className="flex items-center flex-wrap gap-2 mb-3">
        {script.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-apex-700/50 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Play className="w-3 h-3" />
          {script.practiceCount} practices
        </span>
        {script.rating && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-gold-400" />
            {script.rating.toFixed(1)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ScriptDetail({ script, onBack }: { script: Script; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="h-16 bg-apex-800/80 backdrop-blur-xl border-b border-apex-600/50 flex items-center justify-between px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Scripts</span>
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            icon={copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied!' : 'Copy Script'}
          </Button>
          <Button size="sm" icon={<Edit3 className="w-4 h-4" />}>
            Edit
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Script Header */}
            <Card padding="lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-apex-700/50 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-gold-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-xl font-bold text-white">{script.title}</h1>
                    <Badge
                      variant="default"
                      className={categoryColors[script.category]}
                    >
                      {categoryLabels[script.category]}
                    </Badge>
                    {script.isCustom && (
                      <Badge variant="purple">Custom</Badge>
                    )}
                  </div>
                  <p className="text-gray-400">{script.description}</p>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                {script.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-apex-700/50 text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Script Content */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Script</CardTitle>
              </CardHeader>
              <div className="prose prose-invert max-w-none">
                <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                  {script.content}
                </div>
              </div>
            </Card>

            {/* Practice Section */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Practice This Script</CardTitle>
              </CardHeader>

              {!isPracticing ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-8 h-8 text-gold-400" />
                  </div>
                  <p className="text-gray-400 mb-4">
                    Practice reading this script out loud to improve your delivery.
                  </p>
                  <Button onClick={() => setIsPracticing(true)} icon={<Play className="w-4 h-4" />}>
                    Start Practice Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-apex-700/50 border border-apex-500/30">
                    <p className="text-sm text-gray-400 mb-2">Read the script out loud:</p>
                    <p className="text-gray-300 leading-relaxed">{script.content}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-red-400">
                        <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-sm">Recording...</span>
                      </div>
                      <span className="text-sm text-gray-400">0:00</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="secondary" onClick={() => setIsPracticing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsPracticing(false)}>
                        Finish & Get Feedback
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle className="text-base">Statistics</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Practice Count</span>
                  <span className="text-white font-medium">{script.practiceCount}</span>
                </div>
                {script.rating && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="flex items-center gap-1 text-gold-400 font-medium">
                      <Star className="w-4 h-4" />
                      {script.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white text-sm">
                    {new Date(script.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                <Button variant="secondary" fullWidth icon={<BookOpen className="w-4 h-4" />}>
                  View Related Products
                </Button>
                <Button variant="secondary" fullWidth icon={<Play className="w-4 h-4" />}>
                  Use in Roleplay
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScriptBuilderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [situation, setSituation] = useState('');
  const [tone, setTone] = useState<'professional' | 'friendly' | 'empathetic'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!situation.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await apiService.generateScript({
        situation,
        tone,
      });

      setGeneratedScript(response.script);
      setTips(response.tips || []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to generate script. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSituation('');
    setGeneratedScript(null);
    setTips([]);
    setError(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader>
        <ModalTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-gold-400" />
          Smart Script Builder
        </ModalTitle>
      </ModalHeader>

      <ModalBody className="space-y-6">
        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-400">{error}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setError(null)} className="text-red-400">
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {!generatedScript ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Describe your situation
              </label>
              <Textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g., Cold calling a prospect who filled out a lead card at a union meeting..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tone
              </label>
              <div className="flex gap-3">
                {(['professional', 'friendly', 'empathetic'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={cn(
                      'px-4 py-2 rounded-xl capitalize transition-all duration-200',
                      tone === t
                        ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
                        : 'bg-apex-700/50 text-gray-400 border border-apex-500/50 hover:border-apex-400'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-gold-400" />
                AI-Generated Script
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(generatedScript);
                }}
                icon={<Copy className="w-4 h-4" />}
              >
                Copy
              </Button>
            </div>
            <div className="p-4 rounded-xl bg-apex-700/30 border border-apex-500/30 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300 max-h-[400px] overflow-y-auto">
              {generatedScript}
            </div>

            {/* Tips */}
            {tips.length > 0 && (
              <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/30">
                <h4 className="text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Tips for Delivery
                </h4>
                <ul className="space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <Star className="w-3 h-3 text-gold-400 flex-shrink-0 mt-1" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        {!generatedScript ? (
          <>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              loading={isGenerating}
              disabled={!situation.trim()}
              icon={<Wand2 className="w-4 h-4" />}
            >
              Generate Script
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={handleReset}>
              Start Over
            </Button>
            <Button onClick={onClose}>
              Done
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}
