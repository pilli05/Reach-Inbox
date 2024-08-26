import React from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();

  localStorage.setItem("location", location);

  const login = async () => {
    // google auth API integration, after successful login redirecting to home component

    try {
      window.location.href =
        "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://reach-inbox-delta.vercel.app";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen ">
      <div className="flex justify-center items-center h-16 border-b border-b-[#707172] w-full">
        <img
          src="/assets/light-reachinbox-logo.png"
          alt="logo"
          className="w-[150px]"
        />
      </div>
      <div className="w-[90%] md:w-auto flex flex-col justify-center items-center border border-[#707172] px-2 md:px-12 py-5 rounded-xl bg-[#1a1919]">
        <h1 className="font-semibold text-xl mb-6">Create a new account</h1>
        <button
          onClick={() => login()}
          className="w-[90%] md:w-auto justify-center flex items-center text-[#CCCCCC] text-sm border-2 border-[#707172] px-5 md:px-20 py-2 rounded-md"
        >
          <img
            src="assets/google-logo.png"
            alt="google-logo"
            className="w-7 mr-2"
          />
          Sign Up with Google
        </button>
        <button className="mt-12 mb-4 bg-blue-700 px-3 py-3 rounded-md">
          Create an Account
        </button>
        <p className="m-2 text-base  text-[#909296] ">
          Already have an account?{" "}
          <span className="text-[#C1C2C5]">Sign In</span>
        </p>
      </div>
      <div className="h-12 bg-[#25262B] w-full flex justify-center items-center">
        <span className="text-xs font-regular text-[#5C5F66] ">
          ©️ 2023 Reachinbox. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Login;
