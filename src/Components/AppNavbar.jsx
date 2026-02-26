import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
    const { user, logout } = useContext(AuthContext);

    

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Snap vault</Navbar.Brand>

                <Nav className="ms-auto">
                    {!user && (
                        <>
                        <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Sign Up
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Nav.Link as={Link} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/photos">
                                Photos
                            </Nav.Link>
                            <Nav.Link as={Link} to="/videos">
                                Videos
                            </Nav.Link>
                            <Nav.Link onClick={logout}>
                                Logout
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;