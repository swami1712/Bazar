import React from "react";
import "./../styles/ProductDetails.css";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();

  return (
    <div className="ProductDetails">
      <div className="ProductDetailsLeft">
        <img
          className="Product_Details_image"
          src="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11097174/2021/2/17/590f6671-a8de-4b11-96a9-61bdd8b846b51613525195280HIGHLANDERMenBlackSneakers1.jpg"
          alt=""
        />
      </div>
      <div className="ProductDetailsRight">
        <div className="Product_Details_name">Levi's Henry Sneakers</div>
        <div className="Ratings_product_details">
          <Rating readOnly defaultValue={2.5} precision={0.5} />
        </div>
        <div className="Product_Details_price">$22</div>
        <div className="Product_desc_title"></div>
        <div className="colorFlex">
          <a className="Product_color" href="/">
            Red
          </a>
          <a className="Product_color" href="/">
            yellow
          </a>
        </div>
        <div className="Product_desc_title">
          <div className="Product_quantity"></div>
        </div>
        <button className="AddToCart">Add to cart</button>
        <button className="BuyItNow">Buy it now</button>
      </div>
    </div>
  );
};

export default ProductDetails;
