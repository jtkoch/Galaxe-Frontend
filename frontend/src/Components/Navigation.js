import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const Navigation = () => {
    return (
        <Navbar className="nav-container" bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 navbar-dark" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto">
                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3" to="/Home">Home</Link>
                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3" to="/Membership">Membership</Link>
                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3" to="/Drug">Drug</Link>
                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3" to="/Pharmacy">Pharmacy</Link>

                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3 login" to="/Login">Login</Link>
                    <Link style={{ color: "white" }} className="nav-link ml-3 mr-3 register" to="/Register">Sign up</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation