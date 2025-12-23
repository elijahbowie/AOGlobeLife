import type { Scenario, ProspectPersona, ScenarioType } from '../types';

// ============================================
// APEX SALES ACADEMY - PROSPECT PERSONAS
// Realistic, field-based personas for immersive training
// ============================================

export const PERSONAS: Record<string, ProspectPersona> = {
  mikeThompson: {
    id: 'mike-thompson',
    name: 'Mike Thompson',
    age: 42,
    occupation: 'CNC Machinist - UAW Local 652',
    background:
      'Union member at automotive parts manufacturer for 15 years. Works rotating shifts (6am-2pm, 2pm-10pm). Has $50K employer life coverage (1x salary). Wife Sarah handles the finances. Two car payments and a mortgage.',
    personality:
      'Blue-collar through and through. Skeptical of salespeople but respects directness. Values his time - doesn\'t like feeling pitched. Will open up once he trusts you. Big on providing for his family.',
    familyStatus: 'Married to Sarah (39), two kids - Tyler (14) and Emma (10)',
    painPoints: [
      'Worries about what happens to Sarah and the kids if something happens on the job',
      'Knows employer coverage isn\'t enough but hasn\'t done anything about it',
      'Feels guilty about working so many overtime hours to make ends meet',
      'Sarah\'s parents moved in last year - more financial responsibility',
    ],
    objections: [
      'I already have insurance through the plant',
      'We\'re pretty tight on the budget right now',
      'I need to run this by Sarah first - she handles the money',
      'Can you just leave me some information?',
    ],
    buyingSignals: [
      'Asks how much coverage you\'d recommend for someone in his situation',
      'Mentions specific concerns about the mortgage or kids\' college',
      'Asks about payment options or timing (paycheck deduction)',
      'Brings up Sarah\'s opinion or asks what she would think',
      'Leans forward, takes out his phone to check something',
    ],
  },
  sarahMitchell: {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    age: 34,
    occupation: 'Elementary School Teacher - NEA Member',
    background:
      'Single mom, teaches 3rd grade at Madison Elementary. Divorced 3 years ago, ex-husband pays minimal child support. Has basic health insurance through the school but NO life insurance. Rents a 2-bedroom apartment. Working on her Master\'s degree at night.',
    personality:
      'Warm and nurturing but highly cautious with money - single income, single parent. Makes decisions carefully and doesn\'t like pressure. Very protective of her daughter. Appreciates when people are genuine.',
    familyStatus: 'Single mother, one daughter - Lily (7)',
    painPoints: [
      'She\'s the ONLY provider - no backup if something happens to her',
      'Worried about Lily\'s future, especially college',
      'No family nearby to help financially if she couldn\'t work',
      'Student loans from her degree still being paid off',
      'Ex-husband unreliable - can\'t count on him for anything',
    ],
    objections: [
      'I\'m on a really tight budget as a single mom',
      'I need to think about it - this is a big decision',
      'Is this something a single person really needs?',
      'What would happen to the policy if I can\'t make a payment?',
    ],
    buyingSignals: [
      'Asks about naming Lily as the beneficiary',
      'Questions about what happens to Lily if something happens to her',
      'Asks about the cash value or borrowing against the policy',
      'Mentions her sister or mother who might help raise Lily',
      'Wants to know about funeral costs and final expenses',
    ],
  },
  carlosRodriguez: {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodriguez',
    age: 28,
    occupation: 'HVAC Technician - IBEW Local 134',
    background:
      'Recently married to Maria (26). First baby due in 4 months. Completed apprenticeship 2 years ago, making good money now. Currently renting but saving for a house down payment. Has $25K employer coverage. Maria works as a dental hygienist.',
    personality:
      'Young, ambitious, feels invincible. Focused on career growth and buying a house. Never really thought about life insurance before - "that\'s for old people." Smart and asks good questions. Maria is more concerned about protection.',
    familyStatus: 'Married to Maria (26), first baby due in 4 months',
    painPoints: [
      'About to have his first child - huge responsibility shift coming',
      'Focused on house down payment - worried about adding expenses',
      'Never thought about what would happen to Maria if something happened',
      'Works in a somewhat dangerous trade - ladders, roofs, electrical',
    ],
    objections: [
      'I\'m only 28 - I don\'t need life insurance yet',
      'We\'d rather put that money toward our house down payment',
      'Nothing\'s going to happen to me - I\'m healthy',
      'Maria has life insurance through her work, isn\'t that enough?',
    ],
    buyingSignals: [
      'Mentions the baby and wanting to provide for them',
      'Asks what his rate would be locked in at',
      'Maria (if present) shows interest even if he\'s hesitant',
      'Asks about what happens if he gets hurt at work but survives',
      'Questions about upgrading coverage later',
    ],
  },
  patriciaWilson: {
    id: 'patricia-wilson',
    name: 'Patricia Wilson',
    age: 58,
    occupation: 'Hospital Administrator - AFSCME Member',
    background:
      'Widowed 3 years ago when her husband Frank passed from a heart attack. Has some life insurance from when Frank was alive but isn\'t sure if it\'s still active or enough. Near retirement. Two adult children and three grandchildren. House is paid off.',
    personality:
      'Experienced and detail-oriented - runs a hospital department. Asks thorough questions and takes notes. Has been through loss and TRULY understands the value of being prepared. Doesn\'t want to burden her children. Very organized.',
    familyStatus: 'Widow, two adult children (Jennifer 34, Michael 31), three grandchildren',
    painPoints: [
      'Doesn\'t want to burden Jennifer and Michael with funeral costs',
      'Worried about medical bills as she ages - saw what happened with Frank',
      'Wants to leave something meaningful for her grandchildren',
      'Existing policy may be old/outdated - not sure of coverage amount',
    ],
    objections: [
      'I already have some life insurance - I need to check what I have first',
      'At my age, isn\'t this going to be really expensive?',
      'Let me talk to my financial advisor',
      'I want to make sure my children are okay with this',
    ],
    buyingSignals: [
      'Asks very specific questions about coverage amounts and payouts',
      'Inquires about cash value as a gift for grandchildren',
      'Wants to compare new coverage to her existing policy',
      'Asks about naming multiple beneficiaries',
      'Takes detailed notes and asks for paperwork to review',
    ],
  },
  jamesAnderson: {
    id: 'james-anderson',
    name: 'James Anderson',
    age: 45,
    occupation: 'Restaurant Manager - UNITE HERE Member',
    background:
      'Manages a popular steakhouse downtown. Works 50-55 hours/week. Had a health scare last year - chest pains that turned out to be stress-related but got him thinking. Twin boys heading to college in 2 years. Wife Diana works part-time as a nurse.',
    personality:
      'Direct and no-nonsense - manages a high-pressure environment. Has been burned by pushy salespeople before and will shut down fast if he feels pressured. Respects people who get to the point. Once he trusts you, he\'s very loyal.',
    familyStatus: 'Married to Diana (43), twin teenage boys - Marcus and Devon (16)',
    painPoints: [
      'College for TWO kids in 2 years - major financial stress coming',
      'Health scare made him realize he\'s not invincible',
      'Feels spread thin - long hours, aging parents, teenage sons',
      'Only has 1x salary through employer - knows it\'s not enough',
    ],
    objections: [
      'I really don\'t have time for this right now',
      'What\'s the catch here?',
      'I\'ve dealt with insurance salespeople before - not a great experience',
      'Just give me the bottom line - how much and what do I get?',
    ],
    buyingSignals: [
      'Stays on the phone or in the meeting despite saying he\'s busy',
      'Asks pointed questions about the claims process',
      'Mentions the health scare unprompted',
      'Asks about coverage for Diana too',
      'Wants to know about term options to cover college years',
    ],
  },
  recruitAmanda: {
    id: 'recruit-amanda',
    name: 'Amanda Foster',
    age: 32,
    occupation: 'Retail Store Manager - Gap Inc.',
    background:
      'Manages a clothing store at the mall. Makes about $52K but works 50+ hours including every weekend and holiday. Engaged to Michael, planning wedding for next year. Bachelor\'s in Business. Has been looking at job postings but nothing excites her.',
    personality:
      'Ambitious and frustrated. Knows she\'s capable of more but feels stuck. Has been approached by MLM people before and is skeptical. Needs to see a real path to success, not just promises. Very organized and professional.',
    familyStatus: 'Engaged to Michael (34), wedding planned for next October',
    painPoints: [
      'Works every weekend and holiday - no work-life balance',
      'Hit the ceiling in retail - Store Manager is as high as it gets without corporate',
      'Fiancé makes more money ($85K in tech) - wants to contribute equally',
      'Missed her best friend\'s wedding because she couldn\'t get time off',
      'Starting to resent her job but needs the paycheck',
    ],
    objections: [
      'Is this one of those pyramid scheme things?',
      'I don\'t have any sales experience',
      'I can\'t afford to lose my steady paycheck',
      'How long before I\'d actually make money?',
    ],
    buyingSignals: [
      'Asks detailed questions about training and support',
      'Wants to know about schedule flexibility',
      'Asks about what successful agents actually make',
      'Interested in how quickly others have grown their income',
      'Asks if she could do this part-time at first',
    ],
  },
  recruitDavid: {
    id: 'recruit-david',
    name: 'David Chen',
    age: 40,
    occupation: 'IT Project Manager - Microsoft',
    background:
      'Makes $140K managing software development teams. Golden handcuffs - great benefits, stock options, 401K match. But feels unfulfilled and wants to build something of his own. Wife Jennifer is a pediatrician. Referred by his neighbor who\'s an AIL agent.',
    personality:
      'Analytical and thorough - he\'s a project manager, after all. Needs data, proof, and a clear plan. Will research everything before making a decision. Not impulsive but once convinced, he commits fully. Values integrity.',
    familyStatus: 'Married to Jennifer (38), three kids - Emily (10), Ryan (7), Sophie (4)',
    painPoints: [
      'Golden handcuffs - great money but no passion or purpose',
      'Tired of corporate politics and endless meetings',
      'Wants to build his own thing but scared to leave stability',
      'Feeling like he\'s just a cog in the machine at Microsoft',
      'Neighbor seems to have so much more flexibility and freedom',
    ],
    objections: [
      'I need to see real income data - verified, not just stories',
      'What\'s the failure rate? How many people actually succeed?',
      'I can\'t walk away from my benefits and stock options',
      'Can I do this part-time while keeping my job?',
    ],
    buyingSignals: [
      'Asks very detailed questions about compensation structure',
      'Wants to meet other successful agents (not just top producers)',
      'Asks about the part-time to full-time transition path',
      'Interested in the business-building side, not just selling',
      'Mentions that his wife is supportive of him exploring options',
    ],
  },
};

// ============================================
// TRAINING SCENARIOS - IMMERSIVE ROLEPLAY
// ============================================

export const SCENARIOS: Scenario[] = [
  // ═══════════════════════════════════════════
  // SALES SCENARIOS
  // ═══════════════════════════════════════════
  {
    id: 'cold_call',
    name: 'Cold Call Appointment Setting',
    description:
      'Practice your opening pitch with a union member who is expecting a benefits call. Your goal is to get them to agree to an in-home appointment.',
    difficulty: 2,
    icon: '📞',
    category: 'sales',
    persona: PERSONAS.mikeThompson,
    objectives: [
      'Establish credibility by referencing their union',
      'Create curiosity about the no-cost AD&D benefit',
      'Handle initial resistance without being pushy',
      'Set a specific appointment date and time',
    ],
    tips: [
      'Lead with the union relationship - "UAW asked us to reach out"',
      'Mention the no-cost benefit EARLY - it gets attention',
      'Be respectful of their time - get to the point quickly',
      'Have two alternative times ready when asking for the appointment',
      'If they say no, ask for a referral before you hang up',
    ],
    estimatedMinutes: 8,
  },
  {
    id: 'home_visit',
    name: 'Full Home Presentation',
    description:
      'Conduct a complete in-home presentation with a single mom who needs coverage but is very budget-conscious. Navigate from discovery to close.',
    difficulty: 3,
    icon: '🏠',
    category: 'sales',
    persona: PERSONAS.sarahMitchell,
    objectives: [
      'Build trust and rapport before discussing business',
      'Conduct a thorough needs discovery - understand her situation',
      'Present solutions that address HER specific concerns',
      'Handle the budget objection with empathy',
      'Close the sale or get a committed next step',
    ],
    tips: [
      'She\'s a single mom - her daughter Lily is EVERYTHING to her',
      'Let her talk about Lily - this builds trust and reveals buying motivations',
      'Break costs down to daily amounts - "less than a coffee"',
      'The living benefits are huge for her - what if she gets sick but survives?',
      'Acknowledge the budget is real - then show the cost of NOT having coverage',
    ],
    estimatedMinutes: 25,
  },
  {
    id: 'follow_up',
    name: 'Follow-Up: "Think About It"',
    description:
      'Re-engage a young prospect who said he needed to think about it. His wife is more interested than he is. Find out what\'s really holding him back.',
    difficulty: 2,
    icon: '📋',
    category: 'sales',
    persona: PERSONAS.carlosRodriguez,
    objectives: [
      'Re-establish connection without seeming pushy',
      'Uncover the REAL objection (probably price or need)',
      'Address his "I\'m too young" mindset',
      'Either close or schedule with BOTH Carlos and Maria present',
    ],
    tips: [
      'Baby coming in 4 months - that\'s your urgency angle',
      'He feels invincible - turn youth into an advantage (lowest rates ever)',
      'If Maria is more interested, suggest a call with both of them',
      'Compare: house down payment takes years, this is $2/day',
      'Reference their conversation: "Last time you mentioned the baby..."',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'closing',
    name: 'Closing the Deal',
    description:
      'You\'ve done the presentation, she\'s interested but has concerns about her existing coverage. Navigate final objections and complete the application.',
    difficulty: 3,
    icon: '🎯',
    category: 'sales',
    persona: PERSONAS.patriciaWilson,
    objectives: [
      'Summarize the key benefits she agreed to during presentation',
      'Address concerns about existing coverage - position as supplemental',
      'Handle the "let me check with my advisor" objection',
      'Use assumptive closing techniques',
      'Complete the application or get specific follow-up commitment',
    ],
    tips: [
      'She\'s detail-oriented - be thorough and precise',
      'Her husband Frank died 3 years ago - she KNOWS the value of coverage',
      'Her grandchildren are a huge motivation - mention the legacy aspect',
      'Offer to review her existing policy WITH her to find gaps',
      'She may want to include her adult children - offer to add them later',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'spouse_objection',
    name: 'Spouse Involvement Challenge',
    description:
      'Handle a tough prospect who\'s been burned before. He\'s skeptical but his health scare made him realize he needs coverage. Get him to bring his wife Diana into the conversation.',
    difficulty: 3,
    icon: '💑',
    category: 'sales',
    persona: PERSONAS.jamesAnderson,
    objectives: [
      'Overcome his general skepticism of salespeople',
      'Validate the need without being fear-based about his health',
      'Get him to include Diana in the decision',
      'Either close today or schedule a firm appointment with both spouses',
    ],
    tips: [
      'He respects directness - don\'t beat around the bush',
      'His health scare is an opening but don\'t dwell on it or be morbid',
      'Twin boys + college = serious financial responsibility',
      'Diana is a nurse - she understands medical risks better than he does',
      'If he says no time, offer: "What if Diana and I have a quick call?"',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'budget_conscious',
    name: 'Budget-Conscious Family',
    description:
      'Work with a working-class family where budget is the primary concern. Find creative solutions to get them protected without breaking their budget.',
    difficulty: 2,
    icon: '💰',
    category: 'sales',
    persona: PERSONAS.mikeThompson,
    objectives: [
      'Acknowledge budget reality without making them feel bad',
      'Uncover what they CAN afford vs. what they\'d LIKE to afford',
      'Present tiered options - good/better/best',
      'Close on something - some coverage beats no coverage',
    ],
    tips: [
      'Mike\'s wife Sarah handles the finances - she\'s the real decision-maker',
      'Break everything down to daily/weekly costs',
      'Compare to things they already spend money on (streaming, coffee)',
      'Start with the free AD&D - get a yes before asking for money',
      'Some coverage is infinitely better than no coverage',
    ],
    estimatedMinutes: 20,
  },

  // ═══════════════════════════════════════════
  // RECRUITING SCENARIOS
  // ═══════════════════════════════════════════
  {
    id: 'recruiting_cold',
    name: 'Cold Recruit Conversation',
    description:
      'You met Amanda at a networking event and she mentioned hating her retail management job. Gauge interest in the AO opportunity without being pushy.',
    difficulty: 3,
    icon: '🤝',
    category: 'recruiting',
    persona: PERSONAS.recruitAmanda,
    objectives: [
      'Generate curiosity about the opportunity',
      'Qualify her - does she have the right mindset?',
      'Handle the pyramid scheme objection directly',
      'Schedule an interview or shadow day',
    ],
    tips: [
      'Lead with HER pain - working weekends, missing life events',
      'She\'s been approached by MLMs before - be upfront and honest',
      'Emphasize flexibility and schedule control',
      'Don\'t oversell income - be realistic about the learning curve',
      'Her fiancé Michael might be an influence - acknowledge she may want to talk to him',
    ],
    estimatedMinutes: 12,
  },
  {
    id: 'recruiting_warm',
    name: 'Warm Market Opportunity',
    description:
      'Your neighbor David, a tech project manager, expressed interest in hearing more after seeing your schedule flexibility. Present the opportunity to someone with analytical thinking.',
    difficulty: 2,
    icon: '👥',
    category: 'recruiting',
    persona: PERSONAS.recruitDavid,
    objectives: [
      'Present the opportunity authentically - no hype',
      'Address his need for data and verification',
      'Explain the compensation structure clearly',
      'Move to next step - shadow day, interview, or formal application',
    ],
    tips: [
      'He\'s analytical - have numbers ready and be precise',
      'He makes $140K - don\'t oversell first-year earnings',
      'His real motivation is freedom and purpose, not money',
      'Suggest part-time transition - don\'t ask him to quit Microsoft day one',
      'Offer to connect him with other agents for real-world perspectives',
    ],
    estimatedMinutes: 18,
  },
  {
    id: 'recruiting_career_changer',
    name: 'Career Change Discussion',
    description:
      'A frustrated retail manager is seriously considering a change but scared to leave steady income. Help her see a path forward that manages risk.',
    difficulty: 2,
    icon: '💼',
    category: 'recruiting',
    persona: PERSONAS.recruitAmanda,
    objectives: [
      'Understand her specific frustrations with current job',
      'Connect AO benefits to her pain points',
      'Address income stability concerns realistically',
      'Create a transition plan she can get excited about',
    ],
    tips: [
      'Her main pain: weekends, holidays, ceiling, time away from fiancé',
      'Our benefit: flexibility, unlimited earning, growth path',
      'Suggest part-time start while keeping retail job',
      'Training and support are KEY selling points for someone new',
      'Wedding in October - she has a deadline motivating her',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'recruiting_income',
    name: 'Income Discussion',
    description:
      'A serious candidate wants to understand exactly how compensation works before moving forward. Be transparent about the income structure while painting an exciting picture.',
    difficulty: 2,
    icon: '💵',
    category: 'recruiting',
    persona: PERSONAS.recruitDavid,
    objectives: [
      'Explain the commission structure clearly (50%, advances, overrides)',
      'Set realistic expectations about first-year income',
      'Address concerns about leaving steady salary and benefits',
      'Get commitment to next step in the process',
    ],
    tips: [
      'David makes $140K - he needs to see a realistic path to match or exceed',
      'Be honest: "Year 1 might be less, Year 2-3 you catch up, Year 4+ you exceed"',
      'Emphasize the business-building income (overrides) over just selling',
      'Address benefits: explain health insurance options, tax advantages',
      'Part-time start lets him validate without risking everything',
    ],
    estimatedMinutes: 20,
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
