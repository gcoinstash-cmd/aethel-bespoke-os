/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductMatrix from "./components/ProductMatrix";
import Anatomy from "./components/Anatomy";
import SizingPortal from "./components/SizingPortal";
import EnterpriseUpsell from "./components/EnterpriseUpsell";
import CartDrawer from "./components/CartDrawer";
import { CartItem, Product } from "./types";
import AtelierAdminDashboard from "./components/AtelierAdminDashboard";
import { X, Check, Lock, Sparkles } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<{ id: string; message: string } | null>(null);

  // Admin Control Room State (1-Click Cheat Code Bypass)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');

  // URL /admin bypass check on boot
  React.useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      setIsAdminMode(true);
      setTimeout(() => triggerToast("⚡ Cordwainer Bypass: Atelier Command Room Unlocked"), 300);
    }
  }, []);

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput.trim() === 'aethel2026') {
      setIsAdminMode(true);
      setIsAdminPassModalOpen(false);
      setAdminPassInput('');
      triggerToast("⚡ Cordwainer Command Access Granted (Cheat Code Verified)");
    } else {
      triggerToast("❌ Invalid Passkey. Use demo passcode: aethel2026");
    }
  };

  // Trigger a luxury, eye-safe toast action that slides up elegantly
  const triggerToast = (message: string) => {
    const toastId = Math.random().toString(36).substr(2, 9);
    setActiveToast({ id: toastId, message });
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === toastId ? null : curr));
    }, 4000);
  };

  const handleAddToCart = (product: Product, size: number) => {
    // Unique ID generation combining product ID and size selection parameter
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            size,
            quantity: 1,
          },
        ];
      }
    });

    triggerToast(`[ Secure Alloc ] A pair of ${product.name} (Size: ${size}) added to your pipeline.`);
    
    // Smooth high-conversion UX choice: Open the mini-cart automatically after a brief pause
    setTimeout(() => {
      setIsCartOpen(true);
    }, 450);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id: string) => {
    const item = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      triggerToast(`[ Deallocated ] Removed ${item.product.name} from pipeline.`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Luxury Scroll Coordinates Action Toggles
  const handleScrollToSegment = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isAdminMode) {
    return <AtelierAdminDashboard onExit={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans">
      
      {/* Centered Premium Navigation Segment */}
      <Navbar
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onSizingClick={() => handleScrollToSegment("sizing-architect-portal")}
        onAtelierClick={() => handleScrollToSegment("atelier-lookbook-matrix")}
        onOpenAdminPass={() => setIsAdminPassModalOpen(true)}
      />

      {/* Cinematic Split Hero Segment */}
      <Hero onEnterAtelier={() => handleScrollToSegment("atelier-lookbook-matrix")} />

      {/* Symmetrical Broken-Grid Lookbook Storefront */}
      <ProductMatrix 
        onAddToCart={handleAddToCart} 
        onOpenFittingPortal={() => handleScrollToSegment("sizing-architect-portal")}
      />

      {/* Anatomy Interaction Schematic Section */}
      <Anatomy />

      {/* High-Ticket Sizing Core Panel Builder */}
      <SizingPortal />

      {/* High-Contrast Technical Enterprise Upsell Banner & Footer */}
      <EnterpriseUpsell />

      {/* Glide-in Mini-Cart Sidebar Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Pass Modal (1-Click Cheat Code Bypass) */}
      {isAdminPassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2a2a2a] w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={() => setIsAdminPassModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-accent/10 border border-accent/20">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white tracking-wide">CORDWAINER ATELIER OS</h3>
                <p className="text-xs font-mono text-zinc-400">Restricted Lastmaker & Bench Ops Portal</p>
              </div>
            </div>

            {/* 1-Click Cheat Code Autofill Pill */}
            <div className="mb-6 p-4 bg-[#18181b] border border-[#2e2e33]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5" />
                  DEMO CHEAT CODE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/20 text-accent uppercase">
                  1-Click Fill
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAdminPassInput('aethel2026')}
                className="w-full text-left font-mono text-sm text-zinc-100 hover:text-accent bg-[#0d0d0f] px-3 py-2 border border-zinc-700 hover:border-accent transition-all flex items-center justify-between"
              >
                <span>aethel2026</span>
                <span className="text-[10px] text-zinc-500">[Click to autofill]</span>
              </button>
            </div>

            <form onSubmit={handleAdminUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Atelier Passcode
                </label>
                <input
                  type="password"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-[#0d0d0f] border border-[#2e2e33] px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-accent"
                  autoFocus
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminPassModalOpen(false)}
                  className="flex-1 py-3 px-4 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white border border-[#2e2e33] hover:border-zinc-500 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 text-xs font-mono uppercase tracking-wider bg-accent text-black font-semibold hover:bg-accent/90 transition-all"
                >
                  Unlock OS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Elegant Luxury Toast system */}
      {activeToast && (
        <div 
          className="fixed bottom-6 left-6 z-50 bg-[#121212] border border-accent/30 p-4 shadow-2xl flex items-center justify-between space-x-4 max-w-sm animate-fadeIn"
          style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <p className="text-[11px] font-mono tracking-wider text-text-primary uppercase leading-tight">
              {activeToast.message}
            </p>
          </div>
          <button 
            onClick={() => setActiveToast(null)}
            className="text-text-secondary hover:text-text-primary cursor-pointer p-0.5"
            aria-label="Dismiss Note"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
