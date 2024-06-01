import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avtar from "../assets/profile.png";
import style from "../style/username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../Helper/validate";
import convertToBase64 from "../Helper/convert";
import { registerUser } from "../Helper/helper.js";

const Register = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      const registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating ...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register..</b>,
      });
      registerPromise.then(() => {
        navigate("/");
      });
    },
  });

  // ######## FORM DOES'NT SUPPORT INPUT FILE UPLOAD SO WE USE THIS FUNCTION #################
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass} style={{ padding: "18px 0" }}>
            <div className="title flex flex-col items-center">
              <h4 className=" text-5xl font-medium">Register</h4>
              <span className=" py-2 text-xl text-center w-80 text-gray-500">
                Happy to join you !.
              </span>
            </div>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-3">
                <label htmlFor="profile">
                  <img
                    src={file || avtar}
                    className={style.img}
                    // style={{ width: "100px" }}
                    alt="avtar.."
                  />
                </label>
                <input
                  type="file"
                  onChange={onUpload}
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="textbox flex flex-col items-centern gap-4">
                <input
                  {...formik.getFieldProps("email")}
                  type="Email"
                  className={style.textBox}
                  style={{ padding: "6px 10px" }}
                  placeholder="Email*"
                />
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  className={style.textBox}
                  style={{ padding: "6px 10px" }}
                  placeholder="Username*"
                />
                <input
                  {...formik.getFieldProps("password")}
                  type="text"
                  className={style.textBox}
                  style={{ padding: "6px 10px" }}
                  placeholder="Password*"
                />
                <button type="submit" className={style.btn}>
                  Register
                </button>
              </div>
              <div className="text-center py-4">
                <span className=" text-gray-500">
                  Already Register?{" "}
                  <Link className=" text-red-500" to="/">
                    Login Now
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

export default Register;
