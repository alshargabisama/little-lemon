import { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-nav-container">
      {/* 1. Left side logo */}
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img 
          src="/icons_assets/Logo.svg" 
          alt="Little Lemon Logo" 
          className="nav-logo" 
        />
      </Link>

      {/* 2. Right side hamburger toggle */}
      <button 
        className="hamburger-btn" 
        onClick={toggleMenu} 
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          stroke="#495e57" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* 3. Navigation links */}
      <nav aria-label="Main Navigation" className="navbar">
        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#menu" onClick={closeMenu}>Menu</a></li>
          <li><Link to="/booking" onClick={closeMenu}>Reservations</Link></li>
          <li><a href="#order" onClick={closeMenu}>Order Online</a></li>
          <li><a href="#login" onClick={closeMenu}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;