import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <div><Link to="/" className="nav-link active">Home</Link></div>
                <div><Link to="/Viz" className="nav-link">Visualizations</Link></div>
                <div><Link to="/about" className="nav-link">About</Link></div>
                <div><Link to="/services" className="nav-link">Services</Link></div>
                <div><Link to="/contact" className="nav-link">Contact</Link></div>
                <div><Link to="/loginRegister" className="nav-link">Login/Register</Link></div>
            </ul>
        </nav>
    );
};

export default Navigation;
