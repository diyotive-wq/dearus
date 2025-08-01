"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Couples } from "./models/couples";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import app from "@/firebaseConfig";
import HeaderWidget from "../../components/engagement-page-components/header-widget/page";
import DateWidget from "../../components/engagement-page-components/date-widget/page";
import Image from "next/image";
import IntroductionWidget from "../../components/engagement-page-components/introduction-widget/page";
import PlaceWidget from "../../components/engagement-page-components/place-widget/page";
import GalleryWidget from "../../components/engagement-page-components/gallery-widget/page";

export default function EngagementPage() {
  const params = useParams();
  const router = useRouter();
  const slug = decodeURIComponent(params?.slug as string);
  const [data, setData] = useState<Couples | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fecthData = async () => {
    const db = getFirestore(app);
    const q = query(
      collection(db, "dataCustomer"),
      where("url_name", "==", slug)
    );
    const fetch = async () => {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setIsLoading(false);
      } else {
        setData(snapshot.docs[0].data() as Couples);
        await new Promise(() => setTimeout(() => setIsLoading(false), 1000));
      }
    };

    fetch();
  };

  useEffect(() => {
    if (slug === "preview") {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      const data = JSON.parse(localStorage.getItem("data") as string);

      var dataFinal: any;

      if (nav?.type === "navigate") {
        if (data) {
          sessionStorage.setItem("data", JSON.stringify(data));
          localStorage.removeItem("data");
        }
      }

      dataFinal = JSON.parse(sessionStorage.getItem("data") as string);;

      console.log(dataFinal)

      if (!dataFinal) {
        router.push("/");
        return;
      }

      setData(dataFinal.data);
      setIsLoading(false);
    } else {
      fecthData();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
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
      <HeaderWidget data={data} />
      <IntroductionWidget data={data} />
      <DateWidget data={data} />
      <PlaceWidget data={data} />
      <GalleryWidget data={data} />
    </div>
  );
}
