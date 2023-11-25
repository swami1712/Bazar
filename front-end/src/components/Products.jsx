import React, { useEffect, useState } from "react";
import "./../styles/Product.css";
import Product from "./Product";
import Filter from "./Filter";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/products")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <div className="Products">
      <Filter />
      <div className="flex-container">
        <Product data={data} />
      </div>
      <div className="Pagination_btns_container">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default Products;
