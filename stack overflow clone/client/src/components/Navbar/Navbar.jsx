import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import search from "../../assets/magnifying-glass-solid.svg";
import Avatar from "../Avatar/Avatar";

import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentuser";
// import { type } from "os";

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    };
  }, [dispatch]);

  var user = useSelector((state) => state.currentUserReducer);
  // console.log(user);
  // in state all the reducer function will stored and we can use one reducer function by using state.curretnUserReducer with the help of useSelector
  // useSelector used to select state.

  //it will select data from application by email.

  // we have to retrieve the data
  // we are passing the value to the user itself so we will use useSelector
  // useSelector
  // The selector will be called with the entire Redux store state as its only argument. The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector). useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  const Navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  });

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-logo nav-item">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-btn nav-item">
          About
        </Link>
        <Link to="/" className="nav-btn nav-item">
          Products
        </Link>
        <Link to="/" className="nav-btn nav-item">
          For Teams
        </Link>

        <div id="google_translate_element"></div>
        {/* edited */}

        <form>
          <input type="text" name="" id="" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>

        {user === null ? (
          <Link to="/Auth" className="nav-item navLinks">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="5px"
              py="7px"
              borderRadius="51%"
              color="white"
              mx="10px"
              textDecoration="none"
            >
              <Link
                to={`/users/${user.result._id}`}
                style={{ textDecoration: "none" }}
              >
                {user.result.name.charAt(0).toUpperCase()}{" "}
              </Link>
            </Avatar>

            <button className="nav-item navLinks" onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
