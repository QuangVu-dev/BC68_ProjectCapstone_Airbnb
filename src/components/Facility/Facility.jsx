import React from "react";
import IconPool from "../../assets/iconFacility/IconPool";
import LinkCustom from "../LinkCustom/LinkCustom";
import IconRight from "../../assets/iconFacility/IconRight";
import IconParking from "../../assets/iconFacility/IconParking";
import IconMachine from "../../assets/iconFacility/IconMachine";
import IconAC from "../../assets/iconFacility/IconAC";
import IconHeater from "../../assets/iconFacility/IconHeater";
import IconTV from "../../assets/iconFacility/IconTV";
import IconHeating from "../../assets/iconFacility/IconHeating";
import IconBBQ from "../../assets/iconFacility/IconBBQ";

const Facility = () => {
   let arrFacility = [
      {
         img: <IconPool />,
         title: "Swimming Pool",
         icon: <IconRight />,
      },
      {
         img: <IconParking />,
         title: "Free parking",
         icon: <IconRight />,
      },
      {
         img: <IconMachine />,
         title: "Washing machine",
         icon: <IconRight />,
      },
      {
         img: <IconAC />,
         title: "Air conditioning",
         icon: <IconRight />,
      },
      {
         img: <IconHeater />,
         title: "Heater",
         icon: <IconRight />,
      },
      {
         img: <IconTV />,
         title: "TV",
         icon: <IconRight />,
      },
      {
         img: <IconHeating />,
         title: "Heating system",
         icon: <IconRight />,
      },
      {
         img: <IconBBQ />,
         title: "BBQ",
         icon: <IconRight />,
      },
   ];
   return (
      <div
         className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 lg:px-20"
         style={{ background: "#f7f7f7" }}
      >
         <section
            style={{
               padding: "96px 0",
            }}
         >
            <div className="m-0">
               <h2
                  className="pb-2 title_facility text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-9 text-left font-semibold"
                  style={{ color: "#222222" }}
               >
                  Choose the right amenities you like
               </h2>
               <p className="pb-6 text-base sm:text-lg leading-7" style={{ color: "#717171" }}>
                  You can choose from these top amenities and many more to make your stay as
                  pleasant as possible.
               </p>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 max-w-full gap-4">
               {arrFacility.map((item, index) => {
                  return (
                     <div
                        key={index}
                        className="rounded-xl shadow-none p-4 flex flex-row overflow-clip relative hover:scale-105 transform transition duration-300 ease-out"
                        style={{
                           border: "1px solid #DDDDDD",
                           backgroundColor: "#FFFFFF",
                        }}
                     >
                        <div
                           className="mr-4 rounded-md w-full flex justify-center self-start items-center h-11"
                           style={{ flex: "0 0 44px" }}
                        >
                           {item.img}
                        </div>
                        <div className="self-center">
                           <span
                              className="text-base leading-5 font-medium tracking-normal"
                              style={{ color: "#222222" }}
                           >
                              <LinkCustom
                                 content={item.title}
                                 icon={item.icon}
                                 className="flex gap-2 items-center justify-center "
                              />
                           </span>
                        </div>
                     </div>
                  );
               })}
            </div>
         </section>
      </div>
   );
};

export default Facility;
