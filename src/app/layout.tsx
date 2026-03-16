import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "NEO Divine Products | Making Moment Magical",
  description:
    "Premium spiritual wellness products by NEH Wellness Centre. Discover our range of energy sprays, chakra healing products, dhoop, and more. Elevate your spiritual journey.",
  keywords:
    "spiritual wellness, energy healing, chakra spray, aura spray, dhoop, incense, NEO Divine, NEH Wellness",
  openGraph: {
    title: "NEO Divine Products | Making Moment Magical",
    description:
      "Premium spiritual wellness products that elevate your energy and nurture inner balance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased bg-soft-white text-charcoal">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#3D2B1F",
                  color: "#FFF8F0",
                  border: "1px solid rgba(224,124,36,0.3)",
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
