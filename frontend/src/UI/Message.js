import React from "react";
import { Alert } from "react-bootstrap";

const Message = (props) => {
  return <Alert varient={props.varient}>{props.children}</Alert>;
};

Message.defaultProps = {
  varient: "info",
};

export default Message;
