import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="z-30">
      <motion.div
        className="flex items-center justify-between w-full p-3 md:p-5 text-customGrayLighter
          text-4xs sm:text-3xs md:text-sm 3xl:text-lg 5xl:text-2xl 6xl:text-3xl"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "linear"
        }}
      >
        <p><span className="text-customOrange">&copy;{new Date().getFullYear()}</span> Allen C. Topolski</p>
        <p className="text-customGrayLight">Design & Development: <Link to="https://jooeonpark.com" target="_blank">Joo Eon Park</Link></p>
      </motion.div>
    </footer>
  );
};

export default Footer;
