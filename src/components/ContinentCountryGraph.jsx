import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";
import randomColor from "randomcolor";

export default function ContinentCountryGraph({ continent, country }) {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(
    randomColor({ count: 50 })
  );

  const options = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `${continent} Cases Statistics`,
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
    const url = `https://disease.sh/v3/covid-19/continents/${continent}`;
    axios.get(url).then((res) => {
      let data = res.data;
      const total_cases = data.cases;
      let temp = data.countries;
      let queries = temp.join().replace(/,/g, "%2C%20");
      //   console.log(queries);

      fetchDataCountry(queries);

      setCountries(temp);
    });
  };

  //   console.log(backgroundColor);

  const fetchDataCountry = (queries) => {
    const url = `https://disease.sh/v3/covid-19/countries/${queries}`;
    axios.get(url).then((res) => {
      const data = res.data;
      const cases = [];
      data.map((arr) => {
        cases.push(arr.cases);
      });

      setData({
        labels: countries,
        datasets: [
          {
            data: cases,
            backgroundColor: backgroundColor,
          },
        ],
      });

      //   console.log(countries);
      //   console.log(cases);
    });
  };

  //   console.log(data);
  useEffect(() => {
    fetchDataWorldWide();
  }, [countries]);

  return (
    <div style={{ height: "300px" }}>
      {/* {data?.length > 0 && ( */}
      <Bar data={data} options={options} />
      {/* )} */}
    </div>
  );
}
