"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-hot-toast";

export function AddToCartButton({ product, variant }: { product: any; variant: any }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: variant.id,
      productId: product.id,
      name: product.name,
      variantName: variant.weightLabel,
      price: Number(variant.sellingPrice),
      quantity,
      image: product.images?.[0]?.url,
    });
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Added to Cart!</span>
        <span className="text-sm text-slate-500">{quantity}x {product.name}</span>
      </div>,
      {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex items-center justify-between border-2 border-input rounded-full px-2 h-14 bg-background">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-full hover:bg-slate-100 text-slate-600"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-full hover:bg-slate-100 text-slate-600"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <Button 
        onClick={handleAddToCart}
        size="lg" 
        className="flex-1 rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
        disabled={variant.stockQty === 0}
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        {variant.stockQty === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
