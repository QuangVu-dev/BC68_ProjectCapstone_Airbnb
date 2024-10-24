import React from "react";

const MediumCard = ({ img, title }) => {
   return (
      <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
         <div className="relative h-80 w-80">
            <img src={img} layout="fill" className="rounded-xl " />
         </div>
         <h3 className="text-base sm:text-xl mt-3">{title}</h3>
      </div>
   );
};

export default MediumCard;
