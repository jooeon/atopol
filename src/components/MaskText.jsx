import { motion } from "framer-motion";

export function MaskText({ phrase, duration = 2, delay = 0.075 }) {
  return (
    <div className="overflow-hidden">
      <motion.p
        className="m-0"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
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
