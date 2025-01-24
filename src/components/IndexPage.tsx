import { useEffect } from "react";
import Categories from "./Categories";
import Games from "./Games/Games";
import { motion } from "motion/react";

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const IndexPage = () => {
  useEffect(() => {
    document.title = "GameRoun";
  }, []);
  return (
    <>
      <div className="w-2/12 p-5 max-sm:hidden relative">
        <Categories />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-10/12 py-5 max-sm:w-full"
      >
        <Games />
      </motion.div>
    </>
  );
};

export default IndexPage;
