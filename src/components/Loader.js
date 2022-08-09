import React from "react";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Container className="error">
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="dark" />
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </Container>
  );
};

export default Loader;
