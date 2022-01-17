import React from "react";
import "./Table.css";
import numeral from "numeral";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Table({ tableData, dark }) {
  return dark ? (
    <Card>
      <CardContent>
        <div className="table_dark">
          <h3>Latest Covid-19 Updates</h3>
          {tableData.map((country) => (
            <tr onClick={(e) => console.log(e.target.value)}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardContent>
        <div className="table">
          <h3>Latest Covid-19 Updates</h3>
          {tableData.map((country) => (
            <tr onClick={(e) => console.log(e.target.value)}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
