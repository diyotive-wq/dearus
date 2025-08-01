"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Dancing_Script } from "next/font/google";
import { Couples } from "../../../app/[slug]/models/couples";
import BaseView from "../base-view/page";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function IntroductionWidget({ data }: { data?: Couples }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <BaseView
      bgColor={"#FFFFFF"}
      imageLeft={{
        position: "bottom-0 left-0",
        source: `/assets/images/flower-corner-bottom-1-${data?.color?.theme}.png`,
      }}
      imageRight={{
        position: "top-0 right-0",
        source: `/assets/images/flower-corner-top-1-${data?.color?.theme}.png`,
      }}
    >
      <motion.div
        ref={ref}
        className="flex justify-center items-center min-h-screen text-center px-4"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          },
        }}
      >
        <div>
          <h1
            className={`text-sm sm:text-lg md:text-2xl ${dancing.className}`}
            style={{ color: data?.color?.primary }}
          >
            {`"${data?.introduction_title}"`}
          </h1>
        </div>
      </motion.div>
    </BaseView>
  );
}
