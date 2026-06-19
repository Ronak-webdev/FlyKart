"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function placeOrder(addressData: any, orderData: any) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: "PENDING",
        paymentMethod: orderData.paymentMethod,
        paymentStatus: "PENDING",
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
        addressSnapshot: JSON.stringify(addressData),
        items: {
          create: orderData.items.map((item: any) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            unitPriceAtPurchase: item.unitPriceAtPurchase,
          })),
        },
        statusHistory: {
          create: {
            status: "PENDING",
            note: "Order placed successfully.",
          },
        },
      },
    });

    // Reduce stock quantities
    for (const item of orderData.items) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stockQty: { decrement: item.quantity } },
      });
    }

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order placement error:", error);
    return { success: false, error: "Failed to process order." };
  }
}
