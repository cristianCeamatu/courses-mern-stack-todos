import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

import RegisterModal from "../components/auth/RegisterModal";
import LoginModal from "../components/auth/LoginModal";

const NavBar = ({ isAuthenticated, logout, user }) => {
  const [menu, setMenu] = useState(false);

  const AuthLinks = () => (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{`Welcome Mr. ${user ? user.name : ""}`}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink style={{ cursor: "pointer" }} onClick={() => logout()}>
          Logout
        </NavLink>
      </NavItem>
    </>
  );

  const GuestLinks = () => (
    <>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-4">
        <Container>
          <NavbarBrand href="/">Todos list</NavbarBrand>
          <NavbarToggler onClick={() => setMenu(!menu)} />
          <Collapse isOpen={menu} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

NavBar.prototypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
