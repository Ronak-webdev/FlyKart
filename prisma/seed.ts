const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

async function main() {
  console.log("Seeding database...");

  // 1. Categories
  const categoryNames = [
    "Snacks & Namkeen", "Sweets & Mithai", "Premium Dry Fruits", "Chocolates & Candies",
    "Bakery & Biscuits", "Beverages", "Pickles & Chutneys", "Masalas & Spices",
    "Staples", "Instant Food", "Corporate Gifting", "Festival Specials",
    "Snack Bars", "Healthy Alternatives", "Exotic Fruits", "Vegan Specials",
    "Dairy & Cheese", "Organic Food", "Baking Needs", "Breakfast Cereals"
  ];

  const categories = [];
  for (const name of categoryNames) {
    const slug = generateSlug(name);
    const cat = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        description: `Explore our premium collection of ${name}. Handpicked for quality and taste.`,
        isActive: true,
        isFeatured: ["Premium Dry Fruits", "Snacks & Namkeen", "Chocolates & Candies", "Corporate Gifting", "Festival Specials", "Sweets & Mithai"].includes(name)
      }
    });
    categories.push(cat);
  }

  // 2. Products (100+)
  const productData = [
    // Snacks & Namkeen
    { name: "Bikaneri Bhujia", brand: "Haldiram's", cat: "Snacks & Namkeen", price: 120, img: "1599490659213-e2b9527fd342", trend: true, best: true },
    { name: "Moong Dal", brand: "Bikaji", cat: "Snacks & Namkeen", price: 100, img: "1599490659213-e2b9527fd342", trend: false, best: true },
    { name: "Navratan Mixture", brand: "Haldiram's", cat: "Snacks & Namkeen", price: 150, img: "1599490659213-e2b9527fd342", trend: true, best: false },
    { name: "Aloo Bhujia", brand: "Balaji", cat: "Snacks & Namkeen", price: 90, img: "1599490659213-e2b9527fd342", trend: false, best: true },
    { name: "Khatta Meetha", brand: "Haldiram's", cat: "Snacks & Namkeen", price: 140, img: "1599490659213-e2b9527fd342", trend: false, best: false },
    { name: "Diet Chivda", brand: "Gits", cat: "Snacks & Namkeen", price: 180, img: "1599490659213-e2b9527fd342", trend: true, best: false },
    { name: "Ratlami Sev", brand: "Bikaji", cat: "Snacks & Namkeen", price: 130, img: "1599490659213-e2b9527fd342", trend: false, best: true },
    
    // Sweets & Mithai
    { name: "Kaju Katli", brand: "Bikanervala", cat: "Sweets & Mithai", price: 850, img: "1601004890684-d8cbf643f5f2", trend: true, best: true },
    { name: "Rasgulla Tin", brand: "Haldiram's", cat: "Sweets & Mithai", price: 250, img: "1601004890684-d8cbf643f5f2", trend: false, best: true },
    { name: "Gulab Jamun", brand: "MTR", cat: "Sweets & Mithai", price: 230, img: "1601004890684-d8cbf643f5f2", trend: false, best: false },
    { name: "Soan Papdi", brand: "Haldiram's", cat: "Sweets & Mithai", price: 180, img: "1601004890684-d8cbf643f5f2", trend: true, best: false },
    { name: "Milk Cake", brand: "Bikanervala", cat: "Sweets & Mithai", price: 700, img: "1601004890684-d8cbf643f5f2", trend: false, best: true },
    
    // Premium Dry Fruits
    { name: "California Almonds", brand: "Happilo", cat: "Premium Dry Fruits", price: 950, img: "1596662951362-e55c328b0f79", trend: true, best: true, deal: true },
    { name: "Afghan Anjeer", brand: "Tulsi", cat: "Premium Dry Fruits", price: 1200, img: "1596662951362-e55c328b0f79", trend: false, best: false },
    { name: "Iranian Pistachios", brand: "Nutraj", cat: "Premium Dry Fruits", price: 1400, img: "1596662951362-e55c328b0f79", trend: true, best: true },
    { name: "Walnut Kernels", brand: "Happilo", cat: "Premium Dry Fruits", price: 1100, img: "1596662951362-e55c328b0f79", trend: false, best: true },
    { name: "Omani Dates", brand: "Lion", cat: "Premium Dry Fruits", price: 400, img: "1596662951362-e55c328b0f79", trend: true, best: false },
    { name: "Dried Cranberries", brand: "Del Monte", cat: "Premium Dry Fruits", price: 600, img: "1596662951362-e55c328b0f79", trend: false, best: false },
    { name: "Roasted Cashews", brand: "Farmley", cat: "Premium Dry Fruits", price: 850, img: "1596662951362-e55c328b0f79", trend: true, best: true },

    // Chocolates & Candies
    { name: "Dairy Milk Silk", brand: "Cadbury", cat: "Chocolates & Candies", price: 160, img: "1548883354702-8826d7054dd9", trend: true, best: true },
    { name: "Ferrero Rocher", brand: "Ferrero", cat: "Chocolates & Candies", price: 850, img: "1548883354702-8826d7054dd9", trend: true, best: true, deal: true },
    { name: "Lindt Excellence Dark", brand: "Lindt", cat: "Chocolates & Candies", price: 450, img: "1548883354702-8826d7054dd9", trend: false, best: true },
    { name: "Snickers Miniatures", brand: "Mars", cat: "Chocolates & Candies", price: 300, img: "1548883354702-8826d7054dd9", trend: false, best: false },
    { name: "Toblerone", brand: "Mondelez", cat: "Chocolates & Candies", price: 250, img: "1548883354702-8826d7054dd9", trend: true, best: false },
    { name: "KitKat Dessert", brand: "Nestle", cat: "Chocolates & Candies", price: 150, img: "1548883354702-8826d7054dd9", trend: false, best: true },

    // Beverages
    { name: "Taj Mahal Tea", brand: "Brooke Bond", cat: "Beverages", price: 550, img: "1556742049-cdfa48ce3860", trend: false, best: true },
    { name: "Nescafe Gold", brand: "Nescafe", cat: "Beverages", price: 650, img: "1556742049-cdfa48ce3860", trend: true, best: true, deal: true },
    { name: "Green Tea Pure", brand: "Lipton", cat: "Beverages", price: 200, img: "1556742049-cdfa48ce3860", trend: false, best: false },
    { name: "Bournvita", brand: "Cadbury", cat: "Beverages", price: 350, img: "1556742049-cdfa48ce3860", trend: false, best: true },
    { name: "Red Bull Energy", brand: "Red Bull", cat: "Beverages", price: 120, img: "1556742049-cdfa48ce3860", trend: true, best: true },
    { name: "Real Fruit Juice", brand: "Dabur", cat: "Beverages", price: 110, img: "1556742049-cdfa48ce3860", trend: false, best: false },

    // Bakery & Biscuits
    { name: "Dark Fantasy Choco Fills", brand: "Sunfeast", cat: "Bakery & Biscuits", price: 120, img: "1558961363-fa5084931a7f", trend: true, best: true },
    { name: "Good Day Cashew", brand: "Britannia", cat: "Bakery & Biscuits", price: 80, img: "1558961363-fa5084931a7f", trend: false, best: true },
    { name: "Hide & Seek", brand: "Parle", cat: "Bakery & Biscuits", price: 60, img: "1558961363-fa5084931a7f", trend: false, best: false },
    { name: "Oreo Original", brand: "Cadbury", cat: "Bakery & Biscuits", price: 90, img: "1558961363-fa5084931a7f", trend: true, best: true },
    { name: "NutriChoice Oats", brand: "Britannia", cat: "Bakery & Biscuits", price: 110, img: "1558961363-fa5084931a7f", trend: false, best: false },

    // Masalas & Spices
    { name: "Garam Masala", brand: "Everest", cat: "Masalas & Spices", price: 85, img: "1596040033229-a9821ebd058d", trend: false, best: true },
    { name: "Chaat Masala", brand: "MDH", cat: "Masalas & Spices", price: 70, img: "1596040033229-a9821ebd058d", trend: true, best: true },
    { name: "Kashmiri Chilli Powder", brand: "Everest", cat: "Masalas & Spices", price: 150, img: "1596040033229-a9821ebd058d", trend: false, best: false },
    { name: "Turmeric Powder", brand: "Catch", cat: "Masalas & Spices", price: 60, img: "1596040033229-a9821ebd058d", trend: false, best: true },
  ];

  // Dynamically generate 60 more products to hit 100
  const genericItems = ["Cookies", "Chips", "Nuts", "Juice", "Tea", "Coffee", "Mix", "Bar", "Syrup", "Spread"];
  const adjectives = ["Premium", "Organic", "Roasted", "Spicy", "Sweet", "Diet", "Natural", "Classic"];
  for (let i = 0; i < 65; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const item = genericItems[Math.floor(Math.random() * genericItems.length)];
    const catObj = categories[Math.floor(Math.random() * categories.length)];
    productData.push({
      name: `${adj} ${item} ${i}`,
      brand: ["FlyKart Originals", "Farm Fresh", "Nature's Best"][Math.floor(Math.random() * 3)],
      cat: catObj.name,
      price: Math.floor(Math.random() * 500) + 50,
      img: "1621939514643-0496ceee9c44",
      trend: Math.random() > 0.8,
      best: Math.random() > 0.7,
      deal: Math.random() > 0.9,
    });
  }

  const products = [];
  let index = 0;
  for (const p of productData) {
    const category = categories.find(c => c.name === p.cat);
    const slug = generateSlug(p.name) + "-" + Math.random().toString(36).substring(7);
    
    const mrp = p.price * 1.2;
    index++;
    
    const prod = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: `Experience the premium quality of ${p.brand}'s ${p.name}. Carefully sourced and delivered fresh to your doorstep. Perfect for your daily needs or special occasions.`,
        brand: p.brand,
        categoryId: category.id,
        isTrending: p.trend || false,
        isBestSeller: p.best || false,
        isDealOfDay: p.deal || false,
        variants: {
          create: [
            {
              weightLabel: "Standard Pack",
              mrp,
              sellingPrice: p.price,
              stockQty: 50,
              sku: `SKU-${slug.substring(0, 8).toUpperCase()}-${index}-${Date.now().toString().slice(-4)}`
            }
          ]
        },
        images: {
          create: [
            {
              url: `https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&q=80&w=800&h=800`,
              position: 0
            }
          ]
        }
      }
    });
    products.push(prod);
  }

  // 3. Advertisements & Banners (30+)
  const banners = [
    { title: "Diwali Mega Sale", img: "1607083206968-13611e3d76db", pos: "HERO_SLIDER" },
    { title: "Organic Fresh Groceries", img: "1542838132-92c53300491e", pos: "HERO_SLIDER" },
    { title: "Premium Chocolates", img: "1548883354702-8826d7054dd9", pos: "HERO_SLIDER" },
    { title: "Deal of the Day", img: "1607083206968-13611e3d76db", pos: "DEAL_OF_DAY" },
    { title: "Snack Time", img: "1599490659213-e2b9527fd342", pos: "SIDEBAR" },
    { title: "Healthy Nuts", img: "1596662951362-e55c328b0f79", pos: "TOP_BANNER" },
  ];

  for (let i = 0; i < 25; i++) {
    banners.push({
      title: `Promo Banner ${i}`,
      img: ["1607083206968-13611e3d76db", "1542838132-92c53300491e", "1548883354702-8826d7054dd9"][Math.floor(Math.random() * 3)],
      pos: ["HERO_SLIDER", "SIDEBAR", "DEAL_OF_DAY"][Math.floor(Math.random() * 3)]
    });
  }

  for (const b of banners) {
    await prisma.advertisement.create({
      data: {
        title: b.title,
        imageUrl: `https://images.unsplash.com/photo-${b.img}?auto=format&fit=crop&q=80&w=1600&h=600`,
        position: b.pos,
        priority: 10
      }
    });
  }

  // 4. Testimonials
  const testimonials = [
    { name: "Priya Sharma", content: "FlyKart's delivery speed and product quality is unmatched. The packaging for the premium dry fruits felt extremely luxurious!" },
    { name: "Rahul Verma", content: "I ordered the Corporate Gifting hamper for my team and everyone was blown away. Definitely the best e-commerce platform for gourmet snacks." },
    { name: "Anjali Gupta", content: "Their UI is so smooth, and finding my favorite Lindt chocolates was a breeze. Highly recommend." },
    { name: "Vikram Singh", content: "Cash on delivery was seamless, and the deals are genuinely better than competitors." }
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: { authorName: t.name, content: t.content, rating: 5, authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" }
    });
  }

  // 5. Brand Partners
  const brands = ["Haldiram's", "Bikaji", "Lindt", "Cadbury", "Ferrero", "Happilo", "Nutraj"];
  for (const b of brands) {
    await prisma.brandPartner.create({
      data: { name: b, logoUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200&h=100" }
    });
  }

  // 6. Blog Posts
  await prisma.blogPost.createMany({
    data: [
      { title: "Top 10 Healthy Snacks for Work", slug: "top-10-healthy-snacks", excerpt: "Boost your productivity with these guilt-free snacks.", content: "Full blog content here.", imageUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527fd342", author: "Admin" },
      { title: "The Art of Gifting Chocolates", slug: "art-of-gifting", excerpt: "Make every occasion special with premium chocolates.", content: "Full blog content here.", imageUrl: "https://images.unsplash.com/photo-1548883354702-8826d7054dd9", author: "Admin" },
      { title: "Why Organic Matters", slug: "why-organic-matters", excerpt: "Understanding the health benefits of organic staples.", content: "Full blog content here.", imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e", author: "Admin" },
    ]
  });

  // 7. FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "How fast is delivery?", answer: "We offer express 24-hour delivery in major metros.", category: "SHIPPING" },
      { question: "Do you accept COD?", answer: "Yes, Cash on Delivery is available on all orders.", category: "PAYMENT" },
      { question: "What is the return policy?", answer: "We have a hassle-free 7-day return policy for unopened items.", category: "RETURNS" },
      { question: "Are the products authentic?", answer: "100% authentic, sourced directly from brands.", category: "QUALITY" },
    ]
  });

  console.log(`Seeded ${products.length} products, ${categories.length} categories, ${banners.length} banners, and auxiliary content.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
