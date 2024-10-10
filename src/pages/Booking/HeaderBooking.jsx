import React from "react";
import LogoHeader from "../../components/Icon/LogoHeader";

const HeaderBooking = () => {
  return (
    <header className="header_content">
      <div className="screen flex items-center justify-between sm:px-6 md:px-10 lg:px-20">
        <div className="logo">
          <a href="/" className="logo_detail inline-flex items-center">
            <div className="logo_big">
              <LogoHeader />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderBooking;
