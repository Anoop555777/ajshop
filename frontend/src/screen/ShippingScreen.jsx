import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "./../UI/Message";
import Spinner from "./../UI/Spinner";
import CheckoutSteps from "./../component/CheckoutSteps";
import FormContainer from "./../component/FormContainer";
import Meta from "./../component/Meta";
const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [errorHandler, setErrorHandler] = useState("");

  let { loading, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const shippingDetailSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !address.trim().length ||
      !city.trim().length ||
      !postalCode.trim().length ||
      !country.trim().length
    ) {
      setErrorHandler("All field are required");
      return;
    }
    if (address.trim().length < 10) {
      setErrorHandler("address must be completed");
      return;
    }
    if (postalCode.length !== 6) {
      setErrorHandler("postalCode must be six digit");
      return;
    }
    setErrorHandler("");
    localStorage.setItem(
      "shipping",
      JSON.stringify({ address, city, postalCode, country })
    );
    navigate("/payment");
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const postalCodeHandler = (e) => {
    setPostalCode(e.target.value);
  };

  const countryHandler = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <Meta title="shipping" />
      {user.name ? (
        <Row>
          <Col>
            <FormContainer>
              <CheckoutSteps step1 />
              <h2>Shipping Detail</h2>
              {error && <Message varient="danger">{error}</Message>}

              {loading && <Spinner />}
              {errorHandler.length !== 0 && (
                <Message varient="danger">{errorHandler}</Message>
              )}
              <Form className="py-2" onSubmit={shippingDetailSubmitHandler}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="value"
                    placeholder="Enter your address"
                    value={address}
                    onChange={addressHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="value"
                    placeholder="Enter your city "
                    value={city}
                    onChange={cityHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalcode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your pin"
                    value={postalCode}
                    onChange={postalCodeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="value"
                    placeholder="Enter your country"
                    value={country}
                    onChange={countryHandler}
                  ></Form.Control>
                </Form.Group>

                <Button className="my-2" type="submit" variant="primary">
                  Pay
                </Button>
              </Form>
            </FormContainer>
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

export default ShippingScreen;
