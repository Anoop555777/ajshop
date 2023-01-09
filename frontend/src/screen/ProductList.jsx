import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./../UI/Spinner";
import Message from "../UI/Message";
import { useNavigate } from "react-router-dom";
import { fetchdata, deleteProduct } from "../store/productsActions";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, successDelete } = useSelector(
    (state) => state.productList
  );

  const [del, setDelete] = useState(successDelete);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (products.length === 0 || del) {
      dispatch(fetchdata());
      setDelete(false);
    }
  }, [dispatch, navigate, user, del, products.length]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {/* {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
