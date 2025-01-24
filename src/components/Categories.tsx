import { useEffect, useState } from "react";
import { fetchCategories, useData } from "../assets/store/store";
import { NavLink } from "react-router";
export interface CategoriesProps {
  id: number;
  name: string;
  image_background: string;
}
const Categories = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const { apiKey } = useData();
  useEffect(() => {
    const fetchedCategories = async () => {
      const returnedCategories = await fetchCategories(apiKey);
      setCategories(returnedCategories.results);
      localStorage.setItem(
        "categories",
        JSON.stringify(returnedCategories.results)
      );
    };
    if (localStorage.getItem("categories")) {
      const fetchedCategories = JSON.parse(
        localStorage.getItem("categories") as string
      );
      setCategories(fetchedCategories);
    } else {
      fetchedCategories();
    }
  }, []);
  return (
    <>
      <div className="cats flex flex-col gap-4 font-bold sticky top-[100px] left-0 h-screen overflow-scroll">
        <h1 className="text-2xl">Genres</h1>
        {categories && categories.length > 0
          ? categories.map((e) => (
              <NavLink
                key={e.id}
                to={`/category/${e.name}/${e.id}`}
                className={({ isActive }) => {
                  return isActive
                    ? "underline font-extrabold dark:text-darkSecondMainColor text-lightSecondMainColor tracking-wider ease-in duration-500 transition-all"
                    : "hover:underline hover:font-extrabold hover:dark:text-darkSecondMainColor hover:text-lightSecondMainColor hover:tracking-wider ease-in duration-500 transition-all";
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-[25px] h-[25px] max-lg:hidden">
                    <img
                      src={e.image_background}
                      alt={`${e.name} Background Image`}
                      className="w-full h-full rounded object-cover"
                    />
                  </div>
                  <div>{e.name}</div>
                </div>
              </NavLink>
            ))
          : ""}
      </div>
    </>
  );
};

export default Categories;
