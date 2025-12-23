import type { Objection, ObjectionFramework } from '../types';

// ============================================
// OBJECTION HANDLING FRAMEWORKS
// ============================================

export const FRAMEWORKS: Record<string, ObjectionFramework> = {
  feelFeltFound: {
    name: 'Feel-Felt-Found',
    acronym: 'FFF',
    steps: [
      'I understand how you FEEL...',
      'Many of my clients FELT the same way...',
      'What they FOUND was...',
    ],
    example:
      '"I understand how you feel about the cost. Many of my clients felt the same way initially. What they found was that for just a few dollars a day, they had peace of mind knowing their family was protected."',
  },
  acknowledgeAskAdvocate: {
    name: 'Acknowledge-Ask-Advocate',
    acronym: 'AAA',
    steps: [
      'ACKNOWLEDGE their concern genuinely',
      'ASK a question to understand deeper',
      'ADVOCATE with a solution',
    ],
    example:
      '"That\'s a fair concern [acknowledge]. Can I ask what specifically worries you about the timing? [ask]. Based on what you\'ve shared, here\'s why now might actually be the best time... [advocate]"',
  },
  isolateAndAddress: {
    name: 'Isolate and Address',
    steps: [
      'Isolate the objection: "Is that the only thing holding you back?"',
      'If yes, address it directly',
      'If no, find the real objection first',
    ],
    example:
      '"I hear you - the timing feels off. If we could figure out the timing, is this something you\'d want to move forward with? [If yes] Let me show you some options that might work better for your situation."',
  },
  boomerang: {
    name: 'Boomerang',
    steps: [
      'Take their objection',
      'Turn it into a reason TO buy',
    ],
    example:
      '"You mentioned you\'re healthy and don\'t think you need it right now. That\'s actually exactly WHY now is the perfect time - your rates are locked in at their lowest, and you\'re guaranteed to be approved."',
  },
};

// ============================================
// COMMON OBJECTIONS
// ============================================

export const OBJECTIONS: Objection[] = [
  {
    id: 'cant-afford',
    text: "I can't afford it",
    shortName: 'Affordability',
    category: 'price',
    difficulty: 2,
    frequency: 'very_common',
    icon: '💰',
    frameworks: [FRAMEWORKS.feelFeltFound, FRAMEWORKS.acknowledgeAskAdvocate],
    sampleResponses: [
      'I completely understand - budget is important. Let me ask you this: what would happen to your family\'s budget if something happened to you tomorrow? The mortgage, the car payments, groceries... [pause] For the cost of a coffee a day, we can make sure they never have to worry about that.',
      'I hear that a lot. Can I share what most families discover? When we break it down to a daily cost, it\'s often less than they spend on things they don\'t even think about. Let\'s look at what fits your budget and go from there.',
      'That\'s exactly why we\'re here - to find something that works for YOUR situation. We have options starting at just [X] per month. Would it help to see what that coverage looks like?',
    ],
    tips: [
      'Never argue with their budget - acknowledge it first',
      'Break down the cost to daily or weekly amounts',
      'Compare to discretionary spending (coffee, streaming, etc.)',
      'Focus on what the family would LOSE, not what they\'re paying',
      'Offer to find a solution that fits their budget',
    ],
  },
  {
    id: 'think-about-it',
    text: 'I need to think about it',
    shortName: 'Think About It',
    category: 'timing',
    difficulty: 2,
    frequency: 'very_common',
    icon: '🤔',
    frameworks: [FRAMEWORKS.isolateAndAddress],
    sampleResponses: [
      'Absolutely - this is an important decision. Can I ask what specifically you want to think about? Is it the coverage amount, the monthly investment, or something else? I want to make sure I\'ve given you all the information you need.',
      'Of course. Most of my clients feel the same way. Usually when someone says that, there\'s something specific on their mind. What questions can I answer right now to help you feel more confident?',
      'I respect that. While you\'re thinking, can I leave you with this: the rates I\'ve shown you are based on your health TODAY. If anything changes, those rates could go up or coverage could be denied. Is that a risk you\'re comfortable taking?',
    ],
    tips: [
      'This usually means there\'s an unaddressed concern',
      'Ask what specifically they need to think about',
      'Urgency: rates are based on current health/age',
      'Offer to schedule a follow-up call',
      'Never pressure - guide them to a decision',
    ],
  },
  {
    id: 'have-insurance',
    text: 'I already have insurance through work',
    shortName: 'Have Insurance',
    category: 'need',
    difficulty: 2,
    frequency: 'very_common',
    icon: '💼',
    frameworks: [FRAMEWORKS.acknowledgeAskAdvocate],
    sampleResponses: [
      'That\'s great that your employer offers that! Can I ask - do you know how much coverage they provide? [Usually 1-2x salary]. Financial experts recommend 10-12 times your income. And here\'s the thing - what happens to that coverage if you change jobs or retire?',
      'I\'m glad you have something in place. Let me ask you this: is that coverage portable? If you leave your job tomorrow, does it go with you? [No] That\'s exactly the gap this fills - coverage that\'s YOURS no matter what.',
      'Perfect - so you understand the value of protection. The question is: is it enough? If something happened tomorrow, could your family pay off the mortgage, keep the kids in their school, maintain their lifestyle on that coverage alone?',
    ],
    tips: [
      'Never dismiss their employer coverage',
      'Ask how much coverage they actually have',
      'Highlight the portability gap',
      'Calculate the coverage gap (current vs. 10-12x income)',
      'Position personal coverage as filling the gap, not replacing',
    ],
  },
  {
    id: 'talk-to-spouse',
    text: 'I need to talk to my spouse',
    shortName: 'Spouse',
    category: 'authority',
    difficulty: 2,
    frequency: 'very_common',
    icon: '💑',
    frameworks: [FRAMEWORKS.feelFeltFound, FRAMEWORKS.isolateAndAddress],
    sampleResponses: [
      'That makes complete sense - this is a family decision. Would it help if we scheduled a time when both of you are available? That way I can answer any questions they might have directly.',
      'I respect that. Most couples prefer to decide together. Can I ask - if your spouse agrees that this makes sense for your family, is this something you\'d want to move forward with? [If yes] Great - let\'s find a time that works for both of you.',
      'Absolutely. What questions do you think they\'ll have? I want to make sure you have all the information you need to have that conversation.',
    ],
    tips: [
      'Validate the desire to include spouse',
      'Offer to include them via call or meeting',
      'Equip them with answers for common spouse questions',
      'Get commitment conditional on spouse agreement',
      'Schedule the follow-up before you leave',
    ],
  },
  {
    id: 'send-info',
    text: 'Just send me some information',
    shortName: 'Send Info',
    category: 'timing',
    difficulty: 3,
    frequency: 'common',
    icon: '📧',
    frameworks: [FRAMEWORKS.isolateAndAddress],
    sampleResponses: [
      'I can definitely do that. Can I ask what specific information would be most helpful? Coverage options? Pricing? That way I can send you exactly what you need to make a decision.',
      'Absolutely. Before I do, let me make sure I understand your situation so I send the right information. What\'s most important to you when it comes to protecting your family?',
      'Happy to. And let me be upfront with you - most people who ask for information end up with more questions than answers. Since I\'m already here, what if we spent 5 more minutes and I walk you through the key points? Then you\'ll have the info AND the clarity.',
    ],
    tips: [
      'This is often a polite way to end the conversation',
      'Ask what specific information they want',
      'Offer to walk through information now',
      'Get commitment to a follow-up conversation',
      'Information alone rarely closes - you need to be there',
    ],
  },
  {
    id: 'dont-trust',
    text: "I don't trust insurance companies",
    shortName: 'Trust Issues',
    category: 'trust',
    difficulty: 3,
    frequency: 'common',
    icon: '😰',
    frameworks: [FRAMEWORKS.feelFeltFound, FRAMEWORKS.acknowledgeAskAdvocate],
    sampleResponses: [
      'I appreciate you being honest with me. Can I ask what experience led to that feeling? [Listen]. I understand. What I can tell you about American Income Life is we\'ve been protecting working families since 1951, and we have an A (Excellent) rating from A.M. Best for financial strength.',
      'That\'s fair - there are a lot of stories out there. What I find is that most bad experiences come from companies that don\'t specialize in working families like we do. We\'ve been doing this for 70+ years because we pay our claims and take care of our people.',
      'I hear you. Trust is earned, not given. Let me share something: we serve union members, teachers, first responders - people who don\'t have time for companies that don\'t deliver. That\'s why we\'ve built the reputation we have.',
    ],
    tips: [
      'Let them share their experience - listen first',
      'Acknowledge bad actors in the industry exist',
      'Share AIL\'s history and A.M. Best rating',
      'Highlight the claims-paying record',
      'Use social proof (unions, associations)',
    ],
  },
  {
    id: 'bad-timing',
    text: "Now isn't a good time",
    shortName: 'Bad Timing',
    category: 'timing',
    difficulty: 2,
    frequency: 'common',
    icon: '⏰',
    frameworks: [FRAMEWORKS.boomerang, FRAMEWORKS.isolateAndAddress],
    sampleResponses: [
      'I understand life gets busy. Can I ask - when do you think would be a better time? [Listen] The thing is, the rates I can offer today are based on your age and health right now. Waiting could mean higher rates or even being declined.',
      'I hear that. What specifically is making it a bad time - is it financial, or just a lot going on right now? [Understand their situation] Let me see if we can find a way to make this work with where you\'re at.',
      'Life never really slows down, does it? Here\'s what I\'ve learned - there\'s never a "perfect" time to protect your family. But there\'s definitely a wrong time to find out you\'re not protected.',
    ],
    tips: [
      'Find out WHY it\'s bad timing',
      'Urgency: rates increase with age',
      'Tomorrow isn\'t guaranteed',
      'Find solutions for their specific timing issue',
      'Schedule a specific follow-up',
    ],
  },
  {
    id: 'too-young',
    text: "I'm too young, I don't need it yet",
    shortName: 'Too Young',
    category: 'need',
    difficulty: 2,
    frequency: 'occasional',
    icon: '👴',
    frameworks: [FRAMEWORKS.boomerang],
    sampleResponses: [
      'Actually, that\'s exactly why now is the perfect time! Your rates are at their lowest when you\'re young and healthy. Lock them in now, and you\'ll pay the same rate for life. Wait 10 years? You could be paying double.',
      'I hear that a lot from folks your age. Let me ask you this - do you plan on having a family someday? A mortgage? This is about locking in protection now when it\'s cheapest, so it\'s there when you need it.',
      'You know what\'s interesting? The healthiest, youngest people get the best rates AND are guaranteed approval. Every year you wait, that changes. Why not lock in the best deal while you can?',
    ],
    tips: [
      'Turn youth into an advantage (best rates)',
      'Premiums locked in for life at young age',
      'Future-proof their insurability',
      'Compare rates at current age vs. 10 years older',
      'Stories of young people who waited and couldn\'t get coverage',
    ],
  },
  {
    id: 'health-issues',
    text: 'I have health issues, I probably can\'t qualify',
    shortName: 'Health Concerns',
    category: 'need',
    difficulty: 3,
    frequency: 'occasional',
    icon: '🏥',
    frameworks: [FRAMEWORKS.acknowledgeAskAdvocate],
    sampleResponses: [
      'I appreciate you sharing that with me. Before we assume anything, can I ask what conditions you\'re managing? You might be surprised - many people with health conditions qualify. And we have options specifically designed for people in your situation.',
      'Thank you for being upfront. Here\'s the thing - we work with working families every day, and many of them have health challenges. We have options that don\'t even require a medical exam. Let\'s at least explore what you might qualify for.',
      'I understand the concern. Let me ask you this - if your health is already a factor, doesn\'t that make protection even more important for your family? Let\'s see what options are available.',
    ],
    tips: [
      'Don\'t make assumptions - ask questions',
      'Many conditions are still insurable',
      'Highlight no-exam options (final expense, guaranteed issue)',
      'Health issues = MORE reason to get what coverage they can',
      'Position yourself as an advocate to find solutions',
    ],
  },
  {
    id: 'not-interested',
    text: "I'm not interested",
    shortName: 'Not Interested',
    category: 'trust',
    difficulty: 3,
    frequency: 'common',
    icon: '🚫',
    frameworks: [FRAMEWORKS.acknowledgeAskAdvocate],
    sampleResponses: [
      'I respect that. Before I go, can I ask what specifically isn\'t appealing to you? I ask because [Union/Association] specifically requested we reach out to members, and I want to make sure I\'m presenting this correctly.',
      'I understand. Is it that you\'re not interested in life insurance in general, or just not interested right now? [Uncover the real objection]',
      'Fair enough. May I ask one question? If something happened to you tomorrow, is your family financially prepared? If the answer is yes, I\'ll be on my way. If not, would you be open to hearing how little it costs to protect them?',
    ],
    tips: [
      'This is usually a knee-jerk response',
      'Don\'t take it personally',
      'Ask ONE good question to get conversation going',
      'Sometimes it\'s just not the right time - respect that',
      'Leave the door open for future contact',
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getObjectionById = (id: string): Objection | undefined =>
  OBJECTIONS.find((o) => o.id === id);

// Get all objections
export const getObjections = (): Objection[] => OBJECTIONS;

export const getObjectionsByCategory = (
  category: Objection['category']
): Objection[] => OBJECTIONS.filter((o) => o.category === category);

export const getObjectionsByDifficulty = (difficulty: 1 | 2 | 3): Objection[] =>
  OBJECTIONS.filter((o) => o.difficulty === difficulty);

export const getRandomObjection = (): Objection =>
  OBJECTIONS[Math.floor(Math.random() * OBJECTIONS.length)];

export const getRandomObjections = (count: number): Objection[] => {
  const shuffled = [...OBJECTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const OBJECTION_CATEGORIES = [
  { id: 'price', name: 'Price/Cost', icon: '💰' },
  { id: 'timing', name: 'Timing', icon: '⏰' },
  { id: 'trust', name: 'Trust', icon: '🤝' },
  { id: 'need', name: 'Need', icon: '❓' },
  { id: 'authority', name: 'Authority', icon: '👥' },
];
