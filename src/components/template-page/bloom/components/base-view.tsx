import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

type Propss = {
  backgroundColor: string;
  children: React.ReactNode;
  decorationImages?: decorationImages[] | null;
};

export type decorationImages = {
  position: React.CSSProperties;
  imageStyles?: React.CSSProperties;
  sources: string;
  initialTransition: transition;
  transition: transition;
};

export type transition = {
  opacity: number;
  x: number;
  y: number;
};

export default function BloomBaseView({ backgroundColor, children, decorationImages }: Propss) {
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

  return <div
    ref={ref}
    className={`w-full min-h-screen relative`}
    style={{ backgroundColor: backgroundColor ?? "" }}
  >
    {decorationImages &&
      decorationImages.map((i, index) => (
        <motion.div
        key={index}
          className={`absolute w-2/5 sm:w-1/4 md:w-1/5 aspect-[233/250]`}
          initial={{
            opacity: i.initialTransition.opacity,
            x: i.initialTransition.x,
            y: i.initialTransition.y,
          }}
          style={i.position}
          animate={controls}
          variants={{
            visible: {
              opacity: i.transition.opacity,
              x: i.transition.x,
              y: i.initialTransition.y,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          <Image
            src={i.sources}
            fill
            alt="Flower top right"
            style={i.imageStyles}
            className="object-cover"
          />
        </motion.div>
      ))}

    {children}
  </div>;
}
