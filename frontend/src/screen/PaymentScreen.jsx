import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../UI/Message";
import Spinner from "./../UI/Spinner";
import CheckoutSteps from "./../component/CheckoutSteps";
import FormContainer from "./../component/FormContainer";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch;

  let { loading, user, error } = useSelector((state) => state.user);

  const shipping = JSON.parse(localStorage.getItem("shipping"));

  useEffect(() => {
    const shipping = JSON.parse(localStorage.getItem("shipping"));

    if (!shipping) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch();
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
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={paymentHandler}
                ></Form.Check>

                {/* <Form.Check
                  type="radio"
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={paymentHandler}
                ></Form.Check> */}
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
