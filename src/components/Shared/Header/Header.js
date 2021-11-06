import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth";
import useHandleCart from "../../../hooks/useHandleCart";
import logo from "../../../images/logo2.png";
import "./Header.css";

const Header = () => {
  const [isActive, setIsActive] = useState('home');
  const {allContext,allFoods,allHandles} = useAuth();
  const { user, logOut } = allContext;
  const {foodCart,cartQuantity} = useHandleCart();
  
  const handleActive = (props) =>{
    setIsActive(props);
  }
  return (
    <Navbar className="navbar" expand="lg" sticky="top">
      <Container>
       
        <Navbar.Brand href="#home">
          {" "}
          <img className="logo" src={logo} alt="" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={HashLink} onClick={()=>handleActive('home')} className={isActive==='home'&&"active-nav"} to="/home#home">
              Home
            </Nav.Link>
            <Nav.Link as={HashLink} className={isActive==='home_item'&&"active-nav"}  onClick={()=>handleActive('home_item')} to="home#items">
              Items
            </Nav.Link>
            <Nav.Link as={HashLink} className={isActive==='home_about'&&"active-nav"} onClick={()=>handleActive('home_about')} to="/home#about_us">
              About us
            </Nav.Link>

            <Nav.Link as={Link} className={isActive==='cart'&&"active-nav"} onClick={()=>handleActive('cart')} to="/cart">
              <i className="fas fa-shopping-cart position-relative">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {foodCart.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </i>
            </Nav.Link>
            {user?.displayName ? (
              <>
                <Navbar.Text>
                  <a className="user-name" href="#login">
                    {user.displayName}
                  </a>
                </Navbar.Text>
                <button className="logout-btn" onClick={logOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} className={isActive==='login'&&"active-nav"} onClick={()=>handleActive('login')} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <button className="signUp-btn">Sign up</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
