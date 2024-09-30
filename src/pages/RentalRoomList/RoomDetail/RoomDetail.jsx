import React from "react";

const RoomDetail = ({ roomInfo }) => {
  const { khach, phongNgu, giuong, phongTam } = roomInfo;

  const pluralize = (count, word) => (count > 1 ? `${word}s` : word);

  return (
    <div className="flex space-x-2 mt-2 text-sm text-gray-500">
      <span className="font-semibold">
        {khach} {pluralize(khach, "Guest")}
      </span>
      <span className="mx-2">-</span>
      <span className="font-semibold">
        {phongNgu} {pluralize(phongNgu, "Bedroom")}
      </span>
      <span className="mx-2">-</span>
      <span className="font-semibold">
        {giuong} {pluralize(giuong, "Bed")}
      </span>
      <span className="mx-2">-</span>
      <span className="font-semibold">
        {phongTam} {pluralize(phongTam, "Bathroom")}
      </span>
    </div>
  );
};

export default RoomDetail;
