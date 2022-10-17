import React from 'react';
import '../../Assets/Css/default.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Header(props) {

    //declare method variables
    const navigate = useNavigate();

    //declare private functions
    function handleLogout() {
        navigate('/');
    }

    //render html
    return (
        <div>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand href="" className='header-title'>ReactJS App</Navbar.Brand>
                    <Navbar.Brand className='header-title clickable' onClick={handleLogout}>Logout</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}