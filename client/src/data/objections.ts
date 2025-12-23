import type { Objection, ObjectionFramework } from '../types';

// ============================================
// APEX SALES ACADEMY - OBJECTION HANDLING FRAMEWORKS
// Field-proven techniques used by top AIL producers
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
      '"I understand how you feel about the cost. Many of my clients felt the same way when they first saw the numbers. What they found was that for about what they spend on their morning coffee, they had complete peace of mind knowing their family would never have to worry about the mortgage or bills."',
  },
  acra: {
    name: 'ACRA Framework',
    acronym: 'ACRA',
    steps: [
      'ACKNOWLEDGE their concern genuinely',
      'CLARIFY to understand the root issue',
      'RESPOND with relevant information',
      'ADVANCE toward next step',
    ],
    example:
      '"I appreciate you sharing that [acknowledge]. Can I ask what specifically concerns you about the timing? [clarify]. Based on what you\'ve shared, here\'s something to consider... [respond]. What would help you feel confident about moving forward today? [advance]"',
  },
  isolateAndAddress: {
    name: 'Isolate and Address',
    acronym: 'I&A',
    steps: [
      'Isolate the objection: "Is that the only thing holding you back?"',
      'If yes, address it directly and close',
      'If no, find the real objection first',
    ],
    example:
      '"I hear you - the timing feels off. If we could figure out the timing, is this something you\'d want to move forward with today? [If yes] Perfect - let me show you some options that might work better for your situation."',
  },
  boomerang: {
    name: 'Boomerang',
    acronym: 'BOOM',
    steps: [
      'Take their objection',
      'Turn it into a reason TO buy',
      'Use their own logic in your favor',
    ],
    example:
      '"You mentioned you\'re healthy right now and don\'t think you need it. That\'s actually exactly WHY now is the perfect time - your rates are locked in at their lowest, and you\'re guaranteed approval. Wait until something changes, and this opportunity might not be available."',
  },
  whatIf: {
    name: 'What If Pivot',
    acronym: 'WIP',
    steps: [
      'Acknowledge their concern',
      'Ask "What if I could show you..."',
      'Present a solution to their specific concern',
    ],
    example:
      '"I understand the budget is tight. What if I could show you a way to get your family protected for about what you spend on streaming services each month - would that be something you\'d be open to?"',
  },
};

// ============================================
// COMMON OBJECTIONS - AIL FIELD TESTED
// ============================================

export const OBJECTIONS: Objection[] = [
  {
    id: 'cant-afford',
    text: "I can't afford it right now",
    shortName: 'Affordability',
    category: 'price',
    difficulty: 2,
    frequency: 'very_common',
    icon: '💰',
    frameworks: [FRAMEWORKS.acra, FRAMEWORKS.whatIf],
    sampleResponses: [
      'I completely understand - budget is important, and I\'d never want you to stretch yourself too thin. Can I ask you something though? When you say you can\'t afford it, do you mean there\'s no room in the budget at ALL, or is it more that THIS specific amount feels like too much? [Listen] Here\'s what I\'ve found: most families, when we break it down, are spending more on things they don\'t even think about - streaming services, that daily coffee run. For about $2-3 a day, your family is protected. What would your family\'s budget look like if you weren\'t there to provide for them?',
      'That\'s exactly why we\'re here - to find something that works for YOUR situation. Let me ask you: what monthly amount WOULD work for your budget? [Listen] Good news - we have flexibility. Let me show you what that coverage looks like, and if it makes sense, we can get your family protected today at a level you\'re comfortable with.',
      'I hear that a lot, and I respect it. Here\'s what I want you to consider though: the cost of NOT having coverage. If something happened tomorrow - the mortgage, car payments, groceries, activities for the kids - what would that cost your family? We\'re talking about a fraction of that to make sure it never becomes their problem. For the cost of a coffee a day, your family\'s future is secured.',
    ],
    tips: [
      'Never argue with their budget - acknowledge and work WITH it',
      'Break down the cost: daily ($2-3), weekly ($15-20), vs monthly',
      'Compare to discretionary spending they don\'t think about',
      'Reframe: "What would it cost your family if you weren\'t there?"',
      'Offer to find a solution that fits: "What WOULD work for you?"',
      'Focus on value, not price - what are they protecting?',
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
    frameworks: [FRAMEWORKS.isolateAndAddress, FRAMEWORKS.acra],
    sampleResponses: [
      'Absolutely - this is an important decision, and I\'d never want you to rush into something you\'re not comfortable with. Can I ask you though - what specifically do you want to think about? Is it the coverage amount, the monthly investment, or something else entirely? [Listen] I ask because I want to make sure I\'ve given you all the information you need to make a confident decision.',
      'I respect that. Most of my clients feel the same way at first. Usually when someone says they need to think about it, there\'s something specific on their mind that we haven\'t addressed yet. What questions can I answer right now to help you feel more confident?',
      'Of course, take all the time you need. While you\'re thinking though, keep this in mind: the rates I\'ve shown you are based on your age and health TODAY. Every birthday that passes, those rates go up. And if anything changes with your health - even something minor - you could be looking at higher rates or even being declined. Is that a risk you\'re comfortable taking while you think it over?',
    ],
    tips: [
      '"Think about it" is almost never the real objection',
      'Ask: "What SPECIFICALLY do you need to think about?"',
      'Isolate: Is it price? Coverage? Spouse? Trust?',
      'Create urgency: rates based on TODAY\'s age and health',
      'Offer the 30-day money-back guarantee if available',
      'If you can\'t close, schedule a SPECIFIC follow-up time',
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
    frameworks: [FRAMEWORKS.acra, FRAMEWORKS.boomerang],
    sampleResponses: [
      'That\'s great that your employer provides that - it shows they care about their employees! Let me ask you a couple of questions though. Do you know how much coverage they give you? [Usually 1-2x salary] And what happens to that coverage if you change jobs, get promoted, or eventually retire? [It goes away] So right now you have maybe $50-80K, but experts recommend 10-12 times your income. That\'s a gap of potentially hundreds of thousands. Plus, the moment you leave that job, your family loses that protection completely. This policy fills that gap AND it\'s yours no matter where you work.',
      'I\'m glad you have something in place - that tells me you understand the importance of protection. Here\'s the thing though: your employer\'s policy protects THEM from liability. This policy protects YOUR family. Is it portable? Can you take it if you leave? Does it cover you if you get sick but survive? Most employer plans don\'t include living benefits - this does.',
      'Perfect - so you already understand why coverage matters. The question is: is it ENOUGH? If something happened tomorrow, could your family pay off the mortgage, keep the kids in their school, maintain their lifestyle on 1-2 times your salary? Financial experts recommend 10-12x. What we\'re talking about fills the gap between what you have and what your family actually needs.',
    ],
    tips: [
      'Never dismiss their employer coverage - build on it',
      'Ask how much coverage they actually have (usually 1-2x salary)',
      'Highlight the portability gap - it doesn\'t follow them',
      'Calculate the coverage gap: current vs. recommended 10-12x income',
      'Position AIL coverage as supplemental, not replacement',
      'Mention living benefits - employer plans rarely have these',
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
      'That makes complete sense - this is absolutely a family decision. I\'d want to talk to my spouse too. Would it be helpful if we scheduled a time when both of you are available? That way I can answer any questions [he/she] might have directly, and you can make the decision together with all the information.',
      'I respect that completely - decisions like this should be made together. Let me ask you this: if your spouse agrees that this makes sense for your family, is this something YOU would want to move forward with? [If yes] Perfect - let\'s find a time that works for both of you. What does [his/her] schedule look like this week?',
      'Absolutely. What questions do you think [he/she] will have? Let me give you the information you need to have that conversation. [Address likely questions] Also - I\'m happy to hop on a call with both of you if that would help. Sometimes it\'s easier to hear it together.',
    ],
    tips: [
      'Validate the desire to include spouse - don\'t make them feel bad',
      'Offer to schedule a joint call or meeting immediately',
      'Ask: "If [spouse] agrees, would YOU want to move forward?"',
      'Equip them with answers to likely spouse questions',
      'Get commitment conditional on spouse agreement',
      'ALWAYS schedule a specific follow-up before leaving',
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
    frameworks: [FRAMEWORKS.isolateAndAddress, FRAMEWORKS.acra],
    sampleResponses: [
      'I can definitely do that. Quick question though - what specific information would be most helpful? Coverage options? Pricing? The company history? That way I can send you exactly what you need to make a decision. [Listen] You know what I\'ve found? When people just get a packet, they end up with more questions than answers. Since we\'re already talking, what if we spent 5 more minutes and I walk you through the key points? Then you\'ll have the info AND the clarity.',
      'Happy to send you information. Before I do, let me make sure I understand your situation so I can send the RIGHT information. What\'s most important to you when it comes to protecting your family? [Listen for priorities] Perfect - I\'ll send that over. And just so the information doesn\'t sit on your counter, let\'s schedule a quick 10-minute call for [specific day/time] so I can answer any questions that come up.',
      'Absolutely. Let me be upfront with you though - in my experience, information packets don\'t protect families. Decisions do. Most people who just want information are really saying they have a question they haven\'t asked yet. What\'s really holding you back? If I can address that right now, we can get your family protected today.',
    ],
    tips: [
      'This is often a polite brush-off - dig deeper',
      'Ask WHAT information they want specifically',
      'Offer to walk through information right now',
      'Get commitment to a specific follow-up conversation',
      'Information alone never closes - you need to be there',
      'Uncover the real objection hiding behind this request',
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
    frameworks: [FRAMEWORKS.feelFeltFound, FRAMEWORKS.acra],
    sampleResponses: [
      'I appreciate you being honest with me - and honestly, I understand. There are a lot of stories out there about insurance companies not paying claims or making it difficult. Can I ask what experience led to that feeling? [Listen genuinely] I hear you. Here\'s what I can tell you about American Income Life specifically: we\'ve been protecting working families since 1951 - over 70 years. We have an A (Excellent) rating from A.M. Best for financial strength, and we serve millions of union members and working families. Our reputation is built on paying claims when families need it most.',
      'That\'s fair - trust is earned, not given. What I find is that most bad experiences come from companies that don\'t specialize in working families like we do. We\'re not trying to be everything to everyone. We focus on one thing: protecting hardworking families like yours. That\'s why organizations like [their union/association] partner with us - they\'ve done their due diligence and trust us with their members.',
      'I respect that skepticism - it means you\'re smart and protective of your family. Let me share this: we serve teachers, first responders, union workers - people who don\'t have time for companies that don\'t deliver. We\'ve built our reputation on showing up when families need us most. That\'s why [their union/association] chose to partner with us specifically.',
    ],
    tips: [
      'Let them share their experience first - listen genuinely',
      'Acknowledge that bad actors exist in the industry',
      'Share AIL\'s history (since 1951) and A.M. Best rating (A)',
      'Highlight claims-paying record and reputation',
      'Use social proof: union partnerships, working family focus',
      'You represent the company - your professionalism builds trust',
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
      'I understand - life never seems to slow down, does it? Can I ask what specifically is making it a bad time? Is it financial, or just a lot going on right now? [Listen] Here\'s the thing I want you to consider: there\'s never really a "perfect" time to protect your family. But there\'s definitely a wrong time to find out you\'re not protected. The rates I can offer are based on your age and health TODAY - waiting costs money.',
      'I hear that. Let me ask you this though: when DO you think would be the right time? [Listen for their answer] Here\'s my concern: every year that passes, the rates go up. And if anything changes with your health, you might not be able to get this coverage at all. Your family\'s protection shouldn\'t wait for the perfect moment. For just a few dollars a day, we can get them protected right now.',
      'Life never really slows down, does it? I get it. Here\'s what I\'ve learned in this business though: the families who wait for the "right time" are the same families who end up unprotected when they need it most. This takes 20 minutes now, and then your family is covered. What would make now work better for you?',
    ],
    tips: [
      'Find out WHY it\'s bad timing specifically',
      'Is it financial timing or life timing?',
      'Urgency: rates increase with age, health can change',
      '"There\'s never a perfect time, but there\'s definitely a wrong time"',
      'Find solutions for their specific timing issue',
      'Schedule a SPECIFIC follow-up if they truly can\'t today',
    ],
  },
  {
    id: 'too-young',
    text: "I'm too young, I don't need it yet",
    shortName: 'Too Young',
    category: 'need',
    difficulty: 2,
    frequency: 'occasional',
    icon: '🌱',
    frameworks: [FRAMEWORKS.boomerang],
    sampleResponses: [
      'Actually, that\'s exactly why NOW is the perfect time! Think about it - your rates are at their absolute lowest when you\'re young and healthy. Lock them in now, and you\'ll pay the same rate when you\'re 50, 60, 70. Wait 10 years? You could easily be paying double. Your youth is an ASSET right now - let\'s use it.',
      'I hear that from folks your age. Let me ask you this though: do you plan on having a family someday? A mortgage? Being responsible for people who depend on you? This isn\'t about needing it RIGHT NOW - it\'s about locking in protection at the cheapest rates you\'ll ever qualify for. Future you will thank present you.',
      'Here\'s what\'s interesting: the youngest, healthiest people get the best rates AND are guaranteed approval. Every year you wait, that changes. Why not lock in the best deal possible while you can? Plus - this builds cash value. By the time you\'re 40, you\'ll have a nice little nest egg built up that you can borrow against if you need to.',
    ],
    tips: [
      'Turn youth into an advantage - this is when rates are LOWEST',
      'Premiums locked in for life at their current young age',
      'Future-proof their insurability before health changes',
      'Compare rates at current age vs. 10-15 years older',
      'Mention cash value accumulation for whole life policies',
      'Stories of young people who waited and couldn\'t get coverage',
    ],
  },
  {
    id: 'health-issues',
    text: "I have health issues, I probably can't qualify",
    shortName: 'Health Concerns',
    category: 'need',
    difficulty: 3,
    frequency: 'occasional',
    icon: '🏥',
    frameworks: [FRAMEWORKS.acra],
    sampleResponses: [
      'I appreciate you sharing that with me. Before we assume anything, can I ask what conditions you\'re managing? [Listen without judgment] You might be surprised - many people with health conditions still qualify. We work with people every day who thought they couldn\'t get coverage. And we have options specifically designed for situations like yours that don\'t even require a medical exam. Let\'s at least explore what you might qualify for.',
      'Thank you for being upfront about that. Here\'s the thing - if your health is already a factor, doesn\'t that make protection even MORE important for your family? We have options that focus on guaranteed issue - meaning you can\'t be declined. The coverage might look different, but your family would still be protected. Let\'s see what\'s available.',
      'I understand that concern - a lot of my clients have felt the same way. Here\'s what I know: we serve working families, and working families have health challenges. That\'s reality. We have products designed specifically for people in your situation. Rather than assuming you can\'t qualify, let\'s see what we can do. The worst case is we find out your options are limited. But wouldn\'t you rather know for sure?',
    ],
    tips: [
      'Don\'t make assumptions - ask questions first',
      'Many conditions are still insurable at standard or rated rates',
      'Highlight no-exam options (final expense, guaranteed issue)',
      'Health issues = MORE reason to get what coverage they can',
      'Position yourself as an advocate to find solutions',
      'Some coverage is always better than no coverage',
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
    frameworks: [FRAMEWORKS.acra],
    sampleResponses: [
      'I respect that. Before I go, can I ask you one question? What specifically isn\'t appealing to you? I ask because [Union/Association] specifically asked us to reach out to their members, and I want to make sure I\'m presenting this correctly. Is it life insurance in general you\'re not interested in, or something about what I\'ve shared?',
      'Fair enough. May I ask just one thing though? If something happened to you tomorrow, is your family financially prepared? If the answer is genuinely yes - you\'ve got enough coverage, enough savings, they\'d be taken care of - then I\'ll be on my way. But if there\'s any doubt, would you be open to hearing how little it costs to make sure they\'re protected?',
      'I understand - and I appreciate your directness. A lot of people say that at first. Usually it means they\'ve either had a bad experience with insurance, or they\'ve got coverage they feel good about. Which is it for you? [Listen] If there\'s something I can address, I\'d love the chance. If not, no hard feelings.',
    ],
    tips: [
      'This is usually a knee-jerk response, not a real objection',
      'Don\'t take it personally - stay professional',
      'Ask ONE good question to restart the conversation',
      'Distinguish: not interested in insurance OR in this conversation?',
      'Sometimes it\'s truly not the right time - respect that',
      'Leave the door open and ask for referrals',
    ],
  },
  {
    id: 'too-expensive',
    text: "That's too expensive",
    shortName: 'Too Expensive',
    category: 'price',
    difficulty: 2,
    frequency: 'common',
    icon: '💸',
    frameworks: [FRAMEWORKS.whatIf, FRAMEWORKS.acra],
    sampleResponses: [
      'I hear you. Expensive compared to what though? Your Netflix subscription? Your daily coffee? [Let them think] Here\'s the thing - for about what most people spend on things they don\'t even think about, their family is protected forever. Let me break it down: that\'s about $[X] a day. Is $[X] a day too much to make sure your [spouse/kids] never have to worry about the mortgage if something happens to you?',
      'That\'s fair feedback. Can I ask - is it the TOTAL that feels too expensive, or is it that this particular payment doesn\'t fit in your monthly budget right now? [Listen] Because if it\'s a matter of finding the right fit, we have options. What monthly amount WOULD work for you? Let me show you what that coverage looks like.',
      'I understand that reaction. But let me ask you this: what\'s the alternative? If something happens and you don\'t have coverage, what does THAT cost your family? The mortgage doesn\'t go away. The bills don\'t stop. Your kids still need to eat, go to school, have a future. This premium is the cost of making sure none of that becomes their problem.',
    ],
    tips: [
      'Reframe "expensive" to "investment in family\'s security"',
      'Break down to daily cost - always sounds more manageable',
      'Compare to discretionary spending they don\'t question',
      'Ask if it\'s the TOTAL or the MONTHLY that\'s the issue',
      'If monthly is the issue, explore coverage options that fit',
      'Compare premium cost to cost of NOT having coverage',
    ],
  },
  {
    id: 'let-me-research',
    text: 'Let me do some research first',
    shortName: 'Research',
    category: 'timing',
    difficulty: 2,
    frequency: 'occasional',
    icon: '🔍',
    frameworks: [FRAMEWORKS.acra, FRAMEWORKS.isolateAndAddress],
    sampleResponses: [
      'I think that\'s smart - you should absolutely understand what you\'re getting. What specifically do you want to research? [Listen] I ask because I might be able to answer those questions right now and save you some time. What would you need to see or know to feel comfortable moving forward?',
      'I respect that - you\'re clearly someone who does their homework. Here\'s what I\'d suggest: let me give you some specific things to look up. Check our A.M. Best rating - we\'re rated A for financial strength. Look us up on the BBB. Read what [union/association] members say about working with us. But here\'s the thing - while you\'re researching, your family isn\'t protected. And the rates I quoted are based on TODAY. What if I could address your concerns right now?',
      'Totally fair. Let me ask you though - what\'s your concern? Is it the company? The product? The cost? Something else? [Listen] Because most of the time when people say they want to research, there\'s a specific thing they\'re not sure about. If I can address that now, we can get your family protected today instead of leaving them uncovered while you Google.',
    ],
    tips: [
      'Validate their desire to be informed',
      'Ask WHAT specifically they want to research',
      'Offer to answer their questions right now',
      'Provide specific things to look up (A.M. Best, BBB, reviews)',
      'Remind them: while researching, family isn\'t protected',
      'Try to uncover the real objection underneath',
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
