import { useState } from 'react';
import Header from '../components/Header.jsx';
import tangentsData from '../data/tangents.json';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { formatString, isEven } from '../Utils.jsx';
import { MaskText } from '../components/MaskText.jsx';
import { motion } from 'framer-motion';

const Tangents = () => {

  // State to manage the hovered title
  const [hoveredTitle, setHoveredTitle] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle hover events to set the hovered title
  const handleMouseEnter = (index, title) => {
    setHoveredTitle(title); // Set the hovered title
    setHoveredIndex(index)
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false for fade-out effect
  };

  return (
    <>
      <Header />
      <main>
        <div className="relative flex flex-col justify-center gap-5 lg:gap-8 xl:gap-14 py-14 md:py-16 lg:py-20 xl:py-28 px-4 md:px-8">
          <div className="xl:ml-16
            text-2xs md:text-base lg:text-xl xl:text-[1.25vw]">
            <h1 className="text-2xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-[3vw]/normal">
              <MaskText phrase={"Tangents"} delay={1.0} duration={1.0} />
            </h1>
            {/*{hoveredTitle && (*/}
            {/*  <motion.p*/}
            {/*    className="text-customGrayLight leading-normal h-fit"*/}
            {/*    initial={{ opacity: 0 }}*/}
            {/*    animate={{ opacity: isHovered ? 1 : 0 }} // Fade in on hover, fade out when not hovered*/}
            {/*    transition={{ duration: 0.3, ease: "easeInOut" }}*/}
            {/*  >*/}
            {/*    {String(hoveredIndex+1).padStart(2, "0")}. {hoveredTitle}*/}
            {/*  </motion.p>*/}
            {/*)}*/}
          </div>
          {/* Artwork Group Thumbnail Vertical Scroll */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-10 xl:gap-20">
            {tangentsData["artwork-group"].map((artworkGroup, index) => (
              <Link
                to={`/${formatString(artworkGroup.title)}`}
                key={index}
                onMouseEnter={() => handleMouseEnter(index, artworkGroup.title)} // Update title on hover
                // onMouseLeave={handleMouseLeave} // Fade out title on hover leave
                className="overflow-hidden"
              >
                <motion.img
                  src={artworkGroup.image}
                  alt={`Thumbnail for ${artworkGroup.title}`}
                  className="xl:w-[45vw] xl:h-[95vh] object-cover object-top"
                  initial={{opacity: 0, y: 80}}
                  animate={{opacity: 1, y: 0}}
                  transition={{
                    duration: 0.5,
                    delay: isEven(index) ? 1.4 : 1.6,
                    ease: "easeOut",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Tangents;