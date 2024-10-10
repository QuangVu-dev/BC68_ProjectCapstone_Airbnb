import React from "react";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import IconFacebook from "../../assets/IconSocial/IconFacebook";
import IconTwitter from "../../assets/IconSocial/IconTwitter";
import IconInstagram from "../../assets/IconSocial/IconInstagram";

const FooterBooking = () => {
  return (
    <footer style={{ borderTop: "1px solid #dddddd", background: "#f7f7f7" }}>
      <section className="sm:px-6 md:px-10 lg:px-20">
        <div className="2xl:flex 2xl:justify-between flex justify-between py-6">
          <div className="md:text-center lg:text-left flex items-center">
            <div className="lg:p-1 lg:-m-1 lg:overflow-hidden flex items-center">
              <div className="text-sm leading-5">
                <p>© 2024 Airbnb, Inc.</p>
              </div>
              <div className="flex items-center ml-2">
                <ol className="inline-flex space-x-2 ml-2">
                  <li className="hover:underline text-sm">
                    <LinkCustom content={"Pravacy"} to={pathDefault.homePage} />
                  </li>
                  <li className="hover:underline text-sm">
                    <LinkCustom content={"Clause"} to={pathDefault.homePage} />
                  </li>
                  <li className="hover:underline text-sm">
                    <LinkCustom content={"Sitemap"} to={pathDefault.homePage} />
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="ml-6">
              <ul className="flex m-0 p-0">
                <li className="ml-6">
                  <LinkCustom content={<IconFacebook />} />
                </li>
                <li className="ml-6">
                  <LinkCustom content={<IconTwitter />} />
                </li>
                <li className="ml-6">
                  <LinkCustom content={<IconInstagram />} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default FooterBooking;
