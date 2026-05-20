import { deleteSession } from "@/hooks/deleteSessions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    await deleteSession();

    return NextResponse.json(
      {
        state: "success",
        message: "Logout successful",
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
