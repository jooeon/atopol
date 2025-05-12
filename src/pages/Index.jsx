import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParallaxGallery from '../components/templates/ParallaxGallery.jsx';
import { MaskText } from '../components/MaskText.jsx';

const Index = () => {

  const [galleryData, setGalleryData] = useState([]);
  const { scrollY } = useScroll();
  const [titleOpacity, setTitleOpacity] = useState(10);
  const threshold = 200;

  useMotionValueEvent(scrollY, "change", (y) => {
    setTitleOpacity(y > threshold ?  0: 1);
  });

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const modules = import.meta.glob('../data/landing-page/*.json');

    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default; // JSON files export their content as default
        })
      );

      // Sort the data by the 'order' field after loading
      const sortedData = entries
        .sort((a, b) => a.order - b.order); // Sort by 'order' field

      setGalleryData(sortedData); // Set the sorted data into state
    };

    loadData();
  }, []); // Empty dependency array to run once on component mount

  return (
      <>
        <Header/>
        <main>
          <section>
            <motion.h1
              // animate={{ opacity: titleOpacity }}
              // transition={{
              //   duration: 0.5,
              //   ease: "easeOut",
              // }}
              className="fixed flex flex-col md:flex-row gap-2 md:gap-10 leading-tight pointer-events-none
                  pl-4 md:pl-8 pt-12 md:pt-24 mix-blend-difference z-10
                  text-[3vh] md:text-[5vw]"
            >
              <div>
                <MaskText phrase={"Allen C. Topolski"} delay={0.5} duration={1.2} />
              </div>
              <div className="flex flex-col w-[45vw] md:w-[35vw] ml-11 md:ml-0 text-customOrange">
                <MaskText phrase={"(re)collecting"} delay={0.8} duration={1.2} />
                <span className="text-right"><MaskText phrase={"objects"} delay={0.9} duration={1.2} /></span>
              </div>
            </motion.h1>
            <ParallaxGallery galleryData={galleryData} />
          </section>
        </main>
        <Footer/>
      </>
  );
};

export default Index;