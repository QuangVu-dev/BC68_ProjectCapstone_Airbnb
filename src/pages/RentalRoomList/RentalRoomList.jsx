import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { rentalRoomListService } from "../../services/rentalRoomList.service";
import InfoCard from "./InfoCard/InfoCard";
import Map from "../../components/Map/Map";

const RentalRoomList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rentalRoomList, setRentalRoomList] = useState([]);

  const selectedLocationId = searchParams.get("tenViTri");
  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");
  const totalGuests = searchParams.get("guests");
  const maViTri = searchParams.get("maViTri");
  console.log(maViTri);
  console.log(searchParams);

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

  return (
    <div>
      <Header />
      <main className="flex mt-20">
        <section className="max-w-7xl sm:px-6 md:px-10 lg:px-20">
          <p className="text-xs">
            300+ Stays - {range} - for {totalGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {selectedLocationId}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
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

        <section className="hiiden xl:inline-flex xl:min-w-[600px]">
          <Map />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RentalRoomList;
