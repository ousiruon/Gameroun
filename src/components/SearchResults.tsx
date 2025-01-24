import { useSearchParams } from "react-router";
import Categories from "./Categories";
import Games from "./Games/Games";
import { useData } from "../assets/store/store";
import { useEffect } from "react";
import { containerVariants } from "./IndexPage";
import { motion } from "motion/react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { setSearching, setSearchQuery } = useData();
  const query = searchParams.get("query");
  useEffect(() => {
    {
      if (query) {
        setSearching(true);
        setSearchQuery(query);
      } else {
        setSearching(false);
      }
    }
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
        className="w-10/12 py-5  flex flex-col max-sm:w-full"
      >
        <h1 className="text-3xl font-bold pb-6">
          {query ? `Searching results for: ${query}` : ""}
        </h1>
        <Games />
      </motion.div>
    </>
  );
};

export default SearchResults;
