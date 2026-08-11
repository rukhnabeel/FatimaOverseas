import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// GET /api/packages — return all published packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true"; // admin passes ?all=true to get drafts too

    const packages = await prisma.package.findMany({
      where: all ? undefined : { isPublished: true },
      orderBy: { createdAt: "asc" },
    });

    return Response.json({ packages });
  } catch (error) {
    console.error("GET /api/packages error:", error);
    return Response.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// POST /api/packages — create a new package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, slug, type, durationDays, price, priceLabel,
      hotelCategory, hotelName, departureCity, tag, imageUrl,
      inclusions, itinerary, isPublished,
    } = body;

    if (!title || !slug || !type || !priceLabel) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pkg = await prisma.package.create({
      data: {
        title, slug, type,
        durationDays: Number(durationDays) || 0,
        price: Number(price) || 0,
        priceLabel,
        hotelCategory: hotelCategory || "4★",
        hotelName: hotelName || "",
        departureCity: departureCity || "",
        tag: tag || "",
        imageUrl: imageUrl || "",
        inclusions: inclusions || "",
        itinerary: itinerary || "",
        isPublished: isPublished !== false,
      },
    });

    return Response.json({ package: pkg }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create package";
    if (msg.includes("Unique constraint")) {
      return Response.json({ error: "A package with this slug already exists" }, { status: 409 });
    }
    console.error("POST /api/packages error:", error);
    return Response.json({ error: msg }, { status: 500 });
  }
}
