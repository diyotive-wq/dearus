import { NextResponse } from "next/server";
import { adminDb, adminStorage } from "@/firebaseAdmin";
import { user } from "@/app/profile/models/user";
import { getAuth } from "firebase-admin/auth";
import { deleteSession } from "@/hooks/deleteSessions";
import { getSession } from "@/hooks/getSessions";

export async function POST(req: Request) {
  try {
    const id = await getSession();

    // Jalankan validasi awal jika ID session kosong
    if (!id || !id.value) {
      return NextResponse.json(
        {
          state: "error",
          errorMessage: "Unauthorized",
          message: "Session not found. Please log in again.",
        },
        { status: 401 }
      );
    }

    // Cek apakah user ada di Firestore
    const snapshot = await adminDb
      .collection("dataUsers")
      .doc(id.value)
      .get();

    if (!snapshot.exists) {
      return NextResponse.json(
        {
          state: "error",
          errorMessage: "Account Doesn't exist",
          message: "This Account doesn't exist",
        },
        { status: 404 }
      );
    }

    const data: user | undefined = snapshot.data();
    const bucket = adminStorage.bucket();

    // 1. Bersihkan Data Undangan Jika Ada
    if (data?.invitation) {
      const invitationUrl = data.invitation.url?.trim();
      const invitationId = data.invitation.id?.trim();

      // ✅ Proteksi Keamanan: Pastikan prefix tidak kosong sebelum menghapus file storage
      if (invitationUrl) {
        await bucket.deleteFiles({
          prefix: invitationUrl,
        });
      }

      // ✅ PERBAIKAN: Ditambahkan .delete() agar data terhapus permanen dari Firestore
      if (invitationId) {
        await adminDb.collection("dataCustomer").doc(invitationId).delete();
      }
    }

    // 2. Hapus dari Firebase Authentication
    await getAuth().deleteUser(id.value);

    // 3. Hapus Data User Utama dari Firestore
    await adminDb.collection("dataUsers").doc(id.value).delete();

    // 4. Hapus Cookie / Session Client
    await deleteSession();

    return NextResponse.json(
      {
        state: "success",
        message: "Delete User successful",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Account Error:", error);

    return NextResponse.json(
      {
        state: "error",
        errorMessage: "Internal Server Error",
        message: error.message || "Please try again later",
      },
      { status: 500 }
    );
  }
}