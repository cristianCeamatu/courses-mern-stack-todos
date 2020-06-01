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
import { updateTodo } from "../actions/todoActions";

const UpdateTodoModal = ({ id, currentName, ...props }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className="d-inline">
      <Button
        className="btn btn-secondary p-1 mx-1 d-inline"
        size="sm"
        onClick={() => setOpen(!open)}
      >
        &#9998;
      </Button>
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>Add new todo</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.updateTodo(id, name);
              setOpen(!open);
            }}
          >
            <FormGroup>
              <Label for="event.target.name">Update todo:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={currentName}
                placeholder="Please change you todo here"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Button type="submit" color="dark" className="mt-2 btn-block">
                Update todo
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

export default connect(mapStateToProps, { updateTodo })(UpdateTodoModal);
