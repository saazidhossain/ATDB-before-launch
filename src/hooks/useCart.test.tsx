import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart, CartItem } from "./useCart";
import { ReactNode } from "react";
import { vi } from "vitest";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const sampleItem = {
  id: "item1",
  name: "Sample Item",
  brand: "BrandX",
  capacity: "100",
  image: "img.jpg"
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("throws error if used outside CartProvider", () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow("useCart must be inside CartProvider");
    consoleError.mockRestore();
  });

  it("initializes with empty cart when localStorage is empty", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.open).toBe(false);
  });

  it("initializes with items from localStorage", () => {
    const storedItems: CartItem[] = [{ ...sampleItem, qty: 2 }];
    localStorage.setItem("atdb_cart_v1", JSON.stringify(storedItems));
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual(storedItems);
    expect(result.current.count).toBe(2);
  });

  it("handles malformed JSON in localStorage gracefully", () => {
    localStorage.setItem("atdb_cart_v1", "invalid json");
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
  });

  it("adds a new item to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...sampleItem, qty: 1 });
    expect(result.current.count).toBe(1);
    expect(result.current.open).toBe(true);
    expect(JSON.parse(localStorage.getItem("atdb_cart_v1")!)).toEqual([{ ...sampleItem, qty: 1 }]);
  });

  it("increments quantity if adding an existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
      result.current.add(sampleItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(2);
    expect(result.current.count).toBe(2);
  });

  it("removes an item by id", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
      result.current.remove(sampleItem.id);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("sets quantity of an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
      result.current.setQty(sampleItem.id, 5);
    });

    expect(result.current.items[0].qty).toBe(5);
    expect(result.current.count).toBe(5);
  });

  it("prevents setting quantity below 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
      result.current.setQty(sampleItem.id, 0);
    });

    expect(result.current.items[0].qty).toBe(1);
    expect(result.current.count).toBe(1);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
      result.current.clear();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("toggles the cart open state", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.open).toBe(false);
  });

  it("generates correct WhatsApp checkout URL", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
    });

    const url = result.current.whatsappCheckoutUrl(
      "Please deliver ASAP",
      { location: "Dhaka", start: "2023-12-01", end: "2023-12-05" }
    );

    expect(url).toContain("https://wa.me/8801712106242");

    // Check decoded text components
    const decodedUrl = decodeURIComponent(url);
    expect(decodedUrl).toContain("1. Sample Item");
    expect(decodedUrl).toContain("ID: item1  •  BrandX  •  100  •  Qty: 1");
    expect(decodedUrl).toContain("Project location: Dhaka");
    expect(decodedUrl).toContain("Start date: 2023-12-01");
    expect(decodedUrl).toContain("End date: 2023-12-05");
    expect(decodedUrl).toContain("Note: Please deliver ASAP");
  });

  it("handles empty note and project gracefully in WhatsApp checkout URL", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(sampleItem);
    });

    const url = result.current.whatsappCheckoutUrl();
    const decodedUrl = decodeURIComponent(url);

    expect(decodedUrl).toContain("Project location: (to be confirmed)");
    expect(decodedUrl).toContain("Start date: (to be confirmed)");
    expect(decodedUrl).toContain("End date: (to be confirmed)");
    expect(decodedUrl).not.toContain("Note:");
  });
});
