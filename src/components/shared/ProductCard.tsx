"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: { product: any }) {
  const variant = product.variants?.[0];
  if (!variant) return null;

  const mrp = Number(variant.mrp);
  const sellingPrice = Number(variant.sellingPrice);
  const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  // Deterministic mock rating based on string length to avoid Math.random during render
  const nameLen = product.name.length;
  const rating = ((nameLen % 15) * 0.1 + 3.5).toFixed(1); // 3.5 to 5.0
  const reviews = (nameLen * 13) % 500 + 12;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-card border rounded-2xl overflow-hidden hover-lift premium-shadow flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {discountPercent > 0 && (
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white shadow-md font-bold px-2 py-1">
            {discountPercent}% OFF
          </Badge>
        )}
        {product.isTrending && (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-md font-bold px-2 py-1">
            Trending
          </Badge>
        )}
      </div>

      {/* Quick Actions (Hover) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
        <Button size="icon" variant="secondary" className="w-9 h-9 rounded-full shadow-md bg-white/90 hover:bg-primary hover:text-white backdrop-blur-sm text-slate-700">
          <Heart className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="secondary" className="w-9 h-9 rounded-full shadow-md bg-white/90 hover:bg-primary hover:text-white backdrop-blur-sm text-slate-700">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-slate-100 block shrink-0">
        <Image
          src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1621939514643-0496ceee9c44"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Out of Stock Overlay */}
        {variant.stockQty === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
            <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 bg-white dark:bg-slate-900 relative z-20">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <Link href={`/products/${product.slug}`} className="flex-1">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="text-xs text-muted-foreground mt-2 mb-3">
          {variant.weightLabel} • {product.brand}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-foreground tracking-tight">₹{sellingPrice}</span>
            {mrp > sellingPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">₹{mrp}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="rounded-full h-10 w-10 sm:w-auto sm:px-4 shrink-0 transition-all shadow-sm hover:shadow-primary/30"
            disabled={variant.stockQty === 0}
          >
            <span className="hidden sm:inline">Add</span>
            <ShoppingBag className="w-4 h-4 sm:ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
