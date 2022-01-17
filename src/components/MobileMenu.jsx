import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import extClasses from "./MobileMenu.module.css";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TableChartIcon from "@material-ui/icons/TableChart";
import Table from "./Table";
import InfoPaperMobile from "./InfoPaperMobile";
import InfoPaper from "./InfoPaper";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
    // border: "1px solid rgba(0, 0, 0, 0.05)",
    borderRadius: "30px 30px 0px 0px",
  },
  tabs: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
}));

const MobileMenu = ({
  country,
  total_cases,
  cases,
  recovered,
  deaths,
  cases_per_million_population,
  continent,
  open,
  openChange,
  tableData,
  global,
  cases_all,
  recovered_all,
  deaths_all,
  country_all,
  dark,
  setCasesType,
  casesType,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        className={dark ? extClasses.AppBar_dark : extClasses.AppBar}
      >
        <div className={extClasses.MobilePullbar}></div>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          //   centered
          classes={{
            root: classes.tabs,
            scroller: classes.scroller,
          }}
        >
          <Tab label="Info" icon={<PublicIcon />} {...a11yProps(0)} />
          <Tab label="Detail" icon={<LocationCityIcon />} {...a11yProps(1)} />
          <Tab label="Table" icon={<TableChartIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <InfoPaper
          global={global}
          cases={cases_all}
          deaths={deaths_all}
          recovered={recovered_all}
          country={country_all}
          open={open}
          openChange={openChange}
          setCasesType={setCasesType}
          casesType={casesType}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InfoPaperMobile
          country={country}
          total_cases={total_cases}
          cases={cases}
          recovered={recovered}
          deaths={deaths}
          cases_per_million_population={cases_per_million_population}
          continent={continent}
          open={open}
          openChange={openChange}
          dark={dark}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Table tableData={tableData} dark={dark} />
      </TabPanel>
    </div>
  );
};

export default MobileMenu;
