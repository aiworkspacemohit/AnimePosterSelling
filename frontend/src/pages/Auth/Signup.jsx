import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await signup(name, email, password);
    setLoading(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-page container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <h2>JOIN THE <br /> SQUAD</h2>
          <p>Join the collection of anime legends</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input 
                id="name"
                type="text" 
                placeholder="NARUTO UZUMAKI" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input 
                id="email"
                type="email" 
                placeholder="YOU@EXAMPLE.COM" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'CREATING...' : 'GET STARTED'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button className="btn btn-outline social-auth-btn">
          <Code size={20} />
          SIGN UP WITH GITHUB
        </button>

        <p className="auth-footer text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
