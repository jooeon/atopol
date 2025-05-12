import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion } from "framer-motion";
import { MaskText } from '../components/MaskText.jsx';
import exhibitionsData from '../data/exhibitions-about.json';
import { Fragment, useEffect, useState } from 'react';
import { formatNewline, scrollToTop } from '../Utils.jsx';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const About = () => {

  const [scrollY, setScrollY] = useState(0); // Track the scroll position
  const speed = -0.1

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  // always begin page from top on load
  const lenis = useLenis();

  useEffect(() => {
    scrollToTop(lenis);
  }, [lenis]);

  return (
    <>
      <Header/>
      <main>
        <section>
          <motion.img
            src="/images/about/allen_topolski_portrait.jpg"
            alt="Portrait of Allen C. Topolski"
            className="relative w-full h-auto object-cover"
            style={{
              // clipping image from the bottom to emulate parallax effect of bottom section covering image
              // this is due to grain background not being able to be applied to the section
              clipPath: `inset(0px 0px ${-scrollY * speed}px 0px)`,
            }}
          />
        </section>
        <motion.section
          // this section scrolls up quicker than scroll, displaying parallax effect
          style={{
            transform: `translateY(${scrollY * speed}px)`,
          }}
        >
          <div className="flex justify-between w-full h-full p-3 md:p-8 xl:p-10 3xl:p-16">
            <motion.h2
              className="text-[3vh] md:text-[5vw] leading-none"
            >
              <MaskText phrase={"Bio"} duration={1.5}/>
            </motion.h2>
            <div className="flex gap-5 md:gap-10 xl:gap-20 w-10/12 xl:w-3/4
              text-4xs sm:text-3xs md:text-sm 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">
              <div>
                <p>Allen C. Topolski considers himself the foremost expert on himself and the most qualified person
                  for the task of distilling the ideas inside his head; Topolski attended Bucknell University and
                  Penn State where he learned several ways of doing this. He has been a Professor at the
                  University of Rochester for over twenty years where he attempts to teach others their own ways.</p>
                <br />
                <p>Abandoned collieries and vacated factories of central Pennsylvania formed part of the environment
                  of Topolski’s youth – explorations there are unequivocally linked to his art production.
                  Augmented by the exaggeration and distortion that accompanies memory, the routine reiterations
                  of the ‘fact’ that “those days” were better than “these” results in an ingrained longing for the past
                  and an unwilling acceptance of the present as well as the inevitable. This, in turn, fosters a
                  disconcerting susceptibility to nostalgia and Topolski finds himself coveting the decayed, feigning the
                  familiar and writing about himself in the third person.</p>
              </div>
              <div className="text-customGrayLight">
                <p>The objects and images I make tap the familiar. They are constructed primarily of found
                  materials or objects that are reworked and combined through a variety of transformative activities.
                  They have associations that are sometimes transparent – wheels, hanging devices, etc. – that
                  point directly to stasis, stability or mobility. Other associations are ephemeral and imbedded;
                  they are often nearly consumed in the process of making but maintain vestiges of the objects’
                  former function. In striving to recognize an object, which seemingly has all the visual qualities
                  of a real world object, viewers are forced to call up associative memories – to peruse mental
                  inventories of the experiences that constitute their histories. All our performed experiences and
                  imagined times (past or future) are inextricably linked to the objects and spaces that comprise our
                  environment. My art is both the transformed material evidence of my past and a surrogate for the
                  missing. I draw on images, objects, and memories to form reliquaries of unconscious associations.</p>
                <br />
                <Link to="/about/extended" className="col-start-2 text-customOrange mt-2">Extended Essay →</Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full h-full p-3 md:p-8 xl:p-10 3xl:p-16">
            <motion.h2
              className="text-[5vw] leading-none"
            >
              <MaskText phrase={'Exhibitions'} duration={1.5} />
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-[1fr_8fr] grid-rows-[min]
                              gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                              h-fit w-7/12 xl:pt-5
                              text-4xs sm:text-3xs md:text-sm 3xl:text-lg 5xl:text-2xl 6xl:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.9,
                ease: "easeOut",
              }}
            >
              {exhibitionsData.exhibitions.map((exhibition, index) => {
                return (
                  <Fragment key={index}>
                    <div className={`col-start-1 row-start-${index+1} text-customGrayLight`}>
                      {exhibition.year}
                    </div>
                    <div className={`col-start-2 row-start-${index+1} whitespace-pre-line`}>
                      {formatNewline(exhibition.description)}
                    </div>
                  </Fragment>
                );
              })}
              <Link to="/files/Vitae_2024-1.pdf" target="_blank" className="col-start-2 text-customOrange mt-2">Curriculum Vitae ↗</Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default About;