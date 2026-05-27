import { describe, it, expect } from "vitest";
import { getWhatsAppRentUrl, getWhatsAppQuoteUrl, WHATSAPP_NUMBER } from "./equipment";

describe("equipment utility functions", () => {
  describe("getWhatsAppRentUrl", () => {
    it("should format the URL correctly with valid string inputs", () => {
      const name = "Excavator";
      const id = "EX-001";
      const capacity = "20 Ton";

      const expectedMsg = `Hello ATDB Trade International,\n\nI'd like to rent the ${name} (${id} · ${capacity}).\nProject location: \nDuration (days): \nPlease share availability and a quotation. — ATDB website`;
      const expectedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(expectedMsg)}`;

      expect(getWhatsAppRentUrl(name, id, capacity)).toBe(expectedUrl);
    });

    it("should properly URL encode special characters in the inputs", () => {
      const name = "Loader & Backhoe";
      const id = "LD-002#A";
      const capacity = "15% Extra";

      const url = getWhatsAppRentUrl(name, id, capacity);

      expect(url).toContain(encodeURIComponent(name));
      expect(url).toContain(encodeURIComponent(id));
      expect(url).toContain(encodeURIComponent(capacity));
    });
  });

  describe("getWhatsAppQuoteUrl", () => {
    it("should return the correct default quote URL", () => {
      const expectedMsg = `Hello ATDB Trade International,\n\nI'd like to discuss a heavy-equipment rental for an upcoming project. Please share availability and a quotation.`;
      const expectedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(expectedMsg)}`;

      expect(getWhatsAppQuoteUrl()).toBe(expectedUrl);
    });
  });
});
