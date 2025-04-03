import { motion } from "framer-motion";

export function MaskText({
                           phrase,
                           duration = 2,
                           delay = 0.075,
                           isAnimateInView = false,
                         }) {
  return (
    <div className="overflow-hidden">
      <motion.p
        className="m-0"
        initial={{ y: "100%" }}
        // Conditionally use whileInView/viewport or animate
        {...(isAnimateInView
          ? { whileInView: { y: 0 }, viewport: { once: true } }
          : { animate: { y: 0 } })}
        transition={{
          duration: duration,
          ease: [0.25, 1, 0.5, 1], // easeOutQuart
          delay: delay,
        }}
      >
        {phrase}
      </motion.p>
    </div>
  );
}
