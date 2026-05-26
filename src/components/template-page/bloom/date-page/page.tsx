import { Couples } from "@/app/[slug]/models/couples";
import BloomBaseView from "../components/base-view";
import { imageDecorations } from "./props";
import BaseAnimationComponent from "../../base-animation-component";
import { Dancing_Script } from "next/font/google";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Countdown from "./components/countdown-widget";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function BloomDatePage({ data }: { data?: Couples }) {
  const getDate = () => {
    if (!data?.date) return null;

    if (data.date instanceof Timestamp) return data.date.toDate();

    let newDate;

    const dateObj = data.date as { seconds: number; nanoseconds: number };
    if (dateObj.seconds !== undefined && dateObj.nanoseconds !== undefined) {
      
      newDate = new Timestamp(dateObj.seconds, dateObj.nanoseconds).toDate()


      return newDate;
    }

    newDate = new Date(data.date as any);


    return newDate;
  };

  const parsedDate = getDate();

  return (
    <BloomBaseView
      backgroundColor={data?.color?.tertiary ?? ""}
      decorationImages={imageDecorations(data?.color?.theme ?? "pink")}
    >
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <BaseAnimationComponent
          className="w-2/3 md:w-1/4 sm:w-1/3 h-1  rounded-full mb-4"
          initial={{ opacity: 0, x: -50, y: 0 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
          style={{ backgroundColor: data?.color?.primary }}
        ></BaseAnimationComponent>
        <BaseAnimationComponent
          initial={{ opacity: 0, x: 0, y: -50 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.1 },
            },
          }}
          style={{ color: data?.color?.primary }}
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${dancing.className}`}
        >
          Save The Date
        </BaseAnimationComponent>
        <BaseAnimationComponent
          className="w-2/3 md:w-1/4 sm:w-1/3 h-1  rounded-full mb-4"
          initial={{ opacity: 0, x: 50, y: 0 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.2 },
            },
          }}
          style={{ backgroundColor: data?.color?.primary }}
        ></BaseAnimationComponent>
        <BaseAnimationComponent
          className={`text-sm sm:text-xl md:text-2xl mt-6 font-medium`}
          style={{ color: data?.color?.primary }}
          initial={{ opacity: 0, x: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.3 },
            },
          }}
        >
          {parsedDate
            ? format(parsedDate, "EEEE, dd MMMM yyyy", {
                locale: id,
              })
            : "[Engagement Date]"}
        </BaseAnimationComponent>
        <BaseAnimationComponent
          initial={{ opacity: 0, x: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
          style={{ color: data?.color?.primary }}
          className={`text-sm sm:text-lg md:text-xl mt-2 font-medium mb-8`}
        >
          {parsedDate
            ? format(parsedDate, "HH:mm", {
                locale: id,
              })
            : "[Engagement Time]"}
        </BaseAnimationComponent>
        <BaseAnimationComponent
          initial={{ opacity: 0, x: 0, y: -50 }}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.5 },
            },
          }}
        >
          <Countdown
            color={`${data?.color?.primary}`}
            targetDate={parsedDate ? parsedDate.toISOString() : ""}
          />
        </BaseAnimationComponent>
      </div>
    </BloomBaseView>
  );
}
