import React from "react";
import MediumCard from "../CardBody/MediumCard";

const CarouselProduct = () => {
  let arrCarouselProduct = [
    { img: "https://links.papareact.com/2io", title: "Outdoor getaways" },
    { img: "https://links.papareact.com/q7j", title: "Unique stays" },
    { img: "https://links.papareact.com/s03", title: "Entire homes" },
    { img: "https://links.papareact.com/8ix", title: "Pet allowed" },
  ];
  return (
    <div className="max-w-7xl mx-auto sm:px-6 md:px-10 lg:px-20">
      <section>
        <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
          {arrCarouselProduct.map((item, index) => (
            <MediumCard key={item.img} img={item.img} title={item.title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarouselProduct;
