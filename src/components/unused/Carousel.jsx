import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carouselData from "../../data/CarouselData.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((nextIndex) => (nextIndex + 1) % carouselData.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full overflow-hidden"
      style={{ cursor: "ew-resize" }}
    >
      <div className="absolute w-1/2 h-full left-0" onClick={handlePrevImage}></div>
      <div className="absolute w-1/2 h-full right-0" onClick={handleNextImage}></div>
      <div className="flex items-center text-customGrayLight">
        <p className="absolute left-[10vw] xl:left-[30vw]">(</p>
        <img
          key={carouselData[currentIndex].id}
          src={carouselData[currentIndex].thumbnail}
          alt={`${carouselData[currentIndex].title} - ${carouselData[currentIndex].year}`}
          className="h-[80vw] xl:h-[60vh] object-cover px-20"
        />
        <p className="absolute right-[10vw] xl:right-[30vw]">)</p>
      </div>
      <div className="absolute bottom-0 text-center pb-4 text-customGrayLight">
        <p className="text-3xs xl:text-base">{String(currentIndex+1).padStart(2, "0")}. {carouselData[currentIndex].title}</p>
      </div>
    </div>
  );
};

export default Carousel;
