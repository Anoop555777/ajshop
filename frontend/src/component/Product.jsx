import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Review from "./Reviews";
const Product = (props) => {
  let price = props.product.price * 90;
  price = price.toFixed(2);

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/products/${props.product._id}`}>
          <Card.Img src={props.product.image} variant="top"></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/products/${props.product._id}`}>
            <Card.Title as="div">
              <strong>{props.product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Review
                value={props.product.rating}
                text={props.product.numReviews}
              />
            </div>
          </Card.Text>
          <Card.Text as="h3">₹{price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
