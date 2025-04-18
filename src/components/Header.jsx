import { NavLink, Link, useLocation } from "react-router-dom";
import {motion, useScroll} from "framer-motion";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import LocalTime from './LocalTime.jsx';

const Header = ({delay = 0.4}) => {

  const [isVisible, setIsVisible] = useState(true);   // tracks the visibility of navbar
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 5; // Minimum scroll change to detect direction

  const { scrollYProgress } = useScroll();

  // check if scrolled to bottom of the screen, then set visible true
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change",(latest) => {
      if (latest >= 0.96) {
        setIsVisible(true);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [scrollYProgress]);

  // Handle scroll direction, set visible when scrolling down, hide when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  const getLinkClasses = (path) => {
    if (isLandingPage) {
      // On the landing page, all links are full opacity
      return "text-link";
    }

    if (path === "/about" && isAboutPage) {
      return "text-link";
    }

    // Otherwise, make inactive links greyed out
    return "text-link opacity-50 hover:opacity-100 transition-opacity duration-500";
  };

  return (
    <motion.header
      className="fixed top-0 w-full z-30 mix-blend-difference"
      initial={{y: -100, opacity: 0}}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{
        duration: 1.6,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}>
      <motion.nav
        className="flex items-center justify-between text-4xs sm:text-sm md:text-md xl:text-xl 4xl:text-3xl 6xl:text-4xl p-3 md:p-5 xl:px-7 xl:py-6 4xl:px-10 4xl:py-10 7xl:px-14 7xl:py-14
              font-medium tracking-wide text-customWhite [&_a]:after:bg-customBlack dark:[&_a]:after:bg-customWhite"
      >
        <Link to="/" className="text-link">
          Allen Topolski
        </Link>
        <div className="navbar flex gap-[10vw] xl:gap-[20vw]">
          <ul className="flex gap-1 xl:gap-2 4xl:gap-3">
            <li>
              <NavLink to="/installations" className={() => getLinkClasses("/installations")}>Installations,</NavLink>
            </li>
            <li>
              <NavLink to="/objects" className={() => getLinkClasses("/objects")}>Objects,</NavLink>
            </li>
            <li>
              <NavLink to="/tangents" className={() => getLinkClasses("/tangents")}>Tangents,</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={() => getLinkClasses("/about")}>About</NavLink>
            </li>
          </ul>
          <div className="flex gap-1 md:gap-3 xl:gap-5 font-ds-digi text-customGrayLighter text-4xs sm:text-sm md:text-md xl:text-xl 4xl:text-3xl 6xl:text-4xl">
            <span>Rochester, NY</span>
            <LocalTime />
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

// Add PropTypes validation
Header.propTypes = {
  delay: PropTypes.number,
};

export default Header;
