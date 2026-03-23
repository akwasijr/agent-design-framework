const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRobot, FaEye, FaUsers, FaShieldAlt, FaArrowRight,
  FaCode, FaLayerGroup, FaGlobe, FaCogs, FaHeart, FaBrain,
  FaComments, FaCheck, FaChartLine, FaClipboardCheck,
  FaExclamationTriangle, FaBalanceScale, FaHandshake,
  FaUniversity, FaHospital, FaIndustry, FaGavel,
  FaGraduationCap, FaBullhorn, FaUserTie,
} = require("react-icons/fa");

// ── Tech Keynote Palette (Apple/Tesla inspired) ──
const C = {
  black: "000000",
  nearBlack: "0A0A0A",
  darkGray: "111111",
  cardBg: "1A1A1A",
  accent: "06B6D4",       // cyan
  accentAlt: "8B5CF6",    // purple
  accentWarm: "F59E0B",   // amber
  accentGreen: "10B981",
  accentRed: "EF4444",
  accentPink: "EC4899",
  white: "FFFFFF",
  gray90: "E5E5E5",
  gray60: "999999",
  gray40: "666666",
  gray20: "333333",
};

// ── Icon Helpers ──
function renderSvg(Icon, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color, size: String(size) })
  );
}
async function toBase64(Icon, color, size = 256) {
  const svg = renderSvg(Icon, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ── Factories (fresh objects to avoid pptxgenjs mutation) ──
const softShadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 3, angle: 135, opacity: 0.35 });

// ── Slide helpers ──
function blackSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.black };
  return s;
}

// Section divider slide - full black with large centered text
function sectionDivider(pres, title, subtitle, accentColor = C.accent) {
  const s = blackSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 4.3, y: 2.0, w: 1.4, h: 0.04, fill: { color: accentColor } });
  s.addText(title, {
    x: 0.5, y: 2.2, w: 9, h: 1.2, fontSize: 54, fontFace: "Georgia",
    color: C.white, bold: true, align: "center", valign: "middle",
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 1.5, y: 3.4, w: 7, h: 0.6, fontSize: 20, fontFace: "Calibri",
      color: C.gray60, align: "center",
    });
  }
  return s;
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Agent Design Framework";
  pres.title = "Agent Design Framework — Elite Edition";

  // Pre-render icons
  const ic = {};
  const icW = {};
  const map = {
    robot: FaRobot, eye: FaEye, users: FaUsers, shield: FaShieldAlt,
    arrow: FaArrowRight, code: FaCode, layers: FaLayerGroup, globe: FaGlobe,
    cogs: FaCogs, heart: FaHeart, brain: FaBrain, comments: FaComments,
    check: FaCheck, chart: FaChartLine, clipboard: FaClipboardCheck,
    warning: FaExclamationTriangle, balance: FaBalanceScale,
    handshake: FaHandshake, bank: FaUniversity, hospital: FaHospital,
    industry: FaIndustry, gavel: FaGavel, grad: FaGraduationCap,
    bullhorn: FaBullhorn, userTie: FaUserTie,
  };
  for (const [k, v] of Object.entries(map)) {
    ic[k] = await toBase64(v, `#${C.accent}`, 256);
    icW[k] = await toBase64(v, `#${C.white}`, 256);
  }

  let s; // current slide

  // ════════════════════════════════════════════
  // SLIDE 1: HERO TITLE
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.accent } });
  s.addImage({ data: icW.robot, x: 4.25, y: 0.9, w: 1.5, h: 1.5 });
  s.addText("Agent Design Framework", {
    x: 0.5, y: 2.5, w: 9, h: 1.4, fontSize: 54, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("A Thinking Framework for Agent-Managed Work", {
    x: 1.5, y: 3.9, w: 7, h: 0.6, fontSize: 20, fontFace: "Calibri",
    color: C.accent, align: "center",
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.3, y: 4.7, w: 1.4, h: 0.03, fill: { color: C.gray40 } });

  // ════════════════════════════════════════════
  // SLIDE 2: BIG STATEMENT
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Every knowledge worker\nbecomes a manager.", {
    x: 0.8, y: 1.2, w: 8.4, h: 2.0, fontSize: 48, fontFace: "Georgia",
    color: C.white, bold: true, align: "center", lineSpacingMultiple: 1.15,
  });
  s.addText("The product they use is a management tool.\nThe skill they need is judgment, not execution.", {
    x: 1.5, y: 3.4, w: 7, h: 1.2, fontSize: 22, fontFace: "Calibri",
    color: C.gray60, align: "center", lineSpacingMultiple: 1.5,
  });

  // ════════════════════════════════════════════
  // SLIDE 3: THE GAP — 3 MISSING LAYERS
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Three Missing Layers", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.8, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("Technology is advancing. Design thinking hasn't kept up.", {
    x: 1.5, y: 1.2, w: 7, h: 0.5, fontSize: 18, fontFace: "Calibri",
    color: C.gray60, align: "center",
  });

  const layers = [
    { title: "Experience", desc: "No design language for\nagent-managed work", icon: ic.eye, color: C.accent },
    { title: "Accessibility", desc: "Agent creation is still\na technical skill", icon: ic.users, color: C.accentAlt },
    { title: "Governance", desc: "No standard for boundaries,\naudits, or responsibility", icon: ic.shield, color: C.accentWarm },
  ];
  layers.forEach((l, i) => {
    const x = 0.7 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.1, w: 2.85, h: 3.0, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.1, w: 2.85, h: 0.05, fill: { color: l.color } });
    s.addImage({ data: l.icon, x: x + 1.05, y: 2.45, w: 0.7, h: 0.7 });
    s.addText(l.title, { x, y: 3.35, w: 2.85, h: 0.5, fontSize: 22, fontFace: "Calibri", color: C.white, bold: true, align: "center" });
    s.addText(l.desc, { x: x + 0.2, y: 3.9, w: 2.45, h: 0.9, fontSize: 14, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.4 });
  });

  // ════════════════════════════════════════════
  // SLIDE 4: FROM DOING TO MANAGING
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("From Doing to Managing", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.8, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  // Big two-column
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.6, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: softShadow() });
  s.addText("TODAY", { x: 0.5, y: 1.65, w: 4.3, h: 0.5, fontSize: 14, fontFace: "Calibri", color: C.gray40, align: "center", charSpacing: 4 });
  s.addText("You Do the Work", { x: 0.5, y: 2.1, w: 4.3, h: 0.5, fontSize: 24, fontFace: "Georgia", color: C.gray60, align: "center", bold: true });
  const todayItems = ["Process applications", "Create campaigns", "Document encounters", "Grade assignments"];
  todayItems.forEach((t, i) => {
    s.addText(t, { x: 1.0, y: 2.8 + i * 0.5, w: 3.3, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray40, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.6, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: softShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.6, w: 4.3, h: 0.05, fill: { color: C.accent } });
  s.addText("TOMORROW", { x: 5.2, y: 1.7, w: 4.3, h: 0.5, fontSize: 14, fontFace: "Calibri", color: C.accent, align: "center", charSpacing: 4 });
  s.addText("You Manage Agents", { x: 5.2, y: 2.1, w: 4.3, h: 0.5, fontSize: 24, fontFace: "Georgia", color: C.white, align: "center", bold: true });
  const tomorrowItems = ["Set risk parameters", "Define brand direction", "Oversee care teams", "Design learning journeys"];
  tomorrowItems.forEach((t, i) => {
    s.addText(t, { x: 5.7, y: 2.8 + i * 0.5, w: 3.3, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray90, align: "center" });
  });

  // ════════════════════════════════════════════
  // SLIDE 5: ROLE TRANSFORMATION
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Role Transformation", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  const roles = [
    { from: "Processor", to: "Governor", shift: "Doing → Overseeing" },
    { from: "Creator", to: "Creative Director", shift: "Making → Directing" },
    { from: "Practitioner", to: "Care Architect", shift: "Treating → Orchestrating" },
    { from: "Administrator", to: "Public Steward", shift: "Processing → Governing" },
    { from: "Instructor", to: "Learning Architect", shift: "Teaching → Designing" },
  ];
  roles.forEach((r, i) => {
    const y = 1.5 + i * 0.75;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: 8.0, h: 0.6, fill: { color: i % 2 === 0 ? C.cardBg : C.nearBlack } });
    s.addText(r.from, { x: 1.2, y, w: 2.5, h: 0.6, fontSize: 16, fontFace: "Calibri", color: C.gray60, valign: "middle" });
    s.addImage({ data: ic.arrow, x: 3.8, y: y + 0.15, w: 0.3, h: 0.3 });
    s.addText(r.to, { x: 4.3, y, w: 2.5, h: 0.6, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, valign: "middle" });
    s.addText(r.shift, { x: 7.0, y, w: 2.0, h: 0.6, fontSize: 13, fontFace: "Calibri", color: C.accent, valign: "middle", align: "right" });
  });

  // ════════════════════════════════════════════
  // SLIDE 6: SECTION — EVOLUTION
  // ════════════════════════════════════════════
  sectionDivider(pres, "The Evolution", "Three phases from code to culture");

  // ════════════════════════════════════════════
  // SLIDE 7: THREE PHASES — VISUAL
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  const phaseData = [
    { n: "01", title: "Developer\nTools", sub: "Now", desc: "Agents live in the domain of engineers. Code, APIs, frameworks.", color: C.accent },
    { n: "02", title: "Agent\nPlatforms", sub: "Next", desc: "No-code builders. Governance as product. Agent dashboards.", color: C.accentAlt },
    { n: "03", title: "Agent-Native\nProducts", sub: "Future", desc: "Products designed for agent-managed work from the ground up.", color: C.accentWarm },
  ];
  phaseData.forEach((p, i) => {
    const x = 0.5 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.5, w: 2.9, h: 4.6, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.5, w: 2.9, h: 0.05, fill: { color: p.color } });
    s.addText(p.n, { x, y: 0.8, w: 2.9, h: 0.8, fontSize: 48, fontFace: "Georgia", color: p.color, align: "center", bold: true });
    s.addText(p.title, { x, y: 1.7, w: 2.9, h: 1.0, fontSize: 24, fontFace: "Georgia", color: C.white, align: "center", bold: true, lineSpacingMultiple: 1.1 });
    s.addText(p.sub, { x, y: 2.75, w: 2.9, h: 0.4, fontSize: 12, fontFace: "Calibri", color: p.color, align: "center", charSpacing: 4 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.9, y: 3.3, w: 1.1, h: 0.03, fill: { color: C.gray20 } });
    s.addText(p.desc, { x: x + 0.3, y: 3.5, w: 2.3, h: 1.3, fontSize: 14, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.4 });
  });

  // ════════════════════════════════════════════
  // SLIDE 8: SECTION — TANGIBLE FUTURES
  // ════════════════════════════════════════════
  sectionDivider(pres, "Tangible Futures", "What changes — and what emerges");

  // ════════════════════════════════════════════
  // SLIDE 9: WHAT DISAPPEARS
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("What Disappears", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.8, fontSize: 44, fontFace: "Georgia",
    color: C.accentRed, bold: true, align: "center",
  });
  const gone = [
    "Navigation menus",
    "Search bars",
    "Forms and data entry",
    "Notification overload",
    "Dashboards you check",
    "Settings panels",
  ];
  gone.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 1.0 + col * 4.5;
    const y = 1.7 + row * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.8, h: 0.85, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addText(`✕   ${g}`, { x: x + 0.2, y, w: 3.4, h: 0.85, fontSize: 18, fontFace: "Calibri", color: C.gray60, valign: "middle" });
  });

  // ════════════════════════════════════════════
  // SLIDE 10: WHAT EMERGES
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("What Emerges", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.8, fontSize: 44, fontFace: "Georgia",
    color: C.accentGreen, bold: true, align: "center",
  });
  const newPrimitives = [
    { title: "The Briefing", desc: "Curated summary of what happened and what needs you" },
    { title: "Proposal Cards", desc: "Agent's recommended action with reasoning" },
    { title: "Exception Queue", desc: "Only the things agents couldn't handle" },
    { title: "Trust Dial", desc: "Visible, adjustable autonomy per agent" },
    { title: "Choreography Map", desc: "Real-time view of agent coordination" },
    { title: "Teaching Moments", desc: "Correct agent behavior through feedback" },
  ];
  newPrimitives.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 1.0 + col * 4.5;
    const y = 1.7 + row * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.8, h: 0.85, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.05, h: 0.85, fill: { color: C.accentGreen } });
    s.addText(p.title, { x: x + 0.2, y: y + 0.05, w: 3.4, h: 0.35, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    s.addText(p.desc, { x: x + 0.2, y: y + 0.42, w: 3.4, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.gray60, margin: 0 });
  });

  // ════════════════════════════════════════════
  // SLIDE 11: THE BIG STAT — A DAY WITH AGENTS
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("A Day With Agents", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.6, fontSize: 36, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("Insurance Claims Manager", {
    x: 1.5, y: 1.0, w: 7, h: 0.4, fontSize: 16, fontFace: "Calibri",
    color: C.accent, align: "center",
  });

  // Big stats row
  const dayStats = [
    { num: "84", label: "Claims\nProcessed", color: C.white },
    { num: "72", label: "Resolved\nAutonomously", color: C.accentGreen },
    { num: "5", label: "Escalated\nto You", color: C.accentWarm },
    { num: "45m", label: "Of Judgment\nWork", color: C.accent },
  ];
  dayStats.forEach((d, i) => {
    const x = 0.5 + i * 2.4;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.8, w: 2.1, h: 2.2, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addText(d.num, { x, y: 1.95, w: 2.1, h: 1.1, fontSize: 54, fontFace: "Georgia", color: d.color, align: "center", bold: true });
    s.addText(d.label, { x, y: 3.05, w: 2.1, h: 0.7, fontSize: 12, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.3 });
  });

  s.addText("Zero paperwork.", {
    x: 1.5, y: 4.4, w: 7, h: 0.5, fontSize: 24, fontFace: "Georgia",
    color: C.accent, italic: true, align: "center",
  });

  // ════════════════════════════════════════════
  // SLIDE 12: THREE INTERACTION MODES
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Three Modes of Interaction", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  const modeData = [
    { title: "Delegate", desc: "Set the goal.\nWalk away.\nAgent reports back.", best: "Routine, low-risk", icon: icW.arrow, color: C.accent },
    { title: "Supervise", desc: "Agent works.\nYou watch.\nStep in when needed.", best: "Important, building trust", icon: icW.eye, color: C.accentAlt },
    { title: "Collaborate", desc: "Real-time\nback-and-forth.\nNeither fully in charge.", best: "Creative, complex", icon: icW.users, color: C.accentWarm },
  ];
  modeData.forEach((m, i) => {
    const x = 0.5 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.9, h: 3.6, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.9, h: 0.05, fill: { color: m.color } });
    // Icon in colored circle
    s.addShape(pres.shapes.OVAL, { x: x + 0.95, y: 1.85, w: 1.0, h: 1.0, fill: { color: m.color } });
    s.addImage({ data: m.icon, x: x + 1.15, y: 2.05, w: 0.6, h: 0.6 });
    s.addText(m.title, { x, y: 3.0, w: 2.9, h: 0.5, fontSize: 24, fontFace: "Georgia", color: C.white, align: "center", bold: true });
    s.addText(m.desc, { x: x + 0.3, y: 3.5, w: 2.3, h: 1.0, fontSize: 14, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.4 });
    s.addText(m.best, { x, y: 4.6, w: 2.9, h: 0.35, fontSize: 11, fontFace: "Calibri", color: m.color, align: "center", italic: true });
  });

  // ════════════════════════════════════════════
  // SLIDE 13: SECTION — EXPERIENCE DESIGN
  // ════════════════════════════════════════════
  sectionDivider(pres, "Experience Design", "Interfaces for managing agents, not performing tasks");

  // ════════════════════════════════════════════
  // SLIDE 14: COMMAND CENTER
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("The Command Center", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("One surface replaces the fragmented multi-app experience.", {
    x: 1.5, y: 0.95, w: 7, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray60, align: "center",
  });

  const ccItems = [
    { title: "Completed Work", stat: "12", desc: "claims processed", color: C.accentGreen, icon: ic.check },
    { title: "Pending Decisions", stat: "2", desc: "need your judgment", color: C.accentWarm, icon: ic.clipboard },
    { title: "Blocked Items", stat: "1", desc: "outside guidelines", color: C.accentRed, icon: ic.warning },
    { title: "Performance", stat: "↑15%", desc: "this week", color: C.accentAlt, icon: ic.chart },
  ];
  ccItems.forEach((item, i) => {
    const x = 0.5 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 2.1, h: 2.6, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 2.1, h: 0.05, fill: { color: item.color } });
    s.addImage({ data: item.icon, x: x + 0.75, y: 2.0, w: 0.5, h: 0.5 });
    s.addText(item.stat, { x, y: 2.6, w: 2.1, h: 0.7, fontSize: 36, fontFace: "Georgia", color: item.color, align: "center", bold: true });
    s.addText(item.desc, { x, y: 3.35, w: 2.1, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.gray60, align: "center" });
    s.addText(item.title, { x, y: 3.8, w: 2.1, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.gray40, align: "center" });
  });

  // Exception queue
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.6, w: 9, h: 0.7, fill: { color: C.cardBg }, shadow: softShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.6, w: 0.05, h: 0.7, fill: { color: C.accent } });
  s.addText("Exception Queue", { x: 0.8, y: 4.63, w: 2, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
  s.addText("Judgment  ·  Ethics  ·  Authority  ·  Creativity  ·  Empathy", {
    x: 0.8, y: 4.93, w: 8.5, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.gray60, margin: 0,
  });

  // ════════════════════════════════════════════
  // SLIDE 15: APPROVAL FLOW
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("The Approval Flow", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("The fundamental unit of agent-managed interaction", {
    x: 1.5, y: 0.95, w: 7, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray60, align: "center",
  });

  // Flow steps
  const flowLabels = ["Agent\nProposes", "Human\nReviews", "Approve /\nAdjust / Reject", "Agent\nLearns"];
  const flowColors = [C.accent, C.accentAlt, C.accentWarm, C.accentGreen];
  flowLabels.forEach((fl, i) => {
    const x = 0.6 + i * 2.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 2.0, h: 1.1, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 2.0, h: 0.05, fill: { color: flowColors[i] } });
    s.addText(fl, { x, y: 1.8, w: 2.0, h: 0.9, fontSize: 15, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", bold: true });
    if (i < 3) {
      s.addImage({ data: ic.arrow, x: x + 2.05, y: 2.05, w: 0.3, h: 0.3 });
    }
  });

  // Trust spectrum
  s.addText("Trust Spectrum", { x: 0.8, y: 3.2, w: 8.4, h: 0.5, fontSize: 22, fontFace: "Georgia", color: C.white, bold: true, align: "center" });
  const trustLevels = [
    { level: "New Agent", desc: "Every action requires approval", pct: 25 },
    { level: "Building Trust", desc: "Major decisions need approval", pct: 50 },
    { level: "Established", desc: "Only exceptions surface", pct: 75 },
    { level: "High Trust", desc: "Agent acts independently", pct: 100 },
  ];
  trustLevels.forEach((t, i) => {
    const y = 3.85 + i * 0.4;
    // Progress bar background
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: 8.0, h: 0.3, fill: { color: C.cardBg } });
    // Progress fill
    const fillW = (t.pct / 100) * 8.0;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: fillW, h: 0.3, fill: { color: C.accent }, transparency: 70 - t.pct * 0.5 });
    s.addText(t.level, { x: 1.2, y, w: 2.0, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.white, bold: true, valign: "middle", margin: 0 });
    s.addText(t.desc, { x: 3.5, y, w: 5.0, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.gray60, valign: "middle", margin: 0 });
  });

  // ════════════════════════════════════════════
  // SLIDE 16: AMBIENT AWARENESS
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Ambient Awareness", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  // 2x2 matrix
  const mx = [
    { label: "High Urgency\nLow Confidence", action: "Interrupt\nImmediately", color: C.accentRed, x: 0.8, y: 1.5 },
    { label: "High Urgency\nHigh Confidence", action: "Brief\nNotification", color: C.accentWarm, x: 5.2, y: 1.5 },
    { label: "Low Urgency\nLow Confidence", action: "Queue for\nReview", color: C.accentAlt, x: 0.8, y: 3.2 },
    { label: "Low Urgency\nHigh Confidence", action: "Handle\nSilently", color: C.accentGreen, x: 5.2, y: 3.2 },
  ];
  mx.forEach((m) => {
    s.addShape(pres.shapes.RECTANGLE, { x: m.x, y: m.y, w: 4.0, h: 1.4, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: m.x, y: m.y, w: 0.05, h: 1.4, fill: { color: m.color } });
    s.addText(m.label, { x: m.x + 0.25, y: m.y + 0.1, w: 1.8, h: 1.0, fontSize: 13, fontFace: "Calibri", color: C.gray60, lineSpacingMultiple: 1.3, margin: 0 });
    s.addText(m.action, { x: m.x + 2.0, y: m.y + 0.1, w: 1.8, h: 1.0, fontSize: 20, fontFace: "Georgia", color: m.color, bold: true, align: "right", lineSpacingMultiple: 1.2, margin: 0 });
  });

  s.addText("Silence should feel like competence, not absence.", {
    x: 1.5, y: 4.9, w: 7, h: 0.4, fontSize: 18, fontFace: "Georgia", color: C.accent, italic: true, align: "center",
  });

  // ════════════════════════════════════════════
  // SLIDE 17: MULTI-AGENT CHOREOGRAPHY
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Multi-Agent Choreography", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("Think orchestra conductor — not individual instruments", {
    x: 1.5, y: 0.95, w: 7, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray60, align: "center",
  });

  // Pipeline
  const pipeline = ["Intake", "Triage", "Assess", "Schedule", "Follow-up"];
  pipeline.forEach((p, i) => {
    const x = 0.5 + i * 1.9;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.8, w: 1.6, h: 0.8, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.8, w: 1.6, h: 0.04, fill: { color: C.accent } });
    s.addText(p, { x, y: 1.9, w: 1.6, h: 0.6, fontSize: 14, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", bold: true });
    if (i < 4) s.addImage({ data: ic.arrow, x: x + 1.6, y: 2.0, w: 0.25, h: 0.25 });
  });

  // 4 key concepts
  const concepts = [
    { title: "Flow Visualization", desc: "See the whole composition, not individual parts" },
    { title: "Handoff Points", desc: "Where information is lost and oversight is most valuable" },
    { title: "Conflict Resolution", desc: "Surface competing agent priorities for human decision" },
    { title: "Team Composition", desc: "Hire, assign roles, evaluate performance — at machine speed" },
  ];
  concepts.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 4.5;
    const y = 3.0 + row * 1.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.0, h: 0.95, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addText(c.title, { x: x + 0.2, y: y + 0.05, w: 3.6, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    s.addText(c.desc, { x: x + 0.2, y: y + 0.45, w: 3.6, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.gray60, margin: 0 });
  });

  // ════════════════════════════════════════════
  // SLIDE 18: DESIGNING THE AGENT
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Designing the Agent", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("Five design surfaces for every agent", {
    x: 1.5, y: 0.95, w: 7, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gray60, align: "center",
  });

  const anatomy = [
    { title: "Personality", desc: "Tone, verbosity, confidence,\ninitiative, transparency", icon: ic.heart, color: C.accentPink },
    { title: "Capabilities", desc: "What it can do,\ntools it can access", icon: ic.cogs, color: C.accent },
    { title: "Boundaries", desc: "What it won't do,\nescalation triggers", icon: ic.shield, color: C.accentRed },
    { title: "Interface", desc: "Status signals, confidence,\nprogressive disclosure", icon: ic.comments, color: C.accentAlt },
    { title: "Memory", desc: "Working, preference,\ndomain, interaction history", icon: ic.brain, color: C.accentWarm },
  ];
  // First row of 3, second row of 2 centered
  anatomy.forEach((a, i) => {
    let x, y;
    if (i < 3) {
      x = 0.5 + i * 3.2;
      y = 1.7;
    } else {
      x = 2.1 + (i - 3) * 3.2;
      y = 3.65;
    }
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 1.65, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 0.05, fill: { color: a.color } });
    s.addImage({ data: a.icon, x: x + 1.1, y: y + 0.2, w: 0.55, h: 0.55 });
    s.addText(a.title, { x, y: y + 0.8, w: 2.9, h: 0.35, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, align: "center" });
    s.addText(a.desc, { x: x + 0.2, y: y + 1.1, w: 2.5, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.3 });
  });

  // ════════════════════════════════════════════
  // SLIDE 19: SECTION — DESIGN PRINCIPLES
  // ════════════════════════════════════════════
  sectionDivider(pres, "Design Principles", "The five rules that govern agent-managed product design");

  // ════════════════════════════════════════════
  // SLIDE 20-24: ONE PRINCIPLE PER SLIDE (big statement style)
  // ════════════════════════════════════════════
  const princ = [
    { n: "01", title: "Outcomes Over Processes", statement: "Show what was achieved,\nnot how it was done.", detail: "Human attention goes to results. Process details are on demand, never default.", color: C.accent },
    { n: "02", title: "Exceptions Over Routine", statement: "Surface what's unusual.\nHide what's normal.", detail: "If humans review everything, they might as well do the work themselves.", color: C.accentAlt },
    { n: "03", title: "Trust Building Over Time", statement: "Trust is earned,\nnot configured.", detail: "Incremental, evidence-based, reversible. Movement is earned through demonstrated competence.", color: C.accentGreen },
    { n: "04", title: "Values Over Settings", statement: "Express boundaries\nas human values.", detail: "'Be conservative when unsure' — not risk_score_threshold: 0.65.", color: C.accentWarm },
    { n: "05", title: "Agent Creation as\nDocument Creation", statement: "As natural as making\na spreadsheet.", detail: "Domain expertise, not technical skill, should be the requirement.", color: C.accentPink },
  ];
  princ.forEach((p) => {
    s = blackSlide(pres);
    s.addText(p.n, { x: 0.8, y: 0.4, w: 1.5, h: 0.7, fontSize: 36, fontFace: "Georgia", color: p.color, bold: true });
    s.addText(p.title, { x: 2.3, y: 0.4, w: 7, h: 0.7, fontSize: 28, fontFace: "Georgia", color: C.gray40 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 2.0, h: 0.04, fill: { color: p.color } });
    s.addText(p.statement, {
      x: 0.8, y: 1.6, w: 8.4, h: 2.0, fontSize: 44, fontFace: "Georgia",
      color: C.white, bold: true, lineSpacingMultiple: 1.15,
    });
    s.addText(p.detail, {
      x: 0.8, y: 3.8, w: 8, h: 1.0, fontSize: 18, fontFace: "Calibri",
      color: C.gray60, lineSpacingMultiple: 1.4,
    });
  });

  // ════════════════════════════════════════════
  // SLIDE 25: INDUSTRIES — GRID
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Industry Perspectives", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  const indData = [
    { title: "Banking", shift: "Transaction Processors\n→ Financial Governors", icon: ic.bank },
    { title: "Insurance", shift: "Claims Assessors\n→ Risk Adjudicators", icon: ic.shield },
    { title: "Healthcare", shift: "Practitioners\n→ Care Orchestrators", icon: ic.hospital },
    { title: "Government", shift: "Administrators\n→ Citizen Stewards", icon: ic.gavel },
    { title: "Education", shift: "Instructors\n→ Learning Architects", icon: ic.grad },
    { title: "Manufacturing", shift: "Operators\n→ Systems Conductors", icon: ic.industry },
    { title: "Marketing", shift: "Creators\n→ Brand Architects", icon: ic.bullhorn },
  ];
  // Row 1: 4 items, Row 2: 3 centered
  indData.forEach((ind, i) => {
    let x, y;
    if (i < 4) {
      x = 0.5 + i * 2.35;
      y = 1.3;
    } else {
      x = 1.7 + (i - 4) * 2.35;
      y = 3.45;
    }
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 1.85, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addImage({ data: ind.icon, x: x + 0.75, y: y + 0.15, w: 0.5, h: 0.5 });
    s.addText(ind.title, { x, y: y + 0.7, w: 2.1, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, align: "center" });
    s.addText(ind.shift, { x: x + 0.1, y: y + 1.05, w: 1.9, h: 0.7, fontSize: 10, fontFace: "Calibri", color: C.gray60, align: "center", lineSpacingMultiple: 1.3 });
  });

  // ════════════════════════════════════════════
  // SLIDE 26: EMERGING CONSIDERATIONS
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addText("Emerging Considerations", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });

  const emerging = [
    { title: "Agent Identity", desc: "Credit scores for agents", color: C.accent },
    { title: "Agent Economies", desc: "Machines negotiating with machines", color: C.accentAlt },
    { title: "Regulation", desc: "Frameworks for agent decisions", color: C.accentWarm },
    { title: "Emotional Design", desc: "Beyond functional competence", color: C.accentPink },
    { title: "The Last Mile", desc: "Digital decisions, physical world", color: C.accentGreen },
    { title: "Digital Divide 2.0", desc: "Agent access as the new inequality", color: C.accentRed },
  ];
  emerging.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.2;
    const y = 1.4 + row * 2.0;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 1.65, fill: { color: C.cardBg }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 0.05, fill: { color: e.color } });
    s.addText(e.title, { x, y: y + 0.35, w: 2.9, h: 0.45, fontSize: 20, fontFace: "Georgia", color: C.white, align: "center", bold: true });
    s.addText(e.desc, { x: x + 0.2, y: y + 0.85, w: 2.5, h: 0.5, fontSize: 14, fontFace: "Calibri", color: C.gray60, align: "center" });
  });

  // ════════════════════════════════════════════
  // SLIDE 27: CLOSING — THE QUESTION
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 4.3, y: 1.5, w: 1.4, h: 0.04, fill: { color: C.accent } });
  s.addText("How do humans maintain\nmeaningful control, understanding,\nand purpose in a world where\nagents do most of the work?", {
    x: 0.8, y: 1.8, w: 8.4, h: 2.5, fontSize: 36, fontFace: "Georgia",
    color: C.white, bold: true, align: "center", lineSpacingMultiple: 1.2,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.3, y: 4.4, w: 1.4, h: 0.04, fill: { color: C.accent } });
  s.addText("This is as much philosophical as it is a design question.", {
    x: 1.5, y: 4.6, w: 7, h: 0.5, fontSize: 18, fontFace: "Calibri",
    color: C.gray60, align: "center",
  });

  // ════════════════════════════════════════════
  // SLIDE 28: THANK YOU
  // ════════════════════════════════════════════
  s = blackSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.accent } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.585, w: 10, h: 0.04, fill: { color: C.accent } });
  s.addImage({ data: icW.robot, x: 4.25, y: 1.3, w: 1.5, h: 1.5 });
  s.addText("Agent Design Framework", {
    x: 0.5, y: 3.0, w: 9, h: 0.8, fontSize: 36, fontFace: "Georgia",
    color: C.white, bold: true, align: "center",
  });
  s.addText("Designed for the next paradigm of work.", {
    x: 1.5, y: 3.8, w: 7, h: 0.5, fontSize: 18, fontFace: "Calibri",
    color: C.accent, align: "center",
  });

  // ── Write ──
  const out = "./Agent_Design_Framework_Elite.pptx";
  await pres.writeFile({ fileName: out });
  console.log(`✅ ${out} saved (${pres.slides.length} slides)`);
}

main().catch(console.error);
