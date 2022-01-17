import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { showDataOnMap } from "../shared/util";

export default function Map({
  countries,
  casesType,
  center,
  zoom,
  mobile,
  dark,
}) {
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  //   console.log(countries);

  return mobile ? (
    <div className="map">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        animate={true}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType, dark)}
      </MapContainer>
    </div>
  ) : (
    <div className="map">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        animate={true}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        {showDataOnMap(countries, casesType, dark)}
      </MapContainer>
    </div>
  );
}
