import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";
import { defaults } from "react-chartjs-2";

export default function Vaccine({ country, dark }) {
  const [data, setData] = useState({});

  dark
    ? (defaults.global.defaultFontColor = "rgb(182, 170, 170)")
    : (defaults.global.defaultFontColor = "#767676");

  const options = {
    legend: {
      display: true,
      labels: {
        color: "white",
      },
    },
    title: {
      display: true,
      text: "Vaccine Coverages for the past 365 days",
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0.0a");
            },
          },
        },
      ],
    },
  };

  //   console.log(country);

  const fetchDataWorldWide = () => {
    const url =
      country === "Worldwide"
        ? "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=365"
        : `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=365`;

    axios.get(url).then((res) => {
      let data = country === "Worldwide" ? res.data : res.data.timeline;
      // console.log(data);
      // setDailyData(data);
      const date = Object.keys(data);
      const vaccines = Object.values(data);
      // console.log(date);

      setData({
        labels: date,
        datasets: [
          {
            data: vaccines,
            label: "Vaccines",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      });
    });
  };

  //   console.log(data);

  useEffect(() => {
    fetchDataWorldWide();
  }, [country]);

  return (
    <div style={{ height: "300px" }}>
      {/* {data?.length > 0 && ( */}
      <Line data={data} options={options} />
      {/* )} */}
    </div>
  );
}
