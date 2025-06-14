import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../UI/Message";
import Spinner from "../UI/Spinner";
import { getAllUsers, deleteUser } from "../store/userAction";
import { useLocation } from "react-router-dom";
import Paginate from "../component/Pagination";
const UserListScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, users, successDelete, pages } = useSelector(
    (state) => state.userList
  );

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const page = queryParam.get("page") || 1;

  useEffect(() => {
    dispatch(getAllUsers(page));
  }, [dispatch, successDelete, page]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete"))
      dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} />
    </>
  );
};

export default UserListScreen;
