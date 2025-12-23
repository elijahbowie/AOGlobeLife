import type { RankInfo, AOGlobeLifeRank } from '../types';

export const RANKS: Record<AOGlobeLifeRank, RankInfo> = {
  producer_50: {
    id: 'producer_50',
    name: '50% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '50%',
    requirements: [
      'State/provincial licensing',
      'Contract activation with AIL',
      'Minimum 4 sales weekly',
    ],
    nextRank: 'producer_60',
  },
  producer_60: {
    id: 'producer_60',
    name: '60% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '60%',
    requirements: [
      'Achieve $15,000 Net ALP',
      'Maintain 4 sales weekly minimum',
    ],
    nextRank: 'producer_62.5',
  },
  'producer_62.5': {
    id: 'producer_62.5',
    name: '62.5% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '62.5%',
    requirements: [
      '1+ year continuous service',
      '$75,000 Net ALP in past 12 months',
      'Annual minimum: $72,000 Net ALP',
    ],
    nextRank: 'producer_67.5',
  },
  'producer_67.5': {
    id: 'producer_67.5',
    name: '67.5% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '67.5%',
    requirements: [
      '3+ years continuous service',
      '$75,000 Net ALP in past 12 months',
    ],
    nextRank: 'producer_72.5',
  },
  'producer_72.5': {
    id: 'producer_72.5',
    name: '72.5% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '72.5%',
    requirements: [
      '5+ years continuous service',
      '$75,000 Net ALP in past 12 months',
    ],
    nextRank: 'producer_75',
  },
  producer_75: {
    id: 'producer_75',
    name: '75% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '75%',
    requirements: [
      '7+ years continuous service',
      'Sustained production standards',
    ],
    nextRank: 'producer_77.5',
  },
  'producer_77.5': {
    id: 'producer_77.5',
    name: '77.5% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '77.5%',
    requirements: [
      '9+ years continuous service',
      'Sustained production standards',
    ],
    nextRank: 'producer_80',
  },
  producer_80: {
    id: 'producer_80',
    name: '80% Producer',
    shortName: 'Producer',
    color: 'text-rank-producer',
    bgColor: 'bg-rank-producer/20',
    borderColor: 'border-rank-producer/30',
    commission: '80%',
    requirements: [
      '10+ years continuous service',
      'Top-tier production standards',
    ],
    nextRank: 'regional_producer',
  },
  regional_producer: {
    id: 'regional_producer',
    name: 'Regional Producer',
    shortName: 'Regional',
    color: 'text-rank-regional',
    bgColor: 'bg-rank-regional/20',
    borderColor: 'border-rank-regional/30',
    commission: '25% override',
    requirements: [
      'Recruit and code 1 new agent OR 10 sales/month + train 1 agent',
      'Minimum 10 sales monthly',
      'Maintain 5 coded agents',
    ],
    nextRank: 'co_executive_producer',
  },
  co_executive_producer: {
    id: 'co_executive_producer',
    name: 'Co-Executive Producer',
    shortName: 'CoExec',
    color: 'text-rank-coexec',
    bgColor: 'bg-rank-coexec/20',
    borderColor: 'border-rank-coexec/30',
    commission: '35% override',
    requirements: [
      '5 coded agents total',
      'Mentor 1 associate to Regional Producer',
      'Minimum 10 monthly sales',
    ],
    nextRank: 'executive_producer',
  },
  executive_producer: {
    id: 'executive_producer',
    name: 'Executive Producer',
    shortName: 'Executive',
    color: 'text-rank-executive',
    bgColor: 'bg-rank-executive/20',
    borderColor: 'border-rank-executive/30',
    commission: '50% override',
    requirements: [
      '5 directly coded agents',
      'Mentor 1 associate to Co-Executive Producer',
      'Minimum 10 monthly sales',
      '$10K F6 Net or $20K Net monthly',
    ],
    nextRank: 'chief_executive_producer',
  },
  chief_executive_producer: {
    id: 'chief_executive_producer',
    name: 'Chief Executive Producer',
    shortName: 'Chief',
    color: 'text-rank-chief',
    bgColor: 'bg-rank-chief/20',
    borderColor: 'border-rank-chief/30',
    commission: '80% + 82.5% Partner',
    requirements: [
      'Personally be an Executive Producer',
      '$10K F6 Net, $20K Net, or 2 codes monthly',
      'Mentor 6 Executive Producers hitting minimums',
    ],
    nextRank: 'partner',
  },
  partner: {
    id: 'partner',
    name: 'Partner',
    shortName: 'Partner',
    color: 'text-rank-partner',
    bgColor: 'bg-rank-partner/20',
    borderColor: 'border-rank-partner/30',
    commission: 'Partner Contract',
    requirements: [
      'Maintain 11 direct Executive Producers',
      'Add/net 1 Executive Producer per year',
      '$10K F6 Net, $20K Net, or 2 codes monthly',
    ],
    nextRank: 'senior_partner',
  },
  senior_partner: {
    id: 'senior_partner',
    name: 'Senior Partner',
    shortName: 'Sr Partner',
    color: 'text-rank-senior',
    bgColor: 'bg-rank-senior/20',
    borderColor: 'border-rank-senior/30',
    commission: 'Senior Partner Contract',
    requirements: [
      'Top-tier leadership requirements',
      'Multiple MGA Business Builders',
      'Sustained organizational growth',
    ],
  },
};

export const RANK_ORDER: AOGlobeLifeRank[] = [
  'producer_50',
  'producer_60',
  'producer_62.5',
  'producer_67.5',
  'producer_72.5',
  'producer_75',
  'producer_77.5',
  'producer_80',
  'regional_producer',
  'co_executive_producer',
  'executive_producer',
  'chief_executive_producer',
  'partner',
  'senior_partner',
];

export const getRankInfo = (rank: AOGlobeLifeRank): RankInfo => RANKS[rank];

// Alias for getRankInfo - used by some components
export const getRankById = getRankInfo;

export const getRankIndex = (rank: AOGlobeLifeRank): number =>
  RANK_ORDER.indexOf(rank);

export const getNextRank = (rank: AOGlobeLifeRank): RankInfo | null => {
  const info = RANKS[rank];
  return info.nextRank ? RANKS[info.nextRank] : null;
};

export const getProgressToNextRank = (
  _rank: AOGlobeLifeRank,
  currentProgress: number
): number => {
  // This would be calculated based on actual requirements
  // For demo, we use a simple percentage
  return Math.min(currentProgress, 100);
};

export const isBusinessBuilder = (rank: AOGlobeLifeRank): boolean => {
  const builderRanks: AOGlobeLifeRank[] = [
    'regional_producer',
    'co_executive_producer',
    'executive_producer',
    'chief_executive_producer',
    'partner',
    'senior_partner',
  ];
  return builderRanks.includes(rank);
};

export const getRankEmoji = (rank: AOGlobeLifeRank): string => {
  const emojiMap: Record<AOGlobeLifeRank, string> = {
    producer_50: '⚪',
    producer_60: '⚪',
    'producer_62.5': '⚪',
    'producer_67.5': '⚪',
    'producer_72.5': '⚪',
    producer_75: '⚪',
    'producer_77.5': '⚪',
    producer_80: '⚪',
    regional_producer: '🔵',
    co_executive_producer: '💜',
    executive_producer: '⭐',
    chief_executive_producer: '💖',
    partner: '🔴',
    senior_partner: '👑',
  };
  return emojiMap[rank];
};
