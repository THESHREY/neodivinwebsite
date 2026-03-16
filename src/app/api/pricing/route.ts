import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error("Fetch pricing plans error:", error);
    return NextResponse.json(
      []);
  }
}
