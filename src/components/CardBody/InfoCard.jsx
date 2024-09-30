import React from "react";
import Amenities from "../../pages/RentalRoomList/Amenities/Amenities";
import RoomDetail from "../../pages/RentalRoomList/RoomDetail/RoomDetail";

const InfoCard = ({ hinhAnh, tenPhong, giaTien, amenities, roomInfo }) => {
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
        <h3 className="text-2xl font-extrabold">{tenPhong}</h3>
        <div className="border-b w-10 pt-2" />
        <span className="text-base">Room information:</span>
        <RoomDetail roomInfo={roomInfo} />
        <span className="text-base mt-4">This property offers:</span>{" "}
        <Amenities amenities={amenities} />
        <p className="text-base font-semibold pt-2 text-right lg:text-base">
          {giaTien} $
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
