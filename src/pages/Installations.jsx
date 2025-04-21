import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/templates/VerticalScrollGallery.jsx';

const Installations = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [siteSpecificIndex, setSiteSpecificIndex] = useState(0);

  useEffect(() => {
    // Dynamically import JSON files from both folders
    const siteSpecificModules = import.meta.glob('../data/site-specific/*.json');
    const smallScaleModules = import.meta.glob('../data/small-scale/*.json');

    const loadData = async () => {
      const siteSpecificData = await Promise.all(
        Object.values(siteSpecificModules).map(async (importer) => {
          const mod = await importer();
          return mod.default; // Get the data from the default export of each JSON file
        })
      );

      const smallScaleData = await Promise.all(
        Object.values(smallScaleModules).map(async (importer) => {
          const mod = await importer();
          return mod.default; // Get the data from the default export of each JSON file
        })
      );

      // Combine the data, with site-specific first and small-scale next
      const combined = [...siteSpecificData, ...smallScaleData];
      setCombinedData(combined);

      // Set the index where the site-specific items end, and small-scale items begin
      setSiteSpecificIndex(siteSpecificData.length);
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
            title={"Installations"}
            skipIndex={siteSpecificIndex}
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

export default Installations;
