import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Bird, Globe, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Ani<span>mora</span>
          </Link>
          <p className="footer-desc">
            Premium anime wall art for true Nakamas. High-definition prints 
            on 300 GSM matte paper. Curated collections delivered across India.
          </p>
          <div className="social-links">
            <a href="#"><Camera size={20} /></a>
            <a href="#"><Bird size={20} /></a>
            <a href="#"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Shop All Posters</Link>
          <Link to="/products?category=Naruto">Naruto Collection</Link>
          <Link to="/products?category=Demon Slayer">Demon Slayer Collection</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h4>Collections</h4>
          <Link to="/products?category=Naruto">Naruto</Link>
          <Link to="/products?category=Demon Slayer">Demon Slayer</Link>
          <Link to="/products?category=One Piece">One Piece</Link>
          <Link to="/products?category=Death Note">Death Note</Link>
          <Link to="/products?category=Attack on Titan">Attack on Titan</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="contact-item">
            <Mail size={18} />
            <span>hello@animora.in</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <MapPin size={18} />
            <span>Noida, Uttar Pradesh, India</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; 2025 Animora Store. All rights reserved.</p>
        <div className="footer-extra">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
