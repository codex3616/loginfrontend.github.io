import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

export const ProctectRoute = ({ children }) => {
  const { username } = useAuthStore((state) => state.auth); //fetching login username

  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};
