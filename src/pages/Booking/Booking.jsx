import FooterBooking from "./FooterBooking";
import HeaderBooking from "./HeaderBooking";
import "../../components/sass/pages/booking.scss";
import IconBack from "../../assets/booking/IconBack";

const Booking = () => {
   return (
      <div>
         <HeaderBooking />
         <main className="mt-20">
            <div style={{ minHeight: "100vh" }}>
               <div style={{ display: "contents" }}>
                  <div>
                     <div className="sm:px-6 md:px-10 lg:px-20">
                        <div style={{ paddingBottom: "32px" }}>
                           <div className="flex items-center flex-row pb-4 mt-20 pt-16">
                              <div
                                 style={{
                                    paddingRight: "18px",
                                    marginTop: "10px",
                                    marginLeft: "-34px",
                                 }}
                              >
                                 <a href="#" className="btn_back">
                                    <span className="relative">
                                       <IconBack />
                                    </span>
                                 </a>
                              </div>
                              <div
                                 className="leading-9 font-medium text-4xl"
                                 style={{ letterSpacing: "-0.04rem" }}
                              >
                                 <h1>Confirm and pay</h1>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="content_booking">
                     <div className="flex items-stretch justify-start flex-wrap w-full ml-auto mr-auto sm:px-6 md:px-10 lg:px-20">
                        <div className="relative w-1/2 mx-auto">
                           <div className="mb-16">
                              <div style={{ display: "contents" }}>
                                 <div style={{ paddingBottom: "24px" }}>
                                    <div
                                       className="font-medium"
                                       style={{
                                          lineHeight: "1.625rem",
                                          fontSize: "1.375rem",
                                          letterSpacing: "-0.01375rem",
                                          color: "#222222",
                                       }}
                                    >
                                       <h2>Your trip</h2>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="relative content_booking_right">
                           <div
                              className="sticky inline-block w-full"
                              style={{ top: "80px", paddingRight: "1px", zIndex: "1" }}
                           >
                              <div
                                 className="info_card_booking"
                                 style={{ marginBottom: "88px" }}
                              ></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <FooterBooking />
      </div>
   );
};

export default Booking;
