import { useState, useEffect, Fragment } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ParallaxGallery = ({ galleryData }) => {
  const [scrollY, setScrollY] = useState(0); // Track the scroll position

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  return (
    <div className="flex flex-col">
      {galleryData.map((artwork, index) => {
        // Different scroll speeds for different images
        const speed = index % 3 === 0 ? -0.2 : index % 3 === 1 ? -0.1 : -0.3; // Custom scroll speeds based on index
        const animDelay = index % 3 === 0 ? 1.0 : index % 3 === 1 ? 1.2 : 1.4; // Custom scroll speeds based on index
        const alignment = artwork.align === "left"
          ? "justify-start"
          : artwork.align === "right"
          ? "justify-end"
          : "justify-center";
        const to = artwork.link;
        const Wrapper = to ? Link : Fragment;
        const wrapperProps = to ? { to } : {};

        return (
          <div key={index} className={`flex ${alignment}`}>
            <Wrapper {...wrapperProps}>
              <motion.div
                className="flex flex-col w-full max-w-[30vw] object-cover object-top"
                style={{
                  transform: `translateY(${scrollY * speed}px)`, // Apply different parallax scroll speeds
                }}
              >
                <motion.img
                  src={artwork.image}
                  alt={`Image of ${artwork.title}`}
                  className="w-full h-auto object-cover"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: animDelay,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className={`flex justify-between text-customGrayLight mt-0.5 md:mt-1 ${artwork.align === "left" && "pl-0.5 md:pl-1"}
                    text-4xs sm:text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: animDelay+0.4,
                    ease: "linear",
                  }}
                >
                  <p>{artwork.title}</p>
                  <p className="text-customGray">{artwork.year}</p>
                </motion.div>
              </motion.div>
            </Wrapper>
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxGallery;
