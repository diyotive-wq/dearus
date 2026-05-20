import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<{ value?: string }>(
    cookieStore,
    sessionOptions
  );
  return session;
}
