export {};
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: "Namkeen",
    slug: "namkeen",
    description: "Crunchy, savory, and perfectly spiced Indian snacks.",
    imageUrl: "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600",
    brands: ["Haldiram's", "Bikaji", "Balaji", "Gopal", "Bikanervala"]
  },
  {
    name: "Bakery",
    slug: "bakery",
    description: "Freshly baked breads, cookies, and rusks.",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
    brands: ["Britannia", "Parle", "Sunfeast", "Bonn", "Harvest Gold"]
  },
  {
    name: "Chocolates",
    slug: "chocolates",
    description: "Premium chocolates and candies for your sweet cravings.",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600",
    brands: ["Cadbury", "Nestlé", "Ferrero Rocher", "Lindt", "Hershey's"]
  },
  {
    name: "Dry Fruits",
    slug: "dry-fruits",
    description: "Healthy, premium quality nuts and dried fruits.",
    imageUrl: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=600",
    brands: ["Happilo", "Nutraj", "Farmley", "Rostaa", "Vedaka"]
  },
  {
    name: "Pickles",
    slug: "pickles",
    description: "Traditional Indian pickles and chutneys.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600",
    brands: ["Mother's Recipe", "Priya", "Nilon's", "Bedekar", "Pachranga"]
  },
  {
    name: "Snack Bars",
    slug: "snack-bars",
    description: "Energy-packed healthy snack bars.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600",
    brands: ["Yoga Bar", "RiteBite", "The Whole Truth", "Eat Anytime", "Nature Valley"]
  },
  {
    name: "Gifting",
    slug: "gifting",
    description: "Curated gift hampers for every occasion.",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600",
    brands: ["Ferrero Rocher", "Haldiram's", "Happilo", "Cadbury", "Nutraj"]
  },
  {
    name: "Beverages",
    slug: "beverages",
    description: "Refreshing juices, soft drinks, and cold beverages.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600",
    brands: ["Coca-Cola", "Pepsi", "Paper Boat", "Tropicana", "Real"]
  },
  {
    name: "Masalas",
    slug: "masalas",
    description: "Authentic Indian spices and blended masalas.",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600",
    brands: ["MDH", "Everest", "Catch", "Tata Sampann", "Badshah"]
  }
];

async function main() {
  console.log("Starting DB Seed for Categories & Products...");

  for (const cat of categoriesData) {
    // Upsert category
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        imageUrl: cat.imageUrl,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        isActive: true,
      }
    });

    console.log(`✅ Category Created/Updated: ${category.name}`);

    // Create 2 dummy products for EACH brand under this category to ensure filters work perfectly.
    for (const brand of cat.brands) {
      for (let i = 1; i <= 2; i++) {
        const pName = `${brand} Premium ${cat.name} Pack ${i}`;
        const pSlug = `${cat.slug}-${brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}-pack-${i}`;

        await prisma.product.upsert({
          where: { slug: pSlug },
          update: {},
          create: {
            name: pName,
            slug: pSlug,
            description: `High-quality ${cat.name} from ${brand}. Perfect for your daily needs.`,
            brand: brand,
            categoryId: category.id,
            status: "ACTIVE",
            isTrending: i === 1,
            isDealOfDay: i === 2,
            variants: {
              create: [
                {
                  weightLabel: "500g",
                  mrp: 200 + (i * 50),
                  sellingPrice: 180 + (i * 40),
                  stockQty: 50,
                  sku: `${pSlug}-500g`.toUpperCase(),
                }
              ]
            },
            images: {
              create: [
                {
                  url: cat.imageUrl,
                  altText: pName
                }
              ]
            }
          }
        });
      }
    }
    console.log(`   📦 Seeded products for ${cat.name} brands.`);
  }

  console.log("🎉 Seeding Completed Successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
