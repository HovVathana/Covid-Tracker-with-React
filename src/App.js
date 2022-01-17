import React, { useEffect, useState } from "react";

import classes from "./App.module.css";
import "leaflet/dist/leaflet.css";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Paper, Toolbar, Drawer } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import numeral from "numeral";

// components
import Map from "./components/Map";
import DarkMap from "./components/DarkMap";
import Header from "./components/Header";
import InfoPaper from "./components/InfoPaper";
import InfoPaperCountry from "./components/InfoPaperCountry";
import MobileMenu from "./components/MobileMenu";
import Table from "./components/Table";
import { sortData } from "./shared/util";
import { prettyPrintStat } from "./shared/util";
import useLocalStorage from "./shared/useLocalStorage";
import useWindowDimensions from "./shared/useWindowDimensions";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState([23, 66]);
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useLocalStorage("darkMode", false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    dark
      ? document.documentElement.style.setProperty("color-scheme", "dark")
      : document.documentElement.style.setProperty("color-scheme", "light");
  }, [dark]);

  //   console.log(mapCountries);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "Worldwide"
          ? setMapCenter([23, 66])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        // console.log(mapCenter);
      });
  };

  const drawerWidth = 320;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classStyle = useStyles();
  //   console.log(countryInfo.continent);

  let color =
    casesType === "cases"
      ? "#CC1034"
      : casesType === "recovered"
      ? "#002BD7"
      : casesType === "deaths"
      ? "#c0c0c0"
      : "#CC1034";

  const light_theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: color,
      },
    },
  });

  const dark_theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: color,
      },
    },
  });

  const theme = dark ? dark_theme : light_theme;
  const { height, width } = useWindowDimensions();
  //   console.log(width);

  return width >= 1024 ? (
    <ThemeProvider theme={theme}>
      <div className={classStyle.root}>
        <CssBaseline />

        <Header
          country={country}
          onCountryChange={onCountryChange}
          countries={countries}
          dark={dark}
          setDark={setDark}
          mobile={false}
        />
        <Drawer
          className={classStyle.drawer}
          variant="permanent"
          classes={{
            paper: classStyle.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classStyle.drawerContainer}>
            <InfoPaper
              global={numeral(countryInfo.cases).format("0.0a")}
              cases={numeral(countryInfo.cases).format("0.0a")}
              deaths={numeral(countryInfo.deaths).format("0.0a")}
              recovered={numeral(countryInfo.recovered).format("0.0a")}
              country={country}
              open={open}
              openChange={() => setOpen(!open)}
              setCasesType={setCasesType}
              casesType={casesType}
            />
            <Table tableData={tableData} dark={dark} />
          </div>
        </Drawer>
        <main className={classStyle.content}>
          <Toolbar />
          <InfoPaperCountry
            country={country}
            total_cases={numeral(countryInfo.cases).format("0.0a")}
            cases={prettyPrintStat(countryInfo.todayCases)}
            recovered={prettyPrintStat(countryInfo.todayRecovered)}
            deaths={prettyPrintStat(countryInfo.todayDeaths)}
            cases_per_million_population={prettyPrintStat(
              countryInfo.casesPerOneMillion
            )}
            continent={countryInfo.continent}
            open={open}
            openChange={() => setOpen(!open)}
            dark={dark}
          />
          {dark ? (
            <DarkMap
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              mobile={false}
              dark={dark}
            />
          ) : (
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              mobile={false}
              dark={dark}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <div className={classes.MobileRoot}>
        <Header
          country={country}
          onCountryChange={onCountryChange}
          countries={countries}
          dark={dark}
          setDark={setDark}
          mobile={true}
        />
        <div className={classes.WorldMap}>
          {dark ? (
            <DarkMap
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              mobile={true}
              dark={dark}
            />
          ) : (
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              mobile={true}
              dark={dark}
            />
          )}
        </div>
        <div className={classes.MobileMenu}>
          <Grid container>
            <Grid item xs={12}>
              <MobileMenu
                country={country}
                total_cases={numeral(countryInfo.cases).format("0.0a")}
                cases={prettyPrintStat(countryInfo.todayCases)}
                recovered={prettyPrintStat(countryInfo.todayRecovered)}
                deaths={prettyPrintStat(countryInfo.todayDeaths)}
                cases_per_million_population={prettyPrintStat(
                  countryInfo.casesPerOneMillion
                )}
                continent={countryInfo.continent}
                open={open}
                openChange={() => setOpen(!open)}
                tableData={tableData}
                global={numeral(countryInfo.cases).format("0.0a")}
                cases_all={numeral(countryInfo.cases).format("0.0a")}
                deaths_all={numeral(countryInfo.deaths).format("0.0a")}
                recovered_all={numeral(countryInfo.recovered).format("0.0a")}
                country_all={country}
                dark={dark}
                setCasesType={setCasesType}
                casesType={casesType}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}
