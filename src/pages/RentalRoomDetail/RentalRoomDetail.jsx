import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { rentalRoomDetailService } from "../../services/rentalRoomDetail.service";
import RoomDetail from "../RentalRoomList/RoomDetail/RoomDetail";
import CheckForm from "../../templates/FormTemplate/CheckForm";
import IconWifi from "../../assets/iconFacility/IconWifi";
import IconAC from "../../assets/iconFacility/IconAC";
import IconPool from "../../assets/iconFacility/IconPool";
import IconParking from "../../assets/iconFacility/IconParking";
import IconBoardGame from "../../assets/iconFacility/IconBoardGame";
import IconIron from "../../assets/iconFacility/IconIron";
import IconKitchen from "../../assets/iconFacility/IconKitchen";
import IconTV from "../../assets/iconFacility/IconTV";
import IconMachine from "../../assets/iconFacility/IconMachine";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { setRoomInfo } from "../../redux/roomInfoSlice";
import { setPrice } from "../../redux/priceSlice";

const RentalRoomDetail = () => {
   const { id } = useParams();
   const [roomDetails, setRoomDetails] = useState(null);
   const [searchParams] = useSearchParams();
   const selectedLocationId = searchParams.get("selectedLocationId");
   const dispatch = useDispatch();

   useEffect(() => {
      rentalRoomDetailService
         .getRentalRoomDetailById(id)
         .then((res) => {
            setRoomDetails(res.data.content);
            const { hinhAnh, tenPhong, giaTien } = res.data.content;
            dispatch(
               setRoomInfo({
                  hinhAnh: res.data.content.hinhAnh,
                  tenPhong: res.data.content.tenPhong,
               })
            );
            dispatch(
               setPrice({
                  giaTien,
               })
            );
         })
         .catch((err) => {
            console.log(err);
         });
   }, [id, dispatch]);
   if (!roomDetails) {
      return <div>Loading...</div>; // Show loading state while fetching data
   }

   return (
      <div>
         <Header />
         <main className="mt-20 max-w-7xl sm:px-6 md:px-10 lg:px-20 p-5">
            <h1 className="text-3xl font-semibold">{roomDetails.tenPhong}</h1>
            <img src={roomDetails.hinhAnh} alt={roomDetails.tenPhong} className="my-4 rounded-lg" />
            <div className="flex items-stretch justify-start flex-nowrap w-full mx-auto">
               <div className="w-2/3">
                  <div className="py-8" style={{ borderBottom: "1px solid rgb(221 221 221)" }}>
                     <h2 className="text-2xl">Entire home in {selectedLocationId}</h2>
                     <RoomDetail
                        roomInfo={{
                           khach: roomDetails.khach,
                           phongNgu: roomDetails.phongNgu,
                           giuong: roomDetails.giuong,
                           phongTam: roomDetails.phongTam,
                        }}
                     />
                  </div>
                  <div className="py-12">
                     <h2 className="text-2xl pb-4">About this place</h2>
                     <p className="mt-2 leading-8">{roomDetails.moTa}</p>
                  </div>
                  <div
                     className="mt-4 py-12"
                     style={{
                        borderTop: "1px solid rgb(221 221 221)",
                     }}
                  >
                     <h2 className="text-2xl font-semibold pb-6" style={{ color: "#222222" }}>
                        What this place offers
                     </h2>
                     <ul className="font-extralight flex flex-wrap" style={{ color: "#222222" }}>
                        {roomDetails.wifi && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconWifi />
                              </div>
                              Wifi
                           </li>
                        )}
                        {roomDetails.dieuHoa && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconAC />
                              </div>
                              Air Conditioning
                           </li>
                        )}
                        {roomDetails.mayGiat && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconMachine />
                              </div>
                              Washing Machine
                           </li>
                        )}
                        {roomDetails.tivi && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconTV />
                              </div>
                              Television
                           </li>
                        )}
                        {roomDetails.bep && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconKitchen />
                              </div>
                              Kitchen
                           </li>
                        )}
                        {roomDetails.banLa && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconIron />
                              </div>
                              Iron
                           </li>
                        )}
                        {roomDetails.doXe && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconParking />
                              </div>
                              Parking
                           </li>
                        )}
                        {roomDetails.hoBoi && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconPool />
                              </div>
                              Swimming Pool
                           </li>
                        )}
                        {roomDetails.banUi && (
                           <li className="flex items-center pb-4 w-1/2">
                              <div className="mr-4">
                                 <IconBoardGame />
                              </div>
                              Board Games
                           </li>
                        )}
                     </ul>
                  </div>
               </div>
               <div className="relative mr-0 w-1/3" style={{ marginLeft: "8.3333%" }}>
                  <div
                     className="sticky top-20 w-full inline-block"
                     style={{ zIndex: "10", paddingRight: "1px" }}
                  >
                     <div className="pb-12">
                        <div className="mt-8">
                           <CheckForm price={roomDetails.giaTien} roomId={id} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <Comment roomId={id} />
         </main>
         <Footer />
      </div>
   );
};

export default RentalRoomDetail;
