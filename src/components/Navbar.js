import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { getDefaultRouteForUser, getStoredUser, logoutUser } from '../utils/auth';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const isAdmin = user?.role === 'ADMIN';

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const authLinks = user
    ? isAdmin
      ? [{ to: '/admin', label: 'Admin Dashboard' }]
      : [
          { to: '/user', label: 'Dashboard' },
          { to: '/slots', label: 'Parking Slots' },
          { to: '/booking', label: 'Book Slot' }
        ]
    : [
        { to: '/', label: 'Home' },
        { to: '/register', label: 'Register' },
        { to: '/login', label: 'Login' }
      ];

  return (
    <Navbar expand="lg" sticky="top" className="app-navbar py-3">
      <Container>
        <Navbar.Brand as={Link} to={user ? getDefaultRouteForUser(user) : '/'} className="app-navbar-brand text-light">
          ParkEase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center text-light">
            {authLinks.map((item) => (
              <Nav.Link
                key={item.to}
                as={Link}
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
              >
                {item.label}
              </Nav.Link>
            ))}
            {user && (
              <Button variant="outline-light" className="ms-lg-3 mt-3 mt-lg-0" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
