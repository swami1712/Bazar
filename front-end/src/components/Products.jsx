import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../Redux/Slices/productApiSlice";

import Filter from "./Filter";
import Pagination from "./Paginate";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col, Container, Row } from "react-bootstrap";
// import "../styles/Product.css";

const Products = () => {
  const navigate = useNavigate();
  const { keyword, pageNumber } = useParams();
  const { data } = useGetProductsQuery({ keyword, pageNumber });
  console.log(data);

  const handleClick = (id) => {
    // console.log(id);
    navigate(`productdetails/${id}`);
  };
  return (
    <>
      <Filter />
      <Row>
        {data?.data.map((element) => (
          <Col key={element._id} sm={12} md={6} lg={4} xl={3}>
            <Card
              sx={{ maxWidth: 345, cursor: "pointer" }}
              key={element.id}
              className="m-2"
              onClick={() => handleClick(element._id)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={element.image}
                title="product image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  selected
                  sx={{
                    marginTop: "1vw",
                    fontSize: " 1rem",
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    textOverflow: " ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "220px",
                  }}
                >
                  {element.title}
                </Typography>

                <Typography
                  sx={{ color: "#a8a8a8" }}
                  className="d-flex align-items-center"
                >
                  {element.rating} <StarIcon sx={{ color: "#ffbf00" }} /> |{" "}
                  {element.numReviews} reviews
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  {element.category}
                </Typography> */}
                <Typography
                  className="mt-4"
                  sx={{ fontWeight: " 800", fontFamily: "Poppins" }}
                >
                  &#8377; {element.price}
                </Typography>
              </CardContent>
              {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination pages={data?.pages} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default Products;
