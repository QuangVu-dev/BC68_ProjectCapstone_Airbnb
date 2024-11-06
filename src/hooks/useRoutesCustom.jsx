import React from "react";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";
import RentalRoomList from "../pages/RentalRoomList/RentalRoomList";
import RentalRoomDetail from "../pages/RentalRoomDetail/RentalRoomDetail";
import Booking from "../pages/Booking/Booking";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import UserProfile from "../pages/User/UserProfile";
import ManageUser from "../pages/Manage/ManageUser";
import ManageInfoLocation from "../pages/Manage/ManageInfoLocation";
import ManageInfoRoom from "../pages/Manage/ManageInfoRoom";
import ManageRoomBook from "../pages/Manage/ManageRoomBook";
import Page404 from "../pages/404Page/Page404";
const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        { path: pathDefault.informationPertional, element: <UserProfile /> },
      ],
    },
    {
      path: pathDefault.rentalRoomList,
      element: <RentalRoomList />,
    },
    {
      path: pathDefault.rentalRoomDetail,
      element: <RentalRoomDetail />,
    },
    {
      path: pathDefault.booking,
      element: <Booking />,
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
      path: pathDefault.page404,
      element: <Page404 />,
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
