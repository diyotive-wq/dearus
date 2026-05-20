import {
  motion,
  TargetAndTransition,
  useAnimation,
  Variants,
} from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children?: React.ReactNode;
  initial?: TargetAndTransition;
  variants?: Variants;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export default function BaseAnimationComponent({
  children,
  initial: initialTransition,
  variants: transition,
  onClick,
  className: classname,
  style: styles,
}: Props) {
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
    <motion.div
      ref={ref}
      onClick={onClick}
      className={classname}
      initial={initialTransition}
      animate={controls}
      style={styles}
      variants={transition}
    >
      {children}
    </motion.div>
  );
}
