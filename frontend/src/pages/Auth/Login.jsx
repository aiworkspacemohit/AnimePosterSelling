import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <h2>WELCOME BACK, <br /> NAKAMA</h2>
          <p>Login to your account to access your scroll</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            <div className="flex-between">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">FORGOT PW?</a>
            </div>
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
            {loading ? 'LOGGING IN...' : 'CONTINUE'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button className="btn btn-outline social-auth-btn">
          <Code size={20} />
          CONTINUE WITH GITHUB
        </button>

        <p className="auth-footer text-center">
          Doesn't have an account? <Link to="/signup">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
