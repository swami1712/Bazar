import React from "react";
// import "./../styles/Navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/Slices/authSlice";
import { resetCart } from "../Redux/Slices/cartSlice";
import SearchBox from "./SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const logOutHandler = () => {
    dispatch(logoutUser());
    dispatch(resetCart());
    navigate("/login");
  };
  //   return (
  //     <div className="Navbar">
  //       <div className="Header_left">
  //         <div className="Logo">
  //           <Link to="/">Bazaar</Link>
  //         </div>
  //         <div className="Header_items">
  //           <li>
  //             <Link to="/">Mens</Link>
  //           </li>
  //           <li>
  //             <Link to="/">Womens</Link>
  //           </li>
  //         </div>
  //       </div>
  //       <div className="Header_right">
  //         <div className="icon1">
  //           <SearchIcon />
  //         </div>
  //         <div className="icon2">
  //           {" "}
  //           <Link to="cart">
  //             {" "}
  //             <p>
  //               <Badge
  //                 badgeContent={cartItems.reduce(
  //                   (acc, item) => acc + parseInt(item.qty),
  //                   0
  //                 )}
  //                 color="success"
  //               >
  //                 <ShoppingCartIcon />
  //               </Badge>
  //             </p>
  //           </Link>
  //         </div>
  //         <div className="icon3">
  //           {!userInfo ? (
  //             <>
  //               <Link to="/signup">SignUP</Link>
  //               <Link to="/signin">SignIN</Link>
  //             </>
  //           ) : (
  //             <>
  //               <Link to="/userprofile">
  //                 <AccountCircleIcon />
  //               </Link>
  //               <Link onClick={logOutHandler}>logout</Link>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="">Bazaar</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Mens</Nav.Link>
            <Nav.Link href="#link">Womens</Nav.Link>
          </Nav>
          <SearchBox />
          <Nav className="p-3">
            {" "}
            <Link to="cart">
              <Badge
                badgeContent={cartItems.reduce(
                  (acc, item) => acc + parseInt(item.qty),
                  0
                )}
                color="success"
              >
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Profile"
              className="px-2"
              id="basic-nav-dropdown"
            >
              {userInfo ? (
                <>
                  <NavDropdown.Item>
                    <Link to="userprofile">{userInfo.name}</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link onClick={logOutHandler}>SignOut</Link>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item>
                    <Link to="/signup">SignUP</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/signin">SignIN</Link>
                  </NavDropdown.Item>
                </>
              )}

              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
