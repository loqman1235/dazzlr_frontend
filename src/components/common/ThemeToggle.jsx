import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { toggleDarkMode } from "../../features/themeSlice";

const ThemeToggle = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };



  return (
    <button
      className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5"
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <MoonIcon className="h-5 w-5 stroke-2" />
      ) : (
        <SunIcon className="h-5 w-5 stroke-2" />
      )}
    </button>
  );
};
export default ThemeToggle;
