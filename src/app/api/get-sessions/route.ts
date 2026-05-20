import { NextResponse } from "next/server";
import { getSession } from "@/hooks/getSessions";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json(
      {
        state: "success",
        data: Boolean(session?.value),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Error fetching session:", error);

    return NextResponse.json(
      { message: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
