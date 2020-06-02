import React, { Component } from "react";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <NavBar />
        <TodoList />
      </Provider>
    );
  }
}

export default App;
