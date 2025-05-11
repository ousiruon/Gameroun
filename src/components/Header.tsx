import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import DarkMode from "./Header/DarkMode";
import { useData } from "../assets/store/store";
import { FormEvent, useEffect, useState } from "react";
// Header component
// This component is used to show the header of the app, it contains the logo, search bar and dark mode toggle
const Header = () => {
  // Get the dark mode state and setMode function from the store
  // Get the search query from the store
  const { darkMode, setMode, searchQuery } = useData();
  // Animation variants for the logo and icons
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
  // State to show the tooltip for the random game icon
  // State to delay the tooltip for the random game icon
  const [showToolTip, setShowToolTip] = useState<boolean>(true);
  const [delayToolTip, setDelayToolTip] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setDelayToolTip(true);
    }, 2000);
    setTimeout(() => {
      setShowToolTip(false);
    }, 5000);
  }, []);
  // Function to handle the search form submission
  // This function will navigate to the search page with the query
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
  const [stickyHeader, setStickyHeader] = useState<boolean>(false);
  // State to show the sticky header
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  });
  // Reset the scroll position to the top when the location changes
  // This is done to avoid the scroll position being saved when navigating between pages
  const currentLocation = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [currentLocation]);
  return (
    <>
      <motion.header
        animate={stickyHeader ? { scaleY: 0.95, y: -5 } : {}}
        transition={{
          ease: "easeOut",
          type: "spring",
          stiffness: 50,
        }}
        className={`sticky top-0 left-0 flex w-full dark:bg-darkBgColor bg-lightBgColor dark:text-darkMainColor text-lightMainColor text-light text-xl p-5 ${
          stickyHeader ? "py-6" : ""
        } gap-5 z-40`}
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
            <Link reloadDocument to={"randomGame"}>
              <motion.div
                className="relative"
                variants={showToolTip ? {} : variants}
                whileHover={showToolTip ? {} : "iconsHover"}
              >
                <GiPerspectiveDiceSixFacesRandom size={24} />
                {delayToolTip &&
                  showToolTip &&
                  currentLocation.pathname !== "/randomGame" && (
                    <motion.div className="transition delay-150 duration-300 ease-in bg-secondDarkBgColor dark:bg-secondLightBgColor text-lightBgColor dark:text-darkBgColor absolute right-0 font-bold px-2 py-0.5 rounded-sm text-sm my-2">
                      <div className="absolute top-[-5px] right-2 w-[10px] h-[12px] rotate-45 bg-secondDarkBgColor dark:bg-secondLightBgColor"></div>
                      Feeling lucky?
                    </motion.div>
                  )}
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
