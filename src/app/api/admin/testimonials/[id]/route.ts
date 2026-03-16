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
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });
    if (!testimonial) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Get testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
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
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name: body.name,
        location: body.location || null,
        rating: parseInt(body.rating) || 5,
        text: body.text,
        image: body.image || null,
        videoUrl: body.videoUrl || null,
        featured: body.featured || false,
        active: body.active !== false,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Update testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Patch testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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
    await prisma.testimonial.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
