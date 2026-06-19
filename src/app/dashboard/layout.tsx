import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  Ticket, 
  Bell, 
  LogOut 
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const navItems = [
    { name: "Profile", href: "/dashboard", icon: User },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Coupons", href: "/dashboard/coupons", icon: Ticket },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/50">
              <h2 className="font-semibold text-lg">{session.user.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{session.user.email}</p>
            </div>
            <nav className="flex flex-col p-2 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="my-2 border-t" />
              <Link
                href="/api/auth/signout"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
