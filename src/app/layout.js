import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./utils/CartContext";
import { Toaster } from "react-hot-toast";
import FloatingCartButton from "./components/FloatingCartButton";
import BlobBackground from "./components/BlobBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StriRise",
  description: "Empowering women entrepreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {/* ✅ Animated pink blob background */}
          <BlobBackground />

          {/* ✅ Main app content */}
          <div className="relative z-10">
            {children}
            <Toaster position="bottom-center" />
            <FloatingCartButton />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
