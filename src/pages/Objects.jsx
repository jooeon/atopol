import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/templates/VerticalScrollGallery.jsx';

const Objects = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [appliancesIndex, setAppliancesIndex] = useState(0);

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const appliancesModules = import.meta.glob('../data/appliances/*.json');
    const copingModules = import.meta.glob('../data/coping-mechanisms/*.json');

    const loadData = async () => {
      const appliancesData = await Promise.all(
        Object.values(appliancesModules).map(async (importer) => {
          const mod = await importer();
          return mod.default; // Get the data from the default export of each JSON file
        })
      );

      const copingData = await Promise.all(
        Object.values(copingModules).map(async (importer) => {
          const mod = await importer();
          return mod.default; // Get the data from the default export of each JSON file
        })
      );

      // Combine the data, with site-specific first and small-scale next
      const combined = [...appliancesData, ...copingData];
      setCombinedData(combined);

      // Set the index where the site-specific items end, and small-scale items begin
      setAppliancesIndex(appliancesData.length);
    };

    loadData();
  }, []);

  return (
    <>
      <Header />
      {combinedData.length > 0 ? (
        <>
          <VerticalScrollGallery
            data={combinedData}
            title={"Objects"}
            skipIndex={appliancesIndex}
          />
        </>
      ) : (
        <div className="h-screen w-full flex justify-center items-center text-[1vw]">
          <p>Loading data...</p>
        </div>
      )}
    </>
  );
};

export default Objects;