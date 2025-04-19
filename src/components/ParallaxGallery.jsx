import { useState, useEffect } from "react";
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
    <div className="flex flex-col h-[500vh]">
      {galleryData.map((artwork, index) => {
        // Different scroll speeds for different images
        const speed = index % 3 === 0 ? 0.2 : index % 3 === 1 ? 0.3 : 0.1; // Custom scroll speeds based on index

        return (
          <div className="y-scroll-item flex">
            <Link to="" key={index}>
              <motion.div
                className="w-full max-w-[30vw] object-cover object-top"
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
                    delay: 1.2,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxGallery;
