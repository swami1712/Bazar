import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, keyword = "" }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const handlePageChange = (e, value) => {
    setPage(value);
    !keyword
      ? navigate(`/page/${value}`)
      : navigate(`/search/${keyword}/page/${value}`);
  };
  return (
    <div className="d-flex justify-content-center p-4">
      <Pagination count={pages} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default Paginate;
