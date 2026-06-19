"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Tag, Zap, Truck, CreditCard, Sparkles, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OFFERS = [
  { id: 1, title: "Flat 20% OFF", desc: "On premium dry fruits", icon: Tag, color: "from-rose-500 to-orange-500", link: "/categories/dry-fruits", cta: "Shop Now" },
  { id: 2, title: "Buy 1 Get 1 Free", desc: "On select chocolates", icon: Gift, color: "from-purple-600 to-indigo-600", link: "/categories/chocolates", cta: "View Offer" },
  { id: 3, title: "Free Delivery", desc: "On orders above ₹499", icon: Truck, color: "from-emerald-500 to-teal-600", link: "/offers", cta: "Explore" },
  { id: 4, title: "Extra ₹100 OFF", desc: "Use code FLY100", icon: Tag, color: "from-blue-600 to-cyan-500", link: "/offers", cta: "Shop Now" },
  { id: 5, title: "Festival Special", desc: "Up to 50% off on hampers", icon: Sparkles, color: "from-amber-500 to-orange-600", link: "/categories/gifting", cta: "Explore" },
  { id: 6, title: "Premium Member", desc: "Exclusive 10% discount", icon: Zap, color: "from-slate-800 to-slate-950", link: "/support", cta: "Learn More" },
  { id: 7, title: "Limited Time Deal", desc: "On healthy snacks", icon: Zap, color: "from-rose-600 to-pink-600", link: "/categories/snacks-bars", cta: "Shop Now" },
  { id: 8, title: "Combo Offer", desc: "Save 30% on pantry staples", icon: Gift, color: "from-indigo-500 to-blue-600", link: "/categories/staples", cta: "View Offer" },
  { id: 9, title: "Cashback Offer", desc: "Get 5% back on card pay", icon: CreditCard, color: "from-teal-500 to-emerald-600", link: "/offers", cta: "Learn More" }
];

export function OfferCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3 >= OFFERS.length ? 0 : prev + 3));
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const visibleOffers = OFFERS.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full relative overflow-hidden h-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 absolute inset-0"
        >
          {visibleOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <Link 
                key={offer.id} 
                href={offer.link}
                className={`group relative h-24 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200/50 dark:border-slate-800 flex items-center bg-gradient-to-r ${offer.color}`}
              >
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 flex items-center w-full px-5">
                  <div className="w-12 h-12 shrink-0 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mr-4 border border-white/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-extrabold text-lg leading-tight tracking-tight drop-shadow-sm">{offer.title}</h4>
                    <p className="text-white/90 text-xs font-medium mb-1 line-clamp-1">{offer.desc}</p>
                    
                    {/* Premium Text Link CTA */}
                    <div className="flex items-center text-xs font-bold text-white uppercase tracking-wider group/cta mt-0.5 opacity-90 group-hover:opacity-100">
                      {offer.cta}
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/cta:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination dots indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pb-1 z-20">
        {[0, 3, 6].map((idx) => (
          <div 
            key={idx} 
            className={`h-1 rounded-full transition-all duration-500 ${currentIndex === idx ? "w-4 bg-purple-500" : "w-1.5 bg-slate-300 dark:bg-slate-700"}`}
          />
        ))}
      </div>
    </div>
  );
}
