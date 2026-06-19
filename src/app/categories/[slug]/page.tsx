import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, SlidersHorizontal, ArrowDownAZ, CheckCircle2 } from "lucide-react";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryPage(props: { params: Promise<{ slug: string }>, searchParams: Promise<any> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  // Parse sorting
  let orderBy: any = { createdAt: "desc" };
  if (searchParams.sort === "price-asc") orderBy = { variants: { _count: "asc" } };
  if (searchParams.sort === "price-desc") orderBy = { variants: { _count: "desc" } };

  // Parse brand filter
  const selectedBrand = searchParams.brand as string | undefined;

  const whereClause: any = { categoryId: category.id, status: "ACTIVE" };
  if (selectedBrand) {
    whereClause.brand = selectedBrand;
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    include: { variants: true, images: true, reviews: true },
    orderBy,
  });

  // Get Unique Brands for this category (ignoring current filter so all brands show up)
  const allProductsInCategory = await prisma.product.findMany({
    where: { categoryId: category.id, status: "ACTIVE" },
    select: { brand: true }
  });
  const brands = Array.from(new Set(allProductsInCategory.map((p: any) => p.brand)));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <div className="w-full bg-slate-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-slate-900 opacity-90 mix-blend-multiply z-10" />
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e'})` }}
        />
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center text-white">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-6 font-medium uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{category.name}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-xl">{category.name}</h1>
          <p className="text-xl text-purple-100 max-w-2xl font-medium">{category.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 font-bold text-xl border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 text-slate-800 dark:text-slate-100">
                <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                Filters
              </div>
              
              <div className="space-y-8">
                {/* Featured Brands Filter */}
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Brands</h3>
                  <div className="space-y-2">
                    <Link 
                      href={`/categories/${category.slug}`}
                      className="flex items-center gap-3 cursor-pointer group w-full"
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${!selectedBrand ? 'bg-purple-600 border-purple-600' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-purple-400'}`}>
                        {!selectedBrand && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${!selectedBrand ? 'text-purple-700 dark:text-purple-400 font-bold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>All Brands</span>
                    </Link>

                    {brands.map((brand, i) => {
                      const isActive = selectedBrand === brand;
                      return (
                        <Link 
                          key={i} 
                          href={`/categories/${category.slug}?brand=${encodeURIComponent(brand)}`}
                          className="flex items-center gap-3 cursor-pointer group w-full"
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isActive ? 'bg-purple-600 border-purple-600' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-purple-400'}`}>
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-sm font-medium transition-colors ${isActive ? 'text-purple-700 dark:text-purple-400 font-bold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{brand}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {["Under ₹100", "₹100 - ₹500", "₹500 - ₹1000", "Over ₹1000"].map((range, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-purple-400 transition-colors flex items-center justify-center bg-white dark:bg-slate-900" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Offers Section & Ads */}
              <div className="mt-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                <h4 className="font-bold text-xl mb-2 relative z-10">Premium Offer</h4>
                <p className="text-sm mb-4 relative z-10 text-purple-100">Get 15% off on {category.name} from top brands.</p>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 mb-4 font-mono font-bold tracking-widest text-lg relative z-10">PREMIUM15</div>
                <Button variant="secondary" className="w-full relative z-10 font-bold rounded-xl text-purple-700 hover:text-purple-800">Copy Code</Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Sorting & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing <strong className="text-slate-900 dark:text-white text-base">{products.length}</strong> products {selectedBrand && <span>for <strong className="text-purple-600">{selectedBrand}</strong></span>}
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="lg:hidden gap-2 rounded-xl">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:block text-slate-500 dark:text-slate-400">Sort by:</span>
                  <div className="relative border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 bg-slate-50 dark:bg-slate-800">
                    <select className="h-10 px-4 pr-10 text-sm bg-transparent outline-none appearance-none font-semibold cursor-pointer text-slate-700 dark:text-slate-200">
                      <option value="relevance">Relevance</option>
                      <option value="new">New Arrivals</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ArrowDownAZ className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="text-center py-24 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">We couldn't find any products matching your current filters. Try selecting a different brand.</p>
                <Link href={`/categories/${category.slug}`}>
                  <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8">Clear Filters</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={JSON.parse(JSON.stringify(product))} />
                ))}
              </div>
            )}
            
            {/* Recommended Products & Related Categories */}
            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold mb-6">Explore More Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Snacks & Namkeen", slug: "namkeen" },
                  { name: "Chocolates", slug: "chocolates" },
                  { name: "Beverages", slug: "beverages" },
                  { name: "Bakery", slug: "bakery" }
                ].filter(c => c.slug !== category.slug).slice(0, 4).map(cat => (
                  <Link 
                    key={cat.slug} 
                    href={`/categories/${cat.slug}`}
                    className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900 transition-all text-center group"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 transition-colors">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
