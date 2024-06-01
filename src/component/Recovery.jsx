import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store.js";
import { generateOTP, verifyOTP } from "../Helper/helper.js";

// import { useFormik } from "formik";

const Recovery = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth); //fetching login username
  console.log(username);
  const [OTP, setOTP] = useState();

  useEffect(() => {
    generateOTP({ username }).then((OTP) => {
      // this is response otp from backend
      if (OTP) {
        return toast.success("OTP has been sent to our email...!");
      }
      return toast.error("Problem while generating OTP...");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    let { status } = await verifyOTP({ username, code: OTP }); // this otp is user input otp
    if (status === 201) {
      toast.success("Verify Successfullly...");
      return navigate("/reset");
    } else {
      return toast.error("Wrong OTP");
    }
  }

  //handler function for resend otp...
  function resendOTP() {
    let sendPromise = generateOTP({ username });

    toast.promise(sendPromise, {
      loading: "Sending..",
      success: <b>OTP has been sent to your email !</b>,
      error: <b>Could not send it !</b>,
    });
  }
  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass}>
            <div className="title flex flex-col items-center">
              <h4 className=" text-5xl font-bold">Recovery</h4>
              <span className=" py-2  text-xl text-center w-2/3 text-gray-500">
                Enter OTP to recover password.
              </span>
            </div>
            <form className=" pt-12" onSubmit={onSubmit}>
              <span className="py-1 px-5 text-sm text-center  text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <div className=" flex flex-col items-centern gap-6">
                <input
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                  type="text"
                  className={style.textBox}
                  placeholder="OTP"
                />
                <button type="submit" className={style.btn}>
                  Recover
                </button>
              </div>
            </form>
            <div className="text-center py-4">
              <span className=" text-gray-500">
                Can't get OTP?{" "}
                <button className=" text-red-500" onClick={resendOTP}>
                  Resend
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
