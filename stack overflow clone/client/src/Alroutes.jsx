import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";

import DisplayQuestions from "./pages/Questions/DisplayQuestions";
import AskQuestions from "./pages/Askquestions/AskQuestions";
import Tags from './pages/Tags/Tags'
import UserProfile from './pages/UserProfile/UserProfile'
// import import  from './pages/UserProfile/import '
import Users from './pages/Users/Users'



const Alroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/Auth" element={<Auth />} />
      <Route exact path="/Questions" element={<Questions />} />
      
      <Route exact path="/Askquestions" element={<AskQuestions />}></Route>
      {/* <Route exact path="/Questions/:id" element={<DisplayQuestions />} /> */}
      <Route exact path="/Questions/:id" element={<DisplayQuestions />} />
      <Route exact path="/Tags" element={<Tags />} />
      <Route path = "/Users" element={<Users />} />
      <Route path = "/Users/:id" element={<UserProfile />} />
      <Route path = "/Users/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default Alroutes;
