import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="navbar__container--before">
      <Navbar bg="light" expand="sm" className="navbar__container">
        <Container>
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navbar__container__links">
              <Link to="/">Home</Link>
              <Link to="/Products">Products</Link>
              <Link to="#link">Link</Link>
            </Nav>
            <Nav className="navbar__container__links">
              <Link to="/Signin">Register/Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
