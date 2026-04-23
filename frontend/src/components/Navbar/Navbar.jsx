import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart, LogOut } from 'lucide-react';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            Ani<span className="heart">mora</span>
          </Link>
        </div>

        <div className="nav-middle">
          <div className="nav-pod">
            <Link to="/products">Shop Posters</Link>
            <Link to="/dashboard?tab=wishlist">Wishlist</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/feedback">Feedback</Link>
            {user && <Link to="/dashboard">Dashboard</Link>}
          </div>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="nav-icon-btn">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="flex-center" style={{ gap: '15px' }}>
              <Link to="/dashboard" className="user-nav-name desktop-only">
                Hi, {user.name.split(' ')[0]}
              </Link>
              <button 
                onClick={logout} 
                className="nav-logout-btn desktop-only" 
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="join-us-btn desktop-only">Join Us</Link>
          )}

          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Shop Posters</Link>
          <Link to="/dashboard?tab=wishlist" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>
          <div className="mobile-menu-divider" />
          {user ? (
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
