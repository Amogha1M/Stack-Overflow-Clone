//inside api we have request.

import axios from "axios";
//  Axios is used to communicate with the backend and it also supports the Promise API that is native to JS ES6. It is a library which is used to make requests to an API, return data from the API, and then do things with that data in our React application.

const API = axios.create({ baseURL: "http://localhost:5000" });


API.interceptors.request.use((req)=>{
  if(localStorage.getItem('Profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
  }
  return req;
})

export const logIn = (authData) => API.post("user/login", authData);

// exprot const login = () => axios.post("http://localhost:3000/user/login",)

export const signUp = (authData) => API.post("user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
// that questions is question schema
export const getAllQuestions = () => API.get("/questions/get");
// this single url will retrieve all the data from the database


export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);

export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswer, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswer,
    answerBody,
    userAnswered,
    userId,
  });
// In the MERN (MongoDB, Express.js, React.js, Node.js) stack, api.patch refers to an HTTP method used for updating a specific resource or partial resource in an API.

// The HTTP PATCH method is typically used when you want to make partial updates to an existing resource, meaning you don't need to send the entire resource in the request. Instead, you can send only the fields that need to be updated.

// In the context of a MERN stack application, api.patch typically represents a route or endpoint on the server (built with Express.js and Node.js) that handles the PATCH requests from the client (built with React.js). This route would be responsible for receiving the partial updates and applying them to the appropriate resource in the database (MongoDB).

// For example, if you have an API endpoint /api/users/:id to update a user's information, you can use api.patch to send a PATCH request to that endpoint with the updated fields. The server would then handle the request, locate the user with the specified id, and update the corresponding fields in the database accordingly.

// Here's an example of how you might use api.patch with axios (a popular HTTP client library) in a MERN stack application:

// javascript
// Copy code
// import axios from 'axios';

// const updateUser = (userId, updatedFields) => {
//   return axios.patch(`/api/users/${userId}`, updatedFields);
// };
// In this example, axios.patch sends a PATCH request to the specified URL (/api/users/${userId}) with the updatedFields object, which contains the fields to be updated. The server-side route would handle this request and perform the necessary updates on the user resource in the database.

// It's worth noting that the exact implementation of api.patch can vary depending on the specific server framework or library being used in the MERN stack application. However, the fundamental concept of using the PATCH method to make partial updates to resources remains the same.

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });


  // export const fetchAllUsers = () => API.get('/user/getAllUsers');
  export const getAllUsers = () => API.get("/user/getAllUsers");

  export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);