import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { pageSlug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const page = await prisma.pageContent.findUnique({
      where: { pageSlug: params.pageSlug },
    });
    if (!page) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error) {
    console.error("Fetch page error:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { pageSlug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const page = await prisma.pageContent.upsert({
      where: { pageSlug: params.pageSlug },
      update: {
        title: body.title,
        subtitle: body.subtitle || null,
        content: body.content || "",
        heroImage: body.heroImage || null,
        metaTitle: body.metaTitle || null,
        metaDesc: body.metaDesc || null,
      },
      create: {
        pageSlug: params.pageSlug,
        title: body.title,
        subtitle: body.subtitle || null,
        content: body.content || "",
        heroImage: body.heroImage || null,
        metaTitle: body.metaTitle || null,
        metaDesc: body.metaDesc || null,
      },
    });
    return NextResponse.json(page);
  } catch (error) {
    console.error("Update page error:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}
