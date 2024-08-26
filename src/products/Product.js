import React from "react";
import { Card, Modal } from "react-bootstrap";
import { useState } from "react";
import ProductDescription from "./ProductDescription";

import { Button } from "react-bootstrap";

export default function Product(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card
      style={{ width: "25rem", height: "27rem", overflow:"hidden"}}
      className="text-center shadow"
    >
      <Card.Body>
        <Button variant="show_product" size="lg" onClick={handleShow}>
          <Card.Img variant="top" src="./photos/image.png" />
        </Button>

        <Card.Title>{props.product["name"]}</Card.Title>
       
      </Card.Body>

      <Modal
        show={show}
        onHide={handleClose}
        className="text-center"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.product["name"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img variant="top" src="./photos/image.png" />
          <ProductDescription id={props.product["id"]}></ProductDescription>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
