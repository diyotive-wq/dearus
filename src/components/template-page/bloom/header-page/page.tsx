import { Dancing_Script } from "next/font/google";
import BloomBaseView from "../components/base-view";
import BaseAnimationComponent from "../../base-animation-component";
import { Couples } from "@/app/[slug]/models/couples";
import { imageDecorations } from "./props";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function BloomHeaderPage({ data }: { data?: Couples }) {
  // If BloomBaseView is a function, call it directly and pass the required props
  return (
    <BloomBaseView
      backgroundColor={data?.color?.primary ?? ""}
      decorationImages={imageDecorations(data?.color?.theme ?? "pink")}
    >
      <BaseAnimationComponent
        className="flex flex-col absolute inset-0 z-20 items-center justify-center"
        initial={{ opacity: 0 }}
        variants={{
          visible: {
            opacity: 1,
            transition: { duration: 1, delay: 0.4, ease: "easeInOut" },
          },
        }}
      >
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
          {data?.male_bride ?? "[Male Bride Name]"} &{" "}
          {data?.female_bride ?? "[Female Bride Name]"}
        </p>
      </BaseAnimationComponent>
    </BloomBaseView>
  );
}
