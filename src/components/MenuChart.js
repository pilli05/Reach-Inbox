import React from "react";

const MenuChart = ({ activeTheme }) => {
  return (
    <div
      className={
        activeTheme === "light-theme"
          ? "bg-white text-black flex justify-center items-center w-full px-3 md:px-0 font-bold"
          : "flex justify-center items-center w-full px-3 md:px-0 font-bold"
      }
    >
      Chart Section
    </div>
  );
};

export default MenuChart;
