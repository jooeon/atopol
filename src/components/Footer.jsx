import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="z-30">
      <motion.div
        className="flex items-center justify-between w-full p-3 md:p-5 text-3xs sm:text-xs md:text-sm xl:text-base"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "linear"
        }}
      >
        <p>&copy; {new Date().getFullYear()}. Allen Topolski</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
