import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { rentalRoomListService } from "../../services/rentalRoomList.service";
import InfoCard from "../../components/CardBody/InfoCard";
import Map from "../../components/Map/Map";
import { locationCoordinates } from "../../components/Map/Map";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPrice } from "../../redux/priceSlice";

const RentalRoomList = () => {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const [rentalRoomList, setRentalRoomList] = useState([]);
   const infoCardRef = useRef(null);
   const [coordinates, setCoordinates] = useState([]);
   const [mapHeight, setMapHeight] = useState(0);
   const [mapViewport, setMapViewport] = useState({
      latitude: 0,
      longitude: 0,
      zoom: 11,
   });
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
      const coords = locationCoordinates[maViTri]; // Lấy tọa độ theo maViTri
      if (coords) {
         setCoordinates([coords]); // Chuyển thành mảng có một phần tử
         setMapViewport({
            latitude: coords.latitude,
            longitude: coords.longitude,
            zoom: 11,
         });
      }
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
            <section ref={infoCardRef} className="pr-5 sm:w-full lg:w-1/2 xl:w-2/3 pt-10">
               <p className="text-base">
                  300+ Stays - {range} - for {totalGuests} {""}
                  {totalGuests === "1" ? "guest" : "guests"}
               </p>
               <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {selectedLocationId}</h1>
               <div className="hidden lg:inline-flex lg:text-base lg:flex-wrap xl:flex-nowrap mb-5 space-x-3 text-gray-800 whitespace-nowrap mr-5">
                  <p className="button">Cancellation Flexibility</p>
                  <p className="button">Type of Place</p>
                  <p className="button">Price</p>
                  <p className="button">Rooms and Beds</p>
                  <p className="button">More filters</p>
               </div>
               {rentalRoomList.slice(0, 3).map((item, index) => {
                  return (
                     <Link
                        to={`/room-rental-detail/${item.id}?selectedLocationId=${selectedLocationId}`}
                        key={index}
                     >
                        <InfoCard
                           key={index}
                           hinhAnh={item.hinhAnh}
                           tenPhong={item.tenPhong}
                           giaTien={item.giaTien}
                           amenities={{
                              wifi: item.wifi,
                              tivi: item.tivi,
                              mayGiat: item.mayGiat,
                              dieuHoa: item.dieuHoa,
                              bep: item.bep,
                              banLa: item.banLa,
                              doXe: item.doXe,
                              hoBoi: item.hoBoi,
                              banUi: item.banUi,
                           }}
                           roomInfo={{
                              khach: item.khach,
                              phongNgu: item.phongNgu,
                              giuong: item.giuong,
                              phongTam: item.phongTam,
                           }}
                        />
                     </Link>
                  );
               })}
            </section>

            <section
               className="hidden lg:inline-flex lg:w-1/2 xl:w-1/3 flex-grow overflow-hidden"
               style={{ height: mapHeight }}
            >
               <Map coordinates={coordinates} />
            </section>
         </main>
         <Footer />
      </div>
   );
};

export default RentalRoomList;
