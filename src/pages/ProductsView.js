import Product from "../products/Product";
import useGetRequest from "../api/Requests";
import {Card, CardGroup, Col, Image, Row} from "react-bootstrap";
import React, { useState } from "react";

export default function ProductsView() {
  const [category, setCategory] = useState(null);
  const data = useGetRequest(
    category == null
      ? `http://localhost:5000/products`
      : `http://localhost:5000/products/category/${category}`,
  );

  const products = data.map((val) => <Product key={val["id"]} product={val} />);

  const categoriesData = [
    { src: "./photos/tree_1.svg", style: { width: "8rem" }, id: 1 },
    { src: "./photos/tree_2.svg", style: { width: "8rem" }, id: 2 },
    { src: "./photos/tree_3.svg", style: { width: "13rem" }, id: 3 },
    { src: "./photos/tree_4.svg", style: { width: "12rem" }, id: 4 },
  ];

  return (
    <>
      <Col>
        <div className="category_bar">
          {categoriesData.map((value) => (
            <Image
              className="category_tree"
              style={value["style"]}
              src={value["src"]}
              onClick={() => setCategory(value["id"])}
            />
          ))}
        </div>
      </Col>
      <Col className="products_column">
        <CardGroup className="products_cards">
          <Row xs={"auto"} md={"auto"} className="g-4">
            {Array.from(products).map((el, idx) => (
              <Col key={idx}> {el} </Col>
            ))}
          </Row>
        </CardGroup>
      </Col>
    </>
  );
}
