"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";

export async function deleteSession() {
  const cookieStore = await cookies();
  
  // Ambil instance session yang aktif
  const session = await getIronSession<any>(cookieStore, sessionOptions);

  // Hapus data session dari memory dan cookie
  session.destroy();

  return { success: true, message: "Session deleted successfully" };
}