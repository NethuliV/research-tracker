import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { role, logout } = useContext(AuthContext)!;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Research Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
          {role === 'ADMIN' && <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>}
        </Nav>
        <Nav>
          {role ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;