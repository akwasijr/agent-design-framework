from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import textwrap

# ─── S42 Brand ───
BG = HexColor("#0C0E13")
ACCENT = HexColor("#F45A9B")  # single accent color — pink from gradient
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#8B95A5")
DIMMED = HexColor("#5A6477")

W, H = A4
MARGIN = 0.7 * inch
CW = W - 2 * MARGIN  # content width

c = canvas.Canvas("Agent_Design_Framework_S42.pdf", pagesize=A4)

def dark_bg():
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def accent_line(x, y, w):
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.5)
    c.line(x, y, x + w, y)

def draw_text(text, x, y, size=10, color=WHITE, font="Helvetica", max_w=None, leading=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if max_w:
        # Wrap text
        chars = int(max_w / (size * 0.45))
        lines = []
        for para in text.split('\n'):
            lines.extend(textwrap.wrap(para, chars) or [''])
        ld = leading or size * 1.45
        for line in lines:
            c.drawString(x, y, line)
            y -= ld
        return y
    else:
        c.drawString(x, y, text)
        return y - (leading or size * 1.45)

def draw_body(text, x, y, size=9.5, color=MUTED, leading=None):
    return draw_text(text, x, y, size=size, color=color, font="Helvetica", max_w=CW, leading=leading)

def draw_bold(text, x, y, size=9.5, color=WHITE):
    return draw_text(text, x, y, size=size, color=color, font="Helvetica-Bold", max_w=CW)

# ═══════════════════════════════════════════
# PAGE 1
# ═══════════════════════════════════════════
dark_bg()
y = H - MARGIN

# Header
draw_text("Studio42", MARGIN, y, size=9, color=MUTED, font="Helvetica-Bold")
draw_text("Microsoft", MARGIN + 58, y, size=9, color=DIMMED)
y -= 50

# Title
draw_text("Agent Design Framework", MARGIN, y, size=26, font="Helvetica-Bold")
y -= 14
accent_line(MARGIN, y, 40)
y -= 22

# Subtitle
y = draw_body("A thinking framework for designing digital products where agents do the work and humans manage the outcomes.", MARGIN, y, size=11, color=HexColor("#C8D0DC"), leading=16)
y -= 12

# The case
draw_text("The Case for a New Design Paradigm", MARGIN, y, size=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = draw_body(
    "Today, every digital product assumes the human does the work: clicking, filling forms, navigating menus. "
    "But a fundamental shift is underway. Agents will increasingly do the work. Humans will manage them.\n\n"
    "This is a paradigm shift on par with CLI to GUI, or desktop to cloud. And design thinking hasn't kept up. "
    "We're building task-based interfaces for a world that's moving beyond tasks. The UX decisions being made now "
    "will define the paradigm going forward \u2014 which is why we need a framework before patterns harden.",
    MARGIN, y, size=9.5, color=MUTED, leading=14)
y -= 10

# Core premise — callout box
box_h = 42
c.setFillColor(HexColor("#151820"))
c.rect(MARGIN, y - box_h, CW, box_h, fill=1, stroke=0)
c.setStrokeColor(ACCENT)
c.setLineWidth(2)
c.line(MARGIN, y, MARGIN, y - box_h)
draw_text("Every knowledge worker becomes a manager. The product they use is a management", MARGIN + 12, y - 14, size=9.5, font="Helvetica-Oblique", color=WHITE)
draw_text("tool. The skill they need is judgment, not execution.", MARGIN + 12, y - 27, size=9.5, font="Helvetica-Oblique", color=WHITE)
y -= box_h + 16

# What we explored
draw_text("What We Explored", MARGIN, y, size=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

y = draw_body(
    "We conducted deep research across seven industries \u2014 banking, insurance, healthcare, government, education, "
    "manufacturing, and marketing \u2014 to understand how agent-managed work actually plays out. We mapped the full "
    "lifecycle: how humans delegate to agents, how trust builds over time, how exceptions surface, and what new "
    "interface patterns are needed. The result is a comprehensive framework covering experience design, interaction "
    "models, design principles, and governance patterns.",
    MARGIN, y, size=9.5, color=MUTED, leading=14)
y -= 12

# Three missing layers
draw_text("Three Design Gaps We Identified", MARGIN, y, size=11, font="Helvetica-Bold")
y -= 16

gaps = [
    ("Experience", "No design language exists for agent-managed work. We need new patterns for expressing intent, reviewing agent output, and exercising judgment \u2014 not buttons and forms."),
    ("Accessibility", "Agent creation is currently a technical skill. If agents are the future of all work, creating one should be as natural as making a spreadsheet."),
    ("Governance", "No standard exists for defining agent boundaries, auditing decisions, or assigning responsibility \u2014 critical in banking, healthcare, and government."),
]
for title, desc in gaps:
    draw_text(title, MARGIN, y, size=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = draw_body(desc, MARGIN, y, size=8.5, color=MUTED, leading=12.5)
    y -= 8

# Concrete example
y -= 4
draw_text("What This Looks Like in Practice", MARGIN, y, size=11, font="Helvetica-Bold")
y -= 16

y = draw_body(
    "Consider an insurance claims manager today: they process each claim manually \u2014 paperwork, data entry, "
    "cross-referencing policy documents. With agent-managed work, their morning starts with a command center briefing: "
    "84 claims processed overnight, 72 resolved autonomously, 5 escalated for human judgment. They spend 45 minutes "
    "on genuine decision-making \u2014 a disputed valuation, a fraud signal, a compassionate edge case \u2014 instead of "
    "8 hours on routine processing. Zero paperwork. Their value shifts from processing to judgment.",
    MARGIN, y, size=9.5, color=MUTED, leading=14)
y -= 6
y = draw_body(
    "The same pattern applies everywhere: a hospital department head reviews 3 flagged patients instead of 42 charts. "
    "A government director reviews 10 escalated permits instead of 340 applications. The routine is handled. "
    "The human focuses on what only humans can do.",
    MARGIN, y, size=9.5, color=MUTED, leading=14)

# Footer
draw_text("1", W / 2 - 3, MARGIN - 15, size=8, color=DIMMED)

# ═══════════════════════════════════════════
# PAGE 2
# ═══════════════════════════════════════════
c.showPage()
dark_bg()
y = H - MARGIN

draw_text("Studio42", MARGIN, y, size=9, color=MUTED, font="Helvetica-Bold")
y -= 30

draw_text("Experience Design Patterns", MARGIN, y, size=16, font="Helvetica-Bold")
y -= 10
accent_line(MARGIN, y, 40)
y -= 16

y = draw_body(
    "Through our research, we identified four core UX patterns that define how humans interact with agent-managed "
    "systems. These replace the traditional app paradigm of navigate \u2192 find \u2192 act with a new model: "
    "brief \u2192 review \u2192 approve.",
    MARGIN, y, size=9.5, color=MUTED, leading=14)
y -= 12

patterns = [
    ("Command Center", "Your workday starts with a single surface showing agent status, completed work, pending decisions, and exceptions \u2014 not an inbox or to-do list. One view replaces the fragmented multi-app experience. Design for the first 10 minutes of the workday."),
    ("Approval Flow", "Agent proposes \u2192 Human reviews \u2192 Approves, adjusts, or rejects \u2192 Agent learns. This is the fundamental unit of interaction. Each proposal is a self-contained card with the action, reasoning, risk, alternatives, and urgency. Over time, the agent needs fewer approvals."),
    ("Ambient Awareness", "Intelligent interruption replaces notification overload. High urgency + low confidence = interrupt immediately. Low urgency + high confidence = handle silently. Silence should feel like competence, not absence."),
    ("Multi-Agent Choreography", "Real work involves teams of specialized agents with handoffs, bottlenecks, and conflicts. The human sees the orchestration \u2014 like a conductor's score \u2014 and intervenes at handoff points where oversight is most valuable."),
]
for title, desc in patterns:
    draw_text(title, MARGIN, y, size=10, font="Helvetica-Bold", color=WHITE)
    y -= 14
    y = draw_body(desc, MARGIN, y, size=8.5, color=MUTED, leading=12.5)
    y -= 10

# Design Principles
y -= 4
draw_text("Five Design Principles", MARGIN, y, size=13, font="Helvetica-Bold", color=ACCENT)
y -= 18

principles = [
    ("Outcomes Over Processes", "Show what was achieved, not how. Process details on demand, never default."),
    ("Exceptions Over Routine", "Surface what's unusual, hide what's normal. Human attention is the scarcest resource."),
    ("Trust Building Over Time", "Trust is earned through demonstrated competence, not toggled on. Incremental, evidence-based, reversible."),
    ("Values Over Settings", "\"Be conservative when unsure\" \u2014 not risk_score_threshold: 0.65. Express boundaries as human values."),
    ("Agent Creation as Document Creation", "If you can do the job yourself, you can teach an agent to do it. Domain expertise, not code."),
]
for title, desc in principles:
    draw_text(title, MARGIN, y, size=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = draw_body(desc, MARGIN, y, size=8.5, color=MUTED, leading=12)
    y -= 7

# Closing
y -= 8
box_h = 48
c.setFillColor(HexColor("#151820"))
c.rect(MARGIN, y - box_h, CW, box_h, fill=1, stroke=0)
c.setStrokeColor(ACCENT)
c.setLineWidth(2)
c.line(MARGIN, y, MARGIN, y - box_h)
draw_text("How do humans maintain meaningful control, understanding, and purpose", MARGIN + 12, y - 14, size=9.5, font="Helvetica-Oblique", color=WHITE)
draw_text("in a world where agents do most of the work?", MARGIN + 12, y - 27, size=9.5, font="Helvetica-Oblique", color=WHITE)
draw_text("This is as much philosophical as it is a design question \u2014 and it shapes everything.", MARGIN + 12, y - 40, size=8, font="Helvetica-Oblique", color=MUTED)

# Footer
draw_text("2", W / 2 - 3, MARGIN - 15, size=8, color=DIMMED)

c.save()
print("Done")
