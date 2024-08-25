import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ loader, activeTheme }) => {
  return (
    <div>
      {loader ? (
        <div
          className={
            activeTheme === "light-theme"
              ? "fixed inset-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-70 z-50"
              : "fixed inset-0 h-screen w-screen flex justify-center items-center bg-white bg-opacity-60 z-50"
          }
        >
          {/* loader component */}
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color={activeTheme === "light-theme" ? "white" : "black"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
