import { useEffect, useState } from "react";
import { fetchCategories, useData } from "../assets/store/store";
import { NavLink } from "react-router";
import { useMotionValueEvent, useScroll } from "motion/react";
// Interface for each category
export interface CategoriesProps {
  id: number;
  name: string;
  image_background: string;
}
// Categories component
// This component is used to show a list of categories, the categories are fetched from the API and stored in local storage
// and then displayed in a sidebar
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

  const [stickySideMenu, setStickySideMenu] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setStickySideMenu(true);
    } else {
      setStickySideMenu(false);
    }
  });
  return (
    <>
      <div className={`cats flex flex-col gap-4 font-bold overflow-scroll ${stickySideMenu ? "fixed top-[100px] left-5 bottom-0 pb-5 w-2/12" : ""}`}>
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
