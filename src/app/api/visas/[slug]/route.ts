import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const visa = await prisma.visa.findUnique({
      where: { slug },
    });
    if (!visa) return Response.json({ error: "Visa not found" }, { status: 404 });
    return Response.json({ visa });
  } catch (error) {
    console.error("GET /api/visas/[slug] error:", error);
    return Response.json({ error: "Failed to fetch visa" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    // We omit ID and createdAt to prevent updating them
    const { id, createdAt, ...updateData } = body;

    const updated = await prisma.visa.update({
      where: { slug },
      data: updateData,
    });
    return Response.json({ visa: updated });
  } catch (error) {
    console.error("PUT /api/visas/[slug] error:", error);
    return Response.json({ error: "Failed to update visa" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.visa.delete({
      where: { slug },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/visas/[slug] error:", error);
    return Response.json({ error: "Failed to delete visa" }, { status: 500 });
  }
}
