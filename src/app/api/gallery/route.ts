import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true";

    const galleryImages = await prisma.galleryImage.findMany({
      where: all ? undefined : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ galleryImages });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return Response.json({ error: "Failed to fetch gallery images" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, isPublished } = body;

    const newGalleryImage = await prisma.galleryImage.create({
      data: {
        title, imageUrl, isPublished,
      },
    });

    return Response.json({ galleryImage: newGalleryImage });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return Response.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
