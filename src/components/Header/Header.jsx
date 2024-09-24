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
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";

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
  return (
    <div>
      <header className="header_content">
        <div className="screen flex items-center justify-between">
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
              <div className="user_info">
                <div className="inline-flex items-center user_info_detail">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                    overlayStyle={{
                      width: "230px",
                      top: "75px",
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
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
    </div>
  );
};

export default Header;
