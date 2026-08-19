import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We only want to protect /admin/* routes, except the login page itself
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const token = request.cookies.get("fo_admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
      await jwtVerify(token, secret);
      // Valid token, proceed to the requested admin page
      return NextResponse.next();
    } catch {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL("/admin", request.url));
      response.cookies.delete("fo_admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
