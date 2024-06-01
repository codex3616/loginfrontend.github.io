import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avtar from "../assets/profile.png";
import style from "../style/username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../Helper/validate";
import useFetch from "../hooks/fetch.hook.js";
import { useAuthStore } from "../store/store.js";
import { verifyPassword } from "../Helper/helper.js";

const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth); //fetching login username
  // console.log(username);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`); //calling custom hook
  // console.log(`apiData from password is ${apiData}`);
  // console.log(isLoading);
  // console.log(serverError);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Creating ...",
        success: false,
        error: <b>Could not Login..</b>,
      });
      // console.log(loginPromise);

      loginPromise.then((res) => {
        if (res.error && res.error.response.status === 401) {
          return toast.error(res.error.response.data.msg);
        }
        let { token } = res.data;
        localStorage.setItem("token", token); //storing token in local storage while login successfullly...
        toast.success("Login Successfully...");
        navigate("/profile");
      });
    },
  });

  if (isLoading)
    return <h1 className=" font-bold my-20 text-7xl text-center">isLoading</h1>;
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
              <h4 className=" text-5xl font-medium">
                Hello {apiData?.firstname || apiData?.username}
              </h4>
              <span className=" py-2 text-xl text-center w-2/3 text-gray-500">
                Explore More by connecting with us.
              </span>
            </div>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-3">
                <img
                  src={apiData?.profile || avtar}
                  className={style.img}
                  alt="avtar.."
                />
              </div>

              <div className="textbox flex flex-col items-centern gap-6">
                <input
                  {...formik.getFieldProps("password")}
                  type="text"
                  className={style.textBox}
                  placeholder="Password"
                />
                <button type="submit" className={style.btn}>
                  Sign In
                </button>
              </div>
              <div className="text-center py-4">
                <span className=" text-gray-500">
                  Forgot Password ?{" "}
                  <Link className=" text-red-500" to="/recovery">
                    Recover Now
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

export default Password;
