from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
import textwrap

BG = HexColor("#0C0E13")
ACCENT = HexColor("#F45A9B")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#8B95A5")
DIMMED = HexColor("#5A6477")
CALLOUT_BG = HexColor("#151820")

W, H = A4
M = 0.7 * inch
CW = W - 2 * M

c = canvas.Canvas("Agent_Design_Framework_S42.pdf", pagesize=A4)

def dark_bg():
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def accent_line(x, y, w):
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.5)
    c.line(x, y, x + w, y)

def txt(text, x, y, sz=10, color=WHITE, font="Helvetica", mw=None, ld=None):
    c.setFont(font, sz)
    c.setFillColor(color)
    if mw:
        chars = int(mw / (sz * 0.45))
        lines = []
        for para in text.split('\n'):
            lines.extend(textwrap.wrap(para, chars) or [''])
        lead = ld or sz * 1.45
        for line in lines:
            c.drawString(x, y, line)
            y -= lead
        return y
    else:
        c.drawString(x, y, text)
        return y - (ld or sz * 1.45)

def body(text, x, y, sz=9.5, color=MUTED, ld=None):
    return txt(text, x, y, sz=sz, color=color, font="Helvetica", mw=CW, ld=ld)

def callout(lines, x, y):
    h = 13 * len(lines) + 12
    c.setFillColor(CALLOUT_BG)
    c.rect(x, y - h, CW, h, fill=1, stroke=0)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(2)
    c.line(x, y, x, y - h)
    cy = y - 14
    for line in lines:
        txt(line, x + 12, cy, sz=9.5, font="Helvetica-Oblique", color=WHITE)
        cy -= 13
    return y - h

# ================================================================
# PAGE 1
# ================================================================
dark_bg()
y = H - M

txt("Studio42", M, y, sz=9, color=MUTED, font="Helvetica-Bold")
txt("Microsoft", M + 58, y, sz=9, color=DIMMED)
y -= 50

txt("Agent Design Framework", M, y, sz=26, font="Helvetica-Bold")
y -= 14
accent_line(M, y, 40)
y -= 24

txt("Why This Matters", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = body(
    "In the next 6 to 18 months, we expect a significant shift in how people interact with software. "
    "Rather than manually navigating apps, users will increasingly manage agentic systems that act on "
    "their behalf. Early signs are already visible in tools like Claude Code and the rise of vibe coding.\n\n"
    "This changes what we design. We will not just create user journeys but also agent journeys: how an "
    "agent interprets a goal, applies constraints, plans its approach, asks for approval, executes and "
    "reports back. Users will provide intent, steer, correct and supervise rather than clicking through "
    "step-by-step flows. We could even see scenarios where a procurement agent from one company negotiates "
    "terms directly with a supplier agent from another, with humans stepping in only for oversight.\n\n"
    "As designers, we need to get ahead of this. The UX decisions being made now will define the paradigm "
    "going forward, and once patterns set, they are hard to change. This framework is our attempt to think "
    "clearly about what these new interfaces look like before the window closes.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 8

y = callout([
    "Every knowledge worker becomes a manager. Not of people, but of agents.",
    "The product they use is a management tool. The skill they need is judgment.",
], M, y)
y -= 16

txt("What the Framework Covers", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = body(
    "We explored how this shift plays out across different industries and roles, looking at questions like: "
    "What does a workday look like when agents handle 80% of routine tasks? How do people set goals for an "
    "agent? How do they know what their agents are doing and whether to trust them? What happens when "
    "something goes wrong?\n\n"
    "The framework maps out the new interaction patterns, design principles and governance considerations "
    "that emerge when products stop being tools you operate and start being teams you manage.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 10

txt("Three Gaps We See", M, y, sz=11, font="Helvetica-Bold")
y -= 16

gaps = [
    ("Experience", "No design language exists for agent-managed work. We need new patterns for expressing intent, reviewing agent output and exercising judgment."),
    ("Accessibility", "Agent creation is still a technical skill. If agents are the future of all work, creating one should be as natural as making a spreadsheet."),
    ("Governance", "No standard exists for defining agent boundaries, auditing decisions or assigning responsibility, especially in regulated industries."),
]
for title, desc in gaps:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 7

y -= 2
txt("In Practice", M, y, sz=11, font="Helvetica-Bold")
y -= 16

y = body(
    "An insurance claims manager today processes each claim manually across multiple systems. With agents, "
    "their morning starts with a briefing: 84 claims processed overnight, 72 resolved, 5 escalated for "
    "their judgment (a disputed valuation, a fraud signal, a compassionate edge case). They spend 45 minutes "
    "on real decisions instead of 8 hours on routine processing.\n\n"
    "A hospital department head reviews 3 flagged patients instead of 42 charts. A government director "
    "reviews 10 escalated permits instead of 340 applications. The pattern is the same: routine handled, "
    "humans focused on what only humans can do.",
    M, y, sz=9.5, color=MUTED, ld=13.5)

txt("1", W / 2 - 3, M - 15, sz=8, color=DIMMED)

# ================================================================
# PAGE 2
# ================================================================
c.showPage()
dark_bg()
y = H - M

txt("Studio42", M, y, sz=9, color=MUTED, font="Helvetica-Bold")
y -= 30

txt("Experience Design Patterns", M, y, sz=16, font="Helvetica-Bold")
y -= 10
accent_line(M, y, 40)
y -= 16

y = body(
    "Four core patterns define how people will interact with agent-managed systems. They replace the "
    "traditional model of navigate, find, act with a new one: brief, review, approve.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 12

patterns = [
    ("Command Center",
     "The workday starts with a single surface showing what agents completed, what needs a decision and "
     "what is stuck. One view replaces the fragmented multi-app experience. Designed around the first "
     "10 minutes of the workday."),
    ("Approval Flow",
     "Agent proposes, human reviews, approves or adjusts, agent learns. Each proposal is a self-contained "
     "card with the action, reasoning, risk and alternatives. Over time, the agent earns more autonomy "
     "and fewer decisions need human review."),
    ("Ambient Awareness",
     "Intelligent interruption replaces notification overload. High urgency and low confidence means "
     "interrupt immediately. Low urgency and high confidence means handle silently. Silence should feel "
     "like competence, not absence."),
    ("Multi-Agent Choreography",
     "Real work involves teams of agents with handoffs and sometimes conflicting priorities. The human "
     "sees the orchestration and intervenes at the points where oversight matters most."),
]
for title, desc in patterns:
    txt(title, M, y, sz=10, font="Helvetica-Bold", color=WHITE)
    y -= 14
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 9

# AGENT JOURNEY MAPPING
y -= 4
txt("Agent Journey Mapping", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = body(
    "Just as we map user journeys today, we need a way to map agent journeys. But agent journeys are "
    "fundamentally different: there are two actors (human and agent), the relationship evolves over time, "
    "and the most important design moments are not the happy path but the points where things break.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 10

txt("Mental Models", M, y, sz=10, font="Helvetica-Bold")
y -= 14

models = [
    ("The Supervision Loop", "A user journey is linear. An agent journey is a loop: delegate, plan, approve, execute, report, learn, repeat. The human enters and exits at different points depending on trust."),
    ("Two Parallel Tracks", "Every agent journey has a human track and an agent track running simultaneously. The design lives at the intersection points where they hand off to each other."),
    ("Trust as a Dimension", "The same workflow looks different at each trust level. Map the journey multiple times to see how the interface simplifies as the agent earns autonomy."),
    ("Exception-First", "Start with where things break, not the happy path. The happy path runs silently. Your interface IS the exception handler."),
]
for title, desc in models:
    txt(title, M, y, sz=9, font="Helvetica-Bold", color=WHITE)
    y -= 12
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=11.5)
    y -= 6

txt("2", W / 2 - 3, M - 15, sz=8, color=DIMMED)

# ================================================================
# PAGE 3
# ================================================================
c.showPage()
dark_bg()
y = H - M

txt("Studio42", M, y, sz=9, color=MUTED, font="Helvetica-Bold")
y -= 30

txt("Workshop Activities", M, y, sz=16, font="Helvetica-Bold")
y -= 10
accent_line(M, y, 40)
y -= 16

y = body(
    "Practical activities for teams designing agent-managed experiences. Best run in sequence.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 12

activities = [
    ("1. Agent Journey Canvas", "45-60 min",
     "Map a real workflow on a structured canvas with rows for: human intent, agent interpretation, agent "
     "plan, approval points, execution, output and feedback loop. First map how it works today, then remap "
     "it as an agent journey. Discuss where approvals sit and what can be silent."),
    ("2. Trust Level Stacking", "30-45 min",
     "Take one workflow and map it four times at different trust levels: new (everything approved), building "
     "(routine auto, major approved), established (only exceptions surface), trusted (summary only). See how "
     "the UX collapses over time and where earned autonomy moments are."),
    ("3. Exception Storming", "30 min",
     "Brainstorm all the ways a workflow can require human involvement. Categorise each: judgment, authority, "
     "ethics, novelty, conflict, low confidence. Each category implies a different interface pattern. "
     "The exceptions define the UX."),
    ("4. Handoff Mapping", "30-45 min",
     "For multi-agent workflows, map every handoff point between agents. At each: what information passes, "
     "what could be lost, where agents might conflict, where a human needs visibility. Handoff points are "
     "where choreography UX gets designed."),
    ("5. Day in the Life Storyboard", "60 min",
     "Storyboard a full workday: morning briefing, first decisions, midday exception, afternoon review, "
     "end of day summary. Forces concrete thinking. Not \"the agent helps with claims\" but \"the agent "
     "presents 5 escalated claims with a proposal card for each.\""),
]
for title, time, desc in activities:
    txt(title, M, y, sz=10, font="Helvetica-Bold", color=WHITE)
    txt(time, M + CW - 50, y, sz=8, color=ACCENT)
    y -= 14
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 9

# PRINCIPLES
y -= 4
txt("Five Design Principles", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

principles = [
    ("Outcomes Over Processes", "Show what was achieved, not how. Process details on demand, never by default."),
    ("Exceptions Over Routine", "Surface what is unusual, hide what is normal. Human attention is the scarcest resource."),
    ("Trust Building Over Time", "Trust is earned through demonstrated competence, not toggled on. Incremental, evidence-based, reversible."),
    ("Values Over Settings", "\"Be conservative when unsure\" rather than risk_score_threshold: 0.65. Boundaries expressed as human values."),
    ("Agent Creation as Document Creation", "If you can do the job, you can teach an agent to do it. Domain expertise over code."),
]
for title, desc in principles:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 7

# CLOSING
y -= 6
y = callout([
    "How do people maintain meaningful control, understanding and purpose",
    "in a world where agents do most of the work?",
    "",
    "This question shapes everything we design next.",
], M, y)

txt("3", W / 2 - 3, M - 15, sz=8, color=DIMMED)

c.save()
print("Done")
