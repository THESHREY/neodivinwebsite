import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get("upcoming");
    const limit = searchParams.get("limit");

    const where: any = { active: true };

    if (upcoming === "true") {
      where.upcoming = true;
    } else if (upcoming === "false") {
      where.upcoming = false;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { date: "desc" }],
      ...(limit ? { take: parseInt(limit, 10) } : {}),
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
