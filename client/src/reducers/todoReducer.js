import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  todos: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter((todo) => todo._id !== action.payload),
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
        loading: false,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
