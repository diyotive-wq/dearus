import { Couples } from "@/app/[slug]/models/couples";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import Countdown from "../countdown-widget/page";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BaseView from "../base-view/page";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function DateWidget({ data }: { data?: Couples }) {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const getDate = () => {
    if (!data?.date) return null;

    if (data.date instanceof Timestamp) return data.date.toDate();

    const dateObj = data.date as { seconds: number; nanoseconds: number };
    if (dateObj.seconds !== undefined && dateObj.nanoseconds !== undefined) {
      return new Timestamp(dateObj.seconds, dateObj.nanoseconds).toDate();
    }

    return new Date(data.date as any);
  };

  const parsedDate = getDate();

  return (
    <BaseView
      bgColor={data?.color?.tertiary ?? "#FFFFFF"}
      imageLeft={{
        position: "top-0 left-0",
        source: `/assets/images/flower-corner-top-2-${data?.color?.theme}.png`,
      }}
      imageRight={{
        position: "bottom-0 right-0",
        source: `/assets/images/flower-corner-bottom-2-${data?.color?.theme}.png`,
      }}
    >
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
          className="w-2/3 md:w-1/4 sm:w-1/3 h-1  rounded-full mb-4"
          style={{ backgroundColor: data?.color?.primary }}
        ></motion.div>
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, x: 0, y: -50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.1 },
            },
          }}
          style={{ color: data?.color?.primary }}
          className={`text-2xl sm:text-3xl md:text-4xl ${dancing.className}`}
        >
          Save The Date
        </motion.h1>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.2 },
            },
          }}
          style={{ backgroundColor: data?.color?.primary }}
          className="w-2/3 md:w-1/4 sm:w-1/3 h-1 rounded-full mt-4"
        ></motion.div>
        <motion.h1
          className={`text-sm sm:text-xl md:text-2xl mt-6 font-medium`}
          ref={ref}
          style={{color: data?.color?.primary}}
          initial={{ opacity: 0, x: 0, y: 50 }}
          animate={controls}
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
            ? format(new Date(parsedDate), "EEEE, dd MMMM yyyy", {
                locale: id,
              })
            : "Date Not Available"}
        </motion.h1>
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, x: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
          style={{color: data?.color?.primary}}
          className={`text-sm sm:text-lg md:text-xl mt-2 font-medium mb-8`}
        >
          {parsedDate
            ? format(new Date(parsedDate), "HH:MM", {
                locale: id,
              })
            : "Date Not Available"}
        </motion.h1>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 0, y: -50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.5 },
            },
          }}
        >
          <Countdown color={`${data?.color?.primary}`} targetDate={parsedDate ? parsedDate.toISOString() : ""} />
        </motion.div>
      </div>
    </BaseView>
  );
}
