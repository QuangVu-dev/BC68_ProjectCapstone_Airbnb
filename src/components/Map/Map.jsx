import React from "react";
import ReactMapGL from "react-map-gl";
import { useState } from "react";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10.7769, // Vĩ độ mặc định
    longitude: 106.6951, // Kinh độ mặc định
    zoom: 10,
  });
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  console.log("Mapbox Access Token:", mapboxAccessToken);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/standard"
      mapboxAccessToken={mapboxAccessToken}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
};

export default Map;
