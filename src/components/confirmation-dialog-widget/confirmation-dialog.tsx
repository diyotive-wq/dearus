"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineWarning } from "react-icons/ai";

export type ConfirmationDialogProps = {
  state: ConfirmationDialogState;
  message?: string | null;
  successMessage?: string | null;
  errorMessage?: string | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  onTapOutSide?: () => void;
  onResult?: () => void;
  onResultTitle?: string;
};

export enum ConfirmationDialogState {
  isLoading,
  isSuccess,
  isError,
  isAsking,
}

export default function ConfirmationDialog({
  state,
  message,
  onConfirm,
  successMessage,
  errorMessage,
  onCancel,
  onResult,
  onTapOutSide,
  onResultTitle,
}: ConfirmationDialogProps) {


  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Overlay Background dengan Backdrop Blur Premium */}
      <div
        className="fixed inset-0 w-full h-screen bg-black/60 backdrop-blur-sm z-[200] flex justify-center items-center p-4 transition-all duration-300"
        onClick={onTapOutSide}
      >
        {/* Bodi Modal Dialog - rounded-3xl dan shadow tebal */}
        <div
          className={`flex flex-col w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 transform transition-transform duration-300 scale-100 ${
            state === ConfirmationDialogState.isAsking
              ? "justify-between"
              : "justify-center"
          } items-center text-center`}
          onClick={(e) => e.stopPropagation()} // 💡 Mencegah modal tertutup kalau area putih diklik
        >
          
          {/* 1. STATE LOADING */}
          {state === ConfirmationDialogState.isLoading ? (
            <div className="flex flex-col items-center py-6">
              <div className="w-36 aspect-[16/4.5] relative animate-[blink_1s_infinite] mb-6">
                <Image src="/assets/icons/logo.png" fill className="object-contain" alt="Logo" />
              </div>
              <div className="text-base sm:text-lg font-bold tracking-wide animate-[blink_1s_infinite] text-[var(--color-primary)]">
                Please Wait...
              </div>
            </div>
          ) : 

          /* 2. STATE ASKING (KONFIRMASI WARNING) */
          state === ConfirmationDialogState.isAsking ? (
            <>
              {/* Ikon Warning Interaktif */}
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500 text-2xl">
                <AiOutlineWarning />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Confirmation
              </h1>
              <p className="text-xs sm:text-sm font-normal text-gray-500 mt-3 max-w-xs leading-relaxed">
                {message ?? "Are you sure want to input this data?"}
              </p>
              <div className="flex w-full flex-row gap-3 mt-8 justify-between">
                <button
                  type="button"
                  className="rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-bold p-3 w-full cursor-pointer text-sm transition-all text-gray-500 focus:outline-none"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-2xl text-white font-bold p-3 w-full cursor-pointer text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] shadow-md shadow-[var(--color-primary)]/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
                  onClick={onConfirm}
                >
                  Yes, Confirm
                </button>
              </div>
            </>
          ) : 

          /* 3. STATE RESULT (SUCCESS / ERROR) */
          (
            <>
              <div className="mb-4">
                {state === ConfirmationDialogState.isSuccess ? (
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-4xl shadow-sm">
                    <AiOutlineCheckCircle />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-4xl shadow-sm">
                    <AiOutlineCloseCircle />
                  </div>
                )}
              </div>
              
              <h1
                className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  state === ConfirmationDialogState.isSuccess
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {state === ConfirmationDialogState.isSuccess
                  ? successMessage ?? "Success"
                  : errorMessage ?? "Failed"}
              </h1>
              
              <p className="text-xs sm:text-sm font-normal text-gray-400 mt-2 max-w-xs leading-relaxed">
                {message}
              </p>

              {onResult && (
                <button
                  type="button"
                  className="mt-6 rounded-2xl text-white py-3 px-6 w-full cursor-pointer font-bold text-sm tracking-wide bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark,rgb(219,39,119))] shadow-md transition-all duration-300 focus:outline-none"
                  onClick={onResult}
                >
                  {onResultTitle ?? "Click Here"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}