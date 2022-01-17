import React from "react";
import Typography from "@material-ui/core/Typography";
import classes from "./InfoPaper.module.css";
import { Grid } from "@material-ui/core";

export default function InfoPaper({
  global,
  cases,
  recovered,
  deaths,
  country,
  open,
  openChange,
  setCasesType,
  casesType,
}) {
  return (
    <div className={classes.InfoPaper}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{country}</Typography>
          {open ? null : (
            <h9
              style={{
                color: "gray",
                cursor: "pointer",
              }}
              onClick={openChange}
            >
              Detail
            </h9>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ color: "#DE3700" }}>
            {global}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <h2 className={classes.legend}>
            <div className={classes.color} style={{ background: "red" }} />
            <div
              className={`classes.description ${
                casesType === "cases" && classes.description_selected_red
              }`}
              style={{ cursor: "pointer" }}
              onClick={(e) => setCasesType("cases")}
            >
              Total Cases
            </div>
            <div className={classes.total}>{cases}</div>
          </h2>
          <h2 className={classes.legend}>
            <div className={classes.color} style={{ background: "blue" }} />
            <div
              className={`classes.description ${
                casesType === "recovered" && classes.description_selected_blue
              }`}
              style={{ cursor: "pointer" }}
              onClick={(e) => setCasesType("recovered")}
            >
              Total Recovered
            </div>
            <div className={classes.total}>{recovered}</div>
          </h2>
          <h2 className={classes.legend}>
            <div className={classes.color} style={{ background: "gray" }} />
            <div
              className={`classes.description ${
                casesType === "deaths" && classes.description_selected_gray
              }`}
              style={{ cursor: "pointer" }}
              onClick={(e) => setCasesType("deaths")}
            >
              Total Deaths
            </div>
            <div className={classes.total}>{deaths}</div>
          </h2>
        </Grid>
      </Grid>
    </div>
  );
}
