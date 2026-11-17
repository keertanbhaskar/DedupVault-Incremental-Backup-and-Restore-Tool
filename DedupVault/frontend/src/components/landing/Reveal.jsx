import { motion, useReducedMotion } from "motion/react";

function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: 20 },
    left: { x: -20 },
    right: { x: 20 },
    none: {},
  };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
