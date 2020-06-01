import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
