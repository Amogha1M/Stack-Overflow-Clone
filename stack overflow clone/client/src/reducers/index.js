import { combineReducers } from "redux";
// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
import questionReducer from "./Question";
import usersReducer from './users'

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionReducer, usersReducer
});
