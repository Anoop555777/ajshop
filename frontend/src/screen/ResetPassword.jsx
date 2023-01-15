import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../UI/Message";
import Spinner from "./../UI/Spinner";
import { resetPassword } from "./../store/userAction";
import FormContainer from "../component/FormContainer";
import Meta from "./../component/Meta";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { name } = user;

  const queryParam = new URLSearchParams(location.search);
  const resetToken = queryParam.get("reset_token");

  useEffect(() => {
    if (name || !resetToken) navigate("/");
  }, [name, navigate, resetToken]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, passwordConfirm, resetToken));
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <>
      <Link to="/signin" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <Meta title="Reset" />
        <h1>Reset</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Spinner />}
        <Form className="py-2" onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <Form.Label>Enter new password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={passwordHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              value={passwordConfirm}
              onChange={passwordConfirmHandler}
            ></Form.Control>
          </Form.Group>

          <Button className="my-2" type="submit" variant="primary">
            Reset
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ResetPassword;
