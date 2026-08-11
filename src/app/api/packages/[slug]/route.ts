import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

type Context = { params: Promise<{ slug: string }> };

// GET /api/packages/[slug]
export async function GET(_req: NextRequest, { params }: Context) {
  try {
    const { slug } = await params;
    const pkg = await prisma.package.findUnique({ where: { slug } });
    if (!pkg) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ package: pkg });
  } catch (error) {
    return Response.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

// PUT /api/packages/[slug] — update package
export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const pkg = await prisma.package.update({
      where: { slug },
      data: {
        title: body.title,
        type: body.type,
        durationDays: Number(body.durationDays) || 0,
        price: Number(body.price) || 0,
        priceLabel: body.priceLabel,
        hotelCategory: body.hotelCategory,
        hotelName: body.hotelName || "",
        departureCity: body.departureCity || "",
        tag: body.tag || "",
        imageUrl: body.imageUrl || "",
        inclusions: body.inclusions || "",
        itinerary: body.itinerary || "",
        isPublished: body.isPublished !== false,
      },
    });

    return Response.json({ package: pkg });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update";
    return Response.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/packages/[slug]
export async function DELETE(_req: NextRequest, { params }: Context) {
  try {
    const { slug } = await params;
    await prisma.package.delete({ where: { slug } });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
