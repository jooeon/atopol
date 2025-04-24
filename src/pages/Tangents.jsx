import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { formatString, isEven } from '../Utils.jsx';
import { MaskText } from '../components/MaskText.jsx';
import { motion } from 'framer-motion';

const Tangents = () => {

  // Unused
  // State to manage the hovered title
  // const [hoveredTitle, setHoveredTitle] = useState("");
  // const [hoveredIndex, setHoveredIndex] = useState(0);
  // const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle hover events to set the hovered title
  // const handleMouseEnter = (index, title) => {
  //   setHoveredTitle(title); // Set the hovered title
  //   setHoveredIndex(index)
  //   setIsHovered(true); // Set hover state to true
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false); // Set hover state to false for fade-out effect
  // };

  const [tangentsData, setTangentsData] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const modules = import.meta.glob('../data/tangents/*.json');

    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default;  // JSON files export their content as default
        })
      );
      setTangentsData(entries);
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="relative xl:h-screen flex flex-col gap-5 lg:gap-8 xl:gap-14 py-14 md:py-16 lg:py-20 xl:py-28 px-4 md:px-8">
          <div className="xl:ml-16
            text-2xs md:text-base lg:text-xl xl:text-[1.25vw]">
            <h1 className="text-2xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-[3vw]/normal">
              <MaskText phrase={"Tangents"} delay={1.0} duration={1.2} />
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
          <div className="flex flex-wrap flex-col xl:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10 xl:gap-[3vw]">
            {tangentsData.map((artworkGroup, index) => {
              const baseDelay = 1.2;
              const delayStep = 0.15;
              const delay = baseDelay + index * delayStep;  // stagger delay by delayStep

              return (
                <Link
                  to={`/tangents/${formatString(artworkGroup.category)}`}
                  key={index}
                  // onMouseEnter={() => handleMouseEnter(index, artworkGroup.title)} // Update title on hover
                  // onMouseLeave={handleMouseLeave} // Fade out title on hover leave
                  className="overflow-hidden"
                >
                  <motion.img
                    src={artworkGroup.thumbnail}
                    alt={`Thumbnail for ${artworkGroup.title}`}
                    // className="w-[100vw] xl:w-[43vw] xl:h-[110vh] object-cover object-top"
                    className="w-[100vw] h-[60vh] md:h-[90vh] xl:w-[20vw] xl:h-[55vh] object-cover object-top"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: delay,
                      ease: "easeOut",
                    }}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      {/*<Footer/>*/}
    </>
  );
};

export default Tangents;