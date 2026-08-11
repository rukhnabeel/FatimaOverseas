import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all") === "true";

    const visas = await prisma.visa.findMany({
      where: all ? undefined : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ visas });
  } catch (error) {
    console.error("GET /api/visas error:", error);
    return Response.json({ error: "Failed to fetch visas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, slug, country, price, priceLabel, processingTime,
      validity, documentsRequired, imageUrl, isPublished,
    } = body;

    const existing = await prisma.visa.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newVisa = await prisma.visa.create({
      data: {
        title, slug, country, price, priceLabel, processingTime,
        validity, documentsRequired, imageUrl, isPublished,
      },
    });

    return Response.json({ visa: newVisa });
  } catch (error) {
    console.error("POST /api/visas error:", error);
    return Response.json({ error: "Failed to create visa" }, { status: 500 });
  }
}
