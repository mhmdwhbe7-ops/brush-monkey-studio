import { jsPDF } from 'jspdf';
import {
  generateArabicBrandGuidePdf,
  generateArabicCarouselKitPdf,
  generateArabicPrintSpecPdf,
} from './generateArabicPdfs';

// Helper to draw a decorative brutalist header on each page
function drawPageHeader(
  doc: jsPDF,
  category: string,
  docNumber: string,
  pageNumber: number,
  totalPages: number
) {
  // Top thin accent bar
  doc.setFillColor(238, 144, 7); // Tangerine #EE9007
  doc.rect(0, 0, 210, 4, 'F');

  // Header rule
  doc.setDrawColor(17, 20, 9); // Forest #111409
  doc.setLineWidth(0.4);
  doc.line(15, 16, 195, 16);

  // Left header label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(17, 20, 9);
  doc.text(`BRUSH MONKEY STUDIO // ${category.toUpperCase()}`, 15, 13);

  // Right header label
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`DOC ${docNumber}  |  PAGE ${pageNumber} OF ${totalPages}`, 195, 13, { align: 'right' });
}

// Helper to draw a clean footer on each page
function drawPageFooter(doc: jsPDF) {
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.3);
  doc.line(15, 282, 195, 282);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(17, 20, 9);
  doc.text('BRUSH MONKEY STUDIO  •  CREATIVE VISUAL SYSTEMS', 15, 287);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('FREE OPEN TOOLKIT  •  HTTPS://BRUSHMONKEY.STUDIO', 195, 287, { align: 'right' });
}

// -------------------------------------------------------------
// 1. STARTUP BRAND GUIDE PDF GENERATOR
// -------------------------------------------------------------
export function generateStartupBrandGuidePdf(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const totalPages = 4;

  // PAGE 1: COVER
  // Background warm wash
  doc.setFillColor(237, 225, 209); // #EDE1D1
  doc.rect(0, 0, 210, 297, 'F');

  // Top Accent Band
  doc.setFillColor(238, 144, 7); // #EE9007
  doc.rect(0, 0, 210, 12, 'F');

  // Cover Badge
  doc.setFillColor(17, 20, 9);
  doc.roundedRect(20, 32, 58, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(237, 225, 209);
  doc.text('FREE STUDIO TOOLKIT #01', 23, 37.5);

  // Big Display Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(17, 20, 9);
  doc.text('BRAND LAUNCH', 20, 56);
  doc.text('STARTER GUIDE', 20, 68);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('The essential handbook for emerging startups, creative teams & founders.', 20, 80);

  // Decorative brutal box with summary
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.8);
  doc.setFillColor(255, 255, 255);
  doc.rect(20, 96, 170, 78, 'FD');

  // Inner box header
  doc.setFillColor(17, 20, 9);
  doc.rect(20, 96, 170, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(237, 225, 209);
  doc.text('DOCUMENT SCOPE & KEY OBJECTIVES', 25, 102.5);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  const points = [
    '• Establish unshakeable logo clearspace rules and minimum digital/print dimensions.',
    '• Lock in high-contrast color codes across HEX, RGB, CMYK, and WCAG AA standards.',
    '• Structure a bulletproof typographic scale from hero headlines to micro metadata.',
    '• Checklist of launch-day digital assets for web, social profiles, and marketing collateral.',
    '• Practical export standards to avoid pixelation, muddy colors, and misaligned crops.',
  ];
  let yPos = 114;
  points.forEach((pt) => {
    doc.text(pt, 25, yPos);
    yPos += 11;
  });

  // Metadata Card at bottom
  doc.setFillColor(238, 144, 7);
  doc.rect(20, 190, 170, 46, 'F');
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.6);
  doc.rect(20, 190, 170, 46, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 20, 9);
  doc.text('PUBLICATION METADATA', 26, 200);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Author: Brush Monkey Studio Design Team', 26, 208);
  doc.text('Target Audience: Founders, Creative Directors, Product Managers', 26, 215);
  doc.text('License: Open Studio Resource (Free for Commercial & Personal Use)', 26, 222);
  doc.text('Format: A4 Vector Print Ready | Version 2.6', 26, 229);

  // Cover Footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('© 2026 BRUSH MONKEY STUDIO. ALL RIGHTS RESERVED.', 20, 275);

  // -------------------------------------------------------------
  // PAGE 2: LOGO CLEARSPACE & SCALING RULES
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'FOUNDATIONAL BRAND ASSETS', 'BG-01', 2, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 20, 9);
  doc.text('1. LOGO INTEGRITY & SCALING SYSTEM', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text(
    'A brand identity fails when deployed inconsistently. Follow these exact geometric limits.',
    15,
    33
  );

  // Two Column Spec Boxes
  // Box Left: Clearspace
  doc.setFillColor(248, 246, 242);
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.5);
  doc.rect(15, 40, 85, 95, 'FD');

  doc.setFillColor(17, 20, 9);
  doc.rect(15, 40, 85, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('CLEARSPACE RULE (THE "X" UNIT)', 19, 46);

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const clearspaceText = [
    'Always preserve a minimum exclusion zone',
    'around the primary logo equal to 1.5x the',
    'height of the capital lettermark ("X").',
    '',
    '• No typography, icons, or photo elements',
    '  may cross into this designated zone.',
    '• Increases visual hierarchy on busy',
    '  landing pages and packaging.',
    '• For dark mode, ensure a minimum of 4.5:1',
    '  contrast ratio against the backdrop.',
  ];
  let csY = 56;
  clearspaceText.forEach((line) => {
    doc.text(line, 19, csY);
    csY += 6.5;
  });

  // Box Right: Minimum Dimensions
  doc.setFillColor(248, 246, 242);
  doc.rect(110, 40, 85, 95, 'FD');

  doc.setFillColor(17, 20, 9);
  doc.rect(110, 40, 85, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('MINIMUM PRODUCTION SIZES', 114, 46);

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const dimSpecs = [
    'Digital Environments:',
    '  • Favicon: 32 x 32 px (Simplified glyph)',
    '  • App Icon: 1024 x 1024 px master',
    '  • Web Navbar: 36px height minimum',
    '  • Email Signature: 48px height minimum',
    '',
    'Physical Print Environments:',
    '  • Business Card: 22mm width minimum',
    '  • Screenprint / Embroidery: 30mm width',
    '  • Billboards / Signage: Vector SVG only',
  ];
  let dimY = 56;
  dimSpecs.forEach((line) => {
    doc.text(line, 114, dimY);
    dimY += 6.5;
  });

  // Table of File Formats
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(17, 20, 9);
  doc.text('LOGO EXPORT FORMAT MATRIX', 15, 148);

  // Table Header
  doc.setFillColor(238, 144, 7);
  doc.rect(15, 153, 180, 8, 'F');
  doc.setDrawColor(17, 20, 9);
  doc.rect(15, 153, 180, 8, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(17, 20, 9);
  doc.text('FORMAT', 18, 158.5);
  doc.text('COLOR SPACE', 45, 158.5);
  doc.text('TRANSPARENCY', 85, 158.5);
  doc.text('PRIMARY USE CASE', 125, 158.5);

  const formatRows = [
    ['.SVG', 'RGB / sRGB', 'Yes (Vector)', 'Websites, native apps, software UI'],
    ['.EPS / .AI', 'CMYK / Pantone', 'Yes (Vector)', 'Commercial print, signage, merchandise'],
    ['.PNG (3x)', 'sRGB (300 DPI)', 'Yes (Raster)', 'Keynote slides, social banners, Notion'],
    ['.WEBP', 'sRGB (Optimized)', 'Yes (Compressed)', 'High performance web assets & blogs'],
    ['.PDF/X-4', 'CMYK (FOGRA39)', 'Preserved', 'Press-ready print collateral & packaging'],
  ];

  let rowY = 161;
  formatRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 244, idx % 2 === 0 ? 255 : 242, idx % 2 === 0 ? 255 : 238);
    doc.rect(15, rowY, 180, 9, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(17, 20, 9);
    doc.text(row[0], 18, rowY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(row[1], 45, rowY + 6);
    doc.text(row[2], 85, rowY + 6);
    doc.text(row[3], 125, rowY + 6);
    rowY += 9;
  });

  // Callout warning
  doc.setFillColor(237, 225, 209);
  doc.setDrawColor(238, 144, 7);
  doc.setLineWidth(0.8);
  doc.rect(15, 215, 180, 24, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(238, 144, 7);
  doc.text('CRITICAL RULE: NEVER RASTERIZE BRAND MARKS BEFORE RESIZING', 20, 222);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text(
    'Always import the original master .SVG into your layout tool (Figma, Illustrator, InDesign).',
    20,
    228
  );
  doc.text(
    'Never stretch, skew, change tracking, or apply arbitrary drop shadows to official marks.',
    20,
    234
  );

  drawPageFooter(doc);

  // -------------------------------------------------------------
  // PAGE 3: COLOR ARCHITECTURE & CONTRAST
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'COLOR & TYPOGRAPHY SYSTEM', 'BG-01', 3, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 20, 9);
  doc.text('2. COLOR ARCHITECTURE & ACCESSIBILITY', 15, 27);

  // Color Swatch Grid
  const swatches = [
    { name: 'Tangerine Sun', hex: '#EE9007', rgb: '238, 144, 7', cmyk: '0, 48, 97, 7', role: 'Primary Accent / CTA' },
    { name: 'Deep Forest', hex: '#111409', rgb: '17, 20, 9', cmyk: '65, 55, 75, 80', role: 'Primary Ink / Type' },
    { name: 'Warm Cream', hex: '#EDE1D1', rgb: '237, 225, 209', cmyk: '5, 8, 14, 0', role: 'Surface Background' },
    { name: 'Pure Chalk', hex: '#FAFAF7', rgb: '250, 250, 247', cmyk: '1, 1, 2, 0', role: 'Elevated Card Canvas' },
  ];

  let swY = 36;
  swatches.forEach((sw) => {
    // Swatch box
    doc.setDrawColor(17, 20, 9);
    doc.setLineWidth(0.4);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, swY, 180, 20, 'FD');

    // Color square
    if (sw.hex === '#EE9007') doc.setFillColor(238, 144, 7);
    else if (sw.hex === '#111409') doc.setFillColor(17, 20, 9);
    else if (sw.hex === '#EDE1D1') doc.setFillColor(237, 225, 209);
    else doc.setFillColor(250, 250, 247);

    doc.rect(17, swY + 2, 16, 16, 'FD');

    // Text labels
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 20, 9);
    doc.text(sw.name, 38, swY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`HEX: ${sw.hex}  |  RGB: (${sw.rgb})  |  CMYK: (${sw.cmyk})`, 38, swY + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(238, 144, 7);
    doc.text(sw.role, 190, swY + 11, { align: 'right' });

    swY += 23;
  });

  // Typography Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(17, 20, 9);
  doc.text('3. TYPOGRAPHIC SCALE & HIERARCHY', 15, 136);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text('Balanced step ratio using Major Second (1.125) and Perfect Fourth (1.333).', 15, 142);

  const typeRows = [
    ['Display / H1', 'Syne Bold / Oswald', '48px - 64px', 'Line height: 1.05 | Tracking: -0.03em'],
    ['Heading 2', 'Syne SemiBold / Cairo', '28px - 36px', 'Line height: 1.15 | Tracking: -0.02em'],
    ['Heading 3', 'Space Grotesk / Tajawal', '20px - 24px', 'Line height: 1.25 | Tracking: -0.01em'],
    ['Body Text', 'Plus Jakarta Sans Regular', '15px - 17px', 'Line height: 1.60 | Opt: 65-75 chars/line'],
    ['Code / Micro', 'Space Mono / Geist Mono', '11px - 13px', 'Line height: 1.40 | Monospace precision'],
  ];

  let tY = 149;
  typeRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 246, i % 2 === 0 ? 255 : 244, i % 2 === 0 ? 255 : 240);
    doc.setDrawColor(17, 20, 9);
    doc.setLineWidth(0.3);
    doc.rect(15, tY, 180, 11, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 20, 9);
    doc.text(row[0], 18, tY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(row[1], 55, tY + 7);
    doc.text(row[2], 105, tY + 7);
    doc.setTextColor(100, 100, 100);
    doc.text(row[3], 135, tY + 7);

    tY += 11;
  });

  drawPageFooter(doc);

  // -------------------------------------------------------------
  // PAGE 4: LAUNCH DAY CHECKLIST
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'LAUNCH DAY PREPARATION', 'BG-01', 4, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 20, 9);
  doc.text('4. THE FOUNDER’S LAUNCH-DAY CHECKLIST', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('Verify every asset before releasing to public channels and PR wires.', 15, 33);

  const checklist = [
    { cat: 'DIGITAL & WEB', items: ['Favicon package uploaded (.ico, 180px apple-touch-icon, 512px PWA)', 'Open Graph (OG) social card (1200x630px, <300KB)', '404 error page branded with clear navigation back to home', 'Email newsletter header template (600px width)'] },
    { cat: 'SOCIAL MEDIA', items: ['1:1 Circular avatar safe zone verified on Instagram, X, LinkedIn', 'Profile banner images rendered at native channel aspect ratios', 'Pinned introductory carousel deck with brand positioning statement', 'Link-in-bio hub styled with official primary palette'] },
    { cat: 'PRESS & COLLATERAL', items: ['Press Kit ZIP folder containing vector logos in dark and light modes', 'Founder bio portraits shot against neutral editorial background', 'One-page brand guidelines PDF for journalists & conference hosts', 'Invoice and proposal templates ready in Google Docs/Notion'] },
  ];

  let clY = 42;
  checklist.forEach((group) => {
    doc.setFillColor(238, 144, 7);
    doc.rect(15, clY, 180, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 20, 9);
    doc.text(group.cat, 18, clY + 5);
    clY += 7;

    group.items.forEach((item) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(17, 20, 9);
      doc.setLineWidth(0.2);
      doc.rect(15, clY, 180, 9, 'FD');

      // Checkbox square
      doc.rect(19, clY + 2.5, 4, 4, 'D');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(30, 30, 30);
      doc.text(item, 27, clY + 6);
      clY += 9;
    });

    clY += 5;
  });

  // Bottom congratulations badge
  doc.setFillColor(17, 20, 9);
  doc.rect(15, 226, 180, 38, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(238, 144, 7);
  doc.text('READY TO BUILD YOUR COMPLETE VISUAL SYSTEM?', 22, 238);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(237, 225, 209);
  doc.text('Brush Monkey Studio crafts bespoke brand identities, custom typography,', 22, 246);
  doc.text('and production-ready packaging for daring founders worldwide.', 22, 252);
  doc.text('Visit https://brushmonkey.studio or reach out at hello@brushmonkey.studio', 22, 258);

  drawPageFooter(doc);

  // Save the PDF file
  doc.save('Brand-Launch-Checklist-Guide-BrushMonkey.pdf');
}

// -------------------------------------------------------------
// 2. SOCIAL CAROUSEL KIT SPEC PDF GENERATOR
// -------------------------------------------------------------
export function generateSocialMediaKitPdf(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const totalPages = 3;

  // PAGE 1: COVER
  doc.setFillColor(17, 20, 9); // #111409 Deep Forest
  doc.rect(0, 0, 210, 297, 'F');

  // Tangerine band
  doc.setFillColor(238, 144, 7);
  doc.rect(0, 0, 210, 10, 'F');

  // White badge
  doc.setFillColor(237, 225, 209);
  doc.roundedRect(20, 32, 65, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(17, 20, 9);
  doc.text('FIGMA & CANVA TEMPLATES #02', 23, 37.5);

  // Big Display Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(237, 225, 209);
  doc.text('PLUG & PLAY', 20, 56);
  doc.text('CAROUSEL KIT', 20, 68);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 200);
  doc.text('High-retention social decks, story overlays, and modular auto-layouts.', 20, 80);

  // Card Overview
  doc.setFillColor(28, 33, 16);
  doc.setDrawColor(238, 144, 7);
  doc.setLineWidth(0.8);
  doc.rect(20, 95, 170, 85, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(238, 144, 7);
  doc.text('KIT INVENTORY & SYSTEM OVERVIEW', 26, 106);

  const kitSpecs = [
    '• 24 Production-ready slide artboards optimized for 1080 x 1350px (4:5 portrait ratio).',
    '• 12 Story & Reel hook title cards optimized for 1080 x 1920px (9:16 vertical ratio).',
    '• Pre-configured Figma Auto-Layout components with tokenized color swatches.',
    '• 7-Slide viral retention framework with proven hook-to-CTA pacing.',
    '• Free Google Fonts pairing (Syne, Plus Jakarta Sans, Space Mono) with 100% open licenses.',
    '• Dual Theme: Pre-built in both Light Editorial (#EDE1D1) and Dark Obsidian (#111409).',
  ];
  let ksY = 117;
  kitSpecs.forEach((s) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(230, 230, 230);
    doc.text(s, 26, ksY);
    ksY += 10;
  });

  // Bottom Notice
  doc.setFillColor(238, 144, 7);
  doc.rect(20, 196, 170, 45, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 20, 9);
  doc.text('HOW TO ACCESS FIGMA / CANVA SOURCE FILES', 26, 208);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('1. Visit https://brushmonkey.studio/resources/social-kit', 26, 217);
  doc.text('2. Click "Duplicate to Figma" or "Open in Canva" using your free account.', 26, 224);
  doc.text('3. Swap typography and primary brand colors via the global local variables panel.', 26, 231);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text('BRUSH MONKEY STUDIO © 2026. FREE OPEN SOURCE LICENSE.', 20, 275);

  // -------------------------------------------------------------
  // PAGE 2: THE 7-SLIDE RETENTION FORMULA
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'CAROUSEL RETENTION BLUEPRINT', 'SK-02', 2, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 20, 9);
  doc.text('THE 7-SLIDE STORYTELLING FORMULA', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('A mathematical pacing model engineered for maximum dwell-time and shares.', 15, 33);

  const slides = [
    { num: '01', name: 'THE SCROLL-STOPPER HOOK', desc: 'Bold typography (<8 words), high visual contrast, intriguing question or contrarian truth. Never put logo here.' },
    { num: '02', name: 'THE AGITATION / CONTEXT', desc: 'Identify the exact friction your reader experiences. Validate their frustration in 2 short, punchy sentences.' },
    { num: '03-05', name: 'VALUE NUGGETS (1 PER SLIDE)', desc: 'Deliver actionable, bite-sized solutions. Bold key phrases so skim-readers absorb the core takeaway instantly.' },
    { num: '06', name: 'THE SUMMARY CHEAT-SHEET', desc: 'Synthesize everything into a single comparison grid or bulleted cheat-sheet. This slide drives 80% of "Saves".' },
    { num: '07', name: 'CALL TO ACTION (CTA)', desc: 'Direct instructions: "Save for next sprint", "Tag a co-founder", or "Read full case study at link in bio".' },
  ];

  let slY = 42;
  slides.forEach((sl) => {
    doc.setFillColor(248, 246, 242);
    doc.setDrawColor(17, 20, 9);
    doc.setLineWidth(0.5);
    doc.rect(15, slY, 180, 22, 'FD');

    // Number block
    doc.setFillColor(238, 144, 7);
    doc.rect(15, slY, 20, 22, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(17, 20, 9);
    doc.text(sl.num, 25, slY + 13, { align: 'center' });

    // Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(17, 20, 9);
    doc.text(sl.name, 40, slY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    doc.text(sl.desc, 40, slY + 15);

    slY += 25;
  });

  // Specs Box
  doc.setFillColor(237, 225, 209);
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.6);
  doc.rect(15, 175, 180, 50, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 20, 9);
  doc.text('OPTIMAL SOCIAL CANVAS DIMENSIONS', 20, 184);

  const dimTable = [
    ['Instagram / LinkedIn Carousel Feed', '1080 x 1350 px', '4:5 Portrait (Occupies 35% more vertical screen real estate)'],
    ['Instagram / TikTok Stories & Reels', '1080 x 1920 px', '9:16 Full Screen (Keep 250px top/bottom buffer zone free)'],
    ['X / Twitter Thread Header Deck', '1600 x 900 px', '16:9 Landscape (Auto-expands on mobile timeline)'],
    ['LinkedIn Document Slide PDF', '1200 x 1500 px', 'A4 or 4:5 Portrait PDF upload with swipeable arrows'],
  ];

  let dtY = 192;
  dimTable.forEach((d) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(17, 20, 9);
    doc.text(d[0], 20, dtY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(238, 144, 7);
    doc.text(d[1], 85, dtY);

    doc.setTextColor(70, 70, 70);
    doc.text(d[2], 120, dtY);
    dtY += 7.5;
  });

  drawPageFooter(doc);

  // -------------------------------------------------------------
  // PAGE 3: FIGMA TOKENS & BEST PRACTICES
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'FIGMA DESIGN TOKENS', 'SK-02', 3, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 20, 9);
  doc.text('FIGMA SETUP & AUTO-LAYOUT TOKENS', 15, 27);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(17, 20, 9);
  doc.setLineWidth(0.4);
  doc.rect(15, 36, 180, 100, 'FD');

  doc.setFillColor(17, 20, 9);
  doc.rect(15, 36, 180, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(237, 225, 209);
  doc.text('RECOMMENDED COMPONENT SPACING TOKENS', 20, 41.5);

  const tokens = [
    ['Container Outer Padding', '48px horizontal, 64px vertical (Enforces clean breathing margins)'],
    ['Card Border Radius', '16px smooth squircle (Modern tactile edge)'],
    ['Card Stroke Weight', '1.5px solid #111409 (High-contrast graphic precision)'],
    ['Slide Index Pill (e.g. 01/07)', 'Space Mono font, 11px, 24px height pill, fixed top right'],
    ['Swipe Indicator Chevron', 'Centered on right margin, subtle floating pulse animation'],
    ['Hero Heading Size', '44px - 56px (Maximum 3 lines before visual clutter occurs)'],
    ['Card Body Copy Size', '18px - 22px (Optically tested for effortless mobile readability)'],
    ['Accent Highlighter Box', 'Padding: 4px 8px, background #EE9007, text #111409'],
  ];

  let tokY = 52;
  tokens.forEach((t) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(17, 20, 9);
    doc.text(`• ${t[0]}:`, 20, tokY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(t[1], 75, tokY);
    tokY += 10;
  });

  // Call to action banner
  doc.setFillColor(238, 144, 7);
  doc.rect(15, 148, 180, 36, 'F');
  doc.setDrawColor(17, 20, 9);
  doc.rect(15, 148, 180, 36, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 20, 9);
  doc.text('NEED A BESPOKE SOCIAL DESIGN SYSTEM?', 22, 160);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('We build turnkey Figma design libraries tailored to your marketing cadence.', 22, 168);
  doc.text('Get in touch at hello@brushmonkey.studio for full-service monthly creative.', 22, 175);

  drawPageFooter(doc);

  // Save file
  doc.save('Plug-and-Play-Social-Carousel-Kit-BrushMonkey.pdf');
}

// -------------------------------------------------------------
// 3. SMALL BUSINESS PRINT SPEC SHEET PDF GENERATOR
// -------------------------------------------------------------
export function generatePrintSpecSheetPdf(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const totalPages = 4;

  // PAGE 1: COVER
  doc.setFillColor(237, 225, 209);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFillColor(36, 24, 18); // Dark Roast Coffee #241812
  doc.rect(0, 0, 210, 12, 'F');

  // Badge
  doc.setFillColor(200, 109, 59); // Terracotta #C86D3B
  doc.roundedRect(20, 32, 60, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('PRINT PRODUCTION CHEAT SHEET #03', 23, 37.5);

  // Big Display Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(36, 24, 18);
  doc.text('SMALL BUSINESS', 20, 56);
  doc.text('PRINT SPEC SHEET', 20, 68);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(70, 50, 40);
  doc.text('Commercial press standards, paper stock selection, bleed & finishing guidelines.', 20, 80);

  // Summary box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(36, 24, 18);
  doc.setLineWidth(0.8);
  doc.rect(20, 95, 170, 82, 'FD');

  doc.setFillColor(36, 24, 18);
  doc.rect(20, 95, 170, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(237, 225, 209);
  doc.text('CORE TOPICS COVERED IN THIS MANUAL', 25, 101.5);

  const topics = [
    '• Bleed, trim, and safety margins: How to prevent white hairline cut errors.',
    '• Rich Black vs. 100% K Black: The exact CMYK formula to prevent muddy grey solids.',
    '• Paper stock GSM guide: When to choose 120gsm, 170gsm, 350gsm, or recycled kraft.',
    '• Special finishes: Preparing vector spot UV, gold foil stamping, and die-cut lines.',
    '• Pre-flight printer checklist: Exact export presets for error-free commercial runs.',
  ];
  let topY = 114;
  topics.forEach((t) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 30, 20);
    doc.text(t, 25, topY);
    topY += 12;
  });

  // Printer Vendor Note
  doc.setFillColor(200, 109, 59);
  doc.rect(20, 192, 170, 45, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text('A NOTE FOR FOUNDERS & LOCAL MERCHANTS', 26, 203);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Never order 1,000+ units without requesting a single physical press proof first.', 26, 212);
  doc.text('Digital screens emit RGB light; physical inks absorb CMYK light.', 26, 219);
  doc.text('What looks luminous on a MacBook will always print slightly deeper on raw paper.', 26, 226);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 80, 70);
  doc.text('BRUSH MONKEY STUDIO PRINT DIVISION © 2026. ALL RIGHTS RESERVED.', 20, 275);

  // -------------------------------------------------------------
  // PAGE 2: BLEED, TRIM & BLACK FORMULAS
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'PRE-PRESS GEOMETRY & INK', 'PS-03', 2, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(36, 24, 18);
  doc.text('1. BLEED, TRIM, AND SAFETY ZONES', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('Every physical guillotine cutter has minor mechanical drift (up to 1.5mm).', 15, 33);

  // Spec comparison boxes
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(36, 24, 18);
  doc.setLineWidth(0.5);
  doc.rect(15, 40, 56, 75, 'FD');
  doc.rect(77, 40, 56, 75, 'FD');
  doc.rect(139, 40, 56, 75, 'FD');

  // Box 1
  doc.setFillColor(200, 109, 59);
  doc.rect(15, 40, 56, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('BLEED BOX (+3mm)', 19, 45.5);
  doc.setTextColor(40, 30, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const b1 = [
    'Extend all background',
    'colors and edge photos',
    '3mm (0.125 in) past the',
    'cut line on all 4 sides.',
    '',
    '• Prevents unsightly white',
    '  borders if paper shifts',
    '  under industrial blade.',
  ];
  let b1Y = 55;
  b1.forEach((l) => {
    doc.text(l, 19, b1Y);
    b1Y += 6;
  });

  // Box 2
  doc.setFillColor(36, 24, 18);
  doc.rect(77, 40, 56, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('TRIM LINE (0mm)', 81, 45.5);
  doc.setTextColor(40, 30, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const b2 = [
    'The exact intended finished',
    'dimensions of your piece',
    '(e.g., A5, 90x55mm card,',
    'or coffee bag label).',
    '',
    '• The guillotine cutter',
    '  targets this exact line.',
    '• Always export with',
    '  standard crop marks.',
  ];
  let b2Y = 55;
  b2.forEach((l) => {
    doc.text(l, 81, b2Y);
    b2Y += 6;
  });

  // Box 3
  doc.setFillColor(96, 108, 56); // Matcha Sage
  doc.rect(139, 40, 56, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('SAFETY ZONE (-4mm)', 143, 45.5);
  doc.setTextColor(40, 30, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const b3 = [
    'Keep all typography, logos,',
    'and barcode graphics',
    'at least 4mm inside the',
    'cut line.',
    '',
    '• Guarantees text will',
    '  never get clipped.',
    '• Enhances typographic',
    '  balance and margins.',
  ];
  let b3Y = 55;
  b3.forEach((l) => {
    doc.text(l, 143, b3Y);
    b3Y += 6;
  });

  // Section 2: Black Formulations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(36, 24, 18);
  doc.text('2. CMYK BLACK INK FORMULATION', 15, 128);

  const blackRules = [
    { type: 'RICH BLACK (FOR LARGE SOLIDS & BACKGROUNDS)', formula: 'C: 60  |  M: 40  |  Y: 40  |  K: 100  (TAC: 240%)', desc: 'Produces a deep, velvety, luxurious black. Never use 100% K alone for large posters or solid packaging, as it prints as dull dark grey.' },
    { type: 'STANDARD 100% K (FOR BODY TEXT & FINE LINES)', formula: 'C: 0  |  M: 0  |  Y: 0  |  K: 100  (TAC: 100%)', desc: 'Mandatory for all body copy under 14pt. Using rich black for small text causes color mis-registration, leaving blurry cyan/magenta halos around words.' },
    { type: 'MAXIMUM TOTAL AREA COVERAGE (TAC / TIL)', formula: 'Limit ink density to maximum 300% (280% on uncoated stock)', desc: 'Exceeding 300% ink saturation causes set-off, paper wetness, and smearing onto the back of stacked sheets during shipping.' },
  ];

  let bkY = 136;
  blackRules.forEach((br) => {
    doc.setFillColor(248, 246, 242);
    doc.setDrawColor(36, 24, 18);
    doc.setLineWidth(0.3);
    doc.rect(15, bkY, 180, 24, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(36, 24, 18);
    doc.text(br.type, 19, bkY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(200, 109, 59);
    doc.text(br.formula, 19, bkY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(60, 50, 40);
    doc.text(br.desc, 19, bkY + 18);

    bkY += 27;
  });

  drawPageFooter(doc);

  // -------------------------------------------------------------
  // PAGE 3: PAPER WEIGHTS & FINISHES
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'PAPER SUBSTRATES & FINISHES', 'PS-03', 3, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(36, 24, 18);
  doc.text('3. PAPER WEIGHT (GSM) SELECTOR GUIDE', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text('Grams per Square Meter (GSM) dictates tactile hand-feel, opacity, and folding durability.', 15, 33);

  const paperTable = [
    ['80 - 100 GSM', 'Uncoated Woodfree', 'Standard copy paper, receipts, invoice stationery.'],
    ['130 - 170 GSM', 'Matte / Silk Coated', 'Flyers, folded take-out menus, product inserts, brochures.'],
    ['250 - 300 GSM', 'Heavy Cardstock', 'Table tent cards, booklet covers, art prints, apparel tags.'],
    ['350 - 450 GSM', 'Duplex / Premium Board', 'High-end business cards, loyalty stamp cards, gift vouchers.'],
    ['Brown Kraft (Ribbed)', 'Artisan Natural Fiber', 'Specialty coffee bags, rustic bakery wraps, takeaway sleeves.'],
  ];

  let pY = 40;
  paperTable.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 246, i % 2 === 0 ? 255 : 242, i % 2 === 0 ? 255 : 238);
    doc.setDrawColor(36, 24, 18);
    doc.setLineWidth(0.3);
    doc.rect(15, pY, 180, 12, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(36, 24, 18);
    doc.text(row[0], 19, pY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 109, 59);
    doc.text(row[1], 65, pY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(row[2], 115, pY + 7);

    pY += 12;
  });

  // Section 4: Special Finishes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(36, 24, 18);
  doc.text('4. SPECIAL FINISHES & EMBOSSING', 15, 114);

  const finishes = [
    { title: 'SPOT UV VARNISH', desc: 'Glossy polymer coating cured under UV light. Supplies contrast against matte laminated cards. Create as a 100% K vector overlay on a separate dedicated artboard.' },
    { title: 'METALLIC FOIL STAMPING (GOLD / COPPER)', desc: 'Heated brass die presses foil leaf into the stock. Perfect for coffee label seals. Keep hairline strokes at minimum 0.5pt to prevent foil flaking.' },
    { title: 'DIE-CUTTING & CUSTOM CREASING', desc: 'Custom steel rule dies cut custom shapes (rounded labels, packaging tabs). Specify cut lines in 100% Magenta named "DieLine" set to Overprint.' },
  ];

  let finY = 122;
  finishes.forEach((fn) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(36, 24, 18);
    doc.setLineWidth(0.4);
    doc.rect(15, finY, 180, 19, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(200, 109, 59);
    doc.text(fn.title, 19, finY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 40, 35);
    doc.text(fn.desc, 19, finY + 12);

    finY += 22;
  });

  drawPageFooter(doc);

  // -------------------------------------------------------------
  // PAGE 4: PRE-FLIGHT CHECKLIST
  // -------------------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'PRE-FLIGHT PRINTER HANDOVER', 'PS-03', 4, totalPages);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(36, 24, 18);
  doc.text('5. PRE-PRESS HANDOVER CHECKLIST', 15, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('Check off every requirement before submitting files to your print vendor.', 15, 33);

  const printCheck = [
    '1. COLOR MODE: All artwork converted to CMYK (ISO Coated v2 or GRACoL). Zero RGB elements.',
    '2. RESOLUTION: All raster photos and textures verified at 300 DPI minimum at 100% scale.',
    '3. OUTLINES: All fonts converted to vector curves (Create Outlines / Ctrl+Shift+O) to eliminate font drop.',
    '4. BLEED & MARGINS: 3mm bleed included with trim crop marks enabled in PDF export.',
    '5. OVERPRINT: Black body text set to Overprint; white knockout text verified to never overprint.',
    '6. DIE & FOIL LAYERS: Vector spot finishes placed on separate layers labeled "SpotUV" or "Foil".',
    '7. BARCODES: Tested with physical scanner app on printout; contrast ratio passes grade A.',
    '8. PROOF APPROVAL: Requested a digital soft-proof and 1 hardcopy wet proof before mass run.',
  ];

  let pcY = 44;
  printCheck.forEach((item) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(36, 24, 18);
    doc.setLineWidth(0.3);
    doc.rect(15, pcY, 180, 11, 'FD');

    doc.rect(19, pcY + 3, 5, 5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(36, 24, 18);
    doc.text(item, 28, pcY + 7);
    pcY += 13;
  });

  // Call to action
  doc.setFillColor(36, 24, 18);
  doc.rect(15, 170, 180, 42, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(200, 109, 59);
  doc.text('WANT US TO HANDLE YOUR FULL PRINT PRODUCTION?', 22, 182);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(237, 225, 209);
  doc.text('Brush Monkey Studio collaborates directly with trusted local and European printers,', 22, 190);
  doc.text('managing proof approvals, paper sourcing, and delivery straight to your door.', 22, 196);
  doc.text('Book a print consultation at https://brushmonkey.studio or email hello@brushmonkey.studio', 22, 202);

  drawPageFooter(doc);

  // Save the PDF file
  doc.save('Small-Business-Print-Spec-Sheet-BrushMonkey.pdf');
}

// Master dispatcher supporting both Arabic and English real PDFs
export async function generateRealPdf(id: string, lang: 'AR' | 'EN' = 'AR'): Promise<void> {
  if (lang === 'AR') {
    if (id === 'startup-brand-guide-pdf') {
      await generateArabicBrandGuidePdf();
    } else if (id === 'social-media-kit-figma') {
      await generateArabicCarouselKitPdf();
    } else if (id === 'print-ready-spec-pdf') {
      await generateArabicPrintSpecPdf();
    } else {
      await generateArabicBrandGuidePdf();
    }
  } else {
    if (id === 'startup-brand-guide-pdf') {
      generateStartupBrandGuidePdf();
    } else if (id === 'social-media-kit-figma') {
      generateSocialMediaKitPdf();
    } else if (id === 'print-ready-spec-pdf') {
      generatePrintSpecSheetPdf();
    } else {
      generateStartupBrandGuidePdf();
    }
  }
}
