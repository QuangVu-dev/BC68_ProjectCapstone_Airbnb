import React from "react";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";
import RentalRoomList from "../pages/RentalRoomList/RentalRoomList";
import RentalRoomDetail from "../pages/RentalRoomDetail/RentalRoomDetail";
import Booking from "../pages/Booking/Booking";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
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
  ]);
  return routes;
};

export default useRoutesCustom;
