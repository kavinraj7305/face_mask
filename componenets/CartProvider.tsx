"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";
import { cartItemKey, cartTotal } from "@/lib/types";

const STORAGE_KEY = "bavapriya-cart";

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, sizeId: string, quantity: number) => void;
  removeItem: (productId: number, sizeId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const key = cartItemKey(item);
      const existing = current.find((row) => cartItemKey(row) === key);
      if (!existing) return [...current, item];
      return current.map((row) =>
        cartItemKey(row) === key
          ? { ...row, quantity: row.quantity + item.quantity }
          : row
      );
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: number, sizeId: string, quantity: number) => {
      setItems((current) =>
        current
          .map((row) =>
            row.productId === productId && row.sizeId === sizeId
              ? { ...row, quantity }
              : row
          )
          .filter((row) => row.quantity > 0)
      );
    },
    []
  );

  const removeItem = useCallback((productId: number, sizeId: string) => {
    setItems((current) =>
      current.filter((row) => !(row.productId === productId && row.sizeId === sizeId))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      ready,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: cartTotal(items),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, ready, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
