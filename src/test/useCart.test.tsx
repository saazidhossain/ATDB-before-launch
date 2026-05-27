import { renderHook } from "@testing-library/react";
import { useCart, CartProvider } from "../hooks/useCart";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

describe("useCart hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles malformed JSON in localStorage gracefully", () => {
    // Mock localStorage to return invalid JSON
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue("invalid-json");

    // Render the hook within the provider
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>
    });

    // Expect the fallback of an empty array to be returned
    expect(result.current.items).toEqual([]);

    expect(getItemSpy).toHaveBeenCalledWith("atdb_cart_v1");
  });
});
