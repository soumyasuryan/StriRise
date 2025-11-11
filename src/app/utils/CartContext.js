"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🔹 Load user info from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const uid = decoded.id || decoded.email || decoded.sub; // depends on backend JWT structure
      setUserId(uid);

      // 🔹 Load that user’s specific cart
      const savedCart = JSON.parse(localStorage.getItem(`cart_${uid}`)) || [];
      setCart(savedCart);
    } catch (error) {
      console.error("Invalid or expired token", error);
    }
  }, []);

  // 🔹 Save whenever cart changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

  // 🔹 Functions to manage cart
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, userId }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
