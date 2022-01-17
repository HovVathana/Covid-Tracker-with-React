import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
// material - ui;
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  title_mobile: {
    flexGrow: 1,
    fontSize: "15px !important",
    marginLeft: "-20px",
  },

  appBar: {
    background: "rgb(43,43,96)",
    color: "white",
    zIndex: theme.zIndex.drawer + 1,
  },
  appDropDown: {
    color: "white",

    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
}));

export default function Header({
  country,
  onCountryChange,
  countries,
  dark,
  setDark,
  mobile,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LocalHospitalIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={mobile ? classes.title_mobile : classes.title}
          >
            COVID-19 TRACKER
          </Typography>
          <FormControl>
            <Select
              //   variant="outlined"
              value={country}
              onChange={onCountryChange}
              className={classes.appDropDown}
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {dark ? (
            <Tooltip title="Light Theme">
              <IconButton>
                <Brightness7Icon onClick={() => setDark(!dark)} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Dark Theme">
              <IconButton>
                <Brightness4Icon
                  onClick={() => setDark(!dark)}
                  style={{ color: "#fff" }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
