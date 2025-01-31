import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import UserForm from "./UserForm";
import "./User.css";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [isFormOpen, setIsFromOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const [State, setState] = useState({
    Loading: false,
    error: null,
  });
  const handleGetUser = async () => {
    setState({ Loading: true, error: null });
    try {
      const data = await api.getUser();
      setUserList(data);
      setState({ Loading: false, ...State });
    } catch (error) {
      setState({ Loading: false, error: "Error occurred" });
    }
  };
  const handleCloseForm = () => setIsFromOpen(false);
  const handleFormSubmit = (data) => {
    if (selectedUser === null) {
      setUserList([...userList, data]);
    } else {
      setUserList(
        userList.map((user) => {
          if (user.id === selectedUser.id) return data;
          else return user;
        })
      );
    }
    setIsFromOpen(false);
  };

  const handleDelete = async ({ user, index }) => {
    setState({ Loading: true, error: null });
    try {
      const Isdeleted = await api.deleteuser(user.id);
      setState({ ...State, Loading: false });
      if (Isdeleted)
        setUserList([
          ...userList.slice(0, index),
          ...userList.slice(index + 1),
        ]);
    } catch (error) {
      setState({ Loading: false, error: "Error Occurred" });
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div>
      {State.error ? <p style={{ color: "red" }}>{State.error}</p> : ""}
      {State.Loading ? <p>Loading...</p> : ""}
      <h2>UserList</h2>
      <button
        style={{ color: "rgb(255, 255, 255)" }}
        onClick={() => {
          setIsFromOpen(true);
          setselectedUser(null);
        }}
      >
        Add New User
      </button>
      {isFormOpen ? (
        <UserForm
          user={selectedUser}
          closeForm={handleCloseForm}
          formSubmit={handleFormSubmit}
        />
      ) : (
        ""
      )}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length !== 0
            ? userList.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                    <td>
                      <span onClick={() => handleDelete({ user, index })}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </span>
                      <span
                        onClick={() => {
                          setselectedUser(user);
                          setIsFromOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen mx-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })
            : "NO data"}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
