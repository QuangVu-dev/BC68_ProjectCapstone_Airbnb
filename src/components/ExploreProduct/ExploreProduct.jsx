import React, { useEffect, useState } from "react";
import SmallCard from "../CardBody/SmallCard";
import { searchPageService } from "../../services/searchPage.service";

const ExploreProduct = () => {
  const [searchPage, setSearchPage] = useState([]);

  useEffect(() => {
    const pageIndex = 1;
    const pageSize = 10;
    searchPageService
      .getAllSearchPage(pageIndex, pageSize)
      .then((res) => {
        const content = res.data.content;
        if (content && Array.isArray(content.data)) {
          setSearchPage(content.data);
        } else {
          setSearchPage([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setSearchPage([]);
      });
  }, []);

  const renderSearchPage = () => {
    return (
      <div className="max-w-7xl mx-auto sm:px-6 md:px-10 lg:px-20">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchPage.map((item, index) => {
            return (
              <SmallCard
                key={item.hinhAnh}
                hinhAnh={item.hinhAnh}
                tenViTri={item.tenViTri}
                tinhThanh={item.tinhThanh}
              />
            );
          })}
        </section>
      </div>
    );
  };

  return (
    <section className="py-8">
      <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
      {renderSearchPage()}
    </section>
  );
};

export default ExploreProduct;
