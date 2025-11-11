"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import { useCart } from "../utils/CartContext";
import toast from "react-hot-toast";

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

        if (activeTab === "rentable") {
          setItems(data.rentable_items || []);
        } else if (activeTab === "purchasable") {
          setItems(data.purchasable_items || []);
        } else if (activeTab === "courses") {
          setItems(data.courses || []);
        }
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
      <div className="min-h-screen flex flex-col bg-pink-50">
        <NavBar />

        {/* Hero Section */}
        <section className="relative w-full h-[20vh] flex items-center justify-center">
          <div className="absolute inset-0"></div>
          <h1 className="relative text-5xl font-extrabold text-pink-700 text-center drop-shadow-lg">
            StriRise Marketplace
          </h1>
        </section>

        {/* Tab Switcher */}
        <div className="flex sm:flex-row flex-col justify-center mt-10 gap-4 mx-20">
          {["courses", "rentable", "purchasable"].map((tab) => {
            const tabLabels = {
              courses: "Courses",
              rentable: "Rentable",
              purchasable: "Purchasable",
            };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full sm:w-1/2 py-3 rounded-full text-lg font-semibold transition-all duration-300
                  ${
                    isActive
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-white text-pink-700 border border-pink-300 hover:bg-pink-100"
                  }`}
                style={{
                  boxShadow: isActive ? "0 8px 15px rgba(219,39,119,0.4)" : "none",
                }}
              >
                {tabLabels[tab]}
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <section
          className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ease-in-out"
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          {loading ? (
            <p className="text-center text-gray-600 w-full col-span-full">
              Loading {activeTab} items...
            </p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-600 w-full col-span-full">
              No {activeTab} items found.
            </p>
          ) : (
            items.map((item, index) => (
              <Card item={item} key={index} activeTab={activeTab} />
            ))
          )}
        </section>

        <Footer />
      </div>
    </RequireAuth>
  );
}

function Card({ item, activeTab }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  // Preload images asynchronously (for smooth UI)
  useEffect(() => {
    if (item.image_url && activeTab === "rentable") {
      const img = new Image();
      img.src = item.image_url;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true); // fallback to prevent hang
    } else {
      // Courses or purchasable — no heavy preload needed
      const timer = setTimeout(() => setImageLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [item.image_url, activeTab]);

  const handleAddToCart = () => {
    const newItem = {
      id: item.id || item._id || Math.random().toString(36).substr(2, 9),
      name: item.name || item.product_name,
      price:
        activeTab === "courses"
          ? item.price_in_rupees
          : activeTab === "rentable"
          ? item.rent
          : item.price,
      image:
        item.image_url ||
        (activeTab === "courses"
          ? "/images/default-course.jpg"
          : "/images/placeholder.jpg"),
      type: activeTab,
    };
    addToCart(newItem);
    toast.success(`${newItem.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden p-6 flex flex-col h-full">
      {/* Optimized image handling */}
      {!imageLoaded ? (
        <div className="w-full h-56 bg-gray-200 mb-4 animate-pulse rounded-lg" />
      ) : (
        <img
          src={
            item.image_url ||
            (activeTab === "courses"
              ? "/images/default-course.jpg"
              : "/images/placeholder.jpg")
          }
          alt={item.product_name || item.name}
          className="w-full h-56 object-cover mb-4 rounded-lg"
          loading="lazy"
        />
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-pink-700 mb-2">
          {item.product_name || item.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description}
        </p>

        <p className="text-lg font-semibold text-pink-600 mb-4">
          ₹
          {activeTab === "courses"
            ? item.price_in_rupees
            : activeTab === "rentable"
            ? item.rent
            : item.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-pink-600 text-white py-2 rounded-full font-semibold hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


export default withAuth(Marketplace);
