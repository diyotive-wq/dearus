"use client";

import FormField from "@/components/form/components/page";
import { FormType } from "@/components/form/models/formtype";
import { Dancing_Script } from "next/font/google";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ConfirmationDialog, {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "@/components/confirmation-dialog-widget/confirmation-dialog";
import getClientSession from "@/hooks/getClientSession";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function LoginPage() {
  const { handleSubmit, control, formState: { isValid } } = useForm({ mode: "onChange" });
  const router = useRouter();

  const [confirmationProps, setConfirmationProps] =
    useState<ConfirmationDialogProps | null>(null);

  const onSubmit = async (data: any) => {
    setConfirmationProps({
      state: ConfirmationDialogState.isLoading,
      message: "Please Wait...",
      onTapOutSide: () => setConfirmationProps(null),
    });

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || result.state === "error") {
        setConfirmationProps({
          state: ConfirmationDialogState.isError,
          errorMessage: result.errorMessage ?? "Error",
          message: result.message ?? "Something went wrong",
          onTapOutSide: () => setConfirmationProps(null),
        });
        return;
      }

      setConfirmationProps({
        state: ConfirmationDialogState.isSuccess,
        message: result.message ?? "Login successful",
        onTapOutSide: () => {
          setConfirmationProps(null);
          router.push("/profile");
        },
      });
    } catch (err) {
      console.error(err);

      setConfirmationProps({
        state: ConfirmationDialogState.isError,
        errorMessage: "Internal Server Error",
        message: "Please try again later",
        onTapOutSide: () => setConfirmationProps(null),
      });
    }
  };

  useEffect(() => {
    getClientSession().then((isAuthenticated) => {
      if (isAuthenticated) {
        router.push("/profile");
      }
    });
  }, [router]);

  return (
    <>
      {confirmationProps && <ConfirmationDialog {...confirmationProps} />}

      <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[var(--color-primary-lightest)]/60 via-[var(--color-primary-lightest)] to-white justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* Dekorasi lingkaran background abstrak halus */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-primary-light)]/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />

        <div className="w-full max-w-md flex flex-col items-center">
          {/* Judul Sambutan Utama */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className={`${dancing.className} text-[var(--color-primary)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-sm`}>
              Hello, Welcome Back
            </h1>
            <div className="w-12 h-0.5 bg-[var(--color-primary)] rounded-full mx-auto opacity-40 mt-2"></div>
          </div>

          {/* Kotak Form Login Premium */}
          <div className="bg-white px-6 py-8 sm:p-10 w-full rounded-3xl shadow-xl shadow-[var(--color-primary-light)]/10 border border-gray-100 flex flex-col items-center text-gray-800">
            <h2 className="font-extrabold text-xl sm:text-2xl tracking-tight text-center text-gray-900">
              Login to Your Account
            </h2>
            <p className="font-normal text-xs sm:text-sm text-gray-400 mt-1.5 mb-8 text-center">
              Please insert your registered email and password
            </p>

            <form
              className="w-full flex flex-col"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
            >
              <div className="flex flex-col gap-4 w-full">
                <FormField
                  name="email"
                  title="Email Address"
                  formType={FormType.Email}
                  control={control}
                />
                <FormField
                  name="password"
                  title="Password"
                  formType={FormType.Password}
                  control={control}
                />
              </div>

              {/* Tombol Login Beranimasi */}
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white font-semibold py-3 px-4 rounded-2xl mt-8 w-full text-sm sm:text-base tracking-wide shadow-md shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-light)] hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none"
              >
                Sign In
              </button>
            </form>

            {/* Navigasi Registrasi Alternatif */}
            <div className="mt-6 flex flex-row gap-1 items-center text-xs sm:text-sm">
              <span className="text-gray-400 font-normal">Don't have an account?</span>
              <button
                onClick={() => router.push("/register")}
                className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors focus:outline-none cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}