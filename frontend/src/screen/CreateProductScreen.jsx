import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../UI/Spinner";
import Message from "../UI/Message";
import FormContainer from "../component/FormContainer";
import { createProduct } from "../store/productsActions";
import { productCreateActions } from "../store/productCreateSlice";
const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    createSuccess,
    loading,
    error: errorfail,
  } = useSelector((state) => state.productCreate);

  const { user } = useSelector((state) => state.user);

  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (createSuccess) {
      dispatch(productCreateActions.productCreateReset());
      navigate("/admin/productlist");
    }
  }, [createSuccess, navigate, dispatch]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim().length < 2 ||
      price < 100 ||
      brand.trim().length < 2 ||
      category.trim().length < 2 ||
      countInStock < 1 ||
      description.trim().length < 20
    ) {
      setError("field must have valid values");
      return;
    }

    const form = new FormData();

    form.append("name", document.getElementById("name").value);
    form.append("price", document.getElementById("price").value);
    form.append("brand", document.getElementById("brand").value);
    form.append("category", document.getElementById("category").value);
    form.append("description", document.getElementById("description").value);
    form.append("countInStock", document.getElementById("countInStock").value);
    form.append("image", image);

    dispatch(createProduct(form));
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>

        {loading ? (
          <Spinner />
        ) : errorfail ? (
          <Message variant="danger">{errorfail}</Message>
        ) : (
          <>
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Enter Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className="my-3" type="submit" variant="primary">
                Create
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
