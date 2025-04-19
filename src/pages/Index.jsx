import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
          <section className="">
            <motion.h1
              className="fixed flex gap-10 text-[5vh] xl:text-[5vw] leading-none pl-8 pt-24 mix-blend-difference"
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
            <div className="flex flex-col h-full">
              {galleryData.map((artwork, index) => (
                <Link
                  to=""
                  key={index}
                  className="y-scroll-item flex"
                >
                  <motion.img
                    src={artwork.image}
                    alt={`Image of ${artwork.title}`}
                    className="w-full max-w-[30vw] object-cover object-top"
                    initial={{opacity: 0, y: 80}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                      duration: 0.5,
                      delay: 1.6,
                      ease: "easeOut",
                    }}
                  />
                </Link>
              ))}
            </div>
          </section>
        </main>
        <Footer/>
      </>
  );
};

export default Index;