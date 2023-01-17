import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "../store/productsActions";
import Spinner from "./../UI/Spinner";
import Message from "./../UI/Message";
import { useLocation, Link } from "react-router-dom";
import Paginate from "../component/Pagination";
import ProductCarousel from "../component/ProductCarousel";
import Meta from "./../component/Meta";

const HomeProduct = () => {
  const dispatch = useDispatch();
  const product1 = useSelector((state) => state.productList);
  const { products, loading, error, pages } = product1;
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const search = queryParam.get("search");
  const page = queryParam.get("page") || 1;

  useEffect(() => {
    if (search) dispatch(fetchdata(search, page));
    else dispatch(fetchdata("", page));
  }, [dispatch, search, page, products.length]);
  return (
    <>
      <Meta />
      {!search ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      )}

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
      {products.length > 8 && (
        <Paginate pages={pages} page={page} keyword={search ? search : ""} />
      )}
    </>
  );
};

export default HomeProduct;
