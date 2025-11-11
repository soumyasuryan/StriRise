"use client";
import { useCart } from "../utils/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function FloatingCartButton() {
  const { cart } = useCart();

  return (
    <AnimatePresence>
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link href="/cart">
            <div className="relative bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">View Cart</span>

              <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {cart.length}
              </span>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
