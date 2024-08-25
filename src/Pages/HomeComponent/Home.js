import axios from "axios";
import React, { useEffect, useState } from "react";
import IconsList from "../../iconsList/iconsList";
import MenuHome from "../../components/MenuHome";
import MenuSearch from "../../components/MenuSearch";
import MenuEmail from "../../components/MenuEmail";
import MenuPlane from "../../components/MenuPlane";
import Menu from "../../components/Menu";
import MenuChart from "../../components/MenuChart";
import { FaChevronDown } from "react-icons/fa";
import { MdDarkMode, MdOutlineLogout } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import Drawer from "../../components/Drawer";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Loader from "../../loaderComponent/Loader";

const Home = () => {
  const [logOutBox, setLogOutBox] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [activeScreen, setActiveScreen] = useState("light-home");
  const [activeTheme, setActiveTheme] = useState("dark-theme");
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const userData = jwtDecode(token);

  localStorage.setItem("token", token);
  localStorage.setItem("authUser", JSON.stringify(userData?.user));

  const userDetails = localStorage.getItem("authUser");
  const parsedUserDetails = JSON.parse(userDetails);

  const clickedMenu = (activeMenu) => {
    switch (activeMenu?.iconName) {
      case "light-home":
        setActiveScreen("light-home");
        break;
      case "light-search":
        setActiveScreen("light-search");
        break;
      case "light-email":
        setActiveScreen("light-email");
        break;
      case "light-plane":
        setActiveScreen("light-plane");
        break;
      case "light-menu":
        setActiveScreen("light-menu");
        break;
      case "light-chart":
        setActiveScreen("light-chart");
        break;
      case "light-drawer":
        setActiveScreen("light-drawer");
        break;
      default:
        break;
    }
  };

  const logOut = async () => {
    // logout API integration

    const url = "https://hiring.reachinbox.xyz/api/v1/onebox/reset";
    try {
      setLoader(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoader(false);
        toast.success("Logged out successfully!");
        window.location.href = "/login";
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activateDarkTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem("theme", "dark-theme");
    setActiveTheme("dark-theme");
  };

  const activateLightTheme = () => {
    setDarkTheme(!darkTheme);
    setActiveTheme("light-theme");
  };

  return (
    <>
      <Loader loader={loader} activeTheme={activeTheme} />

      <div>
        <div
          className={
            activeTheme === "light-theme"
              ? " h-12 bg-[white] border-b border-b-gray-300 text-black flex items-center"
              : " h-12 bg-[#2F3030]  flex items-center"
          }
        >
          <div className="w-12 h-12 flex justify-center items-center">
            <img
              src={
                activeTheme === "light-theme"
                  ? "/assets/dark-home-logo.png"
                  : "/assets/light-home-logo.png"
              }
              alt="home-logo"
              className="w-5 "
            />
          </div>
          <div className="mx-2 md:mx-5  flex justify-between items-center w-full">
            <h1
              className={
                activeTheme === "light-theme"
                  ? "text-black text-base font-bold"
                  : "text-white text-base font-bold"
              }
            >
              Onebox
            </h1>
            <div className="flex items-center ml-4 md:ml-0 space-x-1 md:space-x-5">
              <div className="flex items-center space-x-1 border border-gray-600 px-1 rounded-full mx-1  md:mx-0">
                {/* dark theme or light theme operation logic */}

                {darkTheme ? (
                  <>
                    <GoDotFill
                      size={30}
                      color="black"
                      onClick={activateDarkTheme}
                      className="cursor-pointer"
                    />
                    <CiLight size={25} color="orange" />
                  </>
                ) : (
                  <>
                    <MdDarkMode size={25} color="yellow" />
                    <GoDotFill
                      size={30}
                      color="white"
                      onClick={activateLightTheme}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </div>
              <div className="relative ">
                <span
                  className={
                    activeTheme === "light-theme"
                      ? "text-black font-semibold text-sm flex  items-center"
                      : "text-white font-semibold text-sm flex  items-center"
                  }
                >
                  {parsedUserDetails?.firstName}'s Workspace{" "}
                  <FaChevronDown
                    color={activeTheme === "light-theme" ? "black" : "white"}
                    size={14}
                    className="ml-2 cursor-pointer"
                    onClick={() => setLogOutBox(!logOutBox)}
                  />
                </span>
                {logOutBox ? (
                  <div
                    className={
                      activeTheme === "light-theme"
                        ? "absolute bg-black text-white top-11 md:top-8 rounded p-2 flex items-center right-0 cursor-pointer"
                        : "absolute bg-white text-black top-11 md:top-8 rounded p-2 flex items-center right-0 cursor-pointer"
                    }
                    onClick={logOut}
                  >
                    <MdOutlineLogout
                      size={14}
                      color={activeTheme === "light-theme" ? "white" : "black"}
                      className="mr-2"
                    />{" "}
                    Logout
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div
            className={
              activeTheme === "light-theme"
                ? "w-12 h-calculated-height border-r border-r-gray-400  bg-[white] flex flex-col justify-between items-center py-3"
                : "w-12 h-calculated-height  bg-[#2F3030] flex flex-col justify-between items-center py-3"
            }
          >
            <div className="flex flex-col justify-between h-[50vh] mt-5">
              {IconsList.map((icon, index) => (
                <img
                  key={index}
                  src={icon.iconUrl}
                  alt={icon.name}
                  className={
                    activeScreen === icon.iconName
                      ? "rounded bg-gray-600 cursor-pointer hover:scale-125 transition duration-500 "
                      : "cursor-pointer hover:scale-125 transition duration-500 "
                  }
                  onClick={() => clickedMenu(icon)}
                />
              ))}
            </div>
            <div className="bg-green-800 p-2 rounded-full">{`${parsedUserDetails?.firstName?.[0]}${parsedUserDetails?.lastName?.[0]}`}</div>
          </div>

          {/* components rendering based on side menu icon click ternary operation logic */}

          {activeScreen === "light-home" ? (
            <MenuHome activeTheme={activeTheme} />
          ) : activeScreen === "light-search" ? (
            <MenuSearch activeTheme={activeTheme} />
          ) : activeScreen === "light-email" ? (
            <MenuEmail activeTheme={activeTheme} />
          ) : activeScreen === "light-plane" ? (
            <MenuPlane activeTheme={activeTheme} />
          ) : activeScreen === "light-menu" ? (
            <Menu activeTheme={activeTheme} />
          ) : activeScreen === "light-chart" ? (
            <MenuChart activeTheme={activeTheme} />
          ) : activeScreen === "light-drawer" ? (
            <Drawer activeTheme={activeTheme} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
