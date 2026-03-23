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
y -= 22

y = body(
    "A thinking framework for designing digital products where agents do the work and humans manage the outcomes.",
    M, y, sz=11, color=HexColor("#C8D0DC"), ld=16)
y -= 14

# The shift
txt("The Shift That Is Already Happening", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = body(
    "There is a prediction that in the next 6 to 18 months we will shift from manually using apps to managing "
    "agentic systems that act on our behalf. You may have already seen early signs of this with vibe coding, "
    "Claude Code and similar tools.\n\n"
    "This means we will not just design user journeys but also agent journeys: how an agent interprets a goal, "
    "applies constraints, plans, asks for approval, executes and reports back. Users will provide intent, steer, "
    "correct and supervise instead of clicking through flows.\n\n"
    "We may even see cases where a procurement agent from one company negotiates pricing directly with a supplier "
    "agent from another company, with humans only stepping in for oversight and review. As this shift is happening, "
    "designers need to take back the direction of the narrative. We need to start imagining what these new "
    "interfaces look like.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 8

# Core premise callout
y = callout([
    "Every knowledge worker becomes a manager. Not of people, but of agents.",
    "The product they use is a management tool. The skill they need is judgment.",
], M, y)
y -= 14

# What we explored
txt("What We Explored", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = body(
    "We conducted deep research across seven industries (banking, insurance, healthcare, government, education, "
    "manufacturing, marketing) to understand how agent-managed work plays out in practice. We mapped the full "
    "lifecycle: how humans delegate, how trust builds, how exceptions surface, and what new interface patterns "
    "are needed.\n\n"
    "We looked at questions like: How do people set goals for an agent? How do they know what their agents are "
    "doing? How do they intervene when something goes wrong? What does a morning briefing look like when agents "
    "handled 80% of overnight work? The result is a comprehensive framework covering experience design, "
    "interaction models, design principles, and governance.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 8

# Three gaps
txt("Three Design Gaps We Identified", M, y, sz=11, font="Helvetica-Bold")
y -= 16

gaps = [
    ("Experience", "No design language exists for agent-managed work. We need new patterns for expressing intent, reviewing agent output and exercising judgment."),
    ("Accessibility", "Agent creation is currently a technical skill. If agents are the future of all work, creating one should be as natural as making a spreadsheet."),
    ("Governance", "No standard exists for defining agent boundaries, auditing decisions or assigning responsibility. Critical in regulated industries."),
]
for title, desc in gaps:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 7

# Concrete example
y -= 2
txt("What This Looks Like in Practice", M, y, sz=11, font="Helvetica-Bold")
y -= 16

y = body(
    "An insurance claims manager today processes each claim manually. With agents, their morning starts with a "
    "command center: 84 claims processed overnight, 72 resolved, 5 escalated for judgment. They spend 45 minutes "
    "on real decisions (a disputed valuation, a fraud signal, a compassionate edge case) instead of 8 hours on "
    "routine processing.\n\n"
    "The same pattern applies across roles. A hospital head reviews 3 flagged patients instead of 42 charts. "
    "A government director reviews 10 escalated permits instead of 340 applications. The routine is handled. "
    "The human focuses on what only humans can do.",
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
    "We identified four core UX patterns that define how humans interact with agent-managed systems. These "
    "replace the traditional app model of navigate, find, act with a new model: brief, review, approve.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 12

patterns = [
    ("Command Center",
     "Your workday starts with a single surface showing agent status, completed work, pending decisions and "
     "exceptions. One view replaces the fragmented multi-app experience. Designed for the first 10 minutes "
     "of the workday."),
    ("Approval Flow",
     "Agent proposes, human reviews, approves/adjusts/rejects, agent learns. This is the fundamental unit of "
     "interaction. Each proposal is a self-contained card with the action, reasoning, risk and alternatives. "
     "Over time, the agent earns more autonomy."),
    ("Ambient Awareness",
     "Intelligent interruption replaces notification overload. High urgency and low confidence means interrupt "
     "immediately. Low urgency and high confidence means handle silently. Silence should feel like competence, "
     "not absence."),
    ("Multi-Agent Choreography",
     "Real work involves teams of specialized agents with handoffs and conflicts. The human sees the "
     "orchestration (like a conductor's score) and intervenes at handoff points where oversight matters most."),
]
for title, desc in patterns:
    txt(title, M, y, sz=10, font="Helvetica-Bold", color=WHITE)
    y -= 14
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 9

# Principles
y -= 4
txt("Five Design Principles", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

principles = [
    ("Outcomes Over Processes", "Show what was achieved, not how. Process details on demand, never default."),
    ("Exceptions Over Routine", "Surface what is unusual, hide what is normal. Human attention is the scarcest resource."),
    ("Trust Building Over Time", "Trust is earned through demonstrated competence, not toggled on. Incremental, evidence-based, reversible."),
    ("Values Over Settings", "\"Be conservative when unsure\" not risk_score_threshold: 0.65. Express boundaries as human values."),
    ("Agent Creation as Document Creation", "If you can do the job yourself, you can teach an agent to do it. Domain expertise, not code."),
]
for title, desc in principles:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 7

# Closing
y -= 8
y = callout([
    "How do humans maintain meaningful control, understanding and purpose",
    "in a world where agents do most of the work?",
    "",
    "This is as much philosophical as it is a design question. And it shapes everything.",
], M, y)

txt("2", W / 2 - 3, M - 15, sz=8, color=DIMMED)

c.save()
print("Done")
