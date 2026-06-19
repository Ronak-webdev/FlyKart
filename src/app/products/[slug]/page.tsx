import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { Star, Truck, ShieldCheck, CheckCircle2, ChevronRight, Share2, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      variants: true,
      images: { orderBy: { position: "asc" } },
      reviews: { include: { user: true } },
    },
  });

  if (!product) {
    notFound();
  }

  const variant = product.variants[0];
  if (!variant) return null;

  const mrp = Number(variant.mrp);
  const sellingPrice = Number(variant.sellingPrice);
  const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b bg-white dark:bg-slate-900 shadow-sm sticky top-20 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href={`/categories/${product.category.slug}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-foreground font-semibold truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-12 shadow-sm border flex flex-col lg:flex-row gap-12">
          
          {/* Left: Images */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={product.images[0]?.url || "https://images.unsplash.com/photo-1621939514643-0496ceee9c44"}
                alt={product.name}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 hover:bg-rose-50 hover:text-rose-500">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 hover:bg-blue-50 hover:text-blue-500">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              {discountPercent > 0 && (
                <Badge className="absolute top-4 left-4 bg-rose-500 text-white font-bold px-3 py-1.5 shadow-lg text-sm">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-slate-100 border-2 border-transparent hover:border-primary cursor-pointer overflow-hidden relative">
                  <Image src={product.images[0]?.url || "https://images.unsplash.com/photo-1621939514643-0496ceee9c44"} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">{product.brand}</span>
              {product.isBestSeller && <Badge variant="secondary" className="bg-amber-100 text-amber-700">Best Seller</Badge>}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-600 border border-amber-200">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{rating}</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium underline cursor-pointer hover:text-primary">Read 124 reviews</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-black text-foreground">₹{sellingPrice}</span>
                {mrp > sellingPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-bold mb-1">₹{mrp}</span>
                    <span className="text-sm font-bold text-rose-500 mb-1.5">Save ₹{mrp - sellingPrice}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Inclusive of all taxes</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">Pack Size</h3>
              <div className="flex gap-3">
                <Button variant="outline" className="border-2 border-primary bg-primary/5 text-primary font-bold">
                  {variant.weightLabel}
                </Button>
                {/* Mock alternative sizes */}
                <Button variant="outline" className="border border-input text-muted-foreground font-medium hover:border-primary hover:text-primary">
                  500g
                </Button>
                <Button variant="outline" className="border border-input text-muted-foreground font-medium hover:border-primary hover:text-primary">
                  1kg
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-4 border-t">
              <AddToCartButton product={JSON.parse(JSON.stringify(product))} variant={JSON.parse(JSON.stringify(variant))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100">
                <Truck className="w-6 h-6" />
                <div>
                  <div className="font-bold text-sm">Free Express Delivery</div>
                  <div className="text-xs opacity-80">Arrives in 2 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100">
                <ShieldCheck className="w-6 h-6" />
                <div>
                  <div className="font-bold text-sm">100% Quality Assured</div>
                  <div className="text-xs opacity-80">Authentic brand product</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">Premium quality ingredients sourced globally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">Hygienically packed to retain freshness and flavor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">No artificial colors or preservatives added.</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
