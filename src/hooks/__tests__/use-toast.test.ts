import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "../use-toast";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("useToast hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // clear the memoryState of toasts
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss();
    });
    act(() => {
      vi.advanceTimersByTime(1000000);
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toEqual([]);
    expect(typeof result.current.toast).toBe("function");
    expect(typeof result.current.dismiss).toBe("function");
  });

  it("should add a toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Hello World" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: "Hello World",
      open: true,
    });
    expect(result.current.toasts[0].id).toBeDefined();
  });

  it("should dismiss a toast", () => {
    const { result } = renderHook(() => useToast());

    let toastId = "";
    act(() => {
      const t = result.current.toast({ title: "To Dismiss" });
      toastId = t.id;
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should dismiss all toasts if no toastId is provided", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should remove a toast after TOAST_REMOVE_DELAY", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "To Remove" });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);
    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1000000); // TOAST_REMOVE_DELAY
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it("should update a toast", () => {
    const { result } = renderHook(() => useToast());

    let updateFn: any;
    act(() => {
      const t = result.current.toast({ title: "Initial Title" });
      updateFn = t.update;
    });

    expect(result.current.toasts[0].title).toBe("Initial Title");

    act(() => {
      updateFn({ title: "Updated Title", id: result.current.toasts[0].id });
    });

    expect(result.current.toasts[0].title).toBe("Updated Title");
  });

  it("should enforce TOAST_LIMIT of 1", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Toast 1");

    act(() => {
      result.current.toast({ title: "Toast 2" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Toast 2");
  });

  it("should handle onOpenChange", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast Open Change" });
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      const onOpenChange = result.current.toasts[0].onOpenChange;
      if (onOpenChange) {
        onOpenChange(false);
      }
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  describe("reducer", () => {
    it("REMOVE_TOAST with undefined toastId clears all toasts", () => {
      const state = { toasts: [{ id: "1" }, { id: "2" }] as any };
      const action = { type: "REMOVE_TOAST" as const };
      const newState = reducer(state, action);
      expect(newState.toasts).toHaveLength(0);
    });

    it("DISMISS_TOAST ignores toasts that do not match toastId", () => {
      const state = { toasts: [{ id: "1", open: true }, { id: "2", open: true }] as any };
      const action = { type: "DISMISS_TOAST" as const, toastId: "1" };
      const newState = reducer(state, action);
      expect(newState.toasts[0].open).toBe(false);
      expect(newState.toasts[1].open).toBe(true);
    });

    it("UPDATE_TOAST ignores toasts that do not match toast.id", () => {
      const state = { toasts: [{ id: "1", title: "One" }, { id: "2", title: "Two" }] as any };
      const action = { type: "UPDATE_TOAST" as const, toast: { id: "1", title: "Updated One" } };
      const newState = reducer(state, action);
      expect(newState.toasts[0].title).toBe("Updated One");
      expect(newState.toasts[1].title).toBe("Two");
    });
  });
});
