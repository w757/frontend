import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Bar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    // Przekierowanie do strony logowania
    navigate("/auth");
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Nav.Link href="/">ZIELONY RAJ dla amatorów</Nav.Link>

        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
          ) : (
            <Nav.Link onClick={handleLogin}>LOG IN / SIGN UP</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
