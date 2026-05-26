"use client";

import { Color } from "@/app/[slug]/models/couples";
import { useEffect, useState } from "react";
import FormField from "../form/components/page";
import { FormType } from "../form/models/formtype";
import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import getClientSession from "@/hooks/getClientSession";
import {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "../confirmation-dialog-widget/confirmation-dialog";

export default function ColorSelectionBoxWidget({
  data,
  onChange,
  onCheckAuthentication,
}: {
  data: Color[];
  onChange?: (value: Color) => void;
  onCheckAuthentication?: (value: ConfirmationDialogProps | null) => void;
}) {
  const [showBox, setShowBox] = useState(true);
  const [checking, setChecking] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { setValue, control, watch } = useFormContext();

  useEffect(() => {
    if (data?.length > 0) {
      setValue("color", data[0], { shouldValidate: true });
    }
  }, [data, setValue]);

  const selectedColor = watch("color");

  useEffect(() => {
    if (selectedColor && onChange) {
      onChange(selectedColor);
    }
  }, [selectedColor, onChange]);

  const handleSelectTemplate = async () => {
    if (checking) return;
    
    const isAuthenticated = await getClientSession();
    
    if (!isAuthenticated) {
      onCheckAuthentication?.({
        state: ConfirmationDialogState.isAsking,
        message: "In order to create this invitation template, you need to login first.",
        onConfirm: () => router.push("/login"),
        onCancel: () => onCheckAuthentication?.(null),
      });
      return;
    }

    setChecking(true);
    try {
      const res = await fetch("/api/get-profile");
      const result = await res.json();

      if (res.ok && result.data?.invitation) {
        onCheckAuthentication?.({
          state: ConfirmationDialogState.isError,
          errorMessage: "Invitation Already Exists",
          message: "You have already created a digital invitation using this account.",
          onResultTitle: "Got It",
          onResult: () => onCheckAuthentication?.(null),
          onTapOutSide: () => onCheckAuthentication?.(null),
        });
      } else {
        window.open(`${pathname}/form-template`, "_blank");
      }
    } catch (error) {
      console.error("Failed to verify user status:", error);
      alert("Something went wrong while validating your profile. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    // ✅ Mengurangi lebar maksimal agar proporsional di mobile layar kecil
    <div className="fixed w-full max-w-3/4 sm:max-w-sm z-80 bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end select-none">
      {showBox ? (
        // ✅ Padding dikurangi menjadi p-4 pada mobile (sm:p-6) agar menghemat ruang vertikal
        <div className="w-full bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider">
              Customize Palette
            </h3>
            <button
              onClick={() => setShowBox(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xs p-1 focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Form Field Color Selection Container */}
          <div className="bg-gray-50/50 p-2 rounded-xl sm:rounded-2xl border border-gray-100/50 mb-4 overflow-hidden">
            <FormField
              control={control}
              name="color"
              fullWidth={true}
              formType={FormType.ColorSelection}
              title="Available Themes"
              itemsColor={data}
            />
          </div>

          {/* ✅ Struktur Tombol menggunakan Flexbox adaptif (w-full tanpa pembagian statis) */}
          <div className="flex flex-row gap-2 w-full text-xs sm:text-sm">
            <button
              type="button"
              className="flex-1 rounded-xl bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-bold py-2.5 px-2 text-center text-gray-400 transition-colors focus:outline-none cursor-pointer text-xs"
              onClick={() => setShowBox(false)}
            >
              Hide
            </button>

            <button
              type="button"
              disabled={checking}
              className="flex-2 min-w-[70px] rounded-xl text-white font-bold py-2.5 px-3 text-center tracking-wide bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark,rgb(219,39,119))] shadow-md shadow-[var(--color-primary)]/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed text-xs focus:outline-none cursor-pointer whitespace-nowrap"
              onClick={handleSelectTemplate}
            >
              {checking ? "Checking..." : "Select Template"}
            </button>
          </div>
        </div>
      ) : (
        /* Floating Action Button (FAB) Kapsul Minimalis */
        <button
          type="button"
          className="flex items-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-full text-white font-bold shadow-xl transition-all transform hover:scale-105 active:scale-95 bg-[var(--color-primary)] cursor-pointer text-xs sm:text-sm"
          onClick={() => setShowBox(true)}
        >
          <span>🎨</span>
          <span>Themes</span>
        </button>
      )}
    </div>
  );
}