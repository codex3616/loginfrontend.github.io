import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import style from "../style/username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../Helper/validate.js";
import { useAuthStore } from "../store/store.js";

const Login = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate, //if validate successfull then only below methods run...
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
      // console.log(values);
    },
  });
  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass}>
            <div className="title flex flex-col items-center">
              <h4 className=" text-5xl font-bold">Hello Again!</h4>
              <span className=" py-4 text-xl text-center w-2/3 text-gray-500">
                Explore More by connecting with us.
              </span>
            </div>
            <form className=" py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img src={profile} className={style.img} alt="avtar.." />
              </div>

              <div className="textbox flex flex-col items-centern gap-6">
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  className={style.textBox}
                  placeholder="UserName"
                />
                <button type="submit" className={style.btn}>
                  Let's Go
                </button>
              </div>
              <div className="text-center py-4">
                <span className=" text-gray-500">
                  Not a Member ?{" "}
                  <Link className=" text-red-500" to="/register">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
