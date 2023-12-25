import React from "react";
// import { addToCart } from "../Redux/Slices/cartSlice";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { Row, Button, Col, Card, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CartView = () => {
  const navigate = useNavigate();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  // console.log(cartItems[0].title);
  return (
    <div>
      <Row>
        <Col md={8}>
          {cartItems.length ? (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                _id={item._id}
                title={item.title}
                image={item.image}
                price={item.price}
                qty={item.qty}
                countInStock={item.countInStock}
              />
            ))
          ) : (
            <h4>
              your cart seems empty, continue shopping <Link to="/">here</Link>
            </h4>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Price Details (
                  {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}
                  ) items
                </h2>
                <div>Subtotal: ${itemsPrice}</div>
                <div>TaxPrice: ${taxPrice}</div>
                <div>Shipping charges: ${shippingPrice}</div>
                <div>Total Amount: ${totalPrice}</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartView;
