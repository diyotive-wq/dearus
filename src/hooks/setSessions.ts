"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./session";

export async function setSession(data: any) {
  const session = await getIronSession<{ value?: string }>(
    await cookies(),
    sessionOptions
  );

  session.value = data;
  await session.save();
}
