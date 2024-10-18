import FooterBooking from "./FooterBooking";
import HeaderBooking from "./HeaderBooking";
import "../../components/sass/pages/booking.scss";
import IconBack from "../../assets/booking/IconBack";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import InputCustom from "../../components/Input/InputCustom";
import IconEmail from "../../assets/iconSignup/IconEmail";
import IconPassword from "../../assets/iconSignup/IconPassword";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import IconArrow from "../../assets/iconSignin/IconArrow";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import IconStar from "../../assets/iconStar/IconStar";
import { format } from "date-fns";
import { authService } from "./../../services/auth.service";
import { setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import { NotificationContext } from "../../App";
import { useContext } from "react";

const Booking = () => {
   const dispatch = useDispatch();
   const { handleNotification } = useContext(NotificationContext);
   const room = useSelector((state) => state.room);
   console.log(room);
   const { hinhAnh, tenPhong } = room || {};
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const checkIn = queryParams.get("checkIn");
   const checkOut = queryParams.get("checkOut");
   const guests = queryParams.get("guests");
   const guestCount = parseInt(guests, 10);
   const guestText = guestCount === 1 ? "1 guest" : `${guestCount} guests`;
   const checkInDate = moment(checkIn);
   const checkOutDate = moment(checkOut);
   const { giaTien } = useSelector((state) => state.price);
   const { averageRating, totalComments } = useSelector((state) => state.rating);

   const calculateNights = () => {
      if (!checkInDate || !checkOutDate) return 0;
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);
      return (outDate - inDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
   };
   const getSecondPaymentDate = () => {
      const today = new Date();
      const inDate = new Date(checkInDate);

      // Tính khoảng cách từ hôm nay đến ngày check-in
      const timeDiff = inDate - today; // Thời gian chênh lệch tính bằng milliseconds

      // Tính ngày thanh toán đợt 2 (nửa khoảng thời gian)
      const halfTimeDiff = timeDiff / 2; // Nửa khoảng thời gian
      const secondPaymentDate = new Date(today.getTime() + halfTimeDiff); // Ngày thanh toán đợt 2

      return secondPaymentDate < inDate ? secondPaymentDate : null; // Trả về nếu hợp lệ
   };

   const secondPaymentDate = getSecondPaymentDate();
   const formattedSecondPaymentDate = format(secondPaymentDate, "MMM dd, yyyy");
   const nights = calculateNights();
   // const nightsFromToday = calculateNightsFromToday();
   const totalPrice = giaTien * nights;
   const priceForToday = totalPrice / 2;
   const priceAfterToday = totalPrice - priceForToday;

   let formattedDate;
   if (checkInDate.month() === checkOutDate.month()) {
      // Cùng tháng
      formattedDate = `${checkInDate.format(
         "MMM"
      )} ${checkInDate.date()} - ${checkOutDate.date()}, ${checkInDate.year()}`;
   } else {
      // Khác tháng
      formattedDate = `${checkInDate.format("MMM DD, YYYY")} - ${checkOutDate.format(
         "MMM DD, YYYY"
      )}`;
   }
   const navigate = useNavigate();
   const handleBackClick = () => {
      navigate(-1); // Quay lại trang trước đó (RentalRoomDetail)
   };
   const { values, handleSubmit, handleChange, errors, touched, handleBlur } = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      onSubmit: async (values) => {
         console.log(values);
         try {
            const result = await authService.signIn(values);
            console.log(result);
            setLocalStorage("user", result.data.content);
            dispatch(setValueUser(result.data.content));
            handleNotification(
               "Sign in successful, you will be redirected to the homepage",
               "success"
            );
            setTimeout(() => {
               navigate("/");
            }, 2000);
         } catch (error) {
            console.log(error);
            handleNotification(error.response.data.content, "error");
         }
      },
      validationSchema: yup.object({
         email: yup.string().required(notiValidation.empty).email(notiValidation.email),
         password: yup.string().required(notiValidation.empty).min(6).max(10),
      }),
   });
   return (
      <div>
         <HeaderBooking />
         <main style={{ overflow: "visible" }}>
            <div style={{ height: "auto" }}>
               <div style={{ display: "contents" }}>
                  <div className="sm:px-6 md:px-10 lg:px-20">
                     <div className="content_booking">
                        <div className="flex items-center flex-row mb-4 mt-20 pt-16">
                           <div
                              style={{
                                 paddingRight: "18px",
                                 marginTop: "10px",
                                 marginLeft: "-34px",
                              }}
                           >
                              <button onClick={handleBackClick} className="btn_back">
                                 <span className="relative">
                                    <IconBack />
                                 </span>
                              </button>
                           </div>
                           <div
                              className="leading-9 font-medium text-4xl"
                              style={{ letterSpacing: "-0.04rem" }}
                           >
                              <h1>Confirm and pay</h1>
                           </div>
                        </div>
                        <div className="flex items-stretch justify-start flex-wrap w-full ml-auto mr-auto sm:px-6 md:px-10 lg:px-20">
                           <div className="relative w-1/2 mx-auto">
                              <div className="mb-16">
                                 <div style={{ display: "block" }}>
                                    <div className="pb-6 mt-8">
                                       <div
                                          className="font-medium"
                                          style={{
                                             lineHeight: "1.625rem",
                                             fontSize: "1.375rem",
                                             letterSpacing: "-0.01375rem",
                                             color: "#222222",
                                          }}
                                       >
                                          <h2 className="md:text-xl md:leading-7 font-semibold xl:text-2xl">
                                             Your trip
                                          </h2>
                                       </div>
                                    </div>
                                    <div className="pb-6">
                                       <div className="flex justify-between items-baseline">
                                          <div className="pr-6">
                                             <div className="font-normal">
                                                <h3 className="text-base">Dates</h3>
                                                <p>{formattedDate}</p>
                                             </div>
                                             <div className="mt-2 whitespace-pre-wrap"></div>
                                          </div>
                                          <div className="flex-shrink-0">
                                             <button className="underline">Edit</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="pb-6">
                                       <div className="flex justify-between items-baseline">
                                          <div className="pr-6">
                                             <div className="font-normal">
                                                <h3 className="text-base">Guests</h3>
                                                <p>{guestText}</p>
                                             </div>
                                             <div className="mt-2 whitespace-pre-wrap"></div>
                                          </div>
                                          <div className="flex-shrink-0">
                                             <button className="underline">Edit</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="mt-2">
                                       <div
                                          className="border-t"
                                          style={{ borderTopColor: "rgb(221 221 221)" }}
                                       ></div>
                                       <div className="pt-8 pb-6">
                                          <div className="leading-7 md:text-xl">
                                             <h2 className="md:text-xl md:leading-7 font-semibold xl:text-2xl">
                                                Choose how to pay
                                             </h2>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="pb-6">
                                       <fieldset>
                                          <div
                                             className="p-4 border-none pay_date"
                                             style={{
                                                outline: "none",
                                                boxShadow: "0 0 0 1px inset #dddddd",
                                                borderRadius: "8px 8px 0 0",
                                             }}
                                          >
                                             <label className="flex justify-between">
                                                <div className="w-full">
                                                   <div className="mr-3">
                                                      <div className="flex justify-between">
                                                         Pay ${totalPrice.toFixed(2)} now
                                                      </div>
                                                   </div>
                                                   <div className="pt-1 mr-3 leading-5 text-sm"></div>
                                                </div>
                                                <input
                                                   type="radio"
                                                   checked
                                                   value="0"
                                                   className="block w-6 h-6 cursor-pointer"
                                                   style={{
                                                      borderWidth: "7px",
                                                      borderRadius: "50%",
                                                      background: "#FFFFFF",
                                                      borderColor: "#222222",
                                                      borderStyle: "solid",
                                                      overflow: "hidden",
                                                      verticalAlign: "top",
                                                      flex: "0 0 auto",
                                                      outline: "0",
                                                   }}
                                                />
                                             </label>
                                          </div>
                                          <div
                                             className="p-4 border-none pay_date"
                                             style={{
                                                outline: "none",
                                                boxShadow: "0 0 0 1px inset #dddddd",
                                                borderRadius: "0 0 8px 8px",
                                             }}
                                          >
                                             <label className="flex justify-between">
                                                <div className="w-full">
                                                   <div className="mr-3">
                                                      <div className="flex flex-col">
                                                         <div>Pay part now, part later</div>
                                                         <div className="font-light">
                                                            ${priceForToday} due today, $
                                                            {priceAfterToday} on{" "}
                                                            {formattedSecondPaymentDate}. No extra
                                                            fees
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="pt-1 mr-3 leading-5 text-sm"></div>
                                                </div>
                                                <input
                                                   type="radio"
                                                   checked
                                                   value="0"
                                                   className="block w-6 h-6 cursor-pointer"
                                                   style={{
                                                      borderWidth: "7px",
                                                      borderRadius: "50%",
                                                      background: "#FFFFFF",
                                                      borderColor: "#222222",
                                                      borderStyle: "solid",
                                                      overflow: "hidden",
                                                      verticalAlign: "top",
                                                      flex: "0 0 auto",
                                                      outline: "0",
                                                   }}
                                                />
                                             </label>
                                          </div>
                                       </fieldset>
                                    </div>
                                    <div className="mt-2">
                                       <div
                                          className="border-t"
                                          style={{
                                             borderTopStyle: "solid",
                                             background: "rgb(221 221 221)",
                                          }}
                                       ></div>
                                       <div className="pt-8 pb-6">
                                          <h2 className="md:text-xl md:leading-7 mb-6 font-semibold xl:text-2xl">
                                             Log in or sign up to book
                                          </h2>
                                          <form onSubmit={handleSubmit} className="signin100_form">
                                             <InputCustom
                                                contentLabel={<IconEmail />}
                                                placeHolder="Email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                                error={errors.email}
                                                touched={touched.email}
                                                classWrapper="wrap_input100"
                                                focusInputClass="focus_input100"
                                             />

                                             <InputCustom
                                                contentLabel={<IconPassword />}
                                                placeHolder="Password"
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                onBlur={handleBlur}
                                                error={errors.password}
                                                touched={touched.password}
                                                classWrapper="wrap_input100"
                                                focusInputClass="focus_input100"
                                             />

                                             <div className="container_signin100_form_btn">
                                                <button
                                                   type="submit"
                                                   className="signin100_form_btn"
                                                >
                                                   CONTINUE
                                                </button>
                                             </div>
                                             <div className="signin_image">
                                                <LinkCustom
                                                   content={"Create your Account"}
                                                   to={pathDefault.signup}
                                                   className={
                                                      "signin_image_link flex items-center justify-end gap-2"
                                                   }
                                                   icon={<IconArrow />}
                                                />
                                             </div>
                                          </form>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="relative content_booking_right">
                              <div
                                 className="sticky inline-block w-full top-20"
                                 style={{ paddingRight: "1px" }}
                              >
                                 <div
                                    className="info_card_booking mt-8"
                                    style={{ marginBottom: "88px" }}
                                 >
                                    <div className="room_info pb-6">
                                       <div className="flex items-center flex-row">
                                          <div
                                             className="flex-shrink-0 flex-grow-0"
                                             style={{
                                                borderRadius: "12px",
                                                // overflow: "hidden",
                                                width: "104px",
                                                height: "98px",
                                             }}
                                          >
                                             <div
                                                className="relative"
                                                style={{
                                                   backgroundRepeat: "no-repeat",
                                                   backgroundPosition: "50% 50%",
                                                   paddingTop: "105.2632%",
                                                }}
                                             >
                                                <div
                                                   className="flex absolute justify-center items-center"
                                                   style={{
                                                      top: "0",
                                                      bottom: "0",
                                                      left: "0",
                                                      right: "0",
                                                   }}
                                                >
                                                   {hinhAnh && (
                                                      <img
                                                         src={hinhAnh}
                                                         alt={tenPhong}
                                                         className="absolute w-full h-full"
                                                         style={{
                                                            right: "0",
                                                            left: "0",
                                                            top: "0",
                                                            bottom: "0",
                                                            objectFit: "cover",
                                                         }}
                                                      />
                                                   )}
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pl-4 pt-0 flex flex-col justify-between">
                                             <div
                                                className="mb-1 font-semibold flex justify-between flex-col gap-2"
                                                style={{
                                                   overflow: "clip",
                                                   textOverflow: "ellipsis",
                                                }}
                                             >
                                                <h3>{tenPhong}</h3>
                                                <div className="flex items-center">
                                                   <p className="text-yellow-500">
                                                      <IconStar />
                                                   </p>
                                                   <p className="px-1 font-semibold">
                                                      {averageRating.toFixed(2)}
                                                   </p>
                                                   (
                                                   <p className="font-extralight">
                                                      {totalComments} review
                                                      {totalComments > 1 ? "s" : ""}
                                                   </p>
                                                   )
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="price_detail">
                                       <div
                                          className="border-t"
                                          style={{
                                             borderTopStyle: "solid",
                                             borderTopColor: "rgb(221 221 221)",
                                          }}
                                       ></div>
                                       <div className="py-6">
                                          <h2 className="text-2xl font-semibold">Price details</h2>
                                       </div>
                                    </div>
                                    <div className="price_total">
                                       <div className="flex justify-between items-center mt-4">
                                          <p>
                                             {nights} x night{nights !== 1 ? "s" : ""}:
                                          </p>
                                          <p>${totalPrice.toFixed(2)}</p>
                                       </div>
                                       <div
                                          className="flex justify-between items-center font-bold mt-4"
                                          style={{
                                             color: "#222222",
                                             borderTop: "1px solid #dddddd",
                                             paddingTop: "20px",
                                          }}
                                       >
                                          <p className="m-0">Total: </p>
                                          <p className="m-0">${totalPrice.toFixed(2)}</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
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
