import { toast, ToastContainer } from "react-toastify";
import useRoutesCustom from "./hooks/useRoutesCustom";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import React from "react";
import loadFonts from "./webfont/fontLoader";

export const NotificationContext = React.createContext();

loadFonts();

function App() {
  const handleNotification = (content, type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };

  const routes = useRoutesCustom();
  return (
    <NotificationContext.Provider
      value={{
        handleNotification,
      }}
    >
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
