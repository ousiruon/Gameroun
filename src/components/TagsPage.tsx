import { useParams } from "react-router";
import Categories from "./Categories";
import Games from "./Games/Games";
import { containerVariants } from "./IndexPage";
import { motion } from "motion/react";

const TagsPage = () => {
  const params = useParams<{ tagSlug: string }>();
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
        className="w-10/12 py-5 flex flex-col max-sm:w-full"
      >
        <h1 className="text-3xl font-bold pb-6">
          {params.tagSlug ? `Results for tag: #${params.tagSlug}` : ""}
        </h1>
        <Games />
      </motion.div>
    </>
  );
};
export default TagsPage;
