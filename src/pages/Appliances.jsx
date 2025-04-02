import Header from '../components/Header.jsx';
import AppliancesData from '../data/AppliancesData.jsx';
import Footer from '../components/Footer.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';
import { MaskText } from '../components/MaskText.jsx';

const Appliances = () => {

  return (
    <>
      <Header/>
      <main>
        <h1 className="absolute top-32 left-40 text-5xl leading-normal">
          <MaskText phrase={"Appliances"} duration={1.0} delay={1.0}/>
        </h1>
        <VerticalScrollGallery images={AppliancesData} />
      </main>
      {/*<Footer/>*/}
    </>
  );

};

export default Appliances;