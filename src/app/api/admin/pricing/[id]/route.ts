import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const plan = await prisma.pricingPlan.findUnique({
      where: { id: params.id },
    });
    if (!plan) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    console.error("Get pricing plan error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing plan" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const plan = await prisma.pricingPlan.update({
      where: { id: params.id },
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
    return NextResponse.json(plan);
  } catch (error) {
    console.error("Update pricing plan error:", error);
    return NextResponse.json(
      { error: "Failed to update pricing plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.pricingPlan.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete pricing plan error:", error);
    return NextResponse.json(
      { error: "Failed to delete pricing plan" },
      { status: 500 }
    );
  }
}
