import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';

const Appliances = () => {
  const [smallScaleData, setSmallScaleData] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const modules = import.meta.glob('../data/small-scale/*.json');
    console.log("Modules found:", modules); // Check this in the browser console
    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default;  // JSON files export their content as default
        })
      );
      setSmallScaleData(entries);
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      {smallScaleData.length > 0 ? (
        <VerticalScrollGallery images={smallScaleData} title={"Small Scale"} />
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
};

export default Appliances;