import { motion } from "motion/react";
const Loader = () => {
  const variants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -5,
    },
  };
  return (
    <>
      <motion.div className="w-full flex justify-center gap-1 py-2">
        {[...Array(3)].map((_, index) => (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              delay: index,
              duration: 0.3,
            }}
            key={index}
            className="w-2 h-2 dark:bg-darkMainColor bg-lightMainColor rounded-full"
          ></motion.div>
        ))}
      </motion.div>
    </>
  );
};
export default Loader;
