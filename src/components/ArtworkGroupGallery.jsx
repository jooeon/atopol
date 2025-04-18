import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import { motion } from 'framer-motion';
import { MaskText } from './MaskText.jsx';

const ArtworkGroupGallery = () => {

  const { artworkGroup } = useParams(); // Get URL params

  const [artworkGroupData, setArtworkGroupData] = useState(null);

  // Create the path dynamically based on URL params
  const artworkJsonPath = `../data/tangents/${artworkGroup}.json`;

  useEffect(() => {
    // Dynamically import the JSON data based on the path
    const fetchArtworkGroupData = async () => {
      try {
        const data = await import(`${artworkJsonPath}`);
        setArtworkGroupData(data.default); // Assuming the data is exported as default
      } catch (error) {
        console.error("Error loading artwork group data:", error);
      }
    };

    fetchArtworkGroupData();
  }, [artworkGroup]); // Run the effect when URL params change

  if (!artworkGroupData) {
    return <div>Failed to load artwork group data...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="relative flex">
          {/* Main gallery section */}
          <div className="flex flex-col gap-10 xl:gap-24 w-2/3 h-[300vh] pt-12 xl:pt-28">
            {artworkGroupData.imageGroup?.map((group, index) => {
              const alignment = group.align === "left"
                ? "justify-start"
                : group.align === "right"
                ? "justify-end"
                : "justify-center";

              // in the case the imageGroupTitle does not exist
              // leave it empty string to prevent errors
              let title = ""
              let description = ""
              if (group.imageGroupTitle) {
                title = group.imageGroupTitle;
              }
              if (group.description) {
                description = group.description;
              }

              return (
                <div key={index} className={`flex gap-5 ${alignment}`}>
                  {/* if aligned right, have the label text come before images */}
                  {group.align === "right" && (
                    <div className="w-[15vw] text-right">
                      <p>{title}</p>
                      <p className="text-customGrayLight xl:text-2xs mt-1 xl:mt-2">{description}</p>
                    </div>
                  )}
                  {/* Nested loop to map through the images within each imageGroup */}
                  {group.images?.map((image, imageIndex) => {
                    const imageWidth = group.images.length === 1
                      ? "w-[25vw]" // If there's only 1 image
                      : group.images.length <= 3
                      ? "w-[15vw]" // If there are 2 or 3 images
                      : "w-full"; // Default width if more than 3 images

                    return (
                      <img
                        key={imageIndex}
                        src={image.image}
                        alt={`Image ${imageIndex + 1} in ${title}`}
                        className={`${imageWidth} h-max object-cover`}
                      />
                    )
                  })}
                  {/* if aligned left, have the label text come after images */}
                  {group.align === "left" && (
                    <div className="w-[15vw]">
                      <p>{title}</p>
                      <p className="text-customGrayLight xl:text-2xs mt-1 xl:mt-2">{description}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {/* Right-hand side description section */}
          <div
            className="fixed right-0 w-1/3 h-screen bg-customWhiteTinge dark:bg-customDarkBrown opacity-10 -z-10"></div>
          <div className="sticky top-0
                        grid md:grid-cols-[1fr_8fr_1fr] grid-rows-[min]
                        gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                        h-fit w-1/3 fit p-0 pt-8 md:p-5 md:pt-16 2xl:pt-32 4xl:pt-48
                        text-5xs xs:text-5xs md:text-xs lg:text-base xl:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
          >
            <motion.h1
              className="col-start-2 row-start-1
                text-2xs xs:text-xs md:text-xl lg:text-2xl xl:text-2xl/normal 2xl:text-4xl/normal 3xl:text-6xl/normal 4xl:text-7xl/normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.9,
                ease: "easeOut",
              }}
            >
              <MaskText phrase={artworkGroupData.title} delay={1.1} duration={1.0} />
            </motion.h1>
            {artworkGroupData.description &&
              <motion.div
                className="col-start-2 row-start-2 text-customGrayLight
                  text-5xs xs:text-5xs md:text-3xs lg:text-xs xl:text-xs 2xl:text-sm 3xl:text-lg 4xl:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.7,
                  ease: "easeOut",
                }}
              >
                {artworkGroupData.description}
              </motion.div>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default ArtworkGroupGallery;