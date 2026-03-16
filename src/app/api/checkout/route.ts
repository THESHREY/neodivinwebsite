import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = body;

    if (!customerName || !customerEmail || !shippingAddress) {
      return NextResponse.json(
        { error: "Customer name, email, and shipping address are required" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required" },
        { status: 400 }
      );
    }

    // Fetch all products for the order items
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products not found or inactive" },
        { status: 400 }
      );
    }

    // Build a lookup map for prices
    const productMap = new Map(products.map((p) => [p.id, p]));

    // Calculate total
    let total = 0;
    const orderItems = items.map((item: any) => {
      const product = productMap.get(item.productId)!;
      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // Create order with items in a transaction
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        shippingAddress,
        total,
        status: "pending",
        paymentStatus: "pending",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // TODO: Stripe integration - create payment intent here

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
