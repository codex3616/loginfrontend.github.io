import React from "react";
import style from "../style/username.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../Helper/validate";
import { resetPassword } from "../Helper/helper.js";
import { useAuthStore } from "../store/store.js";
import useFetch from "../hooks/fetch.hook.js";

const Reset = () => {
  const [isLoading, apiData, status, serverError] = useFetch(
    "/createResetSession"
  );
  const navigate = useNavigate();

  if (apiData === undefined) {
    navigate("/password");
  }
  const { username } = useAuthStore((state) => state.auth); //fetching login username

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const resetPromise = resetPassword({
        username,
        password: values.password,
      });
      toast.promise(resetPromise, {
        loading: "Loading...",
        success: <b>Password changed Successsfully...</b>,
        error: <b>Can't reset Password.</b>,
      });
      resetPromise.then(() => {
        navigate("/password");
      });
    },
  });

  if (isLoading === true)
    return (
      <h1 className=" font-bold my-20 text-7xl text-center">isLoading...</h1>
    );
  if (serverError)
    return (
      <h1 className=" text-red-500 my-20 text-2xl text-center">
        {serverError.message}
      </h1>
    );

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass}>
            <div className="title flex flex-col items-center">
              <h4 className=" text-5xl font-medium">Reset</h4>
              <span className=" py-2 text-xl text-center  text-gray-500">
                Enter new Password.
              </span>
            </div>
            <form className="pt-16" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-centern gap-6">
                <input
                  {...formik.getFieldProps("password")}
                  type="text"
                  className={style.textBox}
                  placeholder="New Password"
                />
                <input
                  {...formik.getFieldProps("confirmPassword")}
                  type="text"
                  className={style.textBox}
                  placeholder="Repeat Password"
                />
                <button type="submit" className={style.btn}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
