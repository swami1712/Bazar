import React, { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {} from "@mui/material/";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Slices/cartSlice";

const CartItem = ({ item, _id, title, image, price, countInStock, qty }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeFromCartHandler = () => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={2}>
              <Image src={image} alt={title} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/productdetails/${_id}`}>{title}</Link>
            </Col>
            <Col md={2}>${price}</Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={qty}
                onChange={(e) => addToCartHandler(e.target.value)}
              >
                {[...Array(countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button
                type="button"
                variant="light"
                onClick={removeFromCartHandler}
              >
                remove
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default CartItem;
