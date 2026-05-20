"use client";

import { useEffect, useState } from "react";
import { user } from "./models/user";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<user | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State untuk handle loading logout

  useEffect(() => {
    setState("loading");
    fetch(`/api/get-profile`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  }, []);

  // Fungsi untuk memanggil API Logout
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok && result.state === "success") {
        // Redirect ke login dan refresh halaman agar navbar ter-update
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

  // 2. STATE LOADING (Skeleton Terpisah & Bersih)
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

  // 3. STATE SUCCESS
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-[var(--color-primary-lightest)]/40 flex justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary-light)]/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />

      {/* Main Profile Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--color-primary-light)]/10 border border-gray-100 flex flex-col items-center text-gray-800">
        
        {/* Avatar Area */}
        <div className="w-24 sm:w-26 mb-4">
              <img src="/assets/icons/user.png" alt="" />
            </div>

        {/* Badge User */}
        <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-lightest)] px-3 py-1 rounded-full uppercase mb-6">
          Dear Us Member
        </span>

        {/* Data List Group */}
        <div className="w-full flex flex-col gap-4 border-b border-gray-100 pb-6 mb-6">
          {/* Row Name */}
          <div className="flex justify-between items-center text-sm sm:text-base py-1">
            <span className="font-semibold text-gray-400">Name</span>
            <span className="font-bold text-gray-900 text-right">{data.name || "-"}</span>
          </div>

          {/* Row Birthday */}
          <div className="flex justify-between items-center text-sm sm:text-base py-1">
            <span className="font-semibold text-gray-400">Birthday</span>
            <span className="font-bold text-gray-900 text-right">
              {data.birthdate
                ? format(new Date(data.birthdate), "dd MMMM yyyy", { locale: id })
                : "-"}
            </span>
          </div>

          {/* Row Email */}
          <div className="flex justify-between items-center text-sm sm:text-base py-1">
            <span className="font-semibold text-gray-400">Email</span>
            <span className="font-bold text-gray-900 text-right break-all max-w-[65%]">{data.email || "-"}</span>
          </div>

          {/* Row Phone */}
          <div className="flex justify-between items-center text-sm sm:text-base py-1">
            <span className="font-semibold text-gray-400">Phone</span>
            <span className="font-bold text-gray-900 text-right">{data.phone_number || "-"}</span>
          </div>
        </div>

        {/* SEMUA KOMENTAR TETAP DIPERTAHANKAN SESUAI ASLINYA */}
        {/* <div className="flex w-full justify-center items-center gap-4 text-sm font-semibold text-[var(--color-primary)]">
          <div className="w-full h-0.5 rounded-full bg-[var(--color-primary)]" />
          Invitation
          <div className="w-full h-0.5 rounded-full bg-[var(--color-primary)]" />
        </div>
        <div className="m-2"></div>
        <div className="flex w-full gap-6">
          <div className="text-sm font-semibold text-white bg-green-600 rounded-full p-3 w-full text-center cursor-pointer">
            See Invitation
          </div>
          <div className="font-semibold text-sm text-white bg-[var(--color-primary)] rounded-full p-3 w-full text-center cursor-pointer">
            Delete Invitation
          </div>
        </div>
        <div className="m-3"></div> */}

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button 
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sm sm:text-base font-bold text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary-light)] rounded-2xl py-3 w-full text-center cursor-pointer hover:bg-[var(--color-primary-lightest)]/50 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>

          <button 
            type="button"
            className="text-sm sm:text-base font-medium text-gray-400 hover:text-red-500 bg-transparent py-2 w-full text-center cursor-pointer transition-colors duration-300 focus:outline-none text-xs sm:text-sm"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}