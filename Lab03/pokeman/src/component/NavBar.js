import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
    <ul className='NavBar'>
        <li className='list-element'>
            <Link to='/'>Home</Link>
        </li>
        <li className='list-element'>
            <Link to='/pokemon/page/0'>Pokemon</Link>
        </li>
        <li className='list-element'>
            <Link to='/berries/page/0'>Berries</Link>
        </li>
        <li className='list-element'>
            <Link to='/machines/page/0'>Machines</Link>
        </li>
    </ul>
);

export default NavBar;