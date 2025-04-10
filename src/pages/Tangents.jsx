import { useState } from 'react';
import Header from '../components/Header.jsx';
import tangentsData from '../data/tangents.json';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { formatString } from '../Utils.jsx';
import { MaskText } from '../components/MaskText.jsx';
import { motion } from 'framer-motion';

const Tangents = () => {

  // State to manage the hovered title
  const [hoveredTitle, setHoveredTitle] = useState("");
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle hover events to set the hovered title
  const handleMouseEnter = (title) => {
    setHoveredTitle(title); // Set the hovered title
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false for fade-out effect
  };

  return (
    <>
      <Header />
      <main>
        <div className="relative flex gap-2 xl:gap-0 py-14 xl:py-28 px-3">
          <div className="w-2/3">
            {/* Artwork Group Thumbnail Vertical Scroll */}
            <div className="flex flex-col items-center gap-5">
              {tangentsData["artwork-group"].map((artworkGroup, index) => (
                <Link
                  to={`/${formatString(artworkGroup.title)}`}
                  key={index}
                  onMouseEnter={() => handleMouseEnter(artworkGroup.title)} // Update title on hover
                  // onMouseLeave={handleMouseLeave} // Fade out title on hover leave
                  className="overflow-hidden"
                >
                  <img
                    src={artworkGroup.image}
                    alt={`Thumbnail for ${artworkGroup.title}`}
                    className="xl:w-[30vw] xl:h-[80vh] object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="sticky top-0 flex flex-col justify-between w-1/3 h-[70vh] p-0 pt-8 md:p-5 md:pt-16 2xl:pt-32 4xl:pt-48
          text-2xs md:text-base lg:text-xl xl:text-[1.25vw]">
            <h1 className="text-2xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-[3vw]/normal">
              <MaskText phrase={"Tangents"} delay={1.0} duration={1.0} />
            </h1>
            {hoveredTitle && (
              <motion.p
                className="text-customGrayLight mt-4 xl:ml-20 leading-normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }} // Fade in on hover, fade out when not hovered
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <MaskText phrase={hoveredTitle} delay={1.0} duration={1.0} />
              </motion.p>
            )}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Tangents;