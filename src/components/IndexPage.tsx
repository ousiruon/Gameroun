import { useEffect } from "react";
import Categories from "./Categories";
import Games from "./Games/Games";

const IndexPage = () => {
  useEffect(() => {
    document.title = "GameRoun";
  }, []);
  return (
    <>
      <div className="w-2/12 p-5 max-sm:hidden">
        <Categories />
      </div>
      <div className="w-10/12 py-5 max-sm:w-full">
        <Games />
      </div>
    </>
  );
};

export default IndexPage;
