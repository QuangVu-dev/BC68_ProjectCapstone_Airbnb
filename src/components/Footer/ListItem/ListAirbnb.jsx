import React from "react";
import LinkCustom from "../../LinkCustom/LinkCustom";
import { pathDefault } from "../../../common/path";

const arrListAirbnb = [
  {
    label: <LinkCustom content={"Newsroom"} to={pathDefault.homePage} />,
    key: "0",
  },
  {
    label: <LinkCustom content={"New features"} to={pathDefault.homePage} />,
    key: "1",
  },
  {
    label: <LinkCustom content={"Careers"} to={pathDefault.homePage} />,
    key: "2",
  },
  {
    label: <LinkCustom content={"Investors"} to={pathDefault.homePage} />,
    key: "3",
  },
  {
    label: <LinkCustom content={"Gift cards"} to={pathDefault.homePage} />,
    key: "4",
  },
  {
    label: (
      <LinkCustom
        content={"Airbnb.org emergency stays"}
        to={pathDefault.homePage}
      />
    ),
    key: "5",
  },
];

const ListAirbnb = () => {
  return (
    <div className="footer_airbnb sm:grid-cols-1 sm:py-6">
      <h3 className="mb-3 m-0 leading-5 text-lg font-bold tracking-normal">
        Airbnb
      </h3>
      <ul className="grid gap-3 p-0 m-0">
        {arrListAirbnb.map((item, index) => {
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

export default ListAirbnb;
