import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import { InvitationTemplateModel } from "@/app/invitation-service/models/invitation-template-model";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("dataTemplate")
      .orderBy("date", "asc")
      .get();

    const result: InvitationTemplateModel[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id ?? null,
        title: data?.title ?? null,
        image_url: data?.image_url ?? null,
        color: data?.color ?? null,
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
