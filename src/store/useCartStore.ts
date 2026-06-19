import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductVariant, Product } from "@prisma/client";

export interface CartItem {
  id: string; // unique string (can just be variantId)
  variant: ProductVariant;
  product: Product; // need product info for display
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.variant.id === variant.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.variant.id === variant.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { id: variant.id, variant, product, quantity }],
          };
        });
      },
      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variant.id !== variantId),
        }));
      },
      updateQuantity: (variantId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.variant.id === variantId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.variant.sellingPrice) * item.quantity,
          0
        );
      },
    }),
    {
      name: "flykart-cart",
    }
  )
);
