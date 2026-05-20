"use server";

import { DocumentationModel } from "@/app/documentation-service/models/documentation-models";
import { adminDb } from "@/firebaseAdmin";
import { Message } from "iconsax-react";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("dataDocumentation")
      .orderBy("date", "asc")
      .get();

    const result: DocumentationModel[] = snapshot.docs.map((snap) => {
      const data = snap.data();

      return {
        id: snap.id,
        male_bride: data?.male_bride ?? "",
        female_bride: data?.female_bride ?? "",
        thumbnail_url: data?.thumbnail_url ?? "",
        video_url: data?.video_url ?? "",
        photo_gallery: Array.isArray(data?.photo_gallery)
          ? data.photo_gallery
          : [],
      };
    });

    return NextResponse.json({data: result, message: "Success to fetch Data"}, { status: 200 });


  } catch (error) {
    console.error("🔥 Error fetching templates:", error);
    return NextResponse.json(
      { message: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
