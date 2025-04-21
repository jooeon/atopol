import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import carouselData from "../../data/CarouselData.json";

// Infinite scroll not functional
const DragCarousel = () => {
  // Duplicate items for infinite effect.
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([...carouselData, ...carouselData]);
  }, []);

  // x position value.
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [setWidth, setSetWidth] = useState(0);

  // Calculate the width of one set of items.
  useEffect(() => {
    if (containerRef.current) {
      // Divide total scrollable width by 2 because we duplicated items.
      setSetWidth(containerRef.current.scrollWidth / 2);
    }
  }, [items]);

  // Handle drag end to "wrap" the carousel.
  const handleDragEnd = (event, info) => {
    const currentX = x.get();
    // If dragged left beyond one full set, reposition right.
    if (currentX <= -setWidth) {
      x.set(currentX + setWidth);
    }
    // If dragged right beyond the start, reposition left.
    else if (currentX > 0) {
      x.set(currentX - setWidth);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-screen overflow-hidden"
    >
      <motion.div
        className="flex items-center gap-10" // Adjust gap as needed
        style={{ x }}
        drag="x"
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, index) => (
          <div key={index} className="w-[40vw] flex-shrink-0">
            <img
              src={item.thumbnail}
              alt={`${item.title} - ${item.year}`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DragCarousel;
