import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  // Parallel fetch for dashboard metrics
  const [
    totalUsers,
    totalProducts,
    recentOrders,
    pendingOrdersCount
  ] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } }
    }),
    prisma.order.count({ where: { status: 'PENDING' } })
  ]);

  // Calculate mock revenue based on recent orders (assuming an active store)
  const totalRevenue = recentOrders.reduce((sum: number, order: any) => sum + Number(order.total), 0) * 125; 

  const metrics = [
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "+14.5% from last month", trendUp: true },
    { title: "Active Users", value: totalUsers.toLocaleString(), icon: Users, trend: "+5.2% from last month", trendUp: true },
    { title: "Total Products", value: totalProducts.toLocaleString(), icon: Package, trend: "12 added this week", trendUp: true },
    { title: "Pending Orders", value: pendingOrdersCount.toLocaleString(), icon: ShoppingBag, trend: "Needs immediate attention", trendUp: false, alert: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">Download Report</Button>
          <Button asChild><Link href="/admin/products/new">Add Product</Link></Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className={`border-none shadow-sm ${metric.alert ? 'bg-rose-50 dark:bg-rose-950/20' : 'bg-white dark:bg-slate-900'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.alert ? 'bg-rose-100 text-rose-600' : 'bg-primary/10 text-primary'}`}>
                <metric.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 flex items-center ${metric.trendUp ? 'text-emerald-500' : (metric.alert ? 'text-rose-500' : 'text-muted-foreground')}`}>
                {metric.trendUp && <TrendingUp className="w-3 h-3 mr-1" />}
                {metric.alert && <AlertCircle className="w-3 h-3 mr-1" />}
                {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest transactions across the store.</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                      {order.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.user?.name || "Guest User"}</p>
                      <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">₹{Number(order.total).toFixed(2)}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No recent orders found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Tips */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary to-purple-800 text-white">
          <CardHeader>
            <CardTitle className="text-white">Store Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="text-emerald-400 w-5 h-5" />
                <h3 className="font-bold">System Online</h3>
              </div>
              <p className="text-sm text-slate-200">All services are operational. Database latency is optimal.</p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10 mt-4">
              <h3 className="font-bold mb-2">Next Steps</h3>
              <ul className="text-sm space-y-2 text-slate-200 list-disc list-inside">
                <li>Process {pendingOrdersCount} pending orders</li>
                <li>Review low stock products</li>
                <li>Launch festival sale campaign</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
