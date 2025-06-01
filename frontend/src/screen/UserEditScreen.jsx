import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Spinner from "../UI/Spinner";
import Message from "../UI/Message";
import FormContainer from "../component/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUserToAdmin } from "../store/userAction";
import { userDetailAction } from "../store/userDetailSlice";

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, user, successUpdate } = useSelector(
    (state) => state.userDetail
  );
  const [admin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch(userDetailAction.userDetailUpdateReset());
      navigate("/admin/userList");
    } else {
      if (!user || user._id !== id) dispatch(getUser(id));
      else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.role === "admin");
      }
    }
  }, [dispatch, id, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    let role;
    if (admin === true) role = "admin";
    else role = "user";
    dispatch(updateUserToAdmin(id, role));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading && <Spinner />}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder={name}
                value={name}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                value={email}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={admin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
