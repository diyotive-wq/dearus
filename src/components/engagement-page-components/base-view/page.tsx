import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

type image_props = {
  source: string;
  position: string;
};

type BaseViewProps = {
  bgColor?: string | null;
  imageRight?: image_props | null;
  imageLeft?: image_props | null;
  children: React.ReactNode;
};

export default function BaseView({
  bgColor,
  imageRight: imageRight,
  imageLeft: imageLeft,
  children,
}: BaseViewProps) {
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
    <div ref={ref} className={`w-full min-h-screen relative`} style={{backgroundColor: bgColor ?? ""}}>
      {imageRight && (
        <motion.div
          className={`absolute ${imageRight.position} w-2/5 sm:w-1/4 md:w-1/5 aspect-[233/250]`}
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          <Image
            src={imageRight.source}
            fill
            alt="Flower Bottom Left"
            className="object-cover"
          />
        </motion.div>
      )}
      {imageLeft && (
        <motion.div
          className={`absolute ${imageLeft.position} w-2/5 sm:w-1/4 md:w-1/5 aspect-[233/250]`}
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
        >
          <Image
            src={imageLeft.source}
            fill
            alt="Flower Bottom Left"
            className="object-cover"
          />
        </motion.div>
      )}
      {children}
    </div>
  );
}
