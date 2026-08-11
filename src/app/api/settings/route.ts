import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// GET /api/settings
export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({ data: {} });
    }
    return Response.json({ settings });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return Response.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT /api/settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    let settings = await prisma.settings.findFirst();

    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          whatsappNumber: body.whatsappNumber ?? settings.whatsappNumber,
          phoneNumber: body.phoneNumber ?? settings.phoneNumber,
          email: body.email ?? settings.email,
          address: body.address ?? settings.address,
          agencyName: body.agencyName ?? settings.agencyName,
          foundedYear: body.foundedYear ?? settings.foundedYear,
          licenseNumber: body.licenseNumber ?? settings.licenseNumber,
          facebookUrl: body.facebookUrl ?? settings.facebookUrl,
          instagramUrl: body.instagramUrl ?? settings.instagramUrl,
          youtubeUrl: body.youtubeUrl ?? settings.youtubeUrl,
        },
      });
    } else {
      settings = await prisma.settings.create({ data: body });
    }

    return Response.json({ settings });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return Response.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
