import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, imageUrl, isPublished } = body;

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        title, imageUrl, isPublished,
      },
    });

    return Response.json({ galleryImage: updated });
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
    return Response.json({ error: "Failed to update gallery image" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryImage.delete({
      where: { id },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return Response.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
