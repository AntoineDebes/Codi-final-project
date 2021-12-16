import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Signin from "./Signin";
import { useIsAuthContext } from "../context/IsAuth";

function NavbarComponent() {
  const {
    isUserLogedIn: { isAdmin, isUserAuth },
    setIsUserLogedIn,
  } = useIsAuthContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const userName = localStorage.getItem("Username") ?? "";

  const navDropdownTitle = (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
      <i className="fas fa-user-circle profile--icon"></i>
      <h5>{userName}</h5>
    </div>
  );
  const handleSignOut = () => {
    setIsUserLogedIn(false);
    localStorage.clear();
  };
  console.log(isAdmin, isUserAuth);

  return (
    <>
      {isLoginOpen ? <Signin setIsLoginOpen={setIsLoginOpen} /> : null}
      <div className="navbar__container--before">
        <Navbar bg="light" expand="sm" className="navbar__container">
          <Container>
            <Navbar.Brand href="/">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="basic-navbar-nav__dropdown"
            >
              <Nav className="me-auto navbar__container__links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {isAdmin ? (
                  <NavDropdown title={"Dashboard"} id="basic-nav-dropdown">
                    <Link to="/addadminproducts">Add Products</Link>
                    <Link to="/productupdateremove">
                      Delete/update Products
                    </Link>
                  </NavDropdown>
                ) : null}
              </Nav>
              {isUserAuth ? (
                <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                  <Link to="/">Cart</Link>
                  <div onClick={handleSignOut}>Logout</div>
                </NavDropdown>
              ) : (
                <Nav className="navbar__container__links">
                  <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                    Register/Login
                  </button>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default NavbarComponent;
