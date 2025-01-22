import { useParams } from "react-router";
import Categories from "./Categories";
import Games from "./Games/Games";
import { useEffect } from "react";

const CategoryPage = () => {
  const params = useParams<{ categoryName: string; categoryId: string }>();
  useEffect(() => {
    document.title = `${params.categoryName} - GameRoun`;
  }, []);
  return (
    <>
      <div className="w-2/12 p-5 max-sm:hidden">
        <Categories />
      </div>
      <div className="w-10/12 py-5 flex flex-col max-sm:w-full">
        <h1 className="text-3xl font-bold pb-6">
          {params.categoryName}{" "}
          {params.categoryName !== "Board Games" ? "Games" : ""}
        </h1>
        <Games />
      </div>
    </>
  );
};

export default CategoryPage;
