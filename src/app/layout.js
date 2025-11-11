import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./utils/CartContext"; // ✅ adjust path if needed
import { Toaster } from "react-hot-toast";

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
        {/* ✅ Wrap client-side providers inside body */}
        <CartProvider>
          {children}
          <Toaster position="bottom-center" />
        </CartProvider>
      </body>
    </html>
  );
}
