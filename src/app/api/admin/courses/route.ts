import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const courses = await prisma.course.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Fetch courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
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
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const course = await prisma.course.create({
      data: {
        title: body.title,
        slug,
        description: body.description || "",
        duration: body.duration || null,
        level: body.level || null,
        price: body.price != null ? parseFloat(body.price) : null,
        image: body.image || null,
        syllabus: body.syllabus || null,
        featured: body.featured || false,
        active: body.active !== false,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    console.error("Create course error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A course with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
