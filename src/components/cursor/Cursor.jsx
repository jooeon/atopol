import { useState, useEffect } from "react";
import { motion, useMotionValue } from 'framer-motion';
import { useCursor } from "./CursorContext";

const Cursor = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const { isLinkHovered, isVideoHovered, isClicked, leftViewport } = useCursor();

  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Replace mouseX, mouseY in style below to springX, springY to enable momentum on cursor (also should show normal OS cursor)
  // Apply smoothing/spring to the motion values
  // const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.3 });
  // const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 8); // Offset to center the cursor
      mouseY.set(e.clientY - 8);
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
    initial: { scale: 0.5, opacity: 0 },
    default: { scale: 0.5, opacity: 0.8, transition: { duration: 0.2, ease: "easeIn" },  },
    linkHover: {
      scale: isSmallScreen ? 1.5 : 2.5,
      opacity: 0.8,
      // backgroundColor: "#e81737",
      transition: { duration: 0.15, ease: "linear" },
    },
    videoHover: { scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeOut" }, },
    click: { scale: 0.8, opacity: 1,},
    leftViewport: { scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeOut" }, },
  };

  const getCursorVariant = () => {
    if (isLinkHovered) return "linkHover";
    if (isVideoHovered) return "videoHover";
    if (isClicked) return "click";
    if (leftViewport) return "leftViewport";
    return "default";
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 flex items-center justify-center z-50 w-5 h-5
                bg-customWhite mix-blend-difference pointer-events-none rounded-full`}
      variants={cursorVariants}
      initial="initial"
      animate={getCursorVariant()}
      style={{ x: mouseX, y: mouseY }}
    >
    </motion.div>
  );
};

export default Cursor;
