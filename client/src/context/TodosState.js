import React, { createContext, useReducer } from "react";
import TodosReducer from "./TodosReducer";
import { v1 as uuid } from "uuid";

const initialState = {
  todos: [
    { id: uuid(), name: "Wash the car", date: Date.now() },
    { id: uuid(), name: "Wash the pc", date: Date.now() },
    { id: uuid(), name: "Wash the bar", date: Date.now() },
    { id: uuid(), name: "Wash the restaurant", date: Date.now() },
  ],
};

export const TodosContext = createContext(initialState);

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodosReducer, initialState);
  return (
    <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
  );
};
