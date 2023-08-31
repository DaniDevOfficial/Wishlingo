
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 
import '../Styles/Navbar.css';

export function Navbar() {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); 
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="navbar">
            <div className="left-section">
                <div className="logo">Your Logo</div>
                <div className="home-link"><Link to="/">Home</Link></div>
            </div>
            <ul className="nav-links">
                <li><Link to="/learn">Learn</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li>
                    {user ? (
                        <Link to="/SignIn">Account</Link>
                    ) : (
                        <Link to="/SignIn">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
