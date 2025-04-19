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
    console.log("Modules found:", modules); // Check this in the browser console
    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default;  // JSON files export their content as default
        })
      );
      setGalleryData(entries);
    };
    loadData();
  }, []);

  return (
      <>
        <Header/>
        <main>
          <section>
            <motion.h1
              className="fixed flex gap-10 text-[5vh] xl:text-[5vw] leading-none pl-8 pt-24 mix-blend-difference z-10"
              initial={{opacity: 0}}
              animate={{opacity: 0.85}}
              transition={{
                duration: 0.5,
                delay: 1.0,
                ease: "easeIn",
              }}
            >
              <p>Allen Topolski</p>
              <p className="flex flex-col w-[30vh] xl:w-[35vw] text-customOrange">
                <span>(re)collecting</span>
                <span className="text-right">objects</span>
              </p>
            </motion.h1>
            <ParallaxGallery galleryData={galleryData} />
          </section>
        </main>
        {/*<Footer/>*/}
      </>
  );
};

export default Index;