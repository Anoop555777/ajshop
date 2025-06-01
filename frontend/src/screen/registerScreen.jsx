import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { register } from "../store/userAction";
import FormContainer from "../component/FormContainer";
import Meta from "../component/Meta";
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.user);
  const name1 = user.name;
  useEffect(() => {
    if (name1) navigate("/");
  }, [name1, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
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
      <Meta title="register" />
      <FormContainer>
        <h1>Register</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Spinner />}
        <Form className="py-2" onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="value"
              placeholder="Enter your email"
              value={name}
              onChange={nameHandler}
            ></Form.Control>
          </Form.Group>

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
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already have an account?<Link to="/signIn">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
export default RegisterScreen;
