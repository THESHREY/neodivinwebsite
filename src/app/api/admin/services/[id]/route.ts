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
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });
    if (!service) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error("Get service error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
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
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || "",
        icon: body.icon || null,
        category: body.category || null,
        active: body.active !== false,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(service);
  } catch (error: any) {
    console.error("Update service error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A service with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update service" },
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
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
