import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true";

    const groupFares = await prisma.groupFare.findMany({
      where: all ? undefined : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ groupFares });
  } catch (error) {
    console.error("GET /api/group-fares error:", error);
    return Response.json({ error: "Failed to fetch group fares" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, slug, airline, sector, departureDate, returnDate, 
      price, priceLabel, seatsAvailable, baggageAllowance, 
      imageUrl, isPublished,
    } = body;

    const existing = await prisma.groupFare.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newGroupFare = await prisma.groupFare.create({
      data: {
        title, slug, airline, sector, departureDate, returnDate, 
        price, priceLabel, seatsAvailable, baggageAllowance, 
        imageUrl, isPublished,
      },
    });

    return Response.json({ groupFare: newGroupFare });
  } catch (error) {
    console.error("POST /api/group-fares error:", error);
    return Response.json({ error: "Failed to create group fare" }, { status: 500 });
  }
}
