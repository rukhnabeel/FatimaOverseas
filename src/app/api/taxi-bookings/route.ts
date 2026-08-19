import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true";

    const taxiBookings = await prisma.taxiBooking.findMany({
      where: all ? undefined : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ taxiBookings });
  } catch (error) {
    console.error("GET /api/taxi-bookings error:", error);
    return Response.json({ error: "Failed to fetch taxi bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, slug, vehicleType, route, price, priceLabel, 
      capacity, imageUrl, isPublished,
    } = body;

    const existing = await prisma.taxiBooking.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newTaxiBooking = await prisma.taxiBooking.create({
      data: {
        title, slug, vehicleType, route, price, priceLabel, 
        capacity, imageUrl, isPublished,
      },
    });

    return Response.json({ taxiBooking: newTaxiBooking });
  } catch (error) {
    console.error("POST /api/taxi-bookings error:", error);
    return Response.json({ error: "Failed to create taxi booking" }, { status: 500 });
  }
}
