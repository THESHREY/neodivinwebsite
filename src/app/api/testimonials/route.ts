import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const where: any = { active: true };

    if (featured === "true") {
      where.featured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      ...(limit ? { take: parseInt(limit, 10) } : {}),
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json(
      []);
  }
}
