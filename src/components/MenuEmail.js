import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsFillReplyFill, BsThreeDots } from "react-icons/bs";
import { FaChevronDown, FaPaperPlane } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoReload } from "react-icons/io5";
import ReplyModal from "../Modals/ReplyModal";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loaderComponent/Loader";

const MenuEmail = ({ activeTheme }) => {
  const token = localStorage.getItem("token");
  const [allMails, setAllMails] = useState([]);
  const [allThreadMails, setAllThreadMails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadDetails, setLeadDetails] = useState("");
  const [threadId, setThreadId] = useState("");

  // get all mails API integration

  const getAllMails = async () => {
    const url = "https://hiring.reachinbox.xyz/api/v1/onebox/list";
    try {
      setLoader(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoader(false);
        setAllMails(response?.data?.data);
        setLeadDetails({
          id: response?.data?.data[0]?.id,
          fromName: response?.data?.data[0]?.fromName,
          fromEmail: response?.data?.data[0]?.fromEmail,
          toEmail: response?.data?.data[0]?.toEmail,
          threadId: response?.data?.data[0]?.threadId,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      getAllMails();
    }
  }, []);

  // get threaded mails API integration

  const openMail = async (threadId, mail) => {
    setLeadDetails(mail);
    const url = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`;
    try {
      setLoader(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoader(false);
        setAllThreadMails(response.data.data);
        setThreadId(response.data.data[0]?.threadId);
        toast.success("Threaded mails fetched successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Here below code is for on key down if key is R reply box open and if key is Delete box will open

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if ((e.key === "r") | (e.key === "R")) {
        e.preventDefault();
        setShowReplyModal(true);
      } else if ((e.key === "d") | (e.key === "D")) {
        e.preventDefault();
        setShowDeleteModal(true);
      }
    });
  }, []);

  useEffect(() => {
    if (leadDetails?.threadId) {
      openMail(leadDetails.threadId, leadDetails);
    }
  }, [leadDetails]);

  return (
    <>
      <Loader loader={loader} activeTheme={activeTheme} />

      {showDeleteModal ? (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          threadId={threadId}
        />
      ) : null}

      <div className="flex">
        <div
          className={
            activeTheme === "light-theme"
              ? "bg-white text-black  w-mobile-width lg:w-[300px] px-3 md:px-0 border-r border-r-gray-500 "
              : "w-mobile-width lg:w-[300px] px-3 md:px-0 border-r-0 md:border-r md:border-r-gray-500 "
          }
        >
          <div className="flex justify-between items-center p-3 w-full ">
            <div className="mb-2">
              <h1 className="font-bold text-blue-600 text-xl flex items-center mb-1">
                All Inbox(s) <FaChevronDown className="ml-2" size={14} />
              </h1>
              <p className="text-sm ">
                {`${allMails?.length}/${allMails?.length} `}
                <span className="text-gray-400">Inboxes selected</span>
              </p>
            </div>
            <IoReload
              color={activeTheme === "light-theme" ? "black" : "white"}
              className={
                activeTheme === "light-theme"
                  ? "bg-gray-200 w-7 h-7 p-2 rounded-md font-bold"
                  : "bg-[#23272C] w-7 h-7 p-2 rounded-md font-bold"
              }
            />
          </div>
          <div className="px-3 ">
            <input
              type="search"
              className={
                activeTheme === "light-theme"
                  ? " bg-gray-200 rounded p-2 outline-none w-full"
                  : " bg-[#23272C] rounded p-2 outline-none w-full"
              }
              placeholder="Search"
            />
          </div>
          <div className=" flex items-center justify-between mt-4 pb-3  border-b border-b-gray-500 mx-3">
            <div className="flex items-center">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "bg-gray-200 px-4 py-1 rounded-full mr-2 text-blue-600"
                    : "bg-[#23272C] px-4 py-1 rounded-full mr-2 text-blue-600"
                }
              >
                {allMails?.length}
              </span>
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-gray-800 text-sm"
                    : "text-white text-sm"
                }
              >
                New Replies
              </span>
            </div>
            <span className="text-sm flex items-center">
              Newest <FaChevronDown className="ml-2" size={14} />{" "}
            </span>
          </div>
          <div className="px-3 my-4 overflow-y-auto h-[60vh] ">
            {allMails && allMails?.length > 0
              ? allMails.map((mail) => (
                  <div
                    key={mail.id}
                    className="w-full mb-5 h-auto md:h-[120px] border-b border-b-gray-500 cursor-pointer "
                    onClick={() => openMail(mail.threadId, mail)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-[80%]">
                        <h1 className="text-base mb-2">{mail.fromEmail}</h1>
                        <p
                          className={
                            activeTheme === "light-theme"
                              ? "text-xs text-gray-600 h-7"
                              : "text-xs text-[#E1E0E0] h-7"
                          }
                        >
                          {mail.subject}
                        </p>
                      </div>
                      <p className="text-xs text-wrap text-gray-500">
                        {moment(mail.createdAt).format("MMM D")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-5 pt-3 md:pt-0 pb-3 md:pb-0 md:my-0">
                      <span
                        // className={
                        //   mail.isRead
                        //     ? "bg-[#222426] rounded-full p-2 text-xs text-[#626FE6] flex items-center"
                        //     : "bg-[#222426] rounded-full p-2 text-xs text-[#57E0A6] flex items-center"
                        // }
                        className={
                          activeTheme === "light-theme"
                            ? "bg-gray-200 rounded-full p-2 text-xs text-[#626FE6] flex items-center"
                            : "bg-[#222426] rounded-full p-2 text-xs text-[#626FE6] flex items-center"
                        }
                      >
                        <GoDotFill
                          color={mail.isRead ? "#626FE6" : "#57E0A6"}
                          size={18}
                          className=""
                        />{" "}
                        {mail.isRead ? "Closed" : "Interested"}
                      </span>
                      <span
                        className={
                          activeTheme === "light-theme"
                            ? "bg-gray-200 rounded-full p-2 text-xs flex items-center text-gray-600"
                            : "bg-[#222426] rounded-full p-2 text-xs flex items-center"
                        }
                      >
                        <FaPaperPlane
                          color={
                            activeTheme === "light-theme" ? "gray" : "white"
                          }
                          size={20}
                          className="mr-2"
                        />
                        Campain Name
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div
          className={
            activeTheme === "light-theme"
              ? "bg-[#F4F6F8] hidden lg:block border-r border-r-gray-500   w-email-block-calculated-width relative"
              : "hidden lg:block border-r border-r-gray-500   w-email-block-calculated-width"
          }
        >
          <div
            className={
              activeTheme === "light-theme"
                ? "bg-white h-16 border-b border-b-gray-500 px-3 py-3"
                : " h-16 border-b border-b-gray-500 px-3 py-3"
            }
          >
            <div className="flex justify-between items-center">
              <div>
                <h1
                  className={
                    activeTheme === "light-theme" ? "text-black" : "text-white"
                  }
                >
                  {leadDetails?.fromName}
                </h1>
                <p className="text-xs text-gray-500">
                  {leadDetails?.fromEmail}
                </p>
              </div>
              <div className="space-x-4 flex items-center">
                <select
                  className={
                    activeTheme === "light-theme"
                      ? "border border-gray-500 bg-transparent rounded-lg p-2 text-gray-800 outline-none text-sm"
                      : "border border-gray-500 bg-transparent rounded-lg p-2 bg-[#1F1F1F] outline-none text-sm"
                  }
                >
                  <option value="completed">Meeting Completed</option>
                  <option value="closed">Meeting Closed</option>
                </select>
                <select
                  className={
                    activeTheme === "light-theme"
                      ? "border border-gray-500 bg-transparent rounded-lg p-2 text-gray-800 outline-none text-sm"
                      : "border border-gray-500 bg-transparent rounded-lg p-2 bg-[#1F1F1F] outline-none text-sm"
                  }
                >
                  <option value="move1">Move 1</option>
                  <option value="move22">Move 2</option>
                </select>
                <div
                  className={
                    activeTheme === "light-theme"
                      ? "border border-gray-500 bg-transparent rounded-lg p-2  outline-none text-sm"
                      : "border border-gray-500 bg-transparent rounded-lg p-2 bg-[#1F1F1F] outline-none text-sm"
                  }
                >
                  <BsThreeDots
                    color={activeTheme === "light-theme" ? "black" : "white"}
                  />
                </div>
              </div>
            </div>
          </div>
          {showReplyModal ? (
            <ReplyModal
              activeTheme={activeTheme}
              setShowReplyModal={setShowReplyModal}
              leadDetails={leadDetails}
              token={token}
            />
          ) : (
            <div className=" overflow-y-auto h-[72vh] ">
              {allThreadMails && allThreadMails.length > 0
                ? allThreadMails.map((threadMail) => (
                    <div
                      key={threadMail.id}
                      className={
                        activeTheme === "light-theme"
                          ? "cursor-pointer p-3 bg-white rounded-lg mb-7 mx-4 my-5 border border-gray-300 shadow shadow-gray-300"
                          : "cursor-pointer p-3 bg-[#141517] rounded-lg mb-7 mx-4 my-5 border border-gray-600 shadow shadow-gray-500"
                      }
                      onClick={() => setThreadId(threadMail.threadId)}
                    >
                      <div className="flex items-center justify-between ">
                        <h1
                          className={
                            activeTheme === "light-theme"
                              ? "text-black text-sm font-normal"
                              : "text-sm font-normal"
                          }
                        >
                          {threadMail.subject}
                        </h1>
                        <span className="text-xs text-wrap text-[#AEAEAE]">
                          {moment(threadMail.createdAt).format(
                            "D MMM YYYY : hh:mm A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className="text-xs text-[#AEAEAE] my-2">
                          from: {threadMail.fromEmail}
                        </p>
                        {threadMail?.cc?.length > 0 ? (
                          <p className="text-xs text-[#AEAEAE] my-2">
                            cc: {threadMail.cc}
                          </p>
                        ) : null}
                      </div>
                      <p className="text-xs text-[#AEAEAE] my-2">
                        to: {threadMail.toEmail}
                      </p>
                      <h1
                        className={
                          activeTheme === "light-theme"
                            ? "my-5 text-gray-600 text-sm"
                            : "my-5 text-[#E1E0E0] text-sm"
                        }
                      >
                        Hi {threadMail.fromName},
                      </h1>
                      <p
                        className={
                          activeTheme === "light-theme"
                            ? "text-gray-600 text-sm "
                            : "text-[#E1E0E0] text-sm "
                        }
                      >
                        {threadMail.body}
                      </p>
                    </div>
                  ))
                : null}
            </div>
          )}
          {showReplyModal ? null : (
            <div className="absolute bottom-0 ml-4 mb-5">
              <button
                onClick={() => setShowReplyModal(true)}
                className="w-[136px] bg-gradient-to-r from-[#4B63DD] to-[#0524BF] px-3 py-2 text-white rounded flex justify-center items-center text-sm"
              >
                <BsFillReplyFill color="white" className="mr-2" size={25} />{" "}
                Reply
              </button>
            </div>
          )}
        </div>
        <div
          className={
            activeTheme === "light-theme"
              ? "bg-white hidden lg:block w-[270px] py-3 px-3 "
              : "hidden lg:block w-[270px] py-3 px-3 "
          }
        >
          <div className="h-auto">
            <p
              className={
                activeTheme === "light-theme"
                  ? " border border-gray-500 bg-transparent rounded-lg p-2 bg-[#F4F6F8] outline-none text-sm text-gray-800"
                  : " border border-gray-500 bg-transparent rounded-lg p-2 bg-[#5e5757] outline-none text-sm "
              }
            >
              Lead Details
            </p>
            <div className="flex justify-between items-center my-4">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-xs text-black"
                    : "text-xs text-white"
                }
              >
                Name
              </span>
              <span className="text-sm text-[#B9B9B9]">
                {leadDetails?.fromName}
              </span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-xs text-black"
                    : "text-xs text-white"
                }
              >
                Contact No.
              </span>
              <span className="text-sm text-[#B9B9B9]">+54-9062827869</span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-xs text-black"
                    : "text-xs text-white"
                }
              >
                Email
              </span>
              <span className="text-sm text-[#B9B9B9]">
                {leadDetails?.fromEmail}
              </span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-xs text-black"
                    : "text-xs text-white"
                }
              >
                LinkedIn
              </span>
              <span className="text-sm text-[#B9B9B9]">
                linkedin.com/in/timvadde/
              </span>
            </div>

            <div className="flex justify-between items-center my-4">
              <span
                className={
                  activeTheme === "light-theme"
                    ? "text-xs text-black"
                    : "text-xs text-white"
                }
              >
                Company name
              </span>
              <span className="text-sm text-[#B9B9B9]">ReachInbox</span>
            </div>
          </div>
          <div className="">
            <p
              className={
                activeTheme === "light-theme"
                  ? " border border-gray-500 bg-transparent rounded-lg p-2 bg-[#F4F6F8] outline-none text-sm text-gray-800"
                  : " border border-gray-500 bg-transparent rounded-lg p-2 bg-[#5e5757] outline-none text-sm "
              }
            >
              Activities
            </p>
            <div>
              <img
                src={
                  activeTheme === "light-theme"
                    ? "/assets/light-bottom-tree.png"
                    : "/assets/bottom-tree.png"
                }
                alt="bottom-tree"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuEmail;
