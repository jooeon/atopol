import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carouselData from "../data/CarouselData";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-32 w-full overflow-hidden"
      onClick={handleNextImage}
      style={{ cursor: "ew-resize" }}
    >
      <AnimatePresence exitBeforeEnter>
        <motion.img
          key={carouselData[currentIndex].id}
          src={carouselData[currentIndex].thumbnail}
          alt={`${carouselData[currentIndex].title} - ${carouselData[currentIndex].year}`}
          className="w-[60vw] xl:w-[30vw] h-auto object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="text-center text-customGrayLight py-6">
        <p className="text-3xs xl:text-base">{currentIndex+1}. {carouselData[currentIndex].title}</p>
      </div>
    </div>
  );
};

export default Carousel;
