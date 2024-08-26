import React from "react";
import SignIn from "../input/SignIn";
import SignUp from "../input/SignUp";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Auth() {
  return (
    <>
      {
        <Row className="centred_form">
          <Col>
            <div className="window_line" />
            <Card>
              <Card.Body>
                <SignIn />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div className="window_line" />
            <Card>
              <Card.Body>
                <SignUp />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      }
    </>
  );
}
