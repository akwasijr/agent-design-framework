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
CARD_BG = HexColor("#13161D")
CARD_BORDER = HexColor("#1E2230")

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

def draw_card(x, y, w, h):
    c.setFillColor(CARD_BG)
    c.setStrokeColor(CARD_BORDER)
    c.setLineWidth(0.5)
    c.roundRect(x, y, w, h, 3, fill=1, stroke=1)

# ================================================================
# PAGE 1 (unchanged)
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
    "In the coming months, we expect a significant shift in how people interact with software. "
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
    ("Experience", "No design language for agent-managed work. New patterns needed for intent, review and judgment."),
    ("Accessibility", "Agent creation is still technical. It should be as natural as making a spreadsheet."),
    ("Governance", "No standard for agent boundaries, decision auditing or responsibility assignment."),
]
for title, desc in gaps:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 6

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
# PAGE 2 - TIGHTENED
# ================================================================
c.showPage()
dark_bg()
y = H - M

txt("Studio42", M, y, sz=9, color=MUTED, font="Helvetica-Bold")
y -= 30

txt("Experience Design Patterns", M, y, sz=16, font="Helvetica-Bold")
y -= 10
accent_line(M, y, 40)
y -= 14

y = body(
    "These patterns replace navigate, find, act with brief, review, approve.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 10

patterns = [
    ("Command Center",
     "A single surface showing what agents completed, what needs a decision and what is stuck. "
     "Replaces the fragmented multi-app experience."),
    ("Approval Flow",
     "Agent proposes, human reviews, approves or adjusts, agent learns. Each proposal is a "
     "self-contained card with action, reasoning, risk and alternatives."),
    ("Ambient Awareness",
     "High urgency + low confidence: interrupt. Low urgency + high confidence: handle silently. "
     "Silence should feel like competence, not absence."),
    ("Multi-Agent Choreography",
     "Teams of agents with handoffs and conflicting priorities. The human sees the orchestration "
     "and intervenes where oversight matters most."),
]
for title, desc in patterns:
    txt(title, M, y, sz=9.5, font="Helvetica-Bold", color=WHITE)
    y -= 13
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=12)
    y -= 7

# AGENT JOURNEY MAPPING
y -= 6
txt("Mapping Agent Journeys", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 16

y = body(
    "Agent journeys differ from user journeys: two actors (human and agent), a relationship "
    "that evolves over time, and design moments defined by where things break, not the happy path.",
    M, y, sz=9.5, color=MUTED, ld=13.5)
y -= 10

models = [
    ("Supervision Loop", "Not linear like a user journey. It is a loop: delegate, plan, approve, execute, report, learn, repeat."),
    ("Two Parallel Tracks", "A human track and an agent track running simultaneously. The design lives at the intersections."),
    ("Trust as a Dimension", "Same workflow, different UX at each trust level. Map it multiple times to see how the interface simplifies."),
    ("Exception-First", "The happy path runs silently. The exceptions are the interface. Start with where things break."),
]
for title, desc in models:
    txt(title, M, y, sz=9, font="Helvetica-Bold", color=WHITE)
    y -= 12
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=11.5)
    y -= 5

# PRINCIPLES
y -= 6
txt("Five Design Principles", M, y, sz=13, font="Helvetica-Bold", color=ACCENT)
y -= 16

principles = [
    ("Outcomes Over Processes", "Show what was achieved, not how."),
    ("Exceptions Over Routine", "Surface what is unusual, hide what is normal."),
    ("Trust Building Over Time", "Earned through competence, not configured. Incremental and reversible."),
    ("Values Over Settings", "\"Be conservative when unsure\" not risk_score_threshold: 0.65."),
    ("Agent Creation as Document Creation", "If you can do the job, you can teach an agent. Domain expertise over code."),
]
for title, desc in principles:
    txt(title, M, y, sz=9, font="Helvetica-Bold", color=WHITE)
    y -= 12
    y = body(desc, M, y, sz=8.5, color=MUTED, ld=11.5)
    y -= 5

txt("2", W / 2 - 3, M - 15, sz=8, color=DIMMED)

# ================================================================
# PAGE 3 - MURAL-STYLE CANVAS VISUAL
# ================================================================
c.showPage()
dark_bg()
y = H - M

txt("Studio42", M, y, sz=9, color=MUTED, font="Helvetica-Bold")
y -= 30

txt("Agent Journey Canvas", M, y, sz=16, font="Helvetica-Bold")
y -= 10
accent_line(M, y, 40)
y -= 14

y = body(
    "A visual framework for mapping how humans and agents work together in a specific workflow. "
    "Take a workflow you know, map it across these rows to surface where approvals sit, what can "
    "run silently, and where the real design decisions are.",
    M, y, sz=9, color=MUTED, ld=12.5)
y -= 14

# Draw the canvas visual (mural board style)
canvas_x = M
canvas_w = CW
row_h = 42
header_w = 105
cell_w = (canvas_w - header_w) / 5
top_y = y

# Column headers (workflow phases)
phases = ["Initiate", "Plan", "Execute", "Report", "Learn"]
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 7.5)
for i, phase in enumerate(phases):
    px = canvas_x + header_w + i * cell_w
    c.setFillColor(CARD_BG)
    c.setStrokeColor(CARD_BORDER)
    c.setLineWidth(0.5)
    c.roundRect(px + 2, top_y - 18, cell_w - 4, 16, 2, fill=1, stroke=1)
    c.setFillColor(ACCENT)
    c.drawCentredString(px + cell_w / 2, top_y - 14, phase)

top_y -= 24

# Rows
rows = [
    ("Human Intent", "Sets goal and\nconstraints", "Reviews plan,\napproves/adjusts", "Monitors or\nsteps away", "Evaluates\nresults", "Gives feedback,\ncorrects"),
    ("Agent Action", "Interprets goal,\nclarifies gaps", "Proposes steps,\nassesses risk", "Runs tasks,\nhandles routine", "Presents outcomes\nwith reasoning", "Adapts based\non feedback"),
    ("Approval Point", "", "Human approves\nbefore proceed", "Escalates if\nconfidence low", "", ""),
    ("Trust Evolution", "Full visibility\ninto everything", "Routine auto,\nmajor approved", "Only exceptions\nsurface", "Summary card\nonly", "Fewer corrections\nover time"),
    ("Exception Types", "", "Ambiguous goal,\nconflicting rules", "Novel situation,\nauthority needed", "Unexpected\nresult", "Ethical concern,\njudgment call"),
]

row_colors = [WHITE, HexColor("#7E80EE"), ACCENT, HexColor("#F2A573"), HexColor("#EF4444")]

for ri, (label, *cells) in enumerate(rows):
    ry = top_y - ri * row_h
    
    # Row label
    draw_card(canvas_x, ry - row_h + 2, header_w - 4, row_h - 4)
    c.setFillColor(row_colors[ri])
    c.setFont("Helvetica-Bold", 7.5)
    # Split label if needed
    c.drawString(canvas_x + 8, ry - 15, label)
    
    # Cells
    for ci, cell in enumerate(cells):
        cx = canvas_x + header_w + ci * cell_w
        draw_card(cx + 2, ry - row_h + 2, cell_w - 4, row_h - 4)
        if cell:
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 6.5)
            cell_lines = cell.split('\n')
            for li, line in enumerate(cell_lines):
                c.drawString(cx + 8, ry - 14 - li * 9, line)

# Arrow flow along the top
arrow_y = top_y + 2
c.setStrokeColor(DIMMED)
c.setLineWidth(0.5)
for i in range(4):
    ax = canvas_x + header_w + (i + 1) * cell_w - 2
    c.line(ax, arrow_y, ax + 4, arrow_y)

y = top_y - len(rows) * row_h - 16

# Approaches section below canvas
txt("Approaches", M, y, sz=11, font="Helvetica-Bold")
y -= 14

# Two column layout for approaches
col_w = (CW - 14) / 2
approaches_left = [
    ("Agent Journey Canvas", "Map a workflow across the rows above. Compare how it works today vs with agents."),
    ("Trust Level Stacking", "Map the same journey at four trust levels to see how the UX collapses over time."),
    ("Exception Storming", "Generate failure modes, categorise them. Each category implies a different pattern."),
]
approaches_right = [
    ("Handoff Mapping", "Map every handoff between agents. What passes, what gets lost, where humans need visibility."),
    ("Day in the Life", "Storyboard a full workday: briefing, decisions, exceptions, review. Forces concrete thinking."),
]

for title, desc in approaches_left:
    txt(title, M, y, sz=8.5, font="Helvetica-Bold", color=WHITE)
    y_left = y - 11
    y = txt(desc, M, y_left, sz=7.5, color=MUTED, mw=col_w, ld=10)
    y -= 6

y_right = top_y - len(rows) * row_h - 16 - 14
for title, desc in approaches_right:
    txt(title, M + col_w + 14, y_right, sz=8.5, font="Helvetica-Bold", color=WHITE)
    y_right -= 11
    y_right = txt(desc, M + col_w + 14, y_right, sz=7.5, color=MUTED, mw=col_w, ld=10)
    y_right -= 6

txt("3", W / 2 - 3, M - 15, sz=8, color=DIMMED)

c.save()
print("Done")
