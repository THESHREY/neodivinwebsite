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
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });
    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error("Get event error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
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
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug,
        description: body.description || "",
        date: body.date,
        time: body.time || null,
        location: body.location || null,
        image: body.image || null,
        category: body.category || null,
        featured: body.featured || false,
        upcoming: body.upcoming || false,
        active: body.active !== false,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(event);
  } catch (error: any) {
    console.error("Update event error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An event with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update event" },
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
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
