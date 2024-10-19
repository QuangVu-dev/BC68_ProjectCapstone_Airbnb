import React from "react";
import LinkCustom from "../../LinkCustom/LinkCustom";
import { pathDefault } from "../../../common/path";

const arrListSupport = [
   {
      label: <LinkCustom content={"Help Centre"} to={pathDefault.help} />,
      key: "0",
   },
   {
      label: <LinkCustom content={"AirCover"} to={pathDefault.help} />,
      key: "1",
   },
   {
      label: <LinkCustom content={"Anti-discrimination"} to={pathDefault.help} />,
      key: "2",
   },
   {
      label: <LinkCustom content={"Cancellation Options"} to={pathDefault.help} />,
      key: "3",
   },
   {
      label: <LinkCustom content={"Report neighbourhood concern"} to={pathDefault.help} />,
      key: "4",
   },
];

const ListSupport = () => {
   return (
      <div className="footer_support pt-3 pb-5 sm:grid-cols-1 sm:py-6">
         <h3 className="mb-3 m-0 leading-5 text-xl sm:text-2xl font-bold tracking-normal">
            Support
         </h3>
         <ul className="grid gap-3 p-0 m-0">
            {arrListSupport.map((item, index) => {
               return (
                  <li key={index} className="text-sm sm:text-base hover:underline">
                     {item.label}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default ListSupport;
