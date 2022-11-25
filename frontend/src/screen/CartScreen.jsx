import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import Message from "./../UI/Message";
import { addToCart } from "./../store/cartAction";
import { cartActions } from "./../store/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const location = useLocation();
  const { id } = useParams();
  const qty = location.search ? +location.search.split("=")[1] : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const revomeFromCartHander = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  const checkOutHandler = () => {};

  return (
    <>
      <h1>Shopping Cart</h1>
      {cartItem.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go back</Link>{" "}
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItem.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>₹{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(addToCart(item.product, +e.target.value));
                        }}
                      >
                        {Array.from(
                          { length: item.countInStock },
                          (curr, i) => i + 1
                        ).map((el) => (
                          <option key={el} value={el}>
                            {el}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => revomeFromCartHander(item.product)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    SubTotal({cartItem.reduce((acc, item) => acc + item.qty, 0)}
                    ) items
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>
                    Total Price : ₹
                    {cartItem.reduce((acc, item) => acc + item.price, 0)}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={checkOutHandler}
                  >
                    Proceed To Checkout
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

export default CartScreen;
