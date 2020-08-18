import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = (props) => {
    return (
        <header className='container-fluid p-0'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <Navbar bg="dark" variant='dark' expand="lg">
                        <Navbar.Brand href="/">Rentable</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Dashboard</Nav.Link>
                                <Nav.Link href="/Rentals">Orders</Nav.Link>
                                <Nav.Link href="/Pickups">Pickups</Nav.Link>
                                <NavDropdown title="More" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Customers">Customers</NavDropdown.Item>
                                    <NavDropdown.Item href="/Items">Items</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            <div className='row justify-content-end'>
                <div className='col-12'>{props.welcomebar}</div>
            </div>
        </header>
    );
};

export default Header;