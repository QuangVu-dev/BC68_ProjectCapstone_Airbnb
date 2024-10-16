import React from "react";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import UserProfile from "../pages/User/UserProfile";

import ManageUser from "../pages/Manage/ManageUser";
import ManageInfoLocation from "../pages/Manage/ManageInfoLocation";
import ManageInfoRoom from "../pages/Manage/ManageInfoRoom";
import ManageRoomBook from "../pages/Manage/ManageRoomBook";
const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [{ path: pathDefault.informationPertional, element:<UserProfile/> }],
    },
    {
      path: pathDefault.signup,
      element: <SignupPage />,
    },
    {
      path: pathDefault.signin,
      element: <SigninPage />,
    },
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        {
          index: true,
          element: <ManageUser />,
        },
        {
          path: "manage-user",
          element: <ManageUser />,
        },
        {
          path: "manage-info-location",
          element: <ManageInfoLocation />,
        },
        {
          path: "manage-info-room",
          element: <ManageInfoRoom />,
        },
        {
          path: "manage-room-book",
          element: <ManageRoomBook />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
