import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import axios from "axios";

import Review from "../component/Reviews";
const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/api/v1/products/${id}`);

      setProduct(data.product);
    };
    fetch();
  }, [id]);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        GO BACK
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Review value={product.rating} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price : ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>Discription : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={2}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "InStock" : "OutOfStock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block px-4"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Card
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
