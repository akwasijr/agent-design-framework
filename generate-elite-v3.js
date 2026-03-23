const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRobot, FaEye, FaUsers, FaShieldAlt, FaArrowRight,
  FaCode, FaGlobe, FaCogs, FaHeart, FaBrain,
  FaComments, FaCheckCircle, FaChartLine, FaClipboardCheck,
  FaExclamationTriangle, FaBalanceScale, FaHandshake,
  FaUniversity, FaHospital, FaIndustry, FaGavel,
  FaGraduationCap, FaBullhorn, FaUserTie, FaUserCog,
  FaProjectDiagram, FaLightbulb, FaRegHandshake,
  FaSlidersH, FaRegLightbulb, FaRoute, FaLayerGroup,
} = require("react-icons/fa");

// ═══════════════════════════════════════════════════
// DESIGN SYSTEM \u2014 "Agent Future" Custom Palette
// ═══════════════════════════════════════════════════
// Content-informed: futuristic, trustworthy, AI-specific
// Would NOT work swapped into a food blog or fashion deck
const P = {
  // Dark slides (title, sections, closing)
  darkBg:    "0B1D3A",   // deep midnight blue
  darkPanel: "122B4D",   // slightly lighter panel
  // Light slides (content)
  lightBg:   "F0F4F8",   // ice white
  lightCard: "FFFFFF",   // white cards
  // Accent (sharp, topic-specific)
  accent:    "00C9A7",   // electric teal \u2014 agent/AI/future
  accentDim: "00896F",   // darker teal for circles on light bg
  // Support colors
  warmAccent: "FF6B35",  // warm orange for contrast moments
  purple:    "7C5CFC",   // secondary accent for variety
  // Text
  textWhite: "FFFFFF",
  textIce:   "C8D6E5",   // light text on dark
  textDark:  "1E293B",   // dark text on light
  textMuted: "64748B",   // muted captions
  textMutedDark: "94A3B8", // muted on dark bg
};

// Fonts \u2014 Georgia (header personality) + Calibri (clean body)
const TITLE_FONT = "Georgia";
const BODY_FONT = "Calibri";

// ═══════════════════════════════════════════════════
// ICON HELPERS
// ═══════════════════════════════════════════════════
function renderSvg(Icon, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color, size: String(size) })
  );
}
async function toB64(Icon, color, size = 256) {
  const svg = renderSvg(Icon, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ═══════════════════════════════════════════════════
// FACTORIES (fresh objects every call \u2014 prevents mutation bugs)
// ═══════════════════════════════════════════════════
const cardShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 });
const darkCardShadow = () => ({ type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.3 });

// Standard transition for every slide
const FADE = { type: "fade", speed: 0.6 };

// ═══════════════════════════════════════════════════
// VISUAL MOTIF: Icon in colored circle
// ═══════════════════════════════════════════════════
function addIconCircle(slide, iconData, x, y, size = 0.7, circleColor = P.accent) {
  const pad = size * 0.2;
  slide.addShape(slide._slideLayout ? undefined : "ellipse", {
    x, y, w: size, h: size,
    fill: { color: circleColor, transparency: 15 },
    line: { width: 0 },
  });
  slide.addImage({ data: iconData, x: x + pad/2, y: y + pad/2, w: size - pad, h: size - pad });
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Agent Design Framework";
  pres.title = "Agent Design Framework";

  // Pre-render icons in white (for dark slides) and dark (for light slides)
  const iconMap = {
    robot: FaRobot, eye: FaEye, users: FaUsers, shield: FaShieldAlt,
    arrow: FaArrowRight, code: FaCode, globe: FaGlobe, cogs: FaCogs,
    heart: FaHeart, brain: FaBrain, comments: FaComments,
    check: FaCheckCircle, chart: FaChartLine, clipboard: FaClipboardCheck,
    warning: FaExclamationTriangle, balance: FaBalanceScale,
    handshake: FaHandshake, bank: FaUniversity, hospital: FaHospital,
    industry: FaIndustry, gavel: FaGavel, grad: FaGraduationCap,
    bullhorn: FaBullhorn, userTie: FaUserTie, userCog: FaUserCog,
    project: FaProjectDiagram, lightbulb: FaLightbulb,
    sliders: FaSlidersH, route: FaRoute, layers: FaLayerGroup,
  };
  const iW = {}, iD = {};
  for (const [k, v] of Object.entries(iconMap)) {
    iW[k] = await toB64(v, "#FFFFFF", 256);
    iD[k] = await toB64(v, `#${P.textDark}`, 256);
  }

  let s;

  // Helper: icon in circle on dark slide
  function iconCircleDark(slide, iconKey, x, y, sz = 0.65) {
    slide.addShape(pres.shapes.OVAL, {
      x, y, w: sz, h: sz,
      fill: { color: P.accent, transparency: 15 },
    });
    const pad = sz * 0.22;
    slide.addImage({ data: iW[iconKey], x: x+pad, y: y+pad, w: sz-pad*2, h: sz-pad*2 });
  }
  // icon in circle on light slide
  function iconCircleLight(slide, iconKey, x, y, sz = 0.65) {
    slide.addShape(pres.shapes.OVAL, {
      x, y, w: sz, h: sz,
      fill: { color: P.accentDim, transparency: 10 },
    });
    const pad = sz * 0.22;
    slide.addImage({ data: iW[iconKey], x: x+pad, y: y+pad, w: sz-pad*2, h: sz-pad*2 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 1: HERO TITLE (DARK)
  // Layout: Big centered title + icon + decorative shape
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  // Decorative: large faded circle (visual interest)
  s.addShape(pres.shapes.OVAL, {
    x: 6.5, y: -1.5, w: 5.5, h: 5.5,
    fill: { color: P.accent, transparency: 90 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: -2, y: 3, w: 4, h: 4,
    fill: { color: P.purple, transparency: 92 },
  });
  // Icon
  iconCircleDark(s, "robot", 4.5, 0.7, 1.0);
  // Title
  s.addText("Agent Design\nFramework", {
    x: 0.8, y: 1.9, w: 8.4, h: 1.8,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    align: "center", lineSpacingMultiple: 1.1,
  });
  // Subtitle
  s.addText("A Thinking Framework for Agent-Managed Work", {
    x: 1.5, y: 3.8, w: 7, h: 0.5,
    fontSize: 18, fontFace: BODY_FONT, color: P.accent, align: "center",
  });
  s.addText("Every knowledge worker becomes a manager. The skill they need is judgment, not execution.", {
    x: 1.5, y: 4.5, w: 7, h: 0.5,
    fontSize: 12, fontFace: BODY_FONT, color: P.textMutedDark, align: "center", italic: true,
  });

  // ─────────────────────────────────────────────
  // SLIDE 2: BIG QUOTE (DARK)
  // Layout: Large centered quote with decorative quote marks
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  // Decorative large quote mark
  s.addText("\u201C", {
    x: 0.5, y: 0.3, w: 2, h: 2,
    fontSize: 120, fontFace: TITLE_FONT, color: P.accent, bold: true, margin: 0,
  });
  s.addText("Every knowledge worker\nbecomes a manager.\nNot of people \u2014 of agents.", {
    x: 1.2, y: 1.5, w: 7.6, h: 2.5,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.3,
  });
  s.addText("The product they use is a management tool.\nThe skill they need is judgment, not execution.", {
    x: 1.2, y: 4.0, w: 7, h: 0.9,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
    lineSpacingMultiple: 1.5,
  });

  // ─────────────────────────────────────────────
  // SLIDE 3: SECTION \u2014 THE PROBLEM (DARK)
  // Layout: Full-screen dark with centered large text
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 3.5, y: 1.0, w: 3, h: 3,
    fill: { color: P.accent, transparency: 92 },
  });
  iconCircleDark(s, "warning", 4.5, 1.6, 0.8);
  s.addText("The Problem", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("Technology is advancing rapidly.\nDesign thinking hasn't kept up.", {
    x: 1.5, y: 3.6, w: 7, h: 0.9,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
    lineSpacingMultiple: 1.5,
  });

  // ─────────────────────────────────────────────
  // SLIDE 4: THREE MISSING LAYERS (LIGHT)
  // Layout: Icon + text rows on white background
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Three Missing Layers", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const layers = [
    { icon: "eye", title: "Experience Layer", desc: "No design language exists for agent-managed work. We're using task-based interfaces for a world moving beyond tasks." },
    { icon: "users", title: "Accessibility Layer", desc: "Agent creation is a technical skill. If agents are the future of all work, creating them must be universally accessible." },
    { icon: "shield", title: "Governance Layer", desc: "No standard for defining agent boundaries, auditing decisions, or assigning responsibility in regulated industries." },
  ];
  layers.forEach((l, i) => {
    const y = 1.4 + i * 1.3;
    // White card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y, w: 8.4, h: 1.1,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, l.icon, 1.1, y + 0.2, 0.65);
    s.addText(l.title, {
      x: 2.0, y: y + 0.08, w: 6.8, h: 0.4,
      fontSize: 20, fontFace: TITLE_FONT, color: P.textDark, bold: true, margin: 0,
    });
    s.addText(l.desc, {
      x: 2.0, y: y + 0.5, w: 6.8, h: 0.5,
      fontSize: 14, fontFace: BODY_FONT, color: P.textMuted, margin: 0,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 5: SECTION \u2014 CORE INSIGHT (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 7, y: 0.5, w: 4, h: 4,
    fill: { color: P.purple, transparency: 92 },
  });
  iconCircleDark(s, "lightbulb", 4.5, 1.6, 0.8);
  s.addText("The Core Insight", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("From doing to managing", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.accent, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 6: BEFORE/AFTER COMPARISON (LIGHT)
  // Layout: Two-column split \u2014 muted left, bright right
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("The Paradigm Shift", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  // Left card (muted)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.3, w: 4.0, h: 3.8,
    fill: { color: "E2E8F0" }, shadow: cardShadow(),
  });
  s.addText("TODAY", {
    x: 0.8, y: 1.4, w: 4.0, h: 0.5,
    fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, align: "center", charSpacing: 4,
  });
  s.addText("You Do the Work", {
    x: 0.8, y: 1.85, w: 4.0, h: 0.5,
    fontSize: 22, fontFace: TITLE_FONT, color: P.textMuted, bold: true, align: "center",
  });
  const todayItems = ["Process applications", "Create campaigns", "Document encounters", "Grade assignments"];
  todayItems.forEach((t, i) => {
    s.addText(t, {
      x: 1.3, y: 2.5 + i * 0.5, w: 3.0, h: 0.4,
      fontSize: 15, fontFace: BODY_FONT, color: P.textMuted,
    });
  });

  // Right card (bright)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.3, w: 4.0, h: 3.8,
    fill: { color: P.darkBg }, shadow: cardShadow(),
  });
  s.addText("TOMORROW", {
    x: 5.2, y: 1.4, w: 4.0, h: 0.5,
    fontSize: 12, fontFace: BODY_FONT, color: P.accent, align: "center", charSpacing: 4,
  });
  s.addText("You Manage Agents", {
    x: 5.2, y: 1.85, w: 4.0, h: 0.5,
    fontSize: 22, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  const tomorrowItems = ["Set risk parameters", "Define brand direction", "Oversee care teams", "Design learning journeys"];
  tomorrowItems.forEach((t, i) => {
    s.addText(t, {
      x: 5.7, y: 2.5 + i * 0.5, w: 3.0, h: 0.4,
      fontSize: 15, fontFace: BODY_FONT, color: P.textIce,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 7: ROLE TRANSFORMATION (LIGHT)
  // Layout: Icon + text rows with arrows
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Role Transformation", {
    x: 0.8, y: 0.4, w: 5, h: 0.7,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  s.addText("Every role shifts from execution to oversight", {
    x: 0.8, y: 1.0, w: 6, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMuted,
  });
  const roles = [
    { from: "Processor", to: "Governor", shift: "Doing \u2192 Overseeing", icon: "userTie" },
    { from: "Creator", to: "Creative Director", shift: "Making \u2192 Directing", icon: "lightbulb" },
    { from: "Practitioner", to: "Care Architect", shift: "Treating \u2192 Orchestrating", icon: "heart" },
    { from: "Administrator", to: "Public Steward", shift: "Processing \u2192 Governing", icon: "gavel" },
    { from: "Instructor", to: "Learning Architect", shift: "Teaching \u2192 Designing", icon: "grad" },
  ];
  roles.forEach((r, i) => {
    const y = 1.6 + i * 0.73;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y, w: 8.4, h: 0.6,
      fill: { color: i % 2 === 0 ? P.lightCard : P.lightBg },
      shadow: i % 2 === 0 ? cardShadow() : undefined,
    });
    iconCircleLight(s, r.icon, 1.0, y + 0.05, 0.5);
    s.addText(r.from, { x: 1.7, y, w: 2.0, h: 0.6, fontSize: 14, fontFace: BODY_FONT, color: P.textMuted, valign: "middle", margin: 0 });
    s.addImage({ data: iD.arrow, x: 3.8, y: y + 0.18, w: 0.25, h: 0.25 });
    s.addText(r.to, { x: 4.2, y, w: 2.5, h: 0.6, fontSize: 14, fontFace: BODY_FONT, color: P.textDark, bold: true, valign: "middle", margin: 0 });
    s.addText(r.shift, { x: 7.0, y, w: 2.0, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: P.accent, valign: "middle", align: "right", margin: 0 });
  });

  // ─────────────────────────────────────────────
  // SLIDE 8: SECTION \u2014 EVOLUTION (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: -1, y: -1, w: 4, h: 4,
    fill: { color: P.accent, transparency: 92 },
  });
  iconCircleDark(s, "route", 4.5, 1.6, 0.8);
  s.addText("The Evolution", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("Three phases from code to culture", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 9: THREE PHASES (LIGHT)
  // Layout: Three numbered columns
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Three Phases of Agent Evolution", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const phases = [
    { n: "01", title: "Developer Tools", sub: "NOW", desc: "Agents in the domain of engineers. Code, APIs, frameworks. No standard visibility.", color: P.accent, icon: "code" },
    { n: "02", title: "Agent Platforms", sub: "NEXT", desc: "No-code builders. Governance as product feature. Agent dashboards emerge.", color: P.purple, icon: "layers" },
    { n: "03", title: "Agent-Native", sub: "FUTURE", desc: "Products designed from ground up for agent-managed work. The new default.", color: P.warmAccent, icon: "globe" },
  ];
  phases.forEach((p, i) => {
    const x = 0.8 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.2, w: 2.75, h: 4.0,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    // Number
    s.addText(p.n, {
      x, y: 1.4, w: 2.75, h: 0.7,
      fontSize: 36, fontFace: TITLE_FONT, color: p.color, bold: true, align: "center",
    });
    // Phase label
    s.addText(p.sub, {
      x, y: 2.05, w: 2.75, h: 0.3,
      fontSize: 10, fontFace: BODY_FONT, color: p.color, align: "center", charSpacing: 4,
    });
    // Icon in circle
    iconCircleLight(s, p.icon, x + 0.95, 2.5, 0.7);
    // Title
    s.addText(p.title, {
      x, y: 3.3, w: 2.75, h: 0.5,
      fontSize: 20, fontFace: TITLE_FONT, color: P.textDark, bold: true, align: "center",
    });
    // Description
    s.addText(p.desc, {
      x: x + 0.2, y: 3.85, w: 2.35, h: 1.1,
      fontSize: 13, fontFace: BODY_FONT, color: P.textMuted, align: "center",
      lineSpacingMultiple: 1.4,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 10: SECTION \u2014 TANGIBLE FUTURES (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 6, y: 2, w: 5, h: 5,
    fill: { color: P.warmAccent, transparency: 93 },
  });
  iconCircleDark(s, "chart", 4.5, 1.6, 0.8);
  s.addText("Tangible Futures", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("What changes \u2014 and what emerges", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 11: WHAT DISAPPEARS / EMERGES (LIGHT)
  // Layout: 2-column \u2014 red left, green right
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("The Interface Shift", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  // Left: Disappears
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.15, w: 4.0, h: 4.0,
    fill: { color: P.lightCard }, shadow: cardShadow(),
  });
  s.addText("What Disappears", {
    x: 0.8, y: 1.25, w: 4.0, h: 0.5,
    fontSize: 20, fontFace: TITLE_FONT, color: "DC2626", bold: true, align: "center",
  });
  const gone = ["Navigation menus", "Search bars", "Forms and data entry", "Notification overload", "Dashboards you check", "Settings panels"];
  gone.forEach((g, i) => {
    s.addText([{ text: "X  ", options: { color: "DC2626", bold: true } }, { text: g, options: { color: P.textMuted } }], {
      x: 1.2, y: 1.85 + i * 0.5, w: 3.2, h: 0.4,
      fontSize: 14, fontFace: BODY_FONT,
    });
  });
  // Right: Emerges
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.15, w: 4.0, h: 4.0,
    fill: { color: P.lightCard }, shadow: cardShadow(),
  });
  s.addText("What Emerges", {
    x: 5.2, y: 1.25, w: 4.0, h: 0.5,
    fontSize: 20, fontFace: TITLE_FONT, color: "16A34A", bold: true, align: "center",
  });
  const emerges = [
    "The briefing", "Proposal cards",
    "Exception queue", "Trust dial",
    "Choreography map", "Teaching moments",
  ];
  emerges.forEach((e, i) => {
    s.addText([{ text: "\u2192  ", options: { color: "16A34A", bold: true } }, { text: e, options: { color: P.textDark } }], {
      x: 5.6, y: 1.85 + i * 0.5, w: 3.2, h: 0.4,
      fontSize: 14, fontFace: BODY_FONT,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 12: BIG STATS \u2014 A DAY WITH AGENTS (LIGHT)
  // Layout: Large stat callouts (60-72pt numbers)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("A Day With Agents", {
    x: 0.8, y: 0.35, w: 5, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  s.addText("Insurance Claims Manager", {
    x: 0.8, y: 0.9, w: 4, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: P.accent, italic: true,
  });
  const stats = [
    { num: "84", label: "Claims\nProcessed", color: P.textDark },
    { num: "72", label: "Resolved\nAutonomously", color: P.accent },
    { num: "5", label: "Escalated\nto You", color: P.warmAccent },
    { num: "45m", label: "Judgment\nWork", color: P.accentDim },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.1, h: 2.6,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    s.addText(st.num, {
      x, y: 1.75, w: 2.1, h: 1.2,
      fontSize: 60, fontFace: TITLE_FONT, color: st.color, bold: true, align: "center",
    });
    s.addText(st.label, {
      x, y: 3.0, w: 2.1, h: 0.8,
      fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, align: "center",
      lineSpacingMultiple: 1.4,
    });
  });
  s.addText("Zero paperwork.", {
    x: 0.8, y: 4.5, w: 8.4, h: 0.5,
    fontSize: 20, fontFace: TITLE_FONT, color: P.accent, italic: true, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 13: THREE INTERACTION MODES (LIGHT)
  // Layout: Three columns with icons in circles
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Three Interaction Modes", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const modes = [
    { title: "Delegate", desc: "Set the goal and walk away.\nAgent works independently\nand reports back.", best: "Routine, well-defined, low-risk", icon: "arrow", color: P.accent },
    { title: "Supervise", desc: "Agent works, you watch.\nStep in when needed.\nLike managing a junior.", best: "Important, building trust", icon: "eye", color: P.purple },
    { title: "Collaborate", desc: "Real-time back-and-forth.\nNeither fully in charge.\nCreative co-creation.", best: "Creative, strategic, complex", icon: "users", color: P.warmAccent },
  ];
  modes.forEach((m, i) => {
    const x = 0.8 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.2, w: 2.75, h: 3.9,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, m.icon, x + 0.95, 1.45, 0.7);
    s.addText(m.title, {
      x, y: 2.3, w: 2.75, h: 0.5,
      fontSize: 22, fontFace: TITLE_FONT, color: P.textDark, bold: true, align: "center",
    });
    s.addText(m.desc, {
      x: x + 0.15, y: 2.85, w: 2.45, h: 1.2,
      fontSize: 13, fontFace: BODY_FONT, color: P.textMuted, align: "center",
      lineSpacingMultiple: 1.4,
    });
    s.addText(m.best, {
      x: x + 0.15, y: 4.2, w: 2.45, h: 0.5,
      fontSize: 11, fontFace: BODY_FONT, color: m.color, italic: true, align: "center",
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 14: SECTION \u2014 EXPERIENCE DESIGN (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: -2, y: 1, w: 6, h: 6,
    fill: { color: P.accent, transparency: 93 },
  });
  iconCircleDark(s, "project", 4.5, 1.6, 0.8);
  s.addText("Experience Design", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("Interfaces for managing agents, not performing tasks", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 15: COMMAND CENTER (LIGHT)
  // Layout: Half-bleed dark panel left + icon rows right
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  // Left dark panel (half-bleed)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 4.2, h: 5.625,
    fill: { color: P.darkBg },
  });
  s.addText("Command\nCenter", {
    x: 0.5, y: 1.0, w: 3.2, h: 1.5,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Your workday starts\ndifferently. One surface\nreplaces the fragmented\nmulti-app experience.", {
    x: 0.5, y: 2.6, w: 3.2, h: 1.8,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
    lineSpacingMultiple: 1.5,
  });
  // Right: icon rows
  const ccItems = [
    { icon: "check", title: "Completed Work", desc: "What agents finished overnight", color: P.accent },
    { icon: "clipboard", title: "Pending Decisions", desc: "Items needing your judgment", color: P.warmAccent },
    { icon: "warning", title: "Blocked Items", desc: "Situations outside guidelines", color: "DC2626" },
    { icon: "chart", title: "Performance Signals", desc: "Trends and improvements", color: P.purple },
    { icon: "balance", title: "Exception Queue", desc: "Judgment, ethics, authority, empathy", color: P.accentDim },
  ];
  ccItems.forEach((item, i) => {
    const y = 0.5 + i * 0.95;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.6, y, w: 5.0, h: 0.8,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, item.icon, 4.8, y + 0.1, 0.55);
    s.addText(item.title, {
      x: 5.55, y: y + 0.05, w: 3.8, h: 0.35,
      fontSize: 15, fontFace: BODY_FONT, color: P.textDark, bold: true, margin: 0,
    });
    s.addText(item.desc, {
      x: 5.55, y: y + 0.4, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, margin: 0,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 16: APPROVAL FLOW (LIGHT)
  // Layout: Process flow with numbered steps
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("The Approval Flow", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  s.addText("The fundamental unit of agent-managed interaction", {
    x: 0.8, y: 0.9, w: 6, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMuted,
  });
  // Process flow steps
  const flowSteps = [
    { n: "1", label: "Agent\nProposes", icon: "robot", color: P.accent },
    { n: "2", label: "Human\nReviews", icon: "eye", color: P.purple },
    { n: "3", label: "Approve /\nAdjust / Reject", icon: "clipboard", color: P.warmAccent },
    { n: "4", label: "Agent\nLearns", icon: "brain", color: P.accentDim },
  ];
  flowSteps.forEach((fs, i) => {
    const x = 0.7 + i * 2.4;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.0, h: 2.0,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, fs.icon, x + 0.6, 1.8, 0.65);
    s.addText(fs.label, {
      x, y: 2.6, w: 2.0, h: 0.8,
      fontSize: 14, fontFace: BODY_FONT, color: P.textDark, bold: true, align: "center",
      lineSpacingMultiple: 1.3,
    });
    // Arrow between steps
    if (i < 3) {
      s.addImage({ data: iD.arrow, x: x + 2.0, y: 2.35, w: 0.35, h: 0.35 });
    }
  });
  // Trust spectrum below
  s.addText("Trust builds over time: Supervised \u2192 Guided \u2192 Collaborative \u2192 Trusted", {
    x: 0.8, y: 4.1, w: 8.4, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: P.accent, align: "center", italic: true,
  });
  // Visual bar
  const barColors = [P.warmAccent, P.purple, P.accent, P.accentDim];
  barColors.forEach((c, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.5 + i * 1.75, y: 4.6, w: 1.75, h: 0.15,
      fill: { color: c },
    });
  });
  const barLabels = ["Supervised", "Guided", "Collaborative", "Trusted"];
  barLabels.forEach((l, i) => {
    s.addText(l, {
      x: 1.5 + i * 1.75, y: 4.8, w: 1.75, h: 0.3,
      fontSize: 10, fontFace: BODY_FONT, color: P.textMuted, align: "center",
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 17: AMBIENT AWARENESS (LIGHT)
  // Layout: 2x2 grid with colored indicators
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Ambient Awareness", {
    x: 0.8, y: 0.35, w: 5, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  s.addText("From active monitoring to peripheral consciousness", {
    x: 0.8, y: 0.9, w: 6, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMuted,
  });
  const matrix = [
    { label: "High Urgency\nLow Confidence", action: "Interrupt Immediately", color: "DC2626", x: 0.8, y: 1.5 },
    { label: "High Urgency\nHigh Confidence", action: "Brief Notification", color: P.warmAccent, x: 5.2, y: 1.5 },
    { label: "Low Urgency\nLow Confidence", action: "Queue for Review", color: P.purple, x: 0.8, y: 3.25 },
    { label: "Low Urgency\nHigh Confidence", action: "Handle Silently", color: "16A34A", x: 5.2, y: 3.25 },
  ];
  matrix.forEach((m) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x, y: m.y, w: 4.0, h: 1.5,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    // Color indicator strip (left side of card)
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x, y: m.y, w: 0.08, h: 1.5,
      fill: { color: m.color },
    });
    s.addText(m.label, {
      x: m.x + 0.3, y: m.y + 0.15, w: 1.8, h: 0.8,
      fontSize: 12, fontFace: BODY_FONT, color: P.textMuted,
      lineSpacingMultiple: 1.4, margin: 0,
    });
    s.addText(m.action, {
      x: m.x + 2.0, y: m.y + 0.15, w: 1.8, h: 0.8,
      fontSize: 16, fontFace: TITLE_FONT, color: m.color, bold: true,
      align: "right", valign: "middle", margin: 0,
    });
  });
  s.addText("Silence should feel like competence, not absence.", {
    x: 0.8, y: 5.0, w: 8.4, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: P.accent, italic: true, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 18: AGENT ANATOMY (LIGHT)
  // Layout: 2+3 grid of icon cards
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Designing the Agent", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const anatomy = [
    { title: "Personality", desc: "Tone, verbosity,\nconfidence, initiative", icon: "heart", color: "EC4899" },
    { title: "Capabilities", desc: "Tools accessible,\nactions available", icon: "cogs", color: P.accent },
    { title: "Boundaries", desc: "What it won't do,\nescalation triggers", icon: "shield", color: "DC2626" },
    { title: "Interface", desc: "Status, confidence,\nprogressive disclosure", icon: "comments", color: P.purple },
    { title: "Memory", desc: "Working, preference,\ndomain, history", icon: "brain", color: P.warmAccent },
  ];
  // Row 1: 3 cards
  anatomy.slice(0, 3).forEach((a, i) => {
    const x = 0.8 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.2, w: 2.75, h: 1.9,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, a.icon, x + 0.95, 1.35, 0.6);
    s.addText(a.title, { x, y: 2.0, w: 2.75, h: 0.4, fontSize: 16, fontFace: BODY_FONT, color: P.textDark, bold: true, align: "center", margin: 0 });
    s.addText(a.desc, { x: x + 0.2, y: 2.4, w: 2.35, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, align: "center", lineSpacingMultiple: 1.3, margin: 0 });
  });
  // Row 2: 2 cards centered
  anatomy.slice(3).forEach((a, i) => {
    const x = 2.3 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.4, w: 2.75, h: 1.9,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, a.icon, x + 0.95, 3.55, 0.6);
    s.addText(a.title, { x, y: 4.2, w: 2.75, h: 0.4, fontSize: 16, fontFace: BODY_FONT, color: P.textDark, bold: true, align: "center", margin: 0 });
    s.addText(a.desc, { x: x + 0.2, y: 4.6, w: 2.35, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, align: "center", lineSpacingMultiple: 1.3, margin: 0 });
  });

  // ─────────────────────────────────────────────
  // SLIDE 19: SECTION \u2014 DESIGN PRINCIPLES (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 5, y: -1, w: 6, h: 6,
    fill: { color: P.purple, transparency: 92 },
  });
  iconCircleDark(s, "sliders", 4.5, 1.6, 0.8);
  s.addText("Design Principles", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("Five rules for agent-managed product design", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDES 20-24: PRINCIPLES (alternating dark/light)
  // Each with unique layout \u2014 NO accent lines under titles
  // ─────────────────────────────────────────────

  // P1: Outcomes Over Processes \u2014 DARK with big quote style
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 7, y: 3, w: 4, h: 4,
    fill: { color: P.accent, transparency: 90 },
  });
  iconCircleDark(s, "chart", 0.8, 0.6, 0.55);
  s.addText("01", {
    x: 1.5, y: 0.55, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.accent, bold: true, margin: 0,
  });
  s.addText("Outcomes Over Processes", {
    x: 2.3, y: 0.6, w: 5, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, margin: 0,
  });
  s.addText("Show what was achieved,\nnot how it was done.", {
    x: 0.8, y: 1.6, w: 8.4, h: 2.0,
    fontSize: 40, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.2,
  });
  s.addText("Human attention goes to results. Process details\nare available on demand \u2014 never the default.", {
    x: 0.8, y: 3.8, w: 7, h: 0.9,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
    lineSpacingMultiple: 1.5,
  });

  // P2: Exceptions Over Routine \u2014 LIGHT with icon card layout
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("02", {
    x: 0.8, y: 0.4, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.purple, bold: true,
  });
  s.addText("Exceptions Over Routine", {
    x: 1.6, y: 0.45, w: 5, h: 0.5,
    fontSize: 20, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  // Big statement card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.2, w: 8.4, h: 1.5,
    fill: { color: P.darkBg }, shadow: cardShadow(),
  });
  iconCircleDark(s, "eye", 1.2, 1.55, 0.65);
  s.addText("Surface what's unusual. Hide what's normal.", {
    x: 2.1, y: 1.4, w: 6.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.textWhite, bold: true, valign: "middle",
  });
  s.addText("If humans review everything, they might as well do the work themselves.", {
    x: 2.1, y: 2.0, w: 6.8, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
  });
  // Exception categories
  const exceptions = [
    { cat: "Judgment needed", ex: "Unusual income pattern on loan app" },
    { cat: "Authority exceeded", ex: "Expenditure above approved limit" },
    { cat: "Ethical dimension", ex: "Compassionate exception to policy" },
    { cat: "Novel situation", ex: "Unprecedented regulatory change" },
  ];
  exceptions.forEach((e, i) => {
    const y = 3.0 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.5, fill: { color: P.lightCard }, shadow: cardShadow() });
    s.addText(e.cat, { x: 1.0, y, w: 2.5, h: 0.5, fontSize: 13, fontFace: BODY_FONT, color: P.purple, bold: true, valign: "middle", margin: 0 });
    s.addText(e.ex, { x: 3.5, y, w: 5.5, h: 0.5, fontSize: 13, fontFace: BODY_FONT, color: P.textMuted, valign: "middle", margin: 0 });
  });

  // P3: Trust Building \u2014 DARK with trust journey visual
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: -2, y: 2, w: 5, h: 5,
    fill: { color: P.accent, transparency: 92 },
  });
  iconCircleDark(s, "handshake", 0.8, 0.6, 0.55);
  s.addText("03", {
    x: 1.5, y: 0.55, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.accent, bold: true, margin: 0,
  });
  s.addText("Trust Building Over Time", {
    x: 2.3, y: 0.6, w: 5, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, margin: 0,
  });
  s.addText("Trust is earned,\nnot configured.", {
    x: 0.8, y: 1.5, w: 8.4, h: 1.5,
    fontSize: 40, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.2,
  });
  // Trust journey as horizontal steps
  const trustSteps = [
    { label: "Supervised", desc: "Every action\napproved" },
    { label: "Guided", desc: "Routine is\nautonomous" },
    { label: "Collaborative", desc: "Working\nrhythm" },
    { label: "Trusted", desc: "Independent\noperation" },
  ];
  trustSteps.forEach((ts, i) => {
    const x = 0.8 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.4, w: 2.0, h: 1.5,
      fill: { color: P.darkPanel }, shadow: darkCardShadow(),
    });
    s.addText(ts.label, {
      x, y: 3.5, w: 2.0, h: 0.5,
      fontSize: 14, fontFace: BODY_FONT, color: P.accent, bold: true, align: "center",
    });
    s.addText(ts.desc, {
      x, y: 4.0, w: 2.0, h: 0.7,
      fontSize: 12, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
      lineSpacingMultiple: 1.3,
    });
    if (i < 3) {
      s.addImage({ data: iW.arrow, x: x + 2.0, y: 3.85, w: 0.25, h: 0.25 });
    }
  });

  // P4: Values Over Settings \u2014 LIGHT comparison layout
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("04", {
    x: 0.8, y: 0.4, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.warmAccent, bold: true,
  });
  s.addText("Values Over Settings", {
    x: 1.6, y: 0.45, w: 5, h: 0.5,
    fontSize: 20, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  // Comparison: technical vs values
  const valComp = [
    { tech: "response_time_sla: 3600", value: "Respond within a business day" },
    { tech: "risk_score_threshold: 0.65", value: "Be conservative. When unsure, ask me." },
    { tech: "max_autonomy_level: 3", value: "Handle routine, check on unusual" },
    { tech: "escalation_matrix: [config]", value: "If a customer seems upset, bring me in" },
  ];
  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 4.0, h: 0.5, fill: { color: "E2E8F0" } });
  s.addText("TECHNICAL SETTINGS", { x: 0.8, y: 1.2, w: 4.0, h: 0.5, fontSize: 10, fontFace: BODY_FONT, color: P.textMuted, align: "center", valign: "middle", charSpacing: 3 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.0, h: 0.5, fill: { color: P.darkBg } });
  s.addText("VALUES-BASED EXPRESSION", { x: 5.2, y: 1.2, w: 4.0, h: 0.5, fontSize: 10, fontFace: BODY_FONT, color: P.accent, align: "center", valign: "middle", charSpacing: 3 });
  valComp.forEach((vc, i) => {
    const y = 1.75 + i * 0.75;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 4.0, h: 0.65, fill: { color: i % 2 === 0 ? P.lightCard : P.lightBg }, shadow: i % 2 === 0 ? cardShadow() : undefined });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 4.0, h: 0.65, fill: { color: i % 2 === 0 ? P.lightCard : P.lightBg }, shadow: i % 2 === 0 ? cardShadow() : undefined });
    s.addText(vc.tech, { x: 1.0, y, w: 3.6, h: 0.65, fontSize: 11, fontFace: "Consolas", color: P.textMuted, valign: "middle", margin: 0 });
    s.addText(vc.value, { x: 5.4, y, w: 3.6, h: 0.65, fontSize: 13, fontFace: BODY_FONT, color: P.textDark, valign: "middle", margin: 0 });
  });
  s.addText("Express boundaries as human values, not technical parameters.", {
    x: 0.8, y: 4.9, w: 8.4, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: P.warmAccent, italic: true, align: "center",
  });

  // P5: Agent Creation \u2014 DARK statement
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 6, y: -1, w: 5, h: 5,
    fill: { color: P.warmAccent, transparency: 92 },
  });
  iconCircleDark(s, "userCog", 0.8, 0.6, 0.55);
  s.addText("05", {
    x: 1.5, y: 0.55, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: TITLE_FONT, color: P.warmAccent, bold: true, margin: 0,
  });
  s.addText("Agent Creation as Document Creation", {
    x: 2.3, y: 0.6, w: 6, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, margin: 0,
  });
  s.addText("As natural as making\na spreadsheet.", {
    x: 0.8, y: 1.6, w: 8.4, h: 1.5,
    fontSize: 40, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.2,
  });
  s.addText("Domain expertise \u2014 not technical skill \u2014\nshould be the requirement.", {
    x: 0.8, y: 3.3, w: 7, h: 0.8,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
    lineSpacingMultiple: 1.5,
  });
  // Teaching steps
  const steps = ["Demonstrate the task", "Agent identifies the pattern", "You correct misunderstandings", "Agent tries independently", "You refine through feedback"];
  steps.forEach((st, i) => {
    const x = 0.8 + i * 1.8;
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.55, y: 4.2, w: 0.45, h: 0.45,
      fill: { color: P.warmAccent, transparency: 20 },
    });
    s.addText(String(i + 1), {
      x: x + 0.55, y: 4.2, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: BODY_FONT, color: P.textWhite, bold: true, align: "center", valign: "middle",
    });
    s.addText(st, {
      x, y: 4.7, w: 1.6, h: 0.6,
      fontSize: 10, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
      lineSpacingMultiple: 1.2,
    });
  });

  // ─────────────────────────────────────────────
  // SLIDE 25: SECTION \u2014 INDUSTRIES (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 3, y: 0, w: 4, h: 4,
    fill: { color: P.accent, transparency: 93 },
  });
  iconCircleDark(s, "globe", 4.5, 1.6, 0.8);
  s.addText("Industries", {
    x: 0.8, y: 2.6, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
  });
  s.addText("Agent-managed work across sectors", {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.textMutedDark, align: "center",
  });

  // ─────────────────────────────────────────────
  // SLIDE 26: INDUSTRY GRID (LIGHT)
  // Layout: Icon grid \u2014 4+3
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Industry Transformation", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const inds = [
    { title: "Banking", shift: "Transaction Processors\n\u2192 Financial Governors", icon: "bank" },
    { title: "Insurance", shift: "Claims Assessors\n\u2192 Risk Adjudicators", icon: "shield" },
    { title: "Healthcare", shift: "Practitioners\n\u2192 Care Orchestrators", icon: "hospital" },
    { title: "Government", shift: "Administrators\n\u2192 Citizen Stewards", icon: "gavel" },
    { title: "Education", shift: "Instructors\n\u2192 Learning Architects", icon: "grad" },
    { title: "Manufacturing", shift: "Operators\n\u2192 Systems Conductors", icon: "industry" },
    { title: "Marketing", shift: "Creators\n\u2192 Brand Architects", icon: "bullhorn" },
  ];
  inds.forEach((ind, i) => {
    let x, y;
    if (i < 4) { x = 0.5 + i * 2.35; y = 1.2; }
    else { x = 1.7 + (i - 4) * 2.35; y = 3.4; }
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.1, h: 1.9,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, ind.icon, x + 0.7, y + 0.15, 0.55);
    s.addText(ind.title, { x, y: y + 0.75, w: 2.1, h: 0.35, fontSize: 14, fontFace: BODY_FONT, color: P.textDark, bold: true, align: "center", margin: 0 });
    s.addText(ind.shift, { x: x + 0.1, y: y + 1.1, w: 1.9, h: 0.7, fontSize: 10, fontFace: BODY_FONT, color: P.textMuted, align: "center", lineSpacingMultiple: 1.3, margin: 0 });
  });

  // ─────────────────────────────────────────────
  // SLIDE 27: EMERGING CONSIDERATIONS (LIGHT)
  // Layout: 2x3 card grid
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.lightBg };
  s.transition = { ...FADE };
  s.addText("Emerging Considerations", {
    x: 0.8, y: 0.35, w: 8.4, h: 0.6,
    fontSize: 36, fontFace: TITLE_FONT, color: P.textDark, bold: true,
  });
  const emerging = [
    { title: "Agent Identity", desc: "Credit scores for agents.\nPortable reputation.", icon: "userTie", color: P.accent },
    { title: "Agent Economies", desc: "Machines negotiating\nwith machines.", icon: "handshake", color: P.purple },
    { title: "Regulation", desc: "New frameworks for\nagent decisions.", icon: "balance", color: P.warmAccent },
    { title: "Emotional Design", desc: "Beyond functional\ncompetence.", icon: "heart", color: "EC4899" },
    { title: "The Last Mile", desc: "Digital decisions,\nphysical world.", icon: "globe", color: P.accentDim },
    { title: "Digital Divide 2.0", desc: "Agent access as\nnew inequality.", icon: "users", color: "DC2626" },
  ];
  emerging.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 3.05;
    const y = 1.2 + row * 2.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.75, h: 1.8,
      fill: { color: P.lightCard }, shadow: cardShadow(),
    });
    iconCircleLight(s, e.icon, x + 0.95, y + 0.15, 0.55);
    s.addText(e.title, { x, y: y + 0.75, w: 2.75, h: 0.35, fontSize: 16, fontFace: BODY_FONT, color: P.textDark, bold: true, align: "center", margin: 0 });
    s.addText(e.desc, { x: x + 0.2, y: y + 1.1, w: 2.35, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: P.textMuted, align: "center", lineSpacingMultiple: 1.3, margin: 0 });
  });

  // ─────────────────────────────────────────────
  // SLIDE 28: CLOSING QUOTE (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 3, y: -0.5, w: 4, h: 4,
    fill: { color: P.accent, transparency: 90 },
  });
  s.addText("\u201C", {
    x: 0.5, y: 0.2, w: 2, h: 2,
    fontSize: 120, fontFace: TITLE_FONT, color: P.accent, bold: true, margin: 0,
  });
  s.addText("How do humans maintain\nmeaningful control,\nunderstanding, and purpose\nin a world where agents\ndo most of the work?", {
    x: 1.0, y: 1.2, w: 8, h: 3.0,
    fontSize: 32, fontFace: TITLE_FONT, color: P.textWhite, bold: true,
    lineSpacingMultiple: 1.25,
  });
  s.addText("This is as much philosophical as it is\na design question \u2014 and it shapes everything.", {
    x: 1.0, y: 4.4, w: 8, h: 0.8,
    fontSize: 14, fontFace: BODY_FONT, color: P.textMutedDark,
    lineSpacingMultiple: 1.5,
  });

  // ─────────────────────────────────────────────
  // SLIDE 29: THANK YOU (DARK)
  // ─────────────────────────────────────────────
  s = pres.addSlide();
  s.background = { color: P.darkBg };
  s.transition = { ...FADE };
  s.addShape(pres.shapes.OVAL, {
    x: 2.5, y: -2, w: 5, h: 5,
    fill: { color: P.accent, transparency: 92 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: -1, y: 3, w: 4, h: 4,
    fill: { color: P.purple, transparency: 93 },
  });
  iconCircleDark(s, "robot", 4.35, 1.0, 1.0);
  s.addText("Agent Design\nFramework", {
    x: 0.8, y: 2.2, w: 8.4, h: 1.5,
    fontSize: 42, fontFace: TITLE_FONT, color: P.textWhite, bold: true, align: "center",
    lineSpacingMultiple: 1.1,
  });
  s.addText("Designed for the next paradigm of work.", {
    x: 1.5, y: 3.7, w: 7, h: 0.5,
    fontSize: 16, fontFace: BODY_FONT, color: P.accent, align: "center",
  });

  // ═══════════════════════════════════════════
  // SAVE
  // ═══════════════════════════════════════════
  const out = "./Agent_Design_Framework_Elite.pptx";
  await pres.writeFile({ fileName: out });
  console.log(`✅ ${out} \u2014 ${pres.slides.length} slides`);
}

main().catch(console.error);
