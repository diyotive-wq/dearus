"use client";

import { Couples } from "@/app/[slug]/models/couples";
import FormField from "@/components/form/components/page";
import { FormType } from "@/components/form/models/formtype";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmationDialog, {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "@/components/confirmation-dialog-widget/confirmation-dialog";

type Props = {
  data?: Couples | null;
};

export default function UrlInputBox({ data }: Props) {
  const [showBox, setShowBox] = useState(true);
  
  // ✅ State untuk mengontrol ConfirmationDialog
  const [confirmationProps, setConfirmationProps] =
    useState<ConfirmationDialogProps | null>(null);

  // ✅ Setup react-hook-form
  const {
    handleSubmit,
    control,
    watch,
  } = useForm<{ url_name: string }>({
    defaultValues: { url_name: "" }
  });

  const url_name = watch("url_name");
  const primaryColor = data?.color?.primary ?? "var(--color-primary)";

  const uploadData = async (formData: { url_name: string }) => {
    // 1. Tampilkan Loading
    setConfirmationProps({
      state: ConfirmationDialogState.isLoading,
    });

    try {
      const res = await fetch("/api/create-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, data }),
      });

      const result = await res.json();

      if (res.status === 200) {
        // 2. Tampilkan Success
        setConfirmationProps({
          state: ConfirmationDialogState.isSuccess,
          successMessage: "Invitation Created Successfully!",
          message: `Your link: ${window.location.origin}/${formData.url_name}`,
          onResultTitle: "Open Invitation ↗",
          onResult: () => {
            window.open(`${window.location.origin}/${formData.url_name}`, "_blank");
            setConfirmationProps(null);
          },
          onTapOutSide: () => setConfirmationProps(null),
        });
      } else {
        // 3. Tampilkan Error dari Server
        setConfirmationProps({
          state: ConfirmationDialogState.isError,
          errorMessage: "Oops! Something went wrong",
          message: result.message || "Unable to create invitation. Please try again.",
          onResultTitle: "Try Again",
          onResult: () => setConfirmationProps(null),
          onTapOutSide: () => setConfirmationProps(null),
        });
      }
    } catch (error) {
      // 4. Tampilkan Error Koneksi
      setConfirmationProps({
        state: ConfirmationDialogState.isError,
        errorMessage: "Connection Error",
        message: "Please check your internet connection.",
        onTapOutSide: () => setConfirmationProps(null),
      });
    }
  };

  const onSubmit = (formData: { url_name: string }) => {
    if (!formData.url_name?.trim()) return;

    // Tampilkan Dialog Konfirmasi (Asking)
    setConfirmationProps({
      state: ConfirmationDialogState.isAsking,
      message: `Do you confirm using "${window.location.origin}/${formData.url_name}" as your engagement invitation URL?`,
      onConfirm: () => uploadData(formData),
      onCancel: () => setConfirmationProps(null),
    });
  };

  return (
    <>
      {/* ✅ Modal Global Komponen */}
      {confirmationProps && <ConfirmationDialog {...confirmationProps} />}

      {/* ✅ Floating Box Widget */}
      <div className="fixed w-full max-w-3/4 sm:max-w-sm z-80 bottom-4 right-4 flex flex-col items-end">
        {showBox ? (
          <div className="w-full bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                Create Live Link
              </h3>
              <button 
                onClick={() => setShowBox(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative group">
                <FormField
                  name="url_name"
                  control={control as any}
                  formType={FormType.TextField}
                  rules={{
                    required: "URL is required",
                    validate: (value: string) => {
                      if (/\s/.test(value)) return "No spaces allowed";
                      return true;
                    },
                  }}
                  placeholder="e.g. bima-salsa"
                  hintText={`Preview: ${window.location.origin}/${url_name || '...'}`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl text-white font-bold text-sm tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{
                  background: primaryColor,
                  boxShadow: `0 8px 20px -6px ${primaryColor}66`
                }}
              >
                Launch Invitation 🚀
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowBox(true)}
            className="flex items-center gap-2 py-3 px-6 rounded-full text-white font-bold shadow-xl transition-all transform hover:scale-105 active:scale-95"
            style={{ background: primaryColor }}
          >
            <span className="text-lg">✨</span>
            <span className="text-sm">Create Link</span>
          </button>
        )}
      </div>
    </>
  );
}