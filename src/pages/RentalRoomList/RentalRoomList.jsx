import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { rentalRoomListService } from "../../services/rentalRoomList.service";
import InfoCard from "../../components/CardBody/InfoCard";
import Map from "../../components/Map/Map";

const RentalRoomList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rentalRoomList, setRentalRoomList] = useState([]);
  const infoCardRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(0);
  const selectedLocationId = searchParams.get("tenViTri");
  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");
  const totalGuests = searchParams.get("guests");
  const maViTri = searchParams.get("maViTri");

  const formattedCheckInDate = format(new Date(checkInDate), "dd MMMM yy");
  const formattedCheckOutDate = format(new Date(checkOutDate), "dd MMMM yy");
  const range = `${formattedCheckInDate} - ${formattedCheckOutDate}`;

  useEffect(() => {
    rentalRoomListService
      .getAllRentalRoomList(maViTri)
      .then((res) => {
        setRentalRoomList(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maViTri]);

  useEffect(() => {
    const updateMapHeight = () => {
      if (infoCardRef.current) {
        setMapHeight(infoCardRef.current.clientHeight);
      }
    };
    updateMapHeight(); // Cập nhật ngay sau khi render
    window.addEventListener("resize", updateMapHeight); // Cập nhật khi resize
    return () => {
      window.removeEventListener("resize", updateMapHeight); // Dọn dẹp
    };
  }, [rentalRoomList]);

  return (
    <div>
      <Header />
      <main className="flex mt-20 max-w-7xl sm:px-6 md:px-10 lg:px-20">
        <section ref={infoCardRef} className="pr-5 sm:w-full lg:w-1/2 xl:w-2/3">
          <p className="text-base">
            300+ Stays - {range} - for {totalGuests} {""}
            {totalGuests === "1" ? "guest" : "guests"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {selectedLocationId}
          </h1>
          <div className="hidden lg:inline-flex lg:text-base lg:flex-wrap xl:flex-nowrap mb-5 space-x-3 text-gray-800 whitespace-nowrap mr-5">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          {rentalRoomList.slice(0, 3).map((item, index) => {
            return (
              <InfoCard
                key={index}
                hinhAnh={item.hinhAnh}
                tenPhong={item.tenPhong}
                giaTien={item.giaTien}
                moTa={item.moTa}
              />
            );
          })}
        </section>

        <section
          className="hidden lg:inline-flex lg:w-1/2 xl:w-1/3 flex-grow overflow-hidden"
          style={{ height: mapHeight }}
        >
          <Map />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RentalRoomList;
