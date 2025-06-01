import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Button, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { userActions } from "../store/userSlice";
import { updateMe, updateMyPassword } from "../store/userAction";
import { getAllOrder } from "../store/orderListAction";
import FormContainer from "../component/FormContainer";
import Meta from "../component/Meta";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let { loading, user, error, success } = useSelector((state) => state.user);

  const {
    loading: loadingOrders,
    orders,
    error: errorOrders,
  } = useSelector((state) => state.orderList.state);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const updateMeSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim().length === 0 && email.trim().length > 1)
      dispatch(updateMe(user.name, email));
    else if (name.length > 1 && email.trim().length === 0) {
      dispatch(updateMe(name, user.email));
    } else if (name.trim().length > 1 && email.trim().length > 1) {
      dispatch(updateMe(name, email));
    } else {
      dispatch(
        userActions.updateMeFail("please provide name or email to update")
      );
      return;
    }

    if (error) {
      return;
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const updatePasswordSubmitHandler = (e) => {
    e.preventDefault();
    if (
      currentPassword.trim().length < 8 &&
      password.trim().length < 8 &&
      confirmPassword.trim().length < 8
    ) {
      dispatch(
        userActions.updateMeFail(
          "all field are required and must have atleast 8 words long"
        )
      );
      return;
    }
    dispatch(updateMyPassword(currentPassword, password, confirmPassword));

    if (error) return;

    setPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  const currentpasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <Meta title="Myself" />
      {user.name ? (
        <Row>
          <Col md={5}>
            <FormContainer>
              <h2>My Profile</h2>
              {error && <Message varient="danger">{error}</Message>}

              {success && <Message varient="success">Profile Update</Message>}
              {loading && <Spinner />}
              <Form className="py-2" onSubmit={updateMeSubmitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="value"
                    placeholder={`${user.name}`}
                    value={name}
                    onChange={nameHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={`${user.email}`}
                    value={email}
                    onChange={emailHandler}
                  ></Form.Control>
                </Form.Group>

                <Button className="my-2" type="submit" variant="primary">
                  Update Me
                </Button>
              </Form>

              <Form className="py-2" onSubmit={updatePasswordSubmitHandler}>
                <Form.Group controlId="currentpassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Type current password"
                    value={currentPassword}
                    onChange={currentpasswordHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Type new password"
                    value={password}
                    onChange={passwordHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmpassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={confirmPasswordHandler}
                  ></Form.Control>
                </Form.Group>

                <Button className="my-2" type="submit" variant="primary">
                  Update Password
                </Button>
              </Form>
            </FormContainer>
          </Col>
          <Col md={7}>
            <h2>My Order</h2>
            {loadingOrders ? (
              <Spinner />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          `${new Date(order.paidAt).toLocaleString()}`
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/orders/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      ) : (
        <Message varient="danger">
          Sorry!!!! Please Log in first <Link to="/signIn">Login</Link>
        </Message>
      )}
    </>
  );
};
export default ProfileScreen;
