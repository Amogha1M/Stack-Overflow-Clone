import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Alroutes from "./Alroutes";

import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  // whenever our app is live useEffect will gonna run useEffect and the function which will come inside it

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    // fetchfAllQuestion is get request which will do by the database, fetchAllQuestion is a function with no parameter...

    dispatch(fetchAllUsers());
  }, [dispatch]);
  // now this above syntax have to run and data should be stored in the redux...
  // means we have retrieve the data from the backend and stored it in the frontend
  //now in order to access data we gonna use useSelector hook for it

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>

        <Alroutes />
      </Router>
    </div>
  );
}

export default App;
