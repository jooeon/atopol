import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import VerticalScrollGallery from '../components/VerticalScrollGallery.jsx';
import { MaskText } from '../components/MaskText.jsx';

const Appliances = () => {
  const [appliancesData, setAppliancesData] = useState([]);

  useEffect(() => {
    // Dynamically import all Markdown files from the folder
    const modules = import.meta.glob('../data/appliances/*.md');
    console.log("Modules found:", modules); // Check this in the browser console
    const loadData = async () => {
      const entries = await Promise.all(
        Object.values(modules).map(async (importer) => {
          const mod = await importer();
          return mod.metadata;
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
        <VerticalScrollGallery images={appliancesData} title={"Appliances"} />
      ) : (
        <p>Loading data...</p>
      )}
      <Footer />
    </>
  );
};

export default Appliances;
