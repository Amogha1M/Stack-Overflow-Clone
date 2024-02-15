// import React from "react";
import * as api from "../api/index";

// we have imported it inside pages askQuestion.jsx

// we will use the askQuestion data
export const askQuestion = (questionData, navigate) => async (dispatch) => {
  // because we are using thunk we have to use dispatch aslo

  try {
    // and willl send to the backend and retrieve it as response and push it to the redux
    const { data } = await api.postQuestion(questionData);
    // we are sending all question data in postQueestion
    dispatch({ type: "POST_QUESTION", payload: data });
    // after dispatching a question means after posting a question we are calling fetch all the question function which will show all the fetchedquestion after clicking on the that askquestion button and after givng title, body and tags.
    dispatch(fetchAllQuestions());
    // so it will be called again.
    // here pushing
    // here is the data which we are passing to the backend
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// export default askQuestion

// we are sending this action to the reducer in question.js as their cases matches

export const fetchAllQuestions = () => async (dispatch) => {
  // here we are writing fetchAllquestion to get data from the database by using axios
  // action will come inside diapath(data)
  console.log("feched data....");
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
    // dispatching data to the store...
  } catch (error) {
    console.log(error);
  }
};
// for fetching all the question we need to show question each and every time so we gonna use useEffect

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = api.deleteQuestion(id);
    // Based on the code snippet provided, it seems that the api.deleteQuestion function is expected to return a response that includes data related to the deletion operation. This could be an object containing information such as the ID of the deleted question, a success message, or any other relevant details.
    console.log(data);
    dispatch(fetchAllQuestions());

    // fetchAllQuestions will get all the data from the databse.
    navigate("/");
  } catch (error) {
    // return ({message: error.message})
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = await api.voteQuestion(id, value, userId);

    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
