import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MaskText } from './MaskText.jsx';
import { Link } from 'react-router-dom';

// Pass in artwork data array, title of the gallery, and skipIndex
// providing skipIndex allows the option to quickly skip to a certain part of the vertical scroll
// if skipIndex is provided then buttons appear to skip between one category of images to another
// skipIndex should be equal to the length of the first group of images
// See src/data directory for examples of data structure
export function VerticalScrollGallery({ data, title, skipIndex = null }) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor((data.length/2)-1));  // Start in the middle
  const containerRef = useRef(null);
  // y controls the vertical offset of the thumbnails list.
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 400, damping: 100 });
  const [itemHeight, setItemHeight] = useState(0);
  const gap = 16; // Matching gap-y-4 (16px gap)
  const wheelTimeout = useRef(null);
  const [isBeforeSkipIndex, setIsBeforeSkipIndex] = useState(true);
  const defaultTheme = localStorage.getItem('theme')

  const skipToBeginning = () => {
    setCurrentIndex(0);
  }

  const skipToSkipIndex = () => {
    setCurrentIndex(skipIndex);
  }

  useEffect(() => {
    if (skipIndex) {
      if (currentIndex < skipIndex) {
        setIsBeforeSkipIndex(true);
      } else {
        setIsBeforeSkipIndex(false);
      }
    }
  }, [currentIndex]);

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
      newIndex = Math.min(Math.max(newIndex, 0), data.length - 1);
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
      const minY = - (data.length - 1) * (itemHeight + gap) + maxY;

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

  // For creating artwork detail page links
  // To lowercase and replace spaces with dashes, remove parentheses
  function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
  }

  useEffect(() => {
    if (skipIndex) {
      // Detect if the currentIndex is greater than the skipIndex and toggle the theme accordingly
      if (currentIndex < skipIndex) {
        // Add dark mode and store in localStorage for temporary session theme
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        // Remove dark mode and store in localStorage for temporary session theme
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [currentIndex, skipIndex]);

  // Reset the theme based on localStorage when leaving this page
  useEffect(() => {
    return () => {
      if (defaultTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    };
  }, []);
  console.log(defaultTheme);
  return (
    <div className="flex h-screen mr-5 xl:m-0">
      <div className="xl:w-1/4">
        <div className="w-full xl:w-fit pb-10 xl:absolute xl:top-32 3xl:top-40 4xl:top-56 xl:left-40 3xl:left-52 4xl:left-64">
          <h1 className="text-3xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-[3vw]/normal">
            <MaskText phrase={title} duration={1.2} delay={0.6} />
          </h1>
          {/* Buttons to skip between groups */}
          {skipIndex &&
            <div className="flex gap-4 text-sm lg:text-base xl:text-[1vw] xl:leading-normal text-customGray dark:text-customGrayLighter">
              <button
                onClick={skipToBeginning}
                className={`capitalize ${
                  isBeforeSkipIndex ? '' : 'opacity-50 hover:opacity-100 transition-opacity duration-300'
                }`}
                disabled={isBeforeSkipIndex}
              >
                <MaskText phrase={data[0].category} duration={1.0} delay={1.0} />
              </button>
              <button
                onClick={skipToSkipIndex}
                className={`capitalize ${
                  !isBeforeSkipIndex ? '' : 'opacity-40 hover:opacity-100 transition-opacity duration-300'
                }`}
                disabled={!isBeforeSkipIndex}
              >
                <MaskText phrase={data[skipIndex].category} duration={1.0} delay={1.0} />
              </button>
            </div>
          }
        </div>
      </div>
      {/* Artwork Focus */}
      <div className="w-3/4 xl:w-1/2 flex flex-col items-center justify-center px-5 md:px-10">
        <Link to={`/${formatString(data[currentIndex].category)}/${formatString(data[currentIndex].title)}`}>
          <img
            src={data[currentIndex].thumbnail}
            alt="Selected"
            className="w-full xl:w-[25vw] xl:max-h-[80vh] object-contain"
          />
        </Link>
        {/* Artwork Label */}
        <div
          className="w-full xl:max-w-80 py-2 text-sm lg:text-base xl:text-[1vw] xl:leading-normal text-customGray dark:text-customGrayLighter
          xl:absolute xl:bottom-44 2xl:bottom-52 3xl:bottom-72 4xl:bottom-96 xl:left-44 3xl:left-64 4xl:left-80"
        >
          <MaskText
            phrase={`${String(currentIndex + 1).padStart(2, '0')}. ${data[currentIndex].title}`}
            duration={1.0} delay={1.2}
          />
          {data[currentIndex].year &&
            <div className="text-customGrayLight">
              <MaskText
                phrase={`${data[currentIndex].year}`}
                duration={1.0} delay={1.4}
              />
            </div>
          }
        </div>
      </div>
      {/* Vertical Scroll Section */}
      <div className="xl:w-1/4 relative flex flex-col items-center">
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
            {data.map((artwork, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`thumbnail w-full xl:w-[12vw] h-20 md:h-72 xl:h-[20vh] overflow-hidden ${
                  index === currentIndex ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <img
                  src={artwork.thumbnail}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      year: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
};


export default VerticalScrollGallery;
