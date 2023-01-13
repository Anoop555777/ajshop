import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./header.css";
const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  let data;
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      data = keyword.trim();
      setKeyword("");
      navigate(`/search/${data}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="inline">
      <Form.Control
        type="text"
        name="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
