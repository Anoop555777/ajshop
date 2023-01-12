import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { getOrderToPaid, getOrder, getSession } from "./../store/orderAction";
import { getOrderToDeliver } from "./../store/orderAction";
import { orderDeliverAction } from "../store/orderDeliverSlice";
const OrdersScreen = () => {
  const [sdkReady, setSDKReady] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const { id } = useParams();
  const queryParam = new URLSearchParams(location.search);
  const session = queryParam.get("session_id");

  let error1;

  const { order, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const {
    loading: loadingDeliver,
    error: errorDeliver,
    deliverSuccess,
  } = useSelector((state) => state.orderDeliver);

  error1 = error;
  error1 = error || user.error;

  useEffect(() => {
    if (deliverSuccess) {
      dispatch(getOrder(id));
      dispatch(orderDeliverAction.orderDeliverReset());
    }
  }, [deliverSuccess, dispatch]);

  useEffect(() => {
    if (session && !order.isPaid) {
      dispatch(getOrderToPaid(session, id));
    }
  }, [session, id, dispatch, order]);

  useEffect(() => {
    if (!order._id || id !== order._id) dispatch(getOrder(id));

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

  const deliverHandler = () => {
    dispatch(getOrderToDeliver(id));
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
                          <Link to={`/products/${item.product}`}>
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
              {loadingDeliver && <Spinner />}

              {errorDeliver ? (
                <Message variant="danger">{errorDeliver}</Message>
              ) : (
                user &&
                user.role === "admin" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrdersScreen;
