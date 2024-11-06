import React, { useEffect } from "react";
import "../sass/style.scss";
import LogoHeader from "../Icon/LogoHeader";
import LogoSmall from "../Icon/LogoSmall";
import LinkCustom from "../LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import IconLanguages from "../Icon/IconLanguages";
import IconMenu from "../Icon/IconMenu";
import IconUser from "../Icon/IconUser";
import { Dropdown, Menu, Space } from "antd";
import { useRef } from "react";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInfoRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(() => {
    const storedData = getLocalStorage("user");
    return storedData ? storedData.user : null;
  });
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setLocalStorage("user", null);
    setUser(null);
    window.location.reload();
  };

  const menuItems = user
    ? [
        {
          label: <span>Welcome, {user.name}</span>, // Hiển thị tên người dùng
          key: "welcome",
        },
        {
          label: <span>Update Information</span>,
          key: "update info",
        },
        {
          label: "Log out",
          key: "logout",
          onClick: handleLogout,
        },
      ]
    : [
        {
          label: <LinkCustom content={"Sign in"} to={pathDefault.signin} />,
          key: "signin",
        },
        {
          label: <LinkCustom content={"Sign up"} to={pathDefault.signup} />,
          key: "signup",
        },
        {
          type: "divider",
        },
        {
          label: (
            <LinkCustom content={"Airbnb your home"} to={pathDefault.page404} />
          ),
          key: "3",
        },
        {
          label: (
            <LinkCustom
              content={"Host an experience"}
              to={pathDefault.page404}
            />
          ),
          key: "4",
        },
        {
          label: (
            <LinkCustom content={"Help centre"} to={pathDefault.page404} />
          ),
          key: "5",
        },
      ];

  console.log(user);

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
      <div className="screen flex items-center justify-between px-3 sm:px-6 md:px-10 lg:px-20">
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
                to={pathDefault.page404}
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
                    items: menuItems,
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
