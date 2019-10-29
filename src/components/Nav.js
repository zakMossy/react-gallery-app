import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/sunrise">Sunrise</NavLink></li>
            <li><NavLink to="/plants">Plants</NavLink></li>
            <li><NavLink to="/architecture">Architecture</NavLink></li>
        </ul>
    </nav>
);                                                                              // creates all nav tabs

export default Nav;
