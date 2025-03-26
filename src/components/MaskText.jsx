import { motion } from "framer-motion";

export function MaskText({ phrase }) {

  return (
    <div className="overflow-hidden">
      <motion.p
        className="m-0"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{once: true}}
        transition= {{
          duration: 1.0,
          ease: [0.25, 1, 0.5, 1],  // easeOutQuart
          delay: 0.075,
        }}
      >
        {phrase}
      </motion.p>
    </div>
  );
}
