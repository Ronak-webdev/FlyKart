import Link from "next/link";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t-4 border-primary mt-20 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                F
              </div>
              <span className="text-3xl font-extrabold text-white tracking-tight">FlyKart</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              India&apos;s premium destination for FMCG, curated dry fruits, chocolates, and everyday essentials. Delivered fresh, fast, and flawlessly to your doorstep.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                Fb
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                Tw
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                Ig
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                Yt
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />About Us</Link></li>
              <li><Link href="/categories/offers" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Offers & Deals</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Help Center</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />FlyKart Blog</Link></li>
              <li><Link href="/corporate" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Corporate Gifting</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Top Categories</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/categories/premium-dry-fruits" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Premium Dry Fruits</Link></li>
              <li><Link href="/categories/chocolates-candies" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Chocolates & Candies</Link></li>
              <li><Link href="/categories/sweets-mithai" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Sweets & Mithai</Link></li>
              <li><Link href="/categories/snacks-namkeen" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Snacks & Namkeen</Link></li>
              <li><Link href="/categories/beverages" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" />Beverages</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg tracking-wide">Newsletter</h4>
            <p className="text-sm text-slate-400">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex bg-slate-900 rounded-full p-1 border border-slate-800 focus-within:border-primary transition-colors">
              <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none pl-4 text-sm w-full text-white placeholder:text-slate-500" />
              <Button className="rounded-full w-10 h-10 p-0 shrink-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                <Send className="w-4 h-4 ml-[-2px]" />
              </Button>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Level 4, Cyber Park, Bengaluru</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary" />
                <span>1800-FLY-KART</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@flykart.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} FlyKart Retail Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
