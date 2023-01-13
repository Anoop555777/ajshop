import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "../store/productsActions";
import Spinner from "./../UI/Spinner";
import Message from "./../UI/Message";
import { useParams } from "react-router-dom";

const HomeProduct = () => {
  const dispatch = useDispatch();
  const product1 = useSelector((state) => state.productList);
  const { products, loading, error } = product1;
  const { keyword } = useParams();

  useEffect(() => {
    if (keyword) dispatch(fetchdata(keyword));
    else dispatch(fetchdata());
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Product</h1>

      {loading ? (
        <h2>
          <Spinner />
        </h2>
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeProduct;
