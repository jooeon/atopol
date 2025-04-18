import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ReactLenis } from 'lenis/react'
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import PropTypes from "prop-types";
import {useEffect} from "react";
import ArtworkDetailSimple from './components/ArtworkDetailSimple.jsx';
import Installations from './pages/Installations.jsx';
import Objects from './pages/Objects.jsx';
import Tangents from './pages/Tangents.jsx';
import { CursorProvider } from './components/cursor/CursorContext.jsx';
import Cursor from './components/cursor/Cursor.jsx';
import ArtworkGroupGallery from './components/ArtworkGroupGallery.jsx';

// animations for entering and exiting each page
const navVariants = {
  enter: {
    opacity: 1,
    transition: { delay: 0.6, duration: 0.3, ease: "easeIn" },
  },
  exit: {
    opacity: 0,
    transition: { delay: 0, duration: 0.3, ease: "easeOut" },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation(); // Get current location from Router

  useEffect(() => {
    // This will run whenever the location changes (e.g., navigation)
    window.scrollTo(0, 0); // Scroll to top on mount and route change

    // Optional: smoother scroll
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth' // Optional smooth scrolling
    // });

  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/:artworkGroup/:artworkTitle" element={<PageWrapper><ArtworkDetailSimple /></PageWrapper>} />
        <Route path="/installations" element={<PageWrapper><Installations /></PageWrapper>} />
        <Route path="/objects" element={<PageWrapper><Objects /></PageWrapper>} />
        <Route path="/tangents" element={<PageWrapper><Tangents /></PageWrapper>} />
        <Route path="/tangents/:artworkGroup" element={<PageWrapper><ArtworkGroupGallery /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={navVariants}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {

  useEffect(() => {
    // Default to dark theme
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ReactLenis root>
      <BrowserRouter>
        <CursorProvider>
            <AnimatedRoutes />
            <Cursor />
        </CursorProvider>
      </BrowserRouter>
    </ReactLenis>
  );
};

export default App;
