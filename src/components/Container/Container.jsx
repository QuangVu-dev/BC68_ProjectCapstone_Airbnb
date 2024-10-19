import React from "react";

const Container = ({ children }) => {
   return (
      <div
         className={`container max-w-[2520px] mx-auto px-3 sm:px-4 md:px-10 xl:px-20  dark:bg-gray-900`}
      >
         {children}
      </div>
   );
};
export default Container;
