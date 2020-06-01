import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";

const TodoModal = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <div>
      <Button color="dark" className="mb-2" onClick={() => setOpen(!open)}>
        Add new todo
      </Button>
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>Add new todo</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.addTodo({
                name: name,
                date: Date.now(),
              });
              setOpen(!open);
            }}
          >
            <FormGroup>
              <Label for="event.target.name">New todo:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Please add you todo here"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Button type="submit" color="dark" className="mt-2 btn-block">
                Add new todo
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { addTodo })(TodoModal);
