import React from "react";
import "./../styles/Filter.css";
import SortIcon from "@mui/icons-material/Sort";

const Filter = () => {
  return (
    <div className="Filter_container">
      {/* <span className="Scroll-left">scrollLeft</span> */}
      <h3>Filters</h3>
      <div className="inner_filter_container">
        <div className="filter_item">brand</div>
        <div className="filter_item">color</div>
        <div className="filter_item">price</div>
      </div>
      <h3>SortBy </h3>
      <span>
        <SortIcon />
      </span>
      {/* <span className="Scroll-right">scrollRight</span> */}
    </div>
  );
};

export default Filter;
