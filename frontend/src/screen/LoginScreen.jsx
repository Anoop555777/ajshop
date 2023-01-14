import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../UI/Message";
import Spinner from "./../UI/Spinner";
import { login } from "./../store/userAction";
import FormContainer from "../component/FormContainer";
import Meta from "./../component/Meta";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { name } = user;
  useEffect(() => {
    if (name) navigate("/");
  }, [name, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <FormContainer>
      <Meta title="login" />
      <h1>Sign In</h1>
      {error && <Message varient="danger">{error}</Message>}
      {loading && <Spinner />}
      <Form className="py-2" onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={emailHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordHandler}
          ></Form.Control>
        </Form.Group>

        <Button className="my-2" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ?<Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
