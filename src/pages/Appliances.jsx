import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';

const Appliances = () => {
  const [appliancesData, setAppliancesData] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const modules = import.meta.glob('../data/appliances/*.json');
    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default;  // JSON files export their content as default
        })
      );
      setAppliancesData(entries);
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      {appliancesData.length > 0 ? (
        <VerticalScrollGallery data={appliancesData} title={"Appliances"} />
      ) : (
        <div className="h-screen w-full flex justify-center items-center text-[1vw]">
          <p>Failed to load artwork data...</p>
        </div>
      )}
    </>
  );
};

export default Appliances;