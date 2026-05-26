"use client";

import { useEffect, useState } from "react";
import { user } from "./models/user";
import { format, isSameDay, isBefore } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ConfirmationDialog, {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "@/components/confirmation-dialog-widget/confirmation-dialog";

export default function ProfilePage() {
  const router = useRouter();
  const [state, setState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [data, setData] = useState<user | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // ✅ State loading untuk delete account
  const [confitmationProps, setConfitmationProps] =
    useState<ConfirmationDialogProps | null>(null);

  useEffect(() => {
    setState("loading");
    fetch(`/api/get-profile`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  }, []);

  // Fungsi untuk memanggil API Logout
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setConfitmationProps(null);
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok && result.state === "success") {
        router.push("/login");
        router.refresh();
      } else {
        alert(result.message || "Logout failed. Please try again.");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong. Please try again later.");
      setIsLoggingOut(false);
    }
  };

  // 💡 Fungsi Baru: Handler Eksekusi Delete Account ke API Backend
  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    // 1. Ubah dialog ke state Loading
    setConfitmationProps({
      state: ConfirmationDialogState.isLoading,
    });
    setIsDeleting(true);

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok && result.state === "success") {
        // 2. Tampilkan pesan Success jika response 200
        setConfitmationProps({
          state: ConfirmationDialogState.isSuccess,
          successMessage: "Account Permanently Deleted",
          message: "Your profile, assets, and active invitations have been wiped out.",
          onResultTitle: "Back to Home",
          onResult: () => {
            setConfitmationProps(null);
            router.push("/login");
            router.refresh();
          },
        });
      } else {
        // 3. Tampilkan pesan Error jika server menolak
        setConfitmationProps({
          state: ConfirmationDialogState.isError,
          errorMessage: result.errorMessage || "Deletion Failed",
          message: result.message || "Something went wrong. Please try again later.",
          onResultTitle: "Close",
          onResult: () => setConfitmationProps(null),
          onTapOutSide: () => setConfitmationProps(null),
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Delete account error:", error);
      // 4. Tampilkan pesan Error jika gagal koneksi
      setConfitmationProps({
        state: ConfirmationDialogState.isError,
        errorMessage: "Connection Error",
        message: "Failed to connect to server. Please check your internet connection.",
        onResultTitle: "Close",
        onResult: () => setConfitmationProps(null),
        onTapOutSide: () => setConfitmationProps(null),
      });
      setIsDeleting(false);
    }
  };

  // 💡 Fungsi Helper untuk menghitung status masa aktif undangan
  const getInvitationStatus = (seconds: number) => {
    const eventDate = new Date(seconds * 1000);
    const today = new Date();

    if (isSameDay(eventDate, today)) {
      return {
        label: "Ongoing",
        badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
        indicatorClass: "bg-emerald-500",
      };
    }

    if (isBefore(eventDate, today)) {
      return {
        label: "Expired",
        badgeClass: "bg-gray-50 text-gray-500 border-gray-100",
        indicatorClass: "bg-gray-400",
      };
    }

    return {
      label: "Upcoming",
      badgeClass: "bg-amber-50 text-amber-600 border-amber-100",
      indicatorClass: "bg-amber-500",
    };
  };

  // 1. STATE ERROR
  if (state === "error") {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl shadow-sm font-medium border border-red-100">
          ⚠️ Failed to load data profile. Please try again.
        </div>
      </div>
    );
  }

  // 2. STATE LOADING
  if (state === "loading" || !data) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-[var(--color-primary-lightest)]/30 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--color-primary-light)]/10 border border-gray-100 flex flex-col items-center animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-6" />
          <div className="w-1/2 h-6 bg-gray-200 rounded-lg mb-8" />
          <div className="w-full space-y-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="w-1/4 h-4 bg-gray-200 rounded" />
                <div className="w-1/2 h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="w-full h-11 bg-gray-200 rounded-xl mb-3" />
          <div className="w-full h-11 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const hasInvitation = !!data.invitation && !!data.invitation.date?.seconds;
  const invitationStatus = hasInvitation
    ? getInvitationStatus(data.invitation!.date!.seconds)
    : null;

  // 3. STATE SUCCESS
  return (
    <div>
      {confitmationProps && <ConfirmationDialog {...confitmationProps} />}
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-[var(--color-primary-lightest)]/40 flex justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary-light)]/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />

        {/* Main Profile Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--color-primary-light)]/10 border border-gray-100 flex flex-col items-center text-gray-800">
          {/* Avatar Area */}
          <div className="w-24 h-24 rounded-full overflow-hidden relative mb-4 bg-gray-50 border border-gray-100">
            <Image
              src="/assets/icons/user.png"
              fill
              className="object-cover"
              alt="User Icon"
            />
          </div>

          {/* Badge User */}
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-lightest)] px-3 py-1 rounded-full uppercase mb-6">
            Dear Us Member
          </span>

          {/* Data List Group */}
          <div className="w-full flex flex-col gap-4 border-b border-gray-100 pb-6 mb-6">
            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base py-1">
              <span className="font-semibold text-gray-400">Name</span>
              <span className="font-bold text-gray-900 text-right">
                {data.name || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base py-1">
              <span className="font-semibold text-gray-400">Birthday</span>
              <span className="font-bold text-gray-900 text-right">
                {data.birthdate
                  ? format(new Date(data.birthdate), "dd MMMM yyyy", {
                      locale: id,
                    })
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base py-1">
              <span className="font-semibold text-gray-400">Email</span>
              <span className="font-bold text-gray-900 text-right break-all max-w-[65%]">
                {data.email || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base py-1">
              <span className="font-semibold text-gray-400">Phone</span>
              <span className="font-bold text-gray-900 text-right">
                {data.phone_number || "-"}
              </span>
            </div>
          </div>

          {/* 🌟 WIDGET INFORMASI UNDANGAN DIGITAL BARU */}
          {hasInvitation && data.invitation && invitationStatus && (
            <div className="w-full bg-gray-50/70 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 mb-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-800 tracking-tight">
                  Your Digital Invitation
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1.5 ${invitationStatus.badgeClass}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${invitationStatus.indicatorClass}`}
                  />
                  {invitationStatus.label}
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-white p-3 rounded-xl border border-gray-100/50 shadow-xs">
                <span className="text-[10px] text-gray-400 font-medium">
                  Event Date
                </span>
                <span className="text-xs font-bold text-gray-700">
                  {format(
                    new Date(data.invitation.date!.seconds * 1000),
                    "eeee, dd MMMM yyyy",
                    { locale: id },
                  )}
                </span>
              </div>

              {data.invitation.url && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/${data.invitation?.url}`,
                      "_blank",
                    )
                  }
                  className=" sm:text-base w-full text-center bg-[var(--color-primary-lightest)] text-[var(--color-primary)] hover:text-white text-xs font-bold py-2.5 px-4 hover:bg-[var(--color-primary)] rounded-xl transition-colors duration-300 cursor-pointer border border-[var(--color-primary-light)]/30"
                >
                  View My Invitation ↗
                </button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setConfitmationProps({
                  state: ConfirmationDialogState.isAsking,
                  message: "Are you sure you want to logout from this account?",
                  onConfirm: () => handleLogout(),
                  onCancel: () => setConfitmationProps(null),
                });
              }}
              disabled={isLoggingOut || isDeleting}
              className="text-sm sm:text-base font-bold text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary-light)] rounded-2xl py-3 w-full text-center cursor-pointer hover:bg-[var(--color-primary-lightest)]/50 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            {/* ✅ IMPLEMENTASI: Tombol Delete Account Terintegrasi Dialog Konfirmasi */}
            <button
              type="button"
              disabled={isLoggingOut || isDeleting}
              onClick={() => {
                setConfitmationProps({
                  state: ConfirmationDialogState.isAsking,
                  message: "WARNING: Are you absolutely sure you want to permanently delete your account? This action cannot be undone.",
                  onConfirm: () => handleDeleteAccount(),
                  onCancel: () => setConfitmationProps(null),
                });
              }}
              className="text-sm sm:text-base font-medium text-gray-400 hover:text-red-500 bg-transparent py-2 w-full text-center cursor-pointer transition-colors duration-300 focus:outline-none text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting account..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}