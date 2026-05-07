import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { EquipmentItem } from "@/data/equipment";
import logoMark from "@/assets/atdb-logo-light.webp";

type Lang = "en" | "bn";

// jsPDF's built-in helvetica has no Bengali glyphs; rendering bn STR
// produces empty boxes. We always emit the English spec sheet — the UI
// language only switches the on-screen UI, not the printable PDF.
const STR = {
  en: {
    subtitle: "Heavy Equipment Rental & Civil Contractor  |  Est. 2000  |  1st Class Contractor",
    addr: "Corporate: Dhaka  |  Branch: Tangail  |  +880 1712-106242  |  atdbtrade.com",
    sheet: "EQUIPMENT SPECIFICATION SHEET",
    spec: "Specification", detail: "Detail",
    category: "Category", brand: "Brand", model: "Model", capacity: "Capacity",
    origin: "Origin", year: "Year", fuel: "Fuel Type", qty: "Quantity Available",
    notes: "Notes / Type", asset: "Asset ID", units: "Unit(s)",
    real: "Real Site Photos", noRealPhoto: "Visual reference (AI-rendered)",
    video: (n: number) => `${n} Action Video(s) Available`,
    cta: "Interested in renting this equipment?",
    contact: "WhatsApp: +880 1712-106242  |  Email: saifulaapi@gmail.com",
    visit: "Visit: www.atdbtrade.com",
    footer: "(c) ATDB Trade International  |  Generated from atdbtrade.com",
    generated: "Generated",
  },
  bn: {
    subtitle: "হেভি ইকুইপমেন্ট ভাড়া ও সিভিল কন্ট্রাক্টর  ·  স্থাপিত ২০০০  ·  ১ম শ্রেণির ঠিকাদার",
    addr: "কর্পোরেট: ঢাকা  |  শাখা: টাঙ্গাইল  |  +৮৮০ ১৭১২-১০৬২৪২  |  atdbtrade.com",
    sheet: "ইকুইপমেন্ট স্পেক শীট (বাংলা সংস্করণ)",
    spec: "স্পেসিফিকেশন", detail: "মান",
    category: "ক্যাটাগরি", brand: "ব্র্যান্ড", model: "মডেল", capacity: "ক্ষমতা",
    origin: "উৎপত্তি দেশ", year: "তৈরির সাল", fuel: "জ্বালানি",
    qty: "উপলব্ধ পরিমাণ", notes: "ধরন / নোট", asset: "অ্যাসেট আইডি", units: "ইউনিট",
    real: "রিয়েল সাইট ফটো", noRealPhoto: "ভিজ্যুয়াল রেফারেন্স (এআই-জেনারেটেড)",
    video: (n: number) => `${n}টি অ্যাকশন ভিডিও উপলব্ধ`,
    cta: "এই ইকুইপমেন্ট ভাড়া নিতে চান? এখনই যোগাযোগ করুন।",
    contact: "হোয়াটসঅ্যাপ: +৮৮০ ১৭১২-১০৬২৪২  |  ইমেইল: saifulaapi@gmail.com",
    visit: "ওয়েব: www.atdbtrade.com",
    footer: "© ATDB Trade International  |  Generated from atdbtrade.com",
    generated: "তৈরির সময়",
  },
} as const;

/**
 * Loads an image and ALWAYS returns a PNG data URL.
 * jsPDF cannot reliably embed WEBP — converting via a canvas guarantees
 * the PDF actually renders the image instead of silently failing.
 */
async function loadImage(url: string): Promise<{ dataUrl: string; w: number; h: number } | null> {
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
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    return { dataUrl, w, h };
  } catch {
    return null;
  }
}

export async function generateEquipmentPDF(eq: EquipmentItem, _lang: Lang = "en") {
  // Force English content — jsPDF cannot render Bengali without an embedded font.
  const S = STR.en;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Header bar
  doc.setFillColor(20, 24, 32);
  doc.rect(0, 0, w, 46, "F");
  doc.setFillColor(245, 130, 32);
  doc.rect(0, 46, w, 2, "F");

  // Logo (always PNG after canvas conversion)
  const logo = await loadImage(logoMark);
  if (logo) {
    try {
      const ratio = logo.w / logo.h;
      const lh = 28;
      const lw = Math.min(40, lh * ratio);
      doc.addImage(logo.dataUrl, "PNG", 14, 9, lw, lh);
    } catch { /* ignore */ }
  }

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text("ATDB TRADE INTERNATIONAL", 48, 18);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text(S.subtitle, 48, 25);
  doc.text(S.addr, 48, 31);

  // Date/time top-right
  const now = new Date();
  const stamp = now.toLocaleString("en-GB", {
    year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });
  doc.setFontSize(7.5);
  doc.setTextColor(245, 180, 100);
  doc.text(`${S.generated}: ${stamp}`, w - 14, 38, { align: "right" });

  // Title section
  let y = 58;
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(245, 130, 32);
  doc.text(S.sheet, 15, y);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30, 35, 45);
  doc.text(eq.name, 15, y);

  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text(`${eq.brand}  |  ${eq.model}  |  ${eq.id}`, 15, y);

  y += 10;

  const specs = [
    [S.category, eq.categoryLabel],
    [S.brand, eq.brand],
    [S.model, eq.model],
    [S.capacity, eq.capacity],
    [S.origin, eq.origin],
    [S.year, String(eq.year)],
    [S.fuel, eq.fuel],
    [S.qty, `${eq.quantity} ${S.units}`],
    [S.notes, eq.notes],
    [S.asset, eq.id],
  ];

  autoTable(doc, {
    startY: y,
    head: [[S.spec, S.detail]],
    body: specs,
    margin: { left: 15, right: 15 },
    headStyles: { fillColor: [245, 130, 32], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: [50, 50, 50] },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 55, textColor: [80, 80, 80] } },
    theme: "grid",
    styles: { lineColor: [220, 220, 220], lineWidth: 0.3, cellPadding: 4 },
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  // Real photos block
  const photos = eq.realPhotos || [];
  if (photos.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(22, 120, 60);
    doc.text(S.real.toUpperCase(), 15, y);
    y += 5;

    const slots = photos.slice(0, 3);
    const gap = 4;
    const totalW = w - 30;
    const cellW = (totalW - gap * (slots.length - 1)) / slots.length;
    const cellH = (cellW * 3) / 4;

    for (let i = 0; i < slots.length; i++) {
      const img = await loadImage(slots[i]);
      const x = 15 + i * (cellW + gap);
      if (img) {
        try {
          // loadImage always returns PNG data URLs now
          doc.addImage(img.dataUrl, "PNG", x, y, cellW, cellH);
        } catch { /* ignore */ }
      }
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.rect(x, y, cellW, cellH);
    }
    y += cellH + 8;
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(S.noRealPhoto, 15, y);
    y += 8;
  }

  // Video badge
  if (eq.videos && eq.videos.length > 0) {
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(15, y, 70, 8, 2, 2, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(S.video(eq.videos.length).toUpperCase(), 19, y + 5.5);
    y += 12;
  }

  // Ensure space for CTA + footer; add a new page if not enough room.
  const FOOTER_RESERVE = 50;
  if (y > pageH - FOOTER_RESERVE) {
    doc.addPage();
    y = 20;
  }

  // CTA
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, y, w - 30, 28, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 35, 45);
  doc.text(S.cta, 22, y + 10);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(S.contact, 22, y + 18);
  doc.text(S.visit, 22, y + 24);

  // Footer
  doc.setFillColor(20, 24, 32);
  doc.rect(0, pageH - 14, w, 14, "F");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(S.footer, w / 2, pageH - 5, { align: "center" });

  doc.save(`${eq.id}-${eq.brand}-${eq.model}-Spec-Sheet.pdf`);
}
