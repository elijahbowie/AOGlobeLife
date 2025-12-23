import type { Product, ProductModule, ProductQuiz, ProductCategory } from '../types';

// ============================================
// AIL PRODUCT CATALOG
// ============================================

export const PRODUCTS: Product[] = [
  // LIFE INSURANCE PRODUCTS
  {
    id: 'whole-life',
    name: 'Whole Life Insurance',
    category: 'life',
    description:
      'Permanent life insurance that provides lifelong coverage with fixed premiums and cash value accumulation.',
    icon: '🛡️',
    keyFeatures: [
      'Lifetime coverage that never expires',
      'Fixed premiums that never increase',
      'Builds cash value you can borrow against',
      'Guaranteed death benefit',
      'Policy cannot be cancelled due to health changes',
    ],
    targetAudience:
      'Working families seeking permanent protection and savings component',
    sellingPoints: [
      'Unlike employer coverage, this stays with you if you change jobs or retire',
      'The premium you pay at 35 is the same you pay at 75',
      'Builds cash value like a forced savings account',
      'Covers final expenses so your family isnt burdened',
      'Peace of mind knowing your family is protected no matter what',
    ],
    commonObjections: [
      'I already have insurance through work',
      'Whole life is too expensive',
      'I can invest the difference myself',
    ],
    premiumRange: '$25-$150/month depending on coverage',
  },
  {
    id: 'term-life',
    name: 'Term Life Insurance',
    category: 'life',
    description:
      'Temporary coverage for a specified period, offering affordable protection when you need it most.',
    icon: '📋',
    keyFeatures: [
      'Coverage for specific term (10, 20, 30 years)',
      'Lower premiums than whole life',
      'Ideal for temporary needs (mortgage, kids education)',
      'Option to convert to permanent coverage',
      'Simple and straightforward coverage',
    ],
    targetAudience:
      'Young families, homeowners with mortgages, parents with dependent children',
    sellingPoints: [
      'Maximum coverage at minimum cost',
      'Perfect for covering your mortgage or kids college years',
      'Lock in low rates while youre young and healthy',
      'Can convert to whole life later without medical exam',
      'Ensures your family can maintain their lifestyle',
    ],
    commonObjections: [
      'What happens when the term ends?',
      'I dont want to pay for something I might not use',
      "I'm young and healthy, I don't need it yet",
    ],
    premiumRange: '$15-$75/month depending on term and coverage',
  },
  {
    id: 'final-expense',
    name: 'Final Expense Insurance',
    category: 'life',
    description:
      'Burial insurance designed to cover end-of-life costs without burdening your loved ones.',
    icon: '🕊️',
    keyFeatures: [
      'Coverage typically $5,000-$25,000',
      'No medical exam required in most cases',
      'Quick and simple application process',
      'Fixed premiums for life',
      'Immediate coverage available',
    ],
    targetAudience: 'Seniors 50-85, those concerned about burial costs',
    sellingPoints: [
      'Average funeral costs over $10,000 - dont leave that to your family',
      'No medical exam means quick approval',
      'Covers funeral, medical bills, and outstanding debts',
      'Premiums fit any budget',
      'Gives your family time to grieve instead of worry about money',
    ],
    commonObjections: [
      "I don't want to think about death",
      'My family will figure it out',
      "I'm saving money for that",
    ],
    premiumRange: '$20-$100/month',
  },
  {
    id: 'head-start',
    name: 'Head Start Program',
    category: 'life',
    description:
      "Children's whole life insurance that protects their future insurability and builds cash value.",
    icon: '👶',
    keyFeatures: [
      'Initial coverage up to $25,000',
      'Can increase to $150,000 as child grows',
      'Locks in insurability regardless of future health',
      'Builds cash value for future needs',
      'Very affordable premiums',
    ],
    targetAudience: 'Parents and grandparents of children 0-17',
    sellingPoints: [
      'Lock in their insurability while theyre young and healthy',
      'Premiums are incredibly low for children',
      'Cash value can help with college or first home',
      'Protection if something unexpected happens',
      'Gift that keeps giving throughout their life',
    ],
    commonObjections: [
      'Kids dont need life insurance',
      "I'd rather put money in a savings account",
      'Nothing is going to happen to my child',
    ],
    premiumRange: '$10-$30/month',
  },

  // SUPPLEMENTAL HEALTH PRODUCTS
  {
    id: 'hospital-indemnity',
    name: 'Hospital Indemnity',
    category: 'supplemental_health',
    description:
      'Cash benefits for hospital stays to cover out-of-pocket expenses and lost income.',
    icon: '🏥',
    keyFeatures: [
      'Cash paid directly to you, not the hospital',
      'Use the money however you need',
      'Covers expenses health insurance doesnt',
      'No network restrictions',
      'Pays in addition to other insurance',
    ],
    targetAudience:
      'Anyone with high-deductible health plans, hourly workers, self-employed',
    sellingPoints: [
      'Average hospital stay costs thousands in deductibles and copays',
      'Covers lost wages while youre in the hospital',
      'Pay for childcare, transportation, bills while recovering',
      'No questions asked - spend the cash however you need',
      'Works alongside your existing health insurance',
    ],
    commonObjections: [
      'I have health insurance already',
      'I dont plan on going to the hospital',
      'This seems like double coverage',
    ],
    premiumRange: '$20-$60/month',
  },
  {
    id: 'cancer-protection',
    name: 'Cancer Protection',
    category: 'supplemental_health',
    description:
      'Financial assistance during cancer treatment to help with medical and living expenses.',
    icon: '🎗️',
    keyFeatures: [
      'Lump sum benefit upon diagnosis',
      'Ongoing treatment benefits',
      'Covers experimental treatments',
      'No network restrictions',
      'Pays in addition to health insurance',
    ],
    targetAudience: 'Those with family history of cancer, health-conscious individuals',
    sellingPoints: [
      '1 in 3 people will be diagnosed with cancer in their lifetime',
      'Average cancer treatment costs over $150,000',
      'Covers what health insurance doesnt - travel, lodging, lost wages',
      'Allows you to focus on getting better, not finances',
      'Peace of mind for you and your family',
    ],
    commonObjections: [
      'No one in my family has had cancer',
      'My health insurance will cover it',
      'I dont want to think about getting cancer',
    ],
    premiumRange: '$25-$75/month',
  },
  {
    id: 'critical-illness',
    name: 'Critical Illness',
    category: 'supplemental_health',
    description:
      'Lump-sum cash benefit for major illnesses like heart attack, stroke, or organ failure.',
    icon: '❤️',
    keyFeatures: [
      'Covers heart attack, stroke, kidney failure, and more',
      'One-time lump sum payment',
      'Use funds for any purpose',
      'No waiting period for accidents',
      'Guaranteed renewable',
    ],
    targetAudience:
      'Adults 25-65, especially those with family history of heart disease or stroke',
    sellingPoints: [
      'Heart disease is the #1 killer in America',
      'Average heart attack survivor has $50,000+ in out-of-pocket costs',
      'Covers mortgage payments while you recover',
      'Allows time off work without financial stress',
      'Supplements your health insurance when you need it most',
    ],
    commonObjections: [
      "I'm healthy, this won't happen to me",
      'I have disability insurance',
      'Too many exclusions',
    ],
    premiumRange: '$30-$80/month',
  },

  // ACCIDENT PRODUCTS
  {
    id: 'accident-a71000',
    name: 'Accident Protection (A71000)',
    category: 'accident',
    description:
      'Cash benefits for accidental injuries, from minor injuries to serious accidents.',
    icon: '🚗',
    keyFeatures: [
      'Cash paid for accidental injuries',
      'Covers emergency room visits',
      'Benefits for fractures, dislocations, burns',
      'Guaranteed renewable - cannot be cancelled',
      'No medical exam or health questions',
    ],
    targetAudience:
      'Active individuals, families with children, workers in physical jobs',
    sellingPoints: [
      'Accidents happen when you least expect them',
      'ER visits average $1,200+ out of pocket',
      'Kids are accident magnets - broken bones, stitches, sports injuries',
      'Covers what health insurance deductibles dont',
      'Cash in hand within days of filing a claim',
    ],
    commonObjections: [
      "I'm careful, I don't have accidents",
      'My health insurance covers emergencies',
      "I don't do anything dangerous",
    ],
    premiumRange: '$15-$45/month',
  },
];

// ============================================
// PRODUCT LEARNING MODULES
// ============================================

export const PRODUCT_MODULES: ProductModule[] = [
  // Whole Life Modules
  {
    id: 'whole-life-1',
    productId: 'whole-life',
    title: 'What is Whole Life Insurance?',
    order: 1,
    content: `Whole life insurance is permanent life insurance that provides coverage for your entire lifetime, as long as premiums are paid. Unlike term insurance which expires, whole life is designed to be there when you need it most - guaranteed.

The key distinction is permanence. When a client asks "What if I outlive my policy?" - with whole life, you can't. It's there for life.`,
    keyPoints: [
      'Coverage lasts entire lifetime - never expires',
      'Premium is locked in at purchase - never increases',
      'Builds cash value over time that can be borrowed against',
      'Death benefit is guaranteed to beneficiaries',
    ],
    scriptSnippet:
      '"Whole life is different from what you might have through work. This policy stays with you no matter what - change jobs, retire, even if your health changes. And the premium you pay today is the same you\'ll pay 30 years from now."',
  },
  {
    id: 'whole-life-2',
    productId: 'whole-life',
    title: 'Cash Value Explained',
    order: 2,
    content: `One of the unique benefits of whole life insurance is the cash value component. A portion of each premium payment goes into a cash value account that grows over time on a tax-deferred basis.

This cash value can be accessed through policy loans while keeping the coverage in force. It's like a built-in savings account attached to your protection.`,
    keyPoints: [
      'Cash value grows tax-deferred',
      'Can borrow against cash value at competitive rates',
      'Loans dont require credit check or approval',
      'Cash value can supplement retirement income',
    ],
    scriptSnippet:
      '"One thing I love about this policy is the cash value. Over time, part of your premium builds up savings you can access. Need money for an emergency? Kids\' college? You can borrow from your own policy without going to a bank."',
  },
  {
    id: 'whole-life-3',
    productId: 'whole-life',
    title: 'Whole Life vs. Employer Coverage',
    order: 3,
    content: `Most employer-provided life insurance has significant limitations that leave families vulnerable. Understanding these gaps is crucial for helping clients see the need for personal coverage.

Employer coverage typically equals 1-2x annual salary, ends when employment ends, and cannot be taken with you. This leaves families dramatically underinsured.`,
    keyPoints: [
      'Employer coverage usually only 1-2x salary (experts recommend 10-12x)',
      'Coverage ends when you leave the job',
      'No portability - cant take it with you',
      'Premiums increase as you age if you try to convert',
    ],
    scriptSnippet:
      '"Let me ask you this - how much coverage does your employer give you? [Usually 1-2x salary]. Experts recommend 10-12 times your income to truly protect your family. Plus, if you ever change jobs, that coverage goes away. This policy is YOURS - it goes wherever you go."',
  },
  {
    id: 'whole-life-4',
    productId: 'whole-life',
    title: 'Overcoming the Cost Objection',
    order: 4,
    content: `"It's too expensive" is the most common objection to whole life insurance. The key is reframing the conversation from cost to value and showing how affordable proper protection actually is.

Most people dramatically overestimate the cost of life insurance. Studies show people think it costs 3-5x more than it actually does.`,
    keyPoints: [
      'Break it down to daily cost ($1-3/day for most policies)',
      'Compare to things they spend money on (coffee, streaming)',
      'Focus on what family would lose without it',
      'Show the cost of waiting (premiums increase with age)',
    ],
    scriptSnippet:
      '"I understand budget is important. Let me break this down - we\'re talking about [X] dollars a day. Less than a coffee. For that, your family is protected no matter what. Can I ask - what would happen to your mortgage, your kids\' future, if something happened tomorrow?"',
  },
  {
    id: 'whole-life-5',
    productId: 'whole-life',
    title: 'Closing the Whole Life Sale',
    order: 5,
    content: `Closing a whole life sale requires building value throughout the presentation and then making it easy for the client to say yes. Use assumptive language and remove friction from the decision.

Remember: youre not selling insurance - youre helping them protect the people they love most.`,
    keyPoints: [
      'Summarize benefits theyve agreed to throughout conversation',
      'Use assumptive close - "Which billing date works better?"',
      'Address final concerns with empathy',
      'Make the next step easy and clear',
    ],
    scriptSnippet:
      '"Based on everything weve discussed, the [Plan Name] gives you exactly what you need - lifetime protection, cash value growth, and peace of mind. The investment is just [amount] per month. Do you prefer the 1st or 15th for your billing date?"',
  },

  // Hospital Indemnity Modules
  {
    id: 'hospital-1',
    productId: 'hospital-indemnity',
    title: 'Understanding Hospital Indemnity',
    order: 1,
    content: `Hospital Indemnity insurance pays cash benefits directly to you when you're hospitalized - not to the hospital or doctors. This cash can be used for anything: medical bills, mortgage, groceries, childcare, or lost wages.

It works alongside any health insurance you have, with no coordination of benefits.`,
    keyPoints: [
      'Cash paid directly to policyholder',
      'Use for any purpose - no restrictions',
      'Pays in addition to health insurance',
      'No network or provider restrictions',
    ],
    scriptSnippet:
      '"This is different from your health insurance. When you\'re in the hospital, we pay cash directly to YOU. Use it for your deductible, pay your mortgage while you\'re recovering, cover childcare - whatever you need. And it pays on top of whatever your health insurance covers."',
  },

  // Additional modules would continue for all products...
];

// ============================================
// PRODUCT QUIZZES
// ============================================

export const PRODUCT_QUIZZES: ProductQuiz[] = [
  {
    id: 'quiz-whole-life',
    productId: 'whole-life',
    passingScore: 80,
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: 'wl-q1',
        question:
          'A client asks "What happens to my whole life policy if I lose my job?" What\'s the BEST answer?',
        options: [
          'You\'ll need to cancel and reapply when employed',
          'Your policy continues - it\'s not tied to employment',
          'We convert it to a term policy temporarily',
          'You\'d need to pay a higher premium',
        ],
        correctAnswer: 1,
        explanation:
          'Whole life is personal coverage owned by the policyholder, not tied to employment. This is a major selling point vs. employer coverage!',
      },
      {
        id: 'wl-q2',
        question: 'Which of these is TRUE about whole life cash value?',
        options: [
          'You lose the cash value if you die',
          'You can only access it after age 65',
          'You can borrow against it while keeping coverage active',
          'Cash value is taxed annually',
        ],
        correctAnswer: 2,
        explanation:
          'Policyholders can take loans against their cash value at any time while maintaining their death benefit. Cash value grows tax-deferred.',
      },
      {
        id: 'wl-q3',
        question:
          'A prospect says "I already have life insurance through work." The BEST response is:',
        options: [
          'You should cancel that and get our policy instead',
          'Ask how much coverage they have and if it\'s portable',
          'Employer coverage is always enough',
          'We can\'t help you then',
        ],
        correctAnswer: 1,
        explanation:
          'Asking questions uncovers gaps in coverage. Most employer plans are only 1-2x salary (vs. recommended 10-12x) and aren\'t portable.',
      },
      {
        id: 'wl-q4',
        question:
          'Financial experts typically recommend life insurance coverage of:',
        options: [
          '1-2 times annual salary',
          '3-5 times annual salary',
          '10-12 times annual salary',
          'Whatever your employer provides',
        ],
        correctAnswer: 2,
        explanation:
          'Most financial advisors recommend 10-12x annual income to properly protect a family from income loss.',
      },
      {
        id: 'wl-q5',
        question:
          'What happens to whole life premiums as the policyholder ages?',
        options: [
          'They increase every 5 years',
          'They stay the same - locked in at purchase',
          'They decrease as cash value builds',
          'They adjust based on health status',
        ],
        correctAnswer: 1,
        explanation:
          'Whole life premiums are fixed at the time of purchase and never increase, regardless of age or health changes.',
      },
    ],
  },
  {
    id: 'quiz-hospital',
    productId: 'hospital-indemnity',
    passingScore: 80,
    timeLimit: 480,
    questions: [
      {
        id: 'hi-q1',
        question:
          'Hospital Indemnity benefits are paid to:',
        options: [
          'The hospital directly',
          'Your health insurance company',
          'You, the policyholder',
          'Your employer',
        ],
        correctAnswer: 2,
        explanation:
          'Hospital Indemnity pays cash directly to the policyholder to use however they need.',
      },
      {
        id: 'hi-q2',
        question:
          'A client says "I have health insurance, why do I need this?" The BEST response is:',
        options: [
          'This replaces your health insurance',
          'Health insurance covers hospital bills, this covers everything else',
          'You don\'t need both',
          'This is cheaper than health insurance',
        ],
        correctAnswer: 1,
        explanation:
          'Hospital Indemnity covers the gaps - lost wages, deductibles, childcare, transportation - that health insurance doesn\'t.',
      },
      {
        id: 'hi-q3',
        question:
          'Which statement about Hospital Indemnity is TRUE?',
        options: [
          'It only pays for surgeries',
          'It has network restrictions like health insurance',
          'It pays in addition to any other insurance',
          'Benefits are taxable',
        ],
        correctAnswer: 2,
        explanation:
          'Hospital Indemnity pays regardless of other coverage with no primary/secondary coordination.',
      },
    ],
  },
  // Additional quizzes for other products...
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

// Get all products
export const getAllProducts = (): Product[] => PRODUCTS;

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductModules = (productId: string): ProductModule[] =>
  PRODUCT_MODULES.filter((m) => m.productId === productId).sort(
    (a, b) => a.order - b.order
  );

export const getProductQuiz = (productId: string): ProductQuiz | undefined =>
  PRODUCT_QUIZZES.find((q) => q.productId === productId);

export const PRODUCT_CATEGORIES: { id: ProductCategory; name: string; icon: string }[] = [
  { id: 'life', name: 'Life Insurance', icon: '🛡️' },
  { id: 'supplemental_health', name: 'Supplemental Health', icon: '⚕️' },
  { id: 'accident', name: 'Accident Coverage', icon: '🚗' },
];
