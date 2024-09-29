import React from "react";

const InfoCard = ({ hinhAnh, tenPhong, giaTien, moTa }) => {
  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t items-stretch">
      <div className="relative h-24 w-1/3 md:h-48 md:w-1/3 flex-shrink-0 flex items-center justify-center">
        <img
          src={hinhAnh}
          alt={tenPhong}
          objectFit="contain"
          layout="fill"
          className="rounded-2xl h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5 justify-center w-2/3">
        <h3 className="text-xl">{tenPhong}</h3>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 lg:text-xs xl:text-sm text-gray-500">{moTa}</p>
        <p className="text-base font-semibold pt-2 text-right lg:text-lg">
          {giaTien} $
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
