import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import ExploreProduct from "../../components/ExploreProduct/ExploreProduct";
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct";
import Describe from "../../components/Describe/Describe";
import Facility from "../../components/Facility/Facility";
import QuestionAndAnswer from "../../components/Q&A/QuestionAndAnswer";

const UserTemplate = () => {
   return (
      <>
         <Header />
         <Banner />
         <main>
            <Describe />
            <ExploreProduct />
            <Facility />
            <CarouselProduct />
            <Outlet />
            <QuestionAndAnswer />
         </main>
         <Footer />
      </>
   );
};

export default UserTemplate;
