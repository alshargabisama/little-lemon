import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-col footer-logo-col">
          <img 
            src="/little-lemon-footer-logo.png" 
            alt="Little Lemon" 
            className="footer-logo" 
          />
        </div>

        <div className="footer-col">
          <h4>Doormat Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><a href="#order">Order Online</a></li>
            <li><a href="#login">Login</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>123 Lemon Street, Chicago, IL</li>
            <li>+1 (312) 555-0198</li>
            <li>info@littlelemon.com</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Social Media</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;