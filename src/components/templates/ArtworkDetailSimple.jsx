import {useParams} from "react-router-dom";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { MaskText } from '../MaskText.jsx';
import { convertToEmbedURL } from '../../Utils.jsx';

// Template component for individual artwork pages
const ArtworkDetailSimple = () => {

  const { artworkGroup, artworkTitle } = useParams(); // Get URL params

  const [artworkData, setArtworkData] = useState(null);

  // Create the path dynamically based on URL params
  const artworkJsonPath = `../../data/${artworkGroup}/${artworkTitle}.json`;

  useEffect(() => {
    // Dynamically import the JSON data based on the path
    const fetchArtworkData = async () => {
      try {
        const data = await import(`${artworkJsonPath}`);
        setArtworkData(data.default); // Assuming the data is exported as default
      } catch (error) {
        console.error("Error loading artwork data:", error);
      }
    };

    fetchArtworkData();
  }, [artworkGroup, artworkTitle]); // Run the effect when URL params change

  if (!artworkData) {
    return <div>Failed to load artwork data...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col">
          <section className="relative flex m-2 md:m-5 h-full pt-10 md:pt-20">
            {/* Image/Video content scroll section */}
            <div className="flex flex-col gap-3 md:gap-6 w-6/12">

              {/* Render videos (if they exist) */}
              {artworkData.videoLinks &&
                artworkData.videoLinks.map((videoLink, index) => {
                  const embedUrl = convertToEmbedURL(videoLink);
                  return (
                    <motion.div
                      key={index}
                      className="relative overflow-hidden"
                      initial={{opacity: 0, y: 40}}
                      animate={{opacity: 1, y: 0}}
                      transition={{
                        duration: 0.3,
                        delay: 1.0,
                        ease: "easeOut",
                      }}
                    >
                      {/* Container with aspect ratio */}
                      <div className="relative w-full aspect-w-16 aspect-h-9">
                        <iframe
                          title={`video-${index}`}
                          src={embedUrl}
                          className="absolute top-0 left-0 w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </motion.div>
                  );
                })
              }

              {/* Render images (if they exist, although content should have at least one of either video or image) */}
              {artworkData.images &&
                artworkData.images.map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.img
                    src={image}
                    alt={artworkData.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 1.0,
                      ease: 'easeOut'
                    }}
                  />
                </div>
              ))}
            </div>
            {/* Description section */}
            <motion.div
              className="sticky top-0 grid md:grid-cols-[1fr_1fr_8fr_1fr] auto-rows-min
                                gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                                h-fit w-6/12 p-0 pt-8 md:p-5 md:pt-16 2xl:pt-32 4xl:pt-48
                                text-5xs xs:text-5xs md:text-xs lg:text-base xl:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.3,
                delay: 0.9,
                ease: "easeOut",
              }}
            >
              <h1 className="col-start-3 row-start-1
                text-2xs xs:text-xs md:text-xl lg:text-2xl xl:text-2xl/normal 2xl:text-4xl/normal 3xl:text-6xl/normal 4xl:text-7xl/normal">
                <MaskText phrase={artworkData.title} delay={1.1} duration={1.0} />
              </h1>
              {artworkData.year && <div className="col-start-3"><MaskText phrase={artworkData.year} delay={1.25} duration={1.0}/></div>}
              {artworkData.medium && <div className="col-start-3"><MaskText phrase={artworkData.medium} delay={1.4} duration={1.0}/></div>}
              {artworkData.dimensions && <div className="col-start-3"><MaskText phrase={artworkData.dimensions} delay={1.55} duration={1.0}/></div>}
              {artworkData.description &&
                <motion.div
                  className="col-start-3 text-customGrayLight
                  text-5xs xs:text-5xs md:text-3xs lg:text-xs xl:text-xs 2xl:text-sm 3xl:text-lg 4xl:text-xl"
                  initial={{opacity: 0, y: 20 }}
                  animate={{opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.7,
                    ease: "easeOut",
                  }}
                >
                  {artworkData.description}
                </motion.div>
              }

            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

// PropTypes validation
ArtworkDetailSimple.propTypes = {
  id: PropTypes.number,
};

export default ArtworkDetailSimple;
