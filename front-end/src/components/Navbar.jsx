import React from "react";
import "./../styles/Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Header_left">
        <div className="Logo">
          <Link to="/">Bazaar</Link>
        </div>
        <div className="Header_items">
          <li>
            <Link to="/">Mens</Link>
          </li>
          <li>
            <Link to="/">Womens</Link>
          </li>
        </div>
      </div>
      <div className="Header_right">
        <div className="icon1">
          <SearchIcon />
        </div>
        <div className="icon2">
          {" "}
          <p>cart(0)</p>
        </div>
        <div className="icon3">
          <Link to="/signup">SignUP</Link>
          <Link to="/signin">SignIN</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
