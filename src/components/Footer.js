import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer-1">
      <Container>
        <div className="text">
          <small className="ml-4">
            <strong>
              Patagonya, {new Date().getFullYear()} &copy; All rights reserved.
            </strong>
          </small>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
