import React from "react";

const MenuSearch = ({ activeTheme }) => {
  return (
    <div
      className={
        activeTheme === "light-theme"
          ? "bg-white text-black flex justify-center items-center w-full px-3 md:px-0 font-bold"
          : "flex justify-center items-center w-full px-3 md:px-0 font-bold"
      }
    >
      Search Section
    </div>
  );
};

export default MenuSearch;
