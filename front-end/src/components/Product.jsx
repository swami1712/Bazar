import React from "react";
import "./../styles/Product.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Product = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("productdetails");
  };
  return (
    <>
      {data.map((element) => (
        <div key={element.id} className="flex-item" onClick={handleClick}>
          <img className="Product_image" src={element.image} alt="" />
          <div className="Product_company">{element.title}</div>
          <Rating
            className="Ratings"
            name="half-rating-read"
            readOnly
            precision={0.1}
            defaultValue={element.rating.rate}
          />
          <div className="Product_name">{element.category}</div>
          <div className="Product_price">${element.price}</div>
        </div>
      ))}
    </>
  );
};

export default Product;
