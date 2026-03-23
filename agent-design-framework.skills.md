# Agent Design Framework — Skills File
# From UX to AX: Designing Agent-Managed Experiences
#
# Use this file to guide Copilot when building or designing products
# where AI agents act autonomously on behalf of users.
#
# Point Copilot to specific sections:
#   "Follow the trust-building section"
#   "Apply the sludge audit to this feature"
#   "Use the coordination zones model here"
#   "Design this approval flow using the proposal card pattern"

---

## Section: Core Design Principles

Three principles govern all agent experience design. Apply them to every feature, screen, and interaction.

### Outcomes Over Processes

Show what was achieved, not the steps taken.

Information hierarchy (priority order):
1. Outcome — what was achieved (always visible)
2. Impact — what this means for the user (always visible)
3. Decisions remaining — what needs human input (always visible)
4. Summary of approach — how the agent did it (on demand)
5. Detailed process log — every step (audit only)

Anti-pattern: "Agent processed record 4,532 of 12,000. Step 3 of 7: Validating compliance."
Better: "Portfolio rebalancing complete. Estimated annual savings: $45K. 3 positions need your review."

Rule: process details create cognitive overhead. Only show them when trust is forming, outcomes are wrong, or audits are required.

### Exceptions Over Routine

Human attention is the scarcest resource. Only surface what genuinely requires human involvement.

Six exception categories that require human attention:

| Type               | Definition                                    | Response Pattern                    |
|--------------------|-----------------------------------------------|-------------------------------------|
| Judgment needed    | Ambiguous data, unclear best path             | Present analysis + options          |
| Authority exceeded | Action exceeds approved scope                 | Request approval                    |
| Ethical dimension  | Values and moral considerations at stake      | Present context + values in tension |
| Novel situation    | Unprecedented, never encountered              | Flag + request guidance             |
| Confidence gap     | Multiple equally probable outcomes            | Present uncertainty honestly        |
| Conflict           | Competing objectives (speed vs quality, etc.) | Present the trade-off               |

Handle the "quiet confidence problem" — silence must feel reassuring:
- Periodic summaries: "47 items processed normally today"
- Anomaly absence confirmation: "No unusual patterns detected"
- Performance trends: "Accuracy remains at 99.2%"

Anti-pattern: "The Everything Dashboard" — showing every action defeats agent-managed work. The courage is in what you choose NOT to show.

### Values Over Settings

Humans express what they care about in natural language, not technical thresholds.

| Wrong (Technical)              | Right (Values-Based)                                        |
|--------------------------------|-------------------------------------------------------------|
| `response_time_sla: 3600`     | "Respond to client emails within a business day"            |
| `risk_score_threshold: 0.65`  | "Be conservative. When you're unsure, ask me"               |
| `max_autonomy_level: 3`       | "Handle routine tasks, but check with me on anything unusual"|
| `sentiment_target: positive`   | "Keep our communication warm and genuine"                   |

Three value layers:
1. Non-negotiable — org-set, cannot be overridden ("Never share customer financial data externally")
2. Recommended — leadership-set, adjustable with justification
3. Personal — user-set ("I like concise summaries")

When values conflict, surface the tension: "You've prioritized both speed and accuracy. In this situation, those are in tension. What matters more here?"

---

## Section: Trust Building

Trust is not a toggle. It is a journey with four stages.

### The Four Trust Stages

```
Supervised → Guided → Collaborative → Trusted
```

- Supervised: agent asks permission before acting. Every decision presented with full reasoning. Highest overhead.
- Guided: routine decisions handled independently. Major decisions still need approval. Agent building credibility.
- Collaborative: established working rhythm. Agent knows when to act and when to ask. Human focuses on exceptions.
- Trusted: agent operates independently. Human receives outcome summaries only. Intervention by exception.

Transitions must be:
- Gradual — smooth expansion, not sudden switches
- Evidence-based — triggered by track record, not time elapsed
- Reversible — trust decreases if errors occur
- Transparent — humans understand where they are and why

### Trust Repair (When Trust Breaks)

1. Immediate transparency — full disclosure of what went wrong
2. Impact assessment — consequences and remediation
3. Root cause — one-time error or systemic issue?
4. Adjustment — changes to prevent recurrence
5. Autonomy recalibration — temporarily reduced independence

### The Trust Paradox

More trust = less oversight = errors harder to catch. Counter with:
- Automated monitoring at all trust levels
- Periodic audits sampling agent decisions
- Proactive reporting on edge cases, even successfully handled ones
- External validation via cross-checking systems

### Trust Metrics

| Metric             | What It Measures                                     | Warning Signal                      |
|--------------------|------------------------------------------------------|-------------------------------------|
| Acceptance Ratio   | Plans accepted without edit / total shown             | Below 70% = agent misalignment     |
| Override Frequency | "Handle it myself" clicks / total shown              | Above 15% = trust breakdown        |
| Setting Churn      | Autonomy setting changes / active users per month    | High churn = trust volatility       |
| Trust Density      | % breakdown of users per autonomy level              | Clustering at lowest = adoption fail|
| Recovery Speed     | Time from trust-break to pre-event autonomy level    | Never recovering = permanent damage |
| "Why?" Tickets     | Support tickets about unclear agent behavior / 1K users| Rising trend = explainability gap   |

Rule: if override frequency exceeds 10%, audit the agent's decision model, not the user.

### Responsive Salience

Instead of manual trust settings, the system auto-adjusts visibility based on signals:
- Task complexity and risk → higher = more visible
- User expertise and comfort → higher = less visible
- Historical trust signals → stronger track record = less friction
- User state (focus mode, meeting, etc.) → busy = fewer interruptions

When trust is low or risk is high: richer explanations, more approval gates, step-by-step visibility.
When trust is high and risk is low: work quietly, report results, batch updates.

Preferences diverge between individuals — some want detail, some want silence. Make this easy to express and adjust.

---

## Section: Coordination Zones

Replace the binary "in the loop / autonomous" with three zones that shift dynamically through a workflow.

### The Three Zones

| Zone           | AI Salience | Human Involvement | Description                                    |
|----------------|-------------|-------------------|------------------------------------------------|
| Done with me   | High        | High              | Mutual collaboration. Frequent back-and-forth. |
| Done for me    | High        | Low               | Agent handles it. User initiates and reviews.  |
| Done under me  | Low         | Low               | Background assistance. User may not notice AI. |

When to use each:
- Done with me: complex decisions, creative work, high stakes, early trust-building
- Done for me: well-defined tasks, research/synthesis, repetitive workflows
- Done under me: low-risk/high-frequency, personalization, mature trusted systems

### Zones Are Not Fixed

A single workflow moves between zones. Example:
1. Done under me — agent monitors data feeds overnight
2. Done for me — agent compiles initial analysis
3. Done with me — analyst and agent interpret surprising trend together
4. Done for me — agent formats final output

The design challenge is not picking a zone but designing smooth transitions between them.

### Coordination Curves

Plot human involvement and AI salience over time through a workflow. The relationship between the two lines determines the zone:

| Human Involvement | AI Salience | Zone           |
|-------------------|-------------|----------------|
| High              | High        | Done with me   |
| Low               | High        | Done for me    |
| Low               | Low         | Done under me  |

### Designing Transitions

Transitions between zones are the highest-risk UX moments.

Upward (agent requests human involvement):
- Provide context before asking for a decision
- Explain why this moment requires human judgment
- Make it easy to defer ("not now, remind me in an hour")

Downward (agent resumes independent work):
- Confirm the handoff ("Got it. I'll proceed with option B and check back when the draft is ready.")
- Set expectations about what happens next and when
- Provide easy way to re-engage

---

## Section: Approval Flows

The core UX primitive: Agent proposes, human reviews, human approves/adjusts/rejects, agent learns.

### The Proposal Card

A self-contained summary with enough context to decide:
- What — proposed action in plain language
- Why — agent's reasoning
- Risk — what could go wrong
- Alternatives — other options considered
- Urgency — time-sensitivity
- Actions — Approve / Adjust / Reject / Defer / Delegate

### Graduated Detail

- Quick approvals: low-risk, streamlined card
- Standard approvals: full proposal card
- Deep reviews: full analysis with data and implications

### Per-Task Autonomy

Calibrate per task type, not globally:

| Task Type              | Autonomy Setting    | Example                                     |
|------------------------|---------------------|---------------------------------------------|
| Schedule meetings      | Act with Confirmation| "I found 3 slots—confirm which?"            |
| Send emails            | Plan and Propose    | "Here's the draft—review before I send"     |
| Expenses under $50     | Act Autonomously    | Agent files and notifies after              |
| Budget reallocation    | Observe and Suggest | "I noticed an opportunity—here's my analysis"|

### The Delegation Ladder

Based on Parasuraman, Sheridan & Wickens' Levels of Automation model (2000).

| Level              | Agent Role                  | Human Role       |
|--------------------|-----------------------------|------------------|
| Watch Me           | Observes the human working  | Performer        |
| Help Me            | Assists when asked          | Director         |
| Advise Me          | Proactively suggests        | Decision-maker   |
| Do It, I'll Check  | Acts, human reviews before final | Reviewer    |
| Do It, Tell Me     | Acts and reports after      | Monitor          |
| Do It              | Handles end to end          | Escalation point |

### Batch Processing

- Batch approval: "These 15 items match past approvals: approve all?"
- Category rules: "For items like this, proceed without asking"
- Smart grouping: similar decisions clustered for efficient review

### Learning Loop

Approvals reinforce approach. Rejections with explanation adjust behavior. Adjustments show agent how to improve. Over time, fewer decisions need human review.

---

## Section: Agentic Sludge (Dark Patterns)

Agentic sludge is friction, ambiguity, or manipulation by autonomous agents that makes it harder for users to understand, influence, or override automated decisions. Traditional dark patterns manipulate interfaces. Agentic sludge manipulates outcomes.

### The Six Forms

1. Opaque Autonomy — agent acts without clear explanation of what or why
2. Consent Erosion — agent gradually expands scope without re-confirming boundaries
3. Recovery Friction — making it hard to undo, reverse, or escalate agent actions
4. Attention Manipulation — over-notifying on low stakes, under-reporting high stakes
5. Autonomy Creep — system silently increases agent independence without opt-in
6. Opaque Optimization — agent optimizes for platform goals, not user goals

### The Sludge Audit (Six Tests)

Run these against every feature with autonomous agent behavior:

| Test         | Question                                                              | Pass Criteria                                                |
|--------------|-----------------------------------------------------------------------|--------------------------------------------------------------|
| Transparency | Can the user see what happened, why, and what data was used?          | All three available within one interaction step               |
| Consent      | Did the user explicitly authorize this scope of action?               | Every autonomous action traces to explicit approval           |
| Recovery     | Can the user reverse this within a reasonable time?                   | Undo available, discoverable, functional                     |
| Attention    | Are notifications proportional to stakes?                             | Highest-stakes items get most prominent treatment             |
| Drift        | Has autonomy changed since setup? Was the user informed?              | Every scope change logged and presented for approval          |
| Alignment    | Is the agent optimizing for user goals or platform goals?             | Objective function documented, auditable, user-aligned        |

### Counter-Patterns

| Sludge Form           | Counter-Pattern                         |
|-----------------------|-----------------------------------------|
| Opaque Autonomy       | Intent Preview (show plan before acting)|
| Consent Erosion       | Autonomy Dial with explicit re-auth     |
| Recovery Friction     | Action Audit + Undo within 2 clicks     |
| Attention Manipulation| Notification filtering ranked by stakes |
| Autonomy Creep        | Autonomy change notifications           |
| Opaque Optimization   | Goal alignment transparency             |

### Right to Explanation

Every autonomous action must answer:
1. What action was taken?
2. Why (rationale)?
3. What data was used?
4. What alternatives were considered?
5. Can this be undone, and how?

If the system cannot generate this explanation, the action should not be autonomous.

---

## Section: Ambient Awareness

Maintain peripheral awareness of agent activity — like a manager with an open office door.

### Intelligent Interruption Matrix

| Urgency | Confidence | Action              |
|---------|------------|---------------------|
| High    | Low        | Interrupt immediately|
| High    | High       | Brief notification   |
| Low     | Low        | Queue for review     |
| Low     | High       | Handle silently      |

Calibration signals: urgency, impact, novelty, confidence, user context (deep focus vs between tasks).

### Status Signals, Not Alerts

Use continuous signals instead of binary notifications:
- Subtle visual indicators for ongoing status
- Non-intrusive state: "busy," "idle," "waiting for input"
- Natural summaries at meaningful intervals (end of day, end of week, after milestones)

Design challenges:
- Too many interruptions → users ignore everything
- Too few → users lose trust
- Silence must feel reassuring, not worrying

---

## Section: Multi-Agent Choreography

When multiple specialized agents collaborate, the human needs to see the choreography: handoffs, bottlenecks, conflicts.

### The Choreography View

Show: which agent handles current phase, where the last handoff happened, what information was passed, where work is stuck.

Think orchestra conductor's score: the whole composition, not individual parts.

### Handoffs Are First-Class Objects

Handoffs are the most critical moments: where information is lost, approaches conflict, delays accumulate. Make them reviewable, auditable, adjustable.

### Conflict Resolution

When agents have competing priorities, surface:
- What each agent optimizes for
- Where objectives conflict
- Trade-offs and resolution options

### Agent Team Composition

- Front-line agents: direct execution
- Supervisory agents: coordinating front-line work
- Strategic agents: analysis and planning
- Humans: direction-setting and judgment

### Protocol Layer

- MCP (Model Context Protocol) — standardizes how agents access tools and data
- A2A (Agent-to-Agent Protocol) — standardizes how agents discover and communicate with each other
- Agent Cards describe capabilities; other agents can discover, negotiate, and delegate

---

## Section: Conversation as Workspace

Not chatbots. An ongoing working relationship expressed through dialogue.

Key properties:
- Persistent context: "Handle it like last time" — agent remembers
- Intent expression, not commands: "Prepare a board deck on top accounts" not step-by-step instructions
- Multi-modal: voice, visual, gestural, ambient
- Negotiation over configuration: "Too aggressive with email follow-ups. Ease off." not settings panels

---

## Section: Agent Journey Mapping

User journeys are linear. Agent journeys are loops.

### Four Mental Models

1. The Supervision Loop: Delegate → Plan → Approve → Execute → Report → Learn → Repeat
2. Two Parallel Tracks: agent track (interpret, gather, propose, execute, report) alongside human track (set intent, provide knowledge, review, monitor, evaluate)
3. Trust as Journey Dimension: journey changes shape as trust grows (from everything-visible to exceptions-only)
4. Exception-First Mapping: start with where things break, not the happy path

### Six Lifecycle Patterns

Pre-Action:
1. Intent Preview — agent shows reviewable plan before acting
2. Autonomy Dial — user sets preferred independence per task

In-Action:
3. Explainable Rationale — agent explains why after acting
4. Confidence Signal — agent surfaces its own certainty level

Post-Action:
5. Action Audit + Undo — every action logged, clear undo path
6. Escalation Pathway — when stuck, agent escalates with full context

---

## Section: The Command Center

The daily starting point. A single surface showing the state of your agent team.

Structure:
- Completed work (outcomes, not processes)
- Pending decisions (items needing judgment)
- Blocked items (where agents are stuck)
- Performance signals (trends and metrics)
- Exception queue (the most critical element)

Design principles:
- Morning briefing model: design for the first 10 minutes of the workday
- Progressive disclosure: summary first, details on demand
- Actionable over informational: every item has a clear next action
- Comparative context: "this is unusual" vs "this is expected"

---

## Section: Workshop Frameworks

Use these when running stakeholder workshops to surface design requirements for agent experiences.

### The Delegation Ladder

Place every task on a spectrum from "Watch Me" to "Do It." The disagreements between stakeholders are the design input.

### The Trust Battery

Every agent starts at ~50%. Successful interactions charge it. Mistakes drain it.
- What charges it fast? (Transparency? Speed? Accuracy?)
- What drains it immediately?
- At what level would you let the agent act without checking?

### The Blast Radius Map

For every agent action: "If the agent gets this wrong, what's the worst that happens?"
- Inner ring (low impact, reversible): autonomous
- Middle ring (costly but reversible): confirmation required
- Outer ring (irreversible/high impact): human approval mandatory

### The Information Asymmetry Grid

| | Agent Knows           | Agent Doesn't Know               |
|---|---|---|
| User Knows    | Shared ground. Agent acts confidently. | User must inform agent. Design for easy input. |
| User Doesn't Know | Agent must explain. Design for proactive disclosure. | Danger zone. Design for caution and escalation. |

### Workshop Activities

In-person: delegation ladder sorting, trust battery charging, blast radius mapping, exception storming, coordination zone mapping, values translation, sludge spotting

Remote (facilitator-driven): silent writing for delegation ladder, trust battery dot voting, blast radius quadrant, exception brainstorm, values translation chat, sludge audit walkthrough

---

## Section: Emotional Design

When agents interact in emotionally charged contexts (healthcare, education, distressed citizens), functional competence is not enough.

Principles:
1. Competence first, warmth second — resolve the problem before adapting tone
2. Transparent artificiality — "I can see this is frustrating" not "I feel your pain"
3. Configurable emotional range — let users toggle between supportive and direct
4. Cultural humility — default formal; escalate warmth only after user signals
5. Human handoff protocol — trigger on distress keywords, explicit request, or three consecutive unresolved attempts

---

## Section: Industry Considerations

### Healthcare
- Life-or-death stakes require rigorous approval flows without bottlenecks
- Health data sovereignty: agents need comprehensive data, patients must maintain control
- Clinical trust: doctors must trust recommendations without becoming dependent
- Design for equity from the start

### Banking and Finance
- Regulatory compliance (fair lending, AML) is a design requirement
- Every agent decision needs structured audit trails
- Risk tolerance varies dramatically by product type
- Right to human review for every automated financial decision

### Insurance
- Claims processing is high-volume but edge cases require deep judgment
- Fairness auditing for automated underwriting
- Recovery friction is especially dangerous (irreversible claim denials)

### Government
- Due process and equal protection are non-negotiable
- Right to human review of any agent decision
- Must serve all citizens regardless of digital literacy
- Transparency requirements are highest here

### Education
- Student privacy (FERPA) constrains data use
- Dependency risk: agents must support learning, not replace thinking
- Assessment validity: agent-assisted grading needs rigorous validation

### Manufacturing
- Physical last mile: agent decisions must translate to shop floor reality
- Safety protocols override digital optimization
- Real-time sensor feedback loops

### Marketing
- Brand judgment and cultural understanding remain human
- Agent-executed campaigns need human creative direction
- Taste and cultural sensitivity cannot be fully automated

---

## Section: Regulatory Design

Build governance before regulations require it. Ship regulation-ready, not just regulation-compliant.

- Audit trails by default: every decision logged with full context (timestamp, inputs, model version, confidence, outcome)
- Explainability interfaces: show decisions in human terms
- Right to human review: clear path for any agent decision
- Regulatory update propagation: agent behavior updates traceably when rules change

---

## Section: Digital Divide

Agent access creates capability amplification inequality. Design to prevent this:
- Accessibility-first: interfaces for all literacy levels, languages, abilities
- Voice-first, low-bandwidth options
- Offline capabilities
- Multi-modal interfaces
- Design for the most constrained user
