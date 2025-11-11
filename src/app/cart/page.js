"use client";
import { useCart } from "../utils/CartContext";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, i) => sum + Number(i.price), 0);

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <NavBar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <p className="text-sm text-gray-500">({item.type})</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-semibold hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-2xl font-semibold text-pink-700">
                Total: ₹{total}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-400"
                >
                  Clear Cart
                </button>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-700">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
