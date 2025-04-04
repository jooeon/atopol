import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';

const Installations = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [siteSpecificIndex, setSiteSpecificIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current index

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

  // Function to skip to the site-specific items
  const skipToSiteSpecific = () => {
    setCurrentIndex(0); // Set the index to 0 for the first site-specific item
  };

  // Function to skip to the small-scale items
  const skipToSmallScale = () => {
    setCurrentIndex(siteSpecificIndex); // Set the index to the first small-scale item
  };

  return (
    <>
      <Header />
      {combinedData.length > 0 ? (
        <>
          {/* Buttons to skip between groups */}
          <div className="absolute top-96 flex justify-center my-4">
            <button onClick={skipToSiteSpecific} disabled={siteSpecificIndex === 0}>
              Skip to Site-Specific
            </button>
            <button onClick={skipToSmallScale} disabled={siteSpecificIndex === combinedData.length}>
              Skip to Small Scale
            </button>
          </div>

          <VerticalScrollGallery
            images={combinedData}
            title={"Installations"}
            newIndex={currentIndex} // Pass newIndex to skip to
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
