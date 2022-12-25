import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../UI/Message";

import CheckoutSteps from "./../component/CheckoutSteps";
import { createOrder } from "./../store/orderAction";

const PlaceOrder = () => {
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { success, error, order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const cart1 = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (!shipping || !cart1 || cartItem.length === 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (success) navigate(`/order/${order._id}`);
  }, [success, navigate, order]);

  const cart = {};
  cart.itemsPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 30000 ? 0 : 1000;
  cart.taxPrice = +(0.15 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = +(
    cart.itemsPrice +
    cart.shippingPrice +
    cart.taxPrice
  ).toFixed(2);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItem,
        shippingAddress: shipping,
        paymentMethod: "payPal",
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
                {shipping.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              Paypal
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItem.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItem.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
