
import { create } from "zustand";
import { type Meal } from "@/lib/tmdb";

export type CartItem = {
  meal: Meal;
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;

  getItems: () => {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
  };

  addItem: (meal: Meal) => void;
  removeItem: (idMeal: string) => void;
  increaseQTY: (idMeal: string) => void;
  decreaseQTY: (idMeal: string) => void;
  clearCart: () => void;
};

const calculatePrice = (idMeal : string) =>
    Number(((Number(idMeal) - 50000) / 200).toFixed(2))

const calculateTotal = (items: CartItem[]) =>
  Number(
    items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

const calculateTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalPrice: 0,
  totalItems: 0,


getItems: () => {
  const { items, totalPrice, totalItems } = get();
  return { items, totalPrice, totalItems };
},

  addItem: (meal) =>
  set((state) => {
    const existing = state.items.find(
      (item) => item.meal.idMeal === meal.idMeal
    );

    const price = calculatePrice(meal.idMeal);

    const items = existing
      ? state.items.map((item) =>
          item.meal.idMeal === meal.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...state.items, { meal, quantity: 1, price }];

    return {
      items,
      totalPrice: calculateTotal(items),
      totalItems: calculateTotalItems(items),
    };
  }),

  removeItem: (idMeal) =>
    set((state) => {
      const items = state.items.filter(
        (item) => item.meal.idMeal !== idMeal
      );

      return {
  items,
  totalPrice: calculateTotal(items),
  totalItems: calculateTotalItems(items),
};
    }),

    //dont need
  increaseQTY: (idMeal) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.meal.idMeal === idMeal
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
  items,
  totalPrice: calculateTotal(items),
  totalItems: calculateTotalItems(items),
};
    }),

  decreaseQTY: (idMeal) =>
    set((state) => {
      const items = state.items
        .map((item) =>
          item.meal.idMeal === idMeal
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
  items,
  totalPrice: calculateTotal(items),
  totalItems: calculateTotalItems(items),
};
    }),

    //not using?
  clearCart: () => set({ items: [],
totalPrice: 0,
totalItems: 0 }),
}));

export default useCartStore;
