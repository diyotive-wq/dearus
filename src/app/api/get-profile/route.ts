import { user } from "@/app/profile/models/user";
import { adminDb } from "@/firebaseAdmin";
import { getSession } from "@/hooks/getSessions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.value) {
      return NextResponse.json(
        {
          state: "error",
          data: "Is Not Authenticated",
        },
        { status: 400 }
      );
    }

    const snapshot = await adminDb
      .collection("dataUsers")
      .doc(session.value)
      .get();
    const result = snapshot.data();

    const data:user = {
        name: result?.name ?? null,
        email: result?.email ?? null,
        phone_number: result?.phone_number ?? null,
        birthdate: result?.birthdate ?? null,
        address: result?.address ?? null
    };

    return NextResponse.json({ state: "success", data: data }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error fetching user:", error);

    return NextResponse.json(
      { message: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
