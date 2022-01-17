import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";

export default function ContinentGraph() {
  const [data, setData] = useState({});

  const options = {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Continents Cases Statistics",
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return (
            numeral(currentValue).format("+0,0") + " (" + percentage + "%)"
          );
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },

    elements: {
      point: {
        radius: 0,
      },
    },

    responsive: true,
    maintainAspectRatio: false,
  };

  //   console.log(country);

  const fetchDataWorldWide = () => {
    const url = "https://disease.sh/v3/covid-19/continents";

    axios.get(url).then((res) => {
      let data = res.data;
      //   console.log(data);
      const continent = [];
      const cases = [];

      data.map((arr) => {
        continent.push(arr.continent);
        cases.push(arr.cases);
      });

      setData({
        labels: continent,
        datasets: [
          {
            data: cases,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "red",
              "gray",
              "green",
            ],
          },
        ],
      });
    });
  };

  //   console.log(data);

  useEffect(() => {
    fetchDataWorldWide();
  }, []);

  return (
    <div style={{ height: "300px" }}>
      {/* {data?.length > 0 && ( */}
      <Doughnut data={data} options={options} />
      {/* <Line data={data} options={options} /> */}
      {/* )} */}
    </div>
  );
}
