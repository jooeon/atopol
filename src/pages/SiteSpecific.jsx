import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';

const SiteSpecific = () => {
  const [siteSpecificData, setSiteSpecificData] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from the folder
    const modules = import.meta.glob('../data/site-specific/*.json');
    console.log("Modules found:", modules); // Check this in the browser console
    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.default;  // JSON files export their content as default
        })
      );
      setSiteSpecificData(entries);
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      {siteSpecificData.length > 0 ? (
        <VerticalScrollGallery images={siteSpecificData} title={"Site-Specific"} />
      ) : (
        <div className="h-screen w-full flex justify-center items-center text-[1vw]">
          <p>Failed to load artwork data...</p>
        </div>
      )}
    </>
  );
};

export default SiteSpecific;