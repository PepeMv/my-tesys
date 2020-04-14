import React from "react";
import LoadingOverlay from "react-loading-overlay";
import "./Spinner.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  posisionSniper: {
    position: "relative",
  },
}));

function Spinner({ active }) {
  const classes = useStyles();
  return (
    <LoadingOverlay
      active={active}
      spinner={<div className="spinner"></div>}
      className={classes.posisionSniper}
    ></LoadingOverlay>
  );
}

export default Spinner;
