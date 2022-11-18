import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import axios from "axios";
const HomeProduct = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/v1/products");

      setProduct(data.products);
    };
    fetch();
  }, []);

  return (
    <>
      <h1>Latest Product</h1>
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
