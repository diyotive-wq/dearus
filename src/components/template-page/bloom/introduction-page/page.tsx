import { Couples } from "@/app/[slug]/models/couples";
import BloomBaseView from "../components/base-view";
import BaseAnimationComponent from "../../base-animation-component";
import ImageViewer from "@/components/image-viewer/page";
import { Dancing_Script } from "next/font/google";
import { imageDecorations } from "./props";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function BloomIntroductionPage({ data }: { data?: Couples }) {
  return (
    <BloomBaseView
      backgroundColor="#FFFFFF"
      decorationImages={imageDecorations(data?.color?.theme ?? "pink")}
    >
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <BaseAnimationComponent
          className="relative w-13/20 sm:w-7/20 rounded-full aspect-square mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.3 },
            },
          }}
        >
          {!data?.header_image ? (
            <div
              className="w-full h-full rounded-full text-white text-xl flex justify-center items-center"
              style={{ backgroundColor: data?.color?.primary }}
            >
              [Image Header]
            </div>
          ) : (
            <ImageViewer
              src={data?.header_image ?? ""}
              alt="Introduction Image"
              color={data?.color?.primary}
              classname={"w-full"}
              classnameImage="object-cover rounded-full"
            />
          )}
        </BaseAnimationComponent>
        <BaseAnimationComponent
          className={`text-center text-sm sm:text-lg md:text-2xl ${dancing.className} w-13/20 sm:w-7/20`}
          initial={{ opacity: 0, y: -50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
          style={{ color: data?.color?.primary }}
        >
          {data?.introduction_title ?? "[Introduction Title]"}
        </BaseAnimationComponent>
      </div>
    </BloomBaseView>
  );
}
