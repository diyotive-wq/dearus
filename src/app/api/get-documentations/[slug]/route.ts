"use server";

import { DocumentationModel } from "@/app/documentation-service/models/documentation-models";
import { adminDb } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {

    const { slug } = await params;

    if (!slug)
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 }
      );

    const docRef = adminDb.collection("dataDocumentation").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    const data = docSnap.data() as DocumentationModel;

    return NextResponse.json(
      {
        data,
        message: "Template fetched successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
