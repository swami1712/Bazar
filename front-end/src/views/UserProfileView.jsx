import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useProfileQuery } from "../Redux/Slices/userApiSlice";
import { useParams } from "react-router-dom";

const UserProfileView = () => {
  const [name, setName] = useState("Swami Mahale");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const { id: userId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  // const { data } = useProfileQuery(userId);

  // console.log(data);
  return (
    <>
      <h2>User Profile</h2>
      <Row>
        <Col md={3} className="p-3">
          <strong>Your name: </strong> <span>{userInfo.name}</span> <br />
          <strong>Username: </strong> <span>{userInfo.userName}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Your orders:</h4>
        </Col>
      </Row>
    </>
  );
};

export default UserProfileView;
