import React from "react";
import ReactMapGL from "react-map-gl";
import { useState } from "react";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10.7769, // Vĩ độ mặc định
    longitude: 106.6951, // Kinh độ mặc định
    zoom: 11,
  });
  const handleViewportChange = (nextViewport) => {
    setViewport(nextViewport);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onMove={handleViewportChange}
      dragPan={true}
      scrollZoom={true}
      doubleClickZoom={true}
    ></ReactMapGL>
  );
};

export default Map;
