import { cookies } from "next/headers";

// POST /api/auth/logout
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("fo_admin_token");
  return Response.json({ success: true });
}
