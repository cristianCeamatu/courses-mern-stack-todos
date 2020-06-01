import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  ITEMS_LOADING,
} from "./types";
import axios from "axios";

export const getTodos = () => (dispatch) => {
  dispatch(setItemLoading());
  axios.get("/api/todos").then((response) => {
    dispatch({
      type: GET_TODOS,
      payload: response.data,
    });
  });
};

export const deleteTodo = (id) => (dispatch) => {
  dispatch(setItemLoading());
  axios.delete(`/api/todos/${id}`).then((response) =>
    dispatch({
      type: DELETE_TODO,
      payload: id,
    })
  );
};

export const addTodo = (todo) => (dispatch) => {
  dispatch(setItemLoading());
  axios.post("/api/todos", todo).then((response) =>
    dispatch({
      type: ADD_TODO,
      payload: response.data,
    })
  );
};

export const updateTodo = (id, name) => (dispatch) => {
  dispatch(setItemLoading());
  axios.put(`/api/todos/${id}`, { name }).then((response) => {
    dispatch({
      type: UPDATE_TODO,
      payload: response.data,
    });
  });
};

export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
