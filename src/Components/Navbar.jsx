import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the import path according to your project structure
import '../Styles/Navbar.css';

export function Navbar() {
    const [user, setUser] = useState(null); // User object or null

    useEffect(() => {
        // Check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set user object if logged in, or null if not
        });

        // Cleanup the listener when the component unmounts
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
