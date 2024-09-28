import React, { useEffect } from "react";
import "../sass/style.scss";
import LogoHeader from "../Icon/LogoHeader";
import LogoSmall from "../Icon/LogoSmall";
import LinkCustom from "../LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import IconLanguages from "../Icon/IconLanguages";
import IconMenu from "../Icon/IconMenu";
import IconUser from "../Icon/IconUser";
import { Dropdown, Space } from "antd";
import { useRef } from "react";
import { useState } from "react";

const items = [
  {
    label: <LinkCustom content={"Sign up"} to={pathDefault.signup} />,
    key: "0",
  },
  {
    label: <LinkCustom content={"Sign in"} to={pathDefault.signin} />,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <LinkCustom content={"Airbnb your home"} to={pathDefault.hostHomes} />
    ),
    key: "3",
  },
  {
    label: (
      <LinkCustom
        content={"Host an experience"}
        to={pathDefault.hostExperiences}
      />
    ),
    key: "4",
  },
  {
    label: <LinkCustom content={"Help centre"} to={pathDefault.help} />,
    key: "5",
  },
];

const Header = () => {
  const userInfoRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const updateDropdownStyle = () => {
    if (userInfoRef.current) {
      const { top, right, height } =
        userInfoRef.current.getBoundingClientRect();
      setDropdownStyle({
        width: "230px",
        top: `${top + height + 10}px`,
        right: `${window.innerWidth - right}px`,
        position: "fixed",
      });
    }
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdownVisible((prev) => !prev);
    updateDropdownStyle();
  };

  const handleOutsideClick = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      userInfoRef.current &&
      !userInfoRef.current.contains(e.target)
    ) {
      setDropdownVisible(false); // Ẩn dropdown khi nhấp ra ngoài
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownVisible) {
        updateDropdownStyle(); // Cập nhật vị trí khi cuộn nếu dropdown đang mở
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleOutsideClick); // Lắng nghe sự kiện click ở ngoài

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  return (
    <header className="header_content">
      <div className="screen flex items-center justify-between sm:px-6 md:px-10 lg:px-20">
        <div className="logo">
          <a href="/" className="logo_detail inline-flex items-center">
            <div className="logo_big">
              <LogoHeader />
            </div>
            <div className="logo_small">
              <LogoSmall />
            </div>
          </a>
        </div>
        <div className="header_content_user">
          <nav className="header_content_info">
            <div className="hire_lang">
              <LinkCustom
                content={"Airbnb your home"}
                to={pathDefault.hostHomes}
                className={"hire_info hidden md:inline"}
              />
              <div className="lang_info">
                <button
                  type="button"
                  aria-expanded="false"
                  aria-label="Choose a language and currency"
                  className="hire_info"
                >
                  <div className="lang_icon">
                    <IconLanguages />
                  </div>
                </button>
              </div>
            </div>
            <div ref={userInfoRef} className="user_info">
              <div
                ref={dropdownRef}
                className="inline-flex items-center user_info_detail"
              >
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  overlayStyle={dropdownStyle}
                  visible={isDropdownVisible}
                >
                  <a onClick={handleDropdownClick}>
                    <Space>
                      <IconMenu />
                      <div className="user_icon">
                        <IconUser />
                      </div>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
