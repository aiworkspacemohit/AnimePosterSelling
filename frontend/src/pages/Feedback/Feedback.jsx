import React, { useState } from 'react';
import { Send, Star, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your feedback has been summoned to the scroll room!');
    setFormData({ name: '', email: '', comment: '' });
    setRating(5);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      className="feedback-page container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="feedback-layout">
        <div className="feedback-content">
          <h1 className="page-title">LEGENDARY <br /> FEEDBACK</h1>
          <p className="hero-subtitle">Help us improve the scroll quality. Every Nakama's word counts.</p>
          
          <div className="feedback-stats flex" style={{ marginTop: '40px', gap: '30px' }}>
            <div className="stat-item">
              <strong>98%</strong>
              <p>Happy Otakus</p>
            </div>
            <div className="stat-item">
              <strong>4.9/5</strong>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        <div className="feedback-card">
          <div className="quote-icon"><Quote size={40} /></div>
          <h3>SHARE YOUR EXPERIENCE</h3>
          <form onSubmit={handleSubmit}>
            <div className="rating-selector flex-center" style={{ margin: '20px 0' }}>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "star-on" : "star-off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                  >
                    <Star size={32} fill={index <= (hover || rating) ? "var(--accent)" : "none"} stroke={index <= (hover || rating) ? "var(--accent)" : "#555"} />
                  </button>
                );
              })}
            </div>

            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="YOUR NAME" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="EMAIL ADDRESS" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="comment" 
                placeholder="WHAT DID YOU LOVE? (OR HOW CAN WE IMPROVE?)" 
                value={formData.comment}
                onChange={handleChange}
                required
                style={{ height: '120px' }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Submit Feedback <Send size={18} style={{ marginLeft: '10px' }} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Feedback;
