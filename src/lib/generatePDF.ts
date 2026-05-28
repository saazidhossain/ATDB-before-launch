import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { EquipmentItem } from "@/data/equipment";
import logoMark from "@/assets/atdb-logo-light.webp";

type Lang = "en" | "bn";

/**
 * ATDB Trade International — Equipment Spec Sheet PDF generator.
 *
 * Design goals:
 *  - Branded, print-safe A4 layout (CMYK-friendly orange + dark navy).
 *  - Clear visual hierarchy: hero image + headline → specs → gallery
 *    → description → contact CTA.
 *  - Consistent margins and a paginated footer with brand line + page #.
 *  - Bengali UI is supported on-screen but the PDF is always English
 *    because jsPDF's built-in Helvetica has no Bengali glyphs.
 */

// ─── Brand tokens ─────────────────────────────────────────────────────
const BRAND = {
  navy:    [16, 22, 32]   as [number, number, number],
  navySub: [44, 52, 66]   as [number, number, number],
  orange:  [245, 130, 32] as [number, number, number],
  orangeD: [200, 100, 20] as [number, number, number],
  ink:     [30, 35, 45]   as [number, number, number],
  body:    [60, 65, 75]   as [number, number, number],
  muted:   [120, 125, 135]as [number, number, number],
  hair:    [225, 228, 232]as [number, number, number],
  panel:   [248, 249, 251]as [number, number, number],
  white:   [255, 255, 255]as [number, number, number],
};

const MARGIN_X = 14;       // mm
const HEADER_H = 36;       // mm
const FOOTER_H = 14;       // mm

const STR = {
  subtitle: "Heavy Equipment Rental & 1st-Class Civil Contractor  ·  Est. 2000",
  addr:     "Corporate: Dhaka  ·  Branch: Tangail  ·  +880 1712-106242  ·  atdbtrade.com",
  sheet:    "EQUIPMENT SPECIFICATION SHEET",
  spec: "Specification", detail: "Detail",
  category: "Category", brand: "Brand", model: "Model",
  capacity: "Lifting / Operating Capacity",
  origin: "Country of Origin", year: "Year of Manufacture",
  fuel: "Engine / Fuel Type", qty: "Quantity Available",
  notes: "Type / Configuration", asset: "Asset ID", units: "Unit(s)",
  galleryHeading: "Equipment Gallery — Multiple Angles",
  galleryNoneNote: "Visual reference image (high-resolution photography available on request).",
  descHeading: "About This Equipment",
  descFallback:
    "Inspected, maintained and operator-ready unit from ATDB Trade International's owned fleet. " +
    "Available for short-term and long-term rental across Bangladesh with experienced operators, " +
    "site mobilisation and 24/7 maintenance backup.",
  ctaHeading: "Ready to mobilise this unit?",
  ctaBody:
    "Contact our rental desk for availability, daily/weekly/monthly pricing, operator scope, fuel " +
    "terms and site mobilisation. Quotes are typically issued the same business day.",
  contactWa:    "WhatsApp:  +880 1712-106242",
  contactEmail: "Email:     saifulaapi@gmail.com",
  contactWeb:   "Website:   www.atdbtrade.com",
  footerLeft:   "© ATDB Trade International",
  pageOf: (a: number, b: number) => `Page ${a} of ${b}`,
  generated: "Generated",
} as const;

// ─── Image loader → PNG data URL (jsPDF can't embed WEBP reliably) ────
async function loadImage(
  url: string
): Promise<{ dataUrl: string; w: number; h: number } | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const w = img.naturalWidth || 1;
    const h = img.naturalHeight || 1;
    // Cap the canvas at ~1600px on the long edge so the PDF stays
    // print-sharp without bloating file size for the WEBP source.
    const MAX = 1600;
    const scale = Math.min(1, MAX / Math.max(w, h));
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, cw, ch);
    // JPEG keeps the embedded asset small while preserving photo quality.
    return { dataUrl: canvas.toDataURL("image/jpeg", 0.92), w: cw, h: ch };
  } catch {
    return null;
  }
}

/** Draw an image scaled "contain" into a target box, then thin border.
 *  We always preserve aspect ratio and letterbox into a soft panel fill
 *  so nothing overflows the box (jsPDF can't clip raster images).
 */
function drawCoverImage(
  doc: jsPDF,
  img: { dataUrl: string; w: number; h: number },
  x: number, y: number, bw: number, bh: number
) {
  const ratio = img.w / img.h;
  const boxRatio = bw / bh;
  let dw: number, dh: number, dx: number, dy: number;
  if (ratio > boxRatio) {
    // image wider than box → fit width, letterbox vertically
    dw = bw;
    dh = bw / ratio;
    dx = x;
    dy = y + (bh - dh) / 2;
  } else {
    // image taller than box → fit height, letterbox horizontally
    dh = bh;
    dw = bh * ratio;
    dx = x + (bw - dw) / 2;
    dy = y;
  }
  // Background fill so any letterbox area looks intentional.
  doc.setFillColor(...BRAND.panel);
  doc.rect(x, y, bw, bh, "F");
  try {
    doc.addImage(img.dataUrl, "JPEG", dx, dy, dw, dh, undefined, "FAST");
  } catch { /* ignore bad images */ }
  doc.setDrawColor(...BRAND.hair);
  doc.setLineWidth(0.3);
  doc.rect(x, y, bw, bh);
}

// ─── Header / footer chrome ───────────────────────────────────────────
async function drawHeader(doc: jsPDF, logo: Awaited<ReturnType<typeof loadImage>>) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFillColor(...BRAND.navy);
  doc.rect(0, 0, w, HEADER_H, "F");
  // Orange brand bar
  doc.setFillColor(...BRAND.orange);
  doc.rect(0, HEADER_H, w, 1.6, "F");

  if (logo) {
    try {
      const ratio = logo.w / logo.h;
      const lh = 22;
      const lw = Math.min(34, lh * ratio);
      doc.addImage(logo.dataUrl, "JPEG", MARGIN_X, (HEADER_H - lh) / 2, lw, lh);
    } catch { /* ignore */ }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...BRAND.white);
  doc.text("ATDB TRADE INTERNATIONAL", MARGIN_X + 38, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(195, 200, 210);
  doc.text(STR.subtitle, MARGIN_X + 38, 21);
  doc.text(STR.addr, MARGIN_X + 38, 26.5);

  // Top-right timestamp
  const stamp = new Date().toLocaleString("en-GB", {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND.orange);
  doc.text(`${STR.generated}: ${stamp}`, w - MARGIN_X, 31, { align: "right" });
}

function drawFooter(doc: jsPDF, page: number, total: number, eq: EquipmentItem) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...BRAND.navy);
  doc.rect(0, h - FOOTER_H, w, FOOTER_H, "F");
  doc.setFillColor(...BRAND.orange);
  doc.rect(0, h - FOOTER_H, w, 0.8, "F");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(190, 195, 205);
  doc.text(STR.footerLeft, MARGIN_X, h - 5.5);

  doc.setTextColor(...BRAND.white);
  doc.setFont("helvetica", "bold");
  doc.text(`${eq.id}  ·  ${eq.brand} ${eq.model}`, w / 2, h - 5.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(190, 195, 205);
  doc.text(STR.pageOf(page, total), w - MARGIN_X, h - 5.5, { align: "right" });
}

// ─── Main ─────────────────────────────────────────────────────────────
export async function generateEquipmentPDF(eq: EquipmentItem, _lang: Lang = "en") {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const contentW = W - MARGIN_X * 2;

  const logo = await loadImage(logoMark);

  // Pre-load images we need
  const allShots = [
    ...(eq.realPhotos || []),
    eq.image,
  ].filter(Boolean) as string[];
  const heroImg = allShots.length ? await loadImage(allShots[0]) : null;
  const galleryImgs = await Promise.all(allShots.slice(0, 4).map(loadImage));

  await drawHeader(doc, logo);

  // ── Title block ────────────────────────────────────────────────────
  let y = HEADER_H + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND.orange);
  doc.text(STR.sheet, MARGIN_X, y);
  // hairline under eyebrow
  doc.setDrawColor(...BRAND.hair);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_X, y + 1.5, W - MARGIN_X, y + 1.5);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...BRAND.ink);
  // Wrap title if long
  const titleLines = doc.splitTextToSize(eq.name, contentW - 60);
  doc.text(titleLines, MARGIN_X, y);
  y += titleLines.length * 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.muted);
  doc.text(`${eq.brand}  ·  Model ${eq.model}  ·  ${eq.categoryLabel}`, MARGIN_X, y);

  // Right-aligned asset chip
  const chipText = eq.id;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  const cw = doc.getTextWidth(chipText) + 8;
  const cx = W - MARGIN_X - cw;
  const cy = y - 5;
  doc.setFillColor(...BRAND.orange);
  doc.roundedRect(cx, cy, cw, 7, 1.5, 1.5, "F");
  doc.setTextColor(...BRAND.white);
  doc.text(chipText, cx + cw / 2, cy + 4.8, { align: "center" });

  y += 8;

  // ── Hero image + key facts (two-column) ────────────────────────────
  const heroY = y;
  const heroH = 70;
  const heroW = contentW * 0.55;
  const factsX = MARGIN_X + heroW + 6;
  const factsW = contentW - heroW - 6;

  if (heroImg) {
    drawCoverImage(doc, heroImg, MARGIN_X, heroY, heroW, heroH);
  } else {
    doc.setFillColor(...BRAND.panel);
    doc.rect(MARGIN_X, heroY, heroW, heroH, "F");
    doc.setDrawColor(...BRAND.hair);
    doc.rect(MARGIN_X, heroY, heroW, heroH);
  }

  // Key facts panel
  doc.setFillColor(...BRAND.panel);
  doc.rect(factsX, heroY, factsW, heroH, "F");
  doc.setDrawColor(...BRAND.hair);
  doc.rect(factsX, heroY, factsW, heroH);

  const facts: Array<[string, string]> = [
    ["CAPACITY",       eq.capacity],
    ["YEAR",           String(eq.year)],
    ["ORIGIN",         eq.origin],
    ["FUEL",           eq.fuel],
    ["AVAILABLE",      `${eq.quantity} ${STR.units}`],
  ];
  const rowH = (heroH - 6) / facts.length;
  facts.forEach(([k, v], i) => {
    const ry = heroY + 3 + i * rowH;
    if (i > 0) {
      doc.setDrawColor(...BRAND.hair);
      doc.setLineWidth(0.2);
      doc.line(factsX + 4, ry, factsX + factsW - 4, ry);
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...BRAND.muted);
    doc.text(k, factsX + 4, ry + 4);

    doc.setFont("helvetica", "bold");
    // Auto-shrink long values so 50-Tons / "Backhoe Loader" never clip.
    let valSize = 10;
    while (valSize > 7.5 && doc.getStringUnitWidth(v) * valSize / doc.internal.scaleFactor > factsW - 8) {
      valSize -= 0.5;
    }
    doc.setFontSize(valSize);
    doc.setTextColor(...BRAND.ink);
    doc.text(v || "—", factsX + 4, ry + 9);
  });

  y = heroY + heroH + 10;

  // ── Section: Technical Specifications (table) ──────────────────────
  drawSectionHeading(doc, "TECHNICAL SPECIFICATIONS", y);
  y += 6;

  const specs: Array<[string, string]> = [
    [STR.category, eq.categoryLabel],
    [STR.brand,    eq.brand],
    [STR.model,    eq.model],
    [STR.capacity, eq.capacity],
    [STR.origin,   eq.origin],
    [STR.year,     String(eq.year)],
    [STR.fuel,     eq.fuel],
    [STR.qty,      `${eq.quantity} ${STR.units}`],
    [STR.notes,    eq.notes || "—"],
    [STR.asset,    eq.id],
  ];

  autoTable(doc, {
    startY: y,
    head: [[STR.spec, STR.detail]],
    body: specs,
    margin: { left: MARGIN_X, right: MARGIN_X },
    headStyles: {
      fillColor: BRAND.navy, textColor: BRAND.white,
      fontStyle: "bold", fontSize: 9, halign: "left", cellPadding: 3.5,
    },
    bodyStyles: {
      fontSize: 9, textColor: BRAND.body, cellPadding: 3.5, valign: "middle",
    },
    alternateRowStyles: { fillColor: BRAND.panel },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 62, textColor: BRAND.ink },
    },
    theme: "grid",
    styles: { lineColor: BRAND.hair, lineWidth: 0.2 },
  });

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;

  // ── Section: Description ───────────────────────────────────────────
  if (y > H - FOOTER_H - 60) { doc.addPage(); await drawHeader(doc, logo); y = HEADER_H + 10; }
  drawSectionHeading(doc, STR.descHeading.toUpperCase(), y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...BRAND.body);
  const personalised =
    `${eq.brand} ${eq.model} (${eq.notes || eq.categoryLabel}) — ${eq.capacity}, ` +
    `${eq.fuel.toLowerCase()}, ${eq.origin}-built, year ${eq.year}. ` +
    STR.descFallback;
  const descLines = doc.splitTextToSize(personalised, contentW);
  doc.text(descLines, MARGIN_X, y + 4);
  y += descLines.length * 4.6 + 8;

  // ── Section: Gallery (page 2) ──────────────────────────────────────
  if (galleryImgs.some(Boolean)) {
    if (y > H - FOOTER_H - 90) { doc.addPage(); await drawHeader(doc, logo); y = HEADER_H + 10; }
    drawSectionHeading(doc, STR.galleryHeading.toUpperCase(), y);
    y += 6;

    const cols = 2;
    const gap = 4;
    const cellW = (contentW - gap) / cols;
    const cellH = (cellW * 3) / 4;

    galleryImgs.forEach((img, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const cx = MARGIN_X + c * (cellW + gap);
      const cy = y + r * (cellH + gap);
      if (img) {
        drawCoverImage(doc, img, cx, cy, cellW, cellH);
      } else {
        doc.setFillColor(...BRAND.panel);
        doc.rect(cx, cy, cellW, cellH, "F");
        doc.setDrawColor(...BRAND.hair);
        doc.rect(cx, cy, cellW, cellH);
      }
    });

    const rows = Math.ceil(galleryImgs.length / cols);
    y += rows * cellH + (rows - 1) * gap + 6;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.muted);
    doc.text(STR.galleryNoneNote, MARGIN_X, y);
    y += 6;
  }

  // ── Section: Contact / CTA ─────────────────────────────────────────
  const ctaH = 38;
  if (y > H - FOOTER_H - ctaH - 6) { doc.addPage(); await drawHeader(doc, logo); y = HEADER_H + 10; }

  doc.setFillColor(...BRAND.navy);
  doc.roundedRect(MARGIN_X, y, contentW, ctaH, 2, 2, "F");
  // Orange left rail
  doc.setFillColor(...BRAND.orange);
  doc.rect(MARGIN_X, y, 2, ctaH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...BRAND.white);
  doc.text(STR.ctaHeading, MARGIN_X + 7, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 215, 225);
  const ctaLines = doc.splitTextToSize(STR.ctaBody, contentW - 14);
  doc.text(ctaLines, MARGIN_X + 7, y + 14);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  // Evenly distribute the three contact lines so nothing clips on A4.
  const ctaInnerW = contentW - 14;
  const colW = ctaInnerW / 3;
  const baseX = MARGIN_X + 7;
  const baseY = y + ctaH - 9;
  doc.setTextColor(...BRAND.orange);
  doc.text(STR.contactWa,    baseX,                 baseY);
  doc.setTextColor(...BRAND.white);
  doc.text(STR.contactEmail, baseX + colW,          baseY);
  doc.text(STR.contactWeb,   baseX + colW * 2,      baseY);

  // ── Paginate footer on every page ──────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawFooter(doc, p, totalPages, eq);
  }

  doc.save(`ATDB-${eq.id}-${eq.brand.replace(/\s+/g, "")}-${eq.model.replace(/\s+/g, "")}-Spec-Sheet.pdf`);
}

// ─── Helpers ──────────────────────────────────────────────────────────
function drawSectionHeading(doc: jsPDF, label: string, y: number) {
  const W = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND.orange);
  doc.text(label, MARGIN_X, y);
  // Underline rule from end of text to right margin
  const tw = doc.getTextWidth(label);
  doc.setDrawColor(...BRAND.hair);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_X + tw + 4, y - 1.2, W - MARGIN_X, y - 1.2);
}
