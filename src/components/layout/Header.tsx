import Link from "next/link";
import { Search, ShoppingBag, User, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartBadge } from "@/components/layout/CartBadge";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#2c1358] via-purple-800 to-[#2c1358] text-white py-2 text-center text-xs font-bold tracking-widest uppercase shadow-inner">
        Free express delivery on all orders above ₹500! Use code FLY500.
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7a32f5] to-[#c88dfc] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(122,50,245,0.4)] group-hover:shadow-[0_0_30px_rgba(122,50,245,0.6)] group-hover:scale-105 transition-all duration-300">
            F
          </div>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-primary transition-colors">FlyKart</span>
        </Link>

        {/* Search Bar - Premium Design */}
        <div className="hidden md:flex flex-1 max-w-2xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="search"
            placeholder="Search premium dry fruits, healthy snacks, chocolates..."
            className="h-12 w-full rounded-full border border-transparent bg-slate-100 pl-12 pr-16 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 shadow-inner"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="bg-white px-2.5 py-1 rounded-full text-xs font-bold text-slate-400 border border-slate-200 shadow-sm">⌘K</div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative">
            <Heart className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative hidden sm:flex">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
          </Button>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-purple-500 hover:ring-offset-2 hover:ring-offset-slate-950 transition-all focus:outline-none">
                  <Avatar className="h-10 w-10 border border-slate-800">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-purple-900 text-white font-bold">{session.user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-slate-200 text-slate-900 shadow-xl rounded-xl" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-900">{session.user?.name}</p>
                    <p className="text-xs leading-none text-slate-500">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuItem className="hover:bg-slate-50 focus:bg-slate-50 cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-50 focus:bg-slate-50 cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuItem className="hover:bg-rose-50 focus:bg-rose-50 cursor-pointer text-rose-600">
                  <Link href="/api/auth/signout" className="flex w-full">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/api/auth/signin">
                <Button variant="ghost" className="text-slate-600 hover:text-primary hover:bg-primary/10 rounded-full font-semibold px-5">
                  Sign In
                </Button>
              </Link>
              <Link href="/api/auth/signin">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold px-6 shadow-lg hover:shadow-purple-500/25 transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Cart Icon Container (Client Component) */}
          <div className="relative">
            <CartBadge />
          </div>
        </div>
      </div>
    </header>
  );
}
