import { useEffect } from "react";
import { useData } from "../../assets/store/store";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
// DarkMode component
// This component is used to toggle the dark mode
const DarkMode = () => {
  const { darkMode, setMode } = useData();
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? setMode(true)
      : setMode(false);
  }, [darkMode]);
  const setLight = () => {
    localStorage.theme = "light";
    setMode(false);
  };
  const setDark = () => {
    localStorage.theme = "dark";
    setMode(true);
  };
  return (
    <>
      {darkMode ? (
        <MdOutlineLightMode size={24} onClick={setLight} />
      ) : (
        <MdOutlineDarkMode size={24} onClick={setDark} />
      )}
    </>
  );
};
export default DarkMode;
