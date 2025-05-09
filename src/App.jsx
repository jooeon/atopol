import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ReactLenis } from 'lenis/react'
import { isMobile } from "react-device-detect";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import PropTypes from "prop-types";
import { useEffect, useRef } from 'react';
import ArtworkDetailSimple from './components/templates/ArtworkDetailSimple.jsx';
import Installations from './pages/Installations.jsx';
import Objects from './pages/Objects.jsx';
import Tangents from './pages/Tangents.jsx';
import { CursorProvider } from './components/cursor/CursorContext.jsx';
import Cursor from './components/cursor/Cursor.jsx';
import ArtworkGroupGallery from './components/templates/ArtworkGroupGallery.jsx';
import Extended from './pages/Extended.jsx';
import Page404 from './pages/Page404.jsx';

// animations for entering and exiting each page
const navVariants = {
  enter: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.4, ease: "easeIn" },
  },
  exit: {
    opacity: 0,
    transition: { delay: 0, duration: 0.4, ease: "easeOut" },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/installations" element={<PageWrapper><Installations /></PageWrapper>} />
        <Route path="/objects" element={<PageWrapper><Objects /></PageWrapper>} />
        <Route path="/tangents" element={<PageWrapper><Tangents /></PageWrapper>} />
        <Route path="/tangents/:artworkGroup" element={<PageWrapper><ArtworkGroupGallery /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/about/extended" element={<PageWrapper><Extended /></PageWrapper>} />
        <Route path="/:artworkGroup/:artworkTitle" element={<PageWrapper><ArtworkDetailSimple /></PageWrapper>} />
        <Route path="/404" element={<Page404 />} />
        {/* catch‑all: redirect to /404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
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
    <ReactLenis
      root
      options={{
        lerp:         0.075,    // default 0.1, smaller=slower catch-up
        wheelMultiplier:  0.75, // default 1
      }}
    >
      <BrowserRouter>
        <CursorProvider>
          <AnimatedRoutes />
          {!isMobile && <Cursor />}
        </CursorProvider>
      </BrowserRouter>
    </ReactLenis>
  );
};

export default App;
