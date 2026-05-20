"use client";

import { Couples } from "@/app/[slug]/models/couples";
import FormField from "@/components/form/components/page";
import { FormType } from "@/components/form/models/formtype";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";

type Props = {
  data?: Couples | null;
};

export default function UrlInputBox({ data }: Props) {
  const [showBox, setShowBox] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ setup react-hook-form
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<{ url_name: string }>({});

  const url_name = watch("url_name");

  useEffect(() => {
    document.body.style.overflow = showConfirmationDialog ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConfirmationDialog]);

  const uploadData = async (formData: { url_name: string }) => {
    setLoading(true);

    try {
      const res = await fetch("/api/create-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, data }),
      });

      if (!res.ok) throw new Error("Failed to upload data");

      const result = await res.json();

      console.log("Upload Result:", result.status);

      if (res.status === 200) {
        setIsSuccess(true);
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      alert(`Error uploading data : ${error}`);
    }

    setLoading(false);
  };

  const onSubmit = (formData: { url_name: string }) => {
    if (!formData.url_name?.trim()) {
      alert("Please input your url");
      return;
    }
    setShowConfirmationDialog(true);
  };

  return showConfirmationDialog ? (
    // ✅ Modal Confirmation
    <div className="fixed w-full h-screen bg-black/50 z-80 flex justify-center items-center">
      <div
        className={`flex flex-col w-3/4 md:w-1/2 bg-white rounded-xl p-6 h-9/20 md:h-2/5 ${
          loading || isSuccess ? "justify-center" : "justify-between"
        } items-center`}
      >
        {loading ? (
          <>
            <div className="w-3/4 aspect-[16/4.5] relative animate-[blink_1s_infinite]">
              <Image src="/assets/icons/logo.png" fill alt="Logo" />
            </div>
            <div
              className="text-sm sm:text-3xl font-semibold animate-[blink_1s_infinite]"
              style={{ color: `${data?.color?.primary}` }}
            >
              Please Wait...
            </div>
          </>
        ) : isSuccess ? (
          <>
            <AiOutlineCheckCircle className="text-green-600 w-1/5 h-auto" />
            <h1 className="text-sm md:text-xl sm:text-lg font-semibold mt-2 sm:mt-4 text-green-600 text-center">
              Your Invitation Has Been Created
            </h1>
            <p
              className="text-xs font-medium mt-4 sm:mt-6 text-center sm:text-sm md:text-base cursor-pointer"
              style={{ color: `${data?.color?.primary}` }}
              onClick={() => {
                window.open(`${window.location.origin}/${url_name}`, "_blank");
              }}
            >
              {`${window.location.origin}/${url_name}`}
            </p>
          </>
        ) : (
          <>
            <h1
              className="text-lg sm:text-2xl md:text-3xl font-semibold"
              style={{ color: `${data?.color?.primary}` }}
            >
              WARNING
            </h1>
            <p className="text-xs font-medium text-black mt-6 text-center sm:text-sm md:text-base">
              Do you confirm using the following URL for your engagement
              invitation: {`${window.location.origin}/${url_name}`} ?
            </p>
            <div className="flex w-full flex-row gap-4 mt-9 justify-between">
              <button
                className="rounded-lg bg-white border-[1.5px] font-semibold p-2 w-full cursor-pointer text-sm sm:text-base"
                style={{
                  borderColor: `${
                    data?.color?.primary ?? "var(--color-primary)"
                  }`,
                  color: `${data?.color?.primary ?? "var(--color-primary)"}`,
                }}
                onClick={() => setShowConfirmationDialog(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg text-white p-2 w-full cursor-pointer font-semibold text-sm sm:text-base"
                style={{
                  background: `${
                    data?.color?.primary ?? "var(--color-primary)"
                  }`,
                }}
                onClick={handleSubmit(uploadData)}
              >
                Yes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    // ✅ Floating Box Input
    <div className="fixed w-3/4 sm:w-1/2 md:w-1/4 z-80 bottom-5 right-5 flex justify-end">
      {showBox ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full bg-white rounded-xl p-4 shadow-[0_0_8px_rgba(0,0,0,0.2)]"
        >
          <FormField
            name="url_name"
            control={control as any}
            formType={FormType.TextField}
            rules={{
              validate: (value: string) => {
                if (!value) return "URL wajib diisi";
                if (/\s/.test(value)) return "URL tidak boleh mengandung spasi";
                return true;
              },
            }}
            title="Input URL Name"
          />

          <div className="mt-4 flex flex-row gap-4 justify-between text-xs sm:text-sm">
            <button
              type="button"
              className="rounded-full bg-white border-[1.5px] p-2 w-full cursor-pointer"
              style={{
                borderColor: `${
                  data?.color?.primary ?? "var(--color-primary)"
                }`,
                color: `${data?.color?.primary ?? "var(--color-primary)"}`,
              }}
              onClick={() => setShowBox(false)}
            >
              Hide Box
            </button>
            <button
              type="submit"
              className="rounded-full text-white p-2 w-full cursor-pointer"
              style={{
                background: `${data?.color?.primary ?? "var(--color-primary)"}`,
              }}
            >
              Submit Url
            </button>
          </div>
        </form>
      ) : (
        <button
          className="rounded-full text-xs sm:text-sm text-white py-2 px-4 shadow-[0_0_8px_rgba(0,0,0,0.2)] cursor-pointer"
          onClick={() => setShowBox(true)}
          style={{
            background: `${data?.color?.primary ?? "var(--color-primary)"}`,
          }}
        >
          Open Here
        </button>
      )}
    </div>
  );
}
