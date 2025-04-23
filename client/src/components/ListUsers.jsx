import React from "react";
import { useSelector } from "react-redux";

import UserCard from "./UserCard";

const ListUsers = () => {
  const users = useSelector((state) => state.userReducer.users);

  // console.log(users);
  return (
    <div >
      {users
        .filter((elt) => elt.isAdmin === false)
        .map((elt) => (
          <UserCard user={elt} key={elt._id} />
        ))}
    </div>
  );
};

export default ListUsers;