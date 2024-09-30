import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import IconMarker from "../../assets/iconMarker/IconMarker";

export const locationCoordinates = [
  { latitude: 10.7769, longitude: 106.6951 },
  { latitude: 10.0456, longitude: 105.746 },
  { latitude: 12.231, longitude: 109.1932 },
  { latitude: 21.0285, longitude: 105.8542 },
  { latitude: 12.2271, longitude: 109.189 },
  { latitude: 16.0583, longitude: 108.2152 },
  { latitude: 12.197, longitude: 108.436 },
  { latitude: 10.933, longitude: 108.2655 },
  { latitude: 15.9275, longitude: 108.3783 },
  { latitude: 21.506, longitude: 105.5745 },
];

const Map = ({ setCoordinates }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  useEffect(() => {
    if (setCoordinates) {
      setCoordinates(locationCoordinates);
    }
  }, [setCoordinates]);

  const coordinates = locationCoordinates.map((result) => ({
    longitude: result.longitude,
    latitude: result.latitude,
  }));
  if (!coordinates || coordinates.length === 0) {
    console.error("Invalid coordinates:", coordinates);
    return null;
  }
  const center =
    coordinates.length > 0
      ? getCenter(coordinates)
      : { latitude: 0, longitude: 0 };
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude || 10.7769, // Vĩ độ mặc định
    longitude: center.longitude || 106.695, // Kinh độ mặc định
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
    >
      {locationCoordinates.map((result) => (
        <div key={result.longitude}>
          <Marker
            longitude={result.longitude}
            latitude={result.latitude}
            offset={0}
            anchor="bottom"
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
              className="cursor-pointer text-2xl animate-bounce"
            >
              <IconMarker />
            </p>
          </Marker>

          {selectedLocation.longitude === result.longitude ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.latitude}
              longitude={result.longitude}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
