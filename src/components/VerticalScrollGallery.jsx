import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Pass in array data consisting of image, title, year
// See src/data directory for examples of data structure
export function VerticalScrollGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length/2));
  const containerRef = useRef(null);
  // y controls the vertical offset of the thumbnails list.
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 400, damping: 100 });
  const [itemHeight, setItemHeight] = useState(0);
  const gap = 16; // Matching gap-y-4 (16px gap)
  const wheelTimeout = useRef(null);

  // Measure the height of the first thumbnail on mount
  // *** All thumbnails must be of equal height
  useEffect(() => {
    if (containerRef.current) {
      const firstItem = containerRef.current.querySelector(".thumbnail");
      if (firstItem) {
        setItemHeight(firstItem.clientHeight);
      }
    }
  }, []);

  // Whenever the current index changes, snap the thumbnail list so that the selected thumbnail is centered.
  useEffect(() => {
    if (containerRef.current && itemHeight) {
      const containerHeight = containerRef.current.clientHeight;
      const targetOffset =
        -currentIndex * (itemHeight + gap) + (containerHeight / 2 - itemHeight / 2);
      y.set(targetOffset);
    }
  }, [currentIndex, itemHeight, y]);

  // Function to compute and snap to the thumbnail closest to the center.
  const snapToNearest = () => {
    if (containerRef.current && itemHeight) {
      const containerHeight = containerRef.current.clientHeight;
      const centerOffset = containerHeight / 2 - itemHeight / 2;
      const currentY = springY.get();
      // Calculate index based on current y offset.
      let newIndex = Math.round((centerOffset - currentY) / (itemHeight + gap));
      newIndex = Math.min(Math.max(newIndex, 0), images.length - 1);
      setCurrentIndex(newIndex);
    }
  };

  // Handle wheel events: update y and debounce snapping.
  const handleWheel = (e) => {
    // e.preventDefault();
    if (containerRef.current && itemHeight) {
      const containerHeight = containerRef.current.clientHeight;
      // when the first image is centered
      const maxY = containerHeight / 2 - itemHeight / 2;
      // when the last image is centered
      const minY = - (images.length - 1) * (itemHeight + gap) + maxY;

      // Calculate the new y value based on the wheel delta.
      const newY = y.get() - e.deltaY;
      // Clamp newY between minY and maxY so user can't scroll past edges
      const clampedY = Math.min(Math.max(newY, minY), maxY);
      y.set(clampedY);

      // Debounce snapping after wheel scrolling stops.
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
      wheelTimeout.current = setTimeout(() => {
        snapToNearest();
      }, 150);
    }
  };


  return (
    <div className="flex h-screen">
      {/* Artwork Label */}
      <div className="w-1/4">
        <div className="absolute bottom-40 left-60 max-w-96">
          <p>{String(currentIndex + 1).padStart(2, "0")}. {images[currentIndex].title}</p>
          <p className="text-customGray dark:text-customGrayLight">{images[currentIndex].year}</p>
        </div>
      </div>
      {/* Artwork Focus */}
      <div className="w-1/2 flex items-center justify-center">
        <a href={images[currentIndex].link} target="_blank" rel="noopener noreferrer">
          <img
            src={images[currentIndex].image}
            alt="Selected"
            className="w-[30vw] max-h-[80vh] object-contain"
          />
        </a>
      </div>
      {/* Vertical Scroll Section */}
      <div className="w-1/4 relative flex flex-col items-center">
        {/* A container with overflow-hidden to mask the list */}
        <div
          ref={containerRef}
          className="overflow-hidden h-full w-full"
          onWheel={handleWheel}
        >
          <motion.div
            style={{ y: springY }}
            className="flex flex-col items-center gap-y-4"
          >
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`thumbnail w-[10vw] h-44 overflow-hidden ${
                  index === currentIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <img
                  src={img.image}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

VerticalScrollGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      year: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};


export default VerticalScrollGallery;
