import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import classesWp from "./util.module.css";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 1200,
  },
  recovered: {
    hex: "#002BD7",
    rgb: "rgb(0, 43, 215)",
    half_op: "rgba(0, 43, 215, 0.5)",
    multiplier: 800,
  },
  deaths: {
    hex: "#c0c0c0",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "0";

// draw circle on the map

export const showDataOnMap = (data, casesType = "cases", dark) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        fillColor: casesTypeColors[casesType].hex,
        color: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].multiplier
      }
    >
      <Popup className={`${dark ? "popup_dark" : "popup"}`}>
        <div>
          <div className={classesWp.topToolTip}>
            <div
              className={
                dark ? classesWp.titleInfoBox_dark : classesWp.titleInfoBox
              }
            >
              {country.country}
            </div>
            <img
              className="info-flag"
              src={country.countryInfo.flag}
              alt="flag"
            />

            <div className={classesWp.statLine}>
              <div
                className={classesWp.legendColor}
                style={{ backgroundColor: "red" }}
              ></div>
              <div className={dark ? classesWp.stat_dark : classesWp.stat}>
                Total Cases
              </div>
              <div className={classesWp.statCount}>
                {numeral(country.cases).format("0,0")}
              </div>
            </div>
            <div className={classesWp.statLine}>
              <div
                className={classesWp.legendColor}
                style={{ backgroundColor: "gray" }}
              ></div>
              <div className={dark ? classesWp.stat_dark : classesWp.stat}>
                Total Deaths
              </div>
              <div className={classesWp.statCount}>
                {numeral(country.deaths).format("0,0")}
              </div>
            </div>
            <div className={classesWp.statLine}>
              <div
                className={classesWp.legendColor}
                style={{ backgroundColor: "blue" }}
              ></div>
              <div className={dark ? classesWp.stat_dark : classesWp.stat}>
                Total Recovered
              </div>
              <div className={classesWp.statCount}>
                {numeral(country.recovered).format("0,0")}
              </div>
            </div>
            <i></i>
          </div>
        </div>
      </Popup>
    </Circle>
  ));
