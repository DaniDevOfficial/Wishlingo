import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="left-section">
                <div className="logo">Your Logo</div>
                <div className="home-link"><Link to="/">Home</Link></div>
            </div>
            <ul className="nav-links">
                <li><Link to="/learn">Learn</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}