// import React from 'react'

//we will copy it's name and put it inside reducers index.js
const QuestionReducer = (state = {data: null}, action) => {
 switch (action.type){

    case "POST_QUESTION":
   //  return {...state, data: action.payload}
   // because data is just a string as "user posted successfully it can create error as we neeed data in the object form and we are sending just string..."
   
    return {...state}
    case "POST_ANSWER":
       return {...state}
    case "FETCH_ALL_QUESTIONS":
    return {...state, data: action.payload}
    default:
       return state
 }
}

export default QuestionReducer
// and in question reducer it will be stored
// and now we can access it through the app