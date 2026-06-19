import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shared/ProductCard";
import { AdvertisementBanner } from "@/components/shared/AdvertisementBanner";
import { HeroCarousel } from "@/components/shared/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/FadeIn";
import { ChevronRight, ArrowRight, ShieldCheck, Truck, Clock, RefreshCw, Star, PlayCircle, Smartphone } from "lucide-react";

const prisma = new PrismaClient();

// Revalidate home page every hour since it's a massive store
export const revalidate = 3600;

export default async function HomePage() {
  const [
    categories,
    ads,
    trendingProducts,
    dealProducts,
    bestSellers,
    newArrivals,
    testimonials,
    blogs,
    brands
  ] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true } }),
    prisma.advertisement.findMany({ where: { isActive: true }, orderBy: { priority: "desc" } }),
    prisma.product.findMany({ where: { isTrending: true }, include: { variants: true, images: true }, take: 8 }),
    prisma.product.findMany({ where: { isDealOfDay: true }, include: { variants: true, images: true }, take: 4 }),
    prisma.product.findMany({ where: { isBestSeller: true }, include: { variants: true, images: true }, take: 8 }),
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, include: { variants: true, images: true }, take: 8 }),
    prisma.testimonial.findMany({ where: { isActive: true }, take: 4 }),
    prisma.blogPost.findMany({ where: { isActive: true }, take: 3 }),
    prisma.brandPartner.findMany({ where: { isActive: true } })
  ]);

  const heroAds = ads.filter(a => a.position === "HERO_SLIDER");
  const dealAds = ads.filter(a => a.position === "DEAL_OF_DAY");
  const sidebarAds = ads.filter(a => a.position === "SIDEBAR");
  const topAds = ads.filter(a => a.position === "TOP_BANNER");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Large Premium Auto-Rotating Hero Slider */}
      <HeroCarousel />


      {/* 4. Featured Categories Bubble Grid */}
      <FadeIn delay={0.1}>
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Shop by Category</h2>
            <Link href="/categories" className="text-primary font-semibold flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
            {categories.slice(0, 10).map((cat: any) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="group flex flex-col items-center text-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-slate-900 border-2 border-transparent group-hover:border-primary shadow-sm overflow-hidden relative transition-all group-hover:shadow-primary/20 group-hover:-translate-y-1">
                  <Image 
                    src={`https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200`} // Mock fallback
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-muted-foreground group-hover:text-primary leading-tight px-1">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 5. Deals of the Day (Grid + Sidebar Ad) */}
      <FadeIn delay={0.2}>
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-rose-500">Deals of the Day</h2>
          <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold animate-pulse">Ends in 05:43:21</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dealProducts.map((p: any) => <ProductCard key={p.id} product={JSON.parse(JSON.stringify(p))} />)}
          </div>
          {dealAds[0] && (
            <div className="w-full lg:w-1/4 hidden lg:block">
              <div className="h-full rounded-2xl overflow-hidden shadow-sm relative group bg-gradient-to-tr from-rose-600 to-rose-400">
                {dealAds[0].imageUrl && <Image src={dealAds[0].imageUrl} alt="Deal Ad" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 drop-shadow-md">{dealAds[0].title}</h3>
                  <Link href={dealAds[0].targetUrl || "/offers"}>
                    <Button className="w-full rounded-full font-bold shadow-lg hover:scale-105 transition-all">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      </FadeIn>

      {/* 6. Trending Products */}
      <FadeIn delay={0.1}>
        <section className="bg-slate-100 dark:bg-slate-900/50 py-16 my-8 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Trending Right Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingProducts.slice(0, 5).map((p: any) => <ProductCard key={p.id} product={JSON.parse(JSON.stringify(p))} />)}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 7. Specialized Collection (Corporate Gifting / Premium Dry Fruits) */}
      <FadeIn delay={0.2}>
        <section className="container mx-auto px-4 py-12">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-purple-800 text-white relative shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548883354702-8826d7054dd9?auto=format&fit=crop&q=80&w=1600')] opacity-20 mix-blend-overlay bg-cover bg-center" />
            <div className="relative z-10 p-12 md:p-16 lg:w-1/2">
              <Badge className="bg-white text-primary hover:bg-white mb-4 shadow-md">Corporate Gifting</Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">Impress Your Clients with Premium Hampers</h2>
              <p className="text-lg text-white/90 mb-8 max-w-md drop-shadow">Curated assortments of the finest dry fruits, exotic chocolates, and premium beverages.</p>
              <Link href="/categories/gifting">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 hover:scale-105 transition-all rounded-full h-14 px-8 text-lg shadow-xl shadow-black/20">
                  Explore Hampers <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 8. Best Sellers */}
      <FadeIn delay={0.1}>
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">All-Time Best Sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.slice(0, 8).map((p: any) => <ProductCard key={p.id} product={JSON.parse(JSON.stringify(p))} />)}
          </div>
        </section>
      </FadeIn>

      {/* 9. Testimonials */}
      <section className="bg-white dark:bg-slate-900 py-16 my-8 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Loved by Thousands</h2>
            <p className="text-muted-foreground text-lg">Don't just take our word for it. Here's what our customers have to say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm italic mb-6 text-foreground/80">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                    {t.authorImage && <Image src={t.authorImage} alt={t.authorName} fill className="object-cover" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.authorName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Brand Partners */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-center text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Trusted by Premium Brands</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((b: any) => (
            <div key={b.id} className="text-2xl font-black tracking-tighter">{b.name}</div>
          ))}
        </div>
      </section>

      {/* 11. Blog / Articles */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">The FlyKart Blog</h2>
          <Link href="/blog" className="text-primary font-semibold hover:underline">View All Articles</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{new Date(blog.publishedAt).toLocaleDateString()}</div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. App Promotion */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
          <div className="relative z-10 md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/20">
              <Smartphone className="w-4 h-4" /> Download the App
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Get 20% Off Your First App Order!</h2>
            <p className="text-slate-300 text-lg">Experience lightning-fast checkout, real-time order tracking, and exclusive app-only deals.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 rounded-xl font-bold text-lg">
                App Store
              </Button>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 rounded-xl font-bold text-lg">
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative z-10 hidden md:block w-1/3 aspect-square bg-gradient-to-tr from-primary to-rose-500 rounded-3xl rotate-12 shadow-2xl opacity-80 border-8 border-white/10 flex items-center justify-center">
            <span className="text-8xl font-black text-white/50 -rotate-12">F</span>
          </div>
        </div>
      </section>

    </div>
  );
}
