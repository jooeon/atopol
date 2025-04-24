import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  const prevRootRef = useRef(null);

  useEffect(() => {
    // extract the "root" segment of path
    const segments = pathname.split('/');
    const currentRoot = segments[1] || '';

    // on first mount, prevRootRef.current will be null
    // only auto scroll up on navigation if roots are different
    if (prevRootRef.current !== null && prevRootRef.current !== currentRoot) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // remember for next time
    prevRootRef.current = currentRoot;
  }, [pathname]);

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
          {!isMobile && <Cursor />}
        </CursorProvider>
      </BrowserRouter>
    </ReactLenis>
  );
};

export default App;
