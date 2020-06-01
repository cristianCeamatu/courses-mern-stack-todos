import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-4">
        <Container>
          <NavbarBrand href="/">Todos list</NavbarBrand>
          <NavbarToggler onClick={() => setMenu(!menu)} />
          <Collapse isOpen={menu} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="http://aurasjobs.ro">aurasjobs</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
