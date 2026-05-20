"use client";

import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import DocumentationCard from "@/components/documentation-card/page";
import CustomButton from "@/components/service-widget/custom-button";
import { DocumentationModel } from "./models/documentation-models";
import { useEffect, useState } from "react";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function DocumentationService() {
  const [data, setData] = useState<DocumentationModel[]>([]);
  const [state, setState] = useState<"loading" | "success" | "error">("loading");

  const fetchData = async () => {
    setState("loading");
    try {
      const res = await fetch('/api/get-documentations', {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json.data);
      sessionStorage.setItem(
        "documentation-page",
        JSON.stringify({ data: json.data, isReload: false })
      );
      setState("success");
    } catch (error) {
      setState("error");
    }
  };

  useEffect(() => {
    const session = sessionStorage.getItem("documentation-page");
    const handleBeforeUnload = () => {
      const current = sessionStorage.getItem("documentation-page");
      if (!current) return;
      const parsed = JSON.parse(current);
      sessionStorage.setItem(
        "documentation-page",
        JSON.stringify({ data: parsed.data, isReload: true })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (session) {
      const parsed = JSON.parse(session);
      if (parsed.isReload) {
        fetchData();
        sessionStorage.setItem(
          "documentation-page",
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
          ⚠️ Failed to load Documentation. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Section 1: Hero Banner */}
      <section className="relative w-full pt-28 pb-16 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-[var(--color-primary-lightest)] via-[var(--color-primary-lightest)]/60 to-transparent overflow-hidden">
        {/* Lingkaran dekoratif blur */}
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-[var(--color-primary-light)]/40 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase mb-2">
              Our Gallery
            </span>
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-9xl leading-tight">
              Engagement Documentation
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-normal mt-4 text-gray-600 max-w-xl leading-relaxed">
              Capture every moment of your engagement with timeless photo and video documentation.
            </p>
            <div className="mt-6">
              <CustomButton title="Want order? Chat Us" />
            </div>
          </div>
          
          <div className="w-full sm:w-3/4 md:w-2/5 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-w-md drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/assets/icons/documentation-images.png"
                fill
                className="object-contain"
                alt="Documentation Service Showcase"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`font-bold text-3xl sm:text-4xl text-[var(--color-primary)] ${dancing.className}`}>
            Our Portfolio
          </h2>
          <div className="w-12 h-1 bg-[var(--color-primary)] rounded-full mx-auto opacity-40 mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
          {state === "loading"
            ? [1, 2, 3].map((i) => <DocumentationCard key={i} />)
            : data.map((item) => (
                <DocumentationCard key={item.id} data={item} />
              ))}
        </div>
      </section>
    </div>
  );
}