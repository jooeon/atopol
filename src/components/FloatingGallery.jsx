import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Currently unused
// TODO: find a way to arrange image thumbnails nicely
const FloatingGallery = ({ children }) => {
  // Define constraints for dragging in both x and y directions.
  const constraints = { left: -2000, right: 1000, top: -2000, bottom: 1000 };

  return (
    <div
      className="relative overflow-hidden h-screen"
    >
      <motion.div
        className="flex flex-wrap cursor-grab w-[150vw]"
        drag={true} // Allow dragging in both x and y
        dragConstraints={constraints}
      >
        {children.map((child, index) => (
          <div key={index} className="floating-gallery-item h-fit">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

FloatingGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FloatingGallery;
