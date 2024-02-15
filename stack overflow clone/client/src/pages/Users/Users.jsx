import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import UserList from "./UserList";
import './Users.css'

const Users = () => {

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2" style={{marginTop: "30px"}}>
      <h1 style={{fontWeight: "400", fontFamily: "sans-serif"}} >Users</h1>
        <UserList /> 
     
      </div>
    </div>
  );
};

export default Users;
