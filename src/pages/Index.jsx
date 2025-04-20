import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import ParallaxGallery from '../components/ParallaxGallery.jsx';

const Index = () => {

  const [galleryData, setGalleryData] = useState([]);

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
              className="fixed flex flex-col md:flex-row gap-2 md:gap-10 leading-none pl-4 md:pl-8 pt-12 md:pt-24 mix-blend-difference z-10
                text-[3vh] md:text-[5vw] "
              initial={{opacity: 0}}
              animate={{opacity: 0.85}}
              transition={{
                duration: 0.5,
                delay: 1.0,
                ease: "easeIn",
              }}
            >
              <p>Allen Topolski</p>
              <p className="flex flex-col w-[45vw] md:w-[35vw] ml-11 md:ml-0 text-customOrange">
                <span>(re)collecting</span>
                <span className="text-right">objects</span>
              </p>
            </motion.h1>
            <ParallaxGallery galleryData={galleryData} />
          </section>
        </main>
        <Footer/>
      </>
  );
};

export default Index;