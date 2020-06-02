import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const RegisterModal = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const { error, isAuthenticated } = props;
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") setMsg(error.msg);
    else setMsg(null);
    // If registered success close modal
    if (open && isAuthenticated) {
      setOpen(!open);
    }
  }, [error]);

  return (
    <NavLink style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
      Register
      <Modal
        isOpen={open}
        toggle={() => {
          props.clearErrors();
          setOpen(!open);
        }}
      >
        <ModalHeader
          toggle={() => {
            props.clearErrors();
            setOpen(!open);
          }}
        >
          Register
        </ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.register({
                name: name,
                email: email,
                password: password,
              });
            }}
          >
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Full name"
                className="mb-3"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="mb-3"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Button type="submit" color="dark" className="mt-2 btn-block">
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </NavLink>
  );
};

RegisterModal.prototypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
