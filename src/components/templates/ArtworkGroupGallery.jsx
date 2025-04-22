import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header.jsx';
import { motion } from 'framer-motion';
import { MaskText } from '../MaskText.jsx';
import { convertToEmbedURL, formatString } from '../../Utils.jsx';

const ArtworkGroupGallery = () => {

  const { artworkGroup } = useParams(); // Get URL params

  const [artworkGroupData, setArtworkGroupData] = useState(null);

  // Create the path dynamically based on URL params
  const artworkJsonPath = `../../data/tangents/${artworkGroup}.json`;

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
          <div className="flex flex-col gap-10 xl:gap-32 w-2/3 py-12 xl:py-28">
            {artworkGroupData.videoLinks &&
              artworkGroupData.videoLinks?.map((videoLink, index) => {
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
            {artworkGroupData.imageGroup?.map((group, index) => {
              const alignment = group.align === "left"
                ? "justify-start xl:flex-row"
                : group.align === "right"
                ? "justify-end xl:flex-row"
                : "items-center w-fit mx-auto";

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
                <div key={index} className={`flex flex-col gap-2 xl:gap-1 ${alignment}`}>
                  {/* if aligned right, have the label text come before images */}
                  {group.align === "right" && (
                    <div className="xl:w-[15vw] 3xl:w-[12vw] text-right mr-5 my-2 xl:my-5">
                      <p className="text-2xs xl:text-xs 3xl:text-sm">{title}</p>
                      <p className="text-customGrayLight text-3xs xl:text-2xs 3xl:text-sm mt-1 xl:mt-2">{description}</p>
                    </div>
                  )}
                  {/* Nested loop to map through the images within each imageGroup */}
                  {group.images?.map((image, imageIndex) => {
                    const imageSize = group.images.length === 1
                      ? "xl:w-max" // If there's only 1 image
                      : group.images.length <= 3
                      ? "xl:w-[15vw] xl:max-h-[40vh]"
                      : "xl:w-[10vw]"

                    return image.artworkTitle ? (
                      <Link
                        key={imageIndex}
                        to={`/${formatString(artworkGroupData.category)}/${formatString(image.artworkTitle)}`}
                        className={`max-w-full max-h-[70vh] overflow-hidden relative`}
                      >
                        <img
                          src={image.image}
                          alt={`Image ${imageIndex + 1} in ${title}`}
                          className={`${imageSize} h-full object-cover`}
                        />
                      </Link>
                    ) : (
                      <img
                        key={imageIndex}
                        src={image.image}
                        alt={`Image ${imageIndex + 1} in ${title}`}
                        className={`${imageSize} max-w-full max-h-[70vh] object-cover`}
                      />
                    );
                  })}
                  {/* if aligned left, have the label text come after images */}
                  {group.align === 'left' && (
                    <div className="xl:w-[15vw] 3xl:w-[12vw] ml-5 my-2 xl:my-5">
                      <p className="text-2xs xl:text-xs 3xl:text-sm">{title}</p>
                      <p className="text-customGrayLight text-3xs xl:text-2xs 3xl:text-sm mt-1 xl:mt-2">{description}</p>
                    </div>
                  )}
                  {group.align === "center" && (
                    <div className="w-full mt-5 px-5 xl:px-10">
                      <p className="text-2xs xl:text-xs 3xl:text-sm">{title}</p>
                      <p className="text-customGrayLight text-3xs xl:text-2xs 3xl:text-sm mt-1 xl:mt-2">{description}</p>
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
                        gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-5 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                        h-fit w-1/3 fit p-0 pt-8 md:p-5 md:pt-16 2xl:pt-32 4xl:pt-48
                        text-5xs xs:text-5xs md:text-xs lg:text-base xl:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
          >
            <motion.h1
              className="col-start-2 row-start-1 w-fit
                text-2xs xs:text-xs md:text-xl lg:text-2xl xl:text-2xl/normal 2xl:text-4xl/normal 3xl:text-5xl/normal 4xl:text-6xl/normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.9,
                ease: "easeOut",
              }}
            >
              <MaskText phrase={artworkGroupData.title} delay={1.1} duration={1.4} />
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