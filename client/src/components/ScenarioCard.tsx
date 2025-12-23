import { motion } from 'framer-motion';
import { Clock, LucideIcon } from 'lucide-react';
import { Avatar, DifficultyBadge } from './ui';
import type { Scenario, ScenarioType } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  icon: LucideIcon;
  onStart: (id: ScenarioType) => void;
  accentColor?: 'gold' | 'purple';
}

export function ScenarioCard({
  scenario,
  icon: Icon,
  onStart,
  accentColor = 'gold'
}: ScenarioCardProps) {
  const colorClasses = {
    gold: {
      iconBg: 'bg-gold-400/10',
      iconText: 'text-gold-400',
    },
    purple: {
      iconBg: 'bg-purple-400/10',
      iconText: 'text-purple-400',
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onStart(scenario.id)}
      className="glass-card p-6 text-left border-2 border-transparent hover:border-gold-400/30 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.iconText}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{scenario.name}</h3>
            <DifficultyBadge difficulty={scenario.difficulty} size="sm" />
          </div>
          <p className="text-sm text-gray-400 mb-3">{scenario.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              ~{scenario.estimatedMinutes} min
            </span>
          </div>
        </div>
      </div>

      {/* Persona Preview */}
      <div className="mt-4 p-3 rounded-xl bg-apex-700/50 border border-apex-500/30">
        <div className="flex items-center gap-3">
          <Avatar name={scenario.persona.name} size="sm" />
          <div>
            <p className="text-sm font-medium text-white">{scenario.persona.name}</p>
            <p className="text-xs text-gray-400">
              {scenario.persona.age}, {scenario.persona.occupation}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
