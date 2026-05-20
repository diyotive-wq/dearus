"use server";

import { adminDb, adminStorage } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, formData } = body;

    // ✅ Cek URL duplikat
    const snapshot = await adminDb
      .collection("dataCustomer")
      .where("url_name", "==", formData.url_name)
      .get();

    if (!snapshot.empty) {
      return NextResponse.json(
        { message: "Url Already Exists" },
        { status: 400 }
      );
    }

    // ✅ Helper Upload ke Firebase Storage (PUBLIC)
    const uploadBase64ToFirebaseStorage = async (dataURL: string, path: string) => {
      if (!dataURL) return "";

      const mimeMatch = dataURL.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
      const mime = mimeMatch?.[1] ?? "image/jpeg";
      const base64Data = dataURL.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      const bucket = adminStorage.bucket();
      const file = bucket.file(path);

      // ✅ Simpan file dan buat public
      await file.save(buffer, {
        contentType: mime,
        public: true,
      });

      // ✅ Return URL PUBLIC (tanpa token)
      return `https://storage.googleapis.com/${bucket.name}/${path}`;
    };

    // =============================
    // ✅ UPLOAD IMAGES (HEADER + GALLERY)
    // =============================

    const urlHeader = await uploadBase64ToFirebaseStorage(
      data?.header_image ?? "",
      `${formData.url_name}/header.jpeg`
    );

    const urlHeaderPotrait = await uploadBase64ToFirebaseStorage(
      data?.header_image_potrait ?? "",
      `${formData.url_name}/header_potrait.jpeg`
    );

    const urlGalleryList = await Promise.all(
      (data?.gallery_image ?? []).map((img: string, idx: number) =>
        uploadBase64ToFirebaseStorage(
          img,
          `${formData.url_name}/gallery_${idx + 1}.jpeg`
        )
      )
    );

    // =============================
    // ✅ SAVE DATA KE FIRESTORE
    // =============================
    const newId = adminDb.collection("dataCustomer").doc().id;

    const newData = {
      ...data,
      header_image: urlHeader,
      header_image_potrait: urlHeaderPotrait,
      gallery_image: urlGalleryList.filter(Boolean),
      url_name: formData.url_name,
      id: newId,
    };

    await adminDb.collection("dataCustomer").doc(newId).set(newData);

    return NextResponse.json(
      { message: "Upload success", id: newId, data: newData },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Upload error:", error);
    return NextResponse.json(
      { message: `Error uploading data: ${error}` },
      { status: 500 }
    );
  }
}
