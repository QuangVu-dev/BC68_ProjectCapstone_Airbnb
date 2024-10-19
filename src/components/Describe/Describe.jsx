import React from "react";

const Describe = () => {
   let arrDescribe = [
      {
         img: "https://a0.muscache.com/im/pictures/7c7ccb34-a563-4f25-9fba-e4a46e2dbc3a.jpg?im_w=240",
         title: "Enjoy flexibility",
         paragram:
            "Accommodations with flexible cancellation policies will allow you to easily rebook if your plans change.",
      },
      {
         img: "https://a0.muscache.com/im/pictures/d51be571-b8cf-4379-8d3f-7c5e56c9def5.jpg?im_w=240",
         title: "Over 7 million active listings",
         paragram:
            "Join over 1 billion travelers who have found vacations in over 220 countries and destinations.",
      },
      {
         img: "https://a0.muscache.com/im/pictures/a52e81a9-e390-4e74-b197-1aeeffd0e5ab.jpg?im_w=240",
         title: "Over 100 filters to help find accommodation according to your needs",
         paragram:
            "Choose your price range, number of rooms, and other important amenities to find the right accommodation for your needs.",
      },
   ];
   return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 lg:px-20">
         <section
            className="grid grid-cols-1 md:grid-cols-3 max-w-full"
            style={{ padding: "48px 0px", gridGap: "64px 48px" }}
         >
            {arrDescribe.map((item, index) => {
               return (
                  <div
                     key={index}
                     className="p-0 grid grid-cols-1 items-start"
                     style={{ gridTemplateRows: "min-content" }}
                  >
                     <div className="pb-6 flex w-full content-start md:pb-6">
                        <div className="w-8 max-w-full object-cover aspect-[133/132]">
                           <img
                              src={item.img}
                              alt=""
                              className="rounded-none block w-full h-auto"
                           />
                        </div>
                     </div>
                     <div className="flex flex-col items-start">
                        <h2
                           className="pb-3 m-0 text-2xl leading-6 font-semibold tracking-normal w-auto"
                           style={{ color: "#222222" }}
                        >
                           {item.title}
                        </h2>
                        <div
                           className="pb-1 m-0 text-lg leading-7 font-light w-auto"
                           style={{ color: "#222222", verticalAlign: "inherit" }}
                        >
                           <p className="pr-10">{item.paragram}</p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </section>
      </div>
   );
};

export default Describe;
