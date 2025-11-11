"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../utils/CartContext";
import { ShoppingCart } from "lucide-react"; // optional icon
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCartButton() {
  const { cart } = useCart(); // ✅ matches your context
  const router = useRouter();

  if (!cart || cart.length === 0) return null; // hide when empty

  return (
    <AnimatePresence>
      <motion.button
        key="floating-cart"
        onClick={() => router.push("/cart")}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-pink-600 px-5 py-3 text-white shadow-lg hover:bg-pink-700 transition-all"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-medium">Cart ({cart.length})</span>
      </motion.button>
    </AnimatePresence>
  );
}
