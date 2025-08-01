import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { Couples } from "../../../app/[slug]/models/couples";
import { da } from "date-fns/locale";
import BaseView from "../base-view/page";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function PlaceWidget({ data }: { data?: Couples }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <BaseView
      bgColor={data?.color?.secondary}
      imageLeft={{
        position: "bottom-0 left-0",
        source: `/assets/images/flower-corner-bottom-3-${data?.color?.theme}.png`,
      }}
      imageRight={{
        position: "top-0 right-0",
        source: `/assets/images/flower-corner-top-3-${data?.color?.theme}.png`,
      }}
    >
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <motion.h1
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 0 },
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
        </motion.h1>
        <motion.p
          className="text-white text-sm sm:text-lg md:text-2xl mt-4 px-4 sm:px-0 sm:w-3/4 md:w-1/2 text-center mb-3"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 50, y: 0, x: 50 },
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.2 },
            },
          }}
        >
          {data?.address}
        </motion.p>
        <motion.button
          onClick={() => {
            window.open(`${data?.link_maps}`, "_blank");
          }}
          className="rounded-xl bg-[var(--color-primary)] text-white py-2 px-4 sm:py-3 sm:px-5 mt-4 cursor-pointer font-semibold text-xs sm:text-lg "
          initial="hidden"
          animate={controls}
          style={{ backgroundColor: data?.color?.primary}}
          variants={{
            hidden: { opacity: -50, y: 0, x: -50 },
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
        >
          See The Maps
        </motion.button>
        {/* <motion.div
          className="relative w-1/2 sm:w-2/5 md:w-1/4 aspect-square cursor-pointer"
          onClick={() => {
            window.open(`${data?.link_maps}`, "_blank");
          }}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: -50, y: 0, x: -50 },
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
        >
          <Image src={"/assets/icons/maps.png"} fill alt="address" />
        </motion.div> */}
      </div>
    </BaseView>
  );
}
