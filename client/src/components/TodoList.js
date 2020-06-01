import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../actions/todoActions";

import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AddTodoModal from "./AddTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const { todos } = this.props.todos;
    return (
      <Container>
        <AddTodoModal />
        <ListGroup>
          <TransitionGroup className="todo-list">
            {todos.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="btn btn-danger"
                    size="sm"
                    onClick={() => this.props.deleteTodo(_id)}
                  >
                    &#10008;
                  </Button>
                  <UpdateTodoModal id={_id} currentName={name} />
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

TodoList.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // named as the given name in the compose reducers 'index.js'
  todos: state.todos,
});

export default connect(mapStateToProps, {
  getTodos,
  deleteTodo,
})(TodoList);
