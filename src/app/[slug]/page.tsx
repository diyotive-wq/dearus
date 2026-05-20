"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Couples } from "./models/couples";
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
import Image from "next/image";
import UrlInputBox from "@/components/template-page/url-input-box-widget";
import BloomHeaderPage from "@/components/template-page/bloom/header-page/page";
import BloomIntroductionPage from "@/components/template-page/bloom/introduction-page/page";
import BloomDatePage from "@/components/template-page/bloom/date-page/page";
import BloomPlacePage from "@/components/template-page/bloom/place-page/page";
import BloomGalleryPage from "@/components/template-page/bloom/gallery-page/page";

export default function EngagementPage() {
  const params = useParams();
  const router = useRouter();
  const slug = decodeURIComponent(params?.slug as string);

  const [data, setData] = useState<Couples | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(app);

  const q = query(
    collection(db, "dataCustomer"),
    where("url_name", "==", slug)
  );

  const fetchData = async () => {
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setIsLoading(false);
    } else {
      setData(snapshot.docs[0].data() as Couples);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug === "preview") {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      const localData = JSON.parse(localStorage.getItem("data") as string);

      let dataFinal: any;

      if (nav?.type === "navigate") {
        if (localData) {
          sessionStorage.setItem("data", JSON.stringify(localData));
          localStorage.removeItem("data");
        }
      }

      dataFinal = JSON.parse(sessionStorage.getItem("data") as string);

      if (!dataFinal) {
        router.push("/");
        return;
      }

      setData(dataFinal.data);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center animate-[blink_1s_infinite]">
        <div className="w-1/3 lg:w-1/5 aspect-[16/4.5] relative">
          <Image src="/assets/icons/logo.png" fill alt="Logo" />
        </div>
        <div className="text-[clamp(0.9rem,2.9vw,1.6rem)] font-semibold text-[var(--color-primary)]">
          Please Wait...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Sorry, Data Not Found
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full items-center bg-[var(--color-primary)]">
      <BloomHeaderPage data={data} />
      <BloomIntroductionPage data={data} />
      <BloomDatePage data={data} />
      <BloomPlacePage data={data} />
      <BloomGalleryPage data={data} />
      {slug === "preview" && (
          <UrlInputBox data={data} />
      )}
    </div>
  );
}
