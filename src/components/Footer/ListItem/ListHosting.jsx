import React from "react";
import LinkCustom from "../../LinkCustom/LinkCustom";
import { pathDefault } from "../../../common/path";

const arrListHosting = [
  {
    label: (
      <LinkCustom content={"Airbnb your home"} to={pathDefault.homePage} />
    ),
    key: "0",
  },
  {
    label: (
      <LinkCustom content={"AirCover for Hosts"} to={pathDefault.homePage} />
    ),
    key: "1",
  },
  {
    label: (
      <LinkCustom content={"Hosting resources"} to={pathDefault.homePage} />
    ),
    key: "2",
  },
  {
    label: <LinkCustom content={"Community forum"} to={pathDefault.homePage} />,
    key: "3",
  },
  {
    label: (
      <LinkCustom content={"Hosting responsibly"} to={pathDefault.homePage} />
    ),
    key: "4",
  },
  {
    label: (
      <LinkCustom
        content={"Join a free Hosting class"}
        to={pathDefault.homePage}
      />
    ),
    key: "5",
  },
];

const ListHosting = () => {
  return (
    <div className="footer_hosting sm:py-6">
      <h3 className="mb-3 m-0 leading-5 text-lg font-bold tracking-normal">
        Hosting
      </h3>
      <ul className="grid gap-3 p-0 m-0">
        {arrListHosting.map((item, index) => {
          return (
            <li key={index} className="text-sm hover:underline">
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListHosting;
