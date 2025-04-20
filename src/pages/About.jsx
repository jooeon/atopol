import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion } from "framer-motion";
import { MaskText } from '../components/MaskText.jsx';

const Index = () => {
  return (
    <>
      <Header/>
      <main>
        <section className="w-full h-full">
          <img src="/images/about/allen_topolski_portrait.jpg" alt="Portrait of Allen Topolski"/>
        </section>
        <section className="flex justify-between w-full h-full p-10">
          <motion.h2
            className="text-[5vw] leading-none"
          >
            <MaskText phrase={"Bio"} duration={1.5} isAnimateInView={true}/>
          </motion.h2>
          <div className="flex gap-20 w-3/4">
            <div className="text-sm">
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
            <div className="text-sm text-customGrayLight">
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
            </div>
          </div>
        </section>
        <section className="flex justify-between w-full h-full p-10">
          <motion.h2
            className="text-[5vw] leading-none"
          >
            <MaskText phrase={"Exhibitions"} duration={1.5} isAnimateInView={true}/>
          </motion.h2>
          <motion.div
            className="sticky top-0 grid md:grid-cols-[1fr_8fr] grid-rows-[min]
                            gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                            h-fit w-7/12
                            text-5xs xs:text-5xs md:text-xs lg:text-base xl:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.9,
              ease: "easeOut",
            }}
          >
            {galleryData.map((artwork, index) => {
              return (
                <div key={index}>
                  <div className="col-start-1 row-start-1">
                    <MaskText phrase={""} delay={1.25} duration={1.0} />
                  </div>
                  <div className="col-start-1 row-start-2">
                    <MaskText phrase={""} delay={1.25} duration={1.0} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;