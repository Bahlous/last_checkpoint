import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delUsers, getUsers } from "../JS/actions/userAction";
import { Button } from "react-bootstrap";

const Admin = () => {
  const [show, setShow] = useState(false);
  const listUsers = useSelector((state) => state.userReducer.listUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // console.log(listUsers);

  return (
    <div className="page">
      <img
        style={{ width: "15rem", height: "15rem" }}
        src="https://images.pexels.com/photos/9180717/pexels-photo-9180717.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="admin"
      />

      <Button onClick={() => setShow(!show)}>List User</Button>

      {show &&
        listUsers
          ?.filter((elt) => !elt.isAdmin) // Filtre directement ici
          .map((elt) => (
            <div key={elt._id}>
              <p>{elt.name}</p>
              <Button
                variant="danger"
                onClick={() => dispatch(delUsers(elt._id))}
              >
                Delete
              </Button>
            </div>
          ))}
    </div>
  );
};

export default Admin;