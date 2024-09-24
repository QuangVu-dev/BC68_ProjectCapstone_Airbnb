import React from "react";
import imageBanner from "../../assets/banner/imageBanner.png";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";

const Banner = () => {
  return (
    <main className="flex justify-start flex-grow flex-col">
      <div className="box-border banner_container">
        <div style={{ display: "contents" }}>
          <div className="banner_wrapper">
            <div className="banner_content">
              <div className="content_inner relative">
                <div className="banner_image flex flex-col">
                  <img src={imageBanner} className="img_info" />
                </div>
                <FormSearchProduct />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
