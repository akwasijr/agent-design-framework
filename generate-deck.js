const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRobot, FaUserTie, FaChartLine, FaShieldAlt, FaCogs, FaLightbulb,
  FaHospital, FaUniversity, FaIndustry, FaGavel, FaGraduationCap,
  FaBullhorn, FaHandshake, FaEye, FaComments, FaLayerGroup,
  FaArrowRight, FaCheck, FaExclamationTriangle, FaBrain,
  FaUsers, FaProjectDiagram, FaClipboardCheck, FaSlidersH,
  FaHeart, FaBalanceScale, FaTachometerAlt, FaRegHandshake,
  FaCode, FaStore, FaGlobe
} = require("react-icons/fa");

// --- Color Palette: Deep Teal + Cyan ---
const C = {
  bgDark: "0C1222",
  bgCard: "162032",
  bgLight: "F0F4F8",
  accent: "06B6D4",
  accentAlt: "8B5CF6",
  accentWarm: "F59E0B",
  textLight: "F1F5F9",
  textMuted: "94A3B8",
  textDark: "1E293B",
  white: "FFFFFF",
  cardBorder: "1E3A5F",
};

// --- Icon helper ---
function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// --- Shadow factory ---
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.25,
});

// --- Slide helpers ---
function addPageNum(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 8.8, y: 5.2, w: 1, h: 0.3,
    fontSize: 9, color: C.textMuted, align: "right", fontFace: "Calibri",
  });
}

function darkSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.bgDark };
  return s;
}

// --- MAIN ---
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Studio42 / Agent Design Framework";
  pres.title = "Agent Design Framework";

  const TOTAL = 22;
  let slideNum = 0;

  // Pre-render icons
  const icons = {};
  const iconMap = {
    robot: FaRobot, userTie: FaUserTie, chart: FaChartLine, shield: FaShieldAlt,
    cogs: FaCogs, lightbulb: FaLightbulb, hospital: FaHospital, bank: FaUniversity,
    industry: FaIndustry, gavel: FaGavel, grad: FaGraduationCap, bullhorn: FaBullhorn,
    handshake: FaHandshake, eye: FaEye, comments: FaComments, layers: FaLayerGroup,
    arrow: FaArrowRight, check: FaCheck, warning: FaExclamationTriangle, brain: FaBrain,
    users: FaUsers, project: FaProjectDiagram, clipboard: FaClipboardCheck,
    sliders: FaSlidersH, heart: FaHeart, balance: FaBalanceScale,
    tachometer: FaTachometerAlt, code: FaCode, store: FaStore, globe: FaGlobe,
  };
  for (const [key, Comp] of Object.entries(iconMap)) {
    icons[key] = await iconToBase64(Comp, `#${C.accent}`, 256);
  }
  const iconWhite = {};
  for (const [key, Comp] of Object.entries(iconMap)) {
    iconWhite[key] = await iconToBase64(Comp, `#${C.white}`, 256);
  }

  // ===== SLIDE 1: TITLE =====
  slideNum++;
  let slide = darkSlide(pres);
  // Large accent bar top
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  slide.addImage({ data: iconWhite.robot, x: 0.7, y: 1.3, w: 0.7, h: 0.7 });
  slide.addText("Agent Design\nFramework", {
    x: 0.7, y: 2.1, w: 8, h: 1.6, fontSize: 44, fontFace: "Georgia",
    color: C.white, bold: true, lineSpacingMultiple: 1.1,
  });
  slide.addText("A Thinking Framework for Agent-Managed Work", {
    x: 0.7, y: 3.7, w: 8, h: 0.5, fontSize: 18, fontFace: "Calibri",
    color: C.accent, italic: true,
  });
  slide.addText("Every knowledge worker becomes a manager.\nThe product they use is a management tool.\nThe skill they need is judgment, not execution.", {
    x: 0.7, y: 4.4, w: 7, h: 0.9, fontSize: 12, fontFace: "Calibri",
    color: C.textMuted, lineSpacingMultiple: 1.4,
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 2: THE GAP =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("The Problem", {
    x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 32, fontFace: "Georgia",
    color: C.white, bold: true,
  });
  slide.addText("Agent technology is advancing rapidly, but design thinking hasn't kept up.", {
    x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.accent,
  });
  // 3 cards
  const gaps = [
    { title: "Experience Layer", desc: "No design language for agent-managed work. We're using task-based interfaces for a world beyond tasks.", icon: icons.eye },
    { title: "Accessibility Layer", desc: "Agent creation is a technical skill. If agents are the future of all work, creating them must be universally accessible.", icon: icons.users },
    { title: "Governance Layer", desc: "No standard for defining agent boundaries, auditing decisions, or assigning responsibility.", icon: icons.shield },
  ];
  gaps.forEach((g, i) => {
    const y = 1.9 + i * 1.15;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 1.0, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addImage({ data: g.icon, x: 1.0, y: y + 0.22, w: 0.5, h: 0.5 });
    slide.addText(g.title, { x: 1.7, y: y + 0.08, w: 7, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(g.desc, { x: 1.7, y: y + 0.43, w: 7.3, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 3: CORE INSIGHT =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("The Core Insight", {
    x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("From Doing to Managing", {
    x: 0.7, y: 1.0, w: 8, h: 0.4, fontSize: 18, fontFace: "Calibri", color: C.accent,
  });
  // Big quote
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.6, w: 8.6, h: 1.0, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.6, w: 0.06, h: 1.0, fill: { color: C.accentAlt } });
  slide.addText("Work is shifting from doing to managing. Every knowledge worker becomes a manager — not of people, but of agents.", {
    x: 1.1, y: 1.65, w: 7.9, h: 0.9, fontSize: 14, fontFace: "Georgia", color: C.white, italic: true, valign: "middle",
  });

  // Before/After columns
  slide.addText("TODAY: You Do the Work", { x: 0.7, y: 2.85, w: 4, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.textMuted, bold: true, margin: 0 });
  slide.addText("TOMORROW: You Manage Agents", { x: 5.3, y: 2.85, w: 4.3, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });

  const shifts = [
    ["Loan officer processes applications", "Sets risk parameters, reviews edge cases"],
    ["Marketing mgr creates campaigns", "Defines brand direction, reviews strategy"],
    ["Doctor documents encounters", "Oversees agent care team, focuses on complex diagnosis"],
    ["Teacher grades assignments", "Designs learning journeys, agents handle delivery"],
  ];
  shifts.forEach((s, i) => {
    const y = 3.25 + i * 0.5;
    slide.addText(s[0], { x: 0.7, y, w: 4.3, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    slide.addImage({ data: icons.arrow, x: 4.95, y: y + 0.05, w: 0.25, h: 0.25 });
    slide.addText(s[1], { x: 5.3, y, w: 4.3, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.white, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 4: ROLE TRANSFORMATION =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Role Transformation", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Every role shifts from execution to oversight", {
    x: 0.7, y: 0.9, w: 8, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.accent,
  });
  const roles = [
    ["Processor", "Governor", "Doing → Overseeing"],
    ["Creator", "Creative Director", "Making → Directing"],
    ["Practitioner", "Care Architect", "Treating → Orchestrating"],
    ["Researcher", "Research Director", "Executing → Designing"],
    ["Administrator", "Public Steward", "Processing → Governing"],
    ["Instructor", "Learning Architect", "Teaching → Designing"],
  ];
  // Header
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.45, w: 8.6, h: 0.4, fill: { color: C.accent } });
  slide.addText("Role Today", { x: 0.7, y: 1.45, w: 2.87, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.bgDark, bold: true, align: "center", valign: "middle" });
  slide.addText("Role Tomorrow", { x: 3.57, y: 1.45, w: 2.87, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.bgDark, bold: true, align: "center", valign: "middle" });
  slide.addText("Core Shift", { x: 6.43, y: 1.45, w: 2.87, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.bgDark, bold: true, align: "center", valign: "middle" });
  roles.forEach((r, i) => {
    const y = 1.85 + i * 0.55;
    const bg = i % 2 === 0 ? C.bgCard : C.bgDark;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.5, fill: { color: bg } });
    slide.addText(r[0], { x: 0.7, y, w: 2.87, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.textMuted, align: "center", valign: "middle" });
    slide.addText(r[1], { x: 3.57, y, w: 2.87, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle" });
    slide.addText(r[2], { x: 6.43, y, w: 2.87, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.accent, align: "center", valign: "middle" });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 5: EVOLUTION OVERVIEW =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("The Evolution", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Three phases from developer tools to agent-native products", {
    x: 0.7, y: 0.9, w: 8, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.accent,
  });
  const phases = [
    { n: "01", title: "Developer Tools", sub: "WHERE WE ARE NOW", desc: "Agents live in the domain of engineers. Creating one means writing code and stitching together frameworks.", color: C.accent },
    { n: "02", title: "Agent Platforms", sub: "THE DEMOCRATIZATION WINDOW", desc: "Agents break out of the developer world. No-code builders, standardized observability, governance as product feature.", color: C.accentAlt },
    { n: "03", title: "Agent-Native Products", sub: "THE NEW DEFAULT", desc: "Products designed from the ground up for agent-managed work. Agents become the primary interface.", color: C.accentWarm },
  ];
  phases.forEach((p, i) => {
    const x = 0.7 + i * 3.1;
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.6, w: 2.8, h: 3.5, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.6, w: 2.8, h: 0.06, fill: { color: p.color } });
    slide.addText(p.n, { x, y: 1.8, w: 2.8, h: 0.6, fontSize: 36, fontFace: "Georgia", color: p.color, align: "center", bold: true });
    slide.addText(p.title, { x, y: 2.4, w: 2.8, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", bold: true });
    slide.addText(p.sub, { x: x + 0.2, y: 2.8, w: 2.4, h: 0.3, fontSize: 8, fontFace: "Calibri", color: p.color, align: "center", charSpacing: 2 });
    slide.addText(p.desc, { x: x + 0.2, y: 3.2, w: 2.4, h: 1.6, fontSize: 11, fontFace: "Calibri", color: C.textMuted, align: "center", lineSpacingMultiple: 1.3 });
  });
  // Arrows between phases
  slide.addImage({ data: icons.arrow, x: 3.3, y: 3.1, w: 0.35, h: 0.35 });
  slide.addImage({ data: icons.arrow, x: 6.4, y: 3.1, w: 0.35, h: 0.35 });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 6: PHASE 1 DETAIL =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Phase 1: Developer Tools", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 28, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Where We Are Now", { x: 0.7, y: 0.9, w: 4, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const p1items = [
    { title: "Access Is Technical", desc: "Requires programming knowledge, configuration via code or YAML" },
    { title: "Observability Is Primitive", desc: "Logging exists but isn't human-readable; no standard visibility" },
    { title: "Guardrails Are Ad Hoc", desc: "Safety measures per-project with no industry standards" },
    { title: "Agents Are Siloed", desc: "Each agent does one thing in one context; collaboration barely exists" },
  ];
  p1items.forEach((item, i) => {
    const y = 1.5 + i * 0.95;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 5.3, h: 0.8, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.8, fill: { color: C.accent } });
    slide.addText(item.title, { x: 1.0, y: y + 0.05, w: 4.8, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(item.desc, { x: 1.0, y: y + 0.38, w: 4.8, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });

  // Right side: what's missing
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 1.5, w: 3.2, h: 3.6, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 1.5, w: 3.2, h: 0.06, fill: { color: C.accentWarm } });
  slide.addText("What's Missing", { x: 6.5, y: 1.65, w: 2.8, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.accentWarm, bold: true, margin: 0 });
  const missing = ["Non-technical access", "Trust infrastructure", "Management interfaces", "Governance frameworks"];
  missing.forEach((m, i) => {
    slide.addImage({ data: icons.warning, x: 6.5, y: 2.2 + i * 0.6, w: 0.25, h: 0.25 });
    slide.addText(m, { x: 6.9, y: 2.17 + i * 0.6, w: 2.4, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 7: PHASE 2 DETAIL =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accentAlt } });
  slide.addText("Phase 2: Agent Platforms", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 28, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("The Democratization Window", { x: 0.7, y: 0.9, w: 5, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accentAlt });

  const p2items = [
    { icon: icons.code, title: "No-Code Agent Creation", desc: "Visual builders and templates replace coding. The barrier shifts from 'can you code?' to 'can you describe what you want?'" },
    { icon: icons.eye, title: "Standardized Observability", desc: "Common patterns for agent activity, decisions, and status. Agent dashboards become a product category." },
    { icon: icons.shield, title: "Governance as Product Feature", desc: "Guardrails configurable through interfaces. Permissions, limits, escalation rules become standard." },
    { icon: icons.globe, title: "Cross-System Agents", desc: "Agents work across email, calendar, CRM, and docs. Integration ecosystems emerge." },
    { icon: icons.userTie, title: "Agent Manager Role", desc: "Organizations hire people to manage agent fleets — a management role, not a technical one." },
  ];
  p2items.forEach((item, i) => {
    const y = 1.4 + i * 0.78;
    slide.addImage({ data: item.icon, x: 0.8, y: y + 0.1, w: 0.4, h: 0.4 });
    slide.addText(item.title, { x: 1.4, y: y + 0.02, w: 8, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(item.desc, { x: 1.4, y: y + 0.35, w: 8, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 8: PHASE 3 DETAIL =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accentWarm } });
  slide.addText("Phase 3: Agent-Native Products", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 28, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("The New Default", { x: 0.7, y: 0.9, w: 4, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accentWarm });

  // Left: characteristics
  const p3chars = [
    "Products become agent-consumable services — many lose their traditional UI",
    "Agent marketplaces with ratings, compliance certs, and benchmarks",
    "Agent-to-agent collaboration across organizations at machine speed",
    "Institutional agent knowledge — when employees leave, agents and knowledge remain",
    "Industry-specific regulations and real-time auditing at scale",
  ];
  p3chars.forEach((c, i) => {
    const y = 1.5 + i * 0.6;
    slide.addImage({ data: icons.check, x: 0.7, y: y + 0.03, w: 0.22, h: 0.22 });
    slide.addText(c, { x: 1.05, y, w: 5, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });

  // Right: Human experience card
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: 1.5, w: 3.3, h: 3.5, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: 1.5, w: 3.3, h: 0.06, fill: { color: C.accentWarm } });
  slide.addText("The Human Experience", { x: 6.4, y: 1.65, w: 2.9, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.accentWarm, bold: true, margin: 0 });
  const humanExp = [
    "Review & direct agent work",
    "Focus on human-only work: creativity, relationships, ethics",
    "Tune the system: adjust strategies and performance",
    "Continuous alignment through feedback loops",
  ];
  humanExp.forEach((h, i) => {
    slide.addText(`→  ${h}`, { x: 6.4, y: 2.2 + i * 0.7, w: 2.9, h: 0.55, fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0, lineSpacingMultiple: 1.2 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 9: TODAY VS FUTURE =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Today vs. Future", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });

  // Two column comparison
  const comparisons = [
    ["Open app, navigate to what you need", "Agent briefs you on what matters"],
    ["Click, type, select from menus", "Express intent in natural language"],
    ["You pull: search, filter, browse", "Agents push: surface what's relevant"],
    ["Switch between 5-10 apps", "One surface, agents work underneath"],
    ["You troubleshoot and retry", "Agent handles retries, escalates what it can't"],
    ["Toggle settings and preferences", "Agent learns from behavior and feedback"],
  ];
  // Headers
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.2, w: 4.0, h: 0.4, fill: { color: C.bgCard } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.2, w: 4.2, h: 0.4, fill: { color: "0E3A4A" } });
  slide.addText("TODAY", { x: 0.7, y: 1.2, w: 4.0, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textMuted, bold: true, align: "center", valign: "middle" });
  slide.addText("AGENT-MANAGED FUTURE", { x: 5.3, y: 1.2, w: 4.2, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle" });

  comparisons.forEach((c, i) => {
    const y = 1.65 + i * 0.58;
    const bg = i % 2 === 0 ? C.bgCard : C.bgDark;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 4.0, h: 0.52, fill: { color: bg } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y, w: 4.2, h: 0.52, fill: { color: bg } });
    slide.addText(c[0], { x: 0.9, y, w: 3.6, h: 0.52, fontSize: 10, fontFace: "Calibri", color: C.textMuted, valign: "middle" });
    slide.addImage({ data: icons.arrow, x: 4.85, y: y + 0.13, w: 0.25, h: 0.25 });
    slide.addText(c[1], { x: 5.5, y, w: 3.8, h: 0.52, fontSize: 10, fontFace: "Calibri", color: C.white, valign: "middle" });
  });

  // Bottom statement
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 5.0, w: 8.6, h: 0.06, fill: { color: C.accent } });
  slide.addText("Today's products are tools you operate. Future products are teams you manage.", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35, fontSize: 12, fontFace: "Georgia", color: C.accent, italic: true, align: "center",
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 10: WHAT DISAPPEARS / EMERGES =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("The Interface Shift", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });

  // Left: What Disappears
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.2, w: 4.2, h: 3.9, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.2, w: 4.2, h: 0.06, fill: { color: "EF4444" } });
  slide.addText("What Disappears", { x: 0.9, y: 1.35, w: 3.8, h: 0.35, fontSize: 15, fontFace: "Calibri", color: "EF4444", bold: true, margin: 0 });
  const disappears = ["Navigation menus", "Search bars", "Forms and data entry", "Notification overload", "Dashboards you check", "Settings panels"];
  disappears.forEach((d, i) => {
    slide.addText(`✕  ${d}`, { x: 0.9, y: 1.85 + i * 0.5, w: 3.8, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });

  // Right: What Emerges
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.2, w: 4.2, h: 3.9, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.2, w: 4.2, h: 0.06, fill: { color: "22C55E" } });
  slide.addText("What Emerges", { x: 5.5, y: 1.35, w: 3.8, h: 0.35, fontSize: 15, fontFace: "Calibri", color: "22C55E", bold: true, margin: 0 });
  const emerges = ["The briefing — curated summary", "Proposal cards — agent recommendations", "Exception queue — only what needs you", "Trust dial — adjustable autonomy", "Choreography map — agent coordination", "Teaching moments — natural feedback"];
  emerges.forEach((e, i) => {
    slide.addText(`→  ${e}`, { x: 5.5, y: 1.85 + i * 0.5, w: 3.8, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 11: A DAY WITH AGENTS =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("A Day With Agents", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Insurance Claims Manager", { x: 0.7, y: 0.9, w: 5, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  // Morning briefing card
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.4, w: 8.6, h: 1.4, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addText("Morning Briefing", { x: 0.9, y: 1.45, w: 3, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
  slide.addText("84 claims processed overnight", { x: 0.9, y: 1.8, w: 3, h: 0.25, fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0 });
  // Stats
  const stats = [
    { n: "72", label: "Resolved", color: "22C55E" },
    { n: "7", label: "Declined", color: C.textMuted },
    { n: "5", label: "Escalated to You", color: C.accentWarm },
  ];
  stats.forEach((s, i) => {
    const x = 5.0 + i * 1.5;
    slide.addText(s.n, { x, y: 1.5, w: 1.2, h: 0.55, fontSize: 32, fontFace: "Georgia", color: s.color, align: "center", bold: true });
    slide.addText(s.label, { x, y: 2.05, w: 1.2, h: 0.3, fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center" });
  });

  // Midday
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.0, w: 4.2, h: 1.4, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.0, w: 0.06, h: 1.4, fill: { color: C.accentWarm } });
  slide.addText("Midday: Fraud Pattern", { x: 0.95, y: 3.05, w: 3.7, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.accentWarm, bold: true, margin: 0 });
  slide.addText("Agent flags pattern across 3 unrelated claims. Presents evidence with confidence levels and two explanations. You assign investigation agent with parameters.", {
    x: 0.95, y: 3.4, w: 3.7, h: 0.9, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0, lineSpacingMultiple: 1.3,
  });

  // Afternoon
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.0, w: 4.3, h: 1.4, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.0, w: 0.06, h: 1.4, fill: { color: C.accentAlt } });
  slide.addText("Afternoon: Performance", { x: 5.45, y: 3.05, w: 3.8, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.accentAlt, bold: true, margin: 0 });
  slide.addText("Accuracy: 98.7% (↑ from 97.2%)\nResolution time: 4.2h (↓ from 6.1h)\nSatisfaction: 4.3/5\nOne agent underperforming — corrective feedback", {
    x: 5.45, y: 3.4, w: 3.8, h: 0.9, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0, lineSpacingMultiple: 1.3,
  });

  // Bottom
  slide.addText("45 minutes of judgment work. Zero paperwork.", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35, fontSize: 13, fontFace: "Georgia", color: C.accent, italic: true, align: "center",
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 12: 3 INTERACTION MODES =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Three Interaction Modes", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("How humans actually interact with agents", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const modes = [
    { title: "Delegate", desc: "Set the goal and walk away. Agent works independently and reports back.", use: "Routine, well-defined, low-risk work", color: C.accent, icon: icons.arrow },
    { title: "Supervise", desc: "Agent works, you watch and step in when needed. Like reviewing a junior employee.", use: "Important work where agent is earning trust", color: C.accentAlt, icon: icons.eye },
    { title: "Collaborate", desc: "Work together in real-time. Neither fully in charge — it's a back-and-forth.", use: "Creative, strategic, or complex work", color: C.accentWarm, icon: icons.users },
  ];
  modes.forEach((m, i) => {
    const x = 0.7 + i * 3.1;
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.8, h: 3.5, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.8, h: 0.06, fill: { color: m.color } });
    slide.addImage({ data: m.icon, x: x + 1.1, y: 1.75, w: 0.55, h: 0.55 });
    slide.addText(m.title, { x, y: 2.4, w: 2.8, h: 0.4, fontSize: 18, fontFace: "Calibri", color: C.white, bold: true, align: "center" });
    slide.addText(m.desc, { x: x + 0.2, y: 2.9, w: 2.4, h: 1.0, fontSize: 10, fontFace: "Calibri", color: C.textMuted, align: "center", lineSpacingMultiple: 1.3 });
    slide.addText(`Best for: ${m.use}`, { x: x + 0.2, y: 4.1, w: 2.4, h: 0.6, fontSize: 9, fontFace: "Calibri", color: m.color, italic: true, align: "center" });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 13: AGENT ANATOMY =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Designing the Agent", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Agents are products with their own design requirements", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const anatomy = [
    { title: "Personality", desc: "Tone, verbosity, confidence, initiative, transparency", icon: icons.heart, color: "EC4899" },
    { title: "Capabilities", desc: "What it can do, tools it can access", icon: icons.cogs, color: C.accent },
    { title: "Boundaries", desc: "What it won't do, escalation triggers", icon: icons.shield, color: "EF4444" },
    { title: "Interface", desc: "Status, confidence signals, progressive disclosure", icon: icons.comments, color: C.accentAlt },
    { title: "Memory", desc: "Working, preference, domain, interaction history", icon: icons.brain, color: C.accentWarm },
  ];
  // 2x3 grid (5 items)
  anatomy.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.7 + col * 3.1;
    const y = 1.5 + row * 2.0;
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 1.7, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 0.05, fill: { color: a.color } });
    slide.addImage({ data: a.icon, x: x + 0.2, y: y + 0.2, w: 0.4, h: 0.4 });
    slide.addText(a.title, { x: x + 0.2, y: y + 0.65, w: 2.4, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(a.desc, { x: x + 0.2, y: y + 1.0, w: 2.4, h: 0.55, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0, lineSpacingMultiple: 1.3 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 14: COMMAND CENTER =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Command Center", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Your workday starts differently", { x: 0.7, y: 0.9, w: 5, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const ccItems = [
    { title: "Completed Work", desc: "12 claims processed. 3 inquiries resolved. 1 report generated.", icon: icons.check, color: "22C55E" },
    { title: "Pending Decisions", desc: "2 items need your judgment.", icon: icons.clipboard, color: C.accentWarm },
    { title: "Blocked Items", desc: "1 agent stuck — situation outside its guidelines.", icon: icons.warning, color: "EF4444" },
    { title: "Performance Signals", desc: "Claim processing time improved 15% this week.", icon: icons.chart, color: C.accentAlt },
    { title: "Exception Queue", desc: "Things agents couldn't handle alone: judgment, ethics, authority, creativity, empathy.", icon: icons.balance, color: C.accent },
  ];
  ccItems.forEach((item, i) => {
    const y = 1.4 + i * 0.78;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.65, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.65, fill: { color: item.color } });
    slide.addImage({ data: item.icon, x: 1.0, y: y + 0.12, w: 0.35, h: 0.35 });
    slide.addText(item.title, { x: 1.55, y: y + 0.03, w: 3, h: 0.28, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(item.desc, { x: 1.55, y: y + 0.32, w: 7.5, h: 0.28, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });

  slide.addText("One surface replaces the fragmented multi-app experience.", {
    x: 0.7, y: 5.1, w: 8.6, h: 0.3, fontSize: 11, fontFace: "Georgia", color: C.accent, italic: true, align: "center",
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 15: APPROVAL FLOW =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("The Approval Flow", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("The core UX primitive of agent-managed work", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  // Flow: Agent Proposes → Human Reviews → Decision → Agent Learns
  const flowSteps = [
    { label: "Agent\nProposes", color: C.accent },
    { label: "Human\nReviews", color: C.accentAlt },
    { label: "Approve /\nAdjust / Reject", color: C.accentWarm },
    { label: "Agent\nLearns", color: "22C55E" },
  ];
  flowSteps.forEach((fs, i) => {
    const x = 0.7 + i * 2.4;
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.0, h: 0.9, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.0, h: 0.05, fill: { color: fs.color } });
    slide.addText(fs.label, { x, y: 1.6, w: 2.0, h: 0.75, fontSize: 11, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", bold: true });
    if (i < 3) slide.addImage({ data: icons.arrow, x: x + 2.05, y: 1.8, w: 0.3, h: 0.3 });
  });

  // Proposal card anatomy
  slide.addText("The Proposal Card", { x: 0.7, y: 2.7, w: 4, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  const cardItems = [
    { label: "What", desc: "Proposed action" },
    { label: "Why", desc: "Agent's reasoning" },
    { label: "Risk", desc: "What could go wrong" },
    { label: "Alternatives", desc: "Other options" },
    { label: "Urgency", desc: "Time-sensitivity" },
  ];
  cardItems.forEach((ci, i) => {
    const y = 3.15 + i * 0.4;
    slide.addText(ci.label, { x: 0.9, y, w: 1.2, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
    slide.addText(ci.desc, { x: 2.1, y, w: 3, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });

  // Trust spectrum
  slide.addText("Trust Spectrum", { x: 5.5, y: 2.7, w: 4, h: 0.35, fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  const trust = [
    { level: "New", desc: "Every action requires approval" },
    { level: "Building", desc: "Major decisions need approval" },
    { level: "Established", desc: "Only exceptions surface" },
    { level: "High Trust", desc: "Agent acts independently" },
  ];
  trust.forEach((t, i) => {
    const y = 3.15 + i * 0.45;
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 4.0, h: 0.38, fill: { color: C.bgCard } });
    slide.addText(t.level, { x: 5.6, y, w: 1.4, h: 0.38, fontSize: 10, fontFace: "Calibri", color: C.accent, bold: true, valign: "middle", margin: 0 });
    slide.addText(t.desc, { x: 7.0, y, w: 2.4, h: 0.38, fontSize: 10, fontFace: "Calibri", color: C.textMuted, valign: "middle", margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 16: AMBIENT AWARENESS =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Ambient Awareness", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("From active monitoring to peripheral consciousness", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  // Urgency/Confidence matrix - 2x2
  slide.addText("Urgency / Confidence Matrix", { x: 0.7, y: 1.4, w: 5, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  const matrix = [
    { label: "High Urgency + Low Confidence", action: "Interrupt Immediately", color: "EF4444", x: 0.7, y: 1.9 },
    { label: "High Urgency + High Confidence", action: "Brief Notification", color: C.accentWarm, x: 4.9, y: 1.9 },
    { label: "Low Urgency + Low Confidence", action: "Queue for Review", color: C.accentAlt, x: 0.7, y: 2.95 },
    { label: "Low Urgency + High Confidence", action: "Handle Silently", color: "22C55E", x: 4.9, y: 2.95 },
  ];
  matrix.forEach((m) => {
    slide.addShape(pres.shapes.RECTANGLE, { x: m.x, y: m.y, w: 4.0, h: 0.9, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: m.x, y: m.y, w: 0.06, h: 0.9, fill: { color: m.color } });
    slide.addText(m.label, { x: m.x + 0.2, y: m.y + 0.05, w: 3.6, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    slide.addText(m.action, { x: m.x + 0.2, y: m.y + 0.42, w: 3.6, h: 0.35, fontSize: 13, fontFace: "Calibri", color: m.color, bold: true, margin: 0 });
  });

  // Bottom key insight
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 1.0, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addText("Silence should feel like competence, not absence.", {
    x: 1.0, y: 4.25, w: 8, h: 0.4, fontSize: 14, fontFace: "Georgia", color: C.accent, italic: true, margin: 0,
  });
  slide.addText("Periodic summaries, anomaly absence confirmation, and performance trends ensure quiet routine work builds — rather than erodes — trust.", {
    x: 1.0, y: 4.7, w: 8, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0,
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 17: MULTI-AGENT CHOREOGRAPHY =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Multi-Agent Choreography", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("When agents work as teams", { x: 0.7, y: 0.9, w: 5, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  // Flow visualization
  const agents = [
    { name: "Intake", x: 0.7 },
    { name: "Triage", x: 2.6 },
    { name: "Assess", x: 4.5 },
    { name: "Schedule", x: 6.4 },
    { name: "Follow-up", x: 8.3 },
  ];
  agents.forEach((a) => {
    slide.addShape(pres.shapes.RECTANGLE, { x: a.x, y: 1.5, w: 1.5, h: 0.7, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: a.x, y: 1.5, w: 1.5, h: 0.05, fill: { color: C.accent } });
    slide.addText(a.name, { x: a.x, y: 1.6, w: 1.5, h: 0.55, fontSize: 11, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", bold: true });
  });
  // Arrows
  for (let i = 0; i < 4; i++) {
    slide.addImage({ data: icons.arrow, x: agents[i].x + 1.55, y: 1.7, w: 0.25, h: 0.25 });
  }

  // Key concepts
  const choreo = [
    { title: "Flow Visualization", desc: "See flow between agents, not each individually. Think orchestra conductor's score." },
    { title: "Handoff Points", desc: "Where information is lost, approaches conflict, and human oversight is most valuable." },
    { title: "Conflict Resolution", desc: "When agents have competing priorities, surface trade-offs for human decision." },
    { title: "Team Composition", desc: "Manage agent teams like human teams: hiring, roles, communication, performance." },
  ];
  choreo.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 4.5;
    const y = 2.6 + row * 1.3;
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.2, h: 1.1, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addText(c.title, { x: x + 0.2, y: y + 0.08, w: 3.8, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(c.desc, { x: x + 0.2, y: y + 0.42, w: 3.8, h: 0.55, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0, lineSpacingMultiple: 1.3 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 18: 5 DESIGN PRINCIPLES =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Design Principles", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Five principles for agent-managed product design", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const principles = [
    { n: "01", title: "Outcomes Over Processes", desc: "Show what was achieved, not how. Human attention goes to results, not steps.", color: C.accent },
    { n: "02", title: "Exceptions Over Routine", desc: "Surface what's unusual, hide what's normal. Only interrupt when genuinely needed.", color: C.accentAlt },
    { n: "03", title: "Trust Building Over Time", desc: "Trust is earned incrementally through demonstrated competence, not toggled on.", color: "22C55E" },
    { n: "04", title: "Values Over Settings", desc: "Express boundaries as human values, not technical parameters or config panels.", color: C.accentWarm },
    { n: "05", title: "Agent Creation as Document Creation", desc: "Creating an agent should be as natural as making a spreadsheet. Domain expertise, not code.", color: "EC4899" },
  ];
  principles.forEach((p, i) => {
    const y = 1.45 + i * 0.78;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.65, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.65, fill: { color: p.color } });
    slide.addText(p.n, { x: 0.9, y, w: 0.6, h: 0.65, fontSize: 20, fontFace: "Georgia", color: p.color, bold: true, valign: "middle", margin: 0 });
    slide.addText(p.title, { x: 1.6, y: y + 0.03, w: 7.4, h: 0.28, fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(p.desc, { x: 1.6, y: y + 0.33, w: 7.4, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 19: INDUSTRIES =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Industry Perspectives", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Agent-managed work across sectors", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const industries = [
    { title: "Banking & Finance", shift: "Transaction Processors → Financial Governors", icon: icons.bank },
    { title: "Insurance", shift: "Claims Assessors → Risk Adjudicators", icon: icons.shield },
    { title: "Healthcare", shift: "Practitioners → Care Orchestrators", icon: icons.hospital },
    { title: "Government", shift: "Administrators → Citizen Stewards", icon: icons.gavel },
    { title: "Education", shift: "Instructors → Learning Architects", icon: icons.grad },
    { title: "Manufacturing", shift: "Plant Operators → Systems Conductors", icon: icons.industry },
    { title: "Marketing", shift: "Campaign Creators → Brand Architects", icon: icons.bullhorn },
  ];
  industries.forEach((ind, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.7 + col * 2.3;
    const y = 1.5 + row * 2.0;
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 1.75, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addImage({ data: ind.icon, x: x + 0.75, y: y + 0.15, w: 0.5, h: 0.5 });
    slide.addText(ind.title, { x: x + 0.1, y: y + 0.7, w: 1.9, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.white, bold: true, align: "center", margin: 0 });
    slide.addText(ind.shift, { x: x + 0.1, y: y + 1.05, w: 1.9, h: 0.6, fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center", lineSpacingMultiple: 1.2, margin: 0 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 20: ACCESSIBILITY =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Accessibility & Creation", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Agent creation as natural as making a spreadsheet", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  // Spectrum
  const spectrum = [
    { level: "Use", who: "Everyone", mode: "Conversation and approval flows" },
    { level: "Customize", who: "Knowledge workers", mode: "Teaching, feedback, natural language" },
    { level: "Compose", who: "Power users", mode: "Combine agents into workflows" },
    { level: "Create", who: "Builders", mode: "Visual tools, templates, or code" },
    { level: "Govern", who: "Administrators", mode: "Policies, permissions, compliance" },
  ];
  spectrum.forEach((s, i) => {
    const y = 1.4 + i * 0.62;
    const w = 3.5 + (i * 0.8);
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w, h: 0.5, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addText(s.level, { x: 0.9, y, w: 1.2, h: 0.5, fontSize: 13, fontFace: "Calibri", color: C.accent, bold: true, valign: "middle", margin: 0 });
    slide.addText(s.who, { x: 2.1, y, w: 1.8, h: 0.5, fontSize: 10, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0 });
    slide.addText(s.mode, { x: 3.9, y, w: w - 3.4, h: 0.5, fontSize: 10, fontFace: "Calibri", color: C.textMuted, valign: "middle", margin: 0 });
  });

  // Teaching over programming
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.6, w: 8.6, h: 0.7, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.6, w: 0.06, h: 0.7, fill: { color: C.accentAlt } });
  slide.addText("Teaching Over Programming", { x: 0.95, y: 4.62, w: 8, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.accentAlt, bold: true, margin: 0 });
  slide.addText("Demonstrate → Agent identifies pattern → You correct → Agent tries independently → You refine through feedback", {
    x: 0.95, y: 4.92, w: 8, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0,
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 21: EMERGING CONSIDERATIONS =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  slide.addText("Emerging Considerations", {
    x: 0.7, y: 0.4, w: 8, h: 0.5, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true,
  });
  slide.addText("Questions that will shape the agent-managed future", { x: 0.7, y: 0.9, w: 8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: C.accent });

  const emerging = [
    { title: "Agent Identity & Reputation", desc: "Trackable, verifiable, accountable identities. Think credit scores for agents.", icon: icons.userTie, color: C.accent },
    { title: "Agent-to-Agent Economies", desc: "When machines negotiate with machines at machine speed while humans set policies.", icon: icons.handshake, color: C.accentAlt },
    { title: "Regulatory & Compliance", desc: "Current regulations assume human decision-makers. New frameworks needed.", icon: icons.balance, color: C.accentWarm },
    { title: "Emotional Design", desc: "Functional competence isn't enough for patients, students, or distressed citizens.", icon: icons.heart, color: "EC4899" },
    { title: "The Last Mile", desc: "Bridging digital agent decisions with physical world execution.", icon: icons.globe, color: "22C55E" },
    { title: "Digital Divide 2.0", desc: "The next inequality frontier: agent access as capability amplification.", icon: icons.users, color: "EF4444" },
  ];
  emerging.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.7 + col * 3.1;
    const y = 1.5 + row * 1.9;
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 1.6, fill: { color: C.bgCard }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 0.05, fill: { color: e.color } });
    slide.addImage({ data: e.icon, x: x + 0.2, y: y + 0.15, w: 0.35, h: 0.35 });
    slide.addText(e.title, { x: x + 0.2, y: y + 0.55, w: 2.4, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    slide.addText(e.desc, { x: x + 0.2, y: y + 0.88, w: 2.4, h: 0.6, fontSize: 9, fontFace: "Calibri", color: C.textMuted, margin: 0, lineSpacingMultiple: 1.3 });
  });
  addPageNum(slide, slideNum, TOTAL);

  // ===== SLIDE 22: CLOSING =====
  slideNum++;
  slide = darkSlide(pres);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent } });

  slide.addImage({ data: iconWhite.robot, x: 4.4, y: 1.0, w: 1.1, h: 1.1 });
  slide.addText("The Design Question", {
    x: 1, y: 2.2, w: 8, h: 0.6, fontSize: 32, fontFace: "Georgia", color: C.white, bold: true, align: "center",
  });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1, y: 2.95, w: 8, h: 1.3, fill: { color: C.bgCard }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1, y: 2.95, w: 8, h: 0.06, fill: { color: C.accent } });
  slide.addText("How do humans maintain meaningful control, understanding, and purpose in a world where agents do most of the work?", {
    x: 1.3, y: 3.1, w: 7.4, h: 1.0, fontSize: 18, fontFace: "Georgia", color: C.accent, align: "center", valign: "middle", italic: true,
  });
  slide.addText("This is as much philosophical as it is a design question — and it shapes everything.", {
    x: 1, y: 4.5, w: 8, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.textMuted, align: "center",
  });
  addPageNum(slide, slideNum, TOTAL);

  // --- Write file ---
  const outPath = "./Agent_Design_Framework.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log(`✅ Presentation saved to ${outPath}`);
  console.log(`   ${TOTAL} slides generated.`);
}

main().catch(console.error);
