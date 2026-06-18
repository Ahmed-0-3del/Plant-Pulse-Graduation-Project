import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo">
            <img src="/Materials/Logo.png" alt="PlantPulse" />
          </Link>
          <p className="footer-desc">
            AI-powered plant health analysis for gardeners and plant enthusiasts worldwide.
          </p>
          <div className="social-icons">
            <div className="social-icon">
              <img src="/Materials/Insta.png" alt="Instagram" style={{ width: "20px", height: "20px" }} />
            </div>
            <div className="social-icon">
              <img src="/Materials/X.png" alt="X" style={{ width: "20px", height: "20px" }} />
            </div>
            <div className="social-icon">
              <img src="/Materials/Facebook.png" alt="Facebook" style={{ width: "20px", height: "20px" }} />
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scan-now">Scan Now</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <img src="/Materials/Email.png" alt="Email" style={{ width: "16px", height: "16px" }} />
            info@example.com
          </div>
          <div className="contact-item">
            <img src="/Materials/Phone.png" alt="Phone" style={{ width: "16px", height: "16px" }} />
            +20 123 456 7890
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Plant AI Scanner. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
