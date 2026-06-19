import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Package, Truck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export const dynamicParams = false;

export async function generateStaticParams() {
  const orders = await prisma.order.findMany({ select: { id: true } });
  return orders.map((order) => ({
    id: order.id,
  }));
}

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const order = await prisma.order.findUnique({
    where: { id: params.id, userId: session.user.id },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true }
          }
        }
      },
      statusHistory: { orderBy: { createdAt: "asc" } }
    }
  });

  if (!order) notFound();

  const address = JSON.parse(order.addressSnapshot);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium text-lg">{item.variant.product.name}</span>
                      <span className="text-sm text-muted-foreground">Weight: {item.variant.weightLabel}</span>
                      <span className="text-sm text-muted-foreground mt-1">Qty: {item.quantity} × ₹{item.unitPriceAtPurchase.toString()}</span>
                    </div>
                    <div className="font-bold text-lg">
                      ₹{(item.quantity * Number(item.unitPriceAtPurchase)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-primary/30 ml-4 space-y-8 pb-4">
                {order.statusHistory.map((history: any, i: number) => {
                  let Icon = Clock;
                  if (history.status === "CONFIRMED") Icon = CheckCircle2;
                  if (history.status === "PACKED") Icon = Package;
                  if (history.status === "OUT_FOR_DELIVERY") Icon = Truck;
                  if (history.status === "DELIVERED") Icon = CheckCircle2;

                  return (
                    <div key={history.id} className="relative pl-8">
                      <div className="absolute -left-[17px] bg-background p-1 rounded-full border-2 border-primary text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-base">{history.status.replace(/_/g, " ")}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(history.createdAt).toLocaleString()}
                        </span>
                        {history.note && <p className="text-sm mt-1">{history.note}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{order.subtotal.toString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">₹{order.deliveryFee.toString()}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">₹{order.total.toString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p className="font-semibold">{address.fullName}</p>
              <p>{address.line1}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p className="pt-2"><strong>Phone:</strong> {address.phone}</p>
              <p><strong>Email:</strong> {address.email}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
