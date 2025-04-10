import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; id: number }
  | { type: "UPDATE_QUANTITY"; id: number; quantity: number }
  | { type: "INCREASE_QUANTITY"; id: number }
  | { type: "DECREASE_QUANTITY"; id: number }
  | { type: "CLEAR_CART" };


const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  cart: [],
  dispatch: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find((item) => item.product.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { product: action.product, quantity: 1 }];
      }
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.product.id !== action.id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.product.id === action.id
          ? { ...item, quantity: action.quantity }
          : item
      );
      case "INCREASE_QUANTITY":
  return state.map((item) =>
    item.product.id === action.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

case "DECREASE_QUANTITY":
  return state.map((item) =>
    item.product.id === action.id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
  
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
