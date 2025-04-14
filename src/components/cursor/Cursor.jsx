import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight * 3 / 4 });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const { isLinkHovered, isContentHovered, isClicked, leftViewport } = useCursor();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cursorVariants = {
    initial: { scale: 1, opacity: 0 },
    default: { scale: 1, opacity: 0.8, transition: { duration: 0.2, ease: "easeIn" }, },
    linkHover: { scale: 1.5, opacity: 1, transition: { duration: 0.1, ease: "easeIn" }, },
    contentHover: {
      scale: isSmallScreen ? 2.0 : 3.0,
      opacity: 0.8,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    click: { scale: 0.8, opacity: 1,},
    leftViewport: { scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeOut" }, },
  };

  const getCursorVariant = () => {
    if (isLinkHovered) return "linkHover";
    if (isContentHovered) return "contentHover";
    if (isClicked) return "click";
    if (leftViewport) return "leftViewport";
    return "default";
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 flex items-center justify-center z-30 w-5 h-5
                bg-customWhite backdrop-blur-xs pointer-events-none rounded-full`}
      variants={cursorVariants}
      initial="initial"
      animate={getCursorVariant()}
      style={{ x: position.x - 8, y: position.y - 8 }}
    >
    </motion.div>
  );
};

export default Cursor;
