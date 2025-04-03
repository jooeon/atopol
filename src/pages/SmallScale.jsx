import Header from '../components/Header.jsx';
import { MaskText } from '../components/MaskText.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';
import SmallScaleData from '../data/SmallScaleData.json';

const smallScaleModules = import.meta.glob('../data/small-scale/*.md');

// Function to load all entries
async function loadSmallScaleData() {
  const dataPromises = Object.values(smallScaleModules).map(async (moduleImporter) => {
    const mod = await moduleImporter();
    return mod.default || mod;
  });
  const smallScaleDataArray = await Promise.all(dataPromises);
  return smallScaleDataArray;
}

// Example usage in a component
import { useEffect, useState } from 'react';

const SmallScale = () => {
  const [smallScaleData, setSmallScaleData] = useState([]);

  useEffect(() => {
    loadSmallScaleData().then((data) => {
      setSmallScaleData(data);
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Ensure VerticalScrollGallery expects an array of artwork objects */}
        <VerticalScrollGallery images={smallScaleData} title={"Small Scale"} />
      </main>
    </>
  );
};

export default SmallScale;
