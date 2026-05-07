import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  capacity: string;
  qty: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  add: (it: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  whatsappCheckoutUrl: (note?: string, project?: { location?: string; start?: string; end?: string }) => string;
}

const KEY = "atdb_cart_v1";
const WA = "8801712106242";

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const add = useCallback((it: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const ex = prev.find(p => p.id === it.id);
      if (ex) return prev.map(p => p.id === it.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...it, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => setItems(p => p.filter(x => x.id !== id)), []);
  const setQty = useCallback((id: string, qty: number) => setItems(p => p.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x)), []);
  const clear = useCallback(() => setItems([]), []);

  const whatsappCheckoutUrl = (note?: string, project?: { location?: string; start?: string; end?: string }) => {
    const lines = items.map((it, i) =>
      `${i + 1}. ${it.name}\n   ID: ${it.id}  •  ${it.brand}  •  ${it.capacity}  •  Qty: ${it.qty}`
    ).join("\n");
    const loc = project?.location?.trim() || "(to be confirmed)";
    const start = project?.start?.trim() || "(to be confirmed)";
    const end = project?.end?.trim() || "(to be confirmed)";
    const noteLine = note?.trim() ? `Note: ${note.trim()}\n` : "";
    const msg = `Hello ATDB Trade International,\n\nI'd like to request a rental quotation for the following equipment:\n\n${lines}\n\nProject location: ${loc}\nStart date: ${start}\nEnd date: ${end}\n${noteLine}\nPlease share availability and final pricing.\n— ATDB website cart`;
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  };

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, open, setOpen, whatsappCheckoutUrl }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
