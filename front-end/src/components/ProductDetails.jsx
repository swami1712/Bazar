import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../Redux/Slices/productApiSlice";
import { addToCart, resetCart } from "../Redux/Slices/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    status,
    refetch,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const productDetails = product?.data;
  const addToCartHandler = () => {
    dispatch(addToCart({ ...productDetails, qty }));
    toast.success("item added to cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <h1>
      <LinearProgress color="inherit" />
    </h1>
  ) : product ? (
    // <div className="ProductDetails">
    //   <div className="ProductDetailsLeft">
    //     <img
    //       className="Product_Details_image"
    //       src={productDetails.image}
    //       alt=""
    //     />
    //   </div>
    //   <div className="ProductDetailsRight">
    //     <div className="Product_Details_name">{productDetails.title}</div>
    //     <div className="Ratings_product_details">
    //       <Rating
    //         readOnly
    //         defaultValue={productDetails.rating.rate}
    //         precision={0.1}
    //       />
    //     </div>
    //     <div className="Product_Details_price">${productDetails.price}</div>
    //     {/* <div className="Product_qty">
    //       <label htmlFor="qty">Qty</label>
    //       <select
    //         name="qty"
    //         id="Product_qty"
    //         onChange={(e) => setQty(e.target.value)}
    //       >
    //         {[...Array(productDetails.rating.count).keys()].map((x) =>
    //           x < 9 ? (
    //             <option key={x + 1} value={x + 1}>
    //               {x + 1}
    //             </option>
    //           ) : null
    //         )}
    //       </select>
    //     </div> */}
    //     <div className="Product_desc_title">{productDetails.description}</div>
    //     {/* <div className="colorFlex">
    //       <a className="Product_color" href="/">
    //         Red
    //       </a>
    //       <a className="Product_color" href="/">
    //         yellow
    //       </a>
    //     </div> */}
    //     <div className="Product_desc_title">
    //       <div className="Product_quantity"></div>
    //     </div>
    //     <button className="AddToCart" onClick={addToCartHandler}>
    //       Add to cart
    //     </button>
    //     <button className="BuyItNow">Buy it now</button>
    //   </div>
    // </div>
    <>
      <Card className="p-4">
        <Row>
          <Col xs={6} md={6} className="text-center ">
            <Image
              src={productDetails.image}
              style={{ width: "300px", height: "300px", objectFit: "contain" }}
              alt={productDetails.name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{productDetails.title}</h3>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex align-items-center">
                {productDetails.rating}
                <StarIcon sx={{ color: "#ffbf00" }} /> |{" "}
                {productDetails.numReviews} reviews
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>company:</strong> {productDetails.brand}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {productDetails.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>&#8377; {productDetails.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {productDetails.countInStock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* Qty Select */}
                {productDetails.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(productDetails.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={productDetails.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Card>
      <Row className="review p-5">
        <Col md={6}>
          <h2>Reviews</h2>
          {productDetails.reviews.length === 0 && <div>No Reviews</div>}
          <ListGroup variant="flush">
            {productDetails.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <div className="d-flex align-item-center gap-2">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} readOnly />
                </div>
                <p
                  className="m-0"
                  style={{ fontSize: "14px", color: "#a8a8a8" }}
                >
                  {review.createdAt.substring(0, 10)}
                </p>

                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {loadingProductReview && <>loading</>}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2 " controlId="rating">
                    <Form.Label>Rate this product </Form.Label> <br />
                    <Rating
                      className="Ratings border "
                      name="half-rating-read"
                      precision={1}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <>
                  Please <Link to="/login">sign in</Link> to write a review
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  ) : (
    <div>There is no data</div>
  );
};

export default ProductDetails;
