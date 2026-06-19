"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AdvertisementBanner({ ad, delay = 0 }: { ad: any, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <Link href={ad.targetUrl || "#"} className="block group overflow-hidden rounded-2xl relative shadow-sm border border-slate-200/50 dark:border-slate-800">
        <div className="aspect-square md:aspect-[4/5] relative w-full overflow-hidden">
          <Image 
            src={ad.imageUrl} 
            alt={ad.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-tight drop-shadow-md">
              {ad.title}
            </h3>
            <p className="text-white/90 font-medium text-sm md:text-base max-w-sm mb-5 drop-shadow">
              Exclusive deals on premium picks. Elevate your lifestyle with FlyKart.
            </p>
            <div>
              <Button className="rounded-full font-bold bg-white text-slate-900 hover:bg-slate-100 px-8 py-2.5 h-11 shadow-xl hover:scale-105 transition-all">
                Shop Collection
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
