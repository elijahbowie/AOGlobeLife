import type { Script, ScriptCategory } from '../types';

// ============================================
// SALES SCRIPTS LIBRARY
// ============================================

export const SCRIPTS: Script[] = [
  // COLD CALL SCRIPTS
  {
    id: 'cold-call-union',
    title: 'Union Member Cold Call Opening',
    category: 'cold_call',
    description:
      'Opening script for calling union members who are expecting benefits information.',
    tags: ['cold call', 'union', 'opening', 'appointment setting'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Hi, is this [First Name]?

[First Name], this is [Your Name] with American Income Life. The reason for my call is that [Union Name] asked us to reach out to members about your supplemental benefits.

I'm not calling to sell you anything today. What I'd like to do is set up a brief appointment to review the benefits available to you as a union member and answer any questions you might have.

It typically takes about 20-30 minutes. Would [Day] at [Time] work, or would [Alternative Day] at [Alternative Time] be better?

[If resistance: "I completely understand you're busy. These benefits are specifically for union members like yourself, and there's no cost or obligation to take a look. When would be a good time for a quick call?"]`,
  },
  {
    id: 'cold-call-association',
    title: 'Association Member Opening',
    category: 'cold_call',
    description:
      'Opening script for association members (credit unions, professional groups).',
    tags: ['cold call', 'association', 'opening'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Hi, may I speak with [First Name]?

[First Name], my name is [Your Name] and I'm calling on behalf of American Income Life. We partner with [Association Name] to provide supplemental benefits to members.

The reason for my call is to set up a time to review the benefits you're entitled to as a member. It's completely free to look at, and there's no obligation.

Is there a time this week that works for a 20-minute call, or would next week be better?

[If "What is this about?": "Great question! As a member, you have access to supplemental life and health benefits that work alongside your existing coverage. We just want to make sure you know what's available to you."]`,
  },
  {
    id: 'cold-call-referral',
    title: 'Referral Call Opening',
    category: 'cold_call',
    description: 'Script for calling someone referred by an existing client.',
    tags: ['cold call', 'referral', 'warm lead'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Hi, is this [First Name]?

[First Name], my name is [Your Name]. I was just with [Referrer Name] and they mentioned I should give you a call.

[Referrer Name] was really happy with the benefits we put in place for their family, and they thought you might be interested in seeing what's available.

I'd love to set up a quick time to show you what we did for them - it only takes about 20 minutes. Would [Day] or [Alternative Day] work better for you?

[If "What did they get?": "[Referrer Name] got some supplemental coverage for their family - life insurance and some accident protection. Nothing complicated, but it really filled some gaps they had. Can I show you what might work for your situation?"]`,
  },

  // HOME VISIT SCRIPTS
  {
    id: 'home-intro',
    title: 'Home Visit Introduction',
    category: 'home_visit',
    description: 'How to start a home presentation professionally.',
    tags: ['home visit', 'introduction', 'rapport building'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[At the door]
Hi [First Name], great to meet you in person! I'm [Your Name] from American Income Life.

[Once inside]
Thank you so much for having me. Before we get started, I want you to know there's absolutely no obligation today. My job is simply to show you what benefits are available and answer any questions you have.

If at the end you feel like this is a fit for your family, great - we can talk about next steps. If not, no pressure at all. Fair enough?

Now, to make sure I'm showing you the right options, can I ask you a few questions about your family and what's important to you when it comes to protecting them?

[Transition to needs analysis]`,
  },
  {
    id: 'needs-analysis',
    title: 'Family Needs Analysis',
    category: 'home_visit',
    description: 'Questions to uncover protection needs and gaps.',
    tags: ['home visit', 'needs analysis', 'discovery'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Let me learn a little bit about your family so I can show you the right options.

1. "Tell me a bit about your family - who are we protecting here?"
   [Listen for: spouse, children, dependents, mortgage]

2. "Do you currently have any life insurance in place?"
   [If yes]: "That's great. Is it through your employer or a personal policy?"
   [If through employer]: "Do you know how much coverage they provide?"

3. "If something unexpected happened tomorrow, walk me through what your family's situation would look like financially."
   [Listen for: concerns about mortgage, income replacement, kids' education]

4. "What would you want to make sure was taken care of for your family?"
   [Listen for: priorities, emotional hot buttons]

5. "Have you thought about how much coverage you'd ideally want in place?"
   [If unsure]: "That's okay - let me show you what experts recommend and we can figure out what makes sense for you."

[Use their answers to transition into presentation of solutions]`,
  },
  {
    id: 'presentation-transition',
    title: 'Transition to Presentation',
    category: 'home_visit',
    description: 'Bridge from needs analysis to presenting solutions.',
    tags: ['home visit', 'presentation', 'transition'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Based on what you've shared with me, here's what I'm hearing:

[Summarize their situation]
- You have [family situation]
- Your main concern is [their stated concern]
- Right now, you have [their current coverage or lack of]
- If something happened, [their worry about family]

Does that sound about right?

[Wait for confirmation]

Perfect. Let me show you a few options that address exactly what we talked about. I'll go through a couple of different approaches, and you tell me which feels right for your family.

[Begin presenting solutions]`,
  },

  // CLOSING SCRIPTS
  {
    id: 'assumptive-close',
    title: 'Assumptive Close',
    category: 'closing',
    description: 'Move naturally into the application with assumptive language.',
    tags: ['closing', 'assumptive', 'getting the sale'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Based on everything we've discussed, the [Plan Name] really seems like the perfect fit for what you and your family need.

You mentioned [refer back to their stated need], and this takes care of that completely.

The investment is just [amount] per month - less than [comparison: a dollar a day / a couple of coffees].

Now, for the billing - do you prefer the 1st of the month or the 15th?

[If hesitation]: "Is there anything else you'd like to know before we get this set up for your family?"

[Complete application]`,
  },
  {
    id: 'either-or-close',
    title: 'Either/Or Close',
    category: 'closing',
    description: 'Give options that both result in a sale.',
    tags: ['closing', 'either-or', 'options'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `So we've looked at two great options here:

Option A gives you [coverage amount] with [key benefit] for [monthly amount].

Option B provides [higher coverage] with [additional benefit] for [higher amount].

Both of them solve the problem we talked about - protecting [specific family need].

Which one feels like the right fit for your family - A or B?

[Wait for response - let silence work]

[If they choose]: "Great choice. Let's get that set up for you right now."

[If undecided]: "If budget wasn't a factor, which one would you prefer? [Usually B] Okay, let's start there and see if we can make it work."`,
  },
  {
    id: 'urgency-close',
    title: 'Creating Urgency',
    category: 'closing',
    description: 'Help prospects understand why acting now matters.',
    tags: ['closing', 'urgency', 'timing'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `I want to share something important with you.

The rates I've shown you today are based on your age and health right now. Every birthday that passes, those rates go up. And if anything changes with your health - even something minor - you could be looking at higher rates or even being declined.

I've seen people say "I'll do it next month" and then something happens and they can't get coverage at all.

Here's my recommendation: Let's lock in this rate today. If for any reason you change your mind, you have a 30-day money-back guarantee. But at least your family is protected while you have time to think.

What do you say - should we get this in place today?`,
  },

  // FOLLOW-UP SCRIPTS
  {
    id: 'follow-up-think',
    title: 'Follow Up: "Needed to Think"',
    category: 'follow_up',
    description: 'Re-engage someone who said they needed time to think.',
    tags: ['follow-up', 'think about it', 'callback'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Hi [First Name], this is [Your Name] from American Income Life. We spoke [last week/a few days ago] about protection for your family.

I wanted to check in and see if you had any questions come up since we talked?

[If no questions]: "That's great. So what are your thoughts - are you ready to move forward?"

[If has questions]: "Perfect, I'm glad you brought that up. [Answer question]. Does that clear things up?"

[If still hesitant]: "[First Name], can I ask - what's holding you back? I just want to make sure I've addressed all your concerns."

[Address specific concern, then re-close]`,
  },
  {
    id: 'follow-up-spouse',
    title: 'Follow Up: Spouse Discussion',
    category: 'follow_up',
    description: 'Check in after they talked to their spouse.',
    tags: ['follow-up', 'spouse', 'callback'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `Hi [First Name], it's [Your Name] from American Income Life.

You mentioned you wanted to discuss the coverage options with [Spouse Name]. Did you two have a chance to talk about it?

[If yes, positive]: "Great! What did [he/she] think?"
[If they agree]: "Wonderful. Should we get that set up now?"

[If yes, questions]: "What questions came up? I'm happy to answer them - or I could hop on a call with both of you if that would help."

[If haven't talked yet]: "No problem, I know life gets busy. When do you think you'll have a chance to discuss it? I'll give you a call after that."

[If spouse said no]: "I understand. Can I ask what specifically concerned them? Maybe I can provide some information that would help address that."`,
  },

  // OBJECTION HANDLING SCRIPTS
  {
    id: 'objection-afford',
    title: 'Handling: "I Can\'t Afford It"',
    category: 'objection',
    description: 'Script for addressing budget and affordability objections.',
    tags: ['objection', 'price', 'affordability'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `"I completely understand - budget is important.

Let me ask you this: if something happened to you tomorrow, what would your family's budget look like? The mortgage, the car payments, groceries, activities for the kids...

[Pause for impact]

What we're talking about here is [X] dollars a day - less than a cup of coffee - to make sure that never happens.

And here's the thing - we have different options. Let me show you what we can do that fits within your budget. What would you be comfortable investing to protect your family?"

[Adjust coverage/payment to their budget and re-present]`,
  },
  {
    id: 'objection-employer',
    title: 'Handling: "Have Employer Coverage"',
    category: 'objection',
    description: 'Address the "I already have insurance through work" objection.',
    tags: ['objection', 'employer', 'work coverage'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `"That's great that your employer provides that! Let me ask you a couple questions:

Do you know how much coverage they give you?
[Usually 1-2x salary - experts recommend 10-12x]

And what happens to that coverage if you change jobs or retire?
[It goes away]

So right now you have [amount], but if something happened, your family would need [X per year] just to maintain their current lifestyle. That's a gap of [difference].

The coverage we're talking about fills that gap - AND it's yours forever, no matter where you work. It goes with you.

Does that make sense? Let me show you how this works alongside what you already have."`,
  },

  // RECRUITING SCRIPTS
  {
    id: 'recruit-opener',
    title: 'Opportunity Conversation Opener',
    category: 'recruiting',
    description: 'How to introduce the AO opportunity naturally.',
    tags: ['recruiting', 'opener', 'opportunity'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `"Hey, can I ask you something? What do you do for work right now?

[Listen]

How do you like it?
[Listen for dissatisfaction signals]

I ask because I'm always looking for sharp people to join my team. I work in the insurance industry - we help working families protect themselves - and I'm building a team of people who want something different.

The reason I thought of you is [specific trait you noticed].

Would you be open to hearing more about what we do? No pressure - I just think you might be a good fit."`,
  },
  {
    id: 'recruit-pyramid',
    title: 'Handling: "Is This a Pyramid Scheme?"',
    category: 'recruiting',
    description: 'Address the pyramid scheme objection directly and honestly.',
    tags: ['recruiting', 'objection', 'pyramid'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `"Ha! I appreciate you asking that directly - it means you're smart and do your research.

No, this isn't a pyramid scheme. Here's the difference:

In a pyramid scheme, money just moves from new recruits to people at the top. There's no real product.

What we do is sell life insurance - actual products that protect real families. We get paid commissions when we help people, just like any insurance agent.

Now, can you build a team? Yes. And when your team sells policies, you earn overrides. But the income comes from SALES, not from recruiting people and taking their money.

I make money because I help families. My team members make money because they help families. That's it.

Does that make sense? What other questions do you have?"`,
  },
  {
    id: 'recruit-experience',
    title: 'Handling: "No Sales Experience"',
    category: 'recruiting',
    description: 'Overcome the no experience objection.',
    tags: ['recruiting', 'objection', 'experience'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `"You know what's funny? Most of our top producers didn't have sales experience when they started.

Here's why that can actually be an advantage: you don't have bad habits to unlearn. We'll teach you exactly how to do this the right way.

We have a complete training program - daily coaching calls, mentorship, scripts, everything you need. You won't be thrown in alone.

What matters more than experience is: Are you coachable? Are you willing to work hard? Do you genuinely want to help people?

If yes, we can teach you everything else. What do you think - are you coachable?"`,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getScriptById = (id: string): Script | undefined =>
  SCRIPTS.find((s) => s.id === id);

export const getScriptsByCategory = (category: ScriptCategory): Script[] =>
  SCRIPTS.filter((s) => s.category === category);

// Alias - some components use this name
export const getScripts = (): Script[] => SCRIPTS;

export const searchScripts = (query: string): Script[] => {
  const lowerQuery = query.toLowerCase();
  return SCRIPTS.filter(
    (s) =>
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      s.content.toLowerCase().includes(lowerQuery)
  );
};

export const SCRIPT_CATEGORIES: { id: ScriptCategory; name: string; icon: string }[] = [
  { id: 'cold_call', name: 'Cold Call', icon: '📞' },
  { id: 'home_visit', name: 'Home Visit', icon: '🏠' },
  { id: 'follow_up', name: 'Follow-Up', icon: '📋' },
  { id: 'closing', name: 'Closing', icon: '🎯' },
  { id: 'objection', name: 'Objection Handling', icon: '🛡️' },
  { id: 'recruiting', name: 'Recruiting', icon: '👥' },
];
