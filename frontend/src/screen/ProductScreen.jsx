import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecificdata } from "../store/productsActions";
import Spinner from "./../UI/Spinner";
import Message from "../UI/Message";

import Review from "../component/Reviews";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const product1 = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { loading, product, error } = product1;
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSpecificdata(id));
  }, [id, dispatch]);

  const submitHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        GO BACK
      </Link>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
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
              <ListGroup.Item>
                Discription : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
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

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {Array.from(
                            { length: product.countInStock },
                            (curr, i) => i + 1
                          ).map((el) => (
                            <option key={el} value={el}>
                              {el}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block px-4"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={submitHandler}
                  >
                    Add To Card
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
