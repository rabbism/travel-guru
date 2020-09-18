import React , {useContext} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../image/logo.png'
import './topnav-style.css'

const TopNav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext )
    return (
        <>
                <Navbar expand="lg" className="fixed-top">
                    <Navbar.Brand><Link to="/">
                    <img src={logo} className="nav__logo" alt=""/>
                    </Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                       
                            <Nav.Link className="nav__link">News</Nav.Link>
                            <Nav.Link className="nav__link">Destination</Nav.Link>
                            <Nav.Link className="nav__link">Blog</Nav.Link>
                            <Nav.Link className="nav__link">Contact</Nav.Link>
                            
                            {loggedInUser.email ? 
                            <Nav.Link className="nav__link-login" onClick={()=> setLoggedInUser({})}>{loggedInUser.name} LogOut </Nav.Link> : 
                            <Link to="/login"><li className="nav__link nav__link-login"> Login </li></Link> 
                           }
                        </Nav>
                       
                    </Navbar.Collapse>
                </Navbar>
        </>
    );
};

export default TopNav;