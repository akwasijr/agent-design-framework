#!/usr/bin/env node
/**
 * Agent Design Framework — Elite Presentation Generator
 * Reads slide-content.json + design-system.json → produces .pptx
 */

const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
const sharp = require("sharp");
const fa = require("react-icons/fa");

// ── Load data ──────────────────────────────────────────────────────────────
const DIR = __dirname;
const content = JSON.parse(fs.readFileSync(path.join(DIR, "slide-content.json"), "utf8"));
const design = JSON.parse(fs.readFileSync(path.join(DIR, "design-system.json"), "utf8"));
const slides = content.slides;

// ── Palette shortcuts ──────────────────────────────────────────────────────
const P = design.palette;
const BG_DARK = P.bg.dark;           // 0B0F1A
const BG_DARK_CARD = P.bg.darkCard;  // 141929
const BG_LIGHT = P.bg.light;         // F0F2F7
const BG_LIGHT_CARD = P.bg.lightCard;// FFFFFF
const ACCENT = P.accent.primary;     // 00E5C8
const ACCENT2 = P.accent.secondary;  // 7B61FF
const ACCENT_WARM = P.accent.warm;   // FF8F44
const TXT_WHITE = P.text.white;
const TXT_LIGHT = P.text.light;      // CBD1E0
const TXT_DARK = P.text.dark;        // 1A1D2E
const TXT_MUTED = P.text.muted;      // 6B7394
const TXT_MUTED_L = P.text.mutedOnLight; // 5A607A

// ── Factory functions (NEVER reuse objects) ────────────────────────────────
const createCardShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 270, color: "000000", opacity: 0.25,
});
const createDarkCardShadow = () => ({
  type: "outer", blur: 12, offset: 4, angle: 270, color: "000000", opacity: 0.5,
});
const createAccentGlow = () => ({
  type: "outer", blur: 20, offset: 0, angle: 0, color: ACCENT, opacity: 0.15,
});
const createSubtleShadow = () => ({
  type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12,
});

// ── Transition (fresh object per slide) ────────────────────────────────────
const fadeTransition = () => ({ type: "fade", speed: 0.6 });

// ── Spacing ────────────────────────────────────────────────────────────────
const GUTTER = 1.1;
const CARD_GAP = 0.4;
const CONTENT_W = 10 - 2 * GUTTER; // 7.8

// ── Icon rendering ─────────────────────────────────────────────────────────
function extractSvgPaths(element) {
  const paths = [];
  function walk(el) {
    if (!el) return;
    if (typeof el === "string") return;
    if (el.type === "path" && el.props && el.props.d) {
      paths.push({ d: el.props.d, fill: el.props.fill || null });
    }
    if (el.type === "circle" && el.props) {
      paths.push({ circle: el.props });
    }
    if (el.props && el.props.children) {
      const ch = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
      ch.forEach(walk);
    }
  }
  walk(element);
  return { viewBox: element.props.attr.viewBox, paths };
}

async function renderIcon(iconFn, color, size) {
  const el = iconFn({});
  const { viewBox, paths } = extractSvgPaths(el);
  const pathsStr = paths.map((p) => {
    if (p.circle) {
      const c = p.circle;
      return `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="#${color}"/>`;
    }
    return `<path d="${p.d}" fill="#${color}"/>`;
  }).join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${size}" height="${size}">${pathsStr}</svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "data:image/png;base64," + buf.toString("base64");
}

// Map of icon name → fa function
const ICON_MAP = {
  FaRobot: fa.FaRobot,
  FaProjectDiagram: fa.FaProjectDiagram,
  FaShareAlt: fa.FaShareAlt,
  FaBrain: fa.FaBrain,
  FaDatabase: fa.FaDatabase,
  FaWrench: fa.FaWrench,
  FaUserShield: fa.FaUserShield,
  FaSitemap: fa.FaSitemap,
  FaChartLine: fa.FaChartLine,
  FaLock: fa.FaLock,
  FaPlug: fa.FaPlug,
  FaComments: fa.FaComments,
  FaClipboardList: fa.FaClipboardList,
  FaPlay: fa.FaPlay,
  FaEye: fa.FaEye,
  FaExchangeAlt: fa.FaExchangeAlt,
  FaColumns: fa.FaColumns,
  FaTable: fa.FaTable,
  FaArrowRight: fa.FaArrowRight,
  FaLayerGroup: fa.FaLayerGroup,
  FaChartPie: fa.FaChartPie,
  FaBalanceScale: fa.FaBalanceScale,
  FaBullseye: fa.FaBullseye,
  FaCogs: fa.FaCogs,
  FaLightbulb: fa.FaLightbulb,
  FaHandshake: fa.FaHandshake,
  FaGlobe: fa.FaGlobe,
  FaQuoteLeft: fa.FaQuoteLeft,
  FaFlag: fa.FaFlag,
  FaRocket: fa.FaRocket,
  FaShieldAlt: fa.FaShieldAlt,
  FaUsers: fa.FaUsers,
  FaTasks: fa.FaTasks,
  FaBell: fa.FaBell,
  FaCheckCircle: fa.FaCheckCircle,
  FaStar: fa.FaStar,
  FaIndustry: fa.FaIndustry,
  FaExclamationTriangle: fa.FaExclamationTriangle,
  FaQuestion: fa.FaQuestion,
};

// Icon assignment per slide
const SLIDE_ICONS = {
  1: "FaRobot",
  2: "FaQuoteLeft",
  3: "FaExclamationTriangle",
  4: "FaLayerGroup",
  5: "FaExchangeAlt",
  6: "FaColumns",
  7: "FaTable",
  8: "FaArrowRight",
  9: "FaProjectDiagram",
  10: "FaLightbulb",
  11: "FaExchangeAlt",
  12: "FaChartPie",
  13: "FaBalanceScale",
  14: "FaUsers",
  15: "FaCogs",
  16: "FaTasks",
  17: "FaPlay",
  18: "FaBell",
  19: "FaStar",
  20: "FaBullseye",
  21: "FaEye",
  22: "FaShieldAlt",
  23: "FaComments",
  24: "FaWrench",
  25: "FaGlobe",
  26: "FaIndustry",
  27: "FaQuestion",
  28: "FaBrain",
  29: "FaQuoteLeft",
  30: "FaRocket",
};

async function preRenderIcons() {
  const cache = {};
  const needed = new Set(Object.values(SLIDE_ICONS));
  for (const name of needed) {
    const fn = ICON_MAP[name];
    if (!fn) continue;
    cache[name] = {
      white: await renderIcon(fn, TXT_WHITE, 64),
      accent: await renderIcon(fn, ACCENT, 64),
      dark: await renderIcon(fn, TXT_DARK, 64),
    };
  }
  return cache;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function addDecoArc(slide) {
  slide.addShape("ellipse", {
    x: 7.5, y: 4.0, w: 3.0, h: 3.0,
    fill: { color: ACCENT, transparency: 94 },
    line: { color: ACCENT, width: 0.5, transparency: 92 },
  });
}

function addDecoOval(slide, x, y, w, h, color, transparency) {
  slide.addShape("ellipse", {
    x, y, w, h,
    fill: { color, transparency: transparency || 94 },
    line: { width: 0 },
  });
}

function addIconCircle(slide, iconData, x, y, size) {
  const s = size || 0.67;
  slide.addShape("ellipse", {
    x, y, w: s, h: s,
    fill: { color: ACCENT, transparency: 85 },
    line: { color: ACCENT, width: 1.5 },
  });
  if (iconData) {
    const pad = s * 0.2;
    slide.addImage({
      data: iconData,
      x: x + pad, y: y + pad, w: s - 2 * pad, h: s - 2 * pad,
    });
  }
}

function sanitize(text) {
  if (!text) return "";
  return String(text)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014/g, " -- ")
    .replace(/\u2013/g, " - ")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ");
}

function isDarkSlide(slideData) {
  const darkTypes = ["hero", "section", "quote"];
  return darkTypes.includes(slideData.type);
}

function isLightSlide(slideIdx) {
  // Light sandwich: slides 4,7,11,14,16,20,24,26 (0-indexed: 3,6,10,13,15,19,23,25)
  const lightIndices = [3, 6, 10, 13, 15, 19, 23, 25];
  return lightIndices.includes(slideIdx);
}

// ── Main build ─────────────────────────────────────────────────────────────
async function main() {
  console.log("Pre-rendering icons...");
  const icons = await preRenderIcons();
  console.log(`  Rendered ${Object.keys(icons).length} icons`);

  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.author = "Agent Design Framework";
  pres.title = content.deck.title;
  pres.subject = content.deck.subtitle;

  // Use 10x5.63 (standard widescreen 16:9)
  pres.defineLayout({ name: "CUSTOM_16_9", width: 10, height: 5.63 });
  pres.layout = "CUSTOM_16_9";

  for (let i = 0; i < slides.length; i++) {
    const sd = slides[i];
    const light = !isDarkSlide(sd) && isLightSlide(i);
    const bgColor = isDarkSlide(sd) ? BG_DARK : (light ? BG_LIGHT : BG_DARK);
    const slide = pres.addSlide();
    slide.background = { color: bgColor };
    slide.transition = fadeTransition();

    const iconName = SLIDE_ICONS[sd.id];
    const iconSet = icons[iconName] || null;

    switch (sd.type) {
      case "hero":
        buildHeroSlide(slide, sd, iconSet, bgColor, sd.id === 30);
        break;
      case "quote":
        buildQuoteSlide(slide, sd, iconSet);
        break;
      case "section":
        buildSectionSlide(slide, sd, iconSet);
        break;
      case "three_col":
        buildThreeColSlide(slide, sd, iconSet, light);
        break;
      case "comparison":
        buildComparisonSlide(slide, sd, iconSet, light);
        break;
      case "grid":
        buildGridSlide(slide, sd, iconSet, light);
        break;
      case "process":
        buildProcessSlide(slide, sd, iconSet, light);
        break;
      case "chart":
        buildChartSlide(slide, sd, iconSet, pres, light);
        break;
      case "key_message":
        buildKeyMessageSlide(slide, sd, iconSet, light);
        break;
      case "metrics":
        buildMetricsSlide(slide, sd, iconSet, light);
        break;
      case "statement":
        buildStatementSlide(slide, sd, iconSet, light);
        break;
      case "bullets":
        buildBulletsSlide(slide, sd, iconSet, light);
        break;
      default:
        buildGenericSlide(slide, sd, iconSet, light);
    }
  }

  const outPath = path.join(DIR, "Agent_Design_Framework_Final.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log(`\nDone! ${slides.length} slides generated.`);
  console.log(`File: ${outPath}`);

  // Verify
  if (fs.existsSync(outPath)) {
    const stat = fs.statSync(outPath);
    console.log(`File size: ${(stat.size / 1024).toFixed(0)} KB`);
    console.log(`Slide count: ${slides.length}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE BUILDERS
// ══════════════════════════════════════════════════════════════════════════

function buildHeroSlide(slide, sd, iconSet, bgColor, isClosing) {
  // Decorative shapes
  addDecoOval(slide, -1, -1, 4, 4, ACCENT2, 96);
  addDecoOval(slide, 7, 3, 4, 4, ACCENT, 95);
  addDecoArc(slide);

  // Accent line above title
  slide.addShape("line", {
    x: GUTTER, y: 1.6, w: 1.5, h: 0,
    line: { color: ACCENT, width: 2.5 },
  });

  // Hero title
  slide.addText(sanitize(sd.title), {
    x: GUTTER, y: 1.8, w: CONTENT_W, h: 1.2,
    fontSize: 72, fontFace: "Georgia", bold: true, color: TXT_WHITE,
    align: "left", margin: 0,
  });

  // Subtitle
  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: GUTTER, y: 3.1, w: CONTENT_W, h: 0.5,
      fontSize: 28, fontFace: "Calibri", color: TXT_LIGHT,
      align: "left", margin: 0,
    });
  }

  // Note or CTA
  if (sd.note) {
    slide.addText(sanitize(sd.note), {
      x: GUTTER, y: 3.7, w: CONTENT_W, h: 0.4,
      fontSize: 18, fontFace: "Calibri", color: TXT_MUTED,
      align: "left", margin: 0,
    });
  }
  if (sd.callToAction) {
    slide.addText(sanitize(sd.callToAction), {
      x: GUTTER, y: 3.8, w: 3.5, h: 0.5,
      fontSize: 20, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "left", margin: 0,
    });
  }

  // Icon in circle
  if (iconSet) {
    addIconCircle(slide, iconSet.accent, 8.1, 1.9, 0.9);
  }
}

function buildQuoteSlide(slide, sd, iconSet) {
  addDecoOval(slide, -0.5, 3.5, 3, 3, ACCENT2, 96);
  addDecoOval(slide, 8, -0.5, 3, 3, ACCENT, 96);

  // Quote icon
  if (iconSet) {
    addIconCircle(slide, iconSet.accent, GUTTER, 0.8, 0.7);
  }

  // Large open-quote mark
  slide.addText(sanitize(sd.quote), {
    x: GUTTER + 0.1, y: 1.7, w: 7.6, h: 2.2,
    fontSize: 28, fontFace: "Georgia", italic: true, color: TXT_WHITE,
    align: "left", margin: 0, lineSpacingMultiple: 1.3,
  });

  // Attribution
  if (sd.attribution) {
    slide.addShape("line", {
      x: GUTTER, y: 4.1, w: 1.2, h: 0,
      line: { color: ACCENT, width: 2 },
    });
    slide.addText(sanitize(sd.attribution), {
      x: GUTTER, y: 4.25, w: 5, h: 0.4,
      fontSize: 18, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "left", margin: 0,
    });
  }

  if (sd.callout) {
    slide.addText(sanitize(sd.callout), {
      x: GUTTER, y: 4.7, w: 7, h: 0.35,
      fontSize: 16, fontFace: "Calibri", italic: true, color: TXT_MUTED,
      align: "left", margin: 0,
    });
  }
}

function buildSectionSlide(slide, sd, iconSet) {
  addDecoOval(slide, 6, 3.5, 5, 5, ACCENT, 96);
  addDecoOval(slide, -2, -1, 4, 4, ACCENT2, 97);

  // Thin accent line above title
  slide.addShape("line", {
    x: 3.5, y: 2.0, w: 3.0, h: 0,
    line: { color: ACCENT, width: 2, transparency: 60 },
  });

  // Section title centered
  slide.addText(sanitize(sd.title), {
    x: 1.5, y: 2.2, w: 7.0, h: 0.9,
    fontSize: 54, fontFace: "Georgia", bold: true, color: TXT_WHITE,
    align: "center", margin: 0,
  });

  // Subtitle
  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: 2.0, y: 3.2, w: 6.0, h: 0.4,
      fontSize: 20, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "center", margin: 0,
    });
  }

  // Body (if present, but design says section dividers should have minimal body)
  if (sd.body) {
    slide.addText(sanitize(sd.body), {
      x: 2.0, y: 3.7, w: 6.0, h: 0.4,
      fontSize: 18, fontFace: "Calibri", color: TXT_MUTED,
      align: "center", margin: 0,
    });
  }

  // Icon
  if (iconSet) {
    addIconCircle(slide, iconSet.accent, 4.66, 1.2, 0.67);
  }
}

function buildThreeColSlide(slide, sd, iconSet, light) {
  const bg = light ? BG_LIGHT : BG_DARK;
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;
  const mutedColor = light ? TXT_MUTED_L : TXT_MUTED;

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  // Three columns
  const colW = (CONTENT_W - 2 * CARD_GAP) / 3;
  const colY = 1.3;
  const colH = 3.8;
  const accentColors = [ACCENT, ACCENT2, ACCENT_WARM];

  sd.columns.forEach((col, ci) => {
    const cx = GUTTER + ci * (colW + CARD_GAP);
    slide.addShape("rect", {
      x: cx, y: colY, w: colW, h: colH, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });

    // Color accent bar at top of card
    slide.addShape("rect", {
      x: cx, y: colY, w: colW, h: 0.06,
      fill: { color: accentColors[ci] },
    });

    // Heading
    slide.addText(sanitize(col.heading), {
      x: cx + 0.2, y: colY + 0.25, w: colW - 0.4, h: 0.4,
      fontSize: 22, fontFace: "Georgia", bold: true, color: accentColors[ci],
      align: "left", margin: 0,
    });

    // Bullets
    const bulletTexts = col.bullets.map((b, bi) => ({
      text: sanitize(b),
      options: {
        fontSize: 18, fontFace: "Calibri", color: bodyColor,
        bullet: true, breakLine: true,
        paraSpaceAfter: 6,
      },
    }));
    slide.addText(bulletTexts, {
      x: cx + 0.2, y: colY + 0.75, w: colW - 0.4, h: colH - 1.1,
      align: "left", margin: 0, valign: "top",
    });
  });
}

function buildComparisonSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  // Two columns
  const colW = (CONTENT_W - CARD_GAP) / 2;
  const colY = 1.3;
  const colH = 3.9;

  [sd.left, sd.right].forEach((col, ci) => {
    const cx = GUTTER + ci * (colW + CARD_GAP);
    const acColor = ci === 0 ? ACCENT_WARM : ACCENT;

    slide.addShape("rect", {
      x: cx, y: colY, w: colW, h: colH, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });

    // Accent bar at top
    slide.addShape("rect", {
      x: cx, y: colY, w: colW, h: 0.06,
      fill: { color: acColor },
    });

    // Column heading
    slide.addText(sanitize(col.heading), {
      x: cx + 0.25, y: colY + 0.2, w: colW - 0.5, h: 0.4,
      fontSize: 22, fontFace: "Georgia", bold: true, color: acColor,
      align: "left", margin: 0,
    });

    // Bullets
    const bulletTexts = col.bullets.map((b) => ({
      text: sanitize(b),
      options: {
        fontSize: 18, fontFace: "Calibri", color: bodyColor,
        bullet: true, breakLine: true, paraSpaceAfter: 6,
      },
    }));
    slide.addText(bulletTexts, {
      x: cx + 0.25, y: colY + 0.7, w: colW - 0.5, h: colH - 1.0,
      align: "left", margin: 0, valign: "top",
    });
  });
}

function buildGridSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;
  const headColor = light ? TXT_MUTED_L : TXT_MUTED;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  // Table-like grid
  const rows = sd.rows;
  const hasIndustry = rows[0] && rows[0].industry;
  const cols = hasIndustry ? 3 : 3;
  const headerLabels = hasIndustry
    ? ["Industry", "Before", "After"]
    : ["Before", "After", "Shift"];

  const tableY = 1.3;
  const rowH = 0.48;
  const headerH = 0.42;
  const tableW = CONTENT_W;

  // Header row background
  slide.addShape("rect", {
    x: GUTTER, y: tableY, w: tableW, h: headerH,
    fill: { color: ACCENT, transparency: 85 },
  });

  // Column widths
  const cws = hasIndustry ? [2.6, 2.6, 2.6] : [2.6, 2.6, 2.6];
  const totalCW = cws.reduce((a, b) => a + b, 0);
  const scale = tableW / totalCW;
  const colWidths = cws.map((w) => w * scale);

  // Headers
  let hx = GUTTER;
  headerLabels.forEach((lbl, ci) => {
    slide.addText(lbl, {
      x: hx, y: tableY, w: colWidths[ci], h: headerH,
      fontSize: 16, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "left", margin: [0, 0, 0, 8],
    });
    hx += colWidths[ci];
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = tableY + headerH + ri * rowH;
    // Alternating row bg
    if (ri % 2 === 0) {
      slide.addShape("rect", {
        x: GUTTER, y: ry, w: tableW, h: rowH,
        fill: { color: cardFill, transparency: light ? 0 : 50 },
      });
    }

    let rx = GUTTER;
    const vals = hasIndustry
      ? [row.industry, row.before, row.after]
      : [row.before, row.after, row.shift];

    vals.forEach((v, ci) => {
      const isAccentCol = hasIndustry ? ci === 2 : ci === 2;
      slide.addText(sanitize(v), {
        x: rx, y: ry, w: colWidths[ci], h: rowH,
        fontSize: 16, fontFace: "Calibri",
        bold: isAccentCol, color: isAccentCol ? ACCENT : bodyColor,
        align: "left", margin: [0, 0, 0, 8], valign: "middle",
      });
      rx += colWidths[ci];
    });
  });

  // Footer
  if (sd.footer) {
    const footY = tableY + headerH + rows.length * rowH + 0.2;
    slide.addText(sanitize(sd.footer), {
      x: GUTTER, y: footY, w: CONTENT_W, h: 0.3,
      fontSize: 16, fontFace: "Calibri", italic: true, color: headColor,
      align: "left", margin: 0,
    });
  }
}

function buildProcessSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: GUTTER, y: 0.95, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", color: light ? TXT_MUTED_L : TXT_MUTED,
      align: "left", margin: 0,
    });
  }

  // Horizontal process steps
  const steps = sd.steps;
  const stepGap = 0.25;
  const stepW = (CONTENT_W - (steps.length - 1) * stepGap) / steps.length;
  const stepY = 1.5;
  const stepH = 3.4;
  const accentColors = [ACCENT, ACCENT2, ACCENT_WARM, "4FC3F7"];

  steps.forEach((step, si) => {
    const sx = GUTTER + si * (stepW + stepGap);
    const ac = accentColors[si % accentColors.length];

    // Card
    slide.addShape("rect", {
      x: sx, y: stepY, w: stepW, h: stepH, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });

    // Step number circle
    slide.addShape("ellipse", {
      x: sx + 0.15, y: stepY + 0.15, w: 0.4, h: 0.4,
      fill: { color: ac, transparency: 80 },
      line: { color: ac, width: 1.5 },
    });
    slide.addText(String(si + 1), {
      x: sx + 0.15, y: stepY + 0.15, w: 0.4, h: 0.4,
      fontSize: 16, fontFace: "Calibri", bold: true, color: ac,
      align: "center", valign: "middle", margin: 0,
    });

    // Step label
    slide.addText(sanitize(step.label), {
      x: sx + 0.15, y: stepY + 0.65, w: stepW - 0.3, h: 0.45,
      fontSize: 17, fontFace: "Georgia", bold: true, color: ac,
      align: "left", margin: 0,
    });

    // Bullets
    if (step.bullets) {
      const bTexts = step.bullets.map((b) => ({
        text: sanitize(b),
        options: {
          fontSize: 15, fontFace: "Calibri", color: bodyColor,
          bullet: true, breakLine: true, paraSpaceAfter: 4,
        },
      }));
      slide.addText(bTexts, {
        x: sx + 0.15, y: stepY + 1.15, w: stepW - 0.3, h: stepH - 1.5,
        align: "left", margin: 0, valign: "top",
      });
    }

    // Arrow between steps
    if (si < steps.length - 1) {
      const arrowX = sx + stepW + 0.02;
      slide.addShape("line", {
        x: arrowX, y: stepY + stepH / 2, w: stepGap - 0.04, h: 0,
        line: { color: ACCENT, width: 1.5 },
      });
    }
  });

  // Callout
  if (sd.callout) {
    slide.addText(sanitize(sd.callout), {
      x: GUTTER, y: 5.1, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", italic: true, bold: true, color: ACCENT,
      align: "left", margin: 0,
    });
  }
}

function buildChartSlide(slide, sd, iconSet, pres, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: GUTTER, y: 0.95, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", color: light ? TXT_MUTED_L : TXT_MUTED,
      align: "left", margin: 0,
    });
  }

  // PIE chart on left
  const chartData = sd.chartData;
  const chartColors = [ACCENT, ACCENT2, ACCENT_WARM];

  slide.addChart(pres.charts.PIE, [
    {
      name: "Claims",
      labels: chartData.labels.map(sanitize),
      values: chartData.values,
    },
  ], {
    x: GUTTER, y: 1.5, w: 4.2, h: 3.5,
    showLegend: true,
    legendPos: "b",
    legendFontFace: "Calibri",
    legendFontSize: 12,
    legendColor: light ? TXT_DARK : TXT_LIGHT,
    chartColors: chartColors,
    dataLabelColor: TXT_WHITE,
    showPercent: true,
    dataLabelFontSize: 14,
    dataLabelFontFace: "Calibri",
    showTitle: false,
  });

  // Right side: stat callout
  const rightX = GUTTER + 4.6;
  const rightW = CONTENT_W - 4.6;

  // Big number card
  slide.addShape("rect", {
    x: rightX, y: 1.6, w: rightW, h: 1.6, rectRadius: 0.08,
    fill: { color: light ? BG_LIGHT_CARD : BG_DARK_CARD },
    shadow: light ? createCardShadow() : createDarkCardShadow(),
  });

  slide.addText(String(chartData.total), {
    x: rightX, y: 1.65, w: rightW, h: 0.85,
    fontSize: 60, fontFace: "Georgia", bold: true, color: ACCENT,
    align: "center", margin: 0,
  });
  slide.addText(sanitize(chartData.unit + " processed overnight"), {
    x: rightX, y: 2.5, w: rightW, h: 0.4,
    fontSize: 18, fontFace: "Calibri", color: bodyColor,
    align: "center", margin: 0,
  });

  // Callout
  if (sd.callout) {
    slide.addShape("rect", {
      x: rightX, y: 3.5, w: rightW, h: 0.7, rectRadius: 0.08,
      fill: { color: ACCENT, transparency: 88 },
      line: { color: ACCENT, width: 1 },
    });
    slide.addText(sanitize(sd.callout), {
      x: rightX + 0.15, y: 3.5, w: rightW - 0.3, h: 0.7,
      fontSize: 18, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "left", margin: 0, valign: "middle",
    });
  }
}

function buildKeyMessageSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: GUTTER, y: 0.95, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", color: light ? TXT_MUTED_L : TXT_MUTED,
      align: "left", margin: 0,
    });
  }

  // Content card with icon rows
  const cardX = GUTTER;
  const cardY = 1.5;
  const cardW = CONTENT_W;
  const cardH = 3.7;

  slide.addShape("rect", {
    x: cardX, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
    fill: { color: cardFill },
    shadow: light ? createCardShadow() : createDarkCardShadow(),
  });

  // Bullets with icons
  const bullets = sd.bullets;
  const rowH = cardH / bullets.length;

  bullets.forEach((b, bi) => {
    const ry = cardY + bi * rowH + 0.1;
    // Small accent dot
    slide.addShape("ellipse", {
      x: cardX + 0.3, y: ry + rowH / 2 - 0.08, w: 0.16, h: 0.16,
      fill: { color: ACCENT },
    });
    slide.addText(sanitize(b), {
      x: cardX + 0.6, y: ry, w: cardW - 0.9, h: rowH,
      fontSize: 22, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0, valign: "middle",
    });

    // Separator line
    if (bi < bullets.length - 1) {
      slide.addShape("line", {
        x: cardX + 0.3, y: ry + rowH, w: cardW - 0.6, h: 0,
        line: { color: light ? "E0E3EB" : "1E2338", width: 0.5 },
      });
    }
  });
}

function buildMetricsSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  if (sd.subtitle) {
    slide.addText(sanitize(sd.subtitle), {
      x: GUTTER, y: 0.95, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", color: light ? TXT_MUTED_L : TXT_MUTED,
      align: "left", margin: 0,
    });
  }

  // 2x2 grid of metric cards
  const items = sd.items;
  const gridCols = 2;
  const gridRows = Math.ceil(items.length / gridCols);
  const cw = (CONTENT_W - CARD_GAP) / 2;
  const ch = 1.35;
  const startY = 1.5;
  const urgencyColors = [ACCENT_WARM, ACCENT, ACCENT2, "4FC3F7"];

  items.forEach((item, idx) => {
    const col = idx % gridCols;
    const row = Math.floor(idx / gridCols);
    const cx = GUTTER + col * (cw + CARD_GAP);
    const cy = startY + row * (ch + CARD_GAP);
    const ac = urgencyColors[idx % urgencyColors.length];

    slide.addShape("rect", {
      x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });

    // Left accent bar
    slide.addShape("rect", {
      x: cx, y: cy, w: 0.06, h: ch,
      fill: { color: ac },
    });

    // Label
    slide.addText(sanitize(item.label), {
      x: cx + 0.2, y: cy + 0.12, w: cw - 0.4, h: 0.45,
      fontSize: 17, fontFace: "Georgia", bold: true, color: ac,
      align: "left", margin: 0,
    });

    // Action
    slide.addText(sanitize(item.action), {
      x: cx + 0.2, y: cy + 0.6, w: cw - 0.4, h: 0.5,
      fontSize: 18, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0,
    });
  });

  // Callout
  if (sd.callout) {
    const lastRow = Math.ceil(items.length / gridCols);
    const calloutY = startY + lastRow * (ch + CARD_GAP) + 0.1;
    slide.addText(sanitize(sd.callout), {
      x: GUTTER, y: calloutY, w: CONTENT_W, h: 0.3,
      fontSize: 18, fontFace: "Calibri", italic: true, bold: true, color: ACCENT,
      align: "left", margin: 0,
    });
  }
}

function buildStatementSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  // Body statement
  slide.addText(sanitize(sd.body), {
    x: GUTTER, y: 1.1, w: CONTENT_W, h: 0.5,
    fontSize: 24, fontFace: "Calibri", color: bodyColor,
    align: "left", margin: 0,
  });

  // Contrast cards (wrong vs right)
  if (sd.contrast) {
    const colW = (CONTENT_W - CARD_GAP) / 2;
    const cy = 1.9;
    const ch = 1.6;

    // Wrong
    slide.addShape("rect", {
      x: GUTTER, y: cy, w: colW, h: ch, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });
    slide.addShape("rect", {
      x: GUTTER, y: cy, w: colW, h: 0.06,
      fill: { color: ACCENT_WARM },
    });
    slide.addText("Don't", {
      x: GUTTER + 0.2, y: cy + 0.2, w: colW - 0.4, h: 0.3,
      fontSize: 16, fontFace: "Calibri", bold: true, color: ACCENT_WARM,
      align: "left", margin: 0,
    });
    slide.addText(sanitize(sd.contrast.wrong), {
      x: GUTTER + 0.2, y: cy + 0.55, w: colW - 0.4, h: 0.8,
      fontSize: 20, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0,
    });

    // Right
    const rx = GUTTER + colW + CARD_GAP;
    slide.addShape("rect", {
      x: rx, y: cy, w: colW, h: ch, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });
    slide.addShape("rect", {
      x: rx, y: cy, w: colW, h: 0.06,
      fill: { color: ACCENT },
    });
    slide.addText("Do", {
      x: rx + 0.2, y: cy + 0.2, w: colW - 0.4, h: 0.3,
      fontSize: 16, fontFace: "Calibri", bold: true, color: ACCENT,
      align: "left", margin: 0,
    });
    slide.addText(sanitize(sd.contrast.right), {
      x: rx + 0.2, y: cy + 0.55, w: colW - 0.4, h: 0.8,
      fontSize: 20, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0,
    });
  }

  // Stages (trust stages)
  if (sd.stages) {
    const stageY = sd.contrast ? 3.8 : 1.9;
    const stageW = (CONTENT_W - (sd.stages.length - 1) * 0.15) / sd.stages.length;

    sd.stages.forEach((st, si) => {
      const sx = GUTTER + si * (stageW + 0.15);
      const opacity = 85 - si * 15; // progressively more opaque
      slide.addShape("rect", {
        x: sx, y: stageY, w: stageW, h: 0.6, rectRadius: 0.08,
        fill: { color: ACCENT, transparency: opacity },
        line: { color: ACCENT, width: 1 },
      });
      slide.addText(sanitize(st), {
        x: sx, y: stageY, w: stageW, h: 0.6,
        fontSize: 16, fontFace: "Calibri", bold: true, color: ACCENT,
        align: "center", valign: "middle", margin: 0,
      });

      // Arrow between stages
      if (si < sd.stages.length - 1) {
        slide.addShape("line", {
          x: sx + stageW + 0.01, y: stageY + 0.3, w: 0.13, h: 0,
          line: { color: ACCENT, width: 1.5 },
        });
      }
    });
  }

  // Steps (creation steps)
  if (sd.steps) {
    const stepY = sd.contrast ? 3.8 : 1.9;
    const stepW = (CONTENT_W - (sd.steps.length - 1) * 0.12) / sd.steps.length;
    const stepColors = [ACCENT, ACCENT2, ACCENT_WARM, "4FC3F7", ACCENT];

    sd.steps.forEach((st, si) => {
      const sx = GUTTER + si * (stepW + 0.12);
      const ac = stepColors[si % stepColors.length];

      slide.addShape("rect", {
        x: sx, y: stepY, w: stepW, h: 0.85, rectRadius: 0.08,
        fill: { color: light ? BG_LIGHT_CARD : BG_DARK_CARD },
        shadow: light ? createCardShadow() : createSubtleShadow(),
      });

      // Step number
      slide.addShape("ellipse", {
        x: sx + 0.1, y: stepY + 0.08, w: 0.28, h: 0.28,
        fill: { color: ac, transparency: 75 },
        line: { color: ac, width: 1 },
      });
      slide.addText(String(si + 1), {
        x: sx + 0.1, y: stepY + 0.08, w: 0.28, h: 0.28,
        fontSize: 12, fontFace: "Calibri", bold: true, color: ac,
        align: "center", valign: "middle", margin: 0,
      });

      slide.addText(sanitize(st), {
        x: sx + 0.05, y: stepY + 0.4, w: stepW - 0.1, h: 0.4,
        fontSize: 13, fontFace: "Calibri", color: bodyColor,
        align: "center", margin: 0, valign: "top",
      });
    });
  }
}

function buildBulletsSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;
  const cardFill = light ? BG_LIGHT_CARD : BG_DARK_CARD;

  if (!light) addDecoArc(slide);

  // Title
  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  // 2x3 grid of bullet cards
  const items = sd.bullets;
  const gridCols = 2;
  const cw = (CONTENT_W - CARD_GAP) / 2;
  const ch = 1.15;
  const startY = 1.3;
  const accentColors = [ACCENT, ACCENT2, ACCENT_WARM, "4FC3F7", ACCENT, ACCENT2];

  items.forEach((item, idx) => {
    const col = idx % gridCols;
    const row = Math.floor(idx / gridCols);
    const cx = GUTTER + col * (cw + CARD_GAP);
    const cy = startY + row * (ch + 0.2);
    const ac = accentColors[idx % accentColors.length];

    slide.addShape("rect", {
      x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08,
      fill: { color: cardFill },
      shadow: light ? createCardShadow() : createDarkCardShadow(),
    });

    // Left accent bar
    slide.addShape("rect", {
      x: cx, y: cy, w: 0.06, h: ch,
      fill: { color: ac },
    });

    // Heading
    slide.addText(sanitize(item.heading), {
      x: cx + 0.2, y: cy + 0.1, w: cw - 0.4, h: 0.4,
      fontSize: 19, fontFace: "Georgia", bold: true, color: ac,
      align: "left", margin: 0,
    });

    // Detail
    slide.addText(sanitize(item.detail), {
      x: cx + 0.2, y: cy + 0.5, w: cw - 0.4, h: 0.5,
      fontSize: 17, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0,
    });
  });
}

function buildGenericSlide(slide, sd, iconSet, light) {
  const titleColor = light ? TXT_DARK : TXT_WHITE;
  const bodyColor = light ? TXT_DARK : TXT_LIGHT;

  if (!light) addDecoArc(slide);

  if (iconSet) addIconCircle(slide, light ? iconSet.dark : iconSet.accent, GUTTER, 0.35, 0.5);
  slide.addText(sanitize(sd.title || ""), {
    x: GUTTER + (iconSet ? 0.6 : 0), y: 0.3, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 44, fontFace: "Georgia", bold: true, color: titleColor,
    align: "left", margin: 0,
  });

  if (sd.body) {
    slide.addText(sanitize(sd.body), {
      x: GUTTER, y: 1.3, w: CONTENT_W, h: 1.5,
      fontSize: 24, fontFace: "Calibri", color: bodyColor,
      align: "left", margin: 0,
    });
  }
}

// ── Run ────────────────────────────────────────────────────────────────────
main().catch((err) => {
  console.error("Error generating presentation:", err);
  process.exit(1);
});
