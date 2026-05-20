import { Couples } from "@/app/[slug]/models/couples";
import BloomBaseView from "../components/base-view";
import { imageDecorations } from "./props";
import BaseAnimationComponent from "../../base-animation-component";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function BloomPlacePage({ data }: { data?: Couples }) {
  return (
    <BloomBaseView
      backgroundColor={data?.color?.secondary ?? ""}
      decorationImages={imageDecorations(data?.color?.theme ?? "pink")}
    >
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <BaseAnimationComponent
          initial={{ opacity: 0 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
          className={`${dancing.className} text-2xl sm:text-3xl md:text-4xl`}
          style={{ color: data?.color?.primary }}
        >
          A Place To Remember
        </BaseAnimationComponent>
        <BaseAnimationComponent
          initial={{ opacity: 0 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.2 },
            },
          }}
          className="text-white text-sm sm:text-lg md:text-2xl mt-4 px-4 sm:px-0 sm:w-3/4 md:w-1/2 text-center mb-3"
        >
          {data?.address ?? "[Engagement Address]"}
        </BaseAnimationComponent>
        <BaseAnimationComponent
          onClick={() => {
            if (!data?.link_maps) return;
            window.open(`${data?.link_maps}`, "_blank");
          }}
          initial={{ opacity: 0 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
          className="rounded-xl bg-[var(--color-primary)] text-white py-2 px-4 sm:py-3 sm:px-5 mt-4 cursor-pointer font-semibold text-xs sm:text-lg "
          style={{ backgroundColor: data?.color?.primary }}
        >
          See The Maps
        </BaseAnimationComponent>
      </div>
    </BloomBaseView>
  );
}
