import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { getOrderToPaid, getOrder, getSession } from "./../store/orderAction";

const OrdersScreen = () => {
  const [sdkReady, setSDKReady] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const { id } = useParams();
  const queryParam = new URLSearchParams(location.search);
  const session = queryParam.get("session_id");
  console.log(session);
  let error1;

  const { order, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  error1 = error;
  error1 = error || user.error;

  useEffect(() => {
    if (session && !order.isPaid) {
      dispatch(getOrderToPaid(session, id));
    }
  }, [session, id, dispatch, order]);

  useEffect(() => {
    if (!order._id) dispatch(getOrder(id));

    if (!order.isPaid) {
      setSDKReady(true);
    }
  }, [dispatch, id, order]);

  const order1 = {};
  if (order._id)
    order1.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

  const successPaymentHandler = () => {
    dispatch(getSession(id));
  };

  return loading ? (
    <Spinner />
  ) : error1 ? (
    <Message variant="danger">{error1}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
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
                  <Col>₹{order1.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loading && <Spinner />}
                  {!sdkReady ? (
                    <Spinner />
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={successPaymentHandler}
                    >
                      Pay
                    </Button>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrdersScreen;
