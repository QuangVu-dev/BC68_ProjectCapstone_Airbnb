import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import IconMarker from "../../assets/iconMarker/IconMarker";

export const locationCoordinates = {
  1: { latitude: 10.7769, longitude: 106.6951 },
  2: { latitude: 10.0456, longitude: 105.746 },
  3: { latitude: 12.231, longitude: 109.1932 },
  4: { latitude: 21.0285, longitude: 105.8542 },
  5: { latitude: 12.2271, longitude: 109.189 },
  6: { latitude: 16.0583, longitude: 108.2152 },
  7: { latitude: 12.197, longitude: 108.436 },
  8: { latitude: 10.933, longitude: 108.2655 },
  9: { latitude: 15.9275, longitude: 108.3783 },
  10: { latitude: 21.506, longitude: 105.5745 },
};

const Map = ({ coordinates }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10.7769, // Vĩ độ mặc định
    longitude: 106.695, // Kinh độ mặc định
    zoom: 11,
  });

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      setViewport({
        ...viewport,
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
      });
    }
  }, [coordinates]);
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
    >
      {coordinates.map((result) => (
        <Marker
          key={result.longitude}
          longitude={result.longitude}
          latitude={result.latitude}
          offset={0}
          anchor="bottom"
        >
          <IconMarker />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
