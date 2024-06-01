import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Password from "./component/Password";
import Profile from "./component/Profile";
import Register from "./component/Register";
import Recovery from "./component/Recovery";
import Reset from "./component/Reset";
import PageNotFound from "./component/PageNotFound";
//auth middleware...
import { AuthorizeUser, ProctectRoute } from "./middleware/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/password",
    element: (
      <ProctectRoute>
        <Password />
      </ProctectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: (
      <ProctectRoute>
        <Recovery />"
      </ProctectRoute>
    ),
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route
            path="/profile"
            element={
              <AuthorizeUser>
                <Profile />
              </AuthorizeUser>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router> */}
    </>
  );
};

export default App;
