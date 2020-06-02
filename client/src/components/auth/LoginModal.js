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

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const LoginModal = ({ error, isAuthenticated, login, clearErrors }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") setMsg(error.msg);
    else setMsg(null);
    // If registered success close modal
    if (open && isAuthenticated) {
      setOpen(!open);
    }
  }, [error]);

  return (
    <NavLink style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
      Login
      <Modal
        isOpen={open}
        toggle={() => {
          clearErrors();
          setOpen(!open);
        }}
      >
        <ModalHeader
          toggle={() => {
            clearErrors();
            setOpen(!open);
          }}
        >
          Login
        </ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              login({
                email: email,
                password: password,
              });
            }}
          >
            <FormGroup>
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </NavLink>
  );
};

LoginModal.prototypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { clearErrors, login })(LoginModal);
