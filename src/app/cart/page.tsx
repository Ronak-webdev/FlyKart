"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, ChevronLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal: getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 500 ? 0 : 40; // Free delivery above 500
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(124,58,237,0.2)]"
        >
          <ShoppingBag className="w-14 h-14 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-3">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md text-lg">
          Looks like you haven&apos;t added anything to your cart yet. Discover amazing premium products.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 h-14 shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all text-base font-bold">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center text-sm font-semibold">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Cart</h1>
          <span className="text-lg font-medium text-muted-foreground">{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-slate-50 dark:bg-slate-950 flex justify-between items-center hidden sm:flex text-sm font-bold text-slate-500 uppercase tracking-wider">
                <div className="w-1/2 pl-2">Product</div>
                <div className="w-1/4 text-center">Quantity</div>
                <div className="w-1/4 text-right pr-2">Total</div>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row gap-6 sm:items-center relative group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-5 sm:w-1/2">
                        <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0 relative overflow-hidden border shadow-inner">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-3xl">📦</div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <Link href={`/products/${item.productId}`} className="font-bold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors text-slate-800 dark:text-slate-200">
                            {item.name}
                          </Link>
                          <div className="text-sm font-medium text-muted-foreground mt-1.5 flex items-center gap-2">
                            <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border">
                              {item.variantName}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-primary mt-2 sm:hidden">
                            ₹{item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:w-1/4 sm:justify-center mt-2 sm:mt-0">
                        <div className="flex items-center h-11 border rounded-full overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                          <button 
                            className="w-11 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 h-full flex items-center justify-center font-bold text-base bg-slate-50 dark:bg-slate-800/50 border-x">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-11 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="sm:absolute sm:top-6 sm:right-6 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all p-2 sm:opacity-0 sm:group-hover:opacity-100"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="hidden sm:flex w-1/4 justify-end">
                        <div className="text-right">
                          <div className="font-bold text-xl text-slate-900 dark:text-white">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            ₹{item.price.toFixed(2)} / item
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-28">
              <h2 className="text-2xl font-extrabold tracking-tight mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Delivery</span>
                  <span className="font-bold text-lg">
                    {deliveryFee === 0 ? <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-sm uppercase tracking-wide">Free</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-6 mt-4 flex justify-between items-end">
                  <div>
                    <span className="font-bold text-lg block text-slate-900 dark:text-white">Total</span>
                    <span className="text-xs text-muted-foreground">Inclusive of all taxes</span>
                  </div>
                  <span className="font-extrabold text-3xl text-primary drop-shadow-sm">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 500 && (
                <div className="mb-8 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 p-4 rounded-2xl text-sm font-medium flex items-start gap-3 border border-rose-100 dark:border-rose-500/20">
                  <span className="text-rose-500 bg-white dark:bg-transparent rounded-full mt-0.5">🚀</span>
                  <span>Add <strong>₹{(500 - subtotal).toFixed(2)}</strong> more to unlock FREE Delivery!</span>
                </div>
              )}

              <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
                <Link href="/checkout">
                  Checkout Securely
                  <CreditCard className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 py-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>100% Safe & Secure Payments</span>
                </div>
                <div className="flex gap-2 justify-center opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                  {/* Mock payment icons */}
                  <div className="w-10 h-6 bg-slate-200 rounded"></div>
                  <div className="w-10 h-6 bg-slate-200 rounded"></div>
                  <div className="w-10 h-6 bg-slate-200 rounded"></div>
                  <div className="w-10 h-6 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
