
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 
import '../Styles/Navbar.css';
import Logo from '../Images/capyblapy.png'
export function Navbar() {
    const [user, setUser] = useState(null); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); 
        });

        return () => unsubscribe();
    }, []);

function handleHamburger() {
    console.log("fzbby")
    setIsMenuOpen(!isMenuOpen);
  }
    return (
        <nav className="navbar">
            <div className="left-section">
            <div className=""><Link  className="link-style" to="/"><img src={Logo} alt="" className='logo'/> </Link></div>
                <div className="home-link "><Link className="link-style" to="/">Home</Link></div>
            </div>
            <a href="#wasd" className='toggle-button'
            onClick={handleHamburger}>
                <span className='bar' />
                <span className='bar'/>
                <span className='bar'/>

            </a>
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <ul >
                <li><Link className="link-style" to="/learn">Learn</Link></li>
                <li><Link className="link-style" to="/contact">Contact</Link></li>
                <li>
                    {user ? (
                        <Link className="link-style" to="/SignIn">Account</Link>
                    ) : (
                        <Link className="link-style" to="/SignIn">Login</Link>
                    )}
                </li>
            </ul>
            </div>
        </nav>
    );
}
