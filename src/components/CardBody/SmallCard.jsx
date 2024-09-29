import React from "react";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const SmallCard = ({ hinhAnh, tenViTri, tinhThanh }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/list-of-available-rooms-for-rent?tenViTri=${tenViTri}`);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-start m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition tranform duration-200 ease-out"
    >
      {/* left */}
      <div className="relative h-20 w-20">
        <img
          src={hinhAnh}
          layout="fill"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* right */}
      <div>
        <h2 className="text-gray-500 text-xs">{tenViTri}</h2>
        <h3>{tinhThanh}</h3>
      </div>
    </div>
  );
};

export default SmallCard;
