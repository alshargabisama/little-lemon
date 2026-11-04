import { Link } from 'react-router-dom';

function Nav() {
  return (
    <header className="header-nav-container">
      <Link to="/" className="logo-link">
        <img 
          src="/icons_assets/Logo.svg" 
          alt="Little Lemon Logo" 
          className="nav-logo" 
        />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><Link to="/booking">Reservations</Link></li>
          <li><a href="#order">Order Online</a></li>
          <li><a href="#login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;