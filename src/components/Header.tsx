import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Link, Outlet, useNavigate } from "react-router";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import DarkMode from "./Header/DarkMode";
import { useData } from "../assets/store/store";
import { FormEvent, useState } from "react";

const Header = () => {
  const { darkMode, setMode, searchQuery } = useData();
  const transition = {
    duration: 0.5,
    ease: "easeInOut",
    type: "spring",
    stiffness: 200,
  };
  const variants = {
    initial: {
      y: 0,
      x: 0,
    },
    animateG: {
      y: -4,
      x: 1,
      transition,
    },
    animateR: {
      y: 4,
      x: -1,
      transition,
    },
    initialShape: {
      rotate: 0,
    },
    animateShape: {
      rotate: "45deg",
      transition: {
        delay: 0.5,
        transition,
      },
    },
    logoHover: {
      scale: 0.9,
      transition,
    },
    iconsHover: {
      scale: 0.95,
      transition,
    },
  };
  const navigate = useNavigate();
  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("searchQuery")?.toString().trim();
    if (query && query.length > 2) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      e.currentTarget.searchQuery.value = "";
    }
  };
  const [stickyHeader, setStickyHeader] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  });
  return (
    <>
      <motion.header
        animate={
          stickyHeader
            ? { position: "fixed", scaleY: 0.95, y: -5 }
            : { position: "relative" }
        }
        transition={{
          ease: "easeOut",
          type: "spring",
          stiffness: 50,
        }}
        className={`flex w-full dark:bg-darkBgColor bg-lightBgColor dark:text-darkMainColor text-lightMainColor text-light text-xl p-5 ${
          stickyHeader ? "py-6" : ""
        } gap-5 z-50`}
      >
        <Link to="/">
          <motion.div
            variants={variants}
            whileHover="logoHover"
            className="logo font-['Audiowide'] flex text-4xl dark:text-darkSecondMainColor text-lightSecondMainColor relative"
          >
            <motion.div
              variants={variants}
              initial="initialShape"
              animate="animateShape"
              className="absolute border w-full h-full dark:border-darkSecondMainColor border-lightSecondMainColor"
            ></motion.div>
            <motion.div variants={variants} initial="intial" animate="animateG">
              G
            </motion.div>
            <motion.div variants={variants} initial="intial" animate="animateR">
              R
            </motion.div>
          </motion.div>
        </Link>
        <div className="flex w-full items-center justify-center gap-5">
          <form onSubmit={submitSearch} className="w-11/12 max-md:w-10/12">
            <input
              className="w-full focus:outline-none text-xs rounded px-5 py-2 dark:bg-secondDarkBgColor dark:text-darkMainColor dark:placeholder:text-darkMainColor bg-secondLightBgColor text-lightMainColor placeholder-lightMainColor"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search Games..."
              type="text"
              defaultValue={searchQuery ? searchQuery : ""}
            />
          </form>
          <div className="w-1/12 flex items-center justify-end gap-5 max-md:gap-2 max-md:w-2/12">
            <Link to="/randomGame">
              <motion.div variants={variants} whileHover="iconsHover">
                <GiPerspectiveDiceSixFacesRandom size={24} />
              </motion.div>
            </Link>
            <motion.div
              onClick={() => setMode(!darkMode)}
              variants={variants}
              whileHover="iconsHover"
            >
              <DarkMode />
            </motion.div>
          </div>
        </div>
      </motion.header>
      <main className="flex dark:bg-secondDarkBgColor bg-secondLightBgColor dark:text-darkMainColor text-lightMainColor text-light w-full justify-center min-h-screen">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </main>
    </>
  );
};
export default Header;
