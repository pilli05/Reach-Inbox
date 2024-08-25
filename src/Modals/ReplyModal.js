import axios from "axios";
import React, { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsPersonDashFill } from "react-icons/bs";
import { FaCaretDown, FaRegImage, FaRegSmile } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosCode, IoMdClose } from "react-icons/io";
import { IoEyeOutline, IoLinkOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loaderComponent/Loader";

const ReplyModal = ({ activeTheme, setShowReplyModal, leadDetails, token }) => {
  const [loader, setLoader] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { threadId, fromName, toName, fromEmail, toEmail } = leadDetails;

  // reply mail, post API integration

  const hadleEmailSend = async () => {
    if (subject === "" || message === "") {
      toast.warn("Please fill in the subject and message fields");
      return;
    } else {
      setLoader(true);
      const url = `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`;
      const payLoad = {
        toName: toName,
        to: toEmail,
        from: fromEmail,
        fromName: fromName,
        subject: subject,
        body: message,
      };
      try {
        const response = await axios.post(url, payLoad, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setShowReplyModal(false);
          setLoader(false);
          toast.success("Email sent successfully");
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
        setLoader(false);
      }
    }
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
  };

  return (
    <>
      <Loader loader={loader} activeTheme={activeTheme} />
      <div
        className={
          activeTheme === "light-theme"
            ? " bg-white rounded-lg mb-7 mx-4 my-5 border border-gray-300 shadow shadow-gray-300 h-[85%] relative"
            : " bg-[#141517] rounded-lg mb-7 mx-4 my-5 border border-gray-600 shadow shadow-gray-500 h-[85%] relative"
        }
      >
        <div className=" ">
          <div
            className={
              activeTheme === "light-theme"
                ? "p-3 flex justify-between items-center bg-gray-300 rounded-t-lg"
                : "p-3 flex justify-between items-center bg-[#41464B] rounded-t-lg"
            }
          >
            <h1
              className={
                activeTheme === "light-theme" ? "text-black" : "text-white"
              }
            >
              Reply{" "}
            </h1>
            <IoMdClose
              color={activeTheme === "light-theme" ? "black" : "white"}
              className="cursor-pointer"
              onClick={closeReplyModal}
            />
          </div>
          <div className="my-2 p-3 border-b border-b-[#41464B]">
            <h1 className="text-xs font-medium text-[#41464B]">
              To:{" "}
              <span
                className={
                  activeTheme === "light-theme" ? "text-black" : "text-white"
                }
              >
                {leadDetails?.toEmail}
              </span>
            </h1>
          </div>
          <div className="my-2 p-3 border-b border-b-[#41464B]">
            <h1 className="text-xs font-medium text-[#41464B]">
              from:{" "}
              <span
                className={
                  activeTheme === "light-theme" ? "text-black" : "text-white"
                }
              >
                {leadDetails?.fromEmail}
              </span>
            </h1>
          </div>
          <div className="my-2 p-3 border-b border-b-[#41464B] ">
            <h1 className="text-xs font-medium text-[#41464B] flex items-center">
              Subject:{" "}
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={
                  activeTheme === "light-theme"
                    ? "text-black outline-none bg-gray-300 border-gray-300 px-3 py-2 w-full rounded ml-2"
                    : "text-white outline-none bg-transparent border border-gray-500 px-3 py-2 w-full rounded ml-2"
                }
              />
            </h1>
          </div>
          <div className="my-2 ">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={
                activeTheme === "light-theme"
                  ? "bg-white h-[200px] w-full focus:border-transparent focus:ring-0 rounded-lg border-none focus:outline-none text-black px-3"
                  : "bg-[#141517] h-[200px] w-full focus:border-transparent focus:ring-0 rounded-lg border-none focus:outline-none px-3"
              }
              placeholder="Hi Jane"
            />
          </div>

          <div className="border-t border-t-[#41464B] w-full absolute bottom-0  p-3">
            <div className="flex items-center space-x-5 text-sm text-gray-400">
              <button
                onClick={() => hadleEmailSend()}
                className="w-[136px] bg-gradient-to-r from-[#4B63DD] to-[#0524BF] px-3 py-2 text-white rounded flex justify-center items-center text-sm"
              >
                Send <FaCaretDown color="white" className="ml-2" size={25} />{" "}
              </button>
              <span className="flex items-center">
                <AiFillThunderbolt size={25} className="mr-2" /> Variables
              </span>
              <span className="flex items-center">
                <IoEyeOutline size={25} className="mr-2" /> Preview Email
              </span>
              <span className="flex items-center">
                A<HiOutlineDotsVertical size={25} />
              </span>
              <IoLinkOutline size={20} />
              <FaRegImage size={20} />
              <FaRegSmile size={20} />
              <BsPersonDashFill size={20} />
              <IoIosCode size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyModal;
