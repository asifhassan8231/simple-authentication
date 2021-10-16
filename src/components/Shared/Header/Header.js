import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const { user, googleSignOut } = useAuth();
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Simple Authentication</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/home" className="me-3 my-auto">Home</NavLink>
                            {!user ? <div>
                                <NavLink to="/login" className="me-3">Login</NavLink>
                                <NavLink to="/register" className="me-3">Register</NavLink>
                            </div> : <button className="btn btn-warning me-3" onClick={googleSignOut}>Log out</button>}
                        </Nav>
                        {user && <Navbar.Text>
                            Signed in as: <a href="#login">{user?.displayName}</a>
                        </Navbar.Text>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;