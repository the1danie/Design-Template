import { createContext, useContext, useState } from "react";

type CartContextType = {
  cartCount: number;
  addToCart: (qty: number) => void;
};

const CartContext = createContext<CartContextType>({ cartCount: 0, addToCart: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  function addToCart(qty: number) {
    setCartCount((c) => c + qty);
  }
  return <CartContext.Provider value={{ cartCount, addToCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
