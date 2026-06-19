"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, ShieldCheck, MapPin, Truck, CreditCard, ChevronRight } from "lucide-react";
import { placeOrder } from "@/app/actions/checkout";

export default function CheckoutPage() {
  const { items, subtotal: getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    toast.loading("Processing your premium order...", { id: "checkout" });

    try {
      const formData = new FormData(e.currentTarget);
      const addressData = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        line1: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        pincode: formData.get("pincode") as string,
      };

      const orderData = {
        items: items.map((i: any) => ({ variantId: i.id, quantity: i.quantity, unitPriceAtPurchase: i.price })),
        subtotal,
        deliveryFee,
        total,
        paymentMethod: "COD"
      };

      const result = await placeOrder(addressData, orderData);

      if (result.success) {
        toast.success("Order placed successfully!", { id: "checkout" });
        clearCart();
        router.push(`/dashboard/orders/${result.orderId}`);
      } else {
        toast.error(result.error || "Failed to place order.", { id: "checkout" });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.", { id: "checkout" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white">Secure Checkout</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Checkout Steps */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Step 1: Address */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm">1</div>
                <CardTitle className="text-xl">Delivery Address</CardTitle>
              </div>
              <CardContent className="p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-600 dark:text-slate-400 font-medium">Full Name <span className="text-rose-500">*</span></Label>
                    <Input id="fullName" name="fullName" required placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-600 dark:text-slate-400 font-medium">Phone Number <span className="text-rose-500">*</span></Label>
                    <Input id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-600 dark:text-slate-400 font-medium">Email Address <span className="text-rose-500">*</span></Label>
                  <Input id="email" name="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-600 dark:text-slate-400 font-medium">Address Line 1 <span className="text-rose-500">*</span></Label>
                  <Input id="address" name="address" required placeholder="House No, Building, Street" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-600 dark:text-slate-400 font-medium">City <span className="text-rose-500">*</span></Label>
                    <Input id="city" name="city" required className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-slate-600 dark:text-slate-400 font-medium">State <span className="text-rose-500">*</span></Label>
                    <Input id="state" name="state" required className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-slate-600 dark:text-slate-400 font-medium">Pincode <span className="text-rose-500">*</span></Label>
                    <Input id="pincode" name="pincode" required className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Payment */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm">2</div>
                <CardTitle className="text-xl">Payment Method</CardTitle>
              </div>
              <CardContent className="p-6 md:p-8 bg-white dark:bg-slate-900">
                <label className="relative p-5 border-2 border-primary rounded-2xl bg-primary/5 flex items-start gap-4 cursor-pointer hover:bg-primary/10 transition-colors">
                  <input type="radio" name="paymentMethod" value="COD" defaultChecked className="mt-1 w-5 h-5 text-primary accent-primary" />
                  <div>
                    <span className="font-bold text-lg block text-slate-900 dark:text-white">Cash on Delivery (COD)</span>
                    <p className="text-sm text-muted-foreground mt-1">Pay with cash or UPI seamlessly when your order is delivered to your doorstep.</p>
                  </div>
                </label>
                
                <div className="mt-4 relative p-5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-start gap-4 opacity-50 cursor-not-allowed">
                  <input type="radio" disabled className="mt-1 w-5 h-5" />
                  <div>
                    <span className="font-bold text-lg block text-slate-900 dark:text-white">Credit/Debit Card</span>
                    <p className="text-sm text-muted-foreground mt-1">Coming soon. We are integrating our Razorpay gateway.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-28">
              <h2 className="text-2xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 shrink-0 overflow-hidden relative border shadow-sm">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">📦</div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="font-semibold text-sm line-clamp-2 leading-tight">{item.name}</span>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between items-center pr-2">
                        <span>{item.variantName} x {item.quantity}</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Subtotal</span>
                  <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Delivery Fee</span>
                  <span className="font-bold text-lg">
                    {deliveryFee === 0 ? <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-sm uppercase tracking-wide">Free</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-4 mt-2 flex justify-between items-end">
                  <span className="font-bold text-lg text-slate-900 dark:text-white">Total Amount</span>
                  <span className="font-extrabold text-3xl text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" disabled={isProcessing} className="w-full h-14 mt-8 text-lg font-bold rounded-2xl shadow-lg shadow-primary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Confirming Order...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Place Order Now
                  </>
                )}
              </Button>
              
              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>256-bit SSL Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
