import { PrismaClient } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
      images: { take: 1 }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory, pricing, and product details.</p>
        </div>
        <Button className="shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all" asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/50" />
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            Total: <span className="font-bold text-slate-900 dark:text-white">{products.length}</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Product</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider">Variants / Price</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-bold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map((product: any) => {
                const defaultVariant = product.variants[0];
                const totalStock = product.variants.reduce((acc: number, v: any) => acc + v.stockQty, 0);
                
                return (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative border shadow-sm shrink-0">
                          {product.images[0]?.url ? (
                            <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-xs">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 font-mono">{defaultVariant?.sku || 'NO-SKU'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {defaultVariant ? `₹${Number(defaultVariant.sellingPrice).toFixed(2)}` : 'N/A'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {product.variants.length} variant(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {totalStock > 0 ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md w-max">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold tracking-wide uppercase">In Stock ({totalStock})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-md w-max">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="text-xs font-bold tracking-wide uppercase">Out of Stock</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No products found. Add some to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
