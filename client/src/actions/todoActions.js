import axios from "axios";
import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  ITEMS_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTodos = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get("/api/todos")
    .then((response) => {
      dispatch({
        type: GET_TODOS,
        payload: response.data,
      });
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const deleteTodo = (id) => (dispatch, getState) => {
  dispatch(setItemLoading());
  axios
    .delete(`/api/todos/${id}`, tokenConfig(getState))
    .then((response) =>
      dispatch({
        type: DELETE_TODO,
        payload: id,
      })
    )
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const addTodo = (todo) => (dispatch, getState) => {
  dispatch(setItemLoading());
  axios
    .post("/api/todos", todo, tokenConfig(getState))
    .then((response) =>
      dispatch({
        type: ADD_TODO,
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const updateTodo = (id, name) => (dispatch, getState) => {
  dispatch(setItemLoading());
  axios
    .put(`/api/todos/${id}`, { name }, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: UPDATE_TODO,
        payload: response.data,
      });
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
