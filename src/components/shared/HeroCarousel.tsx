"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Premium Groceries & Gourmet Snacks",
    subtitle: "Delivered to your doorstep in hours. Handpicked for quality, freshness, and authentic taste.",
    image: "/images/banners/banner1.png",
    cta: "Shop the Sale"
  },
  {
    id: 2,
    title: "The Finest Chocolates & Candies",
    subtitle: "Indulge in our exclusive imported collection. Perfect for gifting or treating yourself.",
    image: "/images/banners/banner2.png",
    cta: "Explore Chocolates"
  },
  {
    id: 3,
    title: "Premium Dry Fruits & Nuts",
    subtitle: "Boost your immunity with our organic, hand-selected dry fruits from around the globe.",
    image: "/images/banners/banner3.png",
    cta: "View Dry Fruits"
  }
];

export function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden relative w-full aspect-[21/9] md:aspect-[3/1] xl:aspect-[4/1] bg-slate-900" ref={emblaRef}>
      <div className="flex w-full h-full">
        {banners.map((banner) => (
          <div className="relative flex-[0_0_100%] min-w-0 h-full" key={banner.id}>
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={banner.id === 1}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] flex items-center">
              <div className="container mx-auto px-4 lg:px-12">
                <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                  <span className="inline-block px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">
                    Mega Sale Live
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl">
                    {banner.title}
                  </h1>
                  <p className="text-base md:text-xl text-slate-200 font-medium drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button size="lg" className="rounded-full text-sm md:text-base font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1 transition-all h-12 md:h-14 px-6 md:px-8">
                      {banner.cta}
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-sm md:text-base font-bold bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-md h-12 md:h-14 px-6 md:px-8 hidden sm:flex">
                      View Categories
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
