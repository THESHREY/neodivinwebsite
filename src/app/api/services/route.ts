import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const where: any = { active: true };

    if (category) {
      where.category = category;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      ...(limit ? { take: parseInt(limit, 10) } : {}),
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
