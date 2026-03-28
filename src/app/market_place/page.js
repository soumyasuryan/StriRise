"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import { useCart } from "../utils/CartContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Package, RefreshCw } from "lucide-react";

/* ── Tab config ── */
const TABS = [
  { key: "courses",     label: "Courses",     icon: BookOpen },
  { key: "rentable",    label: "Rentable",    icon: RefreshCw },
  { key: "purchasable", label: "Purchasable", icon: Package },
];

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-pink-900/20 bg-[#1a0510]/50 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-pink-900/20" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 bg-pink-900/20 rounded" />
        <div className="h-3 w-full bg-pink-900/10 rounded" />
        <div className="h-3 w-2/3 bg-pink-900/10 rounded" />
        <div className="h-8 w-full bg-pink-900/20 rounded-lg mt-4" />
      </div>
    </div>
  );
}

/* ── Product Card ── */
function Card({ item, activeTab, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const hasImage = Boolean(item.image_url);

  useEffect(() => {
    if (hasImage && activeTab === "rentable") {
      const img = new window.Image();
      img.src = item.image_url;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
    } else if (hasImage) {
      const timer = setTimeout(() => setImageLoaded(true), 200);
      return () => clearTimeout(timer);
    } else {
      setImageLoaded(true);
    }
  }, [item.image_url, activeTab, hasImage]);

  const price =
    activeTab === "courses"
      ? item.price_in_rupees
      : activeTab === "rentable"
      ? item.rent
      : item.price;

  const handleAddToCart = () => {
    const newItem = {
      id: item.id || item._id || Math.random().toString(36).substr(2, 9),
      name: item.name || item.product_name,
      price,
      image: hasImage ? item.image_url : null,
      type: activeTab,
    };
    addToCart(newItem);
    toast.success(`${newItem.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl border border-pink-900/20 bg-[#1a0510]/60
        hover:border-pink-600/40 hover:shadow-xl hover:shadow-pink-950/50
        overflow-hidden transition-all duration-500"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-pink-600/5 to-transparent" />

      {/* Image */}
      {hasImage && (
        <div className="overflow-hidden h-48 flex-shrink-0">
          {!imageLoaded ? (
            <div className="w-full h-full bg-pink-900/20 animate-pulse" />
          ) : (
            <img
              src={item.image_url}
              alt={item.product_name || item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Tab badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-pink-700/40 bg-[#0d0208]/80 text-pink-400 backdrop-blur-sm">
          {activeTab}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-pink-100 transition-colors line-clamp-2">
          {item.product_name || item.name}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-pink-900/20">
          <span className="text-lg font-extrabold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
            ₹{price}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white
              bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400
              shadow-md shadow-pink-900/30 hover:shadow-pink-700/40
              transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
function Marketplace() {
  const [activeTab, setActiveTab] = useState("courses");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let url = "";
        if (activeTab === "rentable" || activeTab === "purchasable") {
          url = "https://stririsebackend.onrender.com/items";
        } else if (activeTab === "courses") {
          url = "https://stririsebackend.onrender.com/api/courses";
        }
        const res = await fetch(url);
        const data = await res.json();
        if (activeTab === "rentable") setItems(data.rentable_items || []);
        else if (activeTab === "purchasable") setItems(data.purchasable_items || []);
        else if (activeTab === "courses") setItems(data.courses || []);
      } catch (err) {
        console.error("Error fetching marketplace items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeTab]);

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-[#0d0208]">
        <NavBar />

        {/* Hero */}
        <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
          {/* Ambient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-pink-700/10 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium tracking-wide mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Curated for Women Entrepreneurs
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              The Women's Business{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Launchpad
              </span>
            </h1>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Courses, tools, and resources designed for women ready to launch their entrepreneurial journey.
            </p>
          </motion.div>
        </section>

        {/* Tab Switcher */}
        <div className="flex justify-center px-6 mb-10">
          <div className="flex gap-1 p-1 rounded-xl border border-pink-900/30 bg-[#1a0510]/60 backdrop-blur-sm">
            {TABS.map(({ key, label, icon: Icon }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                    ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  {active && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-600 to-rose-500 shadow-md shadow-pink-900/40"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-20 w-full">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            ) : items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-white/25"
              >
                <Package className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-base">No {activeTab} items found.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item, index) => (
                  <Card item={item} key={index} activeTab={activeTab} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <Footer />
      </div>
    </RequireAuth>
  );
}

export default withAuth(Marketplace);
