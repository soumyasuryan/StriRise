"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("rentable");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://stririsebackend.onrender.com/items");
        const data = await res.json();

        // ✅ Extract based on selected tab
        if (activeTab === "rentable") {
          setItems(data.rentable_items || []);
        } else {
          setItems(data.purchasable_items || []);
        }
      } catch (err) {
        console.error("Error fetching marketplace items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <NavBar />

      {/* Hero Section */}
      <section className="relative w-full h-[20vh] flex items-center justify-center">
        
        <div className="absolute inset-0 "></div>
        <h1 className="relative text-5xl font-extrabold text-pink-700 text-center drop-shadow-lg">
          StriRise Marketplace
        </h1>
      </section>

      {/* Tab Switcher */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setActiveTab("rentable")}
          className={`px-8 py-3 rounded-l-full text-lg font-semibold transition-all duration-300 ${
            activeTab === "rentable"
              ? "bg-pink-600 text-white shadow-lg"
              : "bg-white text-pink-700 border border-pink-300 hover:bg-pink-100"
          }`}
        >
          Rentable
        </button>
        <button
          onClick={() => setActiveTab("purchasable")}
          className={`px-8 py-3 rounded-r-full text-lg font-semibold transition-all duration-300 ${
            activeTab === "purchasable"
              ? "bg-pink-600 text-white shadow-lg"
              : "bg-white text-pink-700 border border-pink-300 hover:bg-pink-100"
          }`}
        >
          Purchasable
        </button>
      </div>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-700 mb-2">
                  {item.product_name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-lg font-semibold text-pink-600 mb-4">
                  ₹
                  {activeTab === "rentable" ? item.rent : item.price}
                </p>
                <button className="w-full bg-pink-600 text-white py-2 rounded-full font-semibold hover:bg-pink-700 transition">
                  {activeTab === "rentable" ? "Rent Now" : "Buy Now"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <Footer />
    </div>
  );
}
