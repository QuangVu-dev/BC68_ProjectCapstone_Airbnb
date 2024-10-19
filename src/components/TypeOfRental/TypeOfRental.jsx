import React from "react";
import "../sass/pages/homePage.scss";
import Bungalows from "../../assets/typeOfRental/Bungalows.png";

const TypeOfRental = () => {
   return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 lg:px-20">
         <div className="mb-4 flex flex-col">
            <div className="p-0 m-0 text-2xl font-bold">Holiday rentals for every kind of trip</div>
         </div>

         <div className="grid grid-cols-3">
            <div className="row-span-2 col-span-2 bungalow">
               <img src={Bungalows} alt="" />
            </div>
            <div className="row-span-2 col-span-1"></div>
            <div className="row-span-2 col-span-1"></div>

            <div></div>
            <div></div>
         </div>
      </div>
   );
};

export default TypeOfRental;
