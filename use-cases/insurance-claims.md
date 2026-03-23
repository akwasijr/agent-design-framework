# Use Case: Insurance Claims

## The Problem We're Solving

An insurance claim is one of the worst customer experiences that exists. You've just had an accident, a fire, a theft. You're stressed, possibly injured, financially worried. And now you have to navigate a bureaucratic process: fill out forms, gather documents, make phone calls, wait days or weeks, get denied without clear reasons, and argue your case.

On the other side, the claims adjuster is buried. Every claim, whether it's a $200 windshield or a $200K property loss, gets roughly the same manual attention. They're drowning in routine cases, which means the genuinely complex ones don't get the thoughtful judgment they deserve.

**The core failure**: The process treats every claim the same, wastes human attention on routine decisions, and makes the claimant feel like a case number.

## Rethinking From the Problem, Not the Process

The question isn't "how do we automate the claims process?" That just makes today's bad experience faster.

The real questions:

1. **For the claimant**: How do we make the worst day of your life feel like someone actually has your back?
2. **For the adjuster**: How do we free you to use your judgment where it actually matters?
3. **For the organization**: How do we process 10x the volume while making fewer mistakes and having happier customers?

## The Experience: Claimant Side

### Filing a Claim

Today: Fill out a 20-field form. Upload documents. Wait. Get an email saying "we received your claim." Silence for days.

Reimagined: You tell your agent what happened. Voice, text, photos, whatever is easiest in your situation. The agent asks only the questions that matter for your specific case, pulling everything else from your policy, previous interactions, and public data. Within minutes, you know:
- Your claim has been received and categorized
- What your policy covers for this type of incident
- What additional information is needed (if any)
- An estimated timeline
- A single point of contact (your claims agent) that you can talk to anytime

### During Processing

Today: A black box. You call for updates and get "it's being reviewed." You feel ignored.

Reimagined: Your agent keeps you informed proactively. Not robotic status emails, but contextual updates:
- "Your repair estimate has been verified. It's within your policy limits."
- "We're waiting on the police report. I can help you request it if you haven't already."
- "Your claim is ready for payout. Here's the breakdown."

If something is taking longer than expected, the agent explains why and what's happening, not corporate deflection.

### When There's a Problem

Today: You get a denial letter with legal jargon. You don't understand it. You're angry.

Reimagined: If the claim can't be fully covered, the agent explains in plain language:
- Exactly what's covered and what isn't
- The specific policy section and why it applies
- What options you have (appeal, partial claim, additional documentation)
- If the agent thinks you might have a case for an exception, it tells you

The agent's job is to be on your side within the rules, not to minimize payouts.

## The Experience: Adjuster Side

### The Morning

You don't open a queue of 50 claims. Instead, you see:

**Resolved overnight**: 72 claims processed end-to-end. Your agents handled intake, verification, assessment, and payout. Each followed your trained patterns. Summary: $340K in payouts, average resolution time 3.4 hours, zero complaints.

**Needs your judgment**: 5 claims that couldn't be resolved by agents alone. Not because they're hard to process, but because they require things only a human can provide:

1. **A disputed valuation**: The claimant says the repair estimate is too low. The agent shows you both the claimant's estimate and its own assessment based on comparable repairs. The gap is $2,400. You review the specifics and decide.

2. **A compassionate edge case**: A family's claim is technically outside their coverage window by 3 days. The agent flagged it because the circumstances are unusual: they were in the hospital when the renewal notice came. The agent presents the situation, the policy language, and precedent for exceptions. You decide whether to override.

3. **A fraud signal**: Three claims from different people all reference the same repair shop, and the damage descriptions are suspiciously similar. The agent shows you the pattern, the evidence, and its confidence level. You decide whether to investigate further.

4. **Multi-policy complexity**: A commercial client has overlapping coverage from two policies, and the agent can't determine the correct split. It presents both interpretations and asks for your guidance, which it'll apply to similar cases going forward.

5. **A new claim type**: The agent encountered a scenario it hasn't been trained on (e.g., damage from a new type of weather event). It shows you what it knows and what it doesn't, and asks you to walk it through the assessment so it can learn.

### Your actual work

You spend your morning making 5 decisions that require genuine expertise, empathy, and judgment. Each decision takes 10-20 minutes of thoughtful review, not hours of paperwork.

Then you spend the rest of your day on things that matter:
- Reviewing agent performance and refining how your team handles specific claim types
- Building relationships with key clients who have complex ongoing needs
- Training your agents on new scenarios by showing them examples and explaining your reasoning
- Working with the fraud investigation team on the pattern your agent surfaced

### What changed

The adjuster's identity shifts. You're not a claim processor who occasionally uses judgment. You're a **decision-maker and trainer** who happens to have agents processing claims. The work that was always the most valuable part of your role now IS your role.

## The Experience: Agent Orchestration

Five agents collaborate on each claim, each specialized:

**Intake Agent**
- Receives the claim from the claimant
- Extracts structured data from unstructured input (photos, voice, documents)
- Categorizes claim type and severity
- Identifies what information is missing and requests it

Hands off to Verification Agent with: structured claim data, category, initial severity assessment

**Verification Agent**
- Checks policy status, coverage limits, deductibles
- Validates documentation completeness
- Cross-references against policy exclusions
- Confirms the claim is eligible for processing

Hands off to Assessment Agent with: verified claim data, applicable policy terms, coverage confirmation

**Assessment Agent**
- Calculates payout based on damage, comparable claims, and policy terms
- Identifies if the claim falls within routine parameters or is an edge case
- If routine: proceeds to payout
- If edge case: escalates to human with full analysis

Hands off to Communication Agent with: assessment result, reasoning, and either "proceed" or "escalate" flag

**Communication Agent**
- Manages all claimant-facing communication
- Adapts tone to the situation (empathetic after a loss, straightforward for routine repairs)
- Provides updates proactively
- Handles questions and concerns

Runs in parallel, throughout the entire process

**Fraud Detection Agent**
- Runs in the background across all claims
- Looks for cross-claim patterns, unusual filing behavior, known fraud indicators
- Only surfaces findings when confidence exceeds threshold
- Provides evidence and reasoning, never accusations

Runs independently, escalates to human when patterns emerge

## The Experience in Detail

### The Command Center: What the Adjuster Sees

Sarah Chen opens her Claims Command Center at 8:04 AM. No login queue, no inbox triage, no ticket dashboard. She sees a single screen organized around outcomes, not tasks.

At the top: three numbers in large, clean type.

**72** claims resolved overnight. **$340K** total payouts. **3.4hr** average resolution time.

Below that, a trend line showing the last 14 days. Resolution time is down 12% since she taught her Assessment Agent how to handle the new hail damage claims last week. Payout accuracy sits at 98.7%. Customer satisfaction: 4.6 out of 5. She doesn't need to click into any of this. It's the health check: a glance tells her the system is working.

Below the metrics: five cards. These are the only items that need her today.

Each card follows a consistent structure:

**Card 1: Disputed Valuation**
- **What**: Claimant #4892 disputes repair estimate. Gap: $2,400 between claimant's shop quote ($8,200) and agent's assessment ($5,800).
- **Why this is here**: Dispute exceeds auto-resolution threshold. Comparable repair data is ambiguous: three similar repairs ranged from $5,200 to $8,900.
- **Risk**: Low. Claimant has 11-year history, no prior disputes.
- **Alternatives**: (A) Accept claimant's estimate, $2,400 over baseline. (B) Split the difference at $7,000. (C) Request independent appraisal, adds 3-5 days.
- **Urgency**: Medium. Claimant's vehicle is undrivable.

**Card 2: Compassionate Edge Case**
- **What**: Family claim filed 3 days past coverage renewal window.
- **Why this is here**: Policy technically lapsed. However, policyholder was hospitalized during renewal period. Agent found 4 precedent cases where exceptions were granted under similar circumstances.
- **Risk**: Low financial exposure ($14,200 claim). Precedent exists for approval.
- **Alternatives**: (A) Approve with documented exception. (B) Deny with appeal guidance. (C) Approve and auto-renew policy retroactively.
- **Urgency**: High. Family is displaced and waiting on hotel reimbursement.

Cards 3 through 5 follow the same format. The fraud signal card has a red left border: the only visual distinction that says "this one is different." Everything else looks the same because the decision structure is the same.

The first two cards show a green "Quick Approve" button at the bottom: the agent's confidence is above 92% and the recommended action aligns with Sarah's historical patterns. She can approve with one click. Cards 3 and 5 show "Deep Review": the agent doesn't have a confident recommendation, and the details expand into a full evidence panel with source documents, comparable claims, and policy language when Sarah clicks in.

She doesn't see the 72 resolved claims unless she asks. She doesn't see process steps, status bars, or workflow diagrams. She sees decisions waiting for her judgment, ranked by urgency, with everything she needs to decide right there on the card.

### Interaction Modes in Practice

Sarah moves between three modes throughout her day, often without consciously thinking about which mode she's in.

**Delegate: The Overnight Run**

At 6:47 PM yesterday, Sarah closed her laptop. Her five agents kept working. The Intake Agent received 31 new claims between 7 PM and 6 AM: a fender bender in Portland, a kitchen fire in Boise, a stolen bicycle in Seattle, and 28 others. Each was categorized, documented, verified against policy, assessed, and either paid out or queued for the morning.

Sarah didn't approve any of this. She didn't even know it was happening. The agents operated within boundaries she's built over months: claim types she's reviewed and confirmed, payout ranges she's comfortable with, patterns she's trained on. Her morning summary is the accountability layer: she sees what happened, and if anything looks off, she can pull the thread.

The summary is three lines:
> 72 claims processed. 31 new overnight, 41 carried from yesterday.
> Payouts: $340K across 68 approved claims. 4 denied (2 coverage gaps, 1 duplicate, 1 withdrawn).
> Nothing unusual. Highest single payout: $28,400 (water damage, policy #7723).

Full autonomy. Morning accountability. This is delegation.

**Supervise: The Five Escalated Claims**

Sarah spends 47 minutes on the five cards. Card 1, the disputed valuation: she reads the comparable repair data, checks the claimant's history (loyal customer, no red flags), and approves a split at $7,000. One click to approve, one sentence to explain her reasoning. The agent logs the decision and will use it as a reference point for future disputes in the $2,000-$3,000 gap range.

Card 2, the compassionate case: she approves with a retroactive renewal. Two clicks. The agent immediately triggers a payout notification to the family and a hotel reimbursement.

Card 3, the fraud signal: she spends 18 minutes here. She expands the evidence panel, reviews the three linked claims, examines the repair shop's history, and flags it for the fraud investigation team. She doesn't resolve this herself: she routes it and adds context the agent couldn't.

This is supervision. The agents did the work. Sarah reviewed, approved, adjusted, or escalated. Each decision took minutes, not hours, because the agents prepared everything she needed.

**Collaborate: Teaching a New Claim Type**

At 10:30 AM, Sarah opens Card 5: the unfamiliar claim type. A homeowner's solar panel array was damaged by a debris flow, a type of event the agents haven't seen before. Sarah shifts into teaching mode.

> **Sarah**: "This is similar to how we handle storm damage to rooftop installations, but the cause is different. Pull up our assessment framework for roof-mounted equipment."

> **Assessment Agent**: "Found it. For roof-mounted equipment, we use replacement cost minus depreciation, with a separate line item for installation labor. Should I apply the same framework here?"

> **Sarah**: "Mostly. But debris flow is a ground-level event that affected a roof installation. Check whether the homeowner's policy covers earth movement separately from weather events."

> **Verification Agent**: "Policy #8891 includes earth movement coverage under Section 4B, with a separate $1,000 deductible. This is distinct from the weather event deductible."

> **Sarah**: "Good. So we process this under earth movement, not weather. The assessment framework is the same as roof-mounted equipment, but the coverage section and deductible are different. For future debris flow claims affecting mounted equipment, use this as the template: earth movement coverage, equipment replacement cost framework, separate deductible."

> **Assessment Agent**: "Understood. I'll create a new claim pattern: 'earth movement damage to mounted equipment.' Coverage: earth movement section. Assessment: roof-mounted equipment framework. I'll flag the next occurrence for your review before processing independently."

> **Sarah**: "That's right. Show me the first two you handle on your own. After that, process independently unless the payout exceeds $25K."

This is collaboration. Sarah isn't configuring a rules engine. She's having a conversation where she teaches judgment, and the agent learns a pattern it can apply going forward. The agent's final confirmation, "I'll flag the next occurrence for your review," shows it understands the trust boundary: new skill, prove it first, then gain autonomy.

### Trust in Action

**New Adjuster: Marcus, Week 2**

Marcus Rivera joined the team eight days ago. His Command Center looks different from Sarah's. Where Sarah sees 5 escalated cards, Marcus sees 34.

His agents process the same volume, but his trust profile is set to "supervised": every payout above $5,000 requires his review. Every denial requires his review. Every edge case, even mild ones, surfaces to him.

His morning summary is more detailed:

> 72 claims processed. 38 auto-approved (all under $5,000, routine categories).
> 34 require your review: 12 payouts over $5K, 8 denials, 6 edge cases, 5 new-to-you claim types, 3 flagged for learning.
> Highest pending payout: $28,400 (water damage). Agent recommendation: approve. Confidence: 94%.

Each card includes an extra section Marcus doesn't see on Sarah's screen: **Agent's reasoning**. Full explanation of why the agent made the recommendation it did.

> "Approved based on: verified policy coverage (Section 2A), damage estimate within 8% of three comparable claims, no fraud indicators, claimant history clean (6 years, 2 prior claims both routine). Similar to claim #3847 which adjuster Sarah Chen approved on March 14."

Marcus reads every explanation for the first two weeks. He's not checking the agent's work because he distrusts it: he's learning how the agents think so he can calibrate when to trust them. After each review, he confirms or overrides. Each confirmation quietly raises his trust threshold. By week 4, his review queue will be down to 18. By month 3, he'll see the same 5-8 cards Sarah sees.

**Experienced Adjuster: Sarah, Month 14**

Sarah has reviewed over 2,000 agent decisions. Her trust profile reflects this: agents process independently for all standard claim types under $50K. Her exception queue is genuinely exceptional.

She also has batch approval enabled for categories she's reviewed extensively. On Mondays, she gets a batch card:

> **Batch: Routine Auto Claims (last 7 days)**
> 142 claims. Total payouts: $487K. All within standard parameters.
> Breakdown: 89 collision, 31 comprehensive, 22 liability.
> Anomalies: None.
> [Approve Batch] [Review Individual Claims]

She scans the breakdown, confirms nothing looks unusual, and hits Approve Batch. One click for 142 claims. This isn't negligence: it's earned trust, backed by 14 months of consistent agent performance.

**Trust Repair: When the Agent Gets It Wrong**

On a Tuesday afternoon, Sarah gets an alert outside her normal review cycle. Red border card, pushed to her immediately.

> **Error Detected: Payout Recalculation Required**
> Claim #6203 (water damage, residential). Agent paid $18,400. Correct amount: $12,600.
> **What happened**: Assessment Agent applied commercial property rates instead of residential rates for water extraction. Root cause: the claimant's home office was listed as a business address in a secondary database, and the agent used that classification.
> **What we did**: Payout has been paused (funds not yet transferred). Claimant has been notified of a "brief processing delay" with no details about the error.
> **What we recommend**: Recalculate at residential rate ($12,600). Notify claimant of corrected amount with explanation. Review all water damage claims processed in the last 30 days for the same address-classification error.
> **Impact scan**: 7 other claims in the last 30 days used the same database for address classification. 2 of those were commercial properties (correct). 5 were residential. Of those 5, 3 had no rate difference. **2 may have the same error.**

Sarah reviews the two potentially affected claims. One is fine: the rates happened to match. The other is a $1,200 overpayment already disbursed. She approves a correction for both active claims and flags the disbursed one for a manual adjustment.

Then the trust system adjusts. The Assessment Agent's autonomy for water damage claims drops one tier: all water damage payouts above $10K route to Sarah for the next 30 days. The agent tells her:

> "I've added an address-classification verification step for all property claims. I'll cross-reference primary and secondary address databases and flag any mismatches for review. I'll show you the results for the next 15 flagged cases before resuming independent processing."

The trust wasn't shattered. It was specifically narrowed in the area where the error occurred, and the agent proposed a concrete path back to full autonomy. Thirty days and 15 verified cases later, water damage claims return to normal processing.

### Values, Not Settings

Sarah never opened a settings panel to configure her agents. She didn't set "escalation_threshold_usd = 50000" in a configuration file. She told her agents what she cares about, and they translated that into behavior.

During her first week, she had a conversation:

> **Sarah**: "I want to see anything over $50K before it goes out."

That became a rule. Not a number in a database: a principle the agents apply with judgment. When a $48,000 claim came through with unusual circumstances, the agent still escalated it.

> "This is under your $50K threshold, but the claim involves a first-time filing by a commercial client with a complex multi-structure policy. Flagging because the combination is unusual, not because of the amount."

Sarah approved the payout and said: "Good call. Keep flagging complex commercial claims regardless of amount." The agent learned: the $50K threshold is about routine confidence, not a hard cutoff.

Other values Sarah has expressed over time:

> "Always escalate when the claimant sounds distressed, even if the claim is straightforward."

The Communication Agent now runs a sentiment layer on claimant interactions. A routine $800 windshield claim came through where the claimant mentioned it was their third piece of bad luck this month. The agent processed the claim normally but flagged it for Sarah with a note: "Claimant expressed frustration beyond the scope of this claim. You may want to reach out personally." Sarah sent a brief empathetic message. The claimant renewed their policy the next month.

> "I don't want to second-guess my agents on routine auto claims anymore. I trust the pattern."

This became the batch approval workflow. Not a checkbox in a settings menu: a statement of trust that the system operationalized.

**Layered values** work in three tiers:

**Company policy (non-negotiable guardrails)**: Every claim over $100K gets human review. Every fraud flag gets human review. No claim is denied without a human having seen it in the last 12 months of that claim type. These aren't Sarah's rules: they're organizational constraints baked into every agent regardless of individual trust levels. Sarah can't override them even if she wanted to.

**Team preferences**: Sarah's team lead has set team-wide norms. All compassionate edge cases (lapsed coverage with extenuating circumstances) get human review, because the team believes these decisions should always have a human's empathy behind them. New adjusters see these as default behaviors they can't change until they've been on the team for 90 days.

**Individual adjuster style**: Sarah's personal values layer on top. Her $50K visibility threshold. Her preference for seeing distressed claimants. Her comfort with batch approvals. Another adjuster on the same team, David, has different values: he wants to see all claims involving rental properties (his specialty), regardless of amount, and he prefers to review denials individually rather than in batch. Same system, same agents, different working styles.

### Ambient Awareness

Between her 8:04 AM review session and her 1:00 PM check-in, Sarah doesn't think about claims processing. She's in meetings, working on a training document, having lunch. But she's not disconnected.

**The Status Pulse**

In the corner of her screen, a small indicator glows soft green. It's the equivalent of a heartbeat monitor: agents are working, nothing requires attention. She doesn't consciously look at it, but she'd notice if it turned amber or red. Green means: "everything is within normal parameters." She hasn't looked at it directly in three days. That's the point.

**The Midday Digest**

At 12:15 PM, a brief notification appears. Not a popup: a quiet line in her notification shade.

> "42 claims processed since this morning. $186K in payouts. Nothing unusual. One new claim type queued for your afternoon review (solar panel hail damage, similar to the debris flow pattern you taught last week)."

She reads it in four seconds while waiting for her next meeting. No action required. She now knows her afternoon will include one teaching moment. She can mentally prepare for it or ignore it until she sits down at 1 PM.

**The Breakthrough Alert**

At 2:47 PM, Sarah's phone buzzes with a distinct tone: the one reserved for "this needs you now." It's not the sound her email makes. It's not the sound her calendar makes. It's the one sound that means her agents have hit something that can't wait.

> **Fraud Pattern Alert: Confidence 89%**
> Four claims filed in the last 6 hours from different policyholders all reference the same auto body shop (Valley Collision, Portland). Damage descriptions share unusual similarities: all mention "rear quarter panel damage from parking lot incident." Combined exposure: $34,200.
> This requires your review before any of the 4 claims proceed.
> [Open in Command Center]

This is the only interruption Sarah has received since her morning session. The system distinguished between 42 routine claims (digest), one teaching opportunity (queued), and one genuine threat (immediate alert). Three tiers of awareness: ambient confirmation, periodic summary, urgent interruption. The ratio matters: if the alert tone rang for anything less than genuine urgency, Sarah would learn to ignore it.

### The Choreography View

At 2:52 PM, Sarah opens the fraud alert and wants to understand exactly what her agents are doing with these four suspicious claims. She taps "View Agent Activity" on the alert card.

The Choreography View shows her five agents as a horizontal flow, left to right: Intake, Verification, Assessment, Communication, and Fraud Detection. Each agent is a node. Lines connect them showing handoffs. Real-time status is visible at a glance.

For Claim #7201 (the first of the four suspicious claims):

```
[Intake: Complete] → [Verification: Complete] → [Assessment: PAUSED] → [Communication: Holding]
                                                        ↑
                                               [Fraud Detection: Active, investigating]
```

The sticking point is visible immediately. Assessment has paused because Fraud Detection raised a flag. The handoff between Verification and Assessment is highlighted in amber: data passed successfully, but Assessment is waiting for the fraud review to resolve before calculating a payout.

Sarah taps the connection between Verification and Assessment. A panel slides open showing exactly what was handed off:

> **Handoff: Verification → Assessment**
> Claim type: Auto collision, rear quarter panel.
> Policy status: Active, coverage confirmed. Deductible: $500.
> Documentation: Photos (3), police report (filed, pending), repair estimate from Valley Collision ($8,600).
> **Verification note**: All documents check out individually. No red flags on this claim in isolation.

Then she taps the Fraud Detection node:

> **Fraud Detection: Cross-claim analysis in progress**
> Pattern identified: 4 claims, same shop, similar damage descriptions, 6-hour filing window.
> Checking: Repair shop history (12 claims in last 90 days, up from average of 3). Claimant connection analysis (no direct links found yet, checking secondary connections). Photo analysis (comparing damage photos across all 4 claims: 2 of 4 show nearly identical damage angles).
> **Estimated completion**: 8 minutes for full cross-reference.
> Current confidence that this is coordinated fraud: 89%.

Sarah can intervene at any point in the flow. She sees a button at each handoff: "Override" and "Add instruction." She doesn't need to override anything yet, but she adds an instruction at the Assessment node:

> **Sarah's instruction**: "Do not process any of these four claims until fraud review is complete. If fraud confidence stays above 80%, route all four to the investigation team as a bundle. Do not contact the claimants about the delay for now: use the standard 'additional review' language."

The instruction propagates. She watches Communication Agent update its holding message for all four claimants to the standard review language. Assessment Agent confirms it will wait. Fraud Detection continues its analysis.

She minimizes the Choreography View and returns to her afternoon. Eight minutes later, a quiet notification:

> "Fraud analysis complete. Confidence: 93%. All four claims bundled and routed to investigation team with your instructions attached. Claimants notified of extended review timeline."

Five agents. One complex situation. Sarah intervened once, with one instruction, at the exact point where her judgment was needed. The choreography handled the rest.

## What This Teaches About Agent Design

1. **The human doesn't manage a process. The human manages a team.** The adjuster's relationship is with their 5 agents, not with individual claims.

2. **Emotional design matters in unexpected places.** The Communication Agent's tone during a house fire claim vs. a fender bender is a critical design decision.

3. **The escalation reason IS the interface.** What makes the 5 escalated claims different from the 72 resolved ones is what the adjuster needs to see: not claim details, but the *reason the agent couldn't decide*.

4. **Teaching is continuous.** The adjuster doesn't configure agents once. They teach them through every decision: "Here's how I'd handle this. Now you know for next time."

5. **Trust is the throughput multiplier.** As trust in agents grows (98.7% accuracy), the adjuster's capacity grows. The same person who once handled 15 claims a day now oversees 84, with better outcomes.
