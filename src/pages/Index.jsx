import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';
import { MaskText } from '../components/MaskText.jsx';
import { motion } from "framer-motion";

const Index = () => {
    return (
        <>
          <Header/>
          <main>
            <Carousel />
            <section className="py-20">
              <h1 className="text-[10vw] uppercase leading-none px-5">
                <div className="flex">
                  <motion.span
                    className="text-customGrayLighter dark:text-customGray"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{once: true}}
                    transition= {{
                      duration: 0.75,
                      ease: "easeIn",  // easeOutQuart
                      delay: 0.75,
                    }}
                  ><MaskText phrase={"Re"} /></motion.span>
                  <MaskText phrase={"collecting"} />
                </div>
                <div className="ml-20"><MaskText phrase={"Objects"} /></div>
              </h1>
            </section>
            <section>
              <div></div>
            </section>
          </main>
          <Footer/>
        </>
    );
};

export default Index;