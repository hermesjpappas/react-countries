import { useState, useEffect } from 'react'

export default function useDarkMode() {

  //check if the theme is dark in local storage already
  const [darkMode, setDarkMode] = useState(
    () => localStorage.theme === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  useEffect(() => {

    //get the html element
    const html = window.document.documentElement;

    //find out what the previous theme was, remove it
    const prevTheme = darkMode ? "light" : "dark";
    html.classList.remove(prevTheme);

    //add the opposite theme
    const nextTheme = darkMode ? "dark" : "light";
    html.classList.add(nextTheme);

    //add it to local storage
    localStorage.setItem("theme", nextTheme);

  }, [darkMode]);

  return [darkMode, toggleDarkMode];

}
