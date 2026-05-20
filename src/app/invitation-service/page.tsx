"use client";

import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import InvitationTemplateCard from "@/components/invitation-template-card/page";
import CustomButton from "@/components/service-widget/custom-button";
import { useEffect, useState } from "react";
import { InvitationTemplateModel } from "./models/invitation-template-model";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function InvitationService() {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<InvitationTemplateModel[]>([]);

  const fetchData = async () => {
    setState("loading");
    try {
      const res = await fetch(`/api/get-templates`, {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json.data);
      sessionStorage.setItem(
        "invitation-page",
        JSON.stringify({ data: json.data, isReload: false })
      );
      setState("success");
    } catch (error) {
      setState("error");
    }
  };

  useEffect(() => {
    const session = sessionStorage.getItem("invitation-page");
    const handleBeforeUnload = () => {
      const current = sessionStorage.getItem("invitation-page");
      if (!current) return;
      const parsed = JSON.parse(current);
      sessionStorage.setItem(
        "invitation-page",
        JSON.stringify({ data: parsed.data, isReload: true })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (session) {
      const parsed = JSON.parse(session);
      if (parsed.isReload) {
        fetchData();
        sessionStorage.setItem(
          "invitation-page",
          JSON.stringify({ data: parsed.data, isReload: false })
        );
      } else {
        setData(parsed.data);
        setState("success");
      }
    } else {
      fetchData();
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (state === "error") {
    return (
      <div className="w-full flex flex-col justify-center items-center py-32 bg-gray-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl shadow-sm font-medium">
          ⚠️ Failed to load Templates. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header / Hero Section */}
      <section className="relative w-full pt-28 pb-16 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-[var(--color-primary-lightest)] via-[var(--color-primary-lightest)]/60 to-transparent overflow-hidden">
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-[var(--color-primary-light)]/40 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase mb-2">
              Premium Themes
            </span>
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-9xl leading-tight">
              Engagement Invitation
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-normal mt-4 text-gray-600 max-w-xl leading-relaxed">
              From love story to event details, make your engagement unforgettable with one elegant digital invitation.
            </p>
            <div className="mt-6">
              <CustomButton title="Need Help? Chat Us" />
            </div>
          </div>

          <div className="w-full sm:w-3/4 md:w-2/5 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-w-md drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/assets/icons/invitation-images.png"
                fill
                className="object-contain"
                alt="Engagement Invitation Showcase"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Template Grid Section */}
      <section className="w-full py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`font-bold text-3xl sm:text-4xl text-[var(--color-primary)] ${dancing.className}`}>
            Choose Our Template
          </h2>
          <div className="w-12 h-1 bg-[var(--color-primary)] rounded-full mx-auto opacity-40 mt-2"></div>
        </div>

        {/* Gunakan Grid layout yang fleksibel dan rapi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
          {state === "loading"
            ? [1, 2, 3].map((i) => <InvitationTemplateCard key={i} />)
            : data.map((template) => (
                <InvitationTemplateCard key={template.id} data={template} />
              ))}
        </div>
      </section>
    </div>
  );
}