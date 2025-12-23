import type { Scenario, ProspectPersona, ScenarioType } from '../types';

// ============================================
// PROSPECT PERSONAS
// ============================================

export const PERSONAS: Record<string, ProspectPersona> = {
  mikeThompson: {
    id: 'mike-thompson',
    name: 'Mike Thompson',
    age: 42,
    occupation: 'Factory Worker',
    background:
      'Union member at local manufacturing plant for 15 years. Works rotating shifts. Has employer-provided life insurance but only 1x salary.',
    personality:
      'Skeptical but polite. Values his time and doesn\'t like feeling pressured. Concerned about money but cares deeply about his family.',
    familyStatus: 'Married to Sarah, two kids (Tyler 12, Emma 8)',
    painPoints: [
      'Worried about what would happen to family if something happened to him',
      'Feels like he doesn\'t have enough savings',
      'Works long hours and feels guilty about time away from family',
    ],
    objections: [
      'I already have insurance through work',
      'I can\'t really afford anything extra right now',
      'I need to talk to my wife first',
    ],
    buyingSignals: [
      'Asks about coverage amounts',
      'Mentions his kids\' future',
      'Asks about payment flexibility',
      'Leans forward, takes notes',
    ],
  },
  sarahMitchell: {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    age: 35,
    occupation: 'Elementary School Teacher',
    background:
      'Single mom working full-time. Member of teachers\' union. Has basic health insurance through school district but no life insurance.',
    personality:
      'Warm and caring but cautious with finances. Makes decisions carefully. Very protective of her daughter.',
    familyStatus: 'Single mother, one daughter (Lily 7)',
    painPoints: [
      'Sole provider for her daughter',
      'Worried about what would happen to Lily if she couldn\'t work',
      'Student loans still being paid off',
    ],
    objections: [
      'I\'m on a tight budget as a single mom',
      'I need to think about it',
      'Is this really necessary for a single person?',
    ],
    buyingSignals: [
      'Asks about naming daughter as beneficiary',
      'Wants to know about coverage for funeral costs',
      'Asks about policy loans for emergencies',
    ],
  },
  carlosRodriguez: {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodriguez',
    age: 28,
    occupation: 'HVAC Technician',
    background:
      'Recently married, first child on the way. Member of trade union. Rents an apartment but saving for a house.',
    personality:
      'Young and ambitious. Thinks he\'s invincible. Focused on building his career and buying a home.',
    familyStatus: 'Married to Maria, first baby due in 4 months',
    painPoints: [
      'About to have significantly more responsibility',
      'Wants to buy a house but worried about qualifying',
      'Never really thought about life insurance before',
    ],
    objections: [
      'I\'m too young to worry about life insurance',
      'I\'d rather save for a house down payment',
      'I\'m healthy, nothing is going to happen to me',
    ],
    buyingSignals: [
      'Mentions the baby on the way',
      'Asks about what if he gets sick later',
      'Wife seems interested even if he\'s hesitant',
    ],
  },
  patriciaWilson: {
    id: 'patricia-wilson',
    name: 'Patricia Wilson',
    age: 58,
    occupation: 'Hospital Administrator',
    background:
      'Near retirement. Husband passed away 3 years ago. Has some life insurance but concerned about coverage gaps and final expenses.',
    personality:
      'Experienced and detail-oriented. Asks thorough questions. Has been through loss and understands the value of being prepared.',
    familyStatus: 'Widow, two adult children, three grandchildren',
    painPoints: [
      'Doesn\'t want to burden her children with funeral costs',
      'Worried about medical bills as she ages',
      'Wants to leave something for grandchildren',
    ],
    objections: [
      'I already have some coverage, is this really necessary?',
      'At my age, isn\'t it too expensive?',
      'Let me review my existing policies first',
    ],
    buyingSignals: [
      'Asks specific questions about coverage amounts',
      'Inquires about cash value for grandchildren',
      'Wants to compare to existing coverage',
    ],
  },
  jamesAnderson: {
    id: 'james-anderson',
    name: 'James Anderson',
    age: 45,
    occupation: 'Restaurant Manager',
    background:
      'Works 50+ hours a week. Skeptical of sales pitches - has had bad experiences with pushy salespeople before.',
    personality:
      'Direct and no-nonsense. Respects people who don\'t waste his time. Will shut down quickly if he feels pressured.',
    familyStatus: 'Married, twin teenage boys (16)',
    painPoints: [
      'Kids heading to college soon - worried about costs',
      'Feels spread thin between work and family',
      'Had a health scare last year that made him think about mortality',
    ],
    objections: [
      'I don\'t have time for this right now',
      'What\'s the catch?',
      'I\'ve been burned by insurance before',
    ],
    buyingSignals: [
      'Stays on the phone/in the meeting despite being "busy"',
      'Asks pointed questions about claims process',
      'Mentions the health scare',
    ],
  },
  recruitAmanda: {
    id: 'recruit-amanda',
    name: 'Amanda Foster',
    age: 32,
    occupation: 'Retail Store Manager',
    background:
      'Burned out from retail management. Working 50+ hours for mediocre pay. Looking for something with more flexibility and growth potential.',
    personality:
      'Ambitious but skeptical. Has been approached by MLM companies before. Needs to see a clear path to success.',
    familyStatus: 'Engaged, planning wedding next year',
    painPoints: [
      'Working weekends and holidays',
      'No work-life balance',
      'Hit a ceiling in retail - nowhere to go',
      'Fiancé makes more money and she wants to contribute equally',
    ],
    objections: [
      'Is this a pyramid scheme?',
      'I don\'t have sales experience',
      'I can\'t afford to not have a steady paycheck',
    ],
    buyingSignals: [
      'Asks about training and support',
      'Inquires about work schedule flexibility',
      'Wants to know about successful agents\' stories',
    ],
  },
  recruitDavid: {
    id: 'recruit-david',
    name: 'David Chen',
    age: 40,
    occupation: 'IT Project Manager',
    background:
      'Corporate job is stable but unfulfilling. Has leadership experience. Friend mentioned the opportunity.',
    personality:
      'Analytical and thorough. Needs data and proof. Will research everything before making a decision.',
    familyStatus: 'Married, 3 kids (10, 7, 4)',
    painPoints: [
      'Golden handcuffs - good salary but no passion',
      'Wants to build something of his own',
      'Tired of corporate politics',
    ],
    objections: [
      'I need to see income verification',
      'What\'s the failure rate?',
      'I can\'t leave my benefits',
    ],
    buyingSignals: [
      'Asks detailed questions about compensation structure',
      'Wants to meet successful agents',
      'Asks about part-time to start',
    ],
  },
};

// ============================================
// TRAINING SCENARIOS
// ============================================

export const SCENARIOS: Scenario[] = [
  // SALES SCENARIOS
  {
    id: 'cold_call',
    name: 'Cold Call',
    description:
      'Practice your opening pitch and appointment setting with a prospect who wasn\'t expecting your call.',
    difficulty: 2,
    icon: '📞',
    category: 'sales',
    persona: PERSONAS.mikeThompson,
    objectives: [
      'Establish rapport quickly',
      'Identify pain points',
      'Handle initial resistance',
      'Set an appointment for full presentation',
    ],
    tips: [
      'Mention the union/association connection upfront',
      'Be respectful of their time',
      'Focus on THEM, not your product',
      'Get to the point quickly but warmly',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'home_visit',
    name: 'Home Presentation',
    description:
      'Conduct a full in-home presentation, uncover needs, present solutions, and close the sale.',
    difficulty: 3,
    icon: '🏠',
    category: 'sales',
    persona: PERSONAS.sarahMitchell,
    objectives: [
      'Build trust and rapport',
      'Uncover family protection needs',
      'Present appropriate coverage options',
      'Handle objections effectively',
      'Close the sale or schedule follow-up',
    ],
    tips: [
      'Start by learning about their family',
      'Use a needs analysis to uncover gaps',
      'Present solutions, not products',
      'Address concerns before asking for the sale',
    ],
    estimatedMinutes: 20,
  },
  {
    id: 'follow_up',
    name: 'Follow-Up Call',
    description:
      'Re-engage a prospect who said they needed to "think about it" or "talk to their spouse."',
    difficulty: 2,
    icon: '📋',
    category: 'sales',
    persona: PERSONAS.carlosRodriguez,
    objectives: [
      'Re-establish connection',
      'Uncover what held them back',
      'Address new or remaining concerns',
      'Move toward decision',
    ],
    tips: [
      'Reference specific points from last conversation',
      'Ask what questions came up',
      'Create urgency without pressure',
      'Be prepared to offer alternatives',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'closing',
    name: 'Closing the Deal',
    description:
      'Practice moving from presentation to application. Handle final objections and get the commitment.',
    difficulty: 3,
    icon: '🎯',
    category: 'sales',
    persona: PERSONAS.patriciaWilson,
    objectives: [
      'Summarize key benefits agreed upon',
      'Address final concerns',
      'Use assumptive closing techniques',
      'Complete the application process',
    ],
    tips: [
      'Recap what theyve said they want/need',
      'Use either/or closes for easy decisions',
      'Have application ready to go',
      'Confirm next steps clearly',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'spouse_objection',
    name: 'Spouse Involvement',
    description:
      'Handle the "I need to talk to my spouse" situation effectively and include the decision-maker.',
    difficulty: 3,
    icon: '💑',
    category: 'sales',
    persona: PERSONAS.jamesAnderson,
    objectives: [
      'Validate the need for spouse involvement',
      'Equip them with answers for spouse questions',
      'Schedule a joint call or meeting',
      'Get conditional commitment',
    ],
    tips: [
      'Never make them feel bad for wanting spouse input',
      'Offer to call spouse now if possible',
      'Give them ammunition for the conversation',
      'Lock in a specific follow-up time',
    ],
    estimatedMinutes: 12,
  },

  // RECRUITING SCENARIOS
  {
    id: 'recruiting_cold',
    name: 'Cold Recruit',
    description:
      'Approach someone you just met about the AO opportunity. Practice the initial pitch.',
    difficulty: 3,
    icon: '🤝',
    category: 'recruiting',
    persona: PERSONAS.recruitAmanda,
    objectives: [
      'Generate curiosity without overselling',
      'Identify if they\'re a good fit',
      'Handle pyramid scheme objection',
      'Schedule an interview or meeting',
    ],
    tips: [
      'Lead with lifestyle benefits, not income claims',
      'Ask about THEIR situation first',
      'Be honest about what the opportunity requires',
      'Qualify them - not everyone is a fit',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'recruiting_warm',
    name: 'Warm Market Recruit',
    description:
      'Present the opportunity to a friend or family member who expressed interest in earning more.',
    difficulty: 2,
    icon: '👥',
    category: 'recruiting',
    persona: PERSONAS.recruitDavid,
    objectives: [
      'Present opportunity authentically',
      'Address concerns honestly',
      'Explain the compensation structure',
      'Move to next step (interview, shadow day)',
    ],
    tips: [
      'Your relationship is more important than the recruit',
      'Be honest about challenges, not just rewards',
      'Share your personal experience and results',
      'Don\'t pressure - let them decide',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'recruiting_career_changer',
    name: 'Career Changer',
    description:
      'Help someone unhappy in their current job see the potential of the AO opportunity.',
    difficulty: 2,
    icon: '💼',
    category: 'recruiting',
    persona: PERSONAS.recruitAmanda,
    objectives: [
      'Understand their pain with current job',
      'Connect AO benefits to their pain points',
      'Address risk concerns about leaving stable job',
      'Create a transition plan',
    ],
    tips: [
      'Focus on what they want, not what theyre leaving',
      'Part-time start can reduce risk',
      'Training and support are key selling points',
      'Share stories of similar successful transitions',
    ],
    estimatedMinutes: 15,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getScenarioById = (id: ScenarioType): Scenario | undefined =>
  SCENARIOS.find((s) => s.id === id);

// Get all scenarios
export const getScenarios = (): Scenario[] => SCENARIOS;

export const getSalesScenarios = (): Scenario[] =>
  SCENARIOS.filter((s) => s.category === 'sales');

export const getRecruitingScenarios = (): Scenario[] =>
  SCENARIOS.filter((s) => s.category === 'recruiting');

export const getScenariosByDifficulty = (difficulty: 1 | 2 | 3): Scenario[] =>
  SCENARIOS.filter((s) => s.difficulty === difficulty);

export const getPersonaById = (id: string): ProspectPersona | undefined =>
  Object.values(PERSONAS).find((p) => p.id === id);

export const getDifficultyLabel = (difficulty: 1 | 2 | 3): string => {
  const labels = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
  };
  return labels[difficulty];
};

export const getDifficultyStars = (difficulty: 1 | 2 | 3): string => {
  return '⭐'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
};
