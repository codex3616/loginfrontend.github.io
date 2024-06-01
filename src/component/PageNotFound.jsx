import React from "react";
import error from "../assets/error.png";
import style from "../style/username.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className={style.main}>
        <div className="img w-96  ">
          <img src={error} className=" " alt="Error png." />
        </div>
        <div className=" flex justify-center flex-col px-8">
          <h2 className=" text-2xl mb-2">404. That's an error.</h2>
          <h4 className=" text-xl mb-2">
            The requested URL /404 was not found on this server.
          </h4>
          <p className=" text-gray-500 text-lg mb-3">That's all we know...!</p>

          <Link
            to="/"
            className={style.btn}
            style={{
              width: "50%",
              margin: "0 0",
            }}
          >
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
