import { describe, it, expect } from "vitest";
import { equipmentData, equipmentCategories, fleetVideos } from "@/data/equipment";

/**
 * Translation audit: every gallery-surfaced string must have a Bengali value.
 * If this test fails, add a Bengali translation to the offending field — never
 * let the language toggle silently fall back to English.
 */
describe("Gallery translation audit (no English fallback)", () => {
  it("every fleet video has a Bengali label", () => {
    const missing = fleetVideos.filter(v => !v.labelBn || v.labelBn.trim() === "");
    expect(missing, `Missing labelBn on videos: ${missing.map(m => m.label).join(", ")}`).toEqual([]);
  });

  it("every equipment item with realPhotos has a banglaLabel for the gallery", () => {
    const offenders = equipmentData
      .filter(e => e.realPhotos && e.realPhotos.length > 0)
      .filter(e => !e.banglaLabel || e.banglaLabel.trim() === "");
    expect(
      offenders.map(o => o.id),
      `Equipment shown in the gallery is missing banglaLabel: ${offenders.map(o => o.id).join(", ")}`
    ).toEqual([]);
  });

  it("every equipment category exposes a Bengali label for filter pills", () => {
    const offenders = equipmentCategories.filter(c => !c.bangla || c.bangla.trim() === "");
    expect(offenders.map(o => o.slug)).toEqual([]);
  });

  it("Bengali strings do not contain ASCII-only English words used as fallback", () => {
    // Heuristic: a Bengali field shouldn't be a pure ASCII string (would mean
    // the author copy-pasted English as the "translation").
    const asciiOnly = /^[\x00-\x7F]+$/;
    const offenders: string[] = [];
    for (const v of fleetVideos) if (v.labelBn && asciiOnly.test(v.labelBn)) offenders.push(`video:${v.label}`);
    for (const c of equipmentCategories) if (asciiOnly.test(c.bangla)) offenders.push(`cat:${c.slug}`);
    for (const e of equipmentData) {
      if (e.banglaLabel && asciiOnly.test(e.banglaLabel)) offenders.push(`eq:${e.id}`);
    }
    expect(offenders).toEqual([]);
  });
});
