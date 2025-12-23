import type { Script, ScriptCategory } from '../types';

// ============================================
// APEX SALES ACADEMY - AIL SCRIPTS LIBRARY
// Professional, field-tested scripts using proven frameworks
// ============================================

export const SCRIPTS: Script[] = [
  // ═══════════════════════════════════════════
  // COLD CALL SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'cold-call-union',
    title: 'Union Member Cold Call',
    category: 'cold_call',
    description:
      'Field-tested opening for union members. Uses the "Already Entitled" approach to create immediate interest.',
    tags: ['cold call', 'union', 'opening', 'appointment setting', 'AD&D'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OPENING - 30 seconds]
(TONE: Warm, confident, unhurried)

"Hi, is this [First Name]?"

[Wait for confirmation]

"[First Name], this is [Your Name] with American Income Life. I'm calling because [Union Name] asked us to reach out to members about a benefit you're already entitled to."

[PAUSE - let that sink in]

"You're currently eligible for a no-cost Accidental Death & Dismemberment benefit - completely free. My job is just to make sure you know about it and get it set up."

[PERMISSION]
"Do you have about 15-20 minutes this week where I can swing by, go over this with you, and answer any questions? It's no obligation - just making sure you get what you're already entitled to."

═══ IF THEY ASK "WHAT'S THE CATCH?" ═══
(TONE: Understanding, transparent)

"That's a fair question - I'd ask the same thing. Here's the deal: the no-cost benefit is exactly that - free. When I come out, I'll also show you some optional supplemental coverage that works alongside whatever you already have. No pressure to buy anything - I just want to make sure you're informed about what's available."

═══ IF THEY SAY "I'M BUSY" ═══

"I completely understand - I know you're working hard. This really does only take about 15-20 minutes. Would [Day] after work be better, or do you prefer weekends? I want to work around YOUR schedule."

═══ IF THEY SAY "JUST SEND ME INFORMATION" ═══
(TONE: Agreeable but redirecting)

"I can definitely do that. Quick question though - when people just get a packet, they usually have questions they can't get answered. Since I'm already calling, what if we scheduled 15 minutes? That way you get the information AND the clarity. What works better - this week or next?"

[AGENT NOTE: Always confirm email/phone for follow-up even if they decline the appointment]`,
  },
  {
    id: 'cold-call-association',
    title: 'Association/Credit Union Opening',
    category: 'cold_call',
    description:
      'Script for credit union members and professional association leads. Emphasizes exclusive member benefits.',
    tags: ['cold call', 'association', 'credit union', 'opening'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OPENING]
(TONE: Professional, member-focused)

"Hi, may I speak with [First Name]?"

[Wait for confirmation]

"[First Name], my name is [Your Name] and I'm calling on behalf of American Income Life. We partner with [Association/Credit Union Name] to provide supplemental benefits exclusively for members like you."

[PAUSE]

"The reason for my call - [Association Name] wanted to make sure all their members knew about the no-cost AD&D benefit you're entitled to. Have you received any information about that?"

[Whether YES or NO, continue:]

"Perfect. What I'd like to do is set up a quick 15-20 minute appointment to go over this benefit and make sure you're getting everything you're entitled to as a member. Would [Day] at [Time] work, or is [Alternative] better?"

═══ IF THEY ASK "WHAT IS THIS EXACTLY?" ═══

"Great question. As a [Association] member, you automatically qualify for a no-cost Accidental Death benefit - that's a free $1,000 policy that covers you for accidents. When we meet, I'll get that set up for you and also show you the optional supplemental coverage available exclusively through your membership. Completely no obligation."

═══ IF SPOUSE ANSWERS ═══

"Is [Member Name] available? ... No problem. This is regarding their [Association] membership benefits. When would be a good time to reach them? ... Actually, since these are family benefits, would it be possible to schedule a time when you're BOTH available? That way you can both hear the information."

[AGENT NOTE: Getting both decision-makers present significantly increases close rate]`,
  },
  {
    id: 'cold-call-referral',
    title: 'Referral Call Opening',
    category: 'cold_call',
    description:
      'Warm lead approach when calling someone referred by a current client. Leverages social proof.',
    tags: ['cold call', 'referral', 'warm lead', 'social proof'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OPENING - Warm, conversational]

"Hi, is this [First Name]?"

[Wait for confirmation]

"[First Name], this is [Your Name]. I was just with [Referrer Name] - they mentioned you two are close - and they thought I should give you a call."

[PAUSE - let them process]

"We just finished setting up some protection for [his/her] family, and [he/she] was really happy with it. [He/She] thought you might want to see what we put together."

═══ KEY PHRASE ═══
(TONE: Casual, not salesy)

"I'm not calling to sell you anything today. [Referrer Name] just said you're the kind of person who likes to know what's out there. Would you be open to a quick 20-minute conversation to see what might make sense for your family?"

═══ IF THEY ASK "WHAT DID THEY GET?" ═══

"[Referrer Name] got set up with some supplemental life insurance - coverage that works alongside what [he/she] has at work. The big thing for [him/her] was knowing that if something happened, the mortgage would be covered and the kids could stay in their school. [He/She] said you've got a similar situation - is that right?"

[Let them talk - listen for their situation]

═══ IF THEY'RE HESITANT ═══

"I totally understand. Look, [Referrer Name] trusts you, and I don't want to put that relationship in a weird spot. How about this - let's do a quick call, and if it's not for you, no hard feelings. [Referrer Name] will still be happy, I'll still be happy, and you'll know what's out there. Fair enough?"

[AGENT NOTE: Reference the referrer by name 3-4 times - it builds trust]`,
  },
  {
    id: 'cold-call-callback',
    title: 'Lead Callback Script',
    category: 'cold_call',
    description:
      'For calling leads who previously requested information or were unavailable. Re-establishes connection.',
    tags: ['cold call', 'callback', 'follow-up', 're-engagement'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OPENING]
(TONE: Familiar, friendly)

"Hi [First Name], this is [Your Name] with American Income Life. We spoke [last week/a few days ago] about your [Union/Association] benefits."

[PAUSE - give them a moment to remember]

"I wanted to follow up and see if you had a chance to look at the information we discussed. Do you have a few minutes right now?"

═══ IF THEY DON'T REMEMBER ═══

"No worries - I know life gets busy! Quick reminder: as a [Union/Association] member, you're entitled to a no-cost AD&D benefit. I was calling to set up a time to go over that with you and make sure you're getting everything you're eligible for."

═══ IF THEY SAY "I'VE BEEN MEANING TO CALL YOU" ═══
(TONE: Understanding, helpful)

"No problem at all - I figured you've got a lot going on. Good news is I've got some time [today/tomorrow]. Would [Time] work to meet, or would [Alternative Time] be better for your schedule?"

═══ IF THEY SAY "I'M NOT INTERESTED" ═══

"I understand. Just so I'm clear though - you're not interested in the free benefit, or you're not interested in exploring additional coverage? Because the AD&D benefit is no-cost to you either way."

[If still no]: "That's completely okay. Quick favor though - is there anyone in your [union/association] who you think would want to know about these benefits? Sometimes people just aren't aware of what they're entitled to."

[AGENT NOTE: Always ask for referrals, even on "no" calls - it recoups the time investment]`,
  },

  // ═══════════════════════════════════════════
  // HOME VISIT SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'home-intro',
    title: 'Home Visit Introduction',
    category: 'home_visit',
    description:
      'Professional doorstep and living room opening. Sets expectations and builds rapport immediately.',
    tags: ['home visit', 'introduction', 'rapport building', 'door approach'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[AT THE DOOR]
(TONE: Warm, confident, smiling)

"Hi [First Name]! Great to finally meet you in person - I'm [Your Name] from American Income Life."

[Firm handshake, wait to be invited in]

═══ ONCE INSIDE ═══

[Find a spot at the kitchen table or living room - ask where they'd like to sit]

"Thank you so much for having me. Before we get started, I want you to know there's absolutely no pressure today. My job is to show you what benefits you're entitled to as a [Union/Association] member and answer any questions."

[PAUSE]

"At the end, if you feel like what I'm showing makes sense for your family, great - we can talk about next steps. If not, we shake hands and you go about your day. Sound fair?"

[Wait for agreement]

═══ IF SPOUSE IS PRESENT ═══

"[Spouse Name], thank you for being here too. These are family benefits, so it really helps to have both of you hear this together. That way you can make the best decision for YOUR family."

═══ TRANSITION TO DISCOVERY ═══
(TONE: Curious, genuinely interested)

"Now, so I'm not wasting your time showing you things that don't apply to you - can I ask you a few quick questions about your family and what's important to you?"

[AGENT NOTE: Get comfortable, don't rush. The discovery phase is where the sale is really made]`,
  },
  {
    id: 'needs-analysis',
    title: 'Family Needs Discovery',
    category: 'home_visit',
    description:
      'Strategic questions that uncover protection gaps and create emotional connection to the solution.',
    tags: ['home visit', 'needs analysis', 'discovery', 'questions'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[DISCOVERY PHASE - 5-7 minutes]
(TONE: Curious, empathetic, unhurried)

═══ FAMILY SITUATION ═══

"Tell me a little about your family - who's living under this roof?"

[Listen for: spouse, children, dependents, anyone they're responsible for]

"And [kids' names] - how old are they?"

[PAUSE - let them talk about their kids]

═══ CURRENT COVERAGE ═══

"Do you currently have any life insurance in place?"

[IF YES]: "That's great you're thinking ahead. Is it through [Employer Name], or did you get it on your own?"

[IF THROUGH EMPLOYER]: "Perfect. Do you know how much coverage that provides?"

[Most will say 1-2x salary or "I'm not sure"]

═══ THE GAP QUESTION ═══
(TONE: Thoughtful, not scary)

"Let me ask you something, [First Name]. And I'm not trying to be morbid here, but this is really the whole point of what we do:"

[PAUSE]

"If something unexpected happened to you tomorrow - you didn't come home from work - walk me through what your family's situation would look like financially."

[PAUSE - let them think and answer]

[Listen for: mortgage, car payments, income replacement, childcare, education]

═══ PRIORITY QUESTION ═══

"If you could wave a magic wand and make sure ONE thing was taken care of for your family no matter what - what would that be?"

[This reveals their emotional hot button - the KEY to your presentation]

═══ COVERAGE AMOUNT ═══

"Have you ever thought about how much coverage would really be enough to protect all of that?"

[IF UNSURE]: "That's totally normal - most people don't know off the top of their head. Let me show you what the experts recommend, and we can figure out what makes sense for YOUR situation."

[AGENT NOTE: Write down everything they say - you'll reference it during the presentation]`,
  },
  {
    id: 'presentation-transition',
    title: 'Needs Summary & Presentation Bridge',
    category: 'home_visit',
    description:
      'Summarize what you learned and smoothly transition into presenting solutions that address their specific needs.',
    tags: ['home visit', 'presentation', 'transition', 'summary'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[SUMMARY & BRIDGE - 2 minutes]
(TONE: Confident, consultative)

"Okay [First Name], based on what you've shared with me, here's what I'm hearing:"

[Reference your notes - be specific]

"You've got [family situation - spouse, kids ages]. Your main priority is [their stated priority - mortgage, kids' education, etc.]. Right now you have [their current coverage - probably 1-2x through employer], which is a good start but leaves a gap of about [estimate] if something happened."

[PAUSE]

"Does that sound about right?"

[Wait for confirmation - this is key]

═══ IF THEY CONFIRM ═══

"Perfect. So let me show you a few options that address exactly what we talked about. I'll go through a couple of different approaches, and you tell me which one feels right for your family."

═══ IF THEY CORRECT SOMETHING ═══

"Okay, I appreciate you clarifying that. So what you're saying is [corrected version]. Got it - let me adjust my recommendations."

═══ TRANSITION TO BENEFITS ═══
(TONE: Enthusiastic but professional)

"First things first - let's get you set up with the no-cost AD&D benefit you're already entitled to as a [Union/Association] member. This is the easy part."

[Show the AD&D benefit form]

"This covers you for $1,000 if something happens in an accident. Free, no strings attached. Let me just get a few details to get this activated for you."

[AGENT NOTE: Starting with the free benefit gets a "yes" momentum going]`,
  },
  {
    id: 'presentation-core',
    title: 'Core Benefits Presentation',
    category: 'home_visit',
    description:
      'Presenting whole life coverage with living benefits. Emphasizes value and addresses the family protection gap.',
    tags: ['home visit', 'presentation', 'whole life', 'living benefits'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[CORE PRESENTATION - 7-10 minutes]
(TONE: Educational, passionate, personal)

═══ THE GAP ═══

"Now [First Name], remember when I asked what would happen if you didn't come home tomorrow? You mentioned [their specific concern - mortgage, kids, etc.]."

[PAUSE]

"Here's the reality: your employer coverage gives you about [1-2x salary]. Experts recommend 10-12 times your income to truly replace what you bring to your family. That's a pretty significant gap."

═══ THE SOLUTION ═══

"What I'm going to show you fills that gap - and it's YOURS. Not tied to your job. Doesn't matter if you change employers, get promoted, retire - this policy goes with you."

═══ LIVING BENEFITS (Your Competitive Edge) ═══
(TONE: Slow down, this is important)

"But here's what really sets this apart from anything you'd get at work:"

[PAUSE - look them in the eye]

"This isn't just about what happens if you pass away. What if you get seriously sick - heart attack, stroke, cancer - but you survive? Your work policy doesn't help you there."

"With this coverage, if you're diagnosed with a critical illness, you can access a portion of your death benefit while you're still alive. To pay bills while you're recovering. To take time off work. To focus on getting better."

[PAUSE]

"Most policies only pay after you're gone. This one helps while you're still fighting."

═══ PREMIUM FRAMING ═══

"Now, let's talk about the investment. For [coverage amount] of protection, we're looking at about $[X] per month."

[PAUSE - let them react]

"Before you answer - let me break that down. That's about $[daily amount] a day. Less than your morning coffee. For that, your family is protected no matter what."

═══ TRIAL CLOSE ═══
(TONE: Casual, checking in)

"Does this make sense so far? Can you see how this would help your family?"

[Listen for buying signals - if they agree, you're ready to close]

[AGENT NOTE: If they object here, address it using ACRA before moving forward]`,
  },

  // ═══════════════════════════════════════════
  // CLOSING SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'assumptive-close',
    title: 'Assumptive Close',
    category: 'closing',
    description:
      'Move naturally from agreement to application. Assumes the sale and makes the next step easy.',
    tags: ['closing', 'assumptive', 'application', 'getting commitment'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[ASSUMPTIVE CLOSE]
(TONE: Confident, matter-of-fact, helpful)

═══ AFTER THEY'VE AGREED THE COVERAGE MAKES SENSE ═══

"Perfect. So based on everything we've discussed, the [Plan Name] at [coverage amount] is exactly what you need. It covers [their specific concern], builds cash value over time, and the living benefits give you access if something happens while you're still here."

[PAUSE]

"The investment is just $[amount] per month - about what you'd spend on [daily comparison]."

═══ THE ASSUMPTIVE STATEMENT ═══

"Let me get a few details to get this set up for you. For the billing, do you prefer the 1st of the month or the 15th?"

[Wait for answer - don't speak]

═══ IF THEY ANSWER ═══

"Great, the [1st/15th] it is. And for the payment, would you prefer bank draft or would you like it to come right out of your paycheck before you even see it?"

[Continue with application]

═══ IF THEY HESITATE ═══
(TONE: Understanding, not pushy)

"Is there anything else you'd like to know before we get you protected?"

[Address the concern, then return to the close]

[AGENT NOTE: Silence is powerful. After asking for the sale, DON'T SPEAK. Let them process and respond.]`,
  },
  {
    id: 'either-or-close',
    title: 'Alternative Choice Close',
    category: 'closing',
    description:
      'Present two options that both result in a sale. Makes the decision easier by offering choice.',
    tags: ['closing', 'either-or', 'options', 'choice'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[ALTERNATIVE CHOICE CLOSE]
(TONE: Helpful, consultative)

═══ PRESENTING OPTIONS ═══

"Alright [First Name], I've got two options here that both solve the problem we talked about - protecting [their specific concern]."

[PAUSE]

"Option A gives you $[coverage amount] of protection. That covers [specific need - mortgage, income replacement] for $[monthly amount]."

"Option B bumps that up to $[higher coverage]. That handles [additional protection - kids' education, full income replacement] for $[higher amount]."

[PAUSE]

═══ THE CLOSE ═══

"Both of them fill the gap you have right now. Which one feels like the right fit for your family - A or B?"

[WAIT - silence is key here]

═══ IF THEY CHOOSE ═══

"Great choice. Let's get that set up for you right now."

═══ IF THEY'RE UNDECIDED ═══

"Let me ask you this: if money wasn't a factor at all, which one would you choose?"

[They usually say B]

"That's what I figured. Here's the thing - you can always start with Option A today and upgrade later. But the rates you lock in TODAY are based on your age and health right now. The longer you wait, the more it costs. What do you say we start with [A or B] and get your family protected?"

═══ IF THEY SAY NEITHER ═══

"I hear you. Help me understand - is it the coverage amount, the monthly investment, or something else entirely?"

[Address the real objection, then re-present options]

[AGENT NOTE: If they say "neither," there's an unaddressed objection. Find it before trying to close again.]`,
  },
  {
    id: 'summary-close',
    title: 'Summary Close',
    category: 'closing',
    description:
      'Recap all the agreed-upon benefits before asking for the sale. Builds momentum through confirmation.',
    tags: ['closing', 'summary', 'recap', 'confirmation'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[SUMMARY CLOSE]
(TONE: Recap mode, checking boxes)

═══ THE SUMMARY ═══

"Okay [First Name], let me make sure I've got everything right."

[Look at your notes]

"You told me your biggest priority was [their stated priority]. You want to make sure [mortgage is paid/kids can stay in school/spouse isn't stressed about money]."

[Wait for confirmation]

"Right now, you've got about [their current coverage] through work, which leaves a gap of roughly [estimated gap]."

[Wait for confirmation]

"And you mentioned you'd be comfortable investing around $[their stated budget] per month to close that gap."

[Wait for confirmation]

═══ THE CLOSE ═══

"Perfect. What I've put together does exactly that. [Coverage amount] of protection, living benefits you can access while you're still alive, and it's yours no matter where you work - all for $[amount] per month."

[PAUSE]

"Sound good?"

[Wait for "yes"]

"Great. The last step is a quick health questionnaire - takes about 5 minutes. Let's knock that out so your family is protected starting today."

[Begin application]

[AGENT NOTE: Get verbal agreement at each step of the summary. By the time you ask for the sale, they've already said "yes" multiple times.]`,
  },
  {
    id: 'urgency-close',
    title: 'Creating Urgency',
    category: 'closing',
    description:
      'Help prospects understand why waiting costs them money and puts their family at risk.',
    tags: ['closing', 'urgency', 'timing', 'rates'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[URGENCY CLOSE]
(TONE: Sincere, educational, not pushy)

═══ THE REALITY CHECK ═══

"[First Name], can I share something important with you?"

[PAUSE - wait for acknowledgment]

"The rates I've shown you today are based on two things: your age and your health RIGHT NOW."

"Every birthday that passes, those rates go up. And if anything changes with your health - even something minor - you could be looking at higher rates or even being declined altogether."

═══ THE STORY (if you have one) ═══

"I've had clients tell me 'I'll do it next month' and then something happens. A health scare. A new diagnosis. And suddenly they can't get coverage at all - or it costs twice as much."

[PAUSE]

═══ THE SOLUTION ═══

"Here's my recommendation: Let's lock in this rate today. You get a 30-day money-back guarantee - if for any reason you change your mind, you get a full refund, no questions asked."

"But while you're thinking about it, your family is protected. And you've locked in the best rate you'll ever qualify for."

═══ THE ASK ═══
(TONE: Direct but warm)

"What do you say - should we get your family protected today?"

[Wait for answer]

═══ IF THEY STILL WANT TO WAIT ═══

"I understand. Can I ask - what specifically would you want to think about? I want to make sure I've given you all the information you need."

[Address their specific concern]

[AGENT NOTE: Never use fear tactics. The urgency should be educational, not manipulative.]`,
  },

  // ═══════════════════════════════════════════
  // FOLLOW-UP SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'follow-up-think',
    title: 'Follow Up: "Needed to Think"',
    category: 'follow_up',
    description:
      'Re-engage someone who said they needed time to think. Uncover the real objection and move forward.',
    tags: ['follow-up', 'think about it', 'callback', 're-engagement'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[FOLLOW-UP: THINK ABOUT IT]
(TONE: Friendly, respectful, direct)

"Hi [First Name], this is [Your Name] from American Income Life. We met [last week/a few days ago] and you were going to think things over. How's everything going?"

[Let them talk]

═══ IF THEY'RE STILL THINKING ═══

"Totally understand - it's an important decision. Can I ask what specifically you've been thinking about? Is it the coverage amount, the monthly investment, or something else?"

[LISTEN - don't interrupt]

═══ ADDRESSING THEIR CONCERN ═══

[Once they share the real concern, address it directly]

"I appreciate you being honest with me. Here's what I'd suggest..."

[Address the concern with relevant information]

═══ MOVING TO DECISION ═══

"[First Name], I don't want you to feel rushed. But I also don't want you to miss out on locking in this rate. The offer I showed you is based on your health today - and things change."

"What would help you feel confident about moving forward?"

[Listen and address]

═══ IF THEY'VE DECIDED NO ═══
(TONE: Understanding, no pressure)

"I appreciate you being upfront with me. Before I let you go - is there anyone in your [union/association] you think would benefit from knowing about these benefits? Sometimes it's just not the right fit for one person but perfect for another."

[Always ask for referrals]

[AGENT NOTE: "I need to think about it" usually means there's an unaddressed objection. Your job is to find it.]`,
  },
  {
    id: 'follow-up-spouse',
    title: 'Follow Up: Spouse Discussion',
    category: 'follow_up',
    description:
      'Check in after they talked to their spouse. Prepared to address spouse concerns.',
    tags: ['follow-up', 'spouse', 'callback', 'decision maker'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[FOLLOW-UP: SPOUSE DISCUSSION]
(TONE: Warm, respectful of the relationship)

"Hi [First Name], it's [Your Name] from American Income Life. You mentioned you wanted to discuss the coverage options with [Spouse Name]. Did you two have a chance to talk about it?"

═══ IF YES, POSITIVE ═══

"Great! What did [he/she] think?"

[Listen for their response]

[If they agree]: "Wonderful! Should we get that set up now, or would [Spouse Name] like to be on the call?"

═══ IF YES, HAD QUESTIONS ═══

"What questions came up? I'm happy to answer them right now."

[Address questions]

"Would it be helpful if I hopped on a call with both of you? That way [Spouse Name] can ask questions directly and you can make the decision together."

═══ IF THEY HAVEN'T TALKED YET ═══

"No problem, I know life gets busy! When do you think you'll have a chance to sit down together? I'll give you a call after that."

[Schedule specific follow-up]

═══ IF SPOUSE SAID NO ═══
(TONE: Understanding, curious)

"I appreciate you letting me know. Can I ask what specifically concerned [him/her]? Maybe I can provide some information that would help address that."

[Listen, then offer to speak with spouse directly]

"Sometimes it helps to hear it straight from the source. Would [Spouse Name] be open to a quick call? I can answer questions and if it's still not right, no problem."

[AGENT NOTE: Never make them feel bad for consulting their spouse. It's actually a good sign they're taking this seriously.]`,
  },
  {
    id: 'follow-up-no-show',
    title: 'Follow Up: Missed Appointment',
    category: 'follow_up',
    description:
      'Script for calling leads who missed their scheduled appointment. Non-judgmental and solution-focused.',
    tags: ['follow-up', 'no-show', 'reschedule', 'callback'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[FOLLOW-UP: MISSED APPOINTMENT]
(TONE: Friendly, understanding, no guilt-tripping)

"Hi [First Name], this is [Your Name] from American Income Life. We had an appointment scheduled for [day/time] - looks like we might have missed each other. Is everything okay?"

═══ IF THEY APOLOGIZE ═══

"No worries at all - life happens! The important thing is getting this set up for your family when it works for YOU. What does your schedule look like this week?"

═══ IF THEY GIVE AN EXCUSE ═══

"I totally understand. [Acknowledge their situation]. Let's find a time that actually works. Would [Day] be better, or would [Alternative Day] work?"

═══ IF THEY'RE AVOIDING ═══
(TONE: Direct but kind)

"[First Name], I get the sense the timing might not be right. Can I ask you honestly - are you still interested in learning about your benefits, or would you prefer I reach back out in a few months?"

[This directness often gets them to open up]

═══ IF THEY SAY REACH OUT LATER ═══

"Absolutely - I'll put you down for [X months from now]. Quick note though: the rates I can offer are based on your current age and health. If anything changes, those rates could be different. Just something to keep in mind."

"Before I go - is there anyone else in your [union/association] who you think would want to know about these benefits?"

[AGENT NOTE: No-shows happen. Don't take it personally. Your attitude on this call determines if you get the reschedule.]`,
  },

  // ═══════════════════════════════════════════
  // OBJECTION HANDLING SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'objection-afford',
    title: 'Handling: "I Can\'t Afford It"',
    category: 'objection',
    description:
      'Script using ACRA framework for budget and affordability objections. Reframes cost to value.',
    tags: ['objection', 'price', 'affordability', 'ACRA'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OBJECTION: "I CAN'T AFFORD IT"]
Using ACRA Framework: Acknowledge → Clarify → Respond → Advance

═══ ACKNOWLEDGE ═══
(TONE: Understanding, not defensive)

"I completely understand - budget is real, and nobody wants to stretch themselves too thin."

═══ CLARIFY ═══

"Can I ask you a question though? When you say you can't afford it, do you mean it's not in the budget at ALL, or is it more that this specific amount feels like too much?"

[Listen - this tells you which direction to go]

═══ RESPOND ═══

[If not in budget at all]:
"Here's something to think about: if something happened to you tomorrow, what would your family's budget look like? The mortgage, car payments, groceries, activities for the kids..."

[PAUSE - let it land]

"What we're talking about is [daily cost] a day - less than a cup of coffee - to make sure that never has to happen."

[If amount is too much]:
"I hear you. Here's the good news - we have flexibility. Let me show you what we can do that fits within your comfort zone. What monthly amount WOULD work for your budget?"

[Adjust coverage to their stated budget]

═══ ADVANCE ═══

"So if I can show you a way to get your family protected for [their stated amount], would you be comfortable moving forward today?"

[Wait for commitment before presenting adjusted option]

[AGENT NOTE: Never argue with their budget - work with it]`,
  },
  {
    id: 'objection-employer',
    title: 'Handling: "Have Employer Coverage"',
    category: 'objection',
    description:
      'Address the "I already have insurance through work" objection. Focuses on gaps and portability.',
    tags: ['objection', 'employer', 'work coverage', 'portability'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OBJECTION: "I ALREADY HAVE INSURANCE THROUGH WORK"]
Using ACRA Framework

═══ ACKNOWLEDGE ═══
(TONE: Genuinely impressed)

"That's great that your employer provides that! It shows they care about their employees. Let me ask you a couple of questions."

═══ CLARIFY ═══

"Do you know how much coverage they actually give you?"

[Usually 1-2x salary, or "I'm not sure"]

"And what happens to that coverage if you change jobs, get promoted to a different role, or eventually retire?"

[Answer: It goes away]

═══ RESPOND ═══

"So right now you have [their amount], but experts recommend 10-12 times your income to truly protect a family. That means there's a gap of about [calculate gap]."

"Plus - and this is the big one - if you leave that job for any reason, your family loses that protection completely."

[PAUSE]

"What we're talking about is coverage that's YOURS. You own it. It goes wherever you go. Your employer's policy protects their liability. This policy protects your family."

═══ ADVANCE ═══

"Does it make sense to fill that gap with something you control? Let me show you how this works alongside what you already have."

[AGENT NOTE: Never dismiss their employer coverage - build on it]`,
  },
  {
    id: 'objection-think-about-it',
    title: 'Handling: "I Need to Think About It"',
    category: 'objection',
    description:
      'Uncover the real objection behind "I need to think about it" and guide them to a decision.',
    tags: ['objection', 'timing', 'think about it', 'stall'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OBJECTION: "I NEED TO THINK ABOUT IT"]
Using Isolate and Address Framework

═══ ACKNOWLEDGE ═══
(TONE: Completely understanding)

"Absolutely - this is an important decision. I would never want you to rush into something you're not comfortable with."

═══ CLARIFY (The Key Move) ═══

"Can I ask you though - what specifically do you want to think about? Is it the coverage amount, the monthly investment, or something else entirely?"

[PAUSE - wait for the real objection]

═══ ONCE THEY SHARE THE REAL CONCERN ═══

[Address that specific concern - it might be:]
- Price → Use affordability script
- Spouse → Schedule joint call
- Need → Re-explain benefits
- Trust → Share company history

═══ IF THEY CAN'T ARTICULATE IT ═══

"Sometimes when people say they want to think about it, it's because something just doesn't feel right - even if they can't put their finger on it. What's your gut telling you?"

═══ ADVANCE ═══

"Let me leave you with this: the rates I showed you are based on your age and health TODAY. Every year that passes, those rates go up. And if anything changes health-wise, this opportunity could go away entirely."

"What would it take for you to feel confident about getting your family protected today?"

[AGENT NOTE: "Think about it" is never the real objection. Your job is to find what's really holding them back.]`,
  },

  // ═══════════════════════════════════════════
  // RECRUITING SCRIPTS
  // ═══════════════════════════════════════════
  {
    id: 'recruit-opener',
    title: 'Opportunity Conversation Opener',
    category: 'recruiting',
    description:
      'Natural introduction to the AO opportunity. Leads with curiosity and lifestyle benefits.',
    tags: ['recruiting', 'opener', 'opportunity', 'career change'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[RECRUITING OPENER]
(TONE: Curious, casual, peer-to-peer)

═══ NATURAL OPENER ═══

"Hey, can I ask you something? What do you do for work right now?"

[Listen - really listen]

"How do you like it?"

[Listen for dissatisfaction signals:
- "It's okay"
- "It pays the bills"
- "I'm looking for something different"
- Body language - sighs, rolled eyes]

═══ IF THEY SHOW INTEREST ═══

"I ask because I'm always looking for sharp people to join my team. I work in the insurance industry - we help working families protect themselves - and I'm building a team of people who want something different."

[PAUSE]

"The reason I thought of you is [specific observation - their energy, how they handled a customer, their work ethic]."

═══ THE ASK ═══

"Would you be open to grabbing a coffee and hearing more about what we do? No pressure - I just think you might be a good fit."

═══ IF THEY ASK "WHAT DO YOU DO EXACTLY?" ═══

"I help families get protected with life insurance and supplemental benefits. But honestly, what I really do is run my own business. I set my own schedule, build my own team, and my income isn't capped by a salary - it's based on how hard I work."

"Does that sound like something you'd be interested in learning more about?"

[AGENT NOTE: Focus on THEM and their situation, not on "selling" the opportunity]`,
  },
  {
    id: 'recruit-pyramid',
    title: 'Handling: "Is This a Pyramid Scheme?"',
    category: 'recruiting',
    description:
      'Direct, honest response to the pyramid scheme objection that builds trust.',
    tags: ['recruiting', 'objection', 'pyramid', 'MLM'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OBJECTION: "IS THIS A PYRAMID SCHEME?"]
(TONE: Appreciative of their directness, confident)

═══ ACKNOWLEDGE ═══

"Ha! I appreciate you asking that directly - it means you're smart and do your research. That's exactly the kind of person I'm looking for."

═══ THE HONEST ANSWER ═══

"No, this is not a pyramid scheme. Here's the difference:"

"In a pyramid scheme, money just flows from new recruits to people at the top. There's no actual product or service being sold."

"What we do is sell life insurance - real products that protect real families. We get paid commissions when we help people, just like any insurance agent at State Farm or Allstate."

═══ THE TEAM ELEMENT ═══

"Now, can you build a team? Absolutely. And when your team members sell policies, you earn overrides on their production. But here's the key: the money comes from SALES to real customers, not from recruiting people and taking their money."

"I make money because I help families. My team members make money because they help families. Nobody's paying to join."

═══ ADVANCE ═══

"Does that make sense? What other questions do you have about how it works?"

[AGENT NOTE: Don't get defensive. Their skepticism is healthy - address it honestly and directly]`,
  },
  {
    id: 'recruit-experience',
    title: 'Handling: "No Sales Experience"',
    category: 'recruiting',
    description:
      'Turn lack of sales experience into an advantage. Emphasize training and coachability.',
    tags: ['recruiting', 'objection', 'experience', 'training'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[OBJECTION: "I DON'T HAVE SALES EXPERIENCE"]
(TONE: Encouraging, confident)

═══ REFRAME ═══

"You know what's funny? Most of our top producers didn't have sales experience when they started either."

"In fact, that can actually be an ADVANTAGE."

═══ EXPLAIN ═══

"Here's why: when someone comes in with 10 years of sales experience, they often have habits we need to undo. They want to do things 'their way' instead of following the system that works."

"You? You're a blank slate. You're coachable. We can teach you the right way from day one."

═══ THE TRAINING ═══

"We have a complete training program - daily coaching calls, scripts, ride-alongs with experienced agents, mentorship. You won't be thrown in alone and expected to figure it out."

"The question isn't whether you have experience. The questions are: Are you coachable? Are you willing to work hard? Do you genuinely want to help people?"

═══ ADVANCE ═══

"If the answer to those three questions is yes, we can teach you everything else. So let me ask you - are you coachable?"

[Wait for answer]

"Are you willing to put in the work?"

"Do you want to help families?"

"Then you've got what it takes. Let's talk about next steps."

[AGENT NOTE: Coachability is more important than experience. Make that clear]`,
  },
  {
    id: 'recruit-income',
    title: 'Presenting the Income Opportunity',
    category: 'recruiting',
    description:
      'Honest, transparent explanation of how compensation works at AIL without making unrealistic promises.',
    tags: ['recruiting', 'income', 'compensation', 'earnings'],
    isCustom: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    practiceCount: 0,
    content: `[PRESENTING INCOME OPPORTUNITY]
(TONE: Honest, transparent, grounded)

═══ SETTING EXPECTATIONS ═══

"Let me be straight with you about the income. I'm not going to promise you'll be making six figures in your first month - anyone who tells you that is lying."

"What I CAN tell you is how it works and what's possible if you put in the work."

═══ THE STRUCTURE ═══

"When you start, you're at 50% commission. That means if you write a $100/month policy, you earn $600 upfront [advance on first year commission]."

"Most new agents, if they're working full-time and following the system, are writing 4-6 sales per week within their first month."

"You do the math: that's $2,400-$3,600 per week in commissions."

═══ GROWTH PATH ═══

"As you gain experience and build your skills, your commission level goes up. 60%, 62.5%, and so on. Same sales, more money in your pocket."

"And when you start building a team - helping others succeed - you earn overrides on their production too. That's where the real wealth gets built."

═══ THE HONEST CAVEAT ═══

"Here's what I won't do: guarantee you'll succeed. This is 100% commission. If you don't sell, you don't earn. Some people try it and it's not for them."

"But if you're willing to learn, willing to work, and willing to stick with it through the learning curve - the ceiling is as high as you want to take it."

═══ ADVANCE ═══

"Does that kind of opportunity interest you?"

[AGENT NOTE: Being honest about the challenges builds more trust than overselling the dream]`,
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
