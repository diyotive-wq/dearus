import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import { setSession } from "@/hooks/setSessions";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        {
          state: "error",
          errorMessage: "Missing email or password",
          message: "Please input both email and password",
        },
        { status: 400 }
      );
    }

    // Cek apakah user ada di Firestore
    const snapshot = await adminDb
      .collection("dataUsers")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        {
          state: "error",
          errorMessage: "Email Not Found",
          message:
            "Email is not registered. If you don’t have an account, please register.",
        },
        { status: 404 }
      );
    }

    // LOGIN SERVER-SIDE VIA FIREBASE AUTH REST API
    const firebaseAPIKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const loginRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      return NextResponse.json(
        {
          state: "error",
          errorMessage: "Incorrect Password",
          message: "Please input the correct password.",
        },
        { status: 401 }
      );
    }

    // Jika login sukses → buat session
    const userId = snapshot.docs[0].id;

    await setSession(userId);

    return NextResponse.json(
      {
        state: "success",
        message: "Login successful",
        userId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        state: "error",
        errorMessage: "Internal Server Error",
        message: "Please try again later",
      },
      { status: 500 }
    );
  }
}
