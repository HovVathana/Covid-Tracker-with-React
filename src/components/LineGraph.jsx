import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";

export default function LineGraph({ country }) {
  const [data, setData] = useState({});

  const options = {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Statistics for the past 365 days",
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
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=365"
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=365`;

    axios.get(url).then((res) => {
      let data = country === "Worldwide" ? res.data : res.data.timeline;
      // console.log(data);
      // setDailyData(data);
      const date = Object.keys(data.cases);
      const cases = Object.values(data.cases);
      const deaths = Object.values(data.deaths);
      const recovered = Object.values(data.recovered);
      // console.log(date);

      setData({
        labels: date,
        datasets: [
          {
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: cases,
            label: "Cases",
            fill: false,
          },
          {
            data: deaths,
            label: "Deaths",
            borderColor: "gray",
            backgroundColor: "gray",
            fill: false,
          },
          {
            data: recovered,
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
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
