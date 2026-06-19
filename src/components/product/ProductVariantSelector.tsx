"use client";

import { useState } from "react";
import { ProductVariant } from "@prisma/client";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export function ProductVariantSelector({ 
  variants, 
  product 
}: { 
  variants: ProductVariant[],
  product?: any // pass from parent to add to cart
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  if (!selectedVariant) return null;

  const isOutOfStock = selectedVariant.stockQty === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This item is currently out of stock");
      return;
    }
    
    // Fallback if product prop isn't fully passed
    const p = product || { id: selectedVariant.productId, name: "Product", slug: "product", categoryId: "" };
    
    addItem(p as any, selectedVariant, quantity);
    toast.success(`Added ${quantity} ${selectedVariant.weightLabel} to cart!`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price Display */}
      <div className="flex items-end gap-3">
        <span className="text-4xl font-extrabold text-primary">₹{selectedVariant.sellingPrice.toString()}</span>
        {Number(selectedVariant.mrp) > Number(selectedVariant.sellingPrice) && (
          <>
            <span className="text-xl text-muted-foreground line-through mb-1">₹{selectedVariant.mrp.toString()}</span>
            <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md mb-2">
              {Math.round(((Number(selectedVariant.mrp) - Number(selectedVariant.sellingPrice)) / Number(selectedVariant.mrp)) * 100)}% OFF
            </span>
          </>
        )}
      </div>

      {/* Variant Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Select Weight / Size</label>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`
                relative px-6 py-3 rounded-xl border-2 font-medium text-sm transition-all
                ${selectedVariantId === variant.id 
                  ? "border-primary bg-primary/5 text-primary shadow-sm" 
                  : "border-border/60 hover:border-border text-muted-foreground bg-card"}
                ${variant.stockQty === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {variant.weightLabel}
              {selectedVariantId === variant.id && (
                <motion.div layoutId="activeVariant" className="absolute -inset-[2px] rounded-xl border-2 border-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Action */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <div className="flex items-center h-14 rounded-xl border border-input bg-card overflow-hidden">
          <button 
            className="w-14 h-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-12 h-full flex items-center justify-center font-semibold border-x border-input">
            {quantity}
          </div>
          <button 
            className="w-14 h-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            onClick={() => setQuantity(q => Math.min(selectedVariant.stockQty, q + 1))}
            disabled={quantity >= selectedVariant.stockQty}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button 
          size="lg" 
          className="flex-1 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingBag className="mr-2 w-5 h-5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      {/* Stock Warning */}
      {selectedVariant.stockQty > 0 && selectedVariant.stockQty <= selectedVariant.lowStockThreshold && (
        <div className="text-sm font-medium text-amber-500 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          Hurry! Only {selectedVariant.stockQty} left in stock.
        </div>
      )}
    </div>
  );
}
