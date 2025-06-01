import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Meta from "../component/Meta";
const NotFound = () => {
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Meta title="404 | page not found" />
      <Container>
        <h1>Page Not Found 404</h1>
      </Container>
    </>
  );
};

export default NotFound;
