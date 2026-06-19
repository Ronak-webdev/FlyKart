import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // @ts-ignore - NextAuth user type extension
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold tracking-tight">Storefront</span>
          </Link>
        </div>
        
        <div className="p-6">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-4">Admin Portal</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">{session.user.name}</p>
              <p className="text-xs text-slate-500 mt-1">{session.user.email}</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <Button variant="ghost" className="w-full justify-start text-rose-400 hover:text-rose-300 hover:bg-rose-400/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white dark:bg-slate-900 border-b flex items-center px-4 justify-between sticky top-0 z-10">
          <span className="font-bold text-primary">FlyKart Admin</span>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ChevronLeft className="w-5 h-5" /></Link>
          </Button>
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
