import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { showDataOnMap } from "../shared/util";

export default function DarkMap({
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

  return mobile ? (
    <div className="map_dark">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        animate={true}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=14c051b5-75de-4586-97da-94ee93f2ba08"
        />
        {showDataOnMap(countries, casesType, dark)}
      </MapContainer>
    </div>
  ) : (
    <div className="map_dark">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        animate={true}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=14c051b5-75de-4586-97da-94ee93f2ba08"
        />
        <ZoomControl position="topright" />
        {showDataOnMap(countries, casesType, dark)}
      </MapContainer>
    </div>
  );
}
