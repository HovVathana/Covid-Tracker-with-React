import React, { useState } from "react";
import classes from "./InfoPaperCountry.module.css";
import Typography from "@material-ui/core/Typography";
import LineGraph from "./LineGraph";
import Vaccine from "./Vaccine";
import ContinentGraph from "./ContinentGraph";
import ContinentCountryGraph from "./ContinentCountryGraph";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slide from "@material-ui/core/Slide";

export default function InfoPaperCountry({
  country,
  total_cases,
  cases,
  deaths,
  recovered,
  cases_per_million_population,
  continent,
  open,
  openChange,
  dark,
}) {
  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <div
        className={dark ? classes.InfoPaper_dark : classes.InfoPaper}
        style={{ zIndex: 499 }}
      >
        <div className={classes.overviewContent}>
          <Typography variant="subtitle1" className={classes.type}>
            Overview - {country}
            <Tooltip title="Close">
              <IconButton>
                <CloseIcon onClick={openChange} />
              </IconButton>
            </Tooltip>
          </Typography>

          <div className={classes.overview}>
            <Card>
              <CardContent>
                <div className={classes.infoTitle}>
                  <Typography variant="subtitle2" className={classes.Title}>
                    Total Cases
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{ color: "rgb(244, 195, 99)" }}
                  >
                    {total_cases}
                  </Typography>

                  <h2 className={classes.legend}>
                    <div
                      className={classes.color}
                      style={{ background: "red" }}
                    ></div>
                    <div className={classes.description}>Today Cases</div>
                    <div className={classes.total}>+{cases}</div>
                  </h2>

                  <h2 className={classes.legend}>
                    <div
                      className={classes.color}
                      style={{ background: "blue" }}
                    ></div>
                    <div className={classes.description}>Today Recovered</div>
                    <div className={classes.total}>+{recovered}</div>
                  </h2>

                  <h2 className={classes.legend}>
                    <div
                      className={classes.color}
                      style={{ background: "gray" }}
                    ></div>
                    <div className={classes.description}>Today Deaths</div>
                    <div className={classes.total}>
                      +{deaths}
                      {/* <div className={classes.delta}>+{deaths}</div> */}
                    </div>
                  </h2>

                  <h2 className={classes.legend}>
                    <div
                      className={classes.color}
                      style={{ background: "green" }}
                    ></div>
                    <div className={classes.description}>Cases Per Million</div>
                    <div className={classes.total}>
                      {cases_per_million_population}
                    </div>
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>

          <Typography
            variant="subtitle1"
            className={classes.Title}
            style={{
              paddingBottom: "2px",
              paddingTop: "4px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Statistics
          </Typography>
          <div className={classes.overview} style={{ height: "368px" }}>
            <Card style={{ height: "350px" }}>
              <CardContent>
                <LineGraph country={country} />
              </CardContent>
            </Card>
          </div>

          <div className={classes.overview} style={{ height: "368px" }}>
            <Card style={{ height: "350px" }}>
              <CardContent>
                <Vaccine country={country} dark={dark} />
              </CardContent>
            </Card>
          </div>
          <div className={classes.overview} style={{ height: "368px" }}>
            {typeof continent === "undefined" ? (
              <Card style={{ height: "350px" }}>
                <CardContent>
                  <ContinentGraph />
                </CardContent>
              </Card>
            ) : (
              <Card style={{ height: "350px" }}>
                <CardContent>
                  <ContinentCountryGraph
                    continent={continent}
                    country={country}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Slide>
  );
}
