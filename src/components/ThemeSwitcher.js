import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../contexts/ThemeContext";

/**
 * ThemeSwitcher component that provides a button to toggle the theme
 * @returns {JSX.Element} The ThemeSwitcher component
 */
function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        className="hover:bg-gray-700 dark:hover:bg-gray-500 text-white font-bold py-2 px-2 rounded-full"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <>
            <MoonIcon className="h-5 w-5"></MoonIcon>
          </>
        ) : (
          <SunIcon className="h-5 w-5"></SunIcon>
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
