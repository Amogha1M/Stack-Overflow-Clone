import React from "react";
import { useSelector } from "react-redux";
import './Users.css'

import User from "./User";

const UserList = () => {
  const users = useSelector((state) => state.usersReducer);
  // console.log(users, "its users in userlist page inside User");
  return (
    <div className="user-List-container">
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UserList;
