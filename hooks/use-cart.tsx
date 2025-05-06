'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CartStore {
  items: Product[];
  isLoading: boolean;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id && 
          ((!i.variant && !item.variant) || 
           (i.variant?.id === item.variant?.id))
        );
        
        if (existingItem) {
          set({
            items: items.map((i) => 
              i.id === item.id && 
              ((!i.variant && !item.variant) || 
               (i.variant?.id === item.variant?.id))
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
          });
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        set({
          items: items.filter((i) => i.id !== id),
        });
      },
      
      updateItemQuantity: (id, quantity) => {
        const { items } = get();
        set({
          items: items.map((i) => 
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);