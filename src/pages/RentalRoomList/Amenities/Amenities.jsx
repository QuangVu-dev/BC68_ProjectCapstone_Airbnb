import React from "react";

const Amenities = ({ amenities }) => {
   const amenityItems = [
      { label: "WiFi", value: amenities.wifi },
      { label: "TV", value: amenities.tivi },
      { label: "Washing Machine", value: amenities.mayGiat },
      { label: "Air Conditioning", value: amenities.dieuHoa },
      { label: "Kitchen", value: amenities.bep },
      { label: "Iron", value: amenities.banLa },
      { label: "Parking", value: amenities.doXe },
      { label: "Swimming Pool", value: amenities.hoBoi },
      { label: "Heater", value: amenities.banUi },
   ];

   return (
      <div className="flex flex-wrap gap-2 mt-2 text-gray-500">
         {amenityItems.map(
            (item, index) =>
               item.value && (
                  <div key={index} className="border p-1 text-sm font-light">
                     {item.label}
                  </div>
               )
         )}
      </div>
   );
};

export default Amenities;
