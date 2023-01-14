import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecificdata } from "../store/productsActions";
import Spinner from "./../UI/Spinner";
import Message from "../UI/Message";
import { createProductReview } from "./../store/productsActions";
import { productReviewActions } from "../store/productReviewSlice";
import Reviews from "./../component/Reviews";
import Meta from "./../component/Meta";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const product1 = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { loading, product, error } = product1;

  const {
    successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = useSelector((state) => state.productReview);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSpecificdata(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (successProductReview) {
      setTimeout(() => {
        dispatch(fetchSpecificdata(id));
      }, 1000);
      dispatch(productReviewActions.productReviewReset());
    }
  }, [id, dispatch, successProductReview]);

  const submitHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(createProductReview({ rating, review: comment }, id));
    setComment("");
    setRating(1);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        GO BACK
      </Link>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name}></Meta>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Reviews value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price : ₹{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Discription : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0 ? "InStock" : "OutOfStock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {Array.from(
                              { length: product.countInStock },
                              (curr, i) => i + 1
                            ).map((el) => (
                              <option key={el} value={el}>
                                {el}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block px-4"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={submitHandler}
                    >
                      Add To Card
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="my-3">
              <h4>Reviews</h4>
              {!product.reviews || product?.reviews?.length === 0 ? (
                <Message>No Reviews</Message>
              ) : (
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.user.name}</strong>
                      <Reviews value={review.rating} />
                      <p>{new Date(review.createAt).toLocaleString()}</p>
                      <p>{review.review}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Write a Customer Review</h4>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Spinner />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {user.name ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className="my-2"
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/signin">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
