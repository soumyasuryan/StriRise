"use client";
import { useCart } from "../utils/CartContext";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, X } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, i) => sum + Number(i.price), 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0208]">
      <NavBar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium tracking-wide mb-5">
            <ShoppingBag className="w-3.5 h-3.5" />
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
        </motion.div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-white/25"
          >
            <ShoppingBag className="w-16 h-16 mb-5 opacity-20" />
            <p className="text-lg font-medium">Your cart is empty.</p>
            <p className="text-sm mt-1 text-white/20">Head to the marketplace to add items.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Cart Items */}
            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex items-center gap-4 rounded-2xl border border-pink-900/25
                      bg-[#1a0510]/60 p-4 hover:border-pink-600/35 transition-all duration-300 overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-pink-600/5 to-transparent" />

                    {/* Image */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-pink-900/20"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl flex-shrink-0 border border-pink-900/20 bg-pink-950/30 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-pink-800" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate group-hover:text-pink-100 transition-colors">
                        {item.name}
                      </h3>
                      <span className="inline-block mt-1 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border border-pink-800/40 bg-pink-950/40 text-pink-500">
                        {item.type}
                      </span>
                      <p className="mt-2 text-lg font-extrabold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="relative flex-shrink-0 w-8 h-8 rounded-lg border border-pink-900/30 bg-pink-950/30
                        flex items-center justify-center text-white/30 hover:text-rose-400 hover:border-rose-700/40
                        hover:bg-rose-950/30 transition-all duration-200"
                      title="Remove item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative w-full lg:w-80 flex-shrink-0 rounded-2xl border border-pink-900/25 bg-[#1a0510]/70 p-6 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-600 to-rose-400" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-pink-700/10 blur-2xl pointer-events-none" />

              <h2 className="text-base font-bold text-white mb-6 relative">Order Summary</h2>

              <div className="space-y-3 mb-6 relative">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/45 truncate max-w-[160px]">{item.name}</span>
                    <span className="text-white/60 font-medium flex-shrink-0 ml-2">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-pink-900/40 to-transparent mb-5" />

              <div className="flex justify-between items-center mb-7 relative">
                <span className="text-sm font-semibold text-white/60">Total</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                  ₹{total}
                </span>
              </div>

              <div className="flex flex-col gap-3 relative">
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400
                    shadow-md shadow-pink-900/30 hover:shadow-pink-700/40
                    transition-all duration-300 hover:scale-[1.02]"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white/40
                    border border-white/10 hover:border-rose-700/40 hover:text-rose-400
                    hover:bg-rose-950/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Cart
                </button>
              </div>
            </motion.div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
