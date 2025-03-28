import Header from '../components/Header.jsx';
import FloatingGallery from '../components/FloatingGallery.jsx';
import appliancesData from '../data/AppliancesData.jsx';
import Footer from '../components/Footer.jsx';

const Appliances = () => {

  return (
    <>
      <Header/>
      <main>
        <FloatingGallery>
          {appliancesData.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-[8vw] h-auto object-cover pointer-events-none"
              />
            </div>
          ))}
        </FloatingGallery>
      </main>
      <Footer/>
    </>
  );

};

export default Appliances;