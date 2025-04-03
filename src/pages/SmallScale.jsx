import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';

const SmallScale = () => {
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
        <div className="h-screen w-full flex justify-center items-center text-[1vw]">
          <p>Loading data...</p>
        </div>
      )}
    </>
  );
};

export default SmallScale;