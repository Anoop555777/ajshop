import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import products from "../products";
const HomeProduct = () => {
  return (
    <>
      <Row>
        {products.map((product, i) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeProduct;
