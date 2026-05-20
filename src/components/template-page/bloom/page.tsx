import { data } from "framer-motion/client";
import BloomDatePage from "./date-page/page";
import BloomGalleryPage from "./gallery-page/page";
import BloomHeaderPage from "./header-page/page";
import BloomIntroductionPage from "./introduction-page/page";
import BloomPlacePage from "./place-page/page";
import { Couples } from "@/app/[slug]/models/couples";

export default function BloomTemplatePage({ data }: { data?: Couples }) {

    console.log(data);
  return (
    <div className="relative flex flex-col w-full items-center bg-[var(--color-primary)]">
      <BloomHeaderPage data={data} />
      <BloomIntroductionPage data={data} />
      <BloomDatePage data={data} />
      <BloomPlacePage data={data} />
      <BloomGalleryPage data={data} />
      
    </div>
  );
}
