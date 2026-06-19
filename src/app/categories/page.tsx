import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;

  const products = await prisma.product.findMany({
    where: categoryFilter
      ? { category: { slug: categoryFilter }, status: "ACTIVE" }
      : { status: "ACTIVE" },
    include: {
      category: true,
      variants: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {categoryFilter ? <span className="capitalize">{categoryFilter.replace("-", " ")}</span> : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {products.length} product(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold mb-4">No products found.</h2>
          <Button asChild>
            <Link href="/categories">View All Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg flex flex-col">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50 text-sm">
                  Image Placeholder
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
                  {product.category.name}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-bold text-xl">₹{Number(product.variants[0]?.sellingPrice) || 0}</span>
                    {Number(product.variants[0]?.sellingPrice) < Number(product.variants[0]?.mrp) && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ₹{Number(product.variants[0]?.mrp)}
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
