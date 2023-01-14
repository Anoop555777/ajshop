import React from "react";
import { Pagination } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "" }) => {
  const navigate = useNavigate();
  const moveTo = (page, keyword) => {
    keyword !== ""
      ? navigate(`/?search=${keyword}&page=${page}`)
      : navigate(`?page=${page}`);
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            onClick={() => {
              moveTo(x + 1, keyword);
            }}
            active={x + 1 === +page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
