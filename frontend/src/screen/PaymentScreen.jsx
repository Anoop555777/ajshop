import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "./../UI/Message";
import Spinner from "./../UI/Spinner";
import CheckoutSteps from "./../component/CheckoutSteps";
import FormContainer from "./../component/FormContainer";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  let { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    const shipping = JSON.parse(localStorage.getItem("shipping"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!shipping || !cart) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/placeOrder");
  };

  const paymentHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      {user.name ? (
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h2>Payment</h2>
          {error && <Message varient="danger">{error}</Message>}

          {loading && <Spinner />}

          <Form className="py-2" onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>

              <Col>
                {/* <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value={paymentMethod}
                  checked
                  onChange={paymentHandler}
                ></Form.Check> */}

                <Form.Check
                  type="radio"
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={paymentHandler}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button className="my-2" type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      ) : (
        <Message varient="danger">
          Sorry!!!! Please Log in first <Link to="/signIn">Login</Link>
        </Message>
      )}
    </>
  );
};

export default PaymentScreen;
