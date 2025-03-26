import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';

const Index = () => {
    return (
        <>
          <Header/>
          <main>
            <Carousel />
            <h1 className="text-[7vw] uppercase">
              <div>Recollecting Objects</div>
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