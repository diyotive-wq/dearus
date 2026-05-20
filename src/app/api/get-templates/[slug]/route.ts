"use server";

import { TemplateDetailModel } from "@/app/invitation-service/models/template-detail-model";
import { adminDb } from "@/firebaseAdmin";
import { Next } from "iconsax-react";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection("dataTemplateDetail").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    const data = docSnap.data() as TemplateDetailModel;

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
