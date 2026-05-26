import { adminDb, adminStorage } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const emailCheck = await adminDb
      .collection("dataUsers")
      .where("email", "==", data.email)
      .get();

    const PhoneCheck = await adminDb
      .collection("dataUsers")
      .where("phone_number", "==", data.phone_number)
      .get();

    if (!emailCheck.empty || !PhoneCheck.empty) {
      return NextResponse.json(
        {
          message: !emailCheck.empty
            ? "Email Already Exists"
            : "Phone Number Already Exists",
        },
        { status: 400 }
      );
    }

    await getAuth().getUserByEmail(data.email);

    await getAuth().createUser({
      email: data.email,
      password: data.password,
    });

    const doc = await adminDb.collection("dataUsers").doc();

    delete data.password;

    await doc.set({
      id: doc.id,
      ...data,
    });

    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 201 }
    );

    
  } catch (error: any) {

    console.log(error);

    const errorMessage = error.code === "auth/invalid-password"
      ? "The password is too weak."
      : error.code === "auth/email-already-exists"
      ? "The email already in use"
      : "something went wrong";

    const errorCode = error.code === "auth/invalid-password" ? 401 : error.code === "auth/email-already-exists" ? 402 : 500;

    return NextResponse.json(
      { message: errorMessage, },
      { status: errorCode }
    );
  }
}
