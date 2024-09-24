import React from "react";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";

const useRoutesCustom = () => {
  const routes = useRoutes([
    { path: pathDefault.homePage, element: <UserTemplate /> },
    {
      path: pathDefault.signup,
      element: <SignupPage />,
    },
    {
      path: pathDefault.signin,
      element: <SigninPage />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
