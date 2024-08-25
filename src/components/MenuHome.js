import React from "react";

const MenuHome = ({ activeTheme }) => {
  return (
    <div
      className={
        activeTheme === "light-theme"
          ? "bg-white flex justify-center items-center w-full px-3 md:px-0"
          : "flex justify-center items-center w-full px-3 md:px-0"
      }
    >
      <div className="flex flex-col items-center">
        <img
          src="/assets/no-messages.png"
          alt="no-message"
          className="w-2/3 "
        />
        <h1
          className={
            activeTheme === "light-theme"
              ? "text-gray-700 text-2xl font-bold my-7 text-center"
              : "text-2xl font-bold my-7 text-center"
          }
        >
          It's the beginning of a legendary sales pipeline
        </h1>
        <p
          className={
            activeTheme === "light-theme"
              ? "text-gray-700 font-medium text-base text-center"
              : "text-[#9E9E9E] font-medium text-base text-center"
          }
        >
          When you have inbound E-mails <br />
          you'llsee them here.
        </p>
      </div>
    </div>
  );
};

export default MenuHome;
