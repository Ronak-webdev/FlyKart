import { PrismaClient } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { name: true, email: true }
      },
      items: {
        include: {
          variant: { include: { product: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Orders Fulfillment</h1>
          <p className="text-muted-foreground mt-1">Track, manage, and process customer orders.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-950/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by Order ID, Customer name..." className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white dark:bg-slate-900 text-sm font-semibold">
              Filter by Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-bold tracking-wider">Items / Total</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-bold tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order: any) => {
                const isPending = order.status === 'PENDING';
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-primary">{order.orderNumber}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">via {order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()} <br />
                      <span className="text-xs">{new Date(order.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{order.user?.name || "Guest"}</div>
                      <div className="text-xs text-muted-foreground">{order.user?.email || "No Email"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">₹{Number(order.total).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{order.items.length} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                        order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md shadow-primary/20">
                          <PackageCheck className="w-4 h-4 mr-2" />
                          Fulfill
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="font-semibold">
                          View Details
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
              
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No orders have been placed yet.
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
