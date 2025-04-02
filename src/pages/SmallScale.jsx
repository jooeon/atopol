import Header from '../components/Header.jsx';
import { MaskText } from '../components/MaskText.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';
import SmallScaleData from '../data/SmallScaleData.jsx';

const SmallScale = () => {

  return (
    <>
      <Header/>
      <main>
        <h1 className="absolute top-32 left-40 text-5xl leading-normal">
          <MaskText phrase={"Small-Scale"} duration={1.0} delay={1.0}/>
        </h1>
        <VerticalScrollGallery images={SmallScaleData} />
      </main>
      {/*<Footer/>*/}
    </>
  );

};

export default SmallScale;