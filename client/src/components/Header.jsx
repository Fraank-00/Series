import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import Buscador from './Buscador';

function Header({ user, onLogout, onSearch }) { 
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Series-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {user ? (
                        <>
                            <Nav.Link as={Link} to="/listado">Listado</Nav.Link>
                            <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
                {user && (
                    <div className="d-flex align-items-center">
                        <Buscador onSearch={onSearch} />
                        <Button variant="outline-light" onClick={onLogout} className="ms-3">Cerrar Sesión</Button>
                    </div>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
