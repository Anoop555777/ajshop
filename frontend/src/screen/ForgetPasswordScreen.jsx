import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { forgetPassword } from "../store/userAction";
import FormContainer from "../component/FormContainer";
import Meta from "../component/Meta";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.forgetPassword
  );
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Link to="/signin" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <Meta title="Forget Password" />
        <h1>Forget Password</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Spinner />}
        {success ? (
          <Message varient="danger">
            Successfull please check your email to reset your password
          </Message>
        ) : (
          <Form className="py-2" onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={emailHandler}
                required
              ></Form.Control>
            </Form.Group>

            <Button className="my-2" type="submit" variant="primary">
              Forget Password
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ForgetPasswordScreen;
