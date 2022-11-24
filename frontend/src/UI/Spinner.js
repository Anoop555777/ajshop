import React from "react";
import { Spinner } from "react-bootstrap";
import classes from "./spinner.module.css";
const SpinnerClass = () => {
  return (
    <div className={classes.spinner}>
      <Spinner
        animation="border"
        role="status"
        style={{ height: "100px", width: "100px" }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerClass;
