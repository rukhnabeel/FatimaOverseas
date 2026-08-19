import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, slug, vehicleType, route, price, priceLabel, 
      capacity, imageUrl, isPublished,
    } = body;

    const existing = await prisma.taxiBooking.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const updated = await prisma.taxiBooking.update({
      where: { id },
      data: {
        title, slug, vehicleType, route, price, priceLabel, 
        capacity, imageUrl, isPublished,
      },
    });

    return Response.json({ taxiBooking: updated });
  } catch (error) {
    console.error("PUT /api/taxi-bookings/[id] error:", error);
    return Response.json({ error: "Failed to update taxi booking" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.taxiBooking.delete({
      where: { id },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/taxi-bookings/[id] error:", error);
    return Response.json({ error: "Failed to delete taxi booking" }, { status: 500 });
  }
}
