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
      title, slug, airline, sector, departureDate, returnDate, 
      price, priceLabel, seatsAvailable, baggageAllowance, 
      imageUrl, isPublished,
    } = body;

    const existing = await prisma.groupFare.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const updated = await prisma.groupFare.update({
      where: { id },
      data: {
        title, slug, airline, sector, departureDate, returnDate, 
        price, priceLabel, seatsAvailable, baggageAllowance, 
        imageUrl, isPublished,
      },
    });

    return Response.json({ groupFare: updated });
  } catch (error) {
    console.error("PUT /api/group-fares/[id] error:", error);
    return Response.json({ error: "Failed to update group fare" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.groupFare.delete({
      where: { id },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/group-fares/[id] error:", error);
    return Response.json({ error: "Failed to delete group fare" }, { status: 500 });
  }
}
