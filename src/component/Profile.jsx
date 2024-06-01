import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avtar from "../assets/profile.png";
import style from "../style/username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../Helper/validate";
import convertToBase64 from "../Helper/convert";
import useFetch from "../hooks/fetch.hook.js";
// import { useAuthStore } from "../store/store.js";
import { updateUser } from "../Helper/helper.js";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  // console.log(username);

  const [{ isLoading, apiData, serverError }] = useFetch(); //calling custom hook
  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastname || "",
      mobile: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true, //to display apidata? is available...
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      const updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating ...",
        success: <b>Updated Successfully...!</b>,
        error: <b>Could not Update..</b>,
      });
    },
  });

  // ######## FORM DOES'NT SUPPORT INPUT FILE UPLOAD SO WE USE THIS FUNCTION #################
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //logout handler function...
  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading)
    return (
      <h1 className="  font-bold text-center my-20 text-7xl ">isLoading</h1>
    );
  if (serverError)
    return (
      <h1 className=" text-red-500 my-20 text-7xl ">{serverError.message}</h1>
    );

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass} style={{ padding: "18px 0" }}>
            <div className="title flex flex-col items-center">
              <h4 className=" text-5xl font-medium">Profile</h4>
              <span className=" py-2 text-xl text-center w-full text-gray-500">
                You can update the details.
              </span>
            </div>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-3">
                <label htmlFor="profile">
                  <img
                    src={apiData?.profile || file || avtar}
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

              <div className="textbox flex flex-col items-center gap-4">
                <div className="name flex items-center  w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("firstname")}
                    type="text"
                    className={style.textBox}
                    style={{ padding: "6px 10px" }}
                    placeholder="FirstName"
                  />
                  <input
                    {...formik.getFieldProps("lastname")}
                    type="text"
                    className={style.textBox}
                    style={{ padding: "6px 10px" }}
                    placeholder="LastName"
                  />
                </div>
                <div className="name flex  w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("mobile")}
                    type="text"
                    className={style.textBox}
                    style={{ padding: "6px 10px" }}
                    placeholder="Mobile No."
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    type="text"
                    className={style.textBox}
                    style={{ padding: "6px 10px" }}
                    placeholder="Email"
                  />
                </div>
                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  className={style.textBox}
                  style={{ padding: "6px 10px" }}
                  placeholder="Address"
                />

                <button type="submit" className={style.btn}>
                  Update
                </button>
              </div>
            </form>
            <div className="text-center py-4">
              <span className=" text-gray-500">
                come back later?{" "}
                <button className=" text-red-500" onClick={userLogout}>
                  Logout
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
