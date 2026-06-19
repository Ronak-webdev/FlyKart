import { PrismaClient } from "@prisma/client";
import { OffersClient } from "./OffersClient";
import { Metadata } from "next";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Offers & Deals | FlyKart",
  description: "Get the best offers and deals on premium groceries and more at FlyKart.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function OffersPage() {
  const [categories, dealProducts] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true } }),
    prisma.product.findMany({
      where: {
        OR: [
          { isDealOfDay: true },
          { isTrending: true } // Including trending to ensure the page is well-populated
        ],
        status: "ACTIVE"
      },
      include: {
        variants: true,
        images: true,
      },
    }),
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="bg-white dark:bg-slate-900 border-b pb-4 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Offers & Deals</h1>
          <p className="text-muted-foreground mt-2 text-lg">Discover the best prices on your favorite products.</p>
        </div>
      </div>
      
      {/* Client Component for interactive elements */}
      <OffersClient 
        dealProducts={JSON.parse(JSON.stringify(dealProducts))} 
        categories={JSON.parse(JSON.stringify(categories))} 
      />
    </div>
  );
}
