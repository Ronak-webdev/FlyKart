"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const MEGA_CATEGORIES = [
  {
    name: "Namkeen",
    slug: "namkeen",
    columns: [
      {
        title: "Top Brands",
        items: ["Haldiram's", "Bikaji", "Balaji Wafers", "Bikanervala", "Gopal Snacks", "Yellow Diamond", "Frito Lay"],
        type: "brand"
      },
      {
        title: "Traditional Snacks",
        items: ["Bhujia", "Ratlami Sev", "Aloo Bhujia", "Navratan Mixture", "Chivda", "Farsan", "Gathiya"],
        type: "type"
      },
      {
        title: "Popular Snacks",
        items: ["Chips", "Wafers", "Puffs", "Sticks", "Crackers", "Peanuts", "Roasted Snacks"],
        type: "type"
      },
      {
        title: "Collections",
        items: ["Best Sellers", "New Arrivals", "Combo Packs", "Party Packs", "Premium Range", "Diet Range"],
        type: "collection"
      }
    ]
  },
  {
    name: "Bakery",
    slug: "bakery",
    columns: [
      {
        title: "Top Brands",
        items: ["Britannia", "Parle", "Sunfeast", "Bonn", "Harvest Gold", "Modern", "Elite"],
        type: "brand"
      },
      {
        title: "Biscuits & Cookies",
        items: ["Cream Biscuits", "Marie", "Digestive", "Cookies", "Salted Biscuits", "Butter Cookies"],
        type: "type"
      },
      {
        title: "Fresh Bakery",
        items: ["Bread", "Brown Bread", "Multigrain Bread", "Cake", "Muffins", "Donuts", "Croissants"],
        type: "type"
      },
      {
        title: "Collections",
        items: ["Premium Bakery", "Sugar Free", "Healthy Range", "Best Sellers", "New Arrivals"],
        type: "collection"
      }
    ]
  },
  {
    name: "Chocolates",
    slug: "chocolates",
    columns: [
      {
        title: "Top Brands",
        items: ["Cadbury", "Nestlé", "Ferrero Rocher", "Lindt", "Hershey's", "Toblerone", "Mars", "Snickers", "KitKat", "Amul"],
        type: "brand"
      },
      {
        title: "Chocolate Types",
        items: ["Dark Chocolate", "Milk Chocolate", "White Chocolate", "Truffles", "Chocolate Bars", "Assorted Chocolates", "Imported Chocolates", "Luxury Chocolates"],
        type: "type"
      },
      {
        title: "Gifting",
        items: ["Gift Boxes", "Premium Hampers", "Festival Gifts", "Corporate Gifts", "Celebration Packs"],
        type: "collection"
      }
    ]
  },
  {
    name: "Dry Fruits",
    slug: "dry-fruits",
    columns: [
      {
        title: "Top Brands",
        items: ["Happilo", "Nutraj", "Farmley", "Rostaa", "Vedaka", "Wonderland", "Urban Platter", "Tulsi", "Nutty Gritties", "True Elements"],
        type: "brand"
      },
      {
        title: "Premium Products",
        items: ["Almonds", "Cashews", "Pistachios", "Walnuts", "Raisins", "Dates", "Figs", "Apricots", "Berries", "Mixed Dry Fruits"],
        type: "type"
      },
      {
        title: "Premium Collections",
        items: ["Gift Boxes", "Luxury Hampers", "Imported Collection", "Organic Collection"],
        type: "collection"
      }
    ]
  },
  {
    name: "Pickles",
    slug: "pickles",
    columns: [
      {
        title: "Top Brands",
        items: ["Mother's Recipe", "Priya", "Nilon's", "Bedekar", "Pachranga", "Aachi", "Ram Bandhu", "MTR"],
        type: "brand"
      },
      {
        title: "Authentic Types",
        items: ["Mango Pickle", "Lemon Pickle", "Garlic Pickle", "Chilli Pickle", "Mixed Pickle", "Punjabi Pickle", "Gujarati Pickle", "South Indian Pickle"],
        type: "type"
      }
    ]
  },
  {
    name: "Snack Bars",
    slug: "snack-bars",
    columns: [
      {
        title: "Top Brands",
        items: ["Yoga Bar", "RiteBite", "The Whole Truth", "Eat Anytime", "Nature Valley", "Kellogg's", "Pintola"],
        type: "brand"
      },
      {
        title: "Healthy Types",
        items: ["Protein Bars", "Energy Bars", "Granola Bars", "Fruit Bars", "Healthy Snacks", "Fitness Snacks"],
        type: "type"
      }
    ]
  },
  {
    name: "Gifting",
    slug: "gifting",
    columns: [
      {
        title: "Top Brands",
        items: ["Happilo", "Nutraj", "Ferrero", "Cadbury", "Haldiram's"],
        type: "brand"
      },
      {
        title: "Special Hampers",
        items: ["Dry Fruit Hampers", "Chocolate Hampers", "Festival Hampers", "Corporate Gifts", "Wedding Gifts", "Luxury Hampers", "Premium Boxes"],
        type: "collection"
      }
    ]
  },
  {
    name: "Beverages",
    slug: "beverages",
    columns: [
      {
        title: "Top Brands",
        items: ["Coca-Cola", "Pepsi", "Sprite", "Thums Up", "Frooti", "Maaza", "Tropicana", "Real", "Paper Boat", "Red Bull", "Monster", "Tata Tea", "Nescafe"],
        type: "brand"
      },
      {
        title: "Refreshments",
        items: ["Soft Drinks", "Juices", "Tea", "Coffee", "Energy Drinks", "Health Drinks", "Flavoured Water"],
        type: "type"
      }
    ]
  },
  {
    name: "Masalas",
    slug: "masalas",
    columns: [
      {
        title: "Top Brands",
        items: ["MDH", "Everest", "Catch", "Tata Sampann", "Badshah", "Ramdev", "Eastern", "MTR"],
        type: "brand"
      },
      {
        title: "Essential Spices",
        items: ["Garam Masala", "Chaat Masala", "Kitchen King", "Pav Bhaji Masala", "Biryani Masala", "Sabzi Masala", "Turmeric", "Chilli Powder", "Coriander Powder", "Cumin Powder"],
        type: "type"
      }
    ]
  }
];

export function MegaMenuNav() {
  return (
    <div className="bg-slate-950 text-white w-full border-b border-purple-900/50 shadow-xl hidden md:block">
      <div className="container mx-auto px-4 relative">
        <ul className="flex items-center justify-between">
          {MEGA_CATEGORIES.map((cat) => (
            <li key={cat.slug} className="group relative static md:static">
              {/* Category Link (No Chevron) */}
              <Link 
                href={`/categories/${cat.slug}`}
                className="block py-4 px-2 text-[13px] uppercase font-bold tracking-widest hover:text-purple-300 transition-colors"
              >
                {cat.name}
              </Link>

              {/* Full Width Mega Menu Dropdown */}
              <div className="absolute top-full left-0 w-full mt-0 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-full bg-white text-slate-900 shadow-2xl border-t-2 border-purple-600 border-b border-slate-200">
                  <div className="container mx-auto px-8 py-10 flex gap-12">
                    
                    {/* Columns */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                      {cat.columns.map((col, idx) => (
                        <div key={idx} className={`flex flex-col ${col.items.length > 8 ? "lg:col-span-2" : ""}`}>
                          <div className="flex items-center gap-2 mb-4 border-b pb-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <h4 className="font-extrabold text-sm text-purple-900 uppercase tracking-wider">
                              {col.title}
                            </h4>
                          </div>
                          <ul className={`grid gap-x-8 gap-y-2.5 ${col.items.length > 8 ? "grid-cols-2" : "grid-cols-1"}`}>
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link 
                                  href={`/categories/${cat.slug}?${col.type}=${encodeURIComponent(item)}`}
                                  className="text-sm font-medium text-slate-600 hover:text-purple-700 hover:underline hover:translate-x-1 transition-all inline-block truncate w-full"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                  </div>
                  
                  {/* Bottom Strip */}
                  <div className="bg-slate-50 border-t border-slate-100 py-3">
                    <div className="container mx-auto px-8 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Free Shipping over ₹500</span>
                      <Link href={`/categories/${cat.slug}`} className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
                        View All {cat.name} <Sparkles className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
