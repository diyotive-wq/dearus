import Image from "next/image";
import { Couples } from "../../../app/[slug]/models/couples";
import { Dancing_Script } from "next/font/google";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function HeaderWidget({ data }: { data?: Couples }) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const headerSrc = isSmallScreen
    ? data?.header_image_potrait ?? data?.header_image ?? ""
    : data?.header_image ?? "";

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden ">
      {/* Gambar background */}
      <Image
        src={headerSrc}
        fill
        alt="Header Image"
        className="object-cover"
        style={{
          opacity: 0.75,
          zIndex: 0,
        }}
      />

      {/* Konten di atas */}
      <div className="flex flex-col absolute inset-0 z-20 items-center justify-center">
        <p className="text-white text-xs sm:text-sm md:text-lg font-light mb-8 text-center">
          YOU ARE INVITED
          <br />
          TO THE
        </p>

        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-medium text-center">
          {"Engagement".toUpperCase()}
          <br />
          {"Party".toUpperCase()}
        </h1>
        <p
          className={`${dancing.className} text-white text-lg sm:text-xl md:text-2xl text-center mt-6`}
        >
          {data?.male_bride} & {data?.female_bride}
        </p>
      </div>
    </div>
  );
}
