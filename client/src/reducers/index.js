import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  todos: todoReducer,
  error: errorReducer,
  auth: authReducer,
});
