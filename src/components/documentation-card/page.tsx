"use client";

import { DocumentationModel } from "@/app/documentation-service/models/documentation-models";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function DocumentationCard({ data }: { data?: DocumentationModel | null }) {
  const router = useRouter();

  // Skeleton Loading State
  if (!data) {
    return (
      <div className="rounded-2xl w-full aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse shadow-sm" />
    );
  }

  return (
    <div
      onClick={() => router.push(`/documentation-service/${data.id}`)}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-md bg-gray-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl border border-gray-100"
    >
      <Image
        src={data?.thumbnail_url ?? "/assets/placeholders/placeholder-image.png"}
        fill
        alt={`${data?.male_bride} & ${data?.female_bride} Engagement`}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-w-7xl) 33vw, 100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
        <div className={`text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 ${dancing.className} text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-center`}>
          <h3 className="drop-shadow-md">
            {data?.male_bride ?? "John"}
          </h3>
          <span className="text-sm font-light text-pink-200/80 my-0.5 block drop-shadow-sm">&</span>
          <h3 className="drop-shadow-md">
            {data?.female_bride ?? "Doe"}
          </h3>
        </div>
      </div>
    </div>
  );
}