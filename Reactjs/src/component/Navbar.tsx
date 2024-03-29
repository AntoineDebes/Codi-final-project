import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Signin from "./Signin";
import { useIsAuthContext } from "../context/IsAuth";
import { useAppContext } from "../context/AppContext";
import { LogoDark } from "../images";

function NavbarComponent() {
  const {
    isUserLogedIn: { isAdmin, isUserAuth },
    setIsUserLogedIn,
  } = useIsAuthContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { cartItems } = useAppContext();
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

  return (
    <>
      {isLoginOpen ? <Signin setIsLoginOpen={setIsLoginOpen} /> : null}
      <div className="navbar__container--before">
        <Navbar expand="sm" className="navbar__container">
          <Container>
            <Navbar.Brand href="/">
              <img src={LogoDark} alt="LOGO Dark" />
            </Navbar.Brand>
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
                    <Nav.Link
                      href="/addadminproducts"
                      className="navbar__cart-length__container navbar__color__green"
                    >
                      Add Products
                    </Nav.Link>
                    <Nav.Link
                      href="/productupdateremove"
                      className="navbar__cart-length__container navbar__color__green"
                    >
                      Delete Products
                    </Nav.Link>
                  </NavDropdown>
                ) : null}
              </Nav>
              {isUserAuth ? (
                <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                  <Nav.Link
                    href="/cart"
                    className="navbar__cart-length__container"
                  >
                    Cart
                    {!!cartItems?.length ? (
                      <div className="navbar__cart-length__circle">
                        {cartItems?.length}
                      </div>
                    ) : null}
                  </Nav.Link>
                  <p onClick={handleSignOut} className="navbar__logout__btn">
                    Logout
                  </p>
                </NavDropdown>
              ) : (
                <Nav className="navbar__container__links">
                  <button
                    className="navbar__container__links__login-register--btn"
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                  >
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
