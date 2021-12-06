import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Signin from "./Signin";

function NavbarComponent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      {isLoginOpen ? <Signin setIsLoginOpen={setIsLoginOpen} /> : null}
      <div className="navbar__container--before">
        <Navbar bg="light" expand="sm" className="navbar__container">
          <Container>
            <Navbar.Brand href="/">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar__container__links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
              </Nav>
              <Nav className="navbar__container__links">
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                  Register/Login
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default NavbarComponent;
