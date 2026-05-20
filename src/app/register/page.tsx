"use client";

import FormField from "@/components/form/components/page";
import { FormType } from "@/components/form/models/formtype";
import { Dancing_Script } from "next/font/google";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { get } from "http";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import app from "@/firebaseConfig";
import Alert from "@/components/alert-widget/alert";
import { useState } from "react";
import ConfirmationDialog, {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "@/components/confirmation-dialog-widget/confirmation-dialog";
import { set } from "date-fns";
import { se } from "date-fns/locale";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function RegisterPage() {
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange", // ✅ validasi langsung saat mengetik
  });

  const [confitmationProps, setConfitmationProps] =
    useState<ConfirmationDialogProps | null>(null);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    setConfitmationProps({
      state: ConfirmationDialogState.isLoading,
      message: "Please Wait...",
    });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        const err = new Error(result.message || "Registration failed");
        (err as any).code = res.status; // ← tambahkan di sini
        throw err;
      }

      setConfitmationProps({
        state: ConfirmationDialogState.isSuccess,
        message: "Registration Successful! you can login to your account now.",
        onTapOutSide: () => {
          setConfitmationProps(null);
          router.push("/login");
        },
      });
    } catch (error: any) {
      setConfitmationProps({
        state: ConfirmationDialogState.isError,
        errorMessage: error.message,
        message: error.code === 401
          ? "The password must be a string with at least 6 characters"
          : error.code === 402
          ? "Please use another email address because this email is already in use"
          : "Something went wrong during registration. Please try again.",
        onTapOutSide: () => setConfitmationProps(null),
      });
    }
  };

  return (
    <>
      {confitmationProps && <ConfirmationDialog {...confitmationProps} />}
      <div className="flex flex-col min-h-screen w-full bg-[var(--color-primary-light)] justify-center items-center p-6">
        <h1
          className={`${dancing.className} text-[var(--color-primary)] text-2xl sm:text-3xl md:text-4xl mb-6`}
        >
          Hello, Welcome To DearUs
        </h1>

        <div className="bg-white p-6 w-full sm:w-3/4 md:w-2/5 rounded-xl flex flex-col items-center text-black font-semibold text-base md:text-lg">
          <p className="font-normal text-xs sm:text-sm text-gray-400 mt-1 mb-3">
            Please Fill All Your Information
          </p>

          <form
            className="w-full"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              setConfitmationProps({
                state: ConfirmationDialogState.isAsking,
                message:
                  "Are you sure you want to register with this data? Please make sure your email address is correct, as it will be used for verification.",
                onConfirm: () => handleSubmit(onSubmit)(),
                onCancel: () => {
                  setConfitmationProps(null);
                },
              });
            }}
          >
            <FormField
              name="name"
              title="Full Name"
              formType={FormType.TextField}
              control={control}
            />
            <div className="m-3"></div>
            <FormField
              name="birthdate"
              title="Birthdate"
              formType={FormType.DateTime}
              control={control}
            />
            <div className="m-3"></div>
            <FormField
              name="address"
              title="Address"
              formType={FormType.TextArea}
              control={control}
            />
            <div className="m-3"></div>
            <FormField
              name="phone_number"
              title="Phone Number"
              formType={FormType.PhoneNumber}
              control={control}
            />
            <div className="m-3"></div>
            <FormField
              name="email"
              title="Email"
              formType={FormType.Email}
              control={control}
            />
            <div className="m-3"></div>
            <FormField
              name="password"
              title="Password"
              formType={FormType.Password}
              control={control}
            />
            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-xl mt-8 w-full text-sm sm:text-base cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
