// Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Bug Dashboard</h1>
            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/createBug"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Create Bug
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
