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
    const plans = await prisma.pricingPlan.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Fetch pricing plans error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing plans" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const plan = await prisma.pricingPlan.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: parseFloat(body.price) || 0,
        duration: body.duration || null,
        features: body.features || "",
        popular: body.popular || false,
        active: body.active !== false,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Create pricing plan error:", error);
    return NextResponse.json(
      { error: "Failed to create pricing plan" },
      { status: 500 }
    );
  }
}
