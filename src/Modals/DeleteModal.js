import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({ setShowDeleteModal, threadId }) => {
  const token = localStorage.getItem("token");

  // delete thread API integration

  const deleteThread = async () => {
    const url = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setShowDeleteModal(false);
        toast.success(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-25 z-50 flex justify-center items-center">
      <div className="bg-[#141517] h-[249px] w-auto md:w-[443px] rounded-lg flex flex-col justify-center items-center space-y-7">
        <h1 className="text-2xl font-bold">Are you sure ?</h1>
        <p className="text-xs text-[#E8E8E8]">
          Your selected email will be deleted.
        </p>
        <div className="flex items-center justify-between w-[50%] space-x-5">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="w-[136px] bg-[#25262B] px-3 py-2 text-white rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteThread()}
            className="w-[136px] bg-gradient-to-r from-[#FA5252] to-[#A91919] px-3 py-2 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
