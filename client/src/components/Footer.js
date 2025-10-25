import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} College Base Management System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;