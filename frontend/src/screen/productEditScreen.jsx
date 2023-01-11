import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./../UI/Spinner";
import Message from "../UI/Message";
import FormContainer from "./../component/FormContainer";
import { fetchSpecificdata, productEdit } from "./../store/productsActions";
import { productCreateActions } from "../store/productCreateSlice";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    createSuccess,
    loading,
    error: errorfail,
  } = useSelector((state) => state.productEdit);

  const { user } = useSelector((state) => state.user);
  const { product } = useSelector((state) => state.product);

  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product || product._id !== id) dispatch(fetchSpecificdata(id));
  }, [product, id, dispatch]);

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
      name.trim().length === 0 &&
      price.trim().length === 0 &&
      brand.trim().length === 0 &&
      category.trim().length === 0 &&
      countInStock.trim.length === 0 &&
      description.trim().length === 0 &&
      image === null
    ) {
      setError("atleast one field required");
      return;
    }

    const form = new FormData();

    if (name.trim().length > 0) {
      form.append("name", document.getElementById("name").value);
    }
    if (price > 100)
      form.append("price", document.getElementById("price").value);
    if (brand.trim().length > 0)
      form.append("brand", document.getElementById("brand").value);
    if (category.trim().length > 0)
      form.append("category", document.getElementById("category").value);
    if (description.trim().length > 0)
      form.append("description", document.getElementById("description").value);
    if (countInStock > 0)
      form.append(
        "countInStock",
        document.getElementById("countInStock").value
      );
    if (image) form.append("image", image);

    dispatch(productEdit(form, id));
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

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
                  type="name"
                  placeholder={product.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={product.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Enter Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={product.brand}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={product.countInStock}
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={product.category}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={product.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className="my-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
