"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/shared/ProductCard";
import { Copy, Clock, Zap, Check, Tag } from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OffersClient({ dealProducts, categories }: { dealProducts: any[], categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer logic
  useEffect(() => {
    // Set a random end time for the day (e.g. midnight)
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = endOfDay.getTime() - currentTime;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredProducts = activeCategory === "all" 
    ? dealProducts 
    : dealProducts.filter(p => p.categoryId === activeCategory);

  // Group products into Flash Deals (first 4) and Standard Deals
  const flashDeals = filteredProducts.slice(0, 4);
  const standardDeals = filteredProducts.slice(4);

  const promoCodes = [
    { code: "WELCOME50", discount: "50% OFF", desc: "On your first order above ₹500", color: "from-purple-600 to-indigo-600" },
    { code: "WEEKEND20", discount: "20% OFF", desc: "Weekend special grocery run", color: "from-rose-500 to-orange-500" },
    { code: "FREESHIP", discount: "FREE SHIP", desc: "No delivery charges today", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="flex flex-col space-y-12 pb-20">
      {/* 1. Hero Banners Carousel */}
      <section className="container mx-auto px-4 mt-6">
        <div className="relative w-full aspect-[21/9] md:aspect-[32/9] rounded-3xl overflow-hidden shadow-2xl group">
          <Image 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070" 
            alt="Mega Summer Sale" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
            <div className="p-8 md:p-16 max-w-2xl text-white space-y-4">
              <span className="inline-block px-3 py-1 bg-rose-500 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
                Limited Time Offer
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Mega <span className="text-amber-400">Summer Sale</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200">
                Get up to 70% off on premium groceries, fresh produce, and household essentials.
              </p>
              <button className="mt-6 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Promo Codes Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Tag className="text-primary w-6 h-6" /> Available Coupons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoCodes.map((promo, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${promo.color}`}>
              {/* Decorative circle */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              
              <h3 className="text-3xl font-black mb-1">{promo.discount}</h3>
              <p className="text-white/90 text-sm mb-6">{promo.desc}</p>
              
              <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <span className="font-mono font-bold tracking-widest">{promo.code}</span>
                <button 
                  onClick={() => handleCopy(promo.code)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                  {copiedCode === promo.code ? (
                    <><Check className="w-4 h-4 text-green-400" /> Copied</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals (Timer) */}
      {flashDeals.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-rose-600 dark:text-rose-400">Flash Deals</h2>
                  <p className="text-muted-foreground text-sm font-medium">Grab them before they are gone!</p>
                </div>
              </div>
              
              {/* Timer */}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-500" />
                <span className="font-semibold text-foreground mr-2">Ends in:</span>
                <div className="flex items-center gap-2 font-mono font-bold text-lg">
                  <div className="bg-white dark:bg-slate-900 border text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <span className="text-muted-foreground">:</span>
                  <div className="bg-white dark:bg-slate-900 border text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <span className="text-muted-foreground">:</span>
                  <div className="bg-white dark:bg-slate-900 border text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Category Filters & Standard Deals */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold">All Deals</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`flex items-center text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                    activeCategory === "all" 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                  }`}
                >
                  All Offers
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                      activeCategory === cat.id 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {standardDeals.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {standardDeals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 border border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center h-64">
                <Zap className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-foreground">No deals in this category</h3>
                <p className="text-muted-foreground mt-2">Check back later for exciting offers!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
