import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of your product based on the MakoProduct interface
interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartStore {
  reservedItems: CartItem[];
  reserveItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      reservedItems: [],
      
      reserveItem: (item) => 
        set((state) => {
          // Prevent duplicates
          if (state.reservedItems.find((i) => i.id === item.id)) return state;
          return { reservedItems: [...state.reservedItems, item] };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          reservedItems: state.reservedItems.filter((item) => item.id !== itemId),
        })),

      clearCart: () => set({ reservedItems: [] }),
    }),
    {
      name: 'mako-cart-storage', // Key for localStorage
    }
  )
);