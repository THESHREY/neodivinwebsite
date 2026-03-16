import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      revenueResult,
      unreadMessages,
      totalTestimonials,
      recentOrders,
      recentMessages,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.testimonial.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: true },
          },
        },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      activeProducts,
      totalOrders,
      totalRevenue: revenueResult._sum.total || 0,
      unreadMessages,
      totalTestimonials,
      recentOrders,
      recentMessages,
    });
  } catch (error) {
    console.error("Fetch stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
