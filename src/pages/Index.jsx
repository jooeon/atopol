import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';
import { MaskText } from '../components/MaskText.jsx';

const Index = () => {
    return (
        <>
          <Header/>
          <main>
            <Carousel />
            <h1 className="text-[8vw] uppercase leading-none px-5">
              <MaskText phrase={"Recollecting"} />
              <div className="ml-20"><MaskText phrase={"Objects"} /></div>
            </h1>
            <section>
              <div></div>
            </section>
          </main>
          <Footer/>
        </>
    );
};

export default Index;